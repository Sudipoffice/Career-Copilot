import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),
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
