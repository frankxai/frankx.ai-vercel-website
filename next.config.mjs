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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
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
    ]
  },
  outputFileTracingRoot: __dirname,
}

export default nextConfig
