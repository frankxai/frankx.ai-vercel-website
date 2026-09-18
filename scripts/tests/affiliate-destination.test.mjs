import assert from 'node:assert/strict'
import test from 'node:test'
import { resolveProgramDestination } from '../../lib/affiliates/resolve-destination.ts'

const partner = { tool: 'Example', aliases: ['example'], hasProgram: true, status: 'active', ourLink: 'https://partner.example/start?ref=issued-id&sig=a%2Bb#offer' }
const official = { name: 'Example', url: 'https://example.com/product' }

test('preserves the issued destination including encoded and signed parameters', () => {
  assert.deepEqual(resolveProgramDestination('example', [partner], official), { href: partner.ourLink, sponsored: true })
})
test('paused, closed and missing enrollments use the ordinary official link', () => {
  for (const entry of [{ ...partner, status: 'closed' }, { ...partner, hasProgram: false }, { ...partner, ourLink: null }]) {
    assert.deepEqual(resolveProgramDestination('example', [entry], official), { href: official.url, sponsored: false })
  }
})
test('rejects unsafe destinations and never invents an affiliate URL', () => {
  for (const ourLink of ['javascript:alert(1)', 'http://example.com', 'https://secret@example.com', 'invalid']) {
    assert.deepEqual(resolveProgramDestination('example', [{ ...partner, ourLink }], official), { href: official.url, sponsored: false })
  }
  assert.equal(resolveProgramDestination('missing', [partner]), undefined)
})
test('catalog-only programs work without a legacy manager entry', () => {
  assert.deepEqual(resolveProgramDestination('Example', [partner]), { href: partner.ourLink, sponsored: true })
})
