import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const registry = JSON.parse(readFileSync(new URL('../../content/partnerships/university-resources.json', import.meta.url), 'utf8'))
const byId = new Map(registry.resources.map(entry => [entry.id, entry]))

test('review records have distinct permanent IDs, pinned sources and bounded rights', () => {
  assert.equal(byId.size, registry.resources.length)
  for (const row of byId.values()) {
    assert.match(row.id, /^uc-\d{4,}$/)
    assert.match(row.currentVersion, /^[0-9a-f]{40}$/)
    assert.ok(row.sourceUrl.includes('/blob/' + row.currentVersion + '/'))
    assert.ok(row.licence.url.includes('/blob/' + row.currentVersion + '/'))
    assert.match(row.sourceSha256, /^[0-9a-f]{64}$/)
    assert.ok(row.learningObjectives.length && row.prerequisiteCosts && row.accessibility && row.authorEvidence)
    assert.match(row.reviewedAt, /^\d{4}-\d{2}-\d{2}$/)
    assert.ok(row.sourceCheck.matchesPinnedBlob)
    if (row.status === 'verified') {
      assert.equal(row.sourceCheck.anonymousHttp, 200)
      assert.equal(row.publicationStatus, 'proposed-for-commons')
    } else {
      assert.equal(row.publicationStatus, 'held')
    }
  }
})

test('each academic path resolves to reviewed free resources and an assessable outcome', () => {
  assert.deepEqual(registry.paths.map(path => path.id).sort(), ['founders','professors','researchers','students'])
  for (const path of registry.paths) {
    assert.ok(path.exercise && path.deliverable && path.acceptance && path.resourceIds.length)
    for (const id of path.resourceIds) {
      const resource = byId.get(id)
      assert.ok(resource, id)
      assert.equal(resource.status, 'verified', id)
      assert.equal(resource.access, 'free', id)
      assert.ok(resource.audiences.includes(path.id), id)
    }
  }
})
