# assets/

Source files that are version-controlled but **never deployed**. Excluded from
Vercel uploads via `.vercelignore`. Nothing in here is reachable at runtime —
if a file needs to be served, it belongs in `public/`.

## home-originals/

Full-resolution masters for the home page hero slideshow (26 JPEGs, ~350MB,
up to 23.9MB each). These previously sat at `public/home/originals/`, which
meant they were deployed and publicly downloadable at
`https://www.anthonyfreay.com/home/originals/<name>.jpg` despite no code
referencing them.

The tiers actually served from `public/home/` are generated from these:

| Tier | Width | Typical size | Used when |
|---|---|---|---|
| `large` | 1367px | ~0.12MB | viewport <= 1368px (incl. mobile), and first paint |
| `compressed` | 2560px | ~0.35MB | viewport > 1368px |

Tier selection lives in `getResponsiveSize()` in `src/app/HomeClient.jsx`.

Two narrower tiers, `small` (668px) and `medium` (825px), were also generated
but never referenced by any code path, and were deleted. Note that after
re-encoding, `large` is both **higher resolution and smaller on disk** than
`medium` was (0.12MB vs 0.17MB), so there is no payload argument for a
narrower mobile tier — and at DPR 2-3 a phone wants roughly 1200px anyway.
`large` is the correct mobile tier; do not reintroduce narrower ones without
measuring first.

### Regenerating the served tiers

Requires `cwebp` (`brew install webp`). Run from the repo root:

```bash
# 2560px tier
for src in assets/home-originals/*.jpg; do
  id=$(basename "$src" .jpg)
  cwebp -quiet -q 80 -resize 2560 0 -m 6 "$src" \
    -o "public/home/compressed-wallpaper-${id}-20260213.webp"
done

# 1367px tier
for src in assets/home-originals/*.jpg; do
  id=$(basename "$src" .jpg)
  cwebp -quiet -q 80 -resize 1367 0 -m 6 "$src" \
    -o "public/home/large-wallpaper-${id}-20260213.webp"
done
```

The `-20260213` suffix is part of the existing filename convention that
`getImageUrl()` in `HomeClient.jsx` builds against; keep it consistent or
update that function to match.

A `full` tier (5409-6886px, up to 16MB per image) was previously generated and
served to desktop viewports. It was retired for destroying LCP on the home
page — no display needs those dimensions for a background image.
