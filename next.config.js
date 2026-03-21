/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/resume', destination: '/resume_anthony_freay.pdf', permanent: false },
      { source: '/resume/', destination: '/resume_anthony_freay.pdf', permanent: false },
    ];
  },
};

module.exports = nextConfig;
