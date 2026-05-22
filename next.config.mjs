import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Load curated path aliases for 301 redirects.
 * Source: data/redirect-aliases.json (operator-curated; agent proposals require approval).
 * Format: { aliases: { from: to, ... } } — see file for schema doc.
 * Failing safely to {} means a bad file never breaks the build.
 */
function loadRedirectAliases() {
  try {
    const aliasPath = join(__dirname, 'data', 'redirect-aliases.json')
    if (!existsSync(aliasPath)) return []
    const raw = JSON.parse(readFileSync(aliasPath, 'utf8'))
    const aliases = raw.aliases && typeof raw.aliases === 'object' ? raw.aliases : {}
    return Object.entries(aliases).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }))
  } catch (err) {
    console.warn('[next.config] failed to load redirect-aliases.json:', err.message)
    return []
  }
}

const REDIRECT_ALIASES = loadRedirectAliases()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  typescript: {
    // Type-check on every Vercel build. `npm run merge:gate` enforces tsc locally
    // and in CI; this guarantees the same gate fires at deploy time. Flipped to
    // false on 2026-05-07 after the overnight excellence audit cleared the TS
    // baseline (was silently shipping ~17 errors per AUDIT_STRATEGY.md).
    // To temporarily bypass in an emergency: set ignoreBuildErrors: true and
    // file an issue documenting the regression that justifies the bypass.
    ignoreBuildErrors: false,
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
      // Curated path aliases — loaded from data/redirect-aliases.json.
      // Includes /ikigai → /workshops/ikigai-branding and the rest of the
      // legacy URL recovery set. Operator + agent additions land here on approval.
      ...REDIRECT_ALIASES,
      // Arcanea domain canonicalization
      {
        source: '/arcanea',
        destination: 'https://arcanea.ai',
        permanent: true,
      },
      {
        source: '/arcanea/:path*',
        destination: 'https://arcanea.ai/:path*',
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
      // Research Hub content relocation redirects
      {
        source: '/research/visionaries',
        destination: '/visionaries',
        permanent: true,
      },
      {
        source: '/research/visionariers',
        destination: '/visionaries',
        permanent: true,
      },
      {
        source: '/research/ai-evolution',
        destination: '/ai-evolution',
        permanent: true,
      },
      {
        source: '/research/visual-intelligence',
        destination: '/tools/visual-intelligence',
        permanent: true,
      },
      // Blog post legacy redirects
      {
        source: '/blog/big-props-to-the-builders-of-this-era',
        destination: '/blog/props-to-the-builders-of-this-era',
        permanent: true,
      },
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
      // Course redirects
      {
        source: '/courses/ai-ethics-governance',
        destination: '/courses/conscious-ai-foundations',
        permanent: false,
      },
      {
        source: '/courses/family-ai-education',
        destination: '/courses/conscious-ai-foundations',
        permanent: false,
      },
      {
        source: '/courses/agent-architecture-deep-dive',
        destination: '/courses/agent-architecture-systems',
        permanent: false,
      },
      {
        source: '/courses/prompt-engineering-mastery',
        destination: '/courses/agent-architecture-systems',
        permanent: false,
      },
      {
        source: '/courses/ai-business-strategy',
        destination: '/courses/creator-business-systems',
        permanent: false,
      },
      {
        source: '/courses/ai-fundamentals',
        destination: '/courses/conscious-ai-foundations',
        permanent: false,
      },
      {
        source: '/courses/advanced-prompt-engineering',
        destination: '/courses/agent-architecture-systems',
        permanent: false,
      },
      {
        source: '/courses/creative-energy',
        destination: '/courses/conscious-ai-foundations',
        permanent: false,
      },
      {
        source: '/courses/ai-mastery',
        destination: '/courses/agent-architecture-systems',
        permanent: false,
      },
      {
        source: '/courses/suno-mastery',
        destination: '/courses/creator-business-systems',
        permanent: false,
      },
      {
        source: '/courses/creator-business',
        destination: '/courses/creator-business-systems',
        permanent: false,
      },
      {
        source: '/courses/purpose-driven',
        destination: '/courses/conscious-ai-foundations',
        permanent: false,
      },
      // AI Architecture Hub redirects - consolidate all variants to single hub
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
      {
        source: '/ai-architect',
        destination: '/ai-architecture',
        permanent: true,
      },
      {
        source: '/ai-architect/:path*',
        destination: '/ai-architecture/:path*',
        permanent: true,
      },
      // Product page redirects to main pages
      {
        source: '/products/soulbook',
        destination: '/soulbook',
        permanent: true,
      },
      // Gallery consolidation
      {
        source: '/ai-art',
        destination: '/gallery',
        permanent: true,
      },
      // Shop redirects
      {
        source: '/store',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/marketplace',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/cards',
        destination: '/collectibles/trading-cards',
        permanent: true,
      },
    ]
  },
  outputFileTracingRoot: __dirname,
  // Belt-and-suspenders alongside .vercelignore: shrink serverless function bundles
  // by ensuring large static-asset trees never get traced into function code.
  // Phase 1.3 of VERCEL-COST-MASSIVE-ACTION (2026-05-05).
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-*',
      'node_modules/@esbuild/*',
      'node_modules/sharp/build/**',
      '.next/cache/**',
      '.git/**',
      'docs/**',
      'research/**',
      'tests/**',
      '_archive/**',
      '_inbox/**',
      'archived/**',
      'v1-enterprise-backup/**',
      'public/images/**',
      'public/videos/**',
    ],
  },
  // Packages with CommonJS/ESM mixed exports that fail Turbopack bundling.
  // Listed here so Next.js requires them at runtime from node_modules instead.
  serverExternalPackages: [
    'resend',
    '@react-email/render',
    '@react-email/components',
    'htmlparser2',
    'entities',
  ],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // CSP: Keep in sync with ALL iframe embeds and external scripts in the codebase
            // Audit: grep -r '<iframe' app/ components/ to find all embed sources
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com https://plausible.io https://assets.lemonsqueezy.com https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https: http:",
              "media-src 'self' https:",
              "frame-src 'self' https://suno.com https://*.suno.com https://www.youtube.com https://open.spotify.com https://embeds.beehiiv.com https://vercel.live https://*.lemonsqueezy.com https://vusercontent.net https://*.vusercontent.net",
              "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://*.vercel.app https://plausible.io https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
            ].join('; '),
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
