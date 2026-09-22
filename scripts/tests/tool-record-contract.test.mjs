import assert from 'node:assert/strict'
import test from 'node:test'
import { resolveGoDestination } from '../../lib/tools/go-destination.ts'
import { programToRecord, socialToolToRecord, sponsorDecision } from '../../lib/tools/record.ts'
import { resolveProgramDestination } from '../../lib/affiliates/resolve-destination.ts'

const now = new Date('2026-09-22T12:00:00Z')
const fresh = '2026-09-01'
const issued = 'https://partner.example/start?ref=issued-id&sig=a%2Bb#offer'

function liveProgram(overrides = {}) {
  return {
    tool: 'Example',
    aliases: ['example'],
    hasProgram: true,
    status: 'active',
    ourLink: issued,
    evidence: 'first-party',
    verifiedOn: fresh,
    checkedOn: fresh,
    ...overrides,
  }
}

test('a checked first-party record preserves the issued URL and is sponsored', () => {
  const decision = sponsorDecision(programToRecord(liveProgram()), now)
  assert.equal(decision.sponsored, true)
  assert.equal(decision.href, issued)
  assert.equal(decision.rel, 'sponsored noopener')
  assert.deepEqual(
    resolveProgramDestination('example', [liveProgram()], { name: 'Example', url: 'https://example.com/product' }, now),
    { href: issued, sponsored: true },
  )
})

test('not-tested, stale, closed, oracle-excluded, and Higgsfield records cannot be sponsored', () => {
  const cases = [
    liveProgram({ evidence: 'not-tested' }),
    liveProgram({ evidence: 'vendor-claim' }),
    liveProgram({ verifiedOn: '2026-01-01', checkedOn: '2026-01-01' }),
    liveProgram({ status: 'closed', hasProgram: false }),
    liveProgram({ tool: 'AWS', aliases: ['aws'], oracleExcluded: true }),
    liveProgram({ tool: 'Higgsfield', aliases: ['higgsfield'], ourLink: 'https://go.agenticincome.ai/higgsfield' }),
  ]
  for (const program of cases) {
    const decision = sponsorDecision(programToRecord(program), now)
    assert.equal(decision.sponsored, false, program.tool)
    assert.equal(decision.rel, 'noopener')
    assert.equal(decision.href, undefined)
  }
})

test('a social atlas row with no tracked relationship stays editorial', () => {
  const decision = sponsorDecision(socialToolToRecord({
    id: 'buffer',
    name: 'Buffer',
    bestFor: 'Simple scheduling',
    caution: 'Thin approvals',
    price: 'Free tier',
    capabilities: ['Publishing'],
    evidenceClass: 'Not tested',
    affiliate: { frankxRelationship: 'No tracked FrankX relationship' },
  }, fresh), now)
  assert.equal(decision.sponsored, false)
  assert.equal(decision.reason, 'evidence')
})

test('/go refuses a destination that is not the issued URL', () => {
  const records = [programToRecord(liveProgram())]
  const hopped = resolveGoDestination({
    slug: 'example',
    records,
    outboundDestination: 'https://evil.example/steal',
    now,
  })
  assert.deepEqual(hopped, { action: 'hop', href: issued })

  const banned = resolveGoDestination({
    slug: 'higgsfield',
    records: [programToRecord(liveProgram({
      tool: 'Higgsfield',
      aliases: ['higgsfield'],
      ourLink: 'https://go.agenticincome.ai/higgsfield',
    }))],
    outboundDestination: 'https://go.agenticincome.ai/higgsfield',
    now,
  })
  assert.deepEqual(banned, { action: 'stack', id: 'higgsfield' })
})

test('an editorial short link still resolves when the program is closed', () => {
  const decision = resolveGoDestination({
    slug: 'canva',
    records: [programToRecord({ tool: 'Canva', hasProgram: false, status: 'closed', ourLink: null })],
    outboundDestination: 'https://www.canva.com/',
    now,
  })
  assert.deepEqual(decision, { action: 'outbound', href: 'https://www.canva.com/' })
})
