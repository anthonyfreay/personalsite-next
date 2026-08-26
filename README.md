# Anthony Freay Personal Site (Next.js)

Portfolio site for [anthonyfreay.com](https://www.anthonyfreay.com), built with the Next.js App Router.

The site showcases photography work across multiple galleries (live, black & white, people, places, cars, events), plus a contact page with Formspree integration.

## Stack

- `next` 16 (App Router)
- `react` 19
- Tailwind CSS 4 (v4 entrypoint: `@import "tailwindcss"` + `@theme` in `src/app/globals.css`; there is no `tailwind.config.js`) + CSS modules
- `yet-another-react-lightbox` for gallery fullscreen views
- `@formspree/react` for contact form submissions
- `@vercel/analytics` + `@vercel/speed-insights`
- `@next/third-parties` for Google Analytics
- `lucide-react` + `react-icons` for icons

## Project Structure

- `src/app` - route pages, route-level metadata, and client route components
- `src/components` - shared UI components (`Navbar`, `Footer`, galleries, contact form)
- `src/lib/constants.js` - site-level metadata/constants
- `public` - static assets (gallery images, covers, favicon, resume, sitemap)
- `scripts/generate-sitemap.js` - builds `public/sitemap.xml` with image entries

## Route Map

- `/` - hero slideshow landing page
- `/work` - category index page
- `/live` - live music gallery
- `/bw` - black & white gallery
- `/people` - portrait gallery
- `/places` - travel/street gallery (masonry)
- `/cars` - automotive gallery (masonry)
- `/events` - event gallery (masonry)
- `/contact` - bio + contact form

Additional redirect:

- `/resume` -> `/resume_anthony_freay.pdf` (see `next.config.js`)

## Local Development

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build, then generate sitemap
- `npm run start` - start built app
- `npm run lint` - run ESLint
- `npm run generate-sitemap` - manually generate `public/sitemap.xml`

## SEO & Analytics

- Global metadata is configured in `src/app/layout.jsx` and `src/lib/constants.js`.
- Route-level metadata is defined in each route's `page.jsx`.
- JSON-LD is embedded on the home and gallery pages.
- Google Analytics is added via `GoogleAnalytics` in `src/app/layout.jsx`.
- Vercel Analytics and Speed Insights are enabled in `src/app/layout.jsx`.

## Contact Form

- Contact form uses Formspree in `src/components/ContactForm.jsx`.
- The Formspree form ID is currently hardcoded in `useForm('mzdadlpl')`.

If you change Formspree projects, update that ID before deploying.

## Adding photos

Export once from Lightroom at full resolution, then:

```bash
npm run add-photos -- <gallery> <file-or-folder>...   # bw live people cars places events
npm run add-photos -- live ~/Desktop/exports          # a whole folder
npm run add-photos -- events shot.jpg --alt "Cake"    # one photo, with its caption
npm run add-photos -- --check                         # manifests and files agree?
```

For each photo it writes two long-edge-constrained WebPs and registers the
photo in `src/lib/galleries/<gallery>.js`:

| file | long edge | used for |
|---|---|---|
| `<slug>.webp` | 675px | the canonical URL, referenced by the sitemap and JSON-LD |
| `<slug>-hd.webp` | 1620px | what the grid and lightbox render from |

The grid does not pay for the larger file - Next downscales `-hd` to whatever
the tile needs. The extra pixels are there for the full-screen lightbox.

The manifest entry records the `-hd` dimensions, so tiles reserve the right
aspect ratio and there is no layout shift, and the photo's dominant colour,
which is the tone a tile paints while the image loads.

Re-running is safe: photos already in the manifest are skipped. `--dry-run`
shows what would happen.

**Afterwards, edit the alt text.** It defaults to a humanised filename, and it
is real SEO surface: it becomes the image sitemap title, the JSON-LD
`Photograph` name, and the hover caption on `/live`.

## Content Maintenance Notes

Gallery images live in one place per gallery, `src/lib/galleries/<gallery>.js`,
and that single list feeds the UI, the JSON-LD and the image sitemap. There is
nothing to keep in sync by hand - use `npm run add-photos` (above) rather than
editing `public/` directly, and `npm run add-photos -- --check` verifies the
manifests and the files on disk still agree in both directions.

## Deployment

This repo is configured for Vercel (`vercel.json`):

- Build command: `npm run build`
- Output directory: `.next`

On each production build, the sitemap is regenerated and written to `public/sitemap.xml`.
