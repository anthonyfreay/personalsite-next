// Read and rewrite gallery manifests on disk. Dev-tooling only.
//
// Used by the /curate route handler to persist reorders and removals. This is
// the only code that writes a manifest at runtime; everything else in this
// directory just reads the exported arrays.
//
// The rewrite is deliberately **line-based** rather than parse-and-serialise.
// Every manifest array is one entry per line with no interleaved comments, so
// moving lines around preserves each entry's exact source text -- quoting,
// spacing, hand-written alt text and all. Re-serialising from parsed objects
// would reformat the whole file and bury the real change in noise.

import { readFile, writeFile, rename, access } from 'node:fs/promises';
import path from 'node:path';

export const GALLERIES = ['bw', 'live', 'people', 'cars', 'places', 'events', 'sports'];

const MANIFEST_DIR = path.join(process.cwd(), 'src', 'lib', 'galleries');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const MOVED_FILE = path.join(MANIFEST_DIR, 'moved-images.json');

const ARRAY_OPEN = 'export const images = [';
const ARRAY_CLOSE = '];';

/** A manifest line is an entry if it carries a `src:`. Nothing else does. */
const SRC_RE = /src:\s*'([^']+)'/;

const manifestPath = (gallery) => path.join(MANIFEST_DIR, `${gallery}.js`);

export const isGallery = (gallery) => GALLERIES.includes(gallery);

/**
 * Split a manifest into the text before the array, the entry lines, and the
 * text after. Entry lines are kept verbatim and keyed by `src`, which is unique
 * within a gallery and is what the client sends back to identify an image.
 */
async function readManifest(gallery) {
  const file = manifestPath(gallery);
  const source = await readFile(file, 'utf8');
  const lines = source.split('\n');

  const open = lines.findIndex((line) => line.startsWith(ARRAY_OPEN));
  if (open === -1) throw new Error(`${gallery}.js: no '${ARRAY_OPEN}'`);

  const close = lines.findIndex((line, i) => i > open && line.startsWith(ARRAY_CLOSE));
  if (close === -1) throw new Error(`${gallery}.js: array is never closed`);

  const entries = [];
  for (let i = open + 1; i < close; i += 1) {
    const line = lines[i];
    if (!line.trim()) continue;
    const match = line.match(SRC_RE);
    if (!match) throw new Error(`${gallery}.js line ${i + 1}: no src, refusing to rewrite`);
    entries.push({ src: match[1], line });
  }

  return {
    file,
    head: lines.slice(0, open + 1),
    tail: lines.slice(close),
    entries,
  };
}

const str = (line, key) => line.match(new RegExp(`${key}:\\s*'((?:[^'\\\\]|\\\\.)*)'`))?.[1];
const num = (line, key) => {
  const raw = line.match(new RegExp(`${key}:\\s*(\\d+)`))?.[1];
  return raw === undefined ? undefined : Number(raw);
};

/**
 * Entries for one gallery, in render order.
 *
 * Returns the same shape the gallery components consume -- `hdSrc` plus the
 * geometry and dominant colour -- so the curate UI can render through the real
 * components and get the real layout, rather than approximating it.
 *
 * Older entries predate the width/height fields. ImageGallery falls back to
 * 1080x1620 for those, so the values are left undefined here and the same
 * fallback is applied at the point of render.
 */
export async function loadGallery(gallery) {
  const { entries } = await readManifest(gallery);
  return entries.map(({ src, line }) => ({
    src,
    hdSrc: src.replace(/(\.\w+)$/, '-hd$1'),
    alt: str(line, 'alt') ?? '',
    // Optional: overrides the hover label where it differs from the alt text.
    // Parsed so curate shows what a tile actually says rather than assuming
    // the label is the alt.
    caption: str(line, 'caption'),
    color: str(line, 'color'),
    width: num(line, 'width'),
    height: num(line, 'height'),
  }));
}

/**
 * Rewrite a manifest so its entries appear in `order`, dropping any that are
 * absent. `order` is a list of `src` values.
 *
 * Removal only unregisters: the .webp files stay in public/. That keeps the
 * change reversible and reviewable as a plain diff, at the cost of
 * `add-photos --check` reporting the leftovers as unreferenced until they are
 * either deleted or restored.
 *
 * Every src in `order` must exist and be distinct, and the caller cannot invent
 * new ones -- this function only ever reorders and drops lines it already read.
 */
export async function saveGalleryOrder(gallery, order) {
  const { file, head, tail, entries } = await readManifest(gallery);

  const bySrc = new Map(entries.map((entry) => [entry.src, entry]));
  const seen = new Set();
  const kept = [];

  for (const src of order) {
    const entry = bySrc.get(src);
    if (!entry) throw new Error(`${gallery}: unknown image ${src}`);
    if (seen.has(src)) throw new Error(`${gallery}: ${src} listed twice`);
    seen.add(src);
    kept.push(entry.line);
  }

  const next = [...head, ...kept, ...tail].join('\n');
  await writeFile(file, next, 'utf8');

  return {
    gallery,
    kept: kept.length,
    removed: entries.length - kept.length,
    removedSrcs: entries.map((e) => e.src).filter((src) => !seen.has(src)),
  };
}

/*
 * ---------------------------------------------------------------------------
 * Moving a photo between galleries
 * ---------------------------------------------------------------------------
 *
 * The filename encodes the gallery it belongs to (`A7400768-live.webp` in
 * public/live), so a move is a rename as well as a manifest edit. That changes
 * a URL which is in the sitemap and may be indexed, so every move also records
 * a redirect. Doing less than all three leaves something inconsistent:
 *
 *   files       both sizes renamed and moved into the target directory
 *   manifests   the entry line leaves the source array and is appended to the
 *               target array, with its `src` rewritten and `caption` dropped
 *   redirects   the old URL 308s to the new one, for both sizes
 */

const HD = /(\.\w+)$/;
const hd = (p) => p.replace(HD, '-hd$1');
const exists = (p) => access(p).then(() => true, () => false);

/**
 * The slug a photo takes in `target`.
 *
 * Slugs end in the gallery name by convention, so the suffix is swapped rather
 * than stacked -- `A7400768-live` becomes `A7400768-bw`, not
 * `A7400768-live-bw`. A legacy slug that carries no suffix just gains one.
 */
export function retarget(src, source, target) {
  const ext = path.extname(src);
  const stem = path.basename(src, ext);
  const base = stem.endsWith(`-${source}`) ? stem.slice(0, -(source.length + 1)) : stem;
  return `/${target}/${base}-${target}${ext}`;
}

/** Rewrite an entry line for its new home: new src, and no /live-only caption. */
function rewriteLine(line, fromSrc, toSrc) {
  return line
    .replace(`'${fromSrc}'`, `'${toSrc}'`)
    .replace(/\s*caption:\s*'(?:[^'\\]|\\.)*',/, '');
}

/**
 * Apply `order` to `gallery` and move `moves` out of it, in one operation.
 *
 * `moves` is [{ src, to }]. Moved entries must not also appear in `order` --
 * the caller decides an entry's fate once.
 *
 * Validation happens before anything is written, and the file renames are
 * rolled back if a later one fails, so a rejected save leaves the tree as it
 * was rather than half-moved.
 */
export async function saveGallery(gallery, order, moves = []) {
  const source = await readManifest(gallery);
  const bySrc = new Map(source.entries.map((e) => [e.src, e]));

  // --- validate every move before touching disk ---
  const planned = [];
  const claimed = new Set();

  for (const { src, to } of moves) {
    if (!isGallery(to)) throw new Error(`Unknown gallery: ${to}`);
    if (to === gallery) throw new Error(`${src}: already in ${gallery}`);
    const entry = bySrc.get(src);
    if (!entry) throw new Error(`${gallery}: unknown image ${src}`);
    if (order.includes(src)) throw new Error(`${src}: both kept and moved`);
    if (claimed.has(src)) throw new Error(`${src}: moved twice`);
    claimed.add(src);

    const toSrc = retarget(src, gallery, to);
    for (const rel of [toSrc, hd(toSrc)]) {
      if (await exists(path.join(PUBLIC_DIR, rel))) {
        throw new Error(`${rel} already exists in /${to}`);
      }
    }
    for (const rel of [src, hd(src)]) {
      if (!(await exists(path.join(PUBLIC_DIR, rel)))) {
        throw new Error(`${rel} is missing on disk`);
      }
    }
    planned.push({ entry, to, fromSrc: src, toSrc });
  }

  // --- rename files, rolling back if any step fails ---
  const renamed = [];
  try {
    for (const { fromSrc, toSrc } of planned) {
      for (const [from, to] of [[fromSrc, toSrc], [hd(fromSrc), hd(toSrc)]]) {
        await rename(path.join(PUBLIC_DIR, from), path.join(PUBLIC_DIR, to));
        renamed.push([from, to]);
      }
    }
  } catch (error) {
    for (const [from, to] of renamed.reverse()) {
      await rename(path.join(PUBLIC_DIR, to), path.join(PUBLIC_DIR, from)).catch(() => {});
    }
    throw error;
  }

  // --- append to each target manifest ---
  const byTarget = new Map();
  for (const plan of planned) {
    if (!byTarget.has(plan.to)) byTarget.set(plan.to, []);
    byTarget.get(plan.to).push(plan);
  }

  for (const [target, plans] of byTarget) {
    const t = await readManifest(target);
    const appended = plans.map((p) => rewriteLine(p.entry.line, p.fromSrc, p.toSrc));
    const lines = [...t.head, ...t.entries.map((e) => e.line), ...appended, ...t.tail];
    await writeFile(t.file, lines.join('\n'), 'utf8');
  }

  // --- rewrite the source manifest without the moved entries ---
  const result = await saveGalleryOrder(gallery, order);

  // --- record the redirects ---
  if (planned.length) {
    const current = JSON.parse(await readFile(MOVED_FILE, 'utf8'));
    current.push(...planned.map((p) => ({ from: p.fromSrc, to: p.toSrc })));
    await writeFile(MOVED_FILE, `${JSON.stringify(current, null, 2)}\n`, 'utf8');
  }

  // saveGalleryOrder counts anything absent from `order` as removed, which
  // would fold the moves into the unregistered tally. A move is not a removal.
  const movedSrcs = new Set(planned.map((p) => p.fromSrc));
  const removedSrcs = result.removedSrcs.filter((src) => !movedSrcs.has(src));

  return {
    ...result,
    removed: removedSrcs.length,
    removedSrcs,
    moved: planned.map((p) => ({ from: p.fromSrc, to: p.toSrc, gallery: p.to })),
  };
}
