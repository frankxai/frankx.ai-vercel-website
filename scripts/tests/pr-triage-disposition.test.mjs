import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '../../')
const dispositionFilePath = path.join(
  rootDir,
  'docs/ops/pr-triage-disposition.md',
)

test('PR Triage Disposition Log exists and is valid', () => {
  assert.ok(
    fs.existsSync(dispositionFilePath),
    'docs/ops/pr-triage-disposition.md must exist',
  )

  const content = fs.readFileSync(dispositionFilePath, 'utf8')

  // Check required issue references
  assert.match(content, /#887/, 'Log must reference Issue #887')
  assert.match(content, /#519/, 'Log must reference Issue #519')

  // Check required sections
  assert.ok(
    content.includes('## Executive Summary & PR Counts'),
    'Log must contain PR Counts summary',
  )
  assert.ok(
    content.includes('## Triage Bucket Analysis & Disposition Table'),
    'Log must contain disposition table',
  )

  // Check before/after count metrics
  assert.match(content, /25/, 'Summary must record 25 initial open PRs')
  assert.match(content, /21/, 'Summary must record 21 initial draft PRs')

  // Check unverified starting buckets from issue #887 description
  const unverifiedPRs = [
    '#803',
    '#810',
    '#802',
    '#831',
    '#853',
    '#879',
    '#829',
    '#822',
    '#844',
    '#823',
    '#847',
    '#855',
    '#862',
    '#519',
  ]
  for (const pr of unverifiedPRs) {
    assert.ok(content.includes(pr), `Log must disposition ${pr}`)
  }

  // Check disposition statuses
  assert.match(content, /\*\*Land\*\*/, 'Log must contain Land dispositions')
  assert.match(content, /\*\*Close\*\*/, 'Log must contain Close dispositions')
  assert.match(
    content,
    /\*\*Revise\*\*/,
    'Log must contain Revise dispositions',
  )
  assert.match(content, /\*\*Park\*\*/, 'Log must contain Park dispositions')
})
