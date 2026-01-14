/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-nextshop.prospectbdltd.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.placeholder.com',
        pathname: '/**',
      },
    ],
    // Allow unoptimized images as fallback
    unoptimized: false,
  },
};

export default nextConfig;
