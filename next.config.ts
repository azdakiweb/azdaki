import type { NextConfig } from 'next';

const YEAR = 31536000;

const config: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75],
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [96, 160, 256, 384, 512],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
  },
  async redirects() {
    return [{ source: '/', destination: '/ka', permanent: false }];
  },
  async headers() {
    const immutable = [{ key: 'Cache-Control', value: `public, max-age=${YEAR}, immutable` }];
    return [
      { source: '/images/:path*', headers: immutable },
      { source: '/brand/:path*', headers: immutable },
    ];
  },
};

export default config;
