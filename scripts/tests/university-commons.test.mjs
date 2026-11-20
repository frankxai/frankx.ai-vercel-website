import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { resources, paths, filterResources, resourcesById, intake } from '../../content/university/catalog.ts'
import { challengeBriefs } from '../../content/partnerships/university-collaboration.ts'
import { enumerateRoutes } from '../../lib/route-enumeration.mjs'

test('every resource is distinct, dated and explicitly attributed to an admitted destination', () => {
  assert.ok(resources.length >= 20 && resources.length <= 30)
  assert.equal(new Set(resources.map(r => r.id)).size, resources.length)
  assert.equal(new Set(resources.map(r => r.href)).size, resources.length)
  const hosts = ['github.com', 'www.w3.org', 'doi.org', 'metr.org', 'recimpact.uva.nl']
  const localPrefixes = ['/university/challenges/', '/templates/', '/courses/', '/guides/', '/downloads/', '/books/', '/workshops/']
  for (const r of resources) {
    assert.match(r.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    assert.match(r.reviewedAt, /^\d{4}-\d{2}-\d{2}$/)
    assert.ok(r.reviewedAt <= new Date().toISOString().slice(0, 10))
    assert.ok(r.title && r.task && r.kind && r.publisher && r.access)
    assert.ok(['en', 'nl'].includes(r.language))
    const url = new URL(r.href, 'https://www.frankx.ai')
    assert.equal(url.protocol, 'https:')
    assert.ok(!url.username && !url.password && !url.search)
    if (r.href.startsWith('/')) {
      assert.equal(url.hostname, 'www.frankx.ai')
      assert.ok(localPrefixes.some(prefix => url.pathname.startsWith(prefix)))
      if (/\.(md|csv|json|mjs|html)$/.test(r.href)) assert.ok(fs.existsSync('public' + r.href))
    } else {
      assert.ok(hosts.includes(url.hostname))
      if (url.hostname === 'github.com') assert.match(url.pathname, /\/blob\/[a-f0-9]{40}\//)
    }
  }
})

test('five learning paths reference the same catalogue and have different starting jobs', () => {
  assert.deepEqual(paths.map(path => path.slug), ['students', 'professors', 'researchers', 'founders', 'community'])
  const coverage = new Set()
  for (const path of paths) {
    const ids = [...path.sequence, ...path.also]
    assert.ok(path.headline && path.outcome && path.invitation && path.sequence.length >= 3)
    assert.equal(new Set(ids).size, ids.length)
    for (const resource of resourcesById(ids)) coverage.add(resource.id)
    assert.ok(resourcesById(path.sequence).some(r => r.access.startsWith('Free')))
  }
  assert.equal(new Set(paths.map(path => path.sequence[0])).size, 5)
  assert.equal(coverage.size, resources.length)
  assert.throws(() => resourcesById(['retired-entry']))
})

test('catalogue search intersects tokens and format, handles punctuation safely and resets', () => {
  assert.equal(filterResources('   ', '').length, resources.length)
  assert.deepEqual(filterResources('  EVALUATION  RUBRIC ', 'Template').map(r => r.id), ['rubric'])
  assert.equal(filterResources('evaluation rubric', 'Book chapter').length, 0)
  assert.equal(filterResources('<private search>', '').length, 0)
  assert.equal(filterResources('', 'Challenge').length, challengeBriefs.length)
})

test('public discovery covers every Commons route and excludes proposal context', () => {
  const expected = ['/university', '/university/resources', ...paths.map(p => '/university/' + p.slug),
    ...challengeBriefs.map(b => '/university/challenges/' + b.id)].sort()
  const routes = enumerateRoutes().map(r => r.href)
  assert.deepEqual(routes.filter(href => href.startsWith('/university')).sort(), expected)
  assert.ok(!routes.includes('/partnerships/proposal/uva-rec-impact'))
  assert.equal(intake, '/partnerships/universities#join')
})
