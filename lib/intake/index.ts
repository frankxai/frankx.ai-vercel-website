// Content Operations Substrate — public API.
// Source of truth for:
//   - app/studio/* (public pages)
//   - .claude/skills/visual-intelligence (existing)
//   - .claude/skills/{audio,prose,screen,food,travel}-producer (W20-W21)
//   - .claude/agents/content-intake-classifier
//   - .claude/agents/multimodal-orchestrator
//   - .claude/agents/visual-intelligence-orchestrator (existing)
//   - scripts/intake-watcher.mjs
//   - scripts/init-inbox.mjs

// ──────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────

export type {
  // foundations
  Spectrum,
  CaptureType,
  Platform,
  OperatorArchetype,
  ProducerId,
  ProducerStatus,
  AssetType,
  // classifier output
  FileSignals,
  BatchManifest,
  BatchState,
  ProducerDispatch,
  ShippedAsset,
  // metadata
  PlatformPersona,
  CaptureTypeMeta,
  ProducerMeta,
  InboxPaths,
} from './types'

// ──────────────────────────────────────────────────────────────────────────
// Personas (14 platforms)
// ──────────────────────────────────────────────────────────────────────────

export {
  platformPersonas,
  getPersona,
  personasBySpectrum,
  personasByArchetype,
} from './personas'

// ──────────────────────────────────────────────────────────────────────────
// Capture types (13)
// ──────────────────────────────────────────────────────────────────────────

export {
  captureTypes,
  getCaptureType,
  inferCaptureType,
} from './capture-types'

// ──────────────────────────────────────────────────────────────────────────
// Producers (8)
// ──────────────────────────────────────────────────────────────────────────

export {
  producers,
  getProducer,
  producersByStatus,
  producersAcceptingCaptureType,
} from './producers'

// ──────────────────────────────────────────────────────────────────────────
// Inbox filesystem
// ──────────────────────────────────────────────────────────────────────────

export {
  getInboxPaths,
  inboxSchema,
  archivePathFor,
  batchId,
  BATCH_WINDOW_MINUTES,
  WATCHER_CONFIG,
} from './inbox'

// ──────────────────────────────────────────────────────────────────────────
// Version
// ──────────────────────────────────────────────────────────────────────────

export const INTAKE_VERSION = '1.0.0'
export const INTAKE_SHIPPED = '2026-05-13'
export const INTAKE_SPEC = 'docs/superpowers/specs/2026-05-13-content-ops-architecture.md'
