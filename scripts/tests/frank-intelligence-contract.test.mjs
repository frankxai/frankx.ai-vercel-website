import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { PILLARS, pillarCounts } from '../../data/acos/agents.ts'
import { publicCorpusInfo, searchPublicCorpus } from '../../agent/lib/search-public-corpus.ts'

const read = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('public corpus is substantial, deterministic, and searchable', () => {
  const info = publicCorpusInfo()
  assert.ok(info.publishedPostCount >= 200)
  assert.ok(info.publicRouteCount >= 600)
  assert.ok(info.recordCount >= 3_000)
  assert.match(info.fingerprint, /^[a-f0-9]{16}$/)
  const results = searchPublicCorpus({ query: 'human AI music creativity', domains: ['creator'], limit: 5 })
  assert.ok(results.length > 0)
  assert.ok(results.every((result) => result.url.startsWith('/')))
})

test('canonical registry reflects source instead of a marketing multiple', () => {
  const counts = pillarCounts()
  assert.equal(PILLARS.length, 11)
  assert.equal(counts.total, PILLARS.reduce((sum, pillar) => sum + pillar.specialists.length, 0))
  assert.equal(counts.total, 100)
  assert.equal(counts.shipped, 85)
})

test('agent identity and safety boundaries are explicit', async () => {
  const instructions = await read('agent/instructions.md')
  assert.match(instructions, /not Frank/i)
  assert.match(instructions, /not affiliated with, endorsed by, or sponsored by Oracle/i)
  assert.match(instructions, /never diagnose/i)
  assert.match(instructions, /confidential/i)
})

test('public entry points route to Frank Intelligence', async () => {
  const [connect, desktop, mobile, footer] = await Promise.all([
    read('components/connect/AskAgentCTA.tsx'),
    read('components/NavigationMega.tsx'),
    read('components/MobileNavOverlay.tsx'),
    read('components/Footer.tsx'),
  ])
  for (const source of [connect, desktop, mobile, footer]) assert.match(source, /\/agent/)
})
