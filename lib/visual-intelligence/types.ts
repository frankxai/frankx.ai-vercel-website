// Visual Intelligence System (VIS) — type contract.
// Source-of-truth for the /studio/visual page, the visual-intelligence skill,
// the /visual-strategy command, and the visual-intelligence-orchestrator agent.

export type Spectrum = 'tech' | 'soul' | 'bridge'

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

export type Tool =
  | 'nb-image'
  | 'higgsfield-generate'
  | 'higgsfield-product-photoshoot'
  | 'higgsfield-soul-id'
  | 'higgsfield-marketplace-cards'
  | 'hyperframes'
  | 'remotion'
  | 'music-video-batch'
  | 'vis'
  | 'visual-creation'
  | 'brand-voice'

export type LayerKind = 'asset' | 'composition' | 'gate'

export interface PlatformPersona {
  platform: Platform
  label: string
  persona: string
  voicePosture: string
  visualTreatment: string
  cadence: string
  primaryAssetSource: Tool[]
  hookPattern: string
  exampleSurfaces: string[]
  forcingFunction?: string
  spectrum: Spectrum
}

export interface StackLayerEntry {
  tool: Tool
  role: string
  whenToUse: string
  whenNotToUse?: string
  produces: AssetType[]
}

export interface StackLayer {
  kind: LayerKind
  name: string
  purpose: string
  entries: StackLayerEntry[]
}

export interface PlatformRecipe {
  platform: Platform
  goal: string
  inputs: string[]
  steps: string[]
  outputs: string[]
  qualityGates: string[]
}

export interface ImageBriefSignal {
  subject: string
  mood: string[]
  lighting: string
  composition: string
  brandFit: 'strong' | 'partial' | 'weak'
  conversionPotential: 'hero' | 'support' | 'background'
  spectrum: Spectrum
}

export interface PerImageStrategy {
  imageRef: string
  signals: ImageBriefSignal
  recommendations: Array<{
    platform: Platform
    treatment: string
    hookOptions: string[]
    variantsNeeded: string[]
    estimatedShipDate?: string
  }>
}
