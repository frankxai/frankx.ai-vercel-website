import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  typescript: {
    // Skip type checking during build (run separately)
    ignoreBuildErrors: true,
  },
  images: {
    // Enable modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Optimize device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 1 year
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async redirects() {
    return [
      // Realm → Inner Circle rename
      {
        source: '/realm',
        destination: '/inner-circle',
        permanent: true,
      },
      // Creator Lab signup → product page
      {
        source: '/creator-lab',
        destination: '/products/agentic-creator-os',
        permanent: false,
      },
      {
        source: '/creator-lab-starter',
        destination: '/products/agentic-creator-os',
        permanent: false,
      },
      // Blog post legacy redirects
      {
        source: '/blog/01-ai-doesnt-have-to-be-soulless',
        destination: '/blog/ai-doesnt-have-to-be-soulless',
        permanent: true,
      },
      {
        source: '/blog/02-the-soul-frequency-framework',
        destination: '/blog/soul-frequency-framework',
        permanent: true,
      },
      {
        source: '/blog/03-ai-guide-for-families-and-professionals',
        destination: '/blog/ai-guide-for-families-and-professionals',
        permanent: true,
      },
      {
        source: '/blog/04-conscious-ai-for-entrepreneurs',
        destination: '/blog/conscious-ai-for-entrepreneurs',
        permanent: true,
      },
      {
        source: '/blog/05-music-as-consciousness-technology',
        destination: '/blog/music-as-consciousness-technology',
        permanent: true,
      },
      {
        source: '/blog/06-intelligence-revolution-2025',
        destination: '/blog/intelligence-revolution-2025',
        permanent: true,
      },
      {
        source: '/blog/07-agentic-creator-os',
        destination: '/blog/agentic-creator-os',
        permanent: true,
      },
      {
        source: '/blog/08-golden-age-of-intelligence',
        destination: '/blog/golden-age-of-intelligence',
        permanent: true,
      },
      {
        source: '/blog/09-reader-first-golden-age',
        destination: '/blog/reader-first-golden-age',
        permanent: true,
      },
      {
        source: '/blog/10-agentic-ai-roadmap-2025',
        destination: '/blog/agentic-ai-roadmap-2025',
        permanent: true,
      },
      // Newsletter redirect - consolidate to main signup flow
      {
        source: '/newsletter',
        destination: '/start',
        permanent: false,
      },
      // Course redirects
      {
        source: '/courses/ai-ethics-governance',
        destination: '/courses?highlight=ai-ethics-governance',
        permanent: false,
      },
      {
        source: '/courses/family-ai-education',
        destination: '/courses?highlight=family-ai-education',
        permanent: false,
      },
      {
        source: '/courses/agent-architecture-deep-dive',
        destination: '/courses?highlight=agent-architecture-deep-dive',
        permanent: false,
      },
      {
        source: '/courses/prompt-engineering-mastery',
        destination: '/courses?highlight=prompt-engineering-mastery',
        permanent: false,
      },
      {
        source: '/courses/ai-business-strategy',
        destination: '/courses?highlight=ai-business-strategy',
        permanent: false,
      },
      // AI Architecture Hub redirects
      {
        source: '/prototypes',
        destination: '/ai-architecture/blueprints',
        permanent: true,
      },
      {
        source: '/ai-architectures',
        destination: '/ai-architecture',
        permanent: true,
      },
      // Product page redirects to main pages
      {
        source: '/products/soulbook',
        destination: '/soulbook',
        permanent: true,
      },
    ]
  },
  outputFileTracingRoot: __dirname,
}

export default nextConfig
