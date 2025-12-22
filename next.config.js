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
  typescript: {
    // Skip type checking during build (run separately with tsc)
    ignoreBuildErrors: true,
  },
  experimental: {
    mdxRs: true,
    // Cache Components disabled due to conflicts with existing route configs
    // TODO: Enable after removing runtime/revalidate/dynamic exports from routes
    // cacheComponents: true,
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
}

module.exports = withMDX(nextConfig)