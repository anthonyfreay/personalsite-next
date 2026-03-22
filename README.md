# Anthony Freay Personal Site (Next.js)

Portfolio site for [anthonyfreay.com](https://www.anthonyfreay.com), built with the Next.js App Router.

The site showcases photography work across multiple galleries (live, black & white, people, places, cars, events), plus a contact page with Formspree integration.

## Stack

- `next` 16 (App Router)
- `react` 19
- Tailwind CSS 4 + CSS modules
- `yet-another-react-lightbox` for gallery fullscreen views
- `react-masonry-css` for masonry layouts
- `@formspree/react` for contact form submissions
- `@vercel/analytics` + `@vercel/speed-insights`

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

## Content Maintenance Notes

When adding/removing gallery images, keep these in sync:

1. Route/client image arrays under `src/app/**` (used by the UI).
2. `scripts/generate-sitemap.js` gallery image lists (used for image sitemap entries).

Most galleries expect a regular image and an `-hd` variant for lightbox display.

## Deployment

This repo is configured for Vercel (`vercel.json`):

- Build command: `npm run build`
- Output directory: `.next`

On each production build, the sitemap is regenerated and written to `public/sitemap.xml`.
