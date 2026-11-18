import assert from 'node:assert/strict'
import test from 'node:test'
import entries from '../../content/university/resources.json' with { type: 'json' }
import { allResources, filterResources, paths, resources, resourcesById } from '../../content/university/catalog.ts'

test('edition decisions attach to unique works and use a pinned source and licence', () => {
  const reviewed = entries.filter(entry => entry.editorialReview)
  const auditIds = new Set()
  for (const row of reviewed) {
    const review = row.editorialReview
    assert.match(review.reviewId, /^uc-\d{4,}$/)
    assert.ok(!auditIds.has(review.reviewId))
    auditIds.add(review.reviewId)
    assert.match(review.currentVersion, /^[0-9a-f]{40}$/)
    assert.ok(review.sourceUrl.includes('/blob/' + review.currentVersion + '/'))
    assert.ok(review.licence.url.includes('/blob/' + review.currentVersion + '/'))
    assert.match(review.sourceSha256, /^[0-9a-f]{64}$/)
    assert.ok(review.learningObjectives.length && review.prerequisiteCosts && review.accessibility && review.authorEvidence)
    assert.match(row.reviewedAt, /^\d{4}-\d{2}-\d{2}$/)
    assert.equal(review.sourceCheck.anonymousHttp, 200)
    assert.equal(review.sourceCheck.matchesPinnedBlob, true)
    assert.equal(allResources.some(r => r.id === row.id), review.publicationStatus !== 'held')
  }
  assert.equal(new Set(allResources.map(r => r.id)).size, allResources.length)
  assert.equal(new Set(allResources.map(r => r.href)).size, allResources.length)
  assert.deepEqual(filterResources('', ''), resources)
  assert.deepEqual(filterResources('', '', true), allResources)
})

test('all four practicums use free admitted records and preserve the community path', () => {
  assert.deepEqual(paths.filter(p => p.practicum).map(p => p.slug), ['students','professors','researchers','founders'])
  assert.ok(paths.some(p => p.slug === 'community'))
  for (const path of paths.filter(p => p.practicum)) {
    const exercise = path.practicum
    assert.ok(exercise.exercise && exercise.deliverable && exercise.acceptance)
    for (const entry of resourcesById(exercise.resourceIds)) {
      assert.equal(entry.editorialReview.accessModel, 'free')
      assert.equal(entry.editorialReview.status, 'verified')
      assert.ok(entry.editorialReview.audiences.includes(path.slug))
    }
  }
})
