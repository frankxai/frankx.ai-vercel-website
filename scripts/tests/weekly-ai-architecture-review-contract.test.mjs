import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

import {
  REVIEW_WINDOW,
  modelAvailabilityWatch,
  modelRoutes,
  repoActivity,
  reviewStats,
  sourceLedger,
  weeklyChanges,
} from '../../lib/research/ai-architecture-weekly.ts'

const root = new URL('../../', import.meta.url)
const read = (path) => readFile(new URL(path, root), 'utf8')

const [
  route,
  experience,
  architectureMap,
  architectureStyles,
  hubLead,
  visualLedger,
] = await Promise.all([
  read('app/research/ai-architecture-review/page.tsx'),
  read('components/research/ai-architecture-review/ArchitectureReviewPage.tsx'),
  read('components/research/ai-architecture-review/ArchitectureReviewMap.tsx'),
  read(
    'components/research/ai-architecture-review/ArchitectureReviewMap.module.css',
  ),
  read('app/research/research-hub-lead.tsx'),
  read(
    'artifacts/releases/ai-architecture-review-2026-08-31/visual-source-ledger.json',
  ),
])

test('weekly change ledger stays dated, sourced, and internally consistent', () => {
  assert.equal(REVIEW_WINDOW.start, '2026-08-24')
  assert.equal(REVIEW_WINDOW.end, '2026-08-31')
  assert.ok(new Date(REVIEW_WINDOW.checkedAt).getTime() <= Date.now())
  assert.equal(weeklyChanges.length, 17)
  assert.equal(reviewStats.verifiedChanges, weeklyChanges.length)
  assert.equal(reviewStats.officialSources, sourceLedger.length)

  const sourceIds = sourceLedger.map((source) => source.id)
  assert.equal(
    new Set(sourceIds).size,
    sourceIds.length,
    'source IDs must be unique',
  )

  for (const source of sourceLedger) {
    assert.match(source.url, /^https:\/\//, `${source.id} must use HTTPS`)
    assert.doesNotMatch(
      source.url,
      /google\.com\/search|bing\.com\/search/,
      `${source.id} must resolve to a source, not search`,
    )
  }

  const knownSourceIds = new Set(sourceIds)
  const records = [...weeklyChanges, ...modelRoutes, ...modelAvailabilityWatch]
  for (const record of records) {
    const label =
      'title' in record
        ? record.title
        : 'model' in record
          ? record.model
          : record.family
    assert.ok(record.sourceIds.length > 0, `${label} must have a source`)
    for (const sourceId of record.sourceIds) {
      assert.ok(
        knownSourceIds.has(sourceId),
        `${sourceId} must resolve in the source ledger`,
      )
    }
  }

  for (const change of weeklyChanges) {
    assert.ok(
      change.date >= REVIEW_WINDOW.start && change.date <= REVIEW_WINDOW.end,
    )
  }
})

test('repository analysis remains a labeled lower-bound sample', () => {
  assert.equal(repoActivity.length, 10)
  assert.equal(
    repoActivity.reduce((sum, item) => sum + item.commits, 0),
    100,
  )
  assert.equal(reviewStats.sampledCommits, 100)
  assert.match(experience, /lower-bound sample/i)
  assert.match(experience, /capped at 100 results/i)
})

test('architecture is interactive on desktop, complete on mobile, and motion-safe', () => {
  assert.match(architectureMap, /from '@xyflow\/react'/)
  assert.match(architectureMap, /Interactive Starlight Graph OS architecture/)
  assert.equal((architectureMap.match(/animated: true/g) ?? []).length, 1)
  assert.match(architectureMap, /className: 'evidence-edge'/)
  assert.match(architectureMap, /'events',[\s\S]*'release'/)
  assert.match(architectureStyles, /prefers-reduced-motion: reduce/)
  assert.doesNotMatch(architectureMap, /hideAttribution/)
})

test('route has canonical article metadata, structured data, and Research Hub discovery', () => {
  assert.match(route, /path: '\/research\/ai-architecture-review'/)
  assert.match(route, /type: 'article'/)
  assert.match(route, /<JsonLd\s+type="Article"/)
  assert.match(route, /<JsonLd[\s\S]*type="BreadcrumbList"/)
  assert.match(route, /<JsonLd\s+type="ItemList"/)
  assert.match(route, /opengraph-image/)
  assert.match(hubLead, /href="\/research\/ai-architecture-review"/)
  assert.match(hubLead, /The model race moved up a layer\./)
})

test('release keeps design options and visual provenance', async () => {
  const ledger = JSON.parse(visualLedger)
  assert.equal(ledger.schema, 'starlight.visual_source_ledger.v1')
  assert.ok(Array.isArray(ledger.entries) && ledger.entries.length > 0)
  assert.ok(ledger.entries.every((entry) => entry.url && entry.rights_state))

  for (const direction of [
    'a-evidence-console.svg',
    'b-lab-ledger.svg',
    'c-constellation-brief.svg',
  ]) {
    await access(
      new URL(
        `artifacts/releases/ai-architecture-review-2026-08-31/directions/${direction}`,
        root,
      ),
    )
  }

  for (const logo of [
    'anthropic-mark.svg',
    'deepseek.svg',
    'github.svg',
    'langchain.svg',
    'minimax.svg',
    'mistral.svg',
    'notion.svg',
    'qwen.svg',
    'supabase.svg',
    'temporal.svg',
    'vercel.svg',
  ]) {
    await access(new URL(`public/images/logos/${logo}`, root))
  }
})
