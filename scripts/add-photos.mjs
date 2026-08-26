#!/usr/bin/env node
/**
 * Turn a full-resolution export into every asset the site serves, and register
 * it in the gallery manifest.
 *
 *   npm run add-photos -- <gallery> <file-or-folder>... [options]
 *
 *   npm run add-photos -- live ~/Desktop/exports
 *   npm run add-photos -- events shot.jpg --alt "Cake"
 *   npm run add-photos -- --check
 *
 * Export once from Lightroom at full resolution; this derives the rest. Two
 * files are written per photo, both long-edge constrained so landscape and
 * portrait get the same treatment:
 *
 *   public/<gallery>/<slug>.webp       long edge  675  - the canonical URL, and
 *                                                        what the sitemap and
 *                                                        JSON-LD point at
 *   public/<gallery>/<slug>-hd.webp    long edge 1620  - what the grid and the
 *                                                        lightbox actually
 *                                                        render from
 *
 * The grid never pays for the larger file: Next downscales -hd to whatever the
 * tile needs. The extra pixels are there for the full-screen lightbox.
 *
 * It also appends a manifest entry with the -hd dimensions (so tiles reserve
 * the right aspect ratio and CLS stays 0) and the photo's dominant colour (the
 * tone a tile paints while the image loads).
 *
 * Alt text defaults to a humanised filename and should be edited afterwards -
 * it is real SEO surface and feeds the image sitemap titles. --alt sets it
 * directly when adding a single photo.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

const GALLERIES = ['bw', 'live', 'people', 'cars', 'places', 'events'];
const BASE_LONG_EDGE = 675;
const HD_LONG_EDGE = 1620;
const QUALITY = 82;
const SOURCE_EXT = /\.(jpe?g|png|tiff?|webp)$/i;

const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
};

const manifestPath = (gallery) =>
  path.join(repoRoot, 'src', 'lib', 'galleries', `${gallery}.js`);

function fail(message) {
  console.error(`\n${c.red('✗')} ${message}\n`);
  process.exit(1);
}

/** `A7401031-color.webp` -> `A7401031 color`; a starting point, not an answer. */
const humanise = (slug) =>
  slug.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();

/** Collect image files from any mix of files and directories. */
function collectSources(inputs) {
  const files = [];
  for (const input of inputs) {
    const abs = path.resolve(input);
    if (!fs.existsSync(abs)) fail(`No such file or folder: ${input}`);
    if (fs.statSync(abs).isDirectory()) {
      for (const entry of fs.readdirSync(abs).sort()) {
        if (SOURCE_EXT.test(entry) && !entry.startsWith('.')) {
          files.push(path.join(abs, entry));
        }
      }
    } else if (SOURCE_EXT.test(abs)) {
      files.push(abs);
    } else {
      console.warn(`${c.yellow('!')} Skipping unsupported file: ${input}`);
    }
  }
  return files;
}

function readManifest(gallery) {
  const p = manifestPath(gallery);
  if (!fs.existsSync(p)) fail(`No manifest at ${path.relative(repoRoot, p)}`);
  return fs.readFileSync(p, 'utf8');
}

/** Every `src:` already registered, so re-runs are safe. */
function existingSources(gallery) {
  return new Set(
    [...readManifest(gallery).matchAll(/src:\s*'([^']+)'/g)].map((m) => m[1])
  );
}

async function derive(sourceFile, gallery, altOverride) {
  const slug = path.basename(sourceFile).replace(SOURCE_EXT, '');
  const publicDir = path.join(repoRoot, 'public', gallery);
  fs.mkdirSync(publicDir, { recursive: true });

  const baseRel = `/${gallery}/${slug}.webp`;
  const basePath = path.join(publicDir, `${slug}.webp`);
  const hdPath = path.join(publicDir, `${slug}-hd.webp`);

  const image = sharp(sourceFile).rotate(); // honour EXIF orientation, then drop it
  const meta = await image.metadata();
  if (!meta.width || !meta.height) fail(`Cannot read dimensions: ${sourceFile}`);

  // Long-edge constrained, so portrait and landscape get equal treatment.
  const landscape = meta.width >= meta.height;
  const fit = (longEdge) =>
    landscape ? { width: longEdge } : { height: longEdge };

  if (meta.width < HD_LONG_EDGE && meta.height < HD_LONG_EDGE) {
    console.warn(
      `${c.yellow('!')} ${slug}: source is only ${meta.width}x${meta.height}; ` +
        `-hd wants ${HD_LONG_EDGE} on the long edge and will not be upscaled`
    );
  }

  for (const [target, longEdge] of [[basePath, BASE_LONG_EDGE], [hdPath, HD_LONG_EDGE]]) {
    await sharp(sourceFile)
      .rotate()
      // withoutEnlargement: never invent pixels the export did not have.
      .resize({ ...fit(longEdge), withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(target);
  }

  const hdMeta = await sharp(hdPath).metadata();
  const { dominant } = await sharp(basePath).stats();
  const hex =
    '#' +
    [dominant.r, dominant.g, dominant.b]
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('');

  return {
    alt: altOverride ?? humanise(slug),
    src: baseRel,
    width: hdMeta.width,
    height: hdMeta.height,
    color: hex,
    bytes: fs.statSync(basePath).size + fs.statSync(hdPath).size,
  };
}

function appendToManifest(gallery, entries) {
  const p = manifestPath(gallery);
  const s = readManifest(gallery);
  const close = s.lastIndexOf('];');
  if (close === -1) fail(`Could not find the images array in ${gallery}.js`);
  const rows = entries
    .map(
      (e) =>
        `  { alt: '${e.alt.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}', ` +
        `src: '${e.src}', width: ${e.width}, height: ${e.height}, color: '${e.color}' },`
    )
    .join('\n');
  fs.writeFileSync(p, s.slice(0, close) + rows + '\n' + s.slice(close));
}

/** Verify manifests and files agree in both directions. */
function check() {
  let problems = 0;
  for (const gallery of GALLERIES) {
    const s = readManifest(gallery);
    const entries = [...s.matchAll(/src:\s*'([^']+)'/g)].map((m) => m[1]);
    const missing = [];
    for (const src of entries) {
      for (const rel of [src, src.replace(/(\.\w+)$/, '-hd$1')]) {
        if (!fs.existsSync(path.join(repoRoot, 'public', rel))) missing.push(rel);
      }
    }
    const dir = path.join(repoRoot, 'public', gallery);
    const onDisk = fs.existsSync(dir)
      ? fs.readdirSync(dir).filter((f) => f.endsWith('.webp') && !f.includes('-hd'))
      : [];
    const registered = new Set(entries.map((e) => path.basename(e)));
    const orphans = onDisk.filter((f) => !registered.has(f));

    const bad = missing.length + orphans.length;
    problems += bad;
    const label = bad === 0 ? c.green('ok') : c.red(`${bad} problem(s)`);
    console.log(`  /${gallery.padEnd(7)} ${String(entries.length).padStart(3)} entries  ${label}`);
    missing.forEach((f) => console.log(`      ${c.red('missing file')}  ${f}`));
    orphans.forEach((f) => console.log(`      ${c.yellow('unreferenced')}  /${gallery}/${f}`));
  }
  console.log(
    problems === 0
      ? `\n${c.green('✓')} manifests and files agree\n`
      : `\n${c.red('✗')} ${problems} problem(s)\n`
  );
  process.exit(problems === 0 ? 0 : 1);
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--check')) return check();

  const altIndex = argv.indexOf('--alt');
  let alt = null;
  if (altIndex !== -1) {
    alt = argv[altIndex + 1];
    if (!alt) fail('--alt needs a value');
    argv.splice(altIndex, 2);
  }
  const dryRun = argv.includes('--dry-run');
  const positional = argv.filter((a) => !a.startsWith('--'));
  const [gallery, ...inputs] = positional;

  if (!gallery || !inputs.length) {
    console.log(`
${c.bold('Usage')}  npm run add-photos -- <gallery> <file-or-folder>... [--alt "text"] [--dry-run]
       npm run add-photos -- --check

${c.bold('Galleries')}  ${GALLERIES.join(', ')}
`);
    process.exit(1);
  }
  if (!GALLERIES.includes(gallery)) {
    fail(`Unknown gallery "${gallery}". Expected one of: ${GALLERIES.join(', ')}`);
  }

  const sources = collectSources(inputs);
  if (!sources.length) fail('No images found in the given paths');
  if (alt && sources.length > 1) {
    fail('--alt sets one caption, but several images were given. Add them one at a time, or edit the manifest afterwards.');
  }

  const already = existingSources(gallery);
  const entries = [];
  let skipped = 0;

  console.log(`\n${c.bold(`Adding ${sources.length} photo(s) to /${gallery}`)}\n`);

  for (const file of sources) {
    const slug = path.basename(file).replace(SOURCE_EXT, '');
    if (already.has(`/${gallery}/${slug}.webp`)) {
      console.log(`  ${c.dim('skip')}  ${slug} ${c.dim('(already in the manifest)')}`);
      skipped++;
      continue;
    }
    if (dryRun) {
      console.log(`  ${c.dim('would add')}  ${slug}`);
      continue;
    }
    const entry = await derive(file, gallery, alt);
    entries.push(entry);
    console.log(
      `  ${c.green('+')} ${slug}  ${entry.width}x${entry.height}  ` +
        `${(entry.bytes / 1024).toFixed(0)} KB  ${entry.color}  ${c.dim(`alt: "${entry.alt}"`)}`
    );
  }

  if (!dryRun && entries.length) appendToManifest(gallery, entries);

  console.log(
    `\n${c.green('✓')} ${entries.length} added${skipped ? `, ${skipped} skipped` : ''}\n`
  );
  if (entries.length && !alt) {
    console.log(
      `${c.yellow('Next:')} edit the alt text in ${c.bold(`src/lib/galleries/${gallery}.js`)} —\n` +
        `it is indexed, and becomes the image sitemap title and the hover caption on /live.\n`
    );
  }
}

main().catch((err) => fail(err.stack || err.message));
