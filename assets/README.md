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
| `large` | 1367px | ~0.12MB | DPR-1 displays <= 1367 CSS px, and SSR first paint |
| `compressed` | 2560px | ~0.35MB | everything else (all retina devices, incl. phones) |

Tier selection lives in `getResponsiveSize()` in `src/app/HomeClient.jsx`.

**It selects on physical pixels, not CSS pixels** — `window.innerWidth * dpr`,
and because the hero is `object-cover`, `innerHeight * aspect` when the
viewport is taller than the image. Comparing CSS px against a physical-px tier
is the bug this replaced: a 14" MacBook Pro reports `innerWidth` 852 but is
DPR 2, so it needs ~1704px and was being handed a 1367px image upscaled 1.93x.

Consequence: nearly every modern device gets `compressed`. `large` survives for
low-DPR displays and as a fast first paint, both of which are worth keeping.

Two narrower tiers, `small` (668px) and `medium` (825px), were generated but
never referenced by any code path, and were deleted. After re-encoding, `large`
is both higher resolution and smaller on disk than `medium` was (0.12MB vs
0.17MB), so there is no payload argument for a narrower tier. Do not
reintroduce one without measuring.

A 27" 5K display needs ~5120px and still gets a 2x upscale from `compressed`.
Adding a 3840px tier (~0.8-1.2MB each) would close that gap; not done, since it
trades payload against a possibly-rare display class.

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
