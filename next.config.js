/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
    ];
  },
};

module.exports = nextConfig;
