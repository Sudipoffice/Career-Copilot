import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  transpilePackages: [
    '@career-copilot/ui',
    '@career-copilot/shared',
    '@career-copilot/types',
    '@career-copilot/schemas',
    '@career-copilot/config',
  ],
};

export default nextConfig;
