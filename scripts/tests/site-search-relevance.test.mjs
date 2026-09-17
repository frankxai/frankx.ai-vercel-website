import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { stripTypeScriptTypes } from 'node:module'
import test from 'node:test'
import { buildSearchPresentation } from '../../lib/site-search-presentation.ts'

// Plain Node does not resolve the application's @/ alias. Resolve only that
// JSON import here, then execute the actual search module and current catalog.
const source = readFileSync(new URL('../../lib/site-search.ts', import.meta.url), 'utf8')
const routeIndex = JSON.parse(readFileSync(new URL('../../data/route-index.json', import.meta.url), 'utf8'))
const catalogImport = "import routeIndex from '@/data/route-index.json'"
assert.ok(source.includes(catalogImport), 'the test loader must resolve the search catalog import')
const executable = stripTypeScriptTypes(source.replace(catalogImport, `const routeIndex = ${JSON.stringify(routeIndex)}`))
const { getCuratedSearchItems, searchSiteItems } = await import(
  `data:text/javascript;base64,${Buffer.from(executable).toString('base64')}`
)

test('an unmatched query returns no results across the public catalog', () => {
  assert.deepEqual(searchSiteItems('zzqv-no-such-result-94817'), [])
})

test('a narrow route query is not padded with unrelated priority pages', () => {
  assert.deepEqual(
    searchSiteItems('agentic-obsidian-second-brain').map((item) => item.href),
    ['/guides/agentic-obsidian-second-brain'],
  )
})

test('exact hub names and useful multiword phrases retain their strongest destination', () => {
  assert.equal(searchSiteItems('  AI   ARCHITECTURE  ')[0]?.href, '/ai-architecture')
  assert.equal(searchSiteItems('second brain')[0]?.href, '/guides/agentic-obsidian-second-brain')
})

test('empty queries retain the curated entrance and its requested limit', () => {
  assert.deepEqual(searchSiteItems(''), getCuratedSearchItems(12))
  assert.deepEqual(searchSiteItems(' \t\n ', 3), getCuratedSearchItems(3))
  assert.deepEqual(searchSiteItems('', 3).map((item) => item.href), ['/start', '/blog', '/journal'])
})

test('result limits truncate a relevant result list in the same order', () => {
  const results = searchSiteItems('music', 12)
  assert.ok(results.length > 3, 'the catalog must contain several music destinations')
  assert.deepEqual(searchSiteItems('music', 3), results.slice(0, 3))
  assert.deepEqual(searchSiteItems('music', 0), [])
})

const interleaved = [
  { href: '/music/first', group: 'Music' },
  { href: '/guides/first', group: 'Learn' },
  { href: '/music/second', group: 'Music' },
  { href: '/tools/first', group: 'Build' },
  { href: '/guides/second', group: 'Learn' },
].map((item) => ({ ...item, title: item.href, description: '', type: 'section', tags: [] }))

test('queried results preserve relevance order across interleaved groups', () => {
  const presentation = buildSearchPresentation(interleaved, 'creative work')
  assert.deepEqual(presentation.sections.map((section) => section.label), ['Results'])
  assert.deepEqual(presentation.items, interleaved)
  assert.deepEqual(
    presentation.sections.flatMap((section) => section.entries.map((entry) => entry.item.href)),
    interleaved.map((item) => item.href),
  )
})

test('grouped suggestions and queried results activate items in their visible sequence', () => {
  const suggestions = buildSearchPresentation(interleaved, '   ')
  assert.deepEqual(suggestions.items.map((item) => item.href), [
    '/music/first', '/music/second', '/guides/first', '/guides/second', '/tools/first',
  ])
  assert.deepEqual(suggestions.sections.map((section) => section.label), ['Music', 'Learn', 'Build'])

  for (const query of ['', 'creative work']) {
    const presentation = buildSearchPresentation(interleaved, query)
    const visible = presentation.sections.flatMap((section) => section.entries)
    assert.deepEqual(visible.map((entry) => entry.index), [0, 1, 2, 3, 4])
    for (const entry of visible) {
      assert.equal(presentation.items[entry.index], entry.item)
    }
  }
})

test('an empty result presentation has no selectable or activatable items', () => {
  assert.deepEqual(buildSearchPresentation([], 'missing'), { sections: [], items: [] })
})
