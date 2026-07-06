// Prompt Patterns — validated prompts keyed by (useCase × format × lane).
//
// This is the "best prompt for this job, on this aesthetic, at this size" library.
// Each pattern carries a winRate that the learning loop updates over time:
//   1. The router resolves a pattern for a request.
//   2. The output ships and gets judged (Council / hook-learn analytics).
//   3. scripts/gen-rank.mjs aggregates data/gen/outcomes.jsonl → data/gen/winrate.json.
//   4. The overlay below re-weights bestPattern() so winners surface automatically.
//
// Community + harvested patterns slot in here with provenance. The /harvest command
// (awesome-chatgpt-prompts CC0, awesome-claude-prompts MIT, Fabric MIT) seeds new rows.

import type { LaneId } from './lanes'
import winrates from '@/data/gen/winrate.json'

export type UseCase =
  | 'hero'
  | 'cover'
  | 'social-card'
  | 'thumbnail'
  | 'header'
  | 'infographic'
  | 'b-roll'
  | 'quote-card'
  | 'carousel-frame'

export type Format =
  | 'web-wide' // 16:9 page hero
  | 'square' // 1:1 social card
  | 'portrait' // 4:5 feed
  | 'story' // 9:16 stories / shorts
  | 'book' // 2:3 cover
  | 'thumb' // 16:9 thumbnail

export interface PromptPattern {
  id: string
  name: string
  useCase: UseCase
  format: Format
  laneId: LaneId
  /** The prompt template. {subject} and {context} are filled by the router; the
   *  lane's promptFragments are appended automatically. Carries the design-thinking
   *  headers (## CONCEPT / ## SCENE ...) so it passes the nb-image gate. */
  template: string
  recommendedBackend: string
  aspectRatio: string
  imageSize: '1K' | '2K' | '4K'
  /** Provenance for attribution + community contribution tracking. */
  provenance: string
}

const ASPECT: Record<Format, string> = {
  'web-wide': '16:9',
  square: '1:1',
  portrait: '4:5',
  story: '9:16',
  book: '2:3',
  thumb: '16:9',
}

export const promptPatterns: PromptPattern[] = [
  {
    id: 'hero-liquid-glass-web',
    name: 'Liquid-glass page hero',
    useCase: 'hero',
    format: 'web-wide',
    laneId: 'liquid-glass',
    template:
      '## CONCEPT\nA single {subject} as a hero object, premium and inevitable.\n## SCENE\n{context}\n## COMPOSITION\nCentered hero on a near-black #0a0a0b stage, layered depth, generous negative space.\n## LIGHTING\nSoft key from upper-left, cool cyan rim, subsurface glow through frosted glass.',
    recommendedBackend: 'infogenius',
    aspectRatio: ASPECT['web-wide'],
    imageSize: '2K',
    provenance: 'frankx-original',
  },
  {
    id: 'hero-noir-tech-web',
    name: 'Noir-tech technical hero',
    useCase: 'hero',
    format: 'web-wide',
    laneId: 'noir-tech',
    template:
      '## CONCEPT\n{subject} isolated on void, the AI-architect register.\n## SCENE\n{context}\n## COMPOSITION\nOne object on #0a0a0b void, precise geometry, hard negative space.\n## LIGHTING\nLow-key, single cool source, emerald/cyan neon rim as the only color.',
    recommendedBackend: 'infogenius',
    aspectRatio: ASPECT['web-wide'],
    imageSize: '2K',
    provenance: 'frankx-original',
  },
  {
    id: 'social-card-anime-square',
    name: 'Anime social card',
    useCase: 'social-card',
    format: 'square',
    laneId: 'anime',
    template:
      '## CONCEPT\n{subject} as an emotional anime scene.\n## SCENE\n{context}\n## COMPOSITION\nLayered painterly background, leading lines to subject, sky as a character.\n## LIGHTING\nVolumetric god-rays, golden-hour bloom, painterly rim light.',
    recommendedBackend: 'infogenius',
    aspectRatio: ASPECT['square'],
    imageSize: '2K',
    provenance: 'frankx-original',
  },
  {
    id: 'cover-cinematic-book',
    name: 'Cinematic book/album cover',
    useCase: 'cover',
    format: 'book',
    laneId: 'cinematic',
    template:
      '## CONCEPT\n{subject} as a film-still cover.\n## SCENE\n{context}\n## COMPOSITION\nAnamorphic energy, subject placed with intent in negative space, foreground occlusion.\n## LIGHTING\nSingle motivated key, deep retained shadows, atmospheric haze, film grain.',
    recommendedBackend: 'infogenius',
    aspectRatio: ASPECT['book'],
    imageSize: '4K',
    provenance: 'frankx-original',
  },
  {
    id: 'cover-anime-book',
    name: 'Anime story cover',
    useCase: 'cover',
    format: 'book',
    laneId: 'anime',
    template:
      '## CONCEPT\n{subject} as a Ghibli-grade cover scene.\n## SCENE\n{context}\n## COMPOSITION\nWide establishing frame, hand-painted background, emotional focal point.\n## LIGHTING\nVolumetric light, golden-hour bloom, soft ambient occlusion.',
    recommendedBackend: 'infogenius',
    aspectRatio: ASPECT['book'],
    imageSize: '4K',
    provenance: 'frankx-original',
  },
  {
    id: 'thumbnail-cinematic-thumb',
    name: 'Cinematic YouTube thumbnail',
    useCase: 'thumbnail',
    format: 'thumb',
    laneId: 'cinematic',
    template:
      '## CONCEPT\n{subject} as a high-contrast thumbnail with one clear focal point.\n## SCENE\n{context}\n## COMPOSITION\nSubject left or right third, space for title text, shallow depth of field.\n## LIGHTING\nSingle motivated key, dramatic but readable at small size, film grain.',
    recommendedBackend: 'fal',
    aspectRatio: ASPECT['thumb'],
    imageSize: '2K',
    provenance: 'frankx-original',
  },
  {
    id: 'header-editorial-wide',
    name: 'Editorial blog header',
    useCase: 'header',
    format: 'web-wide',
    laneId: 'editorial',
    template:
      '## CONCEPT\n{subject} as a restrained editorial header.\n## SCENE\n{context}\n## COMPOSITION\nStrong typographic grid energy, generous margins, one image one idea.\n## LIGHTING\nFlat even editorial light, muted warm palette, matte surfaces.',
    recommendedBackend: 'infogenius',
    aspectRatio: ASPECT['web-wide'],
    imageSize: '2K',
    provenance: 'frankx-original',
  },
  {
    id: 'quote-card-editorial-square',
    name: 'Editorial quote card',
    useCase: 'quote-card',
    format: 'square',
    laneId: 'editorial',
    template:
      '## CONCEPT\nA quote-card ground for "{subject}".\n## SCENE\n{context}\n## COMPOSITION\nNegative space reserved for the quote, asymmetric balance, hairline rule.\n## LIGHTING\nSoft diffused light, warm cream ink on near-black, paper grain.',
    recommendedBackend: 'infogenius',
    aspectRatio: ASPECT['square'],
    imageSize: '2K',
    provenance: 'frankx-original',
  },
  {
    id: 'b-roll-cinematic-story',
    name: 'Cinematic vertical B-roll',
    useCase: 'b-roll',
    format: 'story',
    laneId: 'cinematic',
    template:
      '## CONCEPT\n{subject} as atmospheric vertical B-roll.\n## SCENE\n{context}\n## COMPOSITION\n9:16 frame, subject small in vast negative space, foreground occlusion for depth.\n## LIGHTING\nMotivated key, atmospheric haze, anamorphic bokeh, film grain.',
    recommendedBackend: 'higgsfield',
    aspectRatio: ASPECT['story'],
    imageSize: '2K',
    provenance: 'frankx-original',
  },
  {
    id: 'carousel-frame-liquid-glass-portrait',
    name: 'Liquid-glass carousel frame',
    useCase: 'carousel-frame',
    format: 'portrait',
    laneId: 'liquid-glass',
    template:
      '## CONCEPT\n{subject} as one frame in a cohesive carousel.\n## SCENE\n{context}\n## COMPOSITION\n4:5 frame, consistent glass treatment, room for a single line of copy.\n## LIGHTING\nSoft key, cyan rim, frosted-glass depth, no banding.',
    recommendedBackend: 'infogenius',
    aspectRatio: ASPECT['portrait'],
    imageSize: '2K',
    provenance: 'frankx-original',
  },
  {
    id: 'hero-studio-organic-web',
    name: 'Studio-organic warm hero',
    useCase: 'hero',
    format: 'web-wide',
    laneId: 'studio-organic',
    template:
      '## CONCEPT\n{subject} in a warm, lived-in studio scene.\n## SCENE\n{context}\n## COMPOSITION\nTactile objects in context, layered foreground depth, human-scale framing.\n## LIGHTING\nGolden-hour window light, soft long shadows, amber bounce.',
    recommendedBackend: 'infogenius',
    aspectRatio: ASPECT['web-wide'],
    imageSize: '2K',
    provenance: 'frankx-original',
  },
  {
    id: 'infographic-noir-tech-wide',
    name: 'Noir-tech infographic ground',
    useCase: 'infographic',
    format: 'web-wide',
    laneId: 'noir-tech',
    template:
      '## CONCEPT\nA research-grounded infographic ground for {subject}.\n## SCENE\n{context}\n## COMPOSITION\nClear zones for data, precise geometry, void stage, room for labels.\n## LIGHTING\nLow-key, emerald/cyan accents marking the data hierarchy.',
    recommendedBackend: 'infogenius',
    aspectRatio: ASPECT['web-wide'],
    imageSize: '2K',
    provenance: 'frankx-original (InfoGenius pipeline)',
  },
  {
    id: 'scroll-video-scrub-cinematic-web',
    name: 'Cinematic video scrub for premium web scroll',
    useCase: 'b-roll',
    format: 'web-wide',
    laneId: 'cinematic',
    template:
      '## CONCEPT\n{subject} as scroll-scrubbable cinematic B-roll for luxurious web experience.\n## SCENE\n{context}\n## COMPOSITION\n16:9 anamorphic, designed for progressive reveal and scrub on scroll, shallow DOF, intentional negative space.\n## LIGHTING\nMotivated key, atmospheric haze, anamorphic bokeh, film grain.',
    recommendedBackend: 'higgsfield',
    aspectRatio: ASPECT['web-wide'],
    imageSize: '2K',
    provenance: 'cinematic-web-lab',
  },
  {
    id: 'luxury-scroll-hero-cinematic',
    name: 'Luxury scroll hero cinematic still sequence',
    useCase: 'hero',
    format: 'web-wide',
    laneId: 'cinematic',
    template:
      '## CONCEPT\n{subject} as premium cinematic hero for scroll-driven landing or lab page.\n## SCENE\n{context}\n## COMPOSITION\nAnamorphic framing, layered depth for parallax/sequence, organic integration with tech.\n## LIGHTING\nDeakins motivated, filmic, grain, halation.',
    recommendedBackend: 'infogenius',
    aspectRatio: ASPECT['web-wide'],
    imageSize: '2K',
    provenance: 'cinematic-web-lab',
  },
]

type WinRateOverlay = Record<string, { winRate: number; evalCount: number }>

function winRateFor(id: string): { winRate: number | null; evalCount: number } {
  // The JSON carries a leading `_comment` string alongside the pattern rows, so the
  // overlay is read through `unknown` and accessed by id.
  const row = (winrates as unknown as WinRateOverlay)[id]
  return row && typeof row.winRate === 'number'
    ? { winRate: row.winRate, evalCount: row.evalCount }
    : { winRate: null, evalCount: 0 }
}

export interface RankedPattern extends PromptPattern {
  winRate: number | null
  evalCount: number
}

export function withWinRate(p: PromptPattern): RankedPattern {
  return { ...p, ...winRateFor(p.id) }
}

export function patternsFor(useCase: UseCase, laneId?: LaneId, format?: Format): RankedPattern[] {
  return promptPatterns
    .filter((p) => p.useCase === useCase)
    .filter((p) => (laneId ? p.laneId === laneId : true))
    .filter((p) => (format ? p.format === format : true))
    .map(withWinRate)
}

/** The validated winner for a job. Sorts by winRate desc, ties broken by evalCount. */
export function bestPattern(
  useCase: UseCase,
  laneId?: LaneId,
  format?: Format,
): RankedPattern | undefined {
  const candidates = patternsFor(useCase, laneId, format)
  if (candidates.length === 0) {
    // Fall back to lane-only, then useCase-only — never return nothing if the use-case exists.
    const laneOnly = patternsFor(useCase, laneId)
    if (laneOnly.length > 0) return rank(laneOnly)[0]
    return rank(patternsFor(useCase))[0]
  }
  return rank(candidates)[0]
}

function rank(list: RankedPattern[]): RankedPattern[] {
  return [...list].sort((a, b) => {
    const aw = a.winRate ?? -1
    const bw = b.winRate ?? -1
    if (bw !== aw) return bw - aw
    return b.evalCount - a.evalCount
  })
}

export function allRankedPatterns(): RankedPattern[] {
  return rank(promptPatterns.map(withWinRate))
}
