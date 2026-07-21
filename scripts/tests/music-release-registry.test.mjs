import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import {
  getGovernedReleases,
  getHomepageEligibleReleases,
  getRelease,
  isPublicRelease,
  releaseApprovalLedger,
  validateReleaseRegistry,
} from '../../lib/music/release-registry.ts'
import { loadCatalog } from '../../lib/music-video/catalog.ts'

const CANDIDATE_ID = 'studio-ledger-001_arcanea-rising'

test('the canonical release registry validates against the production catalog', () => {
  assert.deepEqual(validateReleaseRegistry(), [])
})

test('Studio Ledger 001 is governed but fails closed as a private draft', () => {
  const candidate = getRelease(CANDIDATE_ID)

  assert.ok(candidate)
  assert.equal(candidate.song.title, 'Arcanea Rising')
  assert.equal(candidate.song.status, 'draft')
  assert.equal(candidate.governance, 'governed')
  assert.equal(candidate.revision, 1)
  assert.equal(candidate.song.sunoUrl, '')
  assert.equal(candidate.song.takeId, '')
  assert.equal(candidate.song.masterId, '')
  assert.equal(candidate.assets.sourceAudio, null)
  assert.equal(candidate.assets.masterAudio, null)
  assert.equal(candidate.assets.streamingAudio, null)
  assert.equal(candidate.assets.coverSquare, null)
  assert.equal(isPublicRelease(candidate), false)
  assert.equal(
    getHomepageEligibleReleases().some((release) => release.song.songId === CANDIDATE_ID),
    false,
  )
})

test('legacy rows remain visible to existing tools but never become governed implicitly', () => {
  const vibeOs = getRelease('franks-vibes_20260529_vibe-o-s')

  assert.ok(vibeOs)
  assert.equal(vibeOs.governance, 'legacy-unreviewed')
  assert.equal(isPublicRelease(vibeOs), false)
  assert.equal(
    getGovernedReleases().some((release) => release.song.songId === CANDIDATE_ID),
    true,
  )
})

test('automation cannot approve a human release gate', () => {
  const approvals = structuredClone(releaseApprovalLedger)
  approvals.records[CANDIDATE_ID].gates.selection = {
    status: 'approved',
    authority: 'automation',
    by: 'catalog-sync',
    at: '2026-07-21T12:00:00.000Z',
    revision: 1,
  }

  const errors = validateReleaseRegistry({ catalog: loadCatalog(), approvals })
  assert.ok(errors.some((error) => error.includes('human authority')))
})

test('a catalog revision invalidates decisions from an older ledger revision', () => {
  const approvals = structuredClone(releaseApprovalLedger)
  approvals.records[CANDIDATE_ID].revision = 2

  const errors = validateReleaseRegistry({ catalog: loadCatalog(), approvals })
  assert.ok(errors.some((error) => error.includes('does not match catalog revision')))
})

test('the governed registry does not import discovery or legacy release state', async () => {
  const source = await readFile(
    new URL('../../lib/music/release-registry.ts', import.meta.url),
    'utf8',
  )

  for (const forbiddenSource of [
    'suno-catalog.json',
    'data/inventories',
    'lib/music.ts',
    'music-asset-registry.json',
  ]) {
    assert.doesNotMatch(source, new RegExp(forbiddenSource.replace('.', '\\.')))
  }
})

