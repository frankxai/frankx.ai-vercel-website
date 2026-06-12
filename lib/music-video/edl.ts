import type { ShotPlan, FormatId } from './types'

// The EDL (Edit Decision List) is the clean intermediate artifact between the
// shot planner and the assembly layer. The planner emits an EDL; the compositor
// (HyperFrames / Remotion / ffmpeg) consumes it. This decouples planning from
// rendering and makes A/B-ing assemblers trivial — the pattern the best
// open-source pipelines (Vibe Music Engine's beat→EDL) converge on.

export type TransitionKind = 'cut' | 'crossfade' | 'wipe' | 'dissolve'

export interface EdlClip {
  index: number
  inSec: number // timeline position, start
  outSec: number // timeline position, end
  durationSec: number
  section: string
  isHero: boolean
  onDownbeat: boolean // did this cut land on a bar start?
  sourceAsset: string // clips/shot-NN.mp4 (filled after motion gen)
  keyframe: string // keyframes/shot-NN.png
  transitionIn: TransitionKind
  prompt: string
}

export interface Edl {
  songId: string
  songTitle: string
  style: string
  formats: FormatId[]
  totalDurationSec: number
  beatGridSource: 'beat-this' | 'bpm-fallback' | 'none'
  clips: EdlClip[]
}

// Section changes get a soft transition; everything else is a hard cut on the
// beat (music videos breathe on section boundaries, snap inside them).
function transitionFor(prevSection: string | null, section: string): TransitionKind {
  if (prevSection === null) return 'cut'
  return prevSection !== section ? 'crossfade' : 'cut'
}

export function edlFromPlan(plan: ShotPlan, beatGridSource: Edl['beatGridSource'] = 'none'): Edl {
  let prevSection: string | null = null
  const clips: EdlClip[] = plan.shots.map((s) => {
    const transitionIn = transitionFor(prevSection, s.section)
    prevSection = s.section
    return {
      index: s.index,
      inSec: s.startSec,
      outSec: round(s.startSec + s.durationSec),
      durationSec: s.durationSec,
      section: s.section,
      isHero: s.isHero,
      onDownbeat: beatGridSource !== 'none', // planner snapped to grid when present
      sourceAsset: s.keyframeRef ? s.keyframeRef.replace('keyframes', 'clips').replace('.png', '.mp4') : `clips/shot-${pad(s.index)}.mp4`,
      keyframe: s.keyframeRef ?? `keyframes/shot-${pad(s.index)}.png`,
      transitionIn,
      prompt: s.prompt,
    }
  })
  return {
    songId: plan.songId,
    songTitle: plan.songTitle,
    style: plan.style,
    formats: plan.formats,
    totalDurationSec: plan.totalDurationSec,
    beatGridSource,
    clips,
  }
}

// Guard the EDL is renderable: no gaps, no overlaps, covers the full track.
export function validateEdl(edl: Edl): { ok: boolean; issues: string[] } {
  const issues: string[] = []
  const sorted = [...edl.clips].sort((a, b) => a.inSec - b.inSec)
  if (sorted.length === 0) issues.push('EDL has no clips')
  if (sorted[0] && sorted[0].inSec > 0.1) issues.push(`first clip starts at ${sorted[0].inSec}s, not 0`)
  for (let i = 1; i < sorted.length; i++) {
    const gap = round(sorted[i].inSec - sorted[i - 1].outSec)
    if (gap > 0.1) issues.push(`gap of ${gap}s before clip ${sorted[i].index}`)
    if (gap < -0.1) issues.push(`overlap of ${-gap}s before clip ${sorted[i].index}`)
  }
  const last = sorted[sorted.length - 1]
  if (last && edl.totalDurationSec - last.outSec > 0.5) {
    issues.push(`EDL ends ${round(edl.totalDurationSec - last.outSec)}s before track end`)
  }
  return { ok: issues.length === 0, issues }
}

function pad(n: number): string {
  return String(n + 1).padStart(2, '0')
}
function round(n: number): number {
  return Math.round(n * 1000) / 1000
}
