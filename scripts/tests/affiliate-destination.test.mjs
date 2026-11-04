import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { resolveProgramDestination } from '../../lib/affiliates/resolve-destination.ts'

const partner = { tool: 'Example', aliases: ['example'], hasProgram: true, status: 'active', ourLink: 'https://partner.example/start?ref=issued-id&sig=a%2Bb#offer' }
const official = { name: 'Example', url: 'https://example.com/product' }

test('an unchecked active program stays editorial', () => {
  assert.deepEqual(resolveProgramDestination('example', [partner], official), { href: official.url, sponsored: false })
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
test('catalog-only programs do not invent a hop without a checked record', () => {
  assert.equal(resolveProgramDestination('Example', [partner]), undefined)
})


test('cached Higgsfield recommendations keep the hop route before and after expiry', () => {
  const { programs } = JSON.parse(readFileSync(new URL('../../data/affiliate/programs.json', import.meta.url), 'utf8'))
  const fallback = { name: 'Higgsfield', url: 'https://higgsfield.ai' }
  for (const id of ['higgsfield', 'Higgsfield']) {
    assert.deepEqual(resolveProgramDestination(id, programs, fallback, new Date('2026-10-10T12:00:00Z')),
      { href: '/go/higgsfield', sponsored: true })
    assert.deepEqual(resolveProgramDestination(id, programs, fallback, new Date('2026-12-01T12:00:00Z')),
      { href: '/go/higgsfield', sponsored: false })
  }
})

test('approved Riverside stays editorial until account attribution is verified', () => {
  const { programs } = JSON.parse(readFileSync(new URL('../../data/affiliate/programs.json', import.meta.url), 'utf8'))
  const riverside = programs.find(program => program.tool === 'Riverside')
  assert.ok(riverside)
  assert.equal(riverside.status, 'approved-link-unverified')
  assert.equal(riverside.ourLink, null)
  assert.equal(riverside.cookieDays, null)
  const fallback = { name: 'Riverside', url: 'https://riverside.com/' }
  for (const id of ['Riverside', ...riverside.aliases]) {
    assert.deepEqual(resolveProgramDestination(id, programs, fallback, new Date('2026-11-03T12:00:00Z')),
      { href: fallback.url, sponsored: false })
    assert.equal(resolveProgramDestination(id, programs), undefined)
  }
})
