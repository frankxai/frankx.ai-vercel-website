// Aesthetic Lanes — the multi-lane taste substrate.
//
// taste.md encodes ONE aesthetic (premium dark editorial). This file makes taste
// plural without making it loose: every lane is a first-class, fully-specified
// premium standard. Liquid-glass and anime are not "modes" — each is a complete
// art direction with its own references, palette, refusal list, and quality bar.
//
// The visual-creation gate reads the CHOSEN lane and holds output against THAT
// lane's bar — not one global standard. A liquid-glass hero and a Ghibli-grade
// anime card are both "on brand" because the brand is "premium, on the chosen lane."
//
// Read by: lib/gen/router.ts, lib/gen/patterns.ts, the /studio/lanes page,
//          the /gen command + gen skill, and the visual-creation gate.

import type { Spectrum } from '@/lib/visual-intelligence/types'

export type LaneId =
  | 'liquid-glass'
  | 'anime'
  | 'editorial'
  | 'cinematic'
  | 'noir-tech'
  | 'studio-organic'

export interface LaneReference {
  name: string
  why: string
}

export interface LanePalette {
  /** The ground the lane sits on. */
  base: string
  /** Accent hexes, in priority order. */
  accents: string[]
  /** Primary ink / text color. */
  ink: string
}

export interface AestheticLane {
  id: LaneId
  name: string
  spectrum: Spectrum
  /** One sentence: what this lane feels like. */
  essence: string
  /** The taste lineage — study these for calibration. */
  references: LaneReference[]
  palette: LanePalette
  /** Direction strings injected into every prompt on this lane. */
  lighting: string
  composition: string
  texture: string
  /** Positive style tokens appended to the resolved prompt. */
  promptFragments: string[]
  /** The compiled negative prompt for image models (what this lane refuses). */
  negativePrompt: string
  /** The refusal list — if the output shows any of these, send it back. */
  refusals: string[]
  /** The gate checklist for THIS lane. Every item must pass before publish. */
  qualityBar: string[]
  /** Backend ids (lib/gen/backends.ts) that render this lane best, in order. */
  bestBackends: string[]
  /** Where this lane belongs. */
  bestFor: string[]
}

export const aestheticLanes: AestheticLane[] = [
  {
    id: 'liquid-glass',
    name: 'Liquid Glass',
    spectrum: 'tech',
    essence:
      'Apple visionOS made still — frosted translucency, real refraction, specular depth. The premium default.',
    references: [
      { name: 'Apple visionOS / Liquid Glass material', why: 'The reference for depth, refraction, and parallax done with restraint.' },
      { name: 'Apple Pro product pages', why: 'Dramatic near-black staging, one hero object, motivated key light.' },
      { name: 'Linear app surfaces', why: 'Glass that frames structure, never decoration.' },
    ],
    palette: { base: '#0a0a0b', accents: ['#10b981', '#34d399', '#67e8f9'], ink: '#F5F5F7' },
    lighting:
      'soft key from upper-left, cool rim light, subsurface glow through frosted panels, controlled specular highlights',
    composition:
      'one hero subject, generous negative space, shallow depth layers with parallax separation, centered or rule-of-thirds',
    texture:
      'frosted glass with visible refraction and caustics, brushed metal edges, fine grain to avoid banding, no plastic sheen',
    promptFragments: [
      'liquid glass material, frosted translucent panels with real refraction',
      'visionOS-grade depth and specular highlights',
      'near-black #0a0a0b stage, emerald and cyan light accents',
      'premium product photography lighting, 2K crisp, no banding',
    ],
    negativePrompt:
      'flat illustration, cartoon, plastic, oversaturated, harsh shadows, cluttered, stock-photo people, watermark, lens flare overuse, pure black #000',
    refusals: [
      'Glassmorphism with nothing underneath to refract',
      'Plastic or toy-like sheen instead of true glass',
      'Pure black (#000) ground — use void #0a0a0b',
      'More than one hero subject competing for focus',
    ],
    qualityBar: [
      'Refraction reads as real glass, not a blur filter',
      'A single, nameable hero subject',
      'Depth is layered (foreground/subject/ground), not flat',
      'Accents are emerald/cyan light, never decorative gradient',
      'No banding in the dark gradient (grain present)',
    ],
    bestBackends: ['infogenius', 'gpt-image-2'],
    bestFor: ['Page heroes', 'Product shots', 'OS/dashboard marketing', 'Course covers'],
  },
  {
    id: 'anime',
    name: 'Anime / Cel',
    spectrum: 'soul',
    essence:
      'Ghibli light and Makoto Shinkai skies — hand-painted warmth, volumetric god-rays, emotional composition.',
    references: [
      { name: 'Studio Ghibli production stills', why: 'The light and the composition. Cinema, not stock — already in taste.md.' },
      { name: 'Makoto Shinkai (Your Name, Weathering With You)', why: 'Hyper-detailed skies, lens bloom, saturated emotional color.' },
      { name: 'Kyoto Animation', why: 'Clean cel linework with soft ambient occlusion.' },
    ],
    palette: { base: '#0d1117', accents: ['#f59e0b', '#fbbf24', '#67e8f9'], ink: '#F8EFE3' },
    lighting:
      'volumetric god-rays, golden-hour bloom, soft ambient bounce, painterly rim light on the subject',
    composition:
      'wide establishing frame or intimate close, layered painterly background, leading lines toward the subject, sky as emotional character',
    texture:
      'hand-painted cel shading, visible brushwork in backgrounds, clean confident linework, subtle film grain',
    promptFragments: [
      'anime cel-shaded illustration, Studio Ghibli and Makoto Shinkai influence',
      'hand-painted background, volumetric light and golden-hour bloom',
      'clean confident linework, soft ambient occlusion',
      'emotional cinematic composition, painterly skies',
    ],
    negativePrompt:
      '3d render, photorealistic, plastic, generic anime waifu, oversharpened, extra fingers, malformed hands, watermark, signature, lowres, jpeg artifacts',
    refusals: [
      'Generic "AI anime girl" tropes — character must serve a scene',
      '3D/photoreal output mislabeled as anime',
      'Oversharpened linework with no painterly background',
      'Saturation cranked past emotional truth into candy',
    ],
    qualityBar: [
      'Background is hand-painted, not a blurred photo',
      'Light is volumetric and motivated, not a flat overlay',
      'Linework is clean and confident, no malformed anatomy',
      'Composition carries an emotion you can name',
      'Reads as a film still, not a character sheet',
    ],
    bestBackends: ['infogenius', 'fal', 'gpt-image-2'],
    bestFor: ['Music/album art', 'Story covers', 'Soul-spectrum social', 'Newsletter headers'],
  },
  {
    id: 'editorial',
    name: 'Editorial',
    spectrum: 'bridge',
    essence:
      'The New Yorker meets Kinfolk — typographic discipline, restrained palette, prose treated as art direction.',
    references: [
      { name: 'The New Yorker (online)', why: 'The discipline of editorial typography. Prose deserves art direction.' },
      { name: 'Kinfolk / Cereal magazine', why: 'Quiet, warm, generous margins, muted natural palette.' },
      { name: 'Monocle', why: 'Information density that still breathes.' },
    ],
    palette: { base: '#0a0a0b', accents: ['#E8DDD0', '#A9A9AA', '#f59e0b'], ink: '#E8DDD0' },
    lighting: 'flat even editorial light, soft diffused window light, no drama — clarity over mood',
    composition:
      'strong typographic grid, generous margins, one image one idea, asymmetric balance, wide line-length restraint',
    texture: 'subtle paper grain, matte surfaces, muted natural color, fine hairline rules',
    promptFragments: [
      'editorial magazine art direction, New Yorker and Kinfolk influence',
      'restrained muted palette, warm cream ink on near-black',
      'generous negative space, typographic discipline',
      'matte natural surfaces, soft diffused light',
    ],
    negativePrompt:
      'busy, cluttered, neon, oversaturated, gradient soup, clip-art, stock-photo grin, watermark, hard drop shadows',
    refusals: [
      'Decoration with no editorial purpose',
      'Neon or high-saturation accents (this lane is muted)',
      'Walls of equal elements — editorial picks a focal point',
      'AI-tone copy in any on-image text',
    ],
    qualityBar: [
      'Every element has a nameable editorial job',
      'Palette stays muted and warm, never neon',
      'Typography (if present) is disciplined and gridded',
      'Negative space is generous, the page exhales',
      'Reads like a magazine spread, not a slide',
    ],
    bestBackends: ['infogenius', 'gpt-image-2'],
    bestFor: ['Blog heroes', 'Contemplative rails', 'Long-form headers', 'Quote cards'],
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    spectrum: 'bridge',
    essence:
      'A frame pulled from a film — anamorphic, motivated light, shallow depth, Deakins-grade restraint.',
    references: [
      { name: 'Roger Deakins cinematography', why: 'Motivated light, single source, restraint over spectacle.' },
      { name: 'Blade Runner 2049', why: 'Atmosphere as subject, negative space, color as emotion.' },
      { name: 'Denis Villeneuve framing', why: 'Scale, stillness, the subject small in a vast frame.' },
    ],
    palette: { base: '#08080a', accents: ['#f59e0b', '#10b981', '#9ca3af'], ink: '#EDEDED' },
    lighting:
      'single motivated key light, deep shadows with retained detail, atmospheric haze, anamorphic bokeh',
    composition:
      'anamorphic 2.39 framing energy, shallow depth of field, subject placed with intent in negative space, foreground occlusion',
    texture: 'fine film grain, subtle halation on highlights, organic lens character, no digital sharpening',
    promptFragments: [
      'cinematic film still, anamorphic, shallow depth of field',
      'single motivated key light, atmospheric haze, deep retained shadows',
      'Roger Deakins lighting restraint, film grain and subtle halation',
      'composed frame with intentional negative space',
    ],
    negativePrompt:
      'flat lighting, snapshot, oversharpened, HDR look, busy composition, stock photo, watermark, cartoon, video-game render',
    refusals: [
      'Flat, evenly-lit "snapshot" with no motivated source',
      'HDR over-processing that kills shadow',
      'Busy frame with no clear subject in the negative space',
      'Digital oversharpening — film is organic',
    ],
    qualityBar: [
      'Light has a single motivated source',
      'Shadows are deep but retain detail',
      'Depth of field isolates the subject',
      'Grain present, no digital oversharpening',
      'The frame could be paused from a film',
    ],
    bestBackends: ['higgsfield', 'fal', 'infogenius'],
    bestFor: ['Video B-roll', 'Talking-head cutaways', 'Cinematic heroes', 'Thumbnails'],
  },
  {
    id: 'noir-tech',
    name: 'Noir Tech',
    spectrum: 'tech',
    essence:
      'Dark product cinema — neon-on-void, emerald and cyan light cutting through black, the AI-architect register.',
    references: [
      { name: 'Vercel brand surfaces', why: 'The deepest-dark, most precise dev brand. Restraint at the core.' },
      { name: 'Apple "dark" product films', why: 'Black stage, single object, light as the only color.' },
      { name: 'Stripe technical illustration', why: 'Precision presented as inevitability.' },
    ],
    palette: { base: '#0a0a0b', accents: ['#10b981', '#34d399', '#67e8f9'], ink: '#F5F5F7' },
    lighting:
      'low-key, single cool light source, emerald/cyan neon rim, light as the only color on a black stage',
    composition: 'one object on void, dramatic isolation, precise geometry, hard negative space',
    texture: 'matte black surfaces, crisp light edges, subtle volumetric haze, fine grain on the dark',
    promptFragments: [
      'dark product cinema, near-black #0a0a0b void stage',
      'emerald and cyan neon light as the only color',
      'single isolated subject, precise geometry, low-key lighting',
      'matte surfaces, subtle volumetric haze, crisp light edges',
    ],
    negativePrompt:
      'bright, daylight, warm tones, cluttered, pure black #000, oversaturated, stock photo, people grinning, watermark, banding',
    refusals: [
      'Daylight or warm palette (this is the cool tech register)',
      'Pure black #000 — void is #0a0a0b',
      'Clutter — noir-tech is one object on void',
      'Color beyond the emerald/cyan light',
    ],
    qualityBar: [
      'Black stage is #0a0a0b with grain, never #000',
      'Color comes only from emerald/cyan light',
      'A single isolated subject',
      'Geometry is precise, edges are crisp',
      'Feels like a Vercel/Apple dark product film',
    ],
    bestBackends: ['infogenius', 'higgsfield', 'gpt-image-2'],
    bestFor: ['ACOS/OS surfaces', 'Technical heroes', 'Architecture diagrams', 'Dev-tool marketing'],
  },
  {
    id: 'studio-organic',
    name: 'Studio Organic',
    spectrum: 'soul',
    essence:
      'The inside of a working studio — natural materials, golden hour, warm amber, human and lived-in.',
    references: [
      { name: 'Ableton Live studio photography', why: 'Pro-tools energy creators trust; instruments, evidence, warmth.' },
      { name: 'Kinfolk lifestyle', why: 'Warm natural materials, golden light, lived-in calm.' },
      { name: 'Teenage Engineering product world', why: 'Tactile objects, honest materials, playful restraint.' },
    ],
    palette: { base: '#100d09', accents: ['#f59e0b', '#fbbf24', '#fcd34d'], ink: '#F8EFE3' },
    lighting: 'warm golden-hour window light, soft long shadows, amber bounce, natural and unforced',
    composition:
      'lived-in studio scene, tactile objects in context, depth through layered foreground, human-scale framing',
    texture: 'wood, paper, brushed metal, warm fabric, honest material grain, soft natural focus',
    promptFragments: [
      'warm studio scene, golden-hour window light, amber palette',
      'natural materials — wood, paper, brushed metal, fabric',
      'lived-in tactile composition, human-scale, soft long shadows',
      'honest material grain, unforced and warm',
    ],
    negativePrompt:
      'cold, clinical, neon, plastic, oversaturated, stock-photo office, fluorescent, watermark, harsh flash',
    refusals: [
      'Cold or clinical light (this lane is warm)',
      'Plastic or fluorescent "stock office" energy',
      'Staged stock-photo people on laptops',
      'Neon — this is the warm soul register',
    ],
    qualityBar: [
      'Light is warm golden-hour, never fluorescent',
      'Materials are natural and tactile',
      'Scene feels lived-in, not staged',
      'Amber palette holds, no cold neon intrusion',
      'Feels like a real working studio',
    ],
    bestBackends: ['infogenius', 'higgsfield', 'fal'],
    bestFor: ['About/personal pages', 'Music studio content', 'Workshop warmth', 'Lifestyle social'],
  },
]

export function getLane(id: LaneId): AestheticLane | undefined {
  return aestheticLanes.find((l) => l.id === id)
}

export function lanesBySpectrum(spectrum: Spectrum): AestheticLane[] {
  return aestheticLanes.filter((l) => l.spectrum === spectrum)
}

export const DEFAULT_LANE: LaneId = 'liquid-glass'
