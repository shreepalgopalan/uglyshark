import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL!,
  },
  images: {
    domains: [
      'placehold.co',
      'wwd.com',
      'fashionista.com',
      'thefashionspot.com',
      'images.fashionista.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  }
};
export default nextConfig;