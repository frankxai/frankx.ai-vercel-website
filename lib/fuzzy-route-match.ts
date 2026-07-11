/**
 * Fuzzy route matcher — finds the most likely intended route for an unknown URL.
 *
 * Powers app/not-found.tsx: when a request lands on a path that doesn't map to a
 * real route AND isn't covered by a curated alias in data/redirect-aliases.json,
 * this matcher returns the top-5 most-likely intended routes so the 404 page can
 * render rich suggestions instead of a dead end.
 *
 * Design choices:
 *   - Fuse.js (not Lunr) — Lunr is great for full-text but heavier; Fuse handles
 *     short-string fuzzy match (URLs + titles) with weighted keys natively.
 *   - All work happens at module init: route-index.json is loaded once, the Fuse
 *     index is built once. Per-request cost is just `fuse.search(pathname)`.
 *   - Conservative threshold: we set Fuse threshold to 0.5 (lower = stricter).
 *     Items above that don't appear in suggestions. Per Frank's call we never
 *     auto-redirect on fuzzy hits — always render suggestions.
 *   - Reasoning hints: each match carries `matchedOn` so the UI can explain
 *     WHY this route was suggested ("matched the slug 'ikigai'").
 */

import Fuse from 'fuse.js'
import routeIndex from '@/data/route-index.json'

export interface Route {
  href: string
  title?: string
  description?: string
  tags?: string[]
  type:
    | 'core'
    | 'blog'
    | 'workshop'
    | 'product'
    | 'guide'
    | 'library'
    | 'os'
    | 'research'
    | 'newsletter'
    | 'partnership'
    | 'tool'
    | 'community'
    | 'section'
    | 'video'
    | 'static'
    | 'legacy'
}

export interface RouteIndex {
  version: string
  stats: {
    total: number
    aliases: number
    byType: Record<string, number>
  }
  routes: Route[]
  aliases: Record<string, string>
}

export interface ScoredRoute extends Route {
  score: number // 0 = perfect match, 1 = no similarity
  matchedOn: string // human-readable hint, e.g. "title matched 'ikigai'"
}

export interface MatchResult {
  matches: ScoredRoute[]
  topConfidence: number // 1 - bestScore; higher = better. 0..1
  aliasHit: string | null // if pathname is in aliases map, returns canonical target
}

const typedIndex = routeIndex as RouteIndex

const suggestionBlockedPrefixes = ['/admin', '/api', '/auth', '/dashboard', '/familie', '/family/tree', '/papa']
const suggestionRoutes = typedIndex.routes.filter(
  (route) => !suggestionBlockedPrefixes.some((prefix) => route.href === prefix || route.href.startsWith(`${prefix}/`))
)

// Build once at module init — Fuse.js indexes are pure and cheap to reuse.
const fuse = new Fuse(suggestionRoutes, {
  keys: [
    { name: 'href', weight: 0.45 },
    { name: 'title', weight: 0.35 },
    { name: 'tags', weight: 0.2 },
  ],
  includeScore: true,
  includeMatches: true,
  threshold: 0.5, // 0 = exact, 1 = anything. 0.5 catches typos but rejects nonsense.
  ignoreLocation: true, // we don't care WHERE the match is in the string
  minMatchCharLength: 2,
})

/**
 * Match a pathname against the route corpus.
 *
 * @param pathname e.g. "/ikigaii-branding" or "/typo"
 * @param maxResults default 5
 */
export function matchRoute(pathname: string, maxResults = 5): MatchResult {
  const normalized = pathname.toLowerCase().trim()

  // Curated-alias fast path
  const aliasHit = typedIndex.aliases[normalized] || null

  // Build a query that Fuse can chew on — strip leading slash, replace separators
  const query = normalized.replace(/^\//, '').replace(/[-/_]+/g, ' ').trim()
  if (!query) {
    return { matches: [], topConfidence: 0, aliasHit }
  }

  const raw = fuse.search(query, { limit: maxResults })

  const matches: ScoredRoute[] = raw.map((r) => {
    const matchedKey = r.matches?.[0]?.key || 'href'
    const matchedValue = r.matches?.[0]?.value || ''
    return {
      ...r.item,
      score: r.score ?? 1,
      matchedOn: matchedKey === 'href'
        ? `path overlap with ${matchedValue}`
        : matchedKey === 'title'
          ? `title: "${matchedValue}"`
          : `tag: ${matchedValue}`,
    }
  })

  const topConfidence = matches.length > 0 ? 1 - matches[0].score : 0

  return { matches, topConfidence, aliasHit }
}

/** Read-only access to the curated alias map (used by next.config + middleware). */
export function getAliases(): Record<string, string> {
  return typedIndex.aliases
}

/** Read-only access to the full corpus (used by check-internal-links script). */
export function getAllRoutes(): Route[] {
  return typedIndex.routes
}
