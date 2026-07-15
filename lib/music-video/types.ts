// Music Intelligence System — type contract.
// Source-of-truth for the cost estimator, pre-flight gate, /studio/music cockpit,
// the music-video-producer skill, and the /music-video command family.
//
// The system is a 3-layer stack:
//   L1 KEYFRAMES (image) → L2 MOTION (video) → L3 ASSEMBLY (compositor)
// Each layer maps to one or more Engines below. A music video is a ShotPlan
// (timed against the track's beat/section map) rendered to one or more Formats.

export type StackLayer = 'keyframe' | 'motion' | 'assembly'

// ──────────────────────────────────────────────────────────────────────────
// ENGINES — the generators + compositors. Rate card in engines.ts.
// ──────────────────────────────────────────────────────────────────────────

export type EngineId =
  // L1 keyframe (image)
  | 'nano-banana'        // Gemini 2.5 Flash Image — volume keyframes
  | 'nano-banana-pro'    // Gemini 3 Pro Image — hero stills, 4K, legible text
  | 'higgsfield-soul-id' // character identity lock (one-time per character)
  // L2 motion (video)
  | 'veo-3.1-standard'   // native audio, hero realism
  | 'veo-3.1-fast'       // cheap realistic motion
  | 'kling-3.0'          // character consistency workhorse (via Higgsfield)
  | 'runway-gen-4.5'     // editorial / restyle control
  | 'luma-ray3'          // abstract / dreamy motion
  | 'seedance-2.0'       // multi-shot beat-synced (via Higgsfield)
  // L3 assembly (compositor — local, $0 marginal)
  | 'hyperframes'        // HTML compositor — captions, transitions, beat-sync
  | 'remotion'           // React compositor — equivalent fallback
  | 'ffmpeg'             // straight concat / encode / reframe

export type AccessRoute = 'higgsfield' | 'gemini-api' | 'fal' | 'local'

export interface EngineRate {
  // per-second video cost in USD, keyed by resolution tier (motion engines)
  perSecondUsd?: Partial<Record<'720p' | '1080p' | '4k', number>>
  // per-image cost in USD (keyframe engines)
  perImageUsd?: Partial<Record<'standard' | '4k', number>>
  // one-time flat cost in USD (e.g. Soul ID character)
  flatUsd?: number
  // Higgsfield credit cost per gen (when routed via higgsfield)
  higgsfieldCredits?: number
}

export interface Engine {
  id: EngineId
  label: string
  layer: StackLayer
  vendor: string
  route: AccessRoute[]
  defaultRoute: AccessRoute
  nativeAudio: boolean
  maxClipSec: number | null // null = N/A (image / compositor)
  rate: EngineRate
  bestForStyles: StyleId[]
  notes: string
}

// ──────────────────────────────────────────────────────────────────────────
// STYLES — the 5 visual lanes. Each routes to a default motion engine.
// ──────────────────────────────────────────────────────────────────────────

export type StyleId =
  | 'cinematic'   // realistic cinematic — Veo 3.1 Standard
  | 'character'   // recurring-artist narrative — Kling 3.0 + Soul ID
  | 'anime'       // animated / stylized — Kling/Seedance stylized
  | 'abstract'    // visualizer / dreamscape — Luma Ray3 / WebGL
  | 'lyric'       // typography-driven — HyperFrames only (no gen)

export interface MusicVideoStyle {
  id: StyleId
  label: string
  description: string
  keyframeEngine: EngineId        // L1
  motionEngine: EngineId | null   // L2 — null for pure-compositor lyric lane
  heroEngine: EngineId | null     // upgrade engine for 2-3 hero shots
  assemblyEngine: EngineId        // L3
  emotionalArc: string            // the storytelling spine this lane is built around
  hookDoctrine: string            // visual + motion hook in first 2 seconds
}

// ──────────────────────────────────────────────────────────────────────────
// FORMATS — the 6 platform deliverables. One 16:9 master → all six.
// ──────────────────────────────────────────────────────────────────────────

export type FormatId =
  | 'youtube-full'    // 16:9 4K master
  | 'short'           // 9:16 YouTube Shorts / TikTok / Reels
  | 'canvas'          // Spotify Canvas — 9:16 loop, 3-8s, <=8MB
  | 'apple-artwork'   // Apple Music motion artwork — ProRes 1:1 + 3:4
  | 'visualizer'      // audio-reactive loop, 16:9 + 9:16
  | 'square'          // 1:1 IG feed cut

export interface DeliveryFormat {
  id: FormatId
  label: string
  aspect: string
  width: number
  height: number
  maxDurationSec: number | null
  fps: number
  codec: string
  container: string
  maxFileBytes: number | null
  derivedFromMaster: boolean // true = a reframe/cut of the 16:9 master (cheap)
  platforms: string[]
  notes: string
}

// ──────────────────────────────────────────────────────────────────────────
// SHOT PLAN — the timed sequence the cost estimator + producer consume.
// ──────────────────────────────────────────────────────────────────────────

export interface Shot {
  index: number
  startSec: number
  durationSec: number
  section: string          // 'intro' | 'verse' | 'chorus' | 'bridge' | 'outro' | ...
  isHero: boolean          // upgrade to heroEngine
  prompt: string           // the motion prompt
  keyframeRef?: string     // path to the L1 keyframe locking this shot
}

export interface ShotPlan {
  songId: string
  songTitle: string
  style: StyleId
  formats: FormatId[]
  bpm: number | null
  totalDurationSec: number
  shots: Shot[]
  characterCount: number   // distinct Soul ID characters needed
  resolution: '720p' | '1080p' | '4k'
}

// ──────────────────────────────────────────────────────────────────────────
// COST ESTIMATE — what the pre-flight card renders. Never run without this.
// ──────────────────────────────────────────────────────────────────────────

export interface CostLineItem {
  layer: StackLayer
  engine: EngineId
  label: string
  quantity: number
  unit: string             // 'image' | 'second' | 'character' | 'clip'
  usd: number
  higgsfieldCredits: number
}

export interface CostEstimate {
  songId: string
  lineItems: CostLineItem[]
  totalUsd: number
  totalHiggsfieldCredits: number
  // ROI framing
  breakevenSpotifyStreams: number   // streams to recoup at ~$0.004/stream
  breakevenSyncDeals: number        // 1 if a single sync recoups it
  // resonance — filled by Higgsfield virality_predictor (0-10), null until scored
  resonanceScore: number | null
  resonanceFlags: string[]
  // generated-vs-kept multiplier baked in (default 2x for selects)
  selectsMultiplier: number
}
