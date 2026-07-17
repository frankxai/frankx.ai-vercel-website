import type { FormatId, Shot, ShotPlan, StyleId } from './types'
import { getStyle } from './styles'
import { type BeatGrid, nextBarBoundary } from './beatgrid'

interface PlanInput {
  songId: string
  songTitle: string
  style: StyleId
  formats: FormatId[]
  durationSec: number
  bpm?: number | null
  resolution?: '720p' | '1080p' | '4k'
  shotLengthSec?: number // default 8 (Veo/Kling clip ceiling)
  heroCount?: number // default 2
  beatGrid?: BeatGrid // when present, cuts snap to real downbeats
}

// Builds a beat-aware shot plan. Shots are ~shotLengthSec each; hero shots sit
// at the emotional peaks (~1/3 and ~2/3 through). Cut boundaries snap to BARS:
// when a real beat grid (Beat This!) is supplied, shots end on detected
// downbeats; otherwise they snap to the bpm-derived bar grid. This is the
// difference between "audio-reactive" and "structurally synced".
export function buildDefaultShotPlan(input: PlanInput): ShotPlan {
  const {
    songId,
    songTitle,
    style,
    formats,
    durationSec,
    bpm = null,
    resolution = '1080p',
    shotLengthSec = 8,
    heroCount = 2,
    beatGrid,
  } = input

  const styleDef = getStyle(style)

  // Build the cut boundaries.
  const bounds: number[] = beatGrid
    ? gridBoundaries(beatGrid, durationSec, shotLengthSec)
    : bpmBoundaries(bpm, durationSec, shotLengthSec)

  const shotCount = bounds.length - 1
  const heroIdx = new Set(
    heroCount > 0 && shotCount >= 3
      ? [Math.floor(shotCount / 3), Math.floor((2 * shotCount) / 3)].slice(0, heroCount)
      : [],
  )

  const shots: Shot[] = Array.from({ length: shotCount }, (_, i) => {
    const startSec = round(bounds[i])
    const dur = round(bounds[i + 1] - bounds[i])
    return {
      index: i,
      startSec,
      durationSec: dur,
      section: sectionFor(i, shotCount),
      isHero: heroIdx.has(i),
      prompt: `${styleDef.label} shot ${i + 1}/${shotCount} — ${sectionFor(i, shotCount)}. ${styleDef.hookDoctrine.split('.')[0]}.`,
    }
  })

  return {
    songId,
    songTitle,
    style,
    formats,
    bpm: beatGrid?.bpm ?? bpm,
    totalDurationSec: durationSec,
    shots,
    characterCount: style === 'character' || style === 'cinematic' ? 1 : 0,
    resolution,
  }
}

// Walk real downbeats, taking a shot of ~shotLengthSec snapped to the nearest bar.
function gridBoundaries(grid: BeatGrid, durationSec: number, shotLengthSec: number): number[] {
  const bounds = [0]
  let t = 0
  while (t < durationSec - 0.5) {
    const next = nextBarBoundary(t, shotLengthSec, grid)
    if (next <= t + 0.5 || next >= durationSec) break
    bounds.push(round(next))
    t = next
  }
  bounds.push(round(durationSec))
  return bounds
}

// Even bar-snapped boundaries from a static bpm (the graceful fallback).
function bpmBoundaries(bpm: number | null, durationSec: number, shotLengthSec: number): number[] {
  const barSec = bpm ? (60 / bpm) * 4 : null
  const snappedShot = barSec
    ? Math.max(barSec, Math.min(shotLengthSec, Math.round(shotLengthSec / barSec) * barSec))
    : shotLengthSec
  const count = Math.max(1, Math.ceil(durationSec / snappedShot))
  const bounds = Array.from({ length: count }, (_, i) => round(i * snappedShot))
  bounds.push(round(durationSec))
  return bounds
}

function sectionFor(i: number, total: number): string {
  const p = i / total
  if (p < 0.12) return 'intro'
  if (p < 0.35) return 'verse'
  if (p < 0.55) return 'chorus'
  if (p < 0.7) return 'verse'
  if (p < 0.85) return 'chorus'
  if (p < 0.95) return 'bridge'
  return 'outro'
}

function round(n: number): number {
  return Math.round(n * 100) / 100
}
