/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/resume', destination: '/resume_anthony_freay.pdf', permanent: false },
      { source: '/resume/', destination: '/resume_anthony_freay.pdf', permanent: false },
    ];
  },
};

module.exports = nextConfig;
