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
      { source: '/resume', destination: '/resume_anthony_freay.pdf', permanent: false },
      { source: '/resume/', destination: '/resume_anthony_freay.pdf', permanent: false },
      // Google crawled /index.html while the old create-react-app template was
      // still being served from public/. That file is gone, so consolidate the
      // URL onto / rather than letting it start returning 404s.
      { source: '/index.html', destination: '/', permanent: true },
    ];
  },
};

module.exports = nextConfig;
