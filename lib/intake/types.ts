// Content Operations — type contract.
// Source-of-truth for the classifier, orchestrator, all 8 producers, /studio pages,
// /admin/inbox dashboard, and the intake-watcher daemon.

export type Spectrum = 'tech' | 'soul' | 'bridge'

// ──────────────────────────────────────────────────────────────────────────
// CAPTURE TYPES (13) — every file in _inbox/ maps to exactly one
// ──────────────────────────────────────────────────────────────────────────

export type CaptureType =
  | 'voice-memo'
  | 'talking-head-video'
  | 'b-roll-video'
  | 'screen-record'
  | 'music-track'
  | 'music-seed'
  | 'photo-hero'
  | 'photo-food'
  | 'photo-travel'
  | 'photo-utility'
  | 'document'
  | 'quote'
  | 'architecture-snap'
  | 'unknown' // punt bucket — surfaces to operator

// ──────────────────────────────────────────────────────────────────────────
// PLATFORMS (14) — every persona maps to exactly one
// ──────────────────────────────────────────────────────────────────────────

export type Platform =
  | 'linkedin'
  | 'youtube-long'
  | 'youtube-shorts'
  | 'tiktok'
  | 'instagram'
  | 'x'
  | 'threads'
  | 'bluesky'
  | 'spotify'
  | 'newsletter'
  | 'podcast'
  | 'github'
  | 'stories'
  | 'blog' // frankx.ai/blog — own surface

// ──────────────────────────────────────────────────────────────────────────
// OPERATOR ARCHETYPES (3) — what role does this serve right now
// ──────────────────────────────────────────────────────────────────────────

export type OperatorArchetype = 'creator' | 'influencer' | 'solution-engineer'

// ──────────────────────────────────────────────────────────────────────────
// PRODUCERS (8) — L4 specialists; each maps to a skill + command + agent
// ──────────────────────────────────────────────────────────────────────────

export type ProducerId =
  | 'vis-producer'
  | 'video-producer'
  | 'audio-producer'
  | 'music-producer'
  | 'prose-producer'
  | 'screen-producer'
  | 'food-producer'
  | 'travel-producer'

export type ProducerStatus = 'shipped' | 'partial' | 'planned-w20' | 'planned-w21'

// ──────────────────────────────────────────────────────────────────────────
// ASSET TYPES — what producers output
// ──────────────────────────────────────────────────────────────────────────

export type AssetType =
  | 'hero-still'
  | 'cover'
  | 'b-roll'
  | 'cinematic-clip'
  | 'product-shot'
  | 'lifestyle-scene'
  | 'character-variant'
  | 'quote-card'
  | 'carousel-frame'
  | 'thumbnail'
  | 'lower-third'
  | 'long-form-video'
  | 'short-video'
  | 'podcast-snippet'
  | 'blog-draft'
  | 'newsletter-section'
  | 'thread-post'
  | 'carousel-post'
  | 'github-readme-section'
  | 'mermaid-diagram'

// ──────────────────────────────────────────────────────────────────────────
// CLASSIFIER SCHEMA
// ──────────────────────────────────────────────────────────────────────────

export interface FileSignals {
  path: string // absolute path on Windows machine
  mimeType: string
  sizeBytes: number
  capturedAt: string // ISO 8601
  captureType: CaptureType
  // multimodal pass results — null until classifier runs
  subject: string | null
  mood: string[] | null // 1-3 adjectives
  lighting: string | null
  composition: string | null
  brandFit: 'strong' | 'partial' | 'weak' | null
  conversionPotential: 'hero' | 'support' | 'background' | null
  spectrum: Spectrum | null
  // audio/video specific
  durationSec: number | null
  transcript: string | null
  // photo specific
  gpsLat: number | null
  gpsLon: number | null
  // file lineage
  originalDevice: string | null // OnePlus 15R, etc.
  shareIntent: string | null // which Tasker profile or "manual"
}

// ──────────────────────────────────────────────────────────────────────────
// BATCH SCHEMA — files captured close in time travel together
// ──────────────────────────────────────────────────────────────────────────

export type BatchState =
  | 'pending-classification'
  | 'classified'
  | 'dispatched'
  | 'in-production'
  | 'ready-for-review'
  | 'approved'
  | 'shipped'
  | 'archived'

export interface BatchManifest {
  id: string // YYYY-MM-DD-<slug>
  createdAt: string
  state: BatchState
  files: FileSignals[]
  // classifier output
  dominantSpectrum: Spectrum | null
  inferredOperatorArchetype: OperatorArchetype | null
  forcingFunctionMatched: string | null // e.g. "nldigital-2026-05-19"
  // dispatch
  suggestedProducers: ProducerDispatch[]
  // production
  stagingDir: string | null // content/staging/batches/<id>/
  // ship
  shippedAssets: ShippedAsset[]
  shippedAt: string | null
  archivedTo: string | null
}

export interface ProducerDispatch {
  producer: ProducerId
  fileIndices: number[] // which files in batch.files this producer should consume
  targetPlatforms: Platform[]
  estimatedShipDate: string
  rationale: string // 1-sentence why
  priority: 'now' | 'this-week' | 'queued'
}

export interface ShippedAsset {
  platform: Platform
  url: string | null
  shippedAt: string
  assetType: AssetType
  producer: ProducerId
}

// ──────────────────────────────────────────────────────────────────────────
// PERSONA SCHEMA
// ──────────────────────────────────────────────────────────────────────────

export interface PlatformPersona {
  platform: Platform
  label: string
  persona: string
  voicePosture: string
  visualTreatment: string
  cadence: string
  primaryAssetSource: string[] // tool names; e.g. ["nb-image", "higgsfield-generate"]
  hookPattern: string
  exampleSurfaces: string[]
  forcingFunction?: string
  spectrum: Spectrum
  archetype: OperatorArchetype // primary archetype this platform serves
}

// ──────────────────────────────────────────────────────────────────────────
// CAPTURE TYPE METADATA
// ──────────────────────────────────────────────────────────────────────────

export interface CaptureTypeMeta {
  id: CaptureType
  label: string
  mimeTypes: string[] // patterns; e.g. ["audio/mpeg", "audio/mp4", "audio/wav"]
  extensions: string[] // dot-prefixed; e.g. [".m4a", ".mp3", ".wav"]
  inboxSubpath: string // relative to _inbox/; e.g. "voice/"
  primaryProducer: ProducerId
  typicalSpectrumBias: Spectrum | null // null = inherits from batch
  description: string
}

// ──────────────────────────────────────────────────────────────────────────
// PRODUCER METADATA
// ──────────────────────────────────────────────────────────────────────────

export interface ProducerMeta {
  id: ProducerId
  label: string
  status: ProducerStatus
  shipped: string // YYYY-MM-DD or 'W20' / 'W21' / 'partial-existing'
  description: string
  acceptedCaptureTypes: CaptureType[]
  producedAssetTypes: AssetType[]
  targetPlatforms: Platform[]
  skill: string // slug of the skill that powers this producer (or "—" if not yet)
  command: string // slash command
  agent?: string // optional dedicated agent
  studioRoute: string // /studio/<slug>
  publicStatusBlurb: string // for /studio index display
}

// ──────────────────────────────────────────────────────────────────────────
// INBOX SCHEMA
// ──────────────────────────────────────────────────────────────────────────

export interface InboxPaths {
  root: string // C:\Users\frank\_inbox
  archive: string // C:\Users\frank\_archive
  staging: string // <repo>/content/staging
  dropped: string // root/dropped
}
