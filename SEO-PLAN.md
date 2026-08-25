# SEO Implementation Plan — anthonyfreay.com

**Date:** 2026-08-24
**Basis:** Google Search Console Coverage export (2026-05-25 → 2026-08-20) cross-referenced against a full codebase audit.

---

## Status

Implemented on branch `seo/coverage-fixes` (commit `a92b8b5`):

| Item | Status |
|---|---|
| P0 hero image payload | **Done** — `full` tier retired; 2560px tier re-encoded at q80 (rotation 93.9 MB → 3.5 MB, 96% smaller); `large` tier re-encoded (11.0 → 3.1 MB) |
| Next image optimization | **Done** — `unoptimized` removed; AVIF/WebP enabled; all `sizes` attributes now functional |
| `public/index.html` + `CNAME` | **Done** — deleted |
| `/` and `/work` thin content | **Done** — `sr-only` copy added; home `metadata` export added |
| `sameAs` / `Person` schema | **Done** — populated + address/image |
| `/work` alt text | **Done** |
| Custom 404 | **Done** — `src/app/not-found.jsx` |
| `lastmod` | **Done** — git-derived per route, omitted when unknown |
| Asset cleanup | **Done** — posters/, 2 covers, 101 orphaned photos + `-hd`; `public/` 843 M → 504 M |
| Duplicate manifest | **Done** |
| P2 redirect URLs | **Resolved** — URLs supplied; 5 of 6 are correct canonicalization, no defect. `/index.html` → `/` redirect added |
| `public/home/originals/` (350 M) | **Done** — moved to `assets/home-originals/`, excluded from deploys via `.vercelignore`. `public/` 843 M → 154 M |
| Mobile tier path / unused `small`+`medium` | **Done** — `large` confirmed as mobile tier; `small`/`medium` deleted. `public/home/` 612 M → 12 M |
| Hero slideshow broken by image optimization | **Fixed** — see "Regression" below |
| `/work` LCP tile not prioritized | **Fixed** — first grid row now eager |
| Gallery manifest refactor | **Not started** — P3, the only item left |

### Regression found in dev testing (2026-08-24) — fixed

Enabling Next image optimization broke the home page hero: **the slideshow stopped animating and the imagery looked far worse than production.** Both symptoms had a single root cause.

The slideshow drives its three layers imperatively (`layers[i].src = getImageUrl(...)`). Once `unoptimized: true` was removed, `next/image` began emitting a `srcset` on those elements — and **when an `<img>` carries a `srcset`, the browser selects a candidate from it and ignores `src` entirely.** So:

- **No animation.** Every imperative `src` swap was silently discarded; all three layers stayed pinned to the first frame.
- **Poor resolution.** The generated srcset offered candidates up to `3840w` from a **1367px** source, so Next upscaled ~2.8× and re-encoded at q75 — visibly worse than the raw tier.

**Fix:** the three slideshow layers are now plain `<img>`, not `next/image`. That is the correct primitive for imperatively-controlled elements, and `next/image` was contributing nothing here — the hero is never lazy-loaded, and responsive selection is already handled by `getResponsiveSize()` picking a pre-built tier. Verified in the built output and against a running dev server: no `srcset` on the hero, raw tier served, and Next still emits a `<link rel="preload" fetchPriority="high">` for it so LCP stays hinted. The three `no-img-element` lint warnings are suppressed per-element with the rationale inline.

Galleries are unaffected and remain fully optimized (357 optimized refs on `/bw`, 141 on `/work`).

**Takeaway for future work:** never wrap an imperatively-mutated image in `next/image`. If a component sets `.src` by hand, it needs a plain `<img>`.

Separately, dev logging flagged `/covers/people_cover.jpg` as the LCP element on `/work` without eager loading. The grid is 3 columns on desktop, so the above-the-fold row is indices 0–2, but `priority` was set on `index < 2` — leaving the third tile, `people_cover`, lazy. Now `index < 3`.

Verified: `npm run lint` clean, `npm run build` succeeds, all 11 routes prerender, every referenced image and every sitemap image still resolves, and no `full`-tier reference remains in the build output.

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

`src/app/HomeClient.jsx` compounds this:

- **On mount, `getResponsiveSize()` returns `'full'` for any viewport wider than 1368px**, swapping in 1.8–16 MB files, and pre-loading the next one into the middle layer on every transition.

> **Correction (2026-08-24):** an earlier draft of this document claimed the three stacked `<Image>` layers each mount with the `compressed` tier for "~3.6 MB before the slideshow effect runs." That was wrong. All three layers share an identical `initialSrc`, and browsers cache by URL, so the initial paint costs **one** fetch, not three. The `full`-tier swap below was the real defect.

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

   > **Caveat learned in dev:** enabling this broke the hero slideshow, because `next/image`'s generated `srcset` overrides the imperative `src` swaps the slideshow relies on. The hero layers had to move to plain `<img>`. See the Regression section above.
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

### P2 — "Page with redirect" (6 pages, validation Failed) — RESOLVED, no defect

The 6 URLs, supplied from the GSC UI on 2026-08-24 (validation started 6/8/26, failed 6/13/26):

| URL | Last crawled | What it is |
|---|---|---|
| `http://anthonyfreay.com/` | Aug 18, 2026 | apex + http → www https |
| `https://anthonyfreay.com/` | Aug 18, 2026 | apex → www |
| `https://anthonyfreay.com/index.html` | Aug 15, 2026 | apex + the retired CRA template |
| `https://anthonyfreay.com/work` | Jul 28, 2026 | apex → www |
| `https://www.anthonyfreay.com/resume` | Jul 26, 2026 | intentional → résumé PDF |
| `http://www.anthonyfreay.com/` | Jul 12, 2026 | http → https |

**Five of the six are the site's own canonicalization redirects behaving exactly as designed** (apex → `www`, http → https, per `vercel.json`). The sixth is the deliberate `/resume` → PDF redirect. There is no defect here.

Critically: **this validation will never pass.** Google re-crawls each URL, correctly finds a permanent redirect that is supposed to exist, and marks validation failed. "Page with redirect" is an informational state for intentionally redirecting URLs, not an error to fix. The affected-pages count dropping 8 → 6 on ~7/8/26 reflects normal consolidation, not a regression.

**Action taken** — one genuine gap: `/index.html` had been crawled while the CRA template was still served. With that file now deleted (P1), the URL would begin returning 404. Added a permanent redirect to consolidate it instead:

```js
{ source: '/index.html', destination: '/', permanent: true }
```

**Deliberately not changed:**

- **Apex and protocol redirects** — correct as-is; no code change.
- **`/resume` left at `permanent: false` (307).** A 308 would signal permanence more strongly, but a redirect to a PDF is non-indexable either way, so there is no ranking gain — and 307 avoids browsers hard-caching the mapping if `/resume` ever becomes a real page. Not worth the one-way door.

**Files:** `next.config.js`

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

| Item | Finding | Status |
|---|---|---|
| `public/home/` | 612 MB — `full` tier alone 205 MB | **Done** — now 20 MB |
| `public/home/originals/` | 350 MB of masters, deployed publicly | **Done** — moved to `assets/`, excluded from deploys |
| `public/posters/` | 37 files, not referenced anywhere in `src/` | **Done** — removed |
| `covers/apparel_cover.jpg`, `covers/poster_cover.jpg` | orphaned — no such routes | **Done** — removed |
| Orphaned gallery images | 101 unreferenced non-`-hd` files + `-hd` variants | **Done** — removed |

**Result: `public/` 843 MB → 154 MB.**

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

5. ~~**`public/home/originals/` — 350 MB of source JPEGs, publicly deployed.**~~ **Resolved 2026-08-24.** Confirmed to be the full-size masters for the hero slideshow. Moved to `assets/home-originals/` — still version-controlled, no longer inside `public/`, so no longer deployed or publicly downloadable. Added `.vercelignore` excluding `assets/` so the 350 MB is not uploaded on every Vercel build, and `assets/README.md` documenting the tier ladder and the `cwebp` commands to regenerate the served tiers. `public/` is now **154 MB**, down from 843 MB. No runtime performance cost — nothing referenced the path.

6. ~~**Unused `small` (668px) and `medium` (825px) hero tiers.**~~ **Resolved 2026-08-24.** `large` (1367px) is confirmed as the mobile tier and the two narrower tiers were deleted (52 files, ~7.2 MB).

   The reasoning is worth keeping, because it inverts the usual instinct to add a narrower tier for phones. After the P0 re-encode, `large` is **both higher resolution and smaller on disk** than `medium` was — 0.12 MB at 1367px vs 0.17 MB at 825px — so switching phones to `medium` would have cost bytes *and* lost resolution. Device pixel ratio points the same way: a 400px-wide phone at DPR 3 wants roughly 1200px, which `large` supplies and `medium` does not. The dead branch in `getResponsiveSize()` (`width > 842` and the fallback both returning `'large'`) was already removed as part of the P0 rewrite, so mobile behavior is unchanged — the tier it was always effectively using is now the tier it explicitly uses.

   `public/home/` is now **12 MB** across two tiers, down from 612 MB.
