import test from 'node:test'
import assert from 'node:assert/strict'
import { validateApprovedClaims } from '../check-research-publication.mjs'

const good = {
  schemaVersion: 1,
  claims: [{
    id: 'sample-claim',
    domain: 'frontier-reasoning-models',
    text: 'A narrow claim with a specified test context and outcome.',
    status: 'supported-synthesis',
    sources: [{
      url: 'https://doi.org/10.1234/example',
      title: 'An individual study',
      locator: 'Table 2',
      type: 'journal',
    }],
    draftedBy: 'Research author',
    reviewedBy: 'Frank Riemer',
    reviewedAt: '2026-09-28',
    reviewReceipt: 'frankxai/frankx.ai-vercel-website#100@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  }],
}

test('a claim with a direct locator and human review can be promoted', () => {
  assert.deepEqual(validateApprovedClaims(good), [])
})

test('generated search and self links cannot become citations', () => {
  for (const url of [
    'https://scholar.google.com/scholar?q=quantum',
    'https://arxiv.org/search/?query=quantum',
    'https://www.frankx.ai/research/quantum-computing',
  ]) {
    const input = structuredClone(good)
    input.claims[0].sources[0].url = url
    assert.match(validateApprovedClaims(input).join(' '), /individual publication/)
  }
})

test('publication fails without a locator and independent human review', () => {
  const input = structuredClone(good)
  input.claims[0].sources[0].locator = ''
  input.claims[0].reviewedBy = 'AI'
  input.claims[0].reviewedAt = '2026-02-30'
  const failures = validateApprovedClaims(input).join(' ')
  assert.match(failures, /locator/)
  assert.match(failures, /human reviewer/)
  assert.match(failures, /valid review date/)
})

test('replication cannot be inferred from one publication', () => {
  const input = structuredClone(good)
  input.claims[0].status = 'independently-replicated'
  assert.match(validateApprovedClaims(input).join(' '), /replication/)
})
