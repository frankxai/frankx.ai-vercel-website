import { existsSync, readFileSync } from 'node:fs'

// The beat grid is the difference between "audio-reactive" and "structurally
// synced". Cuts must land on DOWNBEATS (bar starts), not approximate beats.
//
// Source of truth is Beat This! (CPJKU/beat_this, ISMIR 2024 SOTA) run as a
// one-shot Python sidecar — `scripts/music-video/beatgrid.py` — which emits a
// JSON grid per audio file. When no grid exists yet, we synthesize one from the
// static bpm field so the pipeline degrades gracefully instead of failing.

export interface BeatGrid {
  beats: number[] // every beat onset, seconds
  downbeats: number[] // bar starts (beat 1 of each bar), seconds
  bpm: number
  source: 'beat-this' | 'bpm-fallback'
}

// Load a real grid emitted by the Beat This! sidecar.
export function loadBeatGrid(jsonPath: string): BeatGrid | null {
  if (!existsSync(jsonPath)) return null
  try {
    const raw = JSON.parse(readFileSync(jsonPath, 'utf8'))
    if (!Array.isArray(raw.beats) || !Array.isArray(raw.downbeats)) return null
    return {
      beats: raw.beats,
      downbeats: raw.downbeats,
      bpm: raw.bpm ?? deriveBpm(raw.beats),
      source: 'beat-this',
    }
  } catch {
    return null
  }
}

// Synthesize a grid from a known bpm — the graceful fallback. Assumes 4/4 and a
// downbeat every 4 beats from t=0. Good enough to land cuts on bars when we
// don't have onset-accurate detection.
export function beatGridFromBpm(bpm: number, durationSec: number): BeatGrid {
  const beatSec = 60 / bpm
  const beats: number[] = []
  const downbeats: number[] = []
  let i = 0
  for (let t = 0; t < durationSec; t += beatSec, i++) {
    beats.push(round(t))
    if (i % 4 === 0) downbeats.push(round(t))
  }
  return { beats, downbeats, bpm, source: 'bpm-fallback' }
}

// Snap an arbitrary time to the nearest downbeat at or after it (so a shot
// boundary never lands mid-bar). Falls back to the input if no downbeat ahead.
export function snapToDownbeat(sec: number, grid: BeatGrid): number {
  const next = grid.downbeats.find((d) => d >= sec - 0.05)
  return next != null ? next : sec
}

// The downbeat at or after `fromSec` that is closest to `fromSec + targetLenSec`
// — used by the planner to size a shot to a whole number of bars near the target.
export function nextBarBoundary(fromSec: number, targetLenSec: number, grid: BeatGrid): number {
  const target = fromSec + targetLenSec
  const candidates = grid.downbeats.filter((d) => d > fromSec + 0.1)
  if (candidates.length === 0) return target
  return candidates.reduce((best, d) => (Math.abs(d - target) < Math.abs(best - target) ? d : best))
}

function deriveBpm(beats: number[]): number {
  if (beats.length < 2) return 120
  const intervals = beats.slice(1).map((b, i) => b - beats[i])
  const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length
  return Math.round(60 / avg)
}

function round(n: number): number {
  return Math.round(n * 1000) / 1000
}
