# Follow-ups

Deferred work from the `seo/coverage-fixes` branch (merged 2026-08-24). Each item is scoped to be a separate branch/PR. Ordered by value.

---

## 1. Tailwind v4 config is not loaded — spacing/typography utilities are silently dead

**Severity: high (correctness), low (current visual impact).** Found during the pre-merge review.

`package.json` runs **Tailwind v4**, but `src/app/globals.css` still uses the v3 entrypoint:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

and `tailwind.config.js` is a v3-style config. **Tailwind v4 does not auto-load `tailwind.config.js`** — it needs an explicit `@config` directive, or the theme migrated to `@theme` in CSS. Combined with the legacy directives only pulling in part of the default theme, the measured result in the production build is:

| Utility class | Emits CSS? |
|---|---|
| `flex`, `items-center`, `w-full`, `opacity-0`, `underline`, `transition-colors`, `sr-only` | **yes** |
| arbitrary values — `min-h-[60vh]`, `text-[4rem]`, `text-[#54c6eb]` | **yes** |
| **all numeric spacing** — `gap-6`, `mt-4`, `px-5`, `py-24`, `p-4`, `m-0` | **no** |
| `font-bold` | **no** |
| everything from `tailwind.config.js` — `bg-brand-light`, `text-brand-text`, `text-accent-1`, `text-64px`, `max-w-700px`, `p-25` | **no** |

Verified by grepping the emitted stylesheets: **zero** `.gap-*`/`.mt-*`/`.px-*` selectors exist.

The site looks correct today only because layout comes from CSS Modules and `globals.css`, which set the real backgrounds, fonts and spacing. But these classes are scattered through the JSX and do nothing:

- `src/app/layout.jsx` — `bg-brand-light text-brand-text font-sans` on `<body>`
- `src/components/Icons.jsx` — `text-brand-light`, `gap-6`, `hover:text-accent-1` (×5)
- `src/app/HomeClient.jsx` — `bg-brand-dark`
- `src/app/{bw,live,people}/page.jsx` — `my-2.5`

`src/app/not-found.jsx` was written against these and was genuinely unstyled; it was converted to a CSS Module (`not-found.module.css`) as part of the merge, so it does not depend on the broken config. That is a workaround, not the fix.

**Fix options**

1. **Smallest:** add `@config "../../tailwind.config.js";` to the top of `globals.css` so v4 loads the existing config.
2. **Proper:** migrate to the v4 entrypoint — `@import "tailwindcss";` plus an `@theme` block for the brand colours, spacing and font scales — and delete `tailwind.config.js`.

**Do this on its own branch and diff the rendered pages before/after.** Reviving ~30 currently-inert classes will change layout in places, which is exactly why it was not done at merge time.

---

## 2. Adobe Fonts `font-display: swap` — biggest remaining performance win

**Not a code change — it is a setting in the Adobe Fonts web project dashboard.**

Production Lighthouse (mobile) shows the LCP element on **all four tested routes** is the navbar wordmark — a *text* node, not an image — with FCP at 3.2–3.5s. All six Typekit faces ship `font-display: auto`, so the browser hides text for ~3s.

- `font-display` is an `@font-face` descriptor and **cannot** be overridden from site CSS.
- `?display=swap` on the stylesheet URL is **ignored** by Typekit (verified by fetching the CSS both with and without it — still `font-display:auto` on all 6 faces).
- Preconnects to `use.typekit.net` / `p.typekit.net` are already in place (~340ms).

Setting the project's `font-display` to **swap** should pull LCP well below the current ~5.3–6.1s. If the dashboard route is unavailable, the fallback is loading the Typekit stylesheet asynchronously — but that trades a flash of fallback text and risks reintroducing CLS, which is currently 0.

**Re-measure after changing it**, and note the methodology below.

---

## 3. Lighthouse methodology — always measure production

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

## 5. GSC follow-up (~2 weeks after deploy)

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
