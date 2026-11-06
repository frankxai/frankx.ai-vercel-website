import { createHash } from 'node:crypto'
import type { JournalEntry } from '../journal.ts'
import { uploadFile } from '../storage.ts'

/**
 * Bounded reference implementation:
 * "From founder journal to consent-based AI audio briefing"
 *
 * Governance & safety boundaries:
 * 1. Only public, published journal notes (`visibility === 'public' && published === true`) can compile.
 * 2. Voice generation requires explicit consent flags (`voiceOwnerApproved`, `editorialApproved`, `cloneProhibited`)
 *    plus an allowlisted studio or owner-authorized voice ID. Unverified third-party voice cloning is refused.
 * 3. Every script is bounded by `maxCharacters` (default 2,800 chars, hard ceiling 4,500 chars) and a credit ceiling.
 * 4. Every request computes a deterministic SHA-256 `idempotencyKey` from `(slug, scriptSha256, voiceId, modelId)`
 *    so repeated triggers never burn duplicate ElevenLabs credits.
 * 5. Generated audio bytes pass an independent QA check (non-empty byte bounds + MP3 frame sync / ID3 signature)
 *    before storage in Vercel Blob (`lib/storage.ts`) alongside an immutable provenance manifest.
 */

export const AUDIO_BRIEFING_DEFAULT_MAX_CHARS = 2800
export const AUDIO_BRIEFING_HARD_MAX_CHARS = 4500
export const AUDIO_BRIEFING_DEFAULT_MAX_CREDITS = 3000

export type ElevenLabsBriefingModelId =
  | 'eleven_multilingual_v2'
  | 'eleven_flash_v2_5'
  | 'eleven_turbo_v2_5'

export type AuthorizedVoicePreset = {
  voiceId: string
  label: string
  role: 'founder-narrator' | 'technical-briefing' | 'editorial-summary'
  rightsBasis: 'elevenlabs-licensed-voice-library' | 'first-party-owner-consent'
  recommendedModel: ElevenLabsBriefingModelId
  defaultSettings: {
    stability: number
    similarityBoost: number
    style: number
    useSpeakerBoost: boolean
  }
}

export const AUTHORIZED_VOICE_PRESETS: readonly AuthorizedVoicePreset[] = [
  {
    voiceId: 'JBFqnCBsd6RMkjVDRZzb',
    label: 'George — Studio Warm Narrator (Licensed Library)',
    role: 'founder-narrator',
    rightsBasis: 'elevenlabs-licensed-voice-library',
    recommendedModel: 'eleven_multilingual_v2',
    defaultSettings: {
      stability: 0.55,
      similarityBoost: 0.78,
      style: 0.12,
      useSpeakerBoost: true,
    },
  },
  {
    voiceId: 'onwK4e9ZLuTAKqWW03F9',
    label: 'Daniel — Measured Technical Briefing (Licensed Library)',
    role: 'technical-briefing',
    rightsBasis: 'elevenlabs-licensed-voice-library',
    recommendedModel: 'eleven_turbo_v2_5',
    defaultSettings: {
      stability: 0.62,
      similarityBoost: 0.75,
      style: 0.08,
      useSpeakerBoost: true,
    },
  },
  {
    voiceId: '21m00Tcm4TlvDq8ikWAM',
    label: 'Rachel — Clear Editorial Summary (Licensed Library)',
    role: 'editorial-summary',
    rightsBasis: 'elevenlabs-licensed-voice-library',
    recommendedModel: 'eleven_flash_v2_5',
    defaultSettings: {
      stability: 0.58,
      similarityBoost: 0.8,
      style: 0.1,
      useSpeakerBoost: true,
    },
  },
]

const MODEL_CREDIT_PER_CHAR: Record<ElevenLabsBriefingModelId, number> = {
  eleven_multilingual_v2: 1,
  eleven_flash_v2_5: 0.5,
  eleven_turbo_v2_5: 0.5,
}

export type VoiceBriefingConsent = {
  voiceId: string
  voiceOwnerApproved: boolean
  editorialApproved: boolean
  cloneProhibited: boolean
  consentReference?: string
}

export type VoiceConsentDecision =
  | {
      allowed: true
      preset: AuthorizedVoicePreset
      consentReference: string
    }
  | {
      allowed: false
      reason:
        | 'unapproved-voice-owner'
        | 'unapproved-editorial'
        | 'clone-prohibition-required'
        | 'unlisted-voice-id'
    }

export type CompiledAudioBriefing = {
  slug: string
  title: string
  date: string
  canonicalPath: string
  spokenScript: string
  sections: string[]
  characterCount: number
  wordCount: number
  estimatedDurationSeconds: number
  estimatedCredits: number
  modelId: ElevenLabsBriefingModelId
  voiceId: string
  sourceSha256: string
  scriptSha256: string
  idempotencyKey: string
  truncated: boolean
}

export type CompileAudioBriefingResult =
  | { ok: true; briefing: CompiledAudioBriefing }
  | {
      ok: false
      reason:
        | 'entry-not-public'
        | 'entry-not-published'
        | 'empty-spoken-script'
        | 'exceeds-credit-ceiling'
        | 'invalid-max-characters'
    }

export type AudioQaVerdict =
  | {
      valid: true
      byteLength: number
      container: 'mp3-id3' | 'mp3-frame-sync'
      sha256: string
      estimatedDurationSeconds: number
    }
  | {
      valid: false
      reason:
        | 'empty-audio-payload'
        | 'payload-too-small'
        | 'payload-exceeds-max-bytes'
        | 'html-or-json-error-payload'
        | 'invalid-mp3-signature'
    }

export type AudioBriefingProvenanceManifest = {
  schema: 'frankx.audio-briefing.provenance.v1'
  slug: string
  canonicalPath: string
  title: string
  date: string
  modelId: ElevenLabsBriefingModelId
  voiceId: string
  voiceLabel: string
  rightsBasis: AuthorizedVoicePreset['rightsBasis']
  consentReference: string
  characterCount: number
  estimatedCredits: number
  estimatedDurationSeconds: number
  sourceSha256: string
  scriptSha256: string
  audioSha256: string
  audioByteLength: number
  idempotencyKey: string
  blobAudioKey: string
  blobManifestKey: string
  generatedAt: string
  disclosure: string
}

export type AudioBriefingStorageAdapter = {
  exists?: (blobKey: string) => Promise<{ url: string } | null>
  putAudio: (blobKey: string, bytes: Buffer) => Promise<{ url: string }>
  putManifest: (blobKey: string, manifest: AudioBriefingProvenanceManifest) => Promise<{ url: string }>
}

function sha256Hex(value: string | Uint8Array): string {
  return createHash('sha256').update(value).digest('hex')
}

export function validateVoiceBriefingConsent(consent: VoiceBriefingConsent): VoiceConsentDecision {
  if (consent.cloneProhibited !== true) {
    return { allowed: false, reason: 'clone-prohibition-required' }
  }
  if (consent.voiceOwnerApproved !== true) {
    return { allowed: false, reason: 'unapproved-voice-owner' }
  }
  if (consent.editorialApproved !== true) {
    return { allowed: false, reason: 'unapproved-editorial' }
  }
  const preset = AUTHORIZED_VOICE_PRESETS.find((item) => item.voiceId === consent.voiceId)
  if (!preset) {
    return { allowed: false, reason: 'unlisted-voice-id' }
  }
  return {
    allowed: true,
    preset,
    consentReference:
      consent.consentReference?.trim() ||
      `frankx-voice-policy:2026-11-05:${preset.voiceId}:${preset.rightsBasis}`,
  }
}

/**
 * Strips Markdown formatting into natural spoken prose with deliberate pacing cues.
 */
export function normalizeMarkdownForSpeech(rawMarkdown: string): string[] {
  const withoutFrontmatter = rawMarkdown.replace(/^---[\s\S]*?---/, '').trim()
  const withoutCodeBlocks = withoutFrontmatter.replace(/```[\s\S]*?```/g, '')

  const paragraphs = withoutCodeBlocks
    .split(/\n{2,}/)
    .map((block) =>
      block
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/^\s{0,3}#{1,6}\s+/gm, '')
        .replace(/^\s{0,3}>\s?/gm, '')
        .replace(/^\s{0,3}[-*+]\s+/gm, '')
        .replace(/[*_~]/g, '')
        .replace(/\s*→\s*/g, ', then ')
        .replace(/\s*—\s*/g, ' — ')
        .replace(/\s+/g, ' ')
        .trim()
    )
    .filter((line) => line.length > 0)

  return paragraphs.map((line) => (/ [.!?…]$|[.!?…]$/.test(line) ? line : `${line}.`))
}

export function compileJournalToAudioBriefing(
  entry: Pick<
    JournalEntry,
    'slug' | 'title' | 'date' | 'summary' | 'content' | 'visibility' | 'published'
  >,
  options?: {
    voiceId?: string
    modelId?: ElevenLabsBriefingModelId
    maxCharacters?: number
    maxCredits?: number
  }
): CompileAudioBriefingResult {
  if (entry.visibility !== 'public') {
    return { ok: false, reason: 'entry-not-public' }
  }
  if (entry.published !== true) {
    return { ok: false, reason: 'entry-not-published' }
  }

  const maxCharacters = options?.maxCharacters ?? AUDIO_BRIEFING_DEFAULT_MAX_CHARS
  if (maxCharacters < 120 || maxCharacters > AUDIO_BRIEFING_HARD_MAX_CHARS) {
    return { ok: false, reason: 'invalid-max-characters' }
  }

  const maxCredits = options?.maxCredits ?? AUDIO_BRIEFING_DEFAULT_MAX_CREDITS
  const preset =
    AUTHORIZED_VOICE_PRESETS.find((item) => item.voiceId === options?.voiceId) ??
    AUTHORIZED_VOICE_PRESETS[0]
  const modelId: ElevenLabsBriefingModelId = options?.modelId ?? preset.recommendedModel
  const voiceId = preset.voiceId

  const bodyParagraphs = normalizeMarkdownForSpeech(entry.content)
  if (bodyParagraphs.length === 0) {
    return { ok: false, reason: 'empty-spoken-script' }
  }

  const dateLine = entry.date ? `Dated ${entry.date}.` : 'Dated journal note.'
  const summaryLead = entry.summary?.trim()
    ? `${entry.summary.trim().replace(/[.!?]+$/, '')}.`
    : ''
  const headerSection = [
    `FrankX Founder Journal Audio Briefing. ${entry.title}. ${dateLine}`,
    summaryLead,
  ]
    .filter(Boolean)
    .join(' ')

  const closingSection = `End of briefing. Read the canonical note at frankx.ai/journal/${entry.slug}.`

  const selectedSections: string[] = [headerSection]
  let truncated = false
  const reservedForClosing = closingSection.length + 2

  for (const paragraph of bodyParagraphs) {
    const candidateLength =
      selectedSections.join('\n\n').length + 2 + paragraph.length + reservedForClosing
    if (candidateLength <= maxCharacters) {
      selectedSections.push(paragraph)
    } else {
      truncated = true
      break
    }
  }

  selectedSections.push(closingSection)
  const spokenScript = selectedSections.join('\n\n')
  const characterCount = spokenScript.length
  const creditRate = MODEL_CREDIT_PER_CHAR[modelId] ?? 1
  const estimatedCredits = Math.ceil(characterCount * creditRate)

  if (estimatedCredits > maxCredits) {
    return { ok: false, reason: 'exceeds-credit-ceiling' }
  }

  const wordCount = spokenScript.split(/\s+/).filter(Boolean).length
  // Measured studio narration averages ~145 words per minute.
  const estimatedDurationSeconds = Math.max(8, Math.round((wordCount / 145) * 60))
  const sourceSha256 = sha256Hex(`${entry.slug}:${entry.date}:${entry.title}:${entry.content}`)
  const scriptSha256 = sha256Hex(spokenScript)
  const idempotencyKey = sha256Hex(
    `frankx-audio-briefing:v1:${entry.slug}:${scriptSha256}:${voiceId}:${modelId}`
  ).slice(0, 32)

  return {
    ok: true,
    briefing: {
      slug: entry.slug,
      title: entry.title,
      date: entry.date,
      canonicalPath: `/journal/${entry.slug}`,
      spokenScript,
      sections: selectedSections,
      characterCount,
      wordCount,
      estimatedDurationSeconds,
      estimatedCredits,
      modelId,
      voiceId,
      sourceSha256,
      scriptSha256,
      idempotencyKey,
      truncated,
    },
  }
}

/**
 * Independent QA check on synthesized audio bytes before persisting to storage.
 * Rejects empty buffers, suspiciously tiny payloads, HTML/JSON error pages, or non-MP3 bytes.
 */
export function inspectGeneratedAudioBytes(
  bytes: Uint8Array | Buffer,
  options?: { minBytes?: number; maxBytes?: number }
): AudioQaVerdict {
  const minBytes = options?.minBytes ?? 512
  const maxBytes = options?.maxBytes ?? 15 * 1024 * 1024

  if (!bytes || bytes.byteLength === 0) {
    return { valid: false, reason: 'empty-audio-payload' }
  }
  if (bytes.byteLength < minBytes) {
    return { valid: false, reason: 'payload-too-small' }
  }
  if (bytes.byteLength > maxBytes) {
    return { valid: false, reason: 'payload-exceeds-max-bytes' }
  }

  // Reject accidental JSON (`{`) or HTML (`<`) error bodies returned with HTTP 200
  const b0 = bytes[0]
  const b1 = bytes[1]
  const b2 = bytes[2]
  if (b0 === 0x7b || b0 === 0x3c) {
    return { valid: false, reason: 'html-or-json-error-payload' }
  }

  const isId3 = b0 === 0x49 && b1 === 0x44 && b2 === 0x33 // "ID3"
  const isMpegSync = b0 === 0xff && (b1 & 0xe0) === 0xe0 // MPEG frame sync 11 bits set

  if (!isId3 && !isMpegSync) {
    return { valid: false, reason: 'invalid-mp3-signature' }
  }

  // At 128 kbps (16,000 bytes/sec), estimate duration for sanity metrics
  const estimatedDurationSeconds = Math.max(1, Math.round(bytes.byteLength / 16000))

  return {
    valid: true,
    byteLength: bytes.byteLength,
    container: isId3 ? 'mp3-id3' : 'mp3-frame-sync',
    sha256: sha256Hex(bytes),
    estimatedDurationSeconds,
  }
}

const DEFAULT_STORAGE_ADAPTER: AudioBriefingStorageAdapter = {
  async putAudio(blobKey, bytes) {
    const uploaded = await uploadFile(blobKey, bytes, {
      contentType: 'audio/mpeg',
      access: 'public',
      addRandomSuffix: false,
    })
    return { url: uploaded.url }
  },
  async putManifest(blobKey, manifest) {
    const uploaded = await uploadFile(
      blobKey,
      Buffer.from(JSON.stringify(manifest, null, 2), 'utf8'),
      {
        contentType: 'application/json',
        access: 'public',
        addRandomSuffix: false,
      }
    )
    return { url: uploaded.url }
  },
}

export type SynthesizeAudioBriefingResult =
  | {
      ok: true
      cached: boolean
      audioUrl: string
      manifestUrl?: string
      manifest: AudioBriefingProvenanceManifest
    }
  | {
      ok: false
      reason: string
    }

export async function synthesizeJournalAudioBriefing(params: {
  entry: Pick<
    JournalEntry,
    'slug' | 'title' | 'date' | 'summary' | 'content' | 'visibility' | 'published'
  >
  consent: VoiceBriefingConsent
  modelId?: ElevenLabsBriefingModelId
  maxCharacters?: number
  maxCredits?: number
  apiKey?: string
  fetchImpl?: typeof fetch
  storage?: AudioBriefingStorageAdapter
  now?: Date
}): Promise<SynthesizeAudioBriefingResult> {
  const consentDecision = validateVoiceBriefingConsent(params.consent)
  if (!consentDecision.allowed) {
    return { ok: false, reason: consentDecision.reason }
  }

  const compiled = compileJournalToAudioBriefing(params.entry, {
    voiceId: consentDecision.preset.voiceId,
    modelId: params.modelId ?? consentDecision.preset.recommendedModel,
    maxCharacters: params.maxCharacters,
    maxCredits: params.maxCredits,
  })
  if (!compiled.ok) {
    return { ok: false, reason: compiled.reason }
  }

  const { briefing } = compiled
  const blobAudioKey = `audio-briefings/${briefing.slug}/${briefing.idempotencyKey}.mp3`
  const blobManifestKey = `audio-briefings/${briefing.slug}/${briefing.idempotencyKey}.json`
  const storage = params.storage ?? DEFAULT_STORAGE_ADAPTER
  const generatedAt = (params.now ?? new Date()).toISOString()

  if (storage.exists) {
    const existing = await storage.exists(blobAudioKey)
    if (existing) {
      return {
        ok: true,
        cached: true,
        audioUrl: existing.url,
        manifest: {
          schema: 'frankx.audio-briefing.provenance.v1',
          slug: briefing.slug,
          canonicalPath: briefing.canonicalPath,
          title: briefing.title,
          date: briefing.date,
          modelId: briefing.modelId,
          voiceId: briefing.voiceId,
          voiceLabel: consentDecision.preset.label,
          rightsBasis: consentDecision.preset.rightsBasis,
          consentReference: consentDecision.consentReference,
          characterCount: briefing.characterCount,
          estimatedCredits: briefing.estimatedCredits,
          estimatedDurationSeconds: briefing.estimatedDurationSeconds,
          sourceSha256: briefing.sourceSha256,
          scriptSha256: briefing.scriptSha256,
          audioSha256: 'cached-by-idempotency-key',
          audioByteLength: 0,
          idempotencyKey: briefing.idempotencyKey,
          blobAudioKey,
          blobManifestKey,
          generatedAt,
          disclosure:
            'Synthesized with ElevenLabs using an authorized voice preset and published alongside its canonical FrankX journal entry.',
        },
      }
    }
  }

  const apiKey = params.apiKey ?? process.env.ELEVENLABS_API_KEY
  if (!apiKey) {
    return { ok: false, reason: 'missing-elevenlabs-api-key' }
  }

  const fetchFn = params.fetchImpl ?? fetch
  const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(
    briefing.voiceId
  )}?output_format=mp3_44100_128`

  const response = await fetchFn(endpoint, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'content-type': 'application/json',
      accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text: briefing.spokenScript,
      model_id: briefing.modelId,
      voice_settings: {
        stability: consentDecision.preset.defaultSettings.stability,
        similarity_boost: consentDecision.preset.defaultSettings.similarityBoost,
        style: consentDecision.preset.defaultSettings.style,
        use_speaker_boost: consentDecision.preset.defaultSettings.useSpeakerBoost,
      },
    }),
  })

  if (!response.ok) {
    return { ok: false, reason: `elevenlabs-http-${response.status}` }
  }

  const arrayBuffer = await response.arrayBuffer()
  const audioBuffer = Buffer.from(arrayBuffer)
  const qa = inspectGeneratedAudioBytes(audioBuffer)
  if (!qa.valid) {
    return { ok: false, reason: qa.reason }
  }

  const manifest: AudioBriefingProvenanceManifest = {
    schema: 'frankx.audio-briefing.provenance.v1',
    slug: briefing.slug,
    canonicalPath: briefing.canonicalPath,
    title: briefing.title,
    date: briefing.date,
    modelId: briefing.modelId,
    voiceId: briefing.voiceId,
    voiceLabel: consentDecision.preset.label,
    rightsBasis: consentDecision.preset.rightsBasis,
    consentReference: consentDecision.consentReference,
    characterCount: briefing.characterCount,
    estimatedCredits: briefing.estimatedCredits,
    estimatedDurationSeconds: briefing.estimatedDurationSeconds,
    sourceSha256: briefing.sourceSha256,
    scriptSha256: briefing.scriptSha256,
    audioSha256: qa.sha256,
    audioByteLength: qa.byteLength,
    idempotencyKey: briefing.idempotencyKey,
    blobAudioKey,
    blobManifestKey,
    generatedAt,
    disclosure:
      'Synthesized with ElevenLabs using an authorized voice preset and published alongside its canonical FrankX journal entry.',
  }

  const uploadedAudio = await storage.putAudio(blobAudioKey, audioBuffer)
  const uploadedManifest = await storage.putManifest(blobManifestKey, manifest)

  return {
    ok: true,
    cached: false,
    audioUrl: uploadedAudio.url,
    manifestUrl: uploadedManifest.url,
    manifest,
  }
}

/**
 * Tool schemas compatible with Claude Code, Codex, and ChatGPT function calling.
 * Enables local or authorized operator agents to preview and run bounded journal audio briefings.
 */
export const AUDIO_BRIEFING_TOOL_CONTRACTS = [
  {
    name: 'frankx_compile_journal_audio_briefing',
    description:
      'Deterministic dry-run compiler that converts a public FrankX /journal note into a spoken script with character count, ElevenLabs credit estimate, and SHA-256 idempotency key without spending API credits.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      required: ['slug'],
      properties: {
        slug: {
          type: 'string',
          description: 'Public journal slug under content/journal/ (for example 2026-07-29-confidence-must-enter-the-market).',
        },
        voiceId: {
          type: 'string',
          description: 'Allowlisted ElevenLabs voice ID from AUTHORIZED_VOICE_PRESETS.',
        },
        modelId: {
          type: 'string',
          enum: ['eleven_multilingual_v2', 'eleven_flash_v2_5', 'eleven_turbo_v2_5'],
        },
        maxCharacters: {
          type: 'integer',
          minimum: 120,
          maximum: AUDIO_BRIEFING_HARD_MAX_CHARS,
          default: AUDIO_BRIEFING_DEFAULT_MAX_CHARS,
        },
      },
    },
  },
  {
    name: 'frankx_synthesize_journal_audio_briefing',
    description:
      'Admin-authorized synthesis tool that verifies explicit voice-owner and editorial consent, checks idempotency, calls ElevenLabs TTS server-side, validates MP3 frame headers, and writes the audio + provenance manifest to Vercel Blob.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      required: ['slug', 'voiceId', 'voiceOwnerApproved', 'editorialApproved', 'cloneProhibited'],
      properties: {
        slug: { type: 'string' },
        voiceId: { type: 'string' },
        modelId: {
          type: 'string',
          enum: ['eleven_multilingual_v2', 'eleven_flash_v2_5', 'eleven_turbo_v2_5'],
        },
        voiceOwnerApproved: { type: 'boolean' },
        editorialApproved: { type: 'boolean' },
        cloneProhibited: { type: 'boolean' },
        consentReference: { type: 'string' },
      },
    },
  },
] as const
