import assert from 'node:assert/strict'
import test from 'node:test'
import { withReportProvenance } from '../../lib/ai-architect/report-export.ts'
import { loadReview, saveReview, removeReview, REVIEW_STORAGE_KEY } from '../../lib/ai-architect/report-store.ts'

function memoryStorage(initial) {
  const values = new Map(initial ? [[REVIEW_STORAGE_KEY, initial]] : [])
  return {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: key => values.delete(key),
  }
}
const report = withReportProvenance('## Architecture review\nTrust boundary: OPEN')
const savedAt = '2026-11-18T04:00:00.000Z'

test('explicit save survives a fresh read with exact report and provenance', () => {
  const storage = memoryStorage()
  assert.deepEqual(loadReview(storage), { status: 'empty' })
  assert.equal(saveReview(storage, report, savedAt).status, 'saved')
  const loaded = loadReview(storage)
  assert.equal(loaded.status, 'saved')
  assert.equal(loaded.review.report, report)
  assert.equal(loaded.review.savedAt, savedAt)
  assert.ok(loaded.review.report.includes('self-reported answers'))
})

test('saving replaces the one existing review and deletion leaves other storage untouched', () => {
  const storage = memoryStorage()
  storage.setItem('unrelated', 'keep')
  saveReview(storage, report, savedAt)
  const next = withReportProvenance('## Architecture review\nTrust boundary: MADE')
  saveReview(storage, next, savedAt)
  assert.equal(loadReview(storage).review.report, next)
  assert.equal(removeReview(storage), true)
  assert.deepEqual(loadReview(storage), { status: 'empty' })
  assert.equal(storage.getItem('unrelated'), 'keep')
})

test('blocked or exhausted storage never reports a successful save or deletion', () => {
  const denied = { getItem() { throw Error('blocked') }, setItem() { throw Error('quota') }, removeItem() { throw Error('blocked') } }
  assert.deepEqual(loadReview(denied), { status: 'unavailable' })
  assert.deepEqual(saveReview(denied, report, savedAt), { status: 'unavailable' })
  assert.equal(removeReview(denied), false)
})

test('malformed, oversized and unknown-format saved data remains untouched and cannot load', () => {
  for (const raw of ['{', 'null', '{}', JSON.stringify({ version: 2, report, savedAt }), JSON.stringify({ version: 1, report, savedAt: 'yesterday' }), JSON.stringify({ version: 1, report: 'x'.repeat(65_537), savedAt })]) {
    const storage = memoryStorage(raw)
    assert.deepEqual(loadReview(storage), { status: 'invalid' })
    assert.equal(storage.getItem(REVIEW_STORAGE_KEY), raw)
  }
})

test('incomplete or unbounded reports are rejected without replacing an existing review', () => {
  const storage = memoryStorage()
  saveReview(storage, report, savedAt)
  for (const value of ['', ' ', 'x'.repeat(65_537)]) {
    assert.deepEqual(saveReview(storage, value, savedAt), { status: 'invalid' })
    assert.equal(loadReview(storage).review.report, report)
  }
})

test('silent browser write/removal refusal cannot emit success', () => {
  const ignoredWrites = { getItem: () => null, setItem() {}, removeItem() {} }
  assert.deepEqual(saveReview(ignoredWrites, report, savedAt), { status: 'unavailable' })
  const ignoredRemoval = { getItem: () => 'existing', setItem() {}, removeItem() {} }
  assert.equal(removeReview(ignoredRemoval), false)
})

test('impossible calendar dates and oversized raw payloads are rejected before use', () => {
  for (const raw of [JSON.stringify({ version: 1, report, savedAt: '2026-02-31T04:00:00.000Z' }), ' '.repeat(400_000)]) {
    assert.deepEqual(loadReview(memoryStorage(raw)), { status: 'invalid' })
  }
})
