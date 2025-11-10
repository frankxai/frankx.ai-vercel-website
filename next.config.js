/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
    // Optimize package imports for faster builds
    optimizePackageImports: ['lucide-react', 'framer-motion'],
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
  outputFileTracingRoot: __dirname,
  // Turbopack configuration (default in Next.js 16)
  // Use --webpack flag if you need to override

  // 301 Redirects for duplicate pages consolidation
  async redirects() {
    return [
      // Assessment Pages - Consolidate to /assessment
      {
        source: '/ai-assessment',
        destination: '/assessment',
        permanent: true,
      },
      {
        source: '/soul-frequency-assessment',
        destination: '/assessment',
        permanent: true,
      },
      {
        source: '/soul-frequency-quiz',
        destination: '/assessment',
        permanent: true,
      },
      {
        source: '/assessment/creative',
        destination: '/assessment?type=creative',
        permanent: true,
      },
      {
        source: '/assessment/advanced',
        destination: '/assessment?type=advanced',
        permanent: true,
      },

      // Creator OS Products - Consolidate similar products
      {
        source: '/products/generative-creator-os',
        destination: '/products/agentic-creator-os',
        permanent: true,
      },

      // Blog/Chronicles - Consolidate to /blog
      {
        source: '/creation-chronicles',
        destination: '/blog?category=chronicles',
        permanent: true,
      },

      // Community Pages - Consolidate to /community
      {
        source: '/realm',
        destination: '/community',
        permanent: true,
      },
    ];
  },
}

module.exports = withMDX(nextConfig)