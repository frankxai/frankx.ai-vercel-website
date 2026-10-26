import test from 'node:test'
import assert from 'node:assert'
import nextConfig from '../../next.config.mjs'
import { isExcludedFromSitemap } from '../../lib/sitemap-exclusions.mjs'

test('isExcludedFromSitemap excludes dashboard, explicit paths, and config redirects', async () => {
  const redirects = await nextConfig.redirects()
  const redirectSources = redirects.map((r) => r.source)

  // Test literal sources from redirects
  for (const source of redirectSources) {
    if (!source.includes(':')) {
      assert.ok(isExcludedFromSitemap(source, redirectSources), `Expected ${source} to be excluded`)
    }
  }

  // Test specific dashboard and legacy paths
  assert.ok(isExcludedFromSitemap('/dashboard', redirectSources))
  assert.ok(isExcludedFromSitemap('/dashboard/leads', redirectSources))
  assert.ok(isExcludedFromSitemap('/dashboard/pdf-analytics', redirectSources))
  assert.ok(isExcludedFromSitemap('/sis', redirectSources))
  assert.ok(isExcludedFromSitemap('/links', redirectSources))
  assert.ok(isExcludedFromSitemap('/products/agentic-creator-os', redirectSources))

  // Test paths that should be kept
  assert.equal(isExcludedFromSitemap('/linktree', redirectSources), false)
  assert.equal(isExcludedFromSitemap('/acos', redirectSources), false)
  assert.equal(isExcludedFromSitemap('/', redirectSources), false)
  assert.equal(isExcludedFromSitemap('/blog', redirectSources), false)
})
