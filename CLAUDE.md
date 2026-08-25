# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - start local dev server (http://localhost:3000)
- `npm run build` - production build, then regenerates `public/sitemap.xml`
- `npm run start` - start built app
- `npm run lint` - run ESLint (flat config, `eslint-config-next/core-web-vitals`)
- `npm run generate-sitemap` - regenerate `public/sitemap.xml` without a full build

There is no test suite in this repo.

## Architecture

Next.js 16 App Router site, all JS/JSX (no TypeScript). Path alias `@/*` maps to `src/*` (see `jsconfig.json`).

### Server page + client gallery split

Most gallery routes follow one of two patterns:

1. **Server page only** (`src/app/bw/page.jsx`, `people`, `live`): the `page.jsx` itself defines `metadata`, JSON-LD structured data, and the `imageData` array, and renders `<ImageGallery images={imageData} />` directly (client component, but page stays server-rendered around it).
2. **Server page + separate Client component** (`src/app/cars/page.jsx` + `CarsClient.jsx`, same for `events`, `places`): `page.jsx` holds `metadata`/JSON-LD (needs server-side export), and delegates image arrays + the masonry gallery render to a `'use client'` file. This split exists because `MasonryImageGallery` needs client-side `Masonry` layout logic and can't co-locate cleanly with server `metadata` exports in one file — use this pattern when a route needs `MasonryImageGallery`.

Two gallery components in `src/components`:
- `ImageGallery.jsx` - flex-wrap grid, used for simpler galleries (bw, live, people).
- `MasonryImageGallery.jsx` - takes separate `horizontalImages`/`verticalImages` arrays and interleaves them proportionally into a masonry layout (via `react-masonry-css`), used for cars/events/places.

Both open images in a shared `yet-another-react-lightbox` instance on click.

### Image data convention

Every image entry is `{ alt, src }`; an `hdSrc` is always derived by suffixing the filename with `-hd` before the extension (`replace(/(\.\w+)$/, '-hd$1')`), either inline in the page or via a `.map()`. The low-res `src` renders in the grid; `hdSrc` is swapped in for the lightbox. When adding gallery images, both a normal and an `-hd` variant must exist in `public/<category>/`.

### Keeping image lists in sync

Image arrays are duplicated in two places and must be kept in sync manually when adding/removing photos:
1. The route's `page.jsx` or `<Category>Client.jsx` under `src/app/**` (drives the actual UI).
2. `scripts/generate-sitemap.js`'s `galleryImages` map (drives image sitemap `<image:image>` entries; uses the non-`-hd` filename and a `title` per image).

`next.config.js` sets `images.unoptimized: true` — Next/Image does no server-side optimization, so images must already be sized/compressed appropriately in `public/`.

### Site metadata

Global `<head>` metadata, Vercel Analytics/Speed Insights, and Google Analytics are wired in `src/app/layout.jsx`. Shared constants (site name/title/description/URL, nav `ROUTES`, GA id) live in `src/lib/constants.js` — `Navbar` and route metadata should source from here rather than hardcoding. Each gallery `page.jsx` additionally defines its own `metadata` (title/description/OG/Twitter) and an inline JSON-LD `ImageGallery`/`Photograph` schema block.

### Contact form

`src/components/ContactForm.jsx` uses `@formspree/react`'s `useForm` with a hardcoded form ID (`mzdadlpl`). Update this ID if the Formspree project changes.

### Redirects

- `/resume` and `/resume/` → `/resume_anthony_freay.pdf`, defined in `next.config.js`.
- Non-www → www canonicalization for `anthonyfreay.com`, defined in `vercel.json` (Vercel-level redirect, not Next.js).

### Styling

Tailwind CSS 4 (via `@tailwindcss/postcss`) for layout/utility classes, plus CSS Modules (`*.module.css`) per-component for animations and custom styles (e.g. `ImageGallery.module.css` fade-in keyframes, `Navbar.module.css`).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
