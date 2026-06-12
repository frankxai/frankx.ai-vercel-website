// Music Intelligence System — public API.
//
// The 3-layer music-video stack: keyframe (image) → motion (video) → assembly.
// Drop a song, get a cost-gated, design-thought, multi-format premium video.
//
// Powers: /music-video command family, music-video-producer skill,
// /studio/music cockpit, and the music-producer L4 intake producer.

export * from './types'
export { engines, getEngine, motionSecondUsd, imageUsd, HIGGSFIELD_USD_PER_CREDIT } from './engines'
export { styles, getStyle } from './styles'
export { formats, getFormat, FULL_RELEASE_FORMATS, SOCIAL_FORMATS } from './formats'
export { buildDefaultShotPlan } from './planner'
export { estimateCost } from './cost'
export { buildPreflightCard, renderPreflightText, type PreflightCard } from './preflight'
export { loadCatalog, getSong, songsNeedingVideo, type CatalogSong } from './catalog'
export {
  type BeatGrid,
  loadBeatGrid,
  beatGridFromBpm,
  snapToDownbeat,
  nextBarBoundary,
} from './beatgrid'
export { type Edl, type EdlClip, edlFromPlan, validateEdl } from './edl'
export { recordEstimate, recordActual, summarize, readLedger, type LedgerEntry } from './ledger'
