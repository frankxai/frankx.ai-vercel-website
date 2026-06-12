// Generation layer — public API.
// The full gen substrate: the engine registry, the aesthetic lanes (taste),
// the prompt-pattern library (with win-rate learning), and the router that ties
// them into one plan. Read by /studio/engines, /studio/lanes, the /gen command,
// the gen skill, and the visual-creation gate.

export type {
  BackendKind,
  AccessMode,
  Tier,
  BackendStatus,
  CostModel,
  InstallStep,
  GenBackend,
} from './backends'

export {
  genBackends,
  getBackend,
  backendsByTier,
  defaultStack,
  GEN_VERSION,
  GEN_SHIPPED,
  GEN_ROUTE,
} from './backends'

export type { LaneId, LaneReference, LanePalette, AestheticLane } from './lanes'

export { aestheticLanes, getLane, lanesBySpectrum, DEFAULT_LANE } from './lanes'

export type { UseCase, Format, PromptPattern, RankedPattern } from './patterns'

export {
  promptPatterns,
  patternsFor,
  bestPattern,
  allRankedPatterns,
  withWinRate,
} from './patterns'

export type { GenRequest, GenPlan, GenOutcome } from './router'

export { route, buildOutcome } from './router'

export const LANES_ROUTE = '/studio/lanes'
