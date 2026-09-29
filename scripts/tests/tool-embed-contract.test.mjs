import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { assetDecision } from '../../lib/tools/record.ts'
import { builderEmbeds, presentEmbed } from '../../lib/tools/builder-embeds.ts'
import { programToRecord } from '../../lib/tools/record.ts'

const now = new Date('2026-09-23T12:00:00.000Z')
const local = '/images/tools/example-mark.png'

test('a permitted brand kit with a site-local file is the only brand image that shows', () => {
  const shown = assetDecision({
    kind: 'brand-kit',
    permission: 'permitted',
    sourceUrl: 'https://brand.example/kit',
    recordedOn: '2026-09-01',
    localPath: local,
  })
  assert.equal(shown.show, true)
  assert.equal(shown.src, local)

  for (const permission of ['unknown', 'forbidden']) {
    const hidden = assetDecision({
      kind: 'brand-kit',
      permission,
      sourceUrl: 'https://brand.example/kit',
      recordedOn: '2026-09-01',
      localPath: local,
    })
    assert.equal(hidden.show, false, permission)
  }
})

test('a first-party screenshot needs the page, the date, and a file this site serves', () => {
  const shown = assetDecision({
    kind: 'screenshot',
    party: 'first-party',
    sourceUrl: 'https://example.com/product',
    recordedOn: '2026-09-01',
    localPath: local,
  })
  assert.equal(shown.show, true)
  assert.equal(shown.src, local)

  const undated = assetDecision({
    kind: 'screenshot',
    party: 'first-party',
    sourceUrl: 'https://example.com/product',
    localPath: local,
  })
  assert.equal(undated.show, false)
})

test('unknown permission, remote-only, and generated stand-ins do not render', () => {
  assert.equal(assetDecision({ kind: 'unknown' }).show, false)
  assert.equal(assetDecision({ kind: 'remote', sourceUrl: 'https://cdn.example/logo.png' }).show, false)
  assert.equal(assetDecision({
    kind: 'brand-kit',
    permission: 'permitted',
    sourceUrl: 'https://brand.example/kit',
    recordedOn: '2026-09-01',
    localPath: 'https://cdn.example/logo.png',
  }).show, false)
  assert.equal(assetDecision({ kind: 'generated', localPath: local }).show, false)
  assert.equal(assetDecision({
    kind: 'screenshot',
    party: 'generated',
    sourceUrl: 'https://example.com/product',
    recordedOn: '2026-09-01',
    localPath: local,
  }).show, false)
})

test('Higgsfield is not a visual source', () => {
  const decision = assetDecision({
    kind: 'brand-kit',
    permission: 'permitted',
    sourceUrl: 'https://higgsfield.ai/brand',
    recordedOn: '2026-09-01',
    localPath: local,
  })
  assert.equal(decision.show, false)
  assert.equal(decision.reason, 'generation-banned')
})

test('the public builder page embeds design tools and affiliate tools without a paid cloak', () => {
  const embeds = builderEmbeds(now)
  const figma = embeds.find((embed) => embed.name === 'Figma')
  const eleven = embeds.find((embed) => embed.name === 'ElevenLabs')
  const canva = embeds.find((embed) => embed.name === 'Canva')
  assert.ok(figma)
  assert.equal(figma.audience, 'design')
  assert.equal(figma.sponsored, false)
  assert.equal(figma.rel, 'noopener')
  assert.equal(figma.image, undefined)
  assert.match(figma.job, /design/i)

  assert.ok(eleven)
  assert.equal(eleven.audience, 'affiliate')
  assert.equal(eleven.sponsored, false)
  assert.equal(eleven.rel, 'noopener')
  assert.equal(eleven.href, 'https://elevenlabs.io')
  assert.doesNotMatch(eleven.href, /go\.agenticincome\.ai|try\.elevenlabs\.io/)

  assert.ok(canva)
  assert.equal(canva.sponsored, false)
  assert.match(canva.relationshipLabel, /closed/i)
  assert.equal(embeds.some((embed) => /higgsfield/i.test(embed.name)), false)

  const page = readFileSync(new URL('../../app/resources/builder-stack/page.tsx', import.meta.url), 'utf8')
  assert.match(page, /Figma/)
  assert.match(page, /ElevenLabs/)
  assert.match(page, /builderEmbeds/)
  assert.doesNotMatch(page, /src=["']https?:\/\//)
  assert.doesNotMatch(page, /go\.agenticincome\.ai/)
})

test('a closed program stays closed and an issued fresh URL is the only sponsored control', () => {
  const closed = presentEmbed(programToRecord({
    tool: 'Canva',
    hasProgram: false,
    status: 'closed',
    ourLink: 'https://go.agenticincome.ai/canva',
  }), {
    productUrl: 'https://www.canva.com',
    audience: 'design',
    job: 'Lay out graphics.',
    now,
  })
  assert.equal(closed.sponsored, false)
  assert.equal(closed.href, 'https://www.canva.com')
  assert.match(closed.relationshipLabel, /closed/i)
  assert.equal(closed.rel, 'noopener')

  const live = presentEmbed(programToRecord({
    tool: 'Example Voice',
    hasProgram: true,
    status: 'active',
    ourLink: 'https://partner.example/start?ref=issued',
    evidence: 'first-party',
    verifiedOn: '2026-09-01',
    checkedOn: '2026-09-01',
  }), {
    productUrl: 'https://example.com/voice',
    audience: 'affiliate',
    job: 'Record a voice.',
    asset: {
      kind: 'screenshot',
      party: 'first-party',
      sourceUrl: 'https://example.com/voice',
      recordedOn: '2026-09-01',
      localPath: local,
    },
    now,
  })
  assert.equal(live.sponsored, true)
  assert.equal(live.href, 'https://partner.example/start?ref=issued')
  assert.equal(live.rel, 'sponsored noopener')
  assert.equal(live.image, local)
  assert.match(live.disclosure, /affiliate links/i)
})
