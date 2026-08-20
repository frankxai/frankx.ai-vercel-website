import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const read = (path) => readFileSync(join(ROOT, path), 'utf8')

test('the curated changelog is the only live data source', () => {
  const data = JSON.parse(read('data/changelog-updates.json'))

  assert.ok(data.updates.length > 0)
  assert.equal(existsSync(join(ROOT, 'data/changelog-entries.json')), false)
  assert.equal(existsSync(join(ROOT, 'data/changelog-data.json')), false)
  assert.equal(existsSync(join(ROOT, 'scripts/generate-changelog-data.mjs')), false)
  assert.equal(existsSync(join(ROOT, 'scripts/chronicle-roll-week.mjs')), false)
  assert.equal(existsSync(join(ROOT, 'scripts/push-chronicle-to-prod.mjs')), false)
})

test('public routes expose canonical release discovery and no vanity commit metrics', () => {
  const index = read('app/changelog/page.tsx')
  const layout = read('app/changelog/layout.tsx')
  const detail = read('app/changelog/[slug]/page.tsx')
  const updatesAlias = read('app/updates/page.tsx')
  const sitemap = read('app/sitemap.ts')

  assert.match(index, /\/changelog\/rss\.xml/)
  assert.doesNotMatch(index, />Commits</)
  assert.doesNotMatch(index, />Lines</)
  assert.match(layout, /application\/rss\+xml/)
  assert.match(detail, /datePublished/)
  assert.match(detail, /dateModified/)
  assert.match(detail, /ldJson\(articleJsonLd\)/)
  assert.match(updatesAlias, /permanentRedirect\('\/changelog'\)/)
  assert.match(sitemap, /getChangelogUpdates\(\)/)
})

test('tag automation can create only reviewable draft releases', () => {
  const workflow = read('.github/workflows/draft-release.yml')

  assert.match(workflow, /--draft/)
  assert.match(workflow, /--verify-tag/)
  assert.match(workflow, /--generate-notes/)
  assert.match(workflow, /git cat-file -t/)
  assert.doesNotMatch(workflow, /--latest/)
  assert.doesNotMatch(workflow, /gh release edit[^\n]*--draft=false/)
})
