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

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const GALLERIES = ['bw', 'live', 'people', 'cars', 'places', 'events'];

const MANIFEST_DIR = path.join(process.cwd(), 'src', 'lib', 'galleries');

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
