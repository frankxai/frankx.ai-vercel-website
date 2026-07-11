import routeIndex from '@/data/route-index.json'

export type SiteSearchGroup =
  | 'Music'
  | 'GenCreators'
  | 'Learn'
  | 'Build'
  | 'Invest'
  | 'Explore'
  | 'Shortcuts'

export type SiteSearchItem = {
  title: string
  description: string
  href: string
  group: SiteSearchGroup
  type: string
  tags: string[]
  external?: boolean
}

type RouteIndexRoute = {
  href: string
  title: string
  description?: string
  type?: string
  tags?: string[]
}

const ROUTES = (routeIndex as { routes: RouteIndexRoute[] }).routes

const BLOCKED_PREFIXES = ['/admin', '/api', '/auth', '/studio', '/papa', '/familie', '/family/tree']
const BLOCKED_EXACT = new Set(['/thank-you', '/unsubscribe'])

const MANUAL_ITEMS: SiteSearchItem[] = [
  {
    group: 'Music',
    title: 'Suno Profile',
    description: 'Live Suno catalog',
    href: 'https://suno.com/@frankx',
    type: 'external',
    tags: ['music', 'suno', 'catalog'],
    external: true,
  },
  {
    group: 'Explore',
    title: 'SIS Starter Pack',
    description: 'Download the Claude Desktop starter pack',
    href: 'https://github.com/frankxai/Starlight-Intelligence-System/releases/latest',
    type: 'external',
    tags: ['starlight', 'starter', 'download'],
    external: true,
  },
]

const CURATED_HREFS = [
  '/start',
  '/blog',
  '/prompt-library',
  '/ai-architecture',
  '/music',
  '/research',
  '/acos',
  '/search',
]

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9/.\s-]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function titleFromHref(href: string) {
  const last = href.split('/').filter(Boolean).pop()
  if (!last) return 'Home'
  return last.replace(/[-_]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

function groupForRoute(route: RouteIndexRoute): SiteSearchGroup {
  const href = route.href

  if (href === '/' || href === '/start' || href === '/blog' || href === '/search') return 'Shortcuts'
  if (href.startsWith('/music') || href.startsWith('/vibe') || href.startsWith('/products/vibe-os')) return 'Music'
  if (
    href.startsWith('/gencreator') ||
    href.startsWith('/prompt') ||
    href.startsWith('/creation-chronicles') ||
    href.startsWith('/templates')
  ) {
    return 'GenCreators'
  }
  if (
    href.startsWith('/learn') ||
    href.startsWith('/courses') ||
    href.startsWith('/guides') ||
    href.startsWith('/books') ||
    href.startsWith('/library') ||
    href.startsWith('/students') ||
    href.startsWith('/games') ||
    href.startsWith('/watch')
  ) {
    return 'Learn'
  }
  if (
    href.startsWith('/ai-architecture') ||
    href.startsWith('/ai-world') ||
    href.startsWith('/developers') ||
    href.startsWith('/consulting') ||
    href.startsWith('/agent') ||
    href.startsWith('/tools') ||
    href.startsWith('/superpowers') ||
    href.startsWith('/ai-ops') ||
    href.startsWith('/automation')
  ) {
    return 'Build'
  }
  if (href.startsWith('/investor')) return 'Invest'
  return 'Explore'
}

function isSearchableRoute(route: RouteIndexRoute) {
  if (!route.href.startsWith('/')) return false
  if (BLOCKED_EXACT.has(route.href)) return false
  return !BLOCKED_PREFIXES.some((prefix) => route.href === prefix || route.href.startsWith(`${prefix}/`))
}

function routeToItem(route: RouteIndexRoute): SiteSearchItem {
  return {
    title: route.title || titleFromHref(route.href),
    description: route.description || `${titleFromHref(route.href)} on FrankX.ai`,
    href: route.href,
    group: groupForRoute(route),
    type: route.type || 'page',
    tags: route.tags || [],
  }
}

function dedupeByHref(items: SiteSearchItem[]) {
  const seen = new Set<string>()
  return items.filter((item) => {
    if (seen.has(item.href)) return false
    seen.add(item.href)
    return true
  })
}

export const siteSearchItems = dedupeByHref([
  ...MANUAL_ITEMS,
  ...ROUTES.filter(isSearchableRoute).map(routeToItem),
])

export function getCuratedSearchItems(limit = 8) {
  const curated = CURATED_HREFS
    .map((href) => siteSearchItems.find((item) => item.href === href))
    .filter(Boolean) as SiteSearchItem[]

  return curated.slice(0, limit)
}

function scoreItem(item: SiteSearchItem, query: string, tokens: string[]) {
  const title = normalize(item.title)
  const description = normalize(item.description)
  const href = normalize(item.href)
  const group = normalize(item.group)
  const tags = normalize(item.tags.join(' '))
  let score = 0

  if (title === query) score += 140
  if (href === query) score += 130
  if (title.startsWith(query)) score += 90
  if (href.includes(query)) score += 70
  if (title.includes(query)) score += 65
  if (description.includes(query)) score += 35
  if (tags.includes(query)) score += 30
  if (group.includes(query)) score += 15

  for (const token of tokens) {
    if (!token) continue
    if (title.startsWith(token)) score += 24
    else if (title.includes(token)) score += 16
    if (href.includes(token)) score += 14
    if (tags.includes(token)) score += 10
    if (description.includes(token)) score += 7
    if (group.includes(token)) score += 4
  }

  if (item.type === 'core') score += 8
  if (item.type === 'tool' || item.type === 'product') score += 6
  if (item.type === 'blog' || item.type === 'research' || item.type === 'guide') score += 4

  return score
}

export function searchSiteItems(query: string, limit = 12) {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) return getCuratedSearchItems(limit)

  const tokens = normalizedQuery.split(' ').filter(Boolean)

  return siteSearchItems
    .map((item) => ({ item, score: scoreItem(item, normalizedQuery, tokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map(({ item }) => item)
}
