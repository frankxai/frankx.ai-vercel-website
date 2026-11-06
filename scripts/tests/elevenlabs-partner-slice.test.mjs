import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import matter from 'gray-matter'

import programsFile from '../../data/affiliate/programs.json' with { type: 'json' }
import { getOutboundLink } from '../../data/outbound-links.ts'
import { resolveProgramDestination } from '../../lib/affiliates/resolve-destination.ts'
import { builderEmbeds } from '../../lib/tools/builder-embeds.ts'
import { resolveGoDestination } from '../../lib/tools/go-destination.ts'
import { programToRecord, recordsFromPrograms, sponsorDecision, validatePartnerProgram } from '../../lib/tools/record.ts'
import {
  AUDIO_BRIEFING_TOOL_CONTRACTS,
  AUTHORIZED_VOICE_PRESETS,
  compileJournalToAudioBriefing,
  inspectGeneratedAudioBytes,
  normalizeMarkdownForSpeech,
  synthesizeJournalAudioBriefing,
  validateVoiceBriefingConsent,
} from '../../lib/voice/audio-briefing.ts'

function readPublicJournalEntry(slug) {
  const raw = readFileSync(
    new URL(`../../content/journal/${slug}.md`, import.meta.url),
    'utf8',
  )
  const parsed = matter(raw)
  return {
    slug,
    title: String(parsed.data.title ?? ''),
    date: String(parsed.data.date ?? ''),
    summary: String(parsed.data.summary ?? ''),
    visibility: parsed.data.visibility === 'private' ? 'private' : 'public',
    published: Boolean(parsed.data.published),
    content: parsed.content.trim(),
  }
}

test('ElevenLabs registry entry has verified PartnerStack terms, candidate URLs, and 45-day freshness', () => {
  const eleven = programsFile.programs.find((entry) => entry.tool === 'ElevenLabs')
  assert.ok(eleven, 'ElevenLabs entry must exist in data/affiliate/programs.json')
  assert.equal(eleven.status, 'active')
  assert.equal(eleven.evidence, 'first-party')
  assert.equal(eleven.verifiedOn, '2026-11-05')
  assert.equal(eleven.ourLink, 'https://try.elevenlabs.io/uc8prmq6tiyt')
  assert.equal(eleven.useHop, true)
  assert.equal(eleven.planTerms.enterpriseIncluded, false)
  assert.equal(eleven.planTerms.starterCreatorProScaleRate, '22% for 12 months')
  assert.equal(eleven.planTerms.businessRate, '11% for 12 months')
  assert.ok(Array.isArray(eleven.candidateUrls) && eleven.candidateUrls.length >= 1)

  const validation = validatePartnerProgram(eleven, new Date('2026-11-06T12:00:00.000Z'))
  assert.equal(validation.valid, true)
  assert.equal(validation.sponsoredEligible, true)

  const ironstone = programsFile.programs.find((entry) => entry.tool === 'Ironstone Design')
  assert.ok(ironstone)
  assert.equal(ironstone.status, 'hold')
  const ironstoneValidation = validatePartnerProgram(ironstone, new Date('2026-11-06T12:00:00.000Z'))
  assert.equal(ironstoneValidation.valid, true)
  assert.equal(ironstoneValidation.sponsoredEligible, false)

  const record = programToRecord(eleven)
  assert.equal(record.id, 'elevenlabs')
  assert.equal(record.relationship.kind, 'live')

  // Fresh on 2026-11-06 -> sponsored
  const freshDecision = sponsorDecision(record, new Date('2026-11-06T12:00:00.000Z'))
  assert.equal(freshDecision.sponsored, true)
  assert.equal(freshDecision.href, 'https://try.elevenlabs.io/uc8prmq6tiyt')

  // Stale after 45 days (2027-01-15) -> automatically downgrades to non-sponsored
  const staleDecision = sponsorDecision(record, new Date('2027-01-15T12:00:00.000Z'))
  assert.equal(staleDecision.sponsored, false)
  assert.equal(staleDecision.reason, 'stale-verification')

  // Builder embeds on 2026-11-06 render ElevenLabs as Sponsored with disclosure
  const embeds = builderEmbeds(new Date('2026-11-06T12:00:00.000Z'))
  const elevenEmbed = embeds.find((entry) => entry.name === 'ElevenLabs')
  assert.ok(elevenEmbed)
  assert.equal(elevenEmbed.sponsored, true)
  assert.equal(elevenEmbed.rel, 'sponsored noopener')
  assert.equal(elevenEmbed.href, 'https://try.elevenlabs.io/uc8prmq6tiyt')
  assert.match(elevenEmbed.disclosure ?? '', /affiliate links/i)
})

test('outbound /go/elevenlabs hop and affiliate-manager resolve to the canonical PartnerStack URL', () => {
  const hop = getOutboundLink('elevenlabs')
  assert.ok(hop)
  assert.equal(hop.destination, 'https://elevenlabs.io')

  const records = recordsFromPrograms(programsFile.programs)
  const freshGo = resolveGoDestination({
    slug: 'elevenlabs',
    records,
    outboundDestination: hop.destination,
    now: new Date('2026-11-06T12:00:00.000Z'),
  })
  assert.deepEqual(freshGo, {
    action: 'hop',
    href: 'https://try.elevenlabs.io/uc8prmq6tiyt',
  })

  const expiredGo = resolveGoDestination({
    slug: 'elevenlabs',
    records,
    outboundDestination: hop.destination,
    now: new Date('2027-01-15T12:00:00.000Z'),
  })
  assert.deepEqual(expiredGo, {
    action: 'outbound',
    href: 'https://elevenlabs.io',
  })

  const destination = resolveProgramDestination(
    'elevenlabs',
    programsFile.programs,
    { name: 'ElevenLabs', url: 'https://elevenlabs.io' },
    new Date('2026-11-06T12:00:00.000Z'),
  )
  assert.deepEqual(destination, {
    href: '/go/elevenlabs',
    sponsored: true,
  })

  const affiliateManager = readFileSync(
    new URL('../../lib/affiliates/affiliate-manager.ts', import.meta.url),
    'utf8',
  )
  assert.match(affiliateManager, /22% Starter\/Creator\/Pro\/Scale \(11% Business\) for 12 months; Enterprise excluded/)
  assert.match(affiliateManager, /cookieDuration: '90 days'/)
})

test('journal-to-audio briefing compiler enforces public visibility, character ceiling, and deterministic idempotency', () => {
  const entry = readPublicJournalEntry('2026-07-29-confidence-must-enter-the-market')
  assert.ok(entry)
  assert.equal(entry.visibility, 'public')
  assert.equal(entry.published, true)

  const compiledA = compileJournalToAudioBriefing(entry, {
    modelId: 'eleven_multilingual_v2',
    voiceId: 'JBFqnCBsd6RMkjVDRZzb',
  })
  const compiledB = compileJournalToAudioBriefing(entry, {
    modelId: 'eleven_multilingual_v2',
    voiceId: 'JBFqnCBsd6RMkjVDRZzb',
  })

  assert.equal(compiledA.ok, true)
  assert.equal(compiledB.ok, true)
  if (!compiledA.ok || !compiledB.ok) return

  assert.equal(compiledA.briefing.slug, entry.slug)
  assert.equal(compiledA.briefing.idempotencyKey, compiledB.briefing.idempotencyKey)
  assert.equal(compiledA.briefing.scriptSha256, compiledB.briefing.scriptSha256)
  assert.ok(compiledA.briefing.characterCount > 100 && compiledA.briefing.characterCount <= 2800)
  assert.equal(compiledA.briefing.estimatedCredits, compiledA.briefing.characterCount)

  // Turbo v2.5 costs 0.5 credits/char and produces a different idempotencyKey
  const compiledTurbo = compileJournalToAudioBriefing(entry, {
    modelId: 'eleven_turbo_v2_5',
    voiceId: 'JBFqnCBsd6RMkjVDRZzb',
  })
  assert.equal(compiledTurbo.ok, true)
  if (!compiledTurbo.ok) return
  assert.equal(
    compiledTurbo.briefing.estimatedCredits,
    Math.ceil(compiledTurbo.briefing.characterCount * 0.5),
  )
  assert.notEqual(compiledA.briefing.idempotencyKey, compiledTurbo.briefing.idempotencyKey)

  // Private entries are blocked immediately
  const privateResult = compileJournalToAudioBriefing({
    ...entry,
    visibility: 'private',
  })
  assert.deepEqual(privateResult, { ok: false, reason: 'entry-not-public' })

  // Fixed-section character ceiling enforcement: reject maxCharacters smaller than header + body + closing
  const overtightResult = compileJournalToAudioBriefing(entry, {
    maxCharacters: 120,
  })
  assert.deepEqual(overtightResult, { ok: false, reason: 'invalid-max-characters' })
})

test('consent guard blocks unconsented voice synthesis and MP3 byte QA rejects invalid payloads', () => {
  const validConsent = validateVoiceBriefingConsent({
    voiceId: 'JBFqnCBsd6RMkjVDRZzb',
    voiceOwnerApproved: true,
    editorialApproved: true,
    cloneProhibited: true,
  })
  assert.equal(validConsent.allowed, true)
  if (validConsent.allowed) {
    assert.ok(validConsent.consentReference.includes('JBFqnCBsd6RMkjVDRZzb'))
  }

  const unapprovedOwner = validateVoiceBriefingConsent({
    voiceId: 'JBFqnCBsd6RMkjVDRZzb',
    voiceOwnerApproved: false,
    editorialApproved: true,
    cloneProhibited: true,
  })
  assert.deepEqual(unapprovedOwner, { allowed: false, reason: 'unapproved-voice-owner' })

  const unknownVoice = validateVoiceBriefingConsent({
    voiceId: 'unverified_clone_voice_123',
    voiceOwnerApproved: true,
    editorialApproved: true,
    cloneProhibited: true,
  })
  assert.deepEqual(unknownVoice, { allowed: false, reason: 'unlisted-voice-id' })

  // MP3 byte inspection: valid ID3 header (0x49 0x44 0x33) with >= 512 bytes
  const validMp3 = new Uint8Array(600)
  validMp3[0] = 0x49
  validMp3[1] = 0x44
  validMp3[2] = 0x33
  const okQa = inspectGeneratedAudioBytes(validMp3)
  assert.equal(okQa.valid, true)

  // Too small payload
  const tinyMp3 = new Uint8Array(100)
  tinyMp3[0] = 0x49
  tinyMp3[1] = 0x44
  tinyMp3[2] = 0x33
  assert.deepEqual(inspectGeneratedAudioBytes(tinyMp3), {
    valid: false,
    reason: 'payload-too-small',
  })

  // Non-MP3 payload (e.g., JSON error "{")
  const badHeader = new Uint8Array(600)
  badHeader[0] = 0x7b
  assert.deepEqual(inspectGeneratedAudioBytes(badHeader), {
    valid: false,
    reason: 'html-or-json-error-payload',
  })
})

test('synthesizeJournalAudioBriefing writes audio + provenance manifest and reuses idempotency cache', async () => {
  const entry = readPublicJournalEntry('2026-07-29-confidence-must-enter-the-market')
  assert.ok(entry)

  const storedAudio = new Map()
  const storedManifests = new Map()
  let fetchCalls = 0

  const fakeStorage = {
    async exists(blobKey) {
      return storedAudio.has(blobKey) ? { url: `https://blob.example/${blobKey}` } : null
    },
    async putAudio(blobKey, bytes) {
      storedAudio.set(blobKey, bytes)
      return { url: `https://blob.example/${blobKey}` }
    },
    async putManifest(blobKey, manifest) {
      storedManifests.set(blobKey, manifest)
      return { url: `https://blob.example/${blobKey}` }
    },
  }

  const fakeFetch = async () => {
    fetchCalls += 1
    const mp3 = new Uint8Array(1024)
    mp3[0] = 0x49
    mp3[1] = 0x44
    mp3[2] = 0x33
    return new Response(mp3, { status: 200, headers: { 'content-type': 'audio/mpeg' } })
  }

  const firstRun = await synthesizeJournalAudioBriefing({
    entry,
    consent: {
      voiceId: AUTHORIZED_VOICE_PRESETS[0].voiceId,
      voiceOwnerApproved: true,
      editorialApproved: true,
      cloneProhibited: true,
    },
    apiKey: 'test-elevenlabs-key',
    fetchImpl: fakeFetch,
    storage: fakeStorage,
    now: new Date('2026-11-06T12:00:00.000Z'),
  })

  assert.equal(firstRun.ok, true)
  if (!firstRun.ok) return
  assert.equal(firstRun.cached, false)
  assert.equal(fetchCalls, 1)
  assert.equal(firstRun.manifest.schema, 'frankx.audio-briefing.provenance.v1')

  // Second run with identical parameters hits idempotency cache without calling fetch
  const secondRun = await synthesizeJournalAudioBriefing({
    entry,
    consent: {
      voiceId: AUTHORIZED_VOICE_PRESETS[0].voiceId,
      voiceOwnerApproved: true,
      editorialApproved: true,
      cloneProhibited: true,
    },
    apiKey: 'test-elevenlabs-key',
    fetchImpl: fakeFetch,
    storage: fakeStorage,
    now: new Date('2026-11-06T12:01:00.000Z'),
  })

  assert.equal(secondRun.ok, true)
  if (!secondRun.ok) return
  assert.equal(secondRun.cached, true)
  assert.equal(fetchCalls, 1)
  assert.equal(AUDIO_BRIEFING_TOOL_CONTRACTS.length, 2)
  assert.deepEqual(normalizeMarkdownForSpeech('## Heading\n\nRead [this link](https://frankx.ai) **now**.'), [
    'Heading.',
    'Read this link now.',
  ])
})

test('ElevenLabs guide and workbench include affiliate disclosure, no stale 7x6qh6upgry8 links, and privacy-safe events', () => {
  const guide = readFileSync(new URL('../../content/guides/elevenlabs-voice-guide.mdx', import.meta.url), 'utf8')
  const workbench = readFileSync(new URL('../../components/guides/ElevenLabsAudioBriefingWorkbench.tsx', import.meta.url), 'utf8')

  assert.match(guide, /<ArticleRecommendation affiliateId="elevenlabs"/)
  assert.match(guide, /<ArticleFigure id="elevenlabs-journal-audio-briefing" \/>/)
  assert.match(guide, /<ElevenLabsAudioBriefingWorkbench \/>/)
  assert.match(guide, /22% recurring commission/)
  assert.match(guide, /11% recurring commission/)
  assert.doesNotMatch(guide, /7x6qh6upgry8/)

  assert.match(workbench, /href="\/go\/elevenlabs"/)
  assert.match(workbench, /rel="sponsored noopener"/)
  assert.match(workbench, /trackEvent\('partner_resource_viewed'/)
  assert.match(workbench, /trackEvent\('partner_resource_clicked'/)
})
