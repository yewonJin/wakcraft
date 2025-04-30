import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      '@/components/atoms',
      '@/components/molecules',
      '@/components/organisms',
      '@/components/templates',
      '@/hooks',
    ],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wakcraft.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
