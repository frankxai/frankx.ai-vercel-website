import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { getJournalEntries, getJournalEntry } from '@/lib/journal'
import {
  AUDIO_BRIEFING_DEFAULT_MAX_CHARS,
  AUDIO_BRIEFING_TOOL_CONTRACTS,
  AUTHORIZED_VOICE_PRESETS,
  compileJournalToAudioBriefing,
  synthesizeJournalAudioBriefing,
  validateVoiceBriefingConsent,
  type ElevenLabsBriefingModelId,
} from '@/lib/voice/audio-briefing'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const NO_STORE_HEADERS = {
  'Cache-Control': 'private, no-store',
}

function resolveDefaultPublicEntry(slugParam?: string | null) {
  if (slugParam) {
    return getJournalEntry(slugParam)
  }
  const all = getJournalEntries()
  return all[0] ?? null
}

/**
 * GET /api/voice/audio-briefing?slug=<journal-slug>&modelId=<model>&voiceId=<voice>
 *
 * Public read-only dry-run endpoint. Compiles an approved public `/journal` note
 * into a bounded spoken script, calculates character and credit estimates, and returns
 * the deterministic SHA-256 idempotency key + tool contracts without calling ElevenLabs.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const voiceId = searchParams.get('voiceId') ?? AUTHORIZED_VOICE_PRESETS[0].voiceId
  const modelIdParam = searchParams.get('modelId') as ElevenLabsBriefingModelId | null
  const maxCharsParam = searchParams.get('maxCharacters')

  const entry = resolveDefaultPublicEntry(slug)
  if (!entry) {
    return NextResponse.json(
      { error: 'Public journal entry not found.' },
      { status: 404, headers: NO_STORE_HEADERS }
    )
  }

  const maxCharacters = maxCharsParam ? Number.parseInt(maxCharsParam, 10) : AUDIO_BRIEFING_DEFAULT_MAX_CHARS
  const compiled = compileJournalToAudioBriefing(entry, {
    voiceId,
    modelId: modelIdParam ?? undefined,
    maxCharacters: Number.isNaN(maxCharacters) ? AUDIO_BRIEFING_DEFAULT_MAX_CHARS : maxCharacters,
  })

  if (!compiled.ok) {
    return NextResponse.json(
      { error: compiled.reason },
      { status: 400, headers: NO_STORE_HEADERS }
    )
  }

  return NextResponse.json(
    {
      mode: 'dry-run',
      briefing: compiled.briefing,
      authorizedVoices: AUTHORIZED_VOICE_PRESETS,
      toolContracts: AUDIO_BRIEFING_TOOL_CONTRACTS,
      availableJournalEntries: getJournalEntries()
        .slice(0, 6)
        .map((item) => ({
          slug: item.slug,
          title: item.title,
          date: item.date,
          summary: item.summary,
        })),
    },
    { status: 200, headers: NO_STORE_HEADERS }
  )
}

/**
 * POST /api/voice/audio-briefing
 *
 * - `mode: "dry-run"` (default): validates consent + compiles spoken script + returns deterministic receipt preview.
 * - `mode: "synthesize"`: requires `x-admin-secret` header via `requireAdmin(request)` before invoking
 *   ElevenLabs TTS server-side (`process.env.ELEVENLABS_API_KEY`) and persisting to Vercel Blob.
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON request body.' },
      { status: 400, headers: NO_STORE_HEADERS }
    )
  }

  const mode = body.mode === 'synthesize' ? 'synthesize' : 'dry-run'
  const slug = typeof body.slug === 'string' ? body.slug : undefined
  const entry = resolveDefaultPublicEntry(slug)

  if (!entry) {
    return NextResponse.json(
      { error: 'Public journal entry not found.' },
      { status: 404, headers: NO_STORE_HEADERS }
    )
  }

  const consentInput = {
    voiceId:
      typeof body.voiceId === 'string'
        ? body.voiceId
        : AUTHORIZED_VOICE_PRESETS[0].voiceId,
    voiceOwnerApproved: body.voiceOwnerApproved === true,
    editorialApproved: body.editorialApproved === true,
    cloneProhibited: body.cloneProhibited === true,
    consentReference:
      typeof body.consentReference === 'string' ? body.consentReference : undefined,
  }

  const modelId =
    body.modelId === 'eleven_multilingual_v2' ||
    body.modelId === 'eleven_flash_v2_5' ||
    body.modelId === 'eleven_turbo_v2_5'
      ? body.modelId
      : undefined

  const maxCharacters =
    typeof body.maxCharacters === 'number'
      ? body.maxCharacters
      : AUDIO_BRIEFING_DEFAULT_MAX_CHARS

  if (mode === 'dry-run') {
    const consent = validateVoiceBriefingConsent(consentInput)
    if (!consent.allowed) {
      return NextResponse.json(
        { ok: false, error: consent.reason },
        { status: 422, headers: NO_STORE_HEADERS }
      )
    }

    const compiled = compileJournalToAudioBriefing(entry, {
      voiceId: consent.preset.voiceId,
      modelId: modelId ?? consent.preset.recommendedModel,
      maxCharacters,
    })

    if (!compiled.ok) {
      return NextResponse.json(
        { ok: false, error: compiled.reason },
        { status: 400, headers: NO_STORE_HEADERS }
      )
    }

    return NextResponse.json(
      {
        ok: true,
        mode: 'dry-run',
        consentReference: consent.consentReference,
        voicePreset: consent.preset,
        briefing: compiled.briefing,
      },
      { status: 200, headers: NO_STORE_HEADERS }
    )
  }

  // Synthesize mode is strictly admin-gated so public visitors cannot trigger paid API calls.
  const denied = requireAdmin(request)
  if (denied) {
    return denied
  }

  const result = await synthesizeJournalAudioBriefing({
    entry,
    consent: consentInput,
    modelId,
    maxCharacters,
  })

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.reason },
      { status: 422, headers: NO_STORE_HEADERS }
    )
  }

  return NextResponse.json(result, { status: 200, headers: NO_STORE_HEADERS })
}
