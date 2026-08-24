# SEO Implementation Plan — anthonyfreay.com

**Date:** 2026-08-24
**Basis:** Google Search Console Coverage export (2026-05-25 → 2026-08-20) cross-referenced against a full codebase audit.

---

## 1. Where the site stands

From the GSC Coverage export (`All known pages`):

| Metric | Value |
|---|---|
| Indexed pages | 4 |
| Not indexed | 10 |
| Impressions | 0–7/day typical; spikes of 33 (8/11) and 16 (8/19) |

Critical issues reported:

| Reason | Source | Validation | Pages |
|---|---|---|---|
| Page with redirect | Website | **Failed** | 6 |
| Duplicate without user-selected canonical | Website | Not started | 1 |
| Crawled – currently not indexed | Google systems | Not started | 3 |

Non-critical issues: none.

**Read:** For a 9-route site, 4 indexed pages and single-digit daily impressions is a weak position. The audit below found one severe performance defect that plausibly drives the "Crawled – currently not indexed" bucket, plus several concrete cleanup items.

### What is already correct

These are implemented well and need no work:

- Per-route `metadata` exports with title, description, canonical, OpenGraph, and Twitter card on every gallery page.
- JSON-LD structured data: `ImageGallery` + `Photograph` on gallery routes, `Person` on home.
- `metadataBase` set in `src/app/layout.jsx`; `robots.txt` permissive with a correct `Sitemap:` directive.
- Image sitemap generation with `<image:image>` entries.
- **Sitemap/UI sync verified clean** — all six galleries match exactly (bw 27, live 32, people 14, places 52, cars 20, events 56). No drift, and no missing base or `-hd` image files on disk.
- All favicon references in `layout.jsx` and `site.webmanifest` resolve to real files.
- `sr-only` `<h1>` and descriptive `sr-only` paragraphs on all six gallery routes.

---

## 2. Findings, by priority

### P0 — Homepage ships 6–16 MB of imagery per view

**This is the most important finding and likely the dominant SEO problem.**

`next.config.js` sets `images.unoptimized: true`, so Next serves the raw files in `public/` with no resizing or format negotiation. The `sizes` attributes throughout the codebase are therefore inert.

Measured hero payloads in `public/home/` (26 images × 3 tiers):

| Tier | Count | Total | Average | Largest |
|---|---|---|---|---|
| `compressed` | 26 | 37.9 MB | 1.46 MB | 3.27 MB |
| `large` | 26 | 11.0 MB | 0.42 MB | 0.96 MB |
| `full` | 26 | 205.5 MB | **7.90 MB** | **18.69 MB** |

`src/app/HomeClient.jsx` compounds this in two ways:

1. **Three stacked `<Image>` layers all mount with `initialSrc` = the `compressed` tier** (`getResponsiveSize()` returns `'compressed'` only during SSR). For the first hero (`A7401065`, 1.21 MB) that is ~3.6 MB before the slideshow effect runs.
2. **On mount, `getResponsiveSize()` returns `'full'` for any viewport wider than 1368px**, swapping in 1.8–16 MB files, and pre-loading the next one into the middle layer on every transition.

Worked example — desktop visitor, first 10 seconds on `/`:

```
initial paint : 3 layers x compressed A7401065   ~3.6 MB
effect swap   : full A7401065                     6.13 MB
preload next  : full A7401198                     4.80 MB
t=5s  next    : full A7401678                     1.82 MB
t=10s next    : full A7403629                    15.77 MB
                                          -------------
                                          roughly 32 MB
```

The `full` tier is never the right choice for a background element: `A7403629` (15.77 MB) and `A7406572` (15.98 MB) are in the active `HERO_IMAGES` rotation.

**Consequence:** LCP on `/` will be several seconds even on fast connections. Core Web Vitals are a ranking signal, and severe slowness is a well-documented contributor to Google crawling a page and declining to index it — which matches the 3 "Crawled – currently not indexed" pages.

**Actions**

1. **Stop serving the `full` tier to the hero.** Change `getResponsiveSize()` in `src/app/HomeClient.jsx` so the widest breakpoint resolves to `large` (avg 0.42 MB), not `full`. This alone cuts the desktop hero payload by roughly 95%.
2. **Re-encode the tiers to sane budgets.** Target ≤250 KB for `large` and ≤120 KB for `compressed` at quality 78–82 webp. Current `compressed` (1.46 MB avg) is heavier than most sites' full-size hero.
3. **Fix the three-layer initial mount.** Only the top layer needs a real `src` on first paint; give layers 2 and 3 an empty/placeholder source until the first transition schedules.
4. **Reconsider `images.unoptimized: true`.** On Vercel, removing it enables automatic resizing and AVIF/WebP negotiation, and makes every existing `sizes` attribute functional. Verify the deployment plan's image-optimization quota first; if it must stay off, the manual tiers above have to carry the full burden.
5. Re-measure with PageSpeed Insights / Lighthouse on `/` before and after, and record LCP.

**Files:** `src/app/HomeClient.jsx`, `next.config.js`, `public/home/*`

---

### P1 — Stale CRA `index.html` is a duplicate of the homepage

`public/index.html` is an unmodified create-react-app template left over from the previous stack. It contains unprocessed `%PUBLIC_URL%` tokens, an empty `<div id="root">`, a stale `<meta name="description">` that contradicts `SITE_DESCRIPTION`, SPA-routing `sessionStorage` shims that do nothing under Next, **and no canonical tag**.

Next serves `public/` verbatim, so `https://www.anthonyfreay.com/index.html` resolves to this near-empty page alongside the real `/` route. That is a canonical-less near-duplicate of the homepage — a direct match for the **"Duplicate without user-selected canonical" (1 page)** finding.

**Actions**

1. Delete `public/index.html`.
2. Delete `public/CNAME` (contains `anthonyfreay.com` — a GitHub Pages artifact, irrelevant on Vercel and it names the non-canonical apex host).
3. After deploy, confirm `/index.html` returns 404, then use GSC **Removals** to accelerate de-indexing.
4. Optionally add a permanent redirect `/index.html` → `/` in `next.config.js` to consolidate any accumulated signal.

**Files:** `public/index.html`, `public/CNAME`, `next.config.js`

---

### P1 — Thin crawlable content on `/` and `/work`

Every gallery route pairs an `sr-only` `<h1>` with a descriptive `sr-only` `<p>` (see `src/app/bw/page.jsx`, `live`, `people`, `places`, `cars`, `events`). The two routes that **lack** the paragraph are:

- `src/app/page.jsx` (home) — `<h1>` only; all content below is a client-rendered image slideshow with `alt=""` on every layer, so there is effectively zero indexable text.
- `src/app/work/page.jsx` — `<h1>` only; `WorkClient.jsx` renders six category tiles whose `alt` text is just the label (`"Live"`, `"Cars"`, …).

These two are the most likely remaining candidates for the "Crawled – currently not indexed" bucket, alongside the P0 performance issue.

**Actions**

1. Add an `sr-only` descriptive paragraph to `/work` and `/` matching the established pattern — NYC-based photographer, the categories covered, representative subjects.
2. Add a `metadata` export to `src/app/page.jsx`. It currently has none, so home inherits the root layout's metadata and has **no self-referencing canonical of its own**.
3. Improve `alt` text in `WorkClient.jsx` from bare labels to descriptive phrases (e.g. `"Live music photography — concert portfolio"`).
4. Consider giving the hero layers meaningful `alt` text on the first layer instead of `alt=""`.

**Files:** `src/app/page.jsx`, `src/app/work/page.jsx`, `src/app/work/WorkClient.jsx`, `src/app/HomeClient.jsx`

---

### P2 — `Person` JSON-LD has an empty `sameAs`

`src/app/page.jsx` declares:

```js
sameAs: [],
```

Empty, despite `src/components/Icons.jsx` already containing verified live profile URLs. Populating `sameAs` is the standard mechanism for tying a site to a real-world entity and materially helps brand/name queries — relevant here, since the site competes on the name "Anthony Freay".

**Action** — populate from the URLs already in `Icons.jsx`:

```js
sameAs: [
  'https://www.instagram.com/anthonyfreay',
  'https://www.linkedin.com/in/anthonyfreay',
  'https://github.com/anthonyfreay',
],
```

Also consider enriching the `Person` node with `address` (NYC), `email`, and `image`.

**Files:** `src/app/page.jsx`

---

### P2 — "Page with redirect" (6 pages, validation Failed)

Two redirect layers are configured and both look correct:

- `vercel.json` — 301 apex → `www` for `anthonyfreay.com`.
- `next.config.js` — `/resume` and `/resume/` → `/resume_anthony_freay.pdf` (currently `permanent: false` = 307).

Six pages sitting in this state with **Failed** validation is most likely Google re-crawling legacy apex-host or old-stack URLs; that normally clears on its own. It is flagged Failed, though, so it needs verification rather than assumption.

**Actions**

1. In GSC, open the "Page with redirect" report and export the actual 6 URLs. **Do not act before seeing them** — the fix differs entirely depending on whether they are apex URLs, old CRA hash routes, or `/resume` variants.
2. If they are `/resume` and `/resume/`: those are intentional, and a redirect to a PDF is expected to be non-indexable — consider whether `permanent: true` (308) better communicates intent.
3. If they are apex-host URLs: no code change; re-run validation and let re-crawl complete.
4. If they are legacy CRA routes: add explicit redirects to their App Router equivalents.
5. Confirm `public/CNAME` removal (P1) so nothing continues to advertise the apex host.

**Files:** `next.config.js`, `vercel.json`

---

### P3 — `lastmod` is meaningless

`scripts/generate-sitemap.js` stamps every URL with the build date:

```js
<lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
```

Every page claims to change on every deploy, including galleries untouched for months. Google learns to discount the signal.

**Action** — derive `lastmod` per route from real change data: git timestamp of the route's source file, or a manually maintained per-gallery date map. If neither is practical, drop `lastmod` entirely — absent is better than false.

**Files:** `scripts/generate-sitemap.js`

---

### P3 — No custom 404 page

There is no `not-found.jsx` anywhere under `src/`, so unmatched routes get the bare Next default: no navigation, no branding, no internal links. Every 404 is a dead end for both crawlers and visitors — and this site has a legacy-URL surface (CRA SPA routes, apex host) likely to produce them.

**Action** — add `src/app/not-found.jsx` with `<Navbar>`/`<Footer>` context, a short apology, and links to `/work` and the galleries.

**Files:** `src/app/not-found.jsx` (new)

---

### P3 — Duplicated image arrays across `page.jsx` and `*Client.jsx`

For `cars`, `places`, and `events`, the image list exists **twice**: once in `page.jsx` (as `allImages`, for JSON-LD) and once in the client component (split into `horizontalImages` / `verticalImages`, for rendering). A third copy lives in `scripts/generate-sitemap.js`.

The audit found these currently in sync, so this is a latent maintenance hazard rather than an active defect — but three hand-maintained copies of the same data will drift, and when it does the JSON-LD will advertise images the page does not show.

**Action** — extract each gallery's manifest to a single module (e.g. `src/lib/galleries/cars.js`) exporting the array plus its orientation split, and import it from all three consumers. Have `generate-sitemap.js` import the same modules instead of restating them.

**Files:** `src/lib/galleries/*` (new), `src/app/{cars,places,events}/*`, `scripts/generate-sitemap.js`

---

### P3 — Repository weight and orphaned assets

`public/` is **843 MB** and `.git` is **843 MB**. Contributors:

| Item | Finding |
|---|---|
| `public/home/` | 612 MB — the `full` tier alone is 205 MB and (per P0) should not be served at all |
| `public/posters/` | 37 files, **not referenced anywhere in `src/`** |
| `covers/apparel_cover.jpg`, `covers/poster_cover.jpg` | orphaned — no apparel or poster route exists |
| Orphaned gallery images | ~91 unreferenced non-`-hd` files: bw 28, live 32, people 14, places 10, events 14, cars 3 |

Spot-checked and confirmed genuinely unreferenced (e.g. `/cars/A7206342-color.webp` appears in neither `src/` nor `scripts/`).

Not an SEO ranking factor directly, but it slows clones, builds, and deploys, and the `full` tier is actively harmful once P0 is addressed.

**Actions**

1. After P0 lands, delete the unused `full` tier (205 MB) — or keep 2–3 for a deliberate high-DPI path.
2. Remove `public/posters/` and the orphaned covers, or build the routes they were intended for.
3. Audit and prune the ~91 orphaned gallery images. Reproduce the list with:
   ```bash
   for cat in bw live people places cars events; do
     refs=$(find src/app -name '*.jsx' -exec cat {} + \
       | grep -ohE "'/?$cat/[^']+\.webp'" | tr -d "'" \
       | sed "s|^$cat/|/$cat/|" | sed -E 's/-hd\.webp$/.webp/' | sort -u)
     disk=$(ls public/$cat/*.webp | sed 's|^public||' | grep -v -- "-hd" | sort -u)
     echo "=== /$cat ==="; comm -13 <(printf '%s\n' "$refs") <(printf '%s\n' "$disk")
   done
   ```
4. History rewriting to reclaim `.git` space is **out of scope** — it is disruptive and offers no SEO benefit. Only consider it if clone times become a real obstacle.

---

### P3 — Duplicate `site.webmanifest`

Two copies exist: `public/site.webmanifest` (the one `layout.jsx` links) and `public/favicon_io/site.webmanifest`. Both parse and all icons resolve, but the unlinked duplicate will drift.

**Action** — delete `public/favicon_io/site.webmanifest`.

---

## 3. Beyond the technical fixes

The technical work above should lift the indexed-page count and unblock crawling. It will **not** by itself move impressions much.

The site is 9 pages competing for generic, high-competition photography terms ("live music photography", "portrait photography NYC") with very little off-page signal. The impression floor of 0–7/day reflects that, not a crawl bug. Realistic levers:

- **Off-page:** link the site from the Instagram, LinkedIn, and GitHub profiles already in `Icons.jsx`; get listed in photography directories; seek credits-with-links from artists and venues shot for.
- **Content depth:** the galleries are captioned but have no prose. Per-shoot writeups (venue, artist, gear, story) create indexable long-tail surface that image grids cannot.
- **Named-subject leverage:** `alt` text already names Tyler, the Creator, Daniel Caesar, Jack Harlow, Nicki Minaj, Gracie Abrams. These are genuine long-tail opportunities, but only if paired with real page text — `alt` attributes alone rank weakly.
- **Local intent:** "NYC" appears in descriptions but there is no `LocalBusiness`/`ProfessionalService` schema and no location page. If bookings are a goal, this is the highest-value content addition.

---

## 4. Suggested sequence

| Phase | Work | Why here |
|---|---|---|
| **1** | P0 image payload (`HomeClient.jsx`, tier re-encode, `next.config.js`) | Largest impact; likely blocking indexation |
| **2** | Delete `index.html` + `CNAME`; GSC removal request | Directly resolves the duplicate-canonical finding |
| **3** | `/` and `/work` content + home `metadata`; `sameAs` | Cheap, targets "crawled – not indexed" |
| **4** | Pull the 6 redirect URLs from GSC and act on what they actually are | Requires data not in the export |
| **5** | `not-found.jsx`, `lastmod`, manifest dedupe | Low-risk hygiene |
| **6** | Gallery manifest refactor, asset pruning | Maintenance; do once behavior is stable |
| **7** | Off-page and content strategy | The actual constraint on impressions |

**Verification after each phase:** re-run Lighthouse on `/` and `/work`, request re-indexing for affected URLs in GSC, and re-check Coverage after ~2 weeks (re-crawl is not immediate).

---

## 5. Open questions

1. **What are the 6 "Page with redirect" URLs?** The export gives counts only. Nothing in P2 should be actioned before these are pulled from the GSC UI.
2. **Is Vercel image optimization acceptable?** Determines whether `images.unoptimized` can be flipped or the manual tiers must carry P0 alone.
3. **Are `posters/` and `apparel_cover.jpg` abandoned, or planned routes?** Decides delete vs. build.
4. **What is the goal — bookings, or portfolio credibility?** Bookings would justify `LocalBusiness` schema, a services page, and local SEO work that is otherwise not worth the effort.
