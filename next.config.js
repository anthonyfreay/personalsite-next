/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
