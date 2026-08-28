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

  assert.match(page, /interactive (?:design )?references/i)
  assert.match(page, /Zero false deployment claims/)
  assert.doesNotMatch(`${page}\n${source}`, /production-ready|SOTA|one-click deploy/i)
})

test('release maturity indicators are evidence-backed', () => {
  const page = read('app/v0/page.tsx')

  assert.match(page, /Verified gates/)
  assert.match(page, />5\/6</)
  assert.doesNotMatch(page, /\b\d{1,3}%\b/)
})

test('release evidence names the remaining browser review gap', () => {
  const source = read('content/v0/foundry.ts')

  assert.match(source, /TypeScript, lint, contract tests, and production build passed/)
  assert.match(source, /visual review pending machine capacity/)
})

test('the catalog embeds one governed preview with responsive controls', () => {
  const component = read('components/v0/FoundryStudies.tsx')

  assert.match(component, /<iframe/)
  assert.match(component, /sandbox="allow-forms allow-popups allow-same-origin allow-scripts"/)
  assert.match(component, /Preview width/)
  assert.match(component, /Desktop/)
  assert.match(component, /Tablet/)
  assert.match(component, /Mobile/)
  assert.match(component, /v0_study_previewed/)
  assert.match(component, /v0_preview_viewport_changed/)
})

test('v0 interface copy follows the sentence-case design contract', () => {
  const surfaces = [
    read('app/v0/page.tsx'),
    read('app/v0/error.tsx'),
    read('components/v0/FoundryStudies.tsx'),
  ].join('\n')

  assert.doesNotMatch(surfaces, /\buppercase\b|text-transform:\s*uppercase/)
})

test('the product portfolio covers focused creator and AI startup businesses', () => {
  const source = read('content/v0/foundry.ts')
  const page = read('app/v0/page.tsx')
  const portfolio = source
    .split('export const templatePortfolio =')[1]
    .split('export const releaseGates =')[0]

  assert.equal([...portfolio.matchAll(/audience: '/g)].length, 22)
  assert.match(portfolio, /Creator businesses/)
  assert.match(portfolio, /AI startups/)
  assert.match(page, /Proprietary code, assets, and prompts are never copied/)
})
