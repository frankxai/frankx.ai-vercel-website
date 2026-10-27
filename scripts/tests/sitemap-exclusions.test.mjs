import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import nextConfig from '../../next.config.mjs'
import {
  aliasSources,
  isExcludedFromSitemap,
  literalRedirectSources,
} from '../../lib/sitemap-exclusions.mjs'

const ROOT = process.cwd()
const aliasFile = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'redirect-aliases.json'), 'utf8'))

async function sourcesLikeTheSitemap() {
  return new Set([...literalRedirectSources(await nextConfig.redirects()), ...aliasSources(aliasFile)])
}

// A page whose whole body is one permanentRedirect()/redirect() call answers 3xx, never 200.
const REDIRECT_ONLY_PAGE =
  /^\s*import\s*\{\s*(?:permanentRedirect|redirect)\s*\}\s*from\s*['"]next\/navigation['"];?\s*export\s+default\s+(?:async\s+)?function\s*\w*\s*\(\s*\)\s*\{\s*(?:permanentRedirect|redirect)\(\s*['"][^'"]+['"]\s*\);?\s*\}\s*$/

function redirectOnlyRoutes(dir = path.join(ROOT, 'app'), segments = []) {
  const routes = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (/^[[@_]/.test(entry.name)) continue
      const next = /^\(.*\)$/.test(entry.name) ? segments : [...segments, entry.name]
      routes.push(...redirectOnlyRoutes(path.join(dir, entry.name), next))
    } else if (/^page\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      if (REDIRECT_ONLY_PAGE.test(fs.readFileSync(path.join(dir, entry.name), 'utf8'))) {
        routes.push(`/${segments.join('/')}`)
      }
    }
  }
  return routes
}

test('unconditional literal redirect sources from next.config.mjs are excluded', async () => {
  const sources = await sourcesLikeTheSitemap()
  for (const source of literalRedirectSources(await nextConfig.redirects())) {
    assert.ok(isExcludedFromSitemap(source, sources), `${source} redirects but stays in the sitemap`)
  }
  assert.ok(isExcludedFromSitemap('/ai-art', sources))
  assert.ok(isExcludedFromSitemap('/prototypes', sources))
})

test('curated aliases from data/redirect-aliases.json are excluded', async () => {
  const sources = await sourcesLikeTheSitemap()
  const aliases = aliasSources(aliasFile)
  assert.ok(aliases.length > 0, 'no aliases read from data/redirect-aliases.json')
  for (const source of aliases) {
    assert.ok(isExcludedFromSitemap(source, sources), `${source} is an alias but stays in the sitemap`)
  }
  assert.ok(isExcludedFromSitemap('/soul-frequency-assessment', sources))
})

test('every redirect-only page under app/ is excluded', async () => {
  const sources = await sourcesLikeTheSitemap()
  const routes = redirectOnlyRoutes()
  assert.ok(routes.includes('/updates'), 'the page scan no longer finds app/updates/page.tsx')
  for (const route of routes) {
    assert.ok(isExcludedFromSitemap(route, sources), `${route} only redirects; add it to EXCLUDED_PATHS`)
  }
})

// Test-only reading of the pattern forms next.config.mjs uses: a literal prefix ending in :name, :name*, :name+ or
// :name(regex). Sources in any other form are not checked here.
function patternMatcher(source) {
  const match = /^((?:\/[A-Za-z0-9._~-]+)*)\/:\w+(\*|\+|\((.+)\))?$/.exec(source)
  if (!match) return null
  const prefix = match[1].replace(/[.~-]/g, '\\$&')
  if (match[2] === '*') return new RegExp(`^${prefix}(?:/.*)?$`)
  if (match[2] === '+') return new RegExp(`^${prefix}/.+$`)
  if (match[3]) return new RegExp(`^${prefix}/(?:${match[3]})$`)
  return new RegExp(`^${prefix}/[^/]+$`)
}

test('discovered routes caught by a pattern redirect are excluded', async () => {
  const sources = await sourcesLikeTheSitemap()
  const matchers = (await nextConfig.redirects())
    .filter((redirect) => !redirect.has && !redirect.missing)
    .map((redirect) => patternMatcher(redirect.source))
    .filter(Boolean)
  assert.ok(matchers.length > 0, 'no pattern redirects read from next.config.mjs')
  const routeIndex = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'route-index.json'), 'utf8'))
  const redirected = routeIndex.routes
    .filter((route) => route.sitemap !== false)
    .map((route) => route.href)
    .filter((href) => matchers.some((matcher) => matcher.test(href)))
  assert.ok(redirected.includes('/ai-architect/multi-cloud-comparison'))
  for (const href of redirected) {
    assert.ok(isExcludedFromSitemap(href, sources), `${href} matches a pattern redirect; add it to EXCLUDED_PATHS`)
  }
})

test('sign-in gated and middleware-redirected paths are excluded', async () => {
  const sources = await sourcesLikeTheSitemap()
  for (const pathname of ['/dashboard', '/dashboard/leads', '/dashboard/pdf-analytics', '/sis', '/links', '/products/agentic-creator-os']) {
    assert.ok(isExcludedFromSitemap(pathname, sources), pathname)
  }
})

test('conditional, pattern and root redirect sources never exclude a page', () => {
  const sources = literalRedirectSources([
    { source: '/only-on-host', destination: '/x', permanent: true, has: [{ type: 'host', value: 'example.com' }] },
    { source: '/unless-cookie', destination: '/x', permanent: true, missing: [{ type: 'cookie', key: 'k' }] },
    { source: '/blog/:slug', destination: '/x', permanent: true },
    { source: '/ai-architect/:path((?!ai-coe-hub).*)', destination: '/x', permanent: true },
    { source: '/', destination: '/x', permanent: true },
    { source: '/kept', destination: '/x', permanent: true },
  ])
  assert.deepEqual(sources, ['/kept'])
})

test('canonical pages stay in the sitemap', async () => {
  const sources = await sourcesLikeTheSitemap()
  for (const pathname of ['/', '/blog', '/linktree', '/acos', '/changelog', '/the-future-we-choose', '/ai-architect', '/ai-architect/ai-coe-hub', '/dashboards']) {
    assert.equal(isExcludedFromSitemap(pathname, sources), false, pathname)
  }
})
