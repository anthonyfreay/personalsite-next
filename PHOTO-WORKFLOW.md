# Photo Workflow

Everything for getting photos onto the site. **Export once from Lightroom at full resolution** — `npm run add-photos` derives every size the site serves and registers the photo. Do not resize in Lightroom, and do not add files to `public/` by hand.

---

## Quick reference

```bash
npm run add-photos -- <gallery> <file-or-folder>...   # add new photos
npm run add-photos -- <gallery> <folder> --force      # re-derive existing photos
npm run add-photos -- --check                         # verify manifests match disk
npm run add-photos -- <gallery> <folder> --dry-run    # preview, write nothing
```

Galleries: `bw` · `live` · `people` · `cars` · `places` · `events`

---

## Add a new photo

**1. Export from Lightroom.** Full resolution, JPEG, sRGB, quality 90+, **cropped 3:2** (either orientation). No resizing, no watermark, no sharpening for screen — the script handles all of it.

The galleries are built on one frame shape: anything that is not 3:2 is rejected, and the photo is not derived or registered. Re-crop and re-export.

The **filename becomes the URL**, so name it before exporting. The convention is `<camera-stem>-<gallery>` — the suffix is the gallery the photo belongs to (`A7406517-cars`, `DSC05585-bw`, `A7400474-live`); avoid spaces.

Slugs used to carry a topic suffix instead (`-music`, `-scapes`, `-color`, `-portrait`), which drifted from the folder the photo actually lived in. Those were renamed; `next.config.js` redirects the old image URLs so nothing that was indexed 404s. Do not reintroduce them.

**2. Run the script.**

```bash
npm run add-photos -- live ~/Desktop/lr-export          # a folder
npm run add-photos -- events shot.jpg --alt "Cake"      # one photo, with caption
```

**3. Write the alt text.** It defaults to a humanised filename, which is not good enough — it is indexed, and becomes the image sitemap title, the JSON-LD `Photograph` name, and the hover caption on `/live`.

Edit `src/lib/galleries/<gallery>.js`:

```js
{ alt: 'Tyler, the Creator', src: '/live/DSC05584-live.webp', width: 1080, height: 1620, color: '#1a0f0f' },
```

For `/live`, alt should be **just the artist name** — it is shown on hover.

**4. Check and preview.**

```bash
npm run add-photos -- --check
npm run dev
```

**5. Commit** the two `public/` files and the manifest change together.

### Ordering

New photos are appended, so they land at the end of the gallery. To place one elsewhere, move its line in the manifest — the array order is the render order.

Ordering matters visually: the masonry galleries (`cars`, `places`, `events`) fill CSS columns top-to-bottom, so a run of same-shaped photos gives one column a very different length. Alternating landscape and portrait keeps it balanced.

---

## Update an existing photo

Re-edited in Lightroom, or fixing a crop:

```bash
npm run add-photos -- places ~/Desktop/re-export --force
```

**Keep the filename identical.** The path is a live URL that is in the sitemap and indexed by Google; changing it loses that history and leaves a 404 behind.

`--force` re-derives both files, updates the dimensions and dominant colour in place, and **keeps the existing alt text** — hand-written captions are not overwritten. The entry stays in its position, so gallery order is unchanged.

---

## Re-export a whole gallery

Useful for fixing the size inconsistency below, or a global re-edit.

```bash
# 1. Export every photo in that gallery, filenames matching the current ones
# 2. Re-derive them all
npm run add-photos -- cars ~/Desktop/cars-reexport --force

# 3. Confirm nothing was lost or renamed
npm run add-photos -- --check
git status --short          # expect only modified files, no additions/deletions
```

If `git status` shows **added** or **deleted** files, a filename drifted — fix it before committing, or URLs break.

### Known inconsistency worth fixing

Landscape photos were exported two different ways:

| galleries | landscape sizing | `-hd` long edge |
|---|---|---|
| `bw`, `live`, `people`, `events` | long edge | **1620px** ✅ |
| `cars`, most of `places` | width | 1080px ⚠️ |

The width-constrained ones are 1.5× short of what the full-screen lightbox wants, so landscape shots there look softer when opened. Re-exporting `cars` and `places` with `--force` brings them onto the long-edge standard the script now uses.

This does not affect the grid — Next downscales `-hd` to whatever the tile needs either way. It only affects the lightbox.

---

## Remove a photo

1. Delete its line from `src/lib/galleries/<gallery>.js`
2. Delete both files: `public/<gallery>/<slug>.webp` and `<slug>-hd.webp`
3. `npm run add-photos -- --check` — flags an entry without files, or a file nothing references

A removed photo leaves a 404 at a URL Google may have indexed. For a photo that was live a long time, consider a redirect in `next.config.js` instead.

---

## What the script produces

Per photo, both **long-edge constrained** so landscape and portrait get equal treatment:

| file | long edge | used for |
|---|---|---|
| `<slug>.webp` | 675px | the canonical URL — sitemap and JSON-LD point here |
| `<slug>-hd.webp` | 1620px | what the grid and lightbox actually render |

The grid does not pay for the larger file: Next downscales `-hd` to the tile size. The extra pixels exist for the full-screen lightbox.

And the manifest entry:

```js
{ alt: '…', src: '/live/DSC05584-live.webp', width: 1080, height: 1620, color: '#1a0f0f' }
```

- `width`/`height` are the **`-hd`** dimensions. Tiles reserve this aspect ratio, which is what keeps CLS at 0.
- `color` is the dominant colour, painted while the photo loads so the grid looks settled rather than blank.

That one manifest feeds the gallery UI, the JSON-LD, and the image sitemap. There is nothing to keep in sync by hand.

### Deliberate behaviours

- **EXIF rotation is applied, then stripped.** Orientation is baked into the pixels rather than depending on the viewer, and no camera or GPS metadata ships.
- **Never upscales.** A source smaller than 1620 on the long edge produces a smaller `-hd` and warns, rather than inventing pixels.
- **Re-runs are safe.** Photos already registered are skipped unless `--force` is passed.
- **WebP quality 82** for both sizes (`QUALITY` in `scripts/add-photos.mjs`).

---

## Cover images

Two derivatives per route, from one export, because the jobs conflict — the
`/work` tile is square and a social card is 1.91:1, so no single file serves
both without cropping badly somewhere.

```bash
npm run add-photos -- --cover live ~/Desktop/live-cover.jpg
```

| file | size | used for |
|---|---|---|
| `covers/<name>_cover.webp` | 900×900 | the `/work` tile (renders 400 CSS px square, so 800 on retina) |
| `covers/<name>_og.jpg` | 1200×630 | the social card — Open Graph and Twitter |

Names: the six galleries, plus `home` and `contact`.

Both crop with attention focus rather than centre, so the subject survives the
crop instead of whatever happened to be in the middle.

The card is **JPEG on purpose**. Several social scrapers still handle WebP
poorly, and a card that fails to render is worse than a slightly larger file.

After generating, point the route at it:

```js
// src/app/<route>/page.jsx
openGraph: {
  images: [{ url: 'https://www.anthonyfreay.com/covers/live_og.jpg', width: 1200, height: 630 }],
},
twitter: { images: ['https://www.anthonyfreay.com/covers/live_og.jpg'] },
```

and, for a gallery, update its tile in `src/app/work/WorkClient.jsx` to
`covers/<name>_cover.webp`.

### Why this matters

The covers that exist today are 450×675 portrait or 484×450, but every route
**declares** its OG image as 1200×630. Social platforms lay the card out from
the declared size, so the real image is cropped or letterboxed, and at 450px
wide it is below the threshold for a large card on Facebook and X — shares
render as a small thumbnail instead of a banner. `/places` has no cover at all
and points at a gallery photo.

The same files feed the `/work` tiles, where a 450px source is upscaled 1.78×
on a retina display — the same softness the galleries had before `-hd`.

## The home page hero is separate

The hero slideshow uses its own tiers and is **not** handled by this script. Masters live in `assets/home-originals/` (version-controlled, excluded from deploys); see [`assets/README.md`](assets/README.md) for the `cwebp` commands and the tier table. Adding a hero image also means editing `HERO_IMAGES` in `src/app/HomeClient.jsx`.

---

## Troubleshooting

**"NxM is 1.3334 (~4:3); galleries take 3:2 only"** — the export is the wrong shape. Re-crop to 3:2 in Lightroom and re-export; the script will not crop for you, because deciding what leaves the frame is not its call. Other photos in the same run still go through, and the run exits non-zero.

**"source is only NxM; -hd wants 1620"** — the export was too small. Re-export at full resolution; the script will not upscale.

**`--check` reports a missing file** — a manifest entry has no image. Either the file was deleted, or a filename drifted between export and manifest.

**`--check` reports unreferenced** — an image in `public/` that no manifest mentions. Either register it (`--force` on that gallery) or delete it; unreferenced files ship to production and are never shown.

**A photo does not appear** — check the manifest entry exists and `src` matches the filename exactly, including case. Then restart `npm run dev`.
