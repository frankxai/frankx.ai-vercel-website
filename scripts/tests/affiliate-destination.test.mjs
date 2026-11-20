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

test('Apify and Riverside referrals preserve issued URLs and expire to official destinations', async () => {
  const { getOutboundLink } = await import('../../data/outbound-links.ts')
  const { resolveGoDestination } = await import('../../lib/tools/go-destination.ts')
  const { recordsFromPrograms } = await import('../../lib/tools/record.ts')
  const { programs } = JSON.parse(readFileSync(new URL('../../data/affiliate/programs.json', import.meta.url), 'utf8'))
  const records = recordsFromPrograms(programs)
  for (const [slug, issued, officialUrl] of [
    ['apify', 'https://www.apify.com?fpr=vzmwk5', 'https://apify.com'],
    ['riverside', 'https://affiliate.riverside.com/ib1bb4b5kgal', 'https://riverside.com'],
  ]) {
    const outboundDestination = getOutboundLink(slug)?.destination
    assert.equal(outboundDestination, officialUrl)
    assert.deepEqual(resolveProgramDestination(slug, programs, undefined, new Date('2026-11-17T12:00:00Z')), { href: `/go/${slug}`, sponsored: true })
    assert.deepEqual(resolveGoDestination({ slug, records, outboundDestination, now: new Date('2026-11-17T12:00:00Z') }), { action: 'hop', href: issued })
    assert.deepEqual(resolveGoDestination({ slug, records, outboundDestination, now: new Date('2027-02-01T12:00:00Z') }), { action: 'outbound', href: officialUrl })
  }
})
