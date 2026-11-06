'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  AudioWaveform,
  Bot,
  Check,
  Coins,
  Copy,
  Download,
  ExternalLink,
  FileCode2,
  ShieldCheck,
  AlertTriangle,
  Sliders,
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export type ElevenLabsWorkflowKey =
  | 'journal-briefing'
  | 'voice-consent'
  | 'model-routing'
  | 'agent-mcp'
  | 'loudness-qa'
  | 'partner-terms'

interface ElevenLabsWorkflowDef {
  key: ElevenLabsWorkflowKey
  title: string
  shortLabel: string
  badge: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  inputSpec: string
  executionSteps: string[]
  acceptanceCheck: string
  stopRule: string
  route: string
  codeSnippet: string
}

const WORKFLOWS: ElevenLabsWorkflowDef[] = [
  {
    key: 'journal-briefing',
    title: 'Founder Journal to Audio Briefing',
    shortLabel: 'Journal Briefing',
    badge: 'Reference Slice',
    description:
      'Compile a public /journal markdown note into a 90-second spoken executive briefing with SHA-256 idempotency and provenance.',
    icon: AudioWaveform,
    inputSpec:
      'Public journal entry (visibility: public, published: true) capped at 2,800 characters (~2.5 spoken minutes).',
    executionSteps: [
      'Step 01: Read public /journal slug and strip markdown syntax into spoken prose with deliberate pause cues.',
      'Step 02: Compute deterministic SHA-256 idempotencyKey from (slug + scriptSha256 + voiceId + modelId).',
      'Step 03: Synthesize MP3 via server-side ElevenLabs endpoint, inspect ID3/MPEG frame sync, and write audio + JSON receipt.',
    ],
    acceptanceCheck:
      'Audio payload passes MP3 header inspection (>= 512 bytes), matches spoken script hash, and stores a JSON provenance manifest.',
    stopRule:
      'Halt immediately if the journal entry is private/unpublished, if character count exceeds ceiling, or if MP3 byte QA fails.',
    route: 'POST /api/voice/audio-briefing (server-side)',
    codeSnippet: `curl -sS "https://www.frankx.ai/api/voice/audio-briefing?slug=2026-07-29-confidence-must-enter-the-market&modelId=eleven_multilingual_v2" | jq '.briefing | {slug, characterCount, estimatedCredits, idempotencyKey}'`,
  },
  {
    key: 'voice-consent',
    title: 'Consent & Voice Rights Guard',
    shortLabel: 'Consent Guard',
    badge: 'Rights & Policy',
    description:
      'Enforce explicit voice-owner consent, editorial sign-off, and allowlisted Voice IDs before any synthesis call leaves the server.',
    icon: ShieldCheck,
    inputSpec:
      'VoiceBriefingConsent payload requiring voiceOwnerApproved: true, editorialApproved: true, cloneProhibited: true.',
    executionSteps: [
      'Step 01: Verify voiceId belongs to AUTHORIZED_VOICE_PRESETS (licensed studio library or documented owner consent).',
      'Step 02: Confirm voiceOwnerApproved, editorialApproved, and cloneProhibited flags are all true.',
      'Step 03: Stamp consentReference into the immutable AudioBriefingProvenanceManifest alongside the MP3.',
    ],
    acceptanceCheck:
      'Every synthesized audio file carries a verifiable consentReference and rightsBasis in its companion .json manifest.',
    stopRule:
      'Reject any request attempting unconsented third-party voice cloning or using an unverified Voice ID.',
    route: 'validateVoiceBriefingConsent() in lib/voice/audio-briefing.ts',
    codeSnippet: `{
  "slug": "2026-07-29-confidence-must-enter-the-market",
  "mode": "dry-run",
  "voiceId": "JBFqnCBsd6RMkjVDRZzb",
  "voiceOwnerApproved": true,
  "editorialApproved": true,
  "cloneProhibited": true
}`,
  },
  {
    key: 'model-routing',
    title: 'Model & Credit Routing Matrix',
    shortLabel: 'Model Routing',
    badge: 'Latency vs Cost',
    description:
      'Route narration jobs between Multilingual v2 (studio quality), Turbo v2.5 (half-credit batch), and Flash v2.5 (~75ms live agents).',
    icon: Sliders,
    inputSpec:
      'Target latency budget (realtime <100ms vs asynchronous batch) and monthly character credit allocation.',
    executionSteps: [
      'Rule 01: Use eleven_multilingual_v2 (1 credit/char) for flagship essays, book excerpts, and nuanced emotional delivery.',
      'Rule 02: Use eleven_turbo_v2_5 (0.5 credits/char) for daily journal briefings and high-volume review drafts.',
      'Rule 03: Use eleven_flash_v2_5 (0.5 credits/char, ~75ms model latency) when wiring interactive WebSocket voice turns.',
    ],
    acceptanceCheck:
      'Selected model stays within the per-briefing credit ceiling (default 3,000 credits) with Stability between 0.50 and 0.65.',
    stopRule:
      'Do not run whole-chapter scripts in a single unchunked request; split at 800–2,800 characters to prevent cadence drift.',
    route: 'ElevenLabs v1/text-to-speech/{voice_id}?output_format=mp3_44100_128',
    codeSnippet: `// Credit math:
// eleven_multilingual_v2 -> 1.0 credit / char (~1,000 credits per spoken minute)
// eleven_turbo_v2_5      -> 0.5 credits / char (~500 credits per spoken minute)
// eleven_flash_v2_5      -> 0.5 credits / char (~75ms model latency)`,
  },
  {
    key: 'agent-mcp',
    title: 'Claude Code & Codex Tool Contract',
    shortLabel: 'Agent / MCP',
    badge: 'Operator Automation',
    description:
      'Expose deterministic dry-run compilation and consent-gated synthesis to Claude Code, Codex, and ChatGPT tool runners.',
    icon: Bot,
    inputSpec:
      'AUDIO_BRIEFING_TOOL_CONTRACTS JSON schema for frankx_compile_journal_audio_briefing and frankx_synthesize_journal_audio_briefing.',
    executionSteps: [
      'Step 01: Agent invokes frankx_compile_journal_audio_briefing (dry-run) to inspect spoken script and credit cost.',
      'Step 02: Operator reviews character count, pronunciation cues, and idempotencyKey.',
      'Step 03: Authorized runner invokes frankx_synthesize_journal_audio_briefing with x-admin-secret and server-side ELEVENLABS_API_KEY.',
    ],
    acceptanceCheck:
      'Dry-run completes with zero API spend; synthesis runs only after explicit operator approval and admin header verification.',
    stopRule:
      'Never expose ELEVENLABS_API_KEY to browser clients or allow anonymous public callers to trigger paid synthesis.',
    route: 'AUDIO_BRIEFING_TOOL_CONTRACTS in lib/voice/audio-briefing.ts',
    codeSnippet: `// Tool names exposed for local agent orchestration:
// 1. frankx_compile_journal_audio_briefing (zero-cost deterministic preview)
// 2. frankx_synthesize_journal_audio_briefing (admin-gated server synthesis)`,
  },
  {
    key: 'loudness-qa',
    title: 'FFmpeg Loudness & Byte QA Chain',
    shortLabel: 'Loudness QA',
    badge: '-14 LUFS Master',
    description:
      'Verify MP3 header bytes and normalize raw TTS output to -14 LUFS with an 80Hz high-pass filter before publishing.',
    icon: FileCode2,
    inputSpec:
      'Raw MP3 buffer from ElevenLabs (44.1 kHz, 128–192 kbps) inspected by inspectGeneratedAudioBytes().',
    executionSteps: [
      'Step 01: Check byte length (>= 512 bytes) and verify ID3 (0x49 0x44 0x33) or MPEG frame sync (0xFF 0xE0) signature.',
      'Step 02: Apply 80Hz high-pass filter and 3:1 gentle compression to tame sibilance and plosives.',
      'Step 03: Normalize integrated loudness to -14 LUFS (-1.5 dBTP true peak) for consistent mobile and desktop playback.',
    ],
    acceptanceCheck:
      'Mastered audio plays cleanly on phone speakers without clipping, HTML/JSON error payloads, or sudden volume jumps.',
    stopRule:
      'Discard take immediately if two consecutive renders mispronounce proper nouns; add phonetic spelling or SSML break tags first.',
    route: 'inspectGeneratedAudioBytes() + ffmpeg loudnorm chain',
    codeSnippet: `ffmpeg -i raw-briefing.mp3 \\
  -af "highpass=f=80,acompressor=threshold=-18dB:ratio=3:attack=15:release=180,loudnorm=I=-14:TP=-1.5:LRA=9" \\
  -ar 44100 -b:a 128k briefing-master.mp3`,
  },
  {
    key: 'partner-terms',
    title: 'Verified Partner Economics & Disclosure',
    shortLabel: 'Partner Terms',
    badge: 'Verified 2026-11-05',
    description:
      'Inspect the verified PartnerStack commercial terms, plan-tier boundaries, and 45-day freshness fallback rules.',
    icon: Coins,
    inputSpec:
      'Canonical registry record in data/affiliate/programs.json (id: elevenlabs, network: PartnerStack, verifiedOn: 2026-11-05).',
    executionSteps: [
      'Term 01: 22% recurring commission for 12 months on Starter ($5/mo), Creator ($22/mo), Pro ($99/mo), and Scale ($330/mo).',
      'Term 02: 11% recurring commission for 12 months on Business ($1,320/mo); Enterprise plans are excluded.',
      'Term 03: 90-day attribution window via /go/elevenlabs; automatically falls back to https://elevenlabs.io if verification exceeds 45 days.',
    ],
    acceptanceCheck:
      'Every sponsored CTA renders explicit affiliate disclosure beside the control and uses /go/elevenlabs with rel="sponsored noopener".',
    stopRule:
      'Never publish unverified custom vanity links or unsubstantiated discount claims; keep unconfirmed URLs in candidateUrls only.',
    route: '/go/elevenlabs -> https://try.elevenlabs.io/uc8prmq6tiyt',
    codeSnippet: `{
  "id": "elevenlabs",
  "hopRoute": "/go/elevenlabs",
  "commission": "22% Starter/Creator/Pro/Scale (11% Business) for 12 months",
  "enterpriseIncluded": false,
  "cookieDays": 90
}`,
  },
]

export default function ElevenLabsAudioBriefingWorkbench() {
  const [selectedKey, setSelectedKey] = useState<ElevenLabsWorkflowKey>('journal-briefing')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    trackEvent('partner_resource_viewed', {
      partner: 'elevenlabs',
      surface: 'audio_briefing_workbench',
    })
  }, [])

  const wf = WORKFLOWS.find((w) => w.key === selectedKey) || WORKFLOWS[0]
  const Icon = wf.icon

  const briefText = `ELEVENLABS VOICE ARCHITECTURE BRIEF — ${wf.title.toUpperCase()}
Workflow: ${wf.title} (${wf.badge}) | Route: ${wf.route}
1. INPUT & SCOPE: ${wf.inputSpec}
2. EXECUTION SEQUENCE:
${wf.executionSteps.map((s) => `  - ${s}`).join('\n')}
3. ACCEPTANCE CHECK: ${wf.acceptanceCheck}
4. STOP RULE: ${wf.stopRule}
5. COMMAND / PAYLOAD:
${wf.codeSnippet}
Prepared with FrankX ElevenLabs Voice Architecture Workbench (frankx.ai/guides/elevenlabs-voice-guide)`.trim()

  const handleSelectTab = (key: ElevenLabsWorkflowKey) => {
    setSelectedKey(key)
    trackEvent('partner_workbench_tab_selected', {
      partner: 'elevenlabs',
      tab: key,
    })
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(briefText)
      setCopied(true)
      trackEvent('audio_briefing_workbench_copied', {
        partner: 'elevenlabs',
        tab: wf.key,
      })
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  const handlePartnerClick = () => {
    trackEvent('partner_resource_clicked', {
      partner: 'elevenlabs',
      surface: 'audio_briefing_workbench',
      action: 'open_partner_hop',
    })
  }

  return (
    <section
      id="audio-briefing-workbench"
      aria-labelledby="elevenlabs-wb-title"
      className="my-10 scroll-mt-28 rounded-2xl border border-white/10 bg-[#0d1117] p-5 sm:p-6 text-white shadow-2xl"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between border-b border-white/10 pb-5">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Voice Architecture &amp; Briefing Workbench
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-white/70">
              Verified Partner Resource · 2026-11-05
            </span>
          </div>
          <h2 id="elevenlabs-wb-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            ElevenLabs Journal-to-Audio Briefing Workbench
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-white/70 leading-relaxed">
            Inspect the deterministic script compiler, voice-owner consent guard, model credit routing, and FFmpeg loudness spec before spending API credits.
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-start md:items-end">
          <Link
            href="/go/elevenlabs"
            prefetch={false}
            target="_blank"
            rel="sponsored noopener"
            onClick={handlePartnerClick}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Try ElevenLabs (Affiliate Partner Link)"
          >
            <span>Try ElevenLabs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <p className="mt-1.5 max-w-[260px] text-[11px] leading-snug text-white/60 md:text-right">
            Affiliate link (`/go/elevenlabs`): FrankX may earn a 22% PartnerStack commission (11% Business) for 12 months at no extra cost to you.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <label
          id="elevenlabs-wf-selector-label"
          className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2"
        >
          Select Architecture Stage:
        </label>
        <div
          role="tablist"
          aria-labelledby="elevenlabs-wf-selector-label"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2"
        >
          {WORKFLOWS.map((w) => {
            const isSelected = w.key === selectedKey
            const WIcon = w.icon
            return (
              <button
                key={w.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`elevenlabs-panel-${w.key}`}
                id={`elevenlabs-tab-${w.key}`}
                onClick={() => handleSelectTab(w.key)}
                className={`flex min-h-[44px] items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isSelected
                    ? 'border-emerald-500/60 bg-emerald-500/15 text-white font-semibold'
                    : 'border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <WIcon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-white/50'}`} />
                <span className="truncate">{w.shortLabel}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div
        id={`elevenlabs-panel-${wf.key}`}
        role="tabpanel"
        aria-labelledby={`elevenlabs-tab-${wf.key}`}
        className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-white">{wf.title}</h3>
                <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                  {wf.badge}
                </span>
              </div>
              <p className="text-xs text-white/65 mt-0.5">{wf.description}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Copy voice architecture brief to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Spec Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-white/70" />
                <span>Copy Spec</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs leading-relaxed text-white/80">
          <div>
            <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">
              Input Contract &amp; Boundary:
            </span>
            <p className="mt-1 rounded-lg border border-white/5 bg-[#090d13] p-2.5 text-white/90 font-mono break-words">
              {wf.inputSpec}
            </p>
          </div>
          <div>
            <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">
              Execution Steps:
            </span>
            <ul className="mt-1 space-y-1">
              {wf.executionSteps.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 rounded-lg border border-white/5 bg-[#090d13] p-2 text-white/85"
                >
                  <span className="text-emerald-400 font-mono font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">
              Command / Payload Preview:
            </span>
            <pre className="mt-1 overflow-x-auto rounded-lg border border-white/5 bg-[#090d13] p-3 text-[11px] leading-relaxed text-emerald-200/90 font-mono">
              <code>{wf.codeSnippet}</code>
            </pre>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-3">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Acceptance Criterion</span>
              </div>
              <p className="mt-1 text-white/80">{wf.acceptanceCheck}</p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-3">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px] uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Stop Rule</span>
              </div>
              <p className="mt-1 text-white/80">{wf.stopRule}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/60">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-semibold text-white/80">Worksheets &amp; Live Dry-Run:</span>
          <a
            href="/downloads/elevenlabs-audio-briefing-spec.md"
            download
            className="inline-flex min-h-[36px] items-center gap-1 text-emerald-400 hover:text-emerald-300 underline focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
          >
            <Download className="w-3 h-3" />
            <span>Briefing Spec (.md)</span>
          </a>
          <a
            href="/downloads/elevenlabs-voice-qa-ledger.csv"
            download
            className="inline-flex min-h-[36px] items-center gap-1 text-emerald-400 hover:text-emerald-300 underline focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
          >
            <Download className="w-3 h-3" />
            <span>Voice QA Ledger (.csv)</span>
          </a>
          <a
            href="/api/voice/audio-briefing?slug=2026-07-29-confidence-must-enter-the-market"
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-[36px] items-center gap-1 text-cyan-300 hover:text-cyan-200 underline focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
          >
            <FileCode2 className="w-3 h-3" />
            <span>Inspect Live Dry-Run JSON</span>
          </a>
        </div>
        <div className="text-white/50 text-[11px]">
          Surface: <code className="text-emerald-300/90">{wf.route}</code>
        </div>
      </div>
    </section>
  )
}
