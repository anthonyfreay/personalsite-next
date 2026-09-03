/*
  Photos moved between galleries by /curate.

  A move renames the file to the target gallery's suffix, so the old URL would
  404 -- and gallery image URLs are in the sitemap and indexed. The data lives
  in JSON rather than being written into this file because /curate appends to
  it at runtime, and rewriting JS source from a route handler is a good way to
  corrupt a config.
*/
const movedImages = require('./src/lib/galleries/moved-images.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The optimizer is off deliberately. Enabling it (a92b8b5) gave the
    // galleries real srcsets, but 232 photos across ten deviceSizes and two
    // formats generates transformations in the thousands, which exhausted the
    // Vercel quota and made every uncached /_next/image return
    // 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED in production.
    //
    // Nothing here needs the optimizer: add-photos already emits exactly two
    // sizes per photo, and the grid renders the 675px `src` while the lightbox
    // uses `-hd`. Re-enabling this means paying per transformation, so check
    // the Vercel usage page before flipping it back.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    // Next's default ladder steps 828 -> 1080, which is a poor fit for the
    // galleries: a masonry tile is ~438 CSS px, so a retina display needs
    // ~876px and would round all the way up to 1080 - about 23% more pixels
    // than the tile can show. 900 is the smallest step that covers it.
    // A phone tile is ~191 CSS px, so ~382 physical - Next's smallest device
    // size is 640, a 1.68x overshoot. 450 covers it almost exactly.
    deviceSizes: [450, 640, 750, 828, 900, 1080, 1200, 1920, 2048, 3840],
  },
  async redirects() {
    return [
      // /resume is the URL that gets shared and printed on things, so it is the
      // one the site links to - never the versioned filename, which is free to
      // change underneath it. Permanent (308) so the redirect is cached and the
      // link equity consolidates onto the PDF.
      { source: '/resume', destination: '/resume_anthony_freay.pdf', permanent: true },
      { source: '/resume/', destination: '/resume_anthony_freay.pdf', permanent: true },
      // Google crawled /index.html while the old create-react-app template was
      // still being served from public/. That file is gone, so consolidate the
      // URL onto / rather than letting it start returning 404s.
      { source: '/index.html', destination: '/', permanent: true },
      // Gallery slugs used to carry a topic suffix (-music, -scapes, -color,
      // -portrait) that no longer matched the folder the photo lives in. They
      // now all carry the gallery name, which is what the full-resolution
      // masters are named too. These keep the old image URLs resolving: they
      // are indexed, and an image that 404s loses its search placement.
      //
      // Each pair needs two rules, because the size marker sits after the
      // suffix (`X-music-hd.webp` -> `X-live-hd.webp`) and an optional
      // `:rest(-hd)?` throws "Expected rest to be a string" when it is absent.
      ...[
        ['bw', 'portrait'],
        ['cars', 'color'],
        ['cars', 'bw'],
        ['events', 'color'],
        ['live', 'music'],
        ['people', 'portrait'],
        ['places', 'scapes'],
        ['places', 'color'],
      ].flatMap(([gallery, legacy]) =>
        ['-hd', ''].map((size) => ({
          source: `/${gallery}/:slug(.*)-${legacy}${size}.webp`,
          destination: `/${gallery}/:slug-${gallery}${size}.webp`,
          permanent: true,
        }))
      ),
      // One 308 per moved photo, both sizes. Permanent so the redirect is
      // cached and the link equity follows the photo to its new gallery.
      ...movedImages.flatMap(({ from, to }) => [
        { source: from, destination: to, permanent: true },
        {
          source: from.replace(/(\.\w+)$/, '-hd$1'),
          destination: to.replace(/(\.\w+)$/, '-hd$1'),
          permanent: true,
        },
      ]),
    ];
  },
};

module.exports = nextConfig;
