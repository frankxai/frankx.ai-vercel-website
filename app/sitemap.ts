import type { MetadataRoute } from 'next'
import routeIndex from '@/data/route-index.json'

const BASE_URL = 'https://frankx.ai'

type RouteIndexEntry = (typeof routeIndex.routes)[number]
type RouteType = RouteIndexEntry['type']
type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

const EXCLUDED_PREFIXES = [
  '/admin',
  '/api',
  '/auth',
  '/checkout',
  '/dashboard',
  '/design-lab',
  '/downloads/preview',
  '/go',
  '/studio',
] as const

const EXCLUDED_EXACT = new Set([
  '/llm-hub.json',
  '/llms.txt',
  '/llms-full.txt',
  '/robots.txt',
  '/rss.xml',
  '/sitemap.xml',
])

const PRIORITY_BY_TYPE: Partial<Record<RouteType, number>> = {
  core: 0.85,
  blog: 0.8,
  community: 0.6,
  guide: 0.7,
  library: 0.75,
  newsletter: 0.7,
  os: 0.75,
  partnership: 0.7,
  product: 0.85,
  research: 0.75,
  section: 0.6,
  static: 0.4,
  tool: 0.7,
  video: 0.75,
  workshop: 0.8,
}

const FREQUENCY_BY_TYPE: Partial<Record<RouteType, ChangeFrequency>> = {
  blog: 'monthly',
  core: 'weekly',
  guide: 'monthly',
  newsletter: 'monthly',
  product: 'weekly',
  research: 'weekly',
  static: 'yearly',
  video: 'weekly',
  workshop: 'monthly',
}

function isPublicIndexableRoute(href: string): boolean {
  if (!href.startsWith('/')) return false
  if (href.includes('[') || href.includes('(')) return false
  if (href.endsWith('.json') || href.endsWith('.xml') || href.endsWith('.txt')) return false
  if (EXCLUDED_EXACT.has(href)) return false
  return !EXCLUDED_PREFIXES.some((prefix) => href === prefix || href.startsWith(`${prefix}/`))
}

function buildAbsoluteUrl(href: string): string {
  return href === '/' ? BASE_URL : `${BASE_URL}${href}`
}

function getPriority(route: RouteIndexEntry): number {
  if (route.href === '/') return 1
  if (route.href === '/blog' || route.href === '/products' || route.href === '/prompt-library') return 0.9
  if (route.href.startsWith('/blog/')) return 0.8
  if (route.href.startsWith('/products/')) return 0.85
  return PRIORITY_BY_TYPE[route.type] ?? 0.5
}

function getChangeFrequency(route: RouteIndexEntry): ChangeFrequency {
  if (route.href === '/') return 'weekly'
  if (route.href === '/privacy' || route.href === '/terms' || route.href === '/legal') return 'yearly'
  if (route.href === '/blog') return 'daily'
  if (route.href.startsWith('/blog/')) return 'monthly'
  return FREQUENCY_BY_TYPE[route.type] ?? 'monthly'
}

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()
  const seenUrls = new Set<string>()

  return routeIndex.routes
    .filter((route) => isPublicIndexableRoute(route.href))
    .flatMap((route) => {
      const url = buildAbsoluteUrl(route.href)
      if (seenUrls.has(url)) return []
      seenUrls.add(url)

      return {
        url,
        lastModified: currentDate,
        changeFrequency: getChangeFrequency(route),
        priority: getPriority(route),
      }
    })
}
