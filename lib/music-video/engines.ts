import type { Engine, EngineId } from './types'

// Rate card verified 2026-06-03 against vendor docs + live Higgsfield MCP.
// Higgsfield credit value: Plus $49/1000cr = $0.049/cr · Ultra $129/3000cr = $0.043/cr.
// We price Higgsfield-routed gens at the Plus rate (the default posture).
export const HIGGSFIELD_USD_PER_CREDIT = 0.049

// Official per-second / per-image rates are firm (vendor pricing pages).
// Credit-based engines (Kling, Seedance via Higgsfield) are derived; ±30% by tier.
export const engines: Engine[] = [
  // ── L1 KEYFRAME (image) ────────────────────────────────────────────────
  {
    id: 'nano-banana',
    label: 'Nano Banana (Gemini 2.5 Flash Image)',
    layer: 'keyframe',
    vendor: 'Google',
    route: ['gemini-api', 'fal', 'higgsfield'],
    defaultRoute: 'gemini-api',
    nativeAudio: false,
    maxClipSec: null,
    rate: { perImageUsd: { standard: 0.039 } },
    bestForStyles: ['character', 'anime', 'abstract'],
    notes: 'Volume keyframes. ~3.4x cheaper than Pro. Strong identity consistency across edits.',
  },
  {
    id: 'nano-banana-pro',
    label: 'Nano Banana Pro (Gemini 3 Pro Image)',
    layer: 'keyframe',
    vendor: 'Google',
    route: ['gemini-api', 'fal', 'higgsfield'],
    defaultRoute: 'gemini-api',
    nativeAudio: false,
    maxClipSec: null,
    rate: { perImageUsd: { standard: 0.134, '4k': 0.24 } },
    bestForStyles: ['cinematic', 'character', 'lyric'],
    notes: 'Hero stills, 4K, legible in-image text. Art-director reasoning before render. Use for identity-lock + title cards.',
  },
  {
    id: 'higgsfield-soul-id',
    label: 'Higgsfield Soul ID (character lock)',
    layer: 'keyframe',
    vendor: 'Higgsfield',
    route: ['higgsfield'],
    defaultRoute: 'higgsfield',
    nativeAudio: false,
    maxClipSec: null,
    rate: { flatUsd: 2.5, higgsfieldCredits: 40 },
    bestForStyles: ['character', 'cinematic', 'anime'],
    notes: 'One-time per character (~40 cr). Locks the same face across every future image + video gen. The reason to use Higgsfield for recurring-artist videos.',
  },

  // ── L2 MOTION (video) ──────────────────────────────────────────────────
  {
    id: 'veo-3.1-standard',
    label: 'Veo 3.1 Standard',
    layer: 'motion',
    vendor: 'Google',
    route: ['gemini-api', 'fal', 'higgsfield'],
    defaultRoute: 'gemini-api',
    nativeAudio: true,
    maxClipSec: 8,
    rate: { perSecondUsd: { '720p': 0.4, '1080p': 0.4, '4k': 0.6 }, higgsfieldCredits: 60 },
    bestForStyles: ['cinematic', 'character'],
    notes: 'Native synced audio in one pass — the differentiator. Reserve for the 2-3 hero shots that carry the video.',
  },
  {
    id: 'veo-3.1-fast',
    label: 'Veo 3.1 Fast',
    layer: 'motion',
    vendor: 'Google',
    route: ['gemini-api', 'fal'],
    defaultRoute: 'gemini-api',
    nativeAudio: true,
    maxClipSec: 8,
    rate: { perSecondUsd: { '720p': 0.1, '1080p': 0.12, '4k': 0.3 } },
    bestForStyles: ['cinematic', 'abstract'],
    notes: 'Cheap realistic motion, scriptable via Gemini API. Good body-of-video engine when not on a Higgsfield plan.',
  },
  {
    id: 'kling-3.0',
    label: 'Kling 3.0',
    layer: 'motion',
    vendor: 'Kuaishou',
    route: ['higgsfield', 'fal'],
    defaultRoute: 'higgsfield',
    nativeAudio: true,
    maxClipSec: 10,
    rate: { perSecondUsd: { '720p': 0.07, '1080p': 0.1 }, higgsfieldCredits: 5 },
    bestForStyles: ['character', 'anime', 'cinematic'],
    notes: 'Best character consistency (4 ref images). The default workhorse — ~5 cr/clip via Higgsfield Plus. Recurring artist across 12 shots.',
  },
  {
    id: 'runway-gen-4.5',
    label: 'Runway Gen-4.5',
    layer: 'motion',
    vendor: 'Runway',
    route: ['fal', 'higgsfield'],
    defaultRoute: 'fal',
    nativeAudio: false,
    maxClipSec: 10,
    rate: { perSecondUsd: { '720p': 0.12, '1080p': 0.12 }, higgsfieldCredits: 50 },
    bestForStyles: ['cinematic', 'abstract'],
    notes: 'Best director control — references, motion brush, Aleph restyle. When you iterate shot-by-shot like an editor.',
  },
  {
    id: 'luma-ray3',
    label: 'Luma Ray3',
    layer: 'motion',
    vendor: 'Luma',
    route: ['fal', 'higgsfield'],
    defaultRoute: 'fal',
    nativeAudio: false,
    maxClipSec: 10,
    rate: { perSecondUsd: { '1080p': 0.1 }, higgsfieldCredits: 30 },
    bestForStyles: ['abstract'],
    notes: 'Fast, fluid, dreamy motion. Best abstract/visualizer b-roll engine.',
  },
  {
    id: 'seedance-2.0',
    label: 'Seedance 2.0',
    layer: 'motion',
    vendor: 'ByteDance',
    route: ['higgsfield', 'fal'],
    defaultRoute: 'higgsfield',
    nativeAudio: false,
    maxClipSec: 10,
    rate: { perSecondUsd: { '1080p': 0.06 }, higgsfieldCredits: 25 },
    bestForStyles: ['anime', 'character', 'abstract'],
    notes: 'Near one-shot multi-shot beat-synced sequences with character carry-forward. Cheap stylized motion.',
  },

  // ── L3 ASSEMBLY (compositor — $0 marginal, local) ──────────────────────
  {
    id: 'hyperframes',
    label: 'HyperFrames',
    layer: 'assembly',
    vendor: 'HeyGen (open source)',
    route: ['local'],
    defaultRoute: 'local',
    nativeAudio: false,
    maxClipSec: null,
    rate: {},
    bestForStyles: ['lyric', 'cinematic', 'character', 'anime', 'abstract'],
    notes: 'HTML compositor. Beat-sync cuts, lyric captions, audio-reactive overlays, transitions, 6-format export. The default assembly engine — local, deterministic, $0/render.',
  },
  {
    id: 'remotion',
    label: 'Remotion',
    layer: 'assembly',
    vendor: 'Remotion',
    route: ['local'],
    defaultRoute: 'local',
    nativeAudio: false,
    maxClipSec: null,
    rate: {},
    bestForStyles: ['lyric', 'abstract'],
    notes: 'React compositor — equivalent fallback to HyperFrames. Use for programmatic batch over the whole catalog.',
  },
  {
    id: 'ffmpeg',
    label: 'FFmpeg',
    layer: 'assembly',
    vendor: 'FFmpeg',
    route: ['local'],
    defaultRoute: 'local',
    nativeAudio: false,
    maxClipSec: null,
    rate: {},
    bestForStyles: ['cinematic', 'character', 'anime', 'abstract'],
    notes: 'Straight concat / crossfade / caption burn-in / reframe + final encode. The export backbone behind every format derive.',
  },
]

const engineMap = new Map(engines.map((e) => [e.id, e]))

export function getEngine(id: EngineId): Engine {
  const e = engineMap.get(id)
  if (!e) throw new Error(`Unknown engine: ${id}`)
  return e
}

// Cost of one motion second on an engine, USD. Prefers the Higgsfield credit
// rate when the engine routes via Higgsfield (the default budget posture),
// else the per-second API rate.
export function motionSecondUsd(
  id: EngineId,
  resolution: '720p' | '1080p' | '4k',
  preferHiggsfield = true,
): number {
  const e = getEngine(id)
  if (preferHiggsfield && e.defaultRoute === 'higgsfield' && e.rate.higgsfieldCredits) {
    // credits are per-clip (~ up to maxClip seconds); amortize across an 8s clip
    const clipSec = Math.min(e.maxClipSec ?? 8, 8)
    return (e.rate.higgsfieldCredits * HIGGSFIELD_USD_PER_CREDIT) / clipSec
  }
  const perSec = e.rate.perSecondUsd
  return perSec?.[resolution] ?? perSec?.['1080p'] ?? perSec?.['720p'] ?? 0
}

export function imageUsd(id: EngineId, tier: 'standard' | '4k' = 'standard'): number {
  const e = getEngine(id)
  return e.rate.perImageUsd?.[tier] ?? e.rate.perImageUsd?.standard ?? e.rate.flatUsd ?? 0
}
