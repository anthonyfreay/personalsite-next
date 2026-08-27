# Follow-ups

Deferred work. Each item is scoped to be a separate branch/PR. Ordered by value.

**Status as of 2026-08-25.** Items 1, 2, 7 and 8 are **done and deployed to production**. Items 3-6 remain: 3 is a standing practice, 4 and 5 are not code, 6 is small deferred work.

---

## 1. ~~Tailwind v4 config is not loaded~~ — DONE, deployed 2026-08-24

Migrated to the v4 entrypoint: `@import "tailwindcss"` plus an `@theme` block, and `tailwind.config.js` deleted. All previously-dead utilities now emit and apply.

Two things the migration surfaced that are worth remembering:

**Cascade layers, not specificity.** v4 emits utilities into `@layer utilities`, and an *unlayered* rule beats a layered one regardless of specificity. The custom globals (`* { margin: 0; padding: 0 }`, `a { color: inherit }`) were unlayered, so even after the theme was correct, `my-2.5`, `px-5` and `hover:text-accent-1` still computed to the reset value. Wrapping those globals in `@layer base` fixed it. If you add global CSS to `globals.css`, put it in `@layer base` or it will silently outrank every utility.

**Preflight changes are real changes.** `@import "tailwindcss"` pulls in the full v4 preflight, which the old directives never applied. Two consequences:

- `line-height: 1.5` on `<html>` grew the navbar 65px → 73.2px and pushed every page down ~8px. **Deliberately reverted** with `line-height: normal` in `globals.css` — that is a redesign, not a migration. Delete that line to adopt Tailwind's typography as a considered decision.
- `img { display: block }` removed the baseline descender gap under every inline image. Masonry pages got shorter (cars −24px, events-mobile −116px) because the gap accumulated once per image per column. This is a genuine improvement — the same bug fixed by hand in `ImageGallery.module.css` for the caption gradient.

Verified with before/after screenshots and layout metrics across 10 routes × 2 viewports. Remaining intended differences: body colour now `#0e0e0e` (`text-brand-text` finally applies, was default black), and `my-2.5` adds 10px to the gallery wrapper on `/bw`, `/live`, `/people`.

## 2. ~~Adobe Fonts `font-display: swap`~~ — DONE (applied in the Adobe dashboard)

**Done 2026-08-24.** Verified live: all six faces now serve `font-display: swap`. Measured effect on production mobile Lighthouse — FCP dropped ~1.3s across the board and `/work` reached 93, `/live` 85.

Original notes retained below for context.

**Not a code change — it was a setting in the Adobe Fonts web project dashboard.**

Production Lighthouse (mobile) shows the LCP element on **all four tested routes** is the navbar wordmark — a *text* node, not an image — with FCP at 3.2–3.5s. All six Typekit faces ship `font-display: auto`, so the browser hides text for ~3s.

- `font-display` is an `@font-face` descriptor and **cannot** be overridden from site CSS.
- `?display=swap` on the stylesheet URL is **ignored** by Typekit (verified by fetching the CSS both with and without it — still `font-display:auto` on all 6 faces).
- Preconnects to `use.typekit.net` / `p.typekit.net` are already in place (~340ms).

Setting the project's `font-display` to **swap** should pull LCP well below the current ~5.3–6.1s. If the dashboard route is unavailable, the fallback is loading the Typekit stylesheet asynchronously — but that trades a flash of fallback text and risks reintroducing CLS, which is currently 0.

**Re-measure after changing it**, and note the methodology below.

---

## 3. Lighthouse methodology — standing practice, not a task

Dev-mode numbers are not usable. Measured on this project:

| | `next dev` | `next build && next start` |
|---|---|---|
| JS payload | ~1,456 KB / 22 files | **183–203 KB gzipped / 9–11 files** |

The "Minify JavaScript (~490 KiB)" and "Reduce unused JavaScript (~1,150 KiB)" opportunities in a dev run are pure artifacts, as is `/events` appearing to load all 58 images (Lighthouse's full-page-screenshot gatherer scrolls and triggers lazy loading).

Also expect two console 404s locally for `/_vercel/insights/script.js` and `/_vercel/speed-insights/script.js`. Those are injected by Vercel and only exist on a deployment; they drop Best Practices to 96 locally and score 100 in production.

---

## 4. Off-page SEO — the actual growth constraint

See **`OFF-PAGE-SEO.md`** for the full prioritised checklist. Summary of what is not code:

1. Reciprocal `https://www.anthonyfreay.com` links from the Instagram, LinkedIn and GitHub profiles — minutes of work, and it activates the `rel="me"` already shipped.
2. Photography directories and communities.
3. **Credit links** from artists, venues and press — the largest realistic opportunity, and deep links to `/live` rather than `/`.
4. **Content depth** — per-shoot writeups. Nine pages of image grids give people very little to link to, and `alt` text alone ranks weakly.

---

## 5. GSC follow-up — check from ~2026-09-08

- Coverage should show more than the current 4 indexed pages.
- **"Page with redirect" will stay at 6 and keep failing validation. This is correct.** Those are the site's own apex→www and http→https canonicalisation redirects plus `/resume`. Re-checking is informational only; see `SEO-PLAN.md` §P2.
- Watch branded ("anthony freay") vs non-branded impressions separately. Branded lifting first is expected and confirms the entity consolidation landed.

---

## 6. Smaller items

- **Mobile hero art direction.** Lighthouse flags "Properly size images (125 KiB)" on `/`. It judges by width alone and is a false positive for a full-bleed `object-cover` hero — on a tall phone the *height* binds, and the 2560px tier is actually upscaled ~1.27×. A genuinely portrait-cropped mobile hero via `<picture>` would beat both the audit and the current behaviour. This is the real fix if the hero is revisited.
- **A wider hero tier for 5K displays.** A 27" 5K needs ~5120px against the 2560px maximum (a 2× upscale). A 3840px tier regenerated from `assets/home-originals/` would cost ~0.8–1.2 MB per image. Explicitly declined for now.
- **`structured-data.js` exports more than it needs.** `person`, `authorRef`, `PERSON_ID`, `PROFILE_URLS`, `CONTACT_EMAIL`, `personJsonLd`, `webSiteJsonLd` and `graphJsonLd` are only used inside the module now that `siteGraphJsonLd()` composes them. Harmless, but the public surface could shrink.
- **`ProfessionalService` has no address, phone or hours** — deliberately, because none are known. If a Google Business Profile is created, add the verified details to `photographyServiceJsonLd()`. Never add review markup without real reviews.
- **ESLint stays at 9.** ESLint 10 installs but breaks linting: `TypeError: scopeManager.addGlobals is not a function`, from a version conflict in the toolchain `eslint-config-next` pulls. `eslint-config-next` declares `eslint >=9.0.0` so the range permits it, but it does not work. Revisit when explicit v10 support ships.
- **`assets/home-originals/` is 350 MB in git history.** Excluded from deploys via `.vercelignore`, so it costs nothing at runtime — it only affects clone time. Rewriting history to remove it is disruptive and offers no SEO benefit; only consider it if clones become painful.

---

## 7. ~~Masonry hydration layout shift~~ — DONE, deployed 2026-08-25

`react-masonry-css` picked its column count from `window.innerWidth` on mount, which the server cannot know. SSR emitted 4 columns at every width while the client re-rendered to 2 below 900px; that reflow was worth **0.082 CLS** on `/events`, `/places` and `/cars`.

Replaced with CSS multi-column, so column count is a media query the server renders correctly. The dependency is removed. DOM order is unchanged, so the lightbox's click→slide mapping still lines up and no JS changed; visual placement differs, since CSS columns fill top-to-bottom within a column where the library dealt round-robin.

Measured on `/events` (mobile, production, 4 runs per side, medians):

| | perf | LCP | CLS |
|---|---|---|---|
| `main` | 69.5 | 7.10s | 0.041 |
| CSS columns | **70.0** | **6.54s** | **0.000** |

**Methodology note worth keeping:** a 2-run comparison of this change appeared to show LCP regressing by 0.6s. It had not — `main`'s LCP varies **1.58s** run to run, wider than the effect being measured. Two Lighthouse runs are not enough to compare anything on this site; use medians of four or more, on the same machine, with nothing else competing for CPU.

---

## 8. ~~Gallery width collapsing to image intrinsic width~~ — DONE, deployed 2026-08-25

`/cars` rendered visibly narrower than the other galleries. At a 2000px viewport its grid was **1456px** with 272px gutters, where `/places` and `/events` were 1800px.

The wrapper `<div className="max-w-full mx-auto flex-1">` sat inside a `flex flex-col` parent. **Auto cross-axis margins suppress the default `align-items: stretch`**, so the wrapper shrink-to-fit instead of filling, and gallery width came from the images' intrinsic widths rather than the viewport:

| route | image `naturalWidth` | grid |
|---|---|---|
| `/cars` | all 351px | 4 × 351 + gaps = **1456px** |
| `/places`, `/events` | some 500px | max-content > 1800px, clamps |

The dependency is circular — image natural width sets grid width, which feeds `sizes`, which decides which variant loads — so it was unstable and viewport-dependent. That is why only `/cars` looked wrong.

Fixed by replacing `max-w-full mx-auto` with `w-full` on all six gallery wrappers; the grid's own `max-width` + `margin: 0 auto` does the centering.

**Two lessons worth keeping:**

- **`mx-auto` on a flex child is not a no-op.** Inside a flex container it stops the child stretching on the cross axis. If a wrapper should fill its parent, use `w-full`, not `max-w-full mx-auto`.
- **Validate layout at more than one viewport width.** The masonry CSS-columns change was checked at 1440px, where this collapse is invisible because content width ≈ viewport width. It only appears above ~1800px. Layout changes now get checked at 2560 / 2000 / 1440 / 900 / 412.

Verified on production across viewports — all six galleries identical in behaviour:

| viewport | masonry (`/cars`, `/places`, `/events`) | grid (`/live`, `/bw`, `/people`) |
|---|---|---|
| 2560px | 1800px, 4 col | 1830px, 4 col |
| 2000px | 1800px, 4 col | 1830px, 4 col |
| 1440px | 1440px, 4 col | 1440px, 4 col |
| 412px | 412px, 2 col | 412px, 2 col |

---

## 9. Navbar: WORK moves left to reveal the galleries

A first version exists on branch `feat/navbar-work-reveal` (`59f0a5a`) but was
**not** the requested behaviour and is parked, not merged. It drops a hover
panel beneath WORK. What is actually wanted is an inline reveal: entering a
gallery from `/work` animates WORK leftward and it stays there, with the
galleries revealed between it and CONTACT:

```
WORK | LIVE  BW  PEOPLE  PLACES  CARS  EVENTS | CONTACT
```

Points to settle when building it:

- The move is permanent while inside the Work section, not a hover state, so it
  is layout rather than an overlay. `feat/navbar-work-reveal` should probably be
  abandoned rather than extended.
- Six extra labels plus WORK and CONTACT is a lot of horizontal room. Needs a
  plan for narrow desktop widths before it collapses to the hamburger.
- Animating a layout change smoothly usually means FLIP (measure, transform,
  release) rather than transitioning layout properties, which do not animate
  cheaply.
- It should survive a hard load directly onto `/live` - the galleries need to be
  present without an entrance animation replaying on every navigation.

## 10. Landing page: swipe up to enter

Requested for later. The home page is a full-screen slideshow with an Enter
button; the idea is a swipe-up gesture that transitions into the site.

- Needs to work as a gesture on touch and as scroll/keyboard on desktop, and
  must not fight the scroll lock the home page applies.
- The Enter button should remain for anyone who does not discover the gesture.
- `prefers-reduced-motion` should skip the transition.

---

## 11. Cover and social-card images are the wrong shape and too small

Found auditing what `add-photos` did not cover. Every route declares its Open
Graph image as **1200×630**, but no file is that size:

| route | actual | declared |
|---|---|---|
| `/bw` `/live` `/cars` `/work` `/` | 450×675 | 1200×630 |
| `/people` | 450×600 | 1200×630 |
| `/events` | 484×450 | 1200×630 |
| `/contact` | 1440×1920 | 1200×630 |
| `/places` | 450×675 (a gallery photo — no cover exists) | 1200×630 |

Two consequences:

- **Shares render badly.** Platforms lay the card out from the declared size, so
  the real image is cropped or letterboxed. At 450px wide it is also under the
  threshold for a large card on Facebook and X, so a share becomes a small
  thumbnail rather than a banner. This undercuts the entity work in item 4 —
  every link someone posts looks worse than it should.
- **`/work` tiles are soft.** They render 400 CSS px square, so 800 physical on
  retina, from a 450px source — a 1.78× upscale. The same problem the galleries
  had before `-hd`.

`npm run add-photos -- --cover <name> <file>` now builds both derivatives
(900×900 tile, 1200×630 card, attention-cropped). What remains is editorial:
choosing which photo represents each gallery, exporting it, then pointing the
route metadata and `WorkClient` at the results. See `PHOTO-WORKFLOW.md`.

Interim option: bootstrap the cards from existing `-hd` gallery files rather
than waiting for new exports. Those are 1080–1620px, so a 1200×630 crop is close
to full quality and would be a large improvement over the current 450px files.
