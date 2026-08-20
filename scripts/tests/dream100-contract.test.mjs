import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const registry = JSON.parse(await readFile(new URL('../../data/dream100/registry.json', import.meta.url), 'utf8'))

test('Dream 100 registry has four balanced, unique cohorts', () => {
  assert.equal(registry.schemaVersion, 'starlight.dream100.v1')
  assert.equal(registry.members.length, 100)
  assert.equal(new Set(registry.members.map((member) => member.id)).size, 100)
  assert.equal(registry.categories.length, 4)
  for (const category of registry.categories) {
    assert.equal(registry.members.filter((member) => member.category === category.id).length, 25)
  }
})

test('every signal is source-linked and resolves to a member', () => {
  const memberIds = new Set(registry.members.map((member) => member.id))
  assert.ok(registry.signals.length >= 7)
  assert.equal(new Set(registry.signals.map((signal) => signal.slug)).size, registry.signals.length)
  for (const signal of registry.signals) {
    assert.ok(memberIds.has(signal.subjectId), signal.subjectId)
    assert.match(signal.sourceUrl, /^https:\/\//)
    assert.ok(signal.evidence.length >= 3)
    assert.ok(signal.architectureAngle.length > 80)
    assert.ok(signal.creatorAngle.length > 80)
    assert.ok(signal.contribution.length > 50)
  }
})

