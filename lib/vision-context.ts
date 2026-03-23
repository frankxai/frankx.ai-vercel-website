import 'server-only'

import productsData from '@/data/products.json'
import profilesInventory from '@/data/inventories/profiles.json'
import blogInventory from '@/data/inventories/frankx/blog-articles.json'
import musicInventory from '@/data/inventories/frankx/music.json'
import roadmapData from '@/data/specs-roadmap.json'
import type { VisionBoardContext } from '@/lib/vision-context.types'

type JsonRecord = Record<string, unknown>

type ProductRecord = {
  name?: string
  category?: string
}

const ROUTE_CATALOG = [
  '/',
  '/about',
  '/vision',
  '/year-of-the-fire-horse',
  '/year-of-the-fire-horse/vision',
  '/blog',
  '/products',
  '/product-development',
  '/music',
  '/music-lab',
  '/feed',
  '/insights',
  '/research',
  '/research/feed',
  '/research/methodology',
  '/research/sources',
  '/agent-team',
  '/agents',
  '/agentic-ai-center',
  '/soulbook',
  '/soulbook/7-pillars',
  '/soulbook/assessment',
  '/soulbook/golden-path',
  '/soulbook/life-symphony',
  '/soulbook/vault',
  '/templates',
  '/shop',
  '/shop/templates',
  '/design-lab',
  '/design-lab/family-tree',
  '/goals',
  '/roadmap',
  '/ai-ops',
  '/ai-ops/architecture',
  '/ai-ops/patterns',
  '/ai-ops/models-2026',
  '/ai-ops/maturity',
  '/ai-ops/accelerator-packs',
  '/ai-ops/agi-ready',
  '/ai-architect',
  '/ai-architect/ai-coe-hub',
  '/ai-architect/multi-cloud-comparison',
  '/ai-architecture',
  '/ai-architectures',
  '/prompt-library',
  '/resources',
  '/resources/templates',
  '/courses',
  '/community',
  '/workshops',
  '/library',
  '/intelligence-atlas',
  '/creation-chronicles',
  '/content-studio',
  '/showcase',
  '/downloads',
  '/students',
  '/creators',
  '/for/creators',
  '/for/architects',
  '/vibe',
  '/golden-age',
  '/links',
  '/learn',
  '/tools',
  '/tools/roi-calculator',
  '/tools/strategy-canvas',
  '/tools/builder',
  '/waitlist',
  '/contact',
  '/newsletter',
  '/team',
  '/updates',
  '/achievements',
  '/vault',
  '/search',
  '/privacy',
  '/terms',
] as const

const DOC_HIGHLIGHTS = [
  'MASTER_DEVELOPMENT_PLAN.md',
  'COMPREHENSIVE_VISION_AND_BEST_PRACTICES.md',
  'CREATOR_PRODUCT_ROADMAP.md',
  'WEBSITE_MEMORY.md',
  'docs/WEBSITE_PHILOSOPHY.md',
  'docs/strategy/V3_TRANSFORMATION_STRATEGY.md',
  'docs/TEAM_STRUCTURE.md',
  'docs/truth-claims-playbook.md',
]

const ENGINEERING_SNAPSHOT = {
  docsCount: 120,
  dataFilesCount: 95,
  scriptsCount: 55,
  componentsCount: 240,
}

function collectTopSections(routes: readonly string[]) {
  const counts = new Map<string, number>()

  for (const route of routes) {
    const segment = route === '/' ? 'home' : route.split('/')[1] || 'home'
    counts.set(segment, (counts.get(segment) ?? 0) + 1)
  }

  return Array.from(counts.entries())
    .map(([segment, count]) => ({ segment, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12)
}

function collectSignatureRoutes(routes: readonly string[]): string[] {
  const preferred = [
    '/',
    '/vision',
    '/year-of-the-fire-horse/vision',
    '/year-of-the-fire-horse',
    '/blog',
    '/products',
    '/music',
    '/music-lab',
    '/feed',
    '/research',
    '/agent-team',
    '/agents',
    '/soulbook',
    '/templates',
    '/shop',
    '/design-lab',
    '/goals',
    '/roadmap',
  ]

  const selected = preferred.filter((route) => routes.includes(route))
  const remaining = routes.filter((route) => !selected.includes(route))

  return [...selected, ...remaining].slice(0, 18)
}

let cachedContext: VisionBoardContext | null = null
let cachedAt = 0

export function getVisionBoardContext(): VisionBoardContext {
  const now = Date.now()
  const cacheTtlMs = 10 * 60 * 1000

  if (cachedContext && now - cachedAt < cacheTtlMs) {
    return cachedContext
  }

  const products = productsData as ProductRecord[]
  const routes = [...ROUTE_CATALOG]
  const topSections = collectTopSections(routes)
  const signatureRoutes = collectSignatureRoutes(routes)

  const productNames = products
    .map((item) => String(item.name ?? '').trim())
    .filter(Boolean)
    .slice(0, 18)

  const productCategories = Array.from(
    new Set(
      products
        .map((item) => String(item.category ?? '').trim())
        .filter(Boolean)
    )
  ).slice(0, 12)

  const blogData = blogInventory as JsonRecord
  const articles = (blogData.articles as JsonRecord[] | undefined) ?? []
  const featuredArticles = articles
    .filter((article) => Boolean(article.featured))
    .slice(0, 8)
    .map((article) => String(article.title ?? '').trim())
    .filter(Boolean)

  const fallbackArticles = articles
    .slice(0, 8)
    .map((article) => String(article.title ?? '').trim())
    .filter(Boolean)

  const musicData = musicInventory as JsonRecord
  const playlists = (musicData._playlists as JsonRecord[] | undefined) ?? []
  const playlistNames = playlists
    .map((playlist) => String(playlist.name ?? '').trim())
    .filter(Boolean)
    .slice(0, 8)

  const profilesData = profilesInventory as JsonRecord
  const profileCount =
    ((profilesData.profiles as JsonRecord[] | undefined) ?? []).length

  const roadmap = roadmapData as JsonRecord
  const roadmapPillars = (roadmap.pillars as JsonRecord[] | undefined) ?? []
  const roadmapMilestones = (roadmap.milestones as JsonRecord[] | undefined) ?? []
  const roadmapRituals = (roadmap.rituals as JsonRecord[] | undefined) ?? []
  const roadmapSignals = (roadmap.signals as JsonRecord[] | undefined) ?? []
  const roadmapActions = (roadmap.nextActions as JsonRecord[] | undefined) ?? []

  const context: VisionBoardContext = {
    generatedAt: new Date().toISOString(),
    site: {
      totalRoutes: routes.length,
      topSections,
      signatureRoutes,
    },
    products: {
      count: products.length,
      names: productNames,
      categories: productCategories,
    },
    content: {
      blogCount: Number(blogData._count) || articles.length,
      featuredArticles:
        featuredArticles.length > 0 ? featuredArticles : fallbackArticles,
      musicPublishedCount: Number(musicData._count) || 0,
      musicEstimatedCount: Number(musicData._estimatedTotal) || 0,
      playlistNames,
      profileCount,
    },
    strategy: {
      vision: String(roadmap.vision ?? '').trim(),
      pillars: roadmapPillars
        .map((pillar) => String(pillar.title ?? '').trim())
        .filter(Boolean)
        .slice(0, 8),
      milestones: roadmapMilestones
        .map((milestone) => {
          const quarter = String(milestone.quarter ?? '').trim()
          const focus = String(milestone.focus ?? '').trim()
          return [quarter, focus].filter(Boolean).join(': ')
        })
        .filter(Boolean)
        .slice(0, 8),
      rituals: roadmapRituals
        .map((ritual) => String(ritual.name ?? '').trim())
        .filter(Boolean)
        .slice(0, 8),
      signals: roadmapSignals
        .map((signal) => String(signal.name ?? '').trim())
        .filter(Boolean)
        .slice(0, 8),
      nextActions: roadmapActions
        .map((action) => String(action.title ?? '').trim())
        .filter(Boolean)
        .slice(0, 8),
      agents: Object.keys((roadmap.agents as JsonRecord | undefined) ?? {}),
    },
    engineering: {
      docsCount: ENGINEERING_SNAPSHOT.docsCount,
      docsHighlights: DOC_HIGHLIGHTS,
      dataFilesCount: ENGINEERING_SNAPSHOT.dataFilesCount,
      scriptsCount: ENGINEERING_SNAPSHOT.scriptsCount,
      componentsCount: ENGINEERING_SNAPSHOT.componentsCount,
    },
  }

  cachedContext = context
  cachedAt = now

  return context
}
