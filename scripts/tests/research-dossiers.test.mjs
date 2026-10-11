import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { canReviewDossiers } from '../../lib/research/dossier-policy.mjs'
import { validateDossierCandidates } from '../check-research-dossiers.mjs'

const packet = JSON.parse(fs.readFileSync(new URL('../../data/research/dossier-candidates.json', import.meta.url), 'utf8'))

test('production and ordinary production builds cannot expose held dossiers', () => {
  assert.equal(canReviewDossiers({ VERCEL_ENV: 'production', NODE_ENV: 'development' }), false)
  assert.equal(canReviewDossiers({ NODE_ENV: 'production' }), false)
  assert.equal(canReviewDossiers({ VERCEL_ENV: 'preview', NODE_ENV: 'production' }), true)
  assert.equal(canReviewDossiers({ NODE_ENV: 'development' }), true)
})
test('current packet binds material facts and media to inspectable records', () => {
  assert.deepEqual(validateDossierCandidates(packet), [])
})
test('unbound facts and unlicensed embedded graphics fail candidate integrity', () => {
  const broken = structuredClone(packet)
  const paragraph = broken.dossiers[0].sections[0].paragraphs.find((p) => p.kind === 'documented')
  paragraph.sourceIds = []
  delete broken.media.find((m) => m.type === 'image').licenseUrl
  const errors = validateDossierCandidates(broken)
  assert(errors.some((e) => e.includes('factual paragraph needs sources')))
  assert(errors.some((e) => e.includes('license basis')))
})
test('held packets cannot self-promote or assert publication dates', () => {
  const broken = structuredClone(packet)
  broken.dossiers[0].reviewStatus = 'source-reviewed'
  broken.dossiers[0].publishedAt = '2026-10-09'
  assert(validateDossierCandidates(broken).some((e) => e.includes('cannot assert publication')))
})
