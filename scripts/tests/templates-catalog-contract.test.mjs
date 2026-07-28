import assert from 'node:assert/strict'
import test from 'node:test'
import { templateCatalog } from '../../data/template-catalog.ts'

test('ships two real first-party templates', () => {
  const ready = templateCatalog.filter((item) => item.source === 'first-party' && item.availability === 'ready')
  assert.ok(ready.length >= 2)
  for (const item of ready) assert.match(item.href, /^\/templates\/.+\.html$/)
})

test('never offers unfinished premium releases for sale', () => {
  for (const item of templateCatalog.filter((item) => item.availability === 'waitlist')) {
    assert.match(item.href, /^\/waitlist\?intent=template-/)
    assert.equal(item.price, null)
  }
})

test('labels third-party references honestly', () => {
  for (const item of templateCatalog.filter((item) => item.source === 'external')) {
    assert.equal(item.availability, 'external')
    assert.match(item.href, /^https:\/\//)
  }
})
