# Re-export list

Generated from the repo on 2026-08-27. Export each at **full resolution**
from Lightroom with the **filename exactly as listed** (no extension needed —
the script writes `.webp`). Renaming breaks a live, indexed URL.

## 1. Gallery photos — 26 files

These are landscape shots exported width-constrained (1080px wide) instead of
long-edge (1620px), so they are 1.5x short of what the full-screen lightbox
wants. Portrait photos are all correct and need nothing. The grid is unaffected
either way — this only improves the lightbox.

### /cars (4)

```
A7204618-color
A7405676-color
A7406517-Enhanced-NR-color
A7406721-bw
```

```bash
npm run add-photos -- cars ~/Desktop/cars-reexport --force
```

### /places (22)

```
A7204586-HDR-scapes
A7204930-scapes
A7205360-color
A7401638-scapes
A7405233-scapes
A7405591-color
A7405906-color
A7405944-color
A7406556-Edit-scapes
A7406572-scapes
A7407228-scapes
A7407286-scapes
A7407357-scapes
A7407432-scapes
A7407519-scapes
RX702154-scapes
RX702276-scapes
RX702351-scapes
RX702886-scapes
RX703316-scapes
RX703948-scapes
RX706732-color
```

```bash
npm run add-photos -- places ~/Desktop/places-reexport --force
```

Then confirm nothing drifted:

```bash
npm run add-photos -- --check
git status --short    # expect only modified files
```

## 2. Cover photos — 8 files

Editorial: pick one photo to represent each. One export serves both the
`/work` tile and the social card.

| export as | `/work` tile | social card for |
|---|---|---|
| `bw` | yes | /bw |
| `live` | yes | /live |
| `people` | yes | /people |
| `places` | yes | /places |
| `cars` | yes | /cars |
| `events` | yes | /events |
| `home` | no | / — the site root, most-shared URL |
| `contact` | no | /contact |

```bash
npm run add-photos -- --cover live ~/Desktop/covers/live.jpg
```

Choose photos that survive **two different crops** — square for the tile, and
1.91:1 for the card. Something with the subject near the centre and room around
it works for both; a tight vertical composition does not.

Minimum useful source: **1200px wide** for the card, **900px on the short edge**
for the square tile. A full-resolution export clears both comfortably; the
script warns and refuses to upscale if a source falls short.

## Not needed

- **Portrait gallery photos** (150 of them) — already long-edge 1620.
- **`/events` landscape** (24) — already correct.
- **The home hero** — separate pipeline, masters already in `assets/home-originals/`.
  See `assets/README.md`.
