/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RAPID_API_KEY: process.env.RAPID_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'wwd.com',
      },
      {
        protocol: 'https',
        hostname: '*.fashionista.com',
      },
      {
        protocol: 'https',
        hostname: '*.thefashionspot.com',
      }
    ],
  }
};
module.exports = nextConfig;