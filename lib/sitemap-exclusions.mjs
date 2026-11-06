// Paths app/sitemap.ts must leave out: the sitemap lists only canonical pages that answer 200.

// Sign-in gated routes.
export const PRIVATE_PREFIXES = ['/dashboard']

// Prefixes app/robots.ts disallows. A sitemap entry that robots.txt blocks tells crawlers to fetch what they may not.
export const ROBOTS_BLOCKED_PREFIXES = ['/admin', '/api', '/auth', '/command-center', '/onboarding', '/prototype']

// Surfaces that ship <meta name="robots" content="noindex">. Listing them contradicts the page, so they stay out.
// Keep in step with the pages' own robots metadata; a prefix covers every route beneath it.
export const NOINDEX_PREFIXES = [
  '/books/family',
  '/familie/geschichte/gorte-linie',
  '/familie/geschichte/riemer-linie',
  '/newsletter/preferences',
  '/newsletter/thank-you',
  '/on-consciousness',
  '/on-faith',
  '/on-god',
  '/on-reality',
  '/unsubscribe',
  '/valentines-day/tien',
  '/workshops/ikigai-branding/present',
]

// Routes that render a page another route owns. Their canonical points at the owner, so the sitemap lists the owner only.
export const CANONICAL_ELSEWHERE_PREFIXES = ['/blueprint']

// Redirects literalRedirectSources() does not report: middleware redirects, pages that only call
// permanentRedirect(), and pages matched by a pattern redirect in next.config.mjs.
// scripts/tests/sitemap-exclusions.test.mjs fails when a redirect-only page or a pattern-redirected route is missing.
export const EXCLUDED_PATHS = new Set([
  '/ahmad',
  '/ai-architect/multi-cloud-comparison',
  '/consulting',
  // Alias of /the-builders-line: its canonical points there, so listing both splits the signal.
  '/father-code',
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
  const blockedPrefixes = [
    ...PRIVATE_PREFIXES,
    ...ROBOTS_BLOCKED_PREFIXES,
    ...NOINDEX_PREFIXES,
    ...CANONICAL_ELSEWHERE_PREFIXES,
  ]
  if (blockedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return true
  return EXCLUDED_PATHS.has(pathname) || redirectSources.has(pathname)
}
