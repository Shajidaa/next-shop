/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-nextshop.prospectbdltd.com',
        pathname: '/api/temporary-url/**',
      },
      // Add other domains as needed
    ],
    // Optional: Increase timeout for slow CDN responses
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },



};

export default nextConfig;
