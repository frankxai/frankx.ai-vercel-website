import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { resolveProgramDestination } from '../../lib/affiliates/resolve-destination.ts'
import { resolveGoDestination } from '../../lib/tools/go-destination.ts'
import { recordsFromPrograms } from '../../lib/tools/record.ts'

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

test('held Apify enrollment never resolves to the staged referral destination', () => {
  const { programs } = JSON.parse(readFileSync(new URL('../../data/affiliate/programs.json', import.meta.url), 'utf8'))
  const apify = programs.find(program => program.tool === 'Apify')
  assert.ok(apify)
  assert.equal(apify.status, 'hold')
  assert.equal(apify.ourLink, null)
  const destination = resolveProgramDestination('apify', programs, undefined, new Date('2026-11-13T12:00:00Z'))
  assert.deepEqual(destination, { href: '/go/apify', sponsored: false })
  assert.equal(apify.candidateUrls.includes(destination.href), false)
  const hop = resolveGoDestination({ slug: 'apify', records: recordsFromPrograms(programs), now: new Date('2026-11-13T12:00:00Z') })
  assert.equal(hop.action, 'stack')
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
