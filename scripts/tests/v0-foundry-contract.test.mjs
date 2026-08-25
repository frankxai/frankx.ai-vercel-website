import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')

test('the foundry ships complete route states and a client catalog', () => {
  const requiredFiles = [
    'app/v0/page.tsx',
    'app/v0/loading.tsx',
    'app/v0/error.tsx',
    'components/v0/FoundryStudies.tsx',
    'content/v0/foundry.ts',
  ]

  for (const file of requiredFiles) {
    assert.equal(existsSync(new URL(`../../${file}`, import.meta.url)), true, `${file} must exist`)
  }
})

test('all 19 v0 studies have unique chats and live preview hosts', () => {
  const source = read('content/v0/foundry.ts')
  const chatIds = [...source.matchAll(/chatId: '([^']+)'/g)].map((match) => match[1])
  const demoUrls = [...source.matchAll(/demoUrl: '([^']+)'/g)].map((match) => match[1])

  assert.equal(chatIds.length, 19)
  assert.equal(new Set(chatIds).size, 19)
  assert.equal(demoUrls.length, 19)
  assert.equal(new Set(demoUrls).size, 19)

  for (const url of demoUrls) {
    assert.match(url, /^https:\/\/demo-[a-z0-9]+\.vusercontent\.net$/)
  }
})

test('the only deploy action targets the isolated public template repository', () => {
  const source = `${read('content/v0/foundry.ts')}\n${read('app/v0/page.tsx')}`

  assert.match(source, /github\.com%2Ffrankxai%2Fcreator-launch-os/)
  assert.match(source, /github\.com\/frankxai\/creator-launch-os/)
  assert.doesNotMatch(source, /github\.com\/frankxai\/FrankX/)
})

test('interface studies are not mislabeled as deployable products', () => {
  const page = read('app/v0/page.tsx')
  const source = read('content/v0/foundry.ts')

  assert.match(page, /interactive references/)
  assert.match(page, /Zero false deployment claims/)
  assert.doesNotMatch(`${page}\n${source}`, /production-ready|SOTA|one-click deploy/i)
})

test('release evidence names the remaining browser review gap', () => {
  const source = read('content/v0/foundry.ts')

  assert.match(source, /TypeScript, lint, contract tests, and production build passed/)
  assert.match(source, /visual review pending machine capacity/)
})
