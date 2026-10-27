// Paths app/sitemap.ts must leave out: the sitemap lists only canonical pages that answer 200.

// Sign-in gated routes.
export const PRIVATE_PREFIXES = ['/dashboard']

// Redirects literalRedirectSources() does not report: middleware redirects, pages that only call
// permanentRedirect(), and pages matched by a pattern redirect in next.config.mjs.
// scripts/tests/sitemap-exclusions.test.mjs fails when a redirect-only page or a pattern-redirected route is missing.
export const EXCLUDED_PATHS = new Set([
  '/ahmad',
  '/ai-architect/multi-cloud-comparison',
  '/consulting',
  '/graph',
  '/harzfenster',
  '/hospitality-os',
  '/jojo',
  '/links',
  '/portal/ana',
  '/products/agentic-creator-os',
  '/sis',
  '/the-future-is-for-everyone',
  '/thefutureisforeveryone',
  '/updates',
])

// A redirect source excludes a page only when it is a plain path that always applies. Patterns, regex groups and
// has/missing conditions are skipped, because dropping a live page costs more than listing one redirect.
const LITERAL_PATH = /^\/[A-Za-z0-9._~-]+(?:\/[A-Za-z0-9._~-]+)*$/

export function literalRedirectSources(redirects) {
  return redirects
    .filter((redirect) => redirect && !redirect.has && !redirect.missing && typeof redirect.source === 'string')
    .map((redirect) => redirect.source)
    .filter((source) => LITERAL_PATH.test(source))
}

// data/redirect-aliases.json has the shape { aliases: { "/from": "/to" } }.
export function aliasSources(aliasFile) {
  const aliases = aliasFile && typeof aliasFile.aliases === 'object' && aliasFile.aliases !== null ? aliasFile.aliases : {}
  return Object.keys(aliases).filter((source) => LITERAL_PATH.test(source))
}

export function isExcludedFromSitemap(pathname, redirectSources) {
  if (PRIVATE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return true
  return EXCLUDED_PATHS.has(pathname) || redirectSources.has(pathname)
}
