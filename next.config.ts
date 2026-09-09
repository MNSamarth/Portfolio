import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  ...(isGitHubPages ? { assetPrefix: '/Portfolio' } : {}),
};

export default nextConfig;
