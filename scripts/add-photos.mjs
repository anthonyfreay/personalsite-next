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
 *   npm run add-photos -- places ~/re-exports --force
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

// Covers. Two derivatives from one export, for two very different jobs.
const COVER_TILE = 900;          // /work tile renders at 400 CSS px square -> 800 on retina
const OG_WIDTH = 1200;           // the size every social scraper actually wants
const OG_HEIGHT = 630;           // 1.91:1
const COVER_TARGETS = [...GALLERIES, 'home', 'contact'];
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

/** The alt text currently recorded for a src, if any. */
function existingAlt(gallery, src) {
  const re = new RegExp(
    `\\{\\s*alt:\\s*'((?:\\\\.|[^'])*)',\\s*src:\\s*'${src.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&')}'`
  );
  const m = re.exec(readManifest(gallery));
  return m ? m[1].replace(/\\'/g, "'") : null;
}

/** Swap one entry in place, keeping its position in the ordered list. */
function replaceInManifest(gallery, entry) {
  const p = manifestPath(gallery);
  const s = readManifest(gallery);
  const escaped = entry.src.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`  \\{[^\\n]*src: '${escaped}'[^\\n]*\\},`);
  if (!re.test(s)) fail(`Could not find the existing entry for ${entry.src}`);
  fs.writeFileSync(p, s.replace(re, formatRow(entry)));
}

function formatRow(e) {
  return (
    `  { alt: '${e.alt.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}', ` +
    `src: '${e.src}', width: ${e.width}, height: ${e.height}, color: '${e.color}' },`
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
  const rows = entries.map(formatRow).join('\n');
  fs.writeFileSync(p, s.slice(0, close) + rows + '\n' + s.slice(close));
}

/**
 * Build the two cover derivatives for a route.
 *
 *   covers/<name>_cover.webp   900px square  - the /work tile
 *   covers/<name>_og.jpg      1200x630       - the social card
 *
 * These are separate files because the jobs conflict: the tile is square and
 * the card is 1.91:1, so one image cannot serve both without being cropped
 * badly somewhere. Both crop with attention focus rather than centre, which
 * keeps the subject rather than the middle of the frame.
 *
 * The card is JPEG on purpose. Several social scrapers still handle WebP
 * poorly, and a card that fails to render is worse than a slightly larger file.
 */
async function deriveCover(sourceFile, name) {
  const dir = path.join(repoRoot, 'public', 'covers');
  fs.mkdirSync(dir, { recursive: true });

  const meta = await sharp(sourceFile).metadata();
  const short = Math.min(meta.width, meta.height);
  if (short < COVER_TILE) {
    console.warn(
      `${c.yellow('!')} ${name}: source short edge is ${short}px; the square tile ` +
        `wants ${COVER_TILE}px and will not be upscaled`
    );
  }
  if (meta.width < OG_WIDTH) {
    console.warn(
      `${c.yellow('!')} ${name}: source is ${meta.width}px wide; the social card ` +
        `wants ${OG_WIDTH}px and will not be upscaled`
    );
  }

  const tilePath = path.join(dir, `${name}_cover.webp`);
  const ogPath = path.join(dir, `${name}_og.jpg`);

  await sharp(sourceFile)
    .rotate()
    .resize(COVER_TILE, COVER_TILE, { fit: 'cover', position: sharp.strategy.attention, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(tilePath);

  await sharp(sourceFile)
    .rotate()
    .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: sharp.strategy.attention, withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(ogPath);

  const t = await sharp(tilePath).metadata();
  const o = await sharp(ogPath).metadata();
  return {
    tile: { path: tilePath, w: t.width, h: t.height, bytes: fs.statSync(tilePath).size },
    og: { path: ogPath, w: o.width, h: o.height, bytes: fs.statSync(ogPath).size },
  };
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

  const coverIndex = argv.indexOf('--cover');
  if (coverIndex !== -1) {
    const name = argv[coverIndex + 1];
    const source = argv[coverIndex + 2];
    if (!name || !source) fail('Usage: npm run add-photos -- --cover <name> <file>');
    if (!COVER_TARGETS.includes(name)) {
      fail(`Unknown cover "${name}". Expected one of: ${COVER_TARGETS.join(', ')}`);
    }
    if (!fs.existsSync(source)) fail(`No such file: ${source}`);

    console.log(`\n${c.bold(`Building covers for ${name}`)}\n`);
    const r = await deriveCover(path.resolve(source), name);
    for (const [label, x] of [['tile', r.tile], ['card', r.og]]) {
      console.log(
        `  ${c.green('+')} ${path.basename(x.path).padEnd(24)} ${`${x.w}x${x.h}`.padEnd(10)} ` +
          `${(x.bytes / 1024).toFixed(0)} KB  ${c.dim(label === 'tile' ? '/work tile' : 'social card')}`
      );
    }
    console.log(
      `\n${c.yellow('Next:')} point the route's metadata at ` +
        `${c.bold(`/covers/${name}_og.jpg`)} with width 1200 height 630` +
        (GALLERIES.includes(name)
          ? `,\nand WorkClient at ${c.bold(`covers/${name}_cover.webp`)}.\n`
          : '.\n')
    );
    return;
  }

  const altIndex = argv.indexOf('--alt');
  let alt = null;
  if (altIndex !== -1) {
    alt = argv[altIndex + 1];
    if (!alt) fail('--alt needs a value');
    argv.splice(altIndex, 2);
  }
  const dryRun = argv.includes('--dry-run');
  const force = argv.includes('--force');
  const positional = argv.filter((a) => !a.startsWith('--'));
  const [gallery, ...inputs] = positional;

  if (!gallery || !inputs.length) {
    console.log(`
${c.bold('Usage')}  npm run add-photos -- <gallery> <file-or-folder>... [options]
       npm run add-photos -- --check

${c.bold('Covers')}   npm run add-photos -- --cover <name> <file>
         builds the /work tile and the 1200x630 social card
         names: ${COVER_TARGETS.join(', ')}

${c.bold('Options')}  --alt "text"   caption for a single photo
         --force        re-derive photos already in the manifest, keeping their alt
         --dry-run      show what would happen

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
  const replaced = [];
  let skipped = 0;

  console.log(`\n${c.bold(`Adding ${sources.length} photo(s) to /${gallery}`)}\n`);

  for (const file of sources) {
    const slug = path.basename(file).replace(SOURCE_EXT, '');
    const src = `/${gallery}/${slug}.webp`;
    const isKnown = already.has(src);

    if (isKnown && !force) {
      console.log(
        `  ${c.dim('skip')}  ${slug} ${c.dim('(already in the manifest - use --force to re-derive)')}`
      );
      skipped++;
      continue;
    }
    if (dryRun) {
      console.log(`  ${c.dim(isKnown ? 'would replace' : 'would add')}  ${slug}`);
      continue;
    }

    // On replace, keep the alt text that is already there. It is hand-written
    // SEO surface and regenerating it from the filename would silently undo it.
    const keptAlt = isKnown ? existingAlt(gallery, src) : null;
    const entry = await derive(file, gallery, alt ?? keptAlt);

    if (isKnown) {
      replaceInManifest(gallery, entry);
      replaced.push(entry);
      console.log(
        `  ${c.yellow('~')} ${slug}  ${entry.width}x${entry.height}  ` +
          `${(entry.bytes / 1024).toFixed(0)} KB  ${entry.color}  ` +
          `${c.dim(keptAlt ? `alt kept: "${keptAlt}"` : '')}`
      );
    } else {
      entries.push(entry);
      console.log(
        `  ${c.green('+')} ${slug}  ${entry.width}x${entry.height}  ` +
          `${(entry.bytes / 1024).toFixed(0)} KB  ${entry.color}  ${c.dim(`alt: "${entry.alt}"`)}`
      );
    }
  }

  if (!dryRun && entries.length) appendToManifest(gallery, entries);

  const parts = [`${entries.length} added`];
  if (replaced.length) parts.push(`${replaced.length} replaced`);
  if (skipped) parts.push(`${skipped} skipped`);
  console.log(`\n${c.green('✓')} ${parts.join(', ')}\n`);
  if (entries.length && !alt) {
    console.log(
      `${c.yellow('Next:')} edit the alt text in ${c.bold(`src/lib/galleries/${gallery}.js`)} —\n` +
        `it is indexed, and becomes the image sitemap title and the hover caption on /live.\n`
    );
  }
}

main().catch((err) => fail(err.stack || err.message));
