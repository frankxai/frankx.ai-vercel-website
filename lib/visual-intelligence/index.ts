// Visual Intelligence System (VIS) — public API.
// Used by:
//   - /studio/visual page (app/studio/visual/page.tsx)
//   - visual-intelligence skill (.claude/skills/visual-intelligence/)
//   - /visual-strategy command (.claude/commands/visual-strategy.md)
//   - visual-intelligence-orchestrator agent (.claude/agents/)
//   - content-social-distributor agent (existing P1 specialist)

export type {
  Spectrum,
  Platform,
  AssetType,
  Tool,
  LayerKind,
  PlatformPersona,
  StackLayer,
  StackLayerEntry,
  PlatformRecipe,
  ImageBriefSignal,
  PerImageStrategy,
} from './types'

export {
  platformPersonas,
  getPersona,
  personasBySpectrum,
} from './platform-personas'

export {
  visualStack,
  getLayer,
} from './visual-stack'

export {
  platformRecipes,
  getRecipe,
} from './recipes'

export const VIS_VERSION = '1.0.0'
export const VIS_SHIPPED = '2026-05-13'
export const VIS_ROUTE = '/studio/visual'
