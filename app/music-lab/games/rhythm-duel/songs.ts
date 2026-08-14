// Charts are generated, not authored. Every note a player hits is a real note in
// the arrangement, so a clean run sounds like the song and a sloppy run sounds
// like a sloppy performance of the song — there is no separate backing melody to
// play over. Generation is seeded so both players and every replay get the same
// chart.

export type Quality = 'maj' | 'min'
export type Style = 'tropical' | 'electro' | 'synthwave'
export type Difficulty = 'easy' | 'normal' | 'hard'

export interface Chord {
  root: number
  quality: Quality
}

export interface ChartNote {
  id: number
  t: number
  lane: number
  midi: number
  hold: number
}

export type BackingKind =
  | 'kick' | 'snare' | 'clap' | 'hat' | 'openhat' | 'ride' | 'shaker'
  | 'bass' | 'pad'

export interface BackingEvent {
  t: number
  kind: BackingKind
  midi?: number
  midis?: number[]
  dur?: number
  vel?: number
}

export interface SongDef {
  id: string
  title: string
  blurb: string
  bpm: number
  style: Style
  bars: number
  scale: number[]
  progression: Chord[]
  accent: string
}

export interface BuiltSong {
  def: SongDef
  duration: number
  leadIn: number
  backing: BackingEvent[]
  charts: ChartNote[][]
}

export const SONGS: SongDef[] = [
  {
    id: 'neon-sunrise',
    title: 'Neon Sunrise',
    blurb: 'Tropical house. Wide, warm, forgiving — the one to learn on.',
    bpm: 112,
    style: 'tropical',
    bars: 32,
    scale: [0, 2, 4, 7, 9], // C major pentatonic
    progression: [
      { root: 53, quality: 'maj' }, // F
      { root: 48, quality: 'maj' }, // C
      { root: 55, quality: 'maj' }, // G
      { root: 57, quality: 'min' }, // Am
    ],
    accent: '#22d3ee',
  },
  {
    id: 'midnight-circuit',
    title: 'Midnight Circuit',
    blurb: 'Electro house at 128. Straight four, clipped stabs, no mercy on hard.',
    bpm: 128,
    style: 'electro',
    bars: 32,
    scale: [9, 0, 2, 4, 7], // A minor pentatonic
    progression: [
      { root: 57, quality: 'min' }, // Am
      { root: 53, quality: 'maj' }, // F
      { root: 48, quality: 'maj' }, // C
      { root: 55, quality: 'maj' }, // G
    ],
    accent: '#a78bfa',
  },
  {
    id: 'solar-drive',
    title: 'Solar Drive',
    blurb: 'Synthwave at 140. Driving eighths and a lead that keeps climbing.',
    bpm: 140,
    style: 'synthwave',
    bars: 32,
    scale: [2, 5, 7, 9, 0], // D minor pentatonic
    progression: [
      { root: 50, quality: 'min' }, // Dm
      { root: 58, quality: 'maj' }, // Bb
      { root: 53, quality: 'maj' }, // F
      { root: 48, quality: 'maj' }, // C
    ],
    accent: '#f472b6',
  },
]

export const DIFFICULTY_SPEC: Record<Difficulty, { grid: number; density: number; label: string }> = {
  easy: { grid: 1, density: 0.62, label: 'Easy' },
  normal: { grid: 2, density: 0.52, label: 'Normal' },
  hard: { grid: 4, density: 0.44, label: 'Hard' },
}

// ─── Helpers ────────────────────────────────────────────────────────

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function scaleNotes(pitchClasses: number[], low: number, high: number): number[] {
  const out: number[] = []
  for (let m = low; m <= high; m++) if (pitchClasses.includes(m % 12)) out.push(m)
  return out
}

function chordPitchClasses(chord: Chord): number[] {
  const third = chord.quality === 'min' ? 3 : 4
  return [chord.root % 12, (chord.root + third) % 12, (chord.root + 7) % 12]
}

function chordVoicing(chord: Chord, low: number): number[] {
  const third = chord.quality === 'min' ? 3 : 4
  const root = low + (((chord.root % 12) - (low % 12) + 12) % 12)
  return [root, root + third, root + 7, root + 12]
}

/** Nearest index in `notes` whose pitch class is in the chord. */
function snapToChord(notes: number[], index: number, chord: Chord): number {
  const pcs = chordPitchClasses(chord)
  for (let d = 0; d < notes.length; d++) {
    const up = index + d
    if (up < notes.length && pcs.includes(notes[up] % 12)) return up
    const down = index - d
    if (down >= 0 && pcs.includes(notes[down] % 12)) return down
  }
  return index
}

// ─── Drum patterns (16 steps per bar) ───────────────────────────────

const S = (...steps: number[]) => steps

const DRUM_PATTERNS: Record<Style, Partial<Record<BackingKind, number[]>>> = {
  tropical: {
    kick: S(0, 4, 8, 12),
    clap: S(4, 12),
    openhat: S(2, 6, 10, 14),
    shaker: S(0, 2, 4, 6, 8, 10, 12, 14),
  },
  electro: {
    kick: S(0, 4, 8, 12),
    clap: S(4, 12),
    hat: S(2, 6, 10, 14),
    shaker: S(1, 3, 5, 7, 9, 11, 13, 15),
    openhat: S(14),
  },
  synthwave: {
    kick: S(0, 6, 8, 14),
    snare: S(4, 12),
    hat: S(0, 2, 4, 6, 8, 10, 12, 14),
    ride: S(0, 4, 8, 12),
  },
}

const BASS_PATTERNS: Record<Style, { step: number; oct: number }[]> = {
  tropical: [
    { step: 0, oct: 0 }, { step: 6, oct: 0 }, { step: 8, oct: 0 }, { step: 14, oct: 12 },
  ],
  electro: [
    { step: 2, oct: 0 }, { step: 6, oct: 0 }, { step: 10, oct: 0 }, { step: 14, oct: 12 },
  ],
  synthwave: [
    { step: 0, oct: 0 }, { step: 2, oct: 0 }, { step: 4, oct: 12 }, { step: 6, oct: 0 },
    { step: 8, oct: 0 }, { step: 10, oct: 0 }, { step: 12, oct: 12 }, { step: 14, oct: 0 },
  ],
}

// ─── Builder ────────────────────────────────────────────────────────

const LEAD_IN_BARS = 2

export function buildSong(def: SongDef, difficulty: Difficulty, players: number): BuiltSong {
  const beat = 60 / def.bpm
  const bar = beat * 4
  const step = bar / 16
  const leadIn = bar * LEAD_IN_BARS
  const totalBars = LEAD_IN_BARS + def.bars

  const backing: BackingEvent[] = []
  const drums = DRUM_PATTERNS[def.style]
  const bassPattern = BASS_PATTERNS[def.style]

  for (let b = 0; b < totalBars; b++) {
    const barStart = b * bar
    const chord = def.progression[b % def.progression.length]
    const playing = b >= LEAD_IN_BARS
    // Second lead-in bar drops the shaker so the downbeat lands clearly.
    const introOnly = b < LEAD_IN_BARS

    for (const [kind, steps] of Object.entries(drums) as [BackingKind, number[]][]) {
      if (introOnly && kind !== 'kick' && kind !== 'hat' && kind !== 'shaker') continue
      for (const s of steps) {
        backing.push({
          t: barStart + s * step,
          kind,
          vel: s % 4 === 0 ? 0.95 : 0.7,
        })
      }
    }

    if (!playing) continue

    for (const { step: s, oct } of bassPattern) {
      backing.push({
        t: barStart + s * step,
        kind: 'bass',
        midi: (chord.root - 24) + oct,
        dur: step * 1.6,
        vel: s === 0 ? 0.95 : 0.75,
      })
    }

    backing.push({
      t: barStart,
      kind: 'pad',
      midis: chordVoicing(chord, 55),
      dur: bar * 0.96,
      vel: 0.5,
    })
  }

  backing.sort((a, b) => a.t - b.t)

  const charts: ChartNote[][] = []
  for (let p = 0; p < players; p++) {
    charts.push(buildChart(def, difficulty, p, leadIn, bar, beat))
  }

  return {
    def,
    duration: totalBars * bar + beat * 2,
    leadIn,
    backing,
    charts,
  }
}

/**
 * Player 0 gets the lead line on the beat grid; player 1 gets a higher
 * counter-line pushed onto the offbeats, so two people playing at once
 * interlock instead of doubling each other.
 */
function buildChart(
  def: SongDef,
  difficulty: Difficulty,
  player: number,
  leadIn: number,
  bar: number,
  beat: number,
): ChartNote[] {
  const { grid, density } = DIFFICULTY_SPEC[difficulty]
  const rand = mulberry32(hashString(`${def.id}:${difficulty}:${player}`))
  const low = player === 0 ? 60 : 67
  const notes = scaleNotes(def.scale, low, low + 26)
  const slotsPerBar = 4 * grid
  const slotDur = bar / slotsPerBar
  const offbeat = player === 1 && grid > 1

  const out: ChartNote[] = []
  let index = Math.floor(notes.length / 2)
  let id = 0

  for (let b = 0; b < def.bars; b++) {
    const barStart = leadIn + b * bar
    const chord = def.progression[b % def.progression.length]
    // Four bars of breathing room at the top so players can read the highway.
    const warmup = b < 2 ? 0.55 : 1

    for (let s = 0; s < slotsPerBar; s++) {
      const strong = s % grid === 0
      const offSlot = grid > 1 && s % grid === grid / 2

      // Both players get the same note budget; only where the notes land
      // differs, so a duel is fair and the two lines still interlock.
      const weight = offbeat
        ? density + (offSlot ? 0.2 : strong ? -0.22 : -0.04)
        : density + (strong ? 0.18 : -0.12)
      if (rand() > weight * warmup) continue

      const walk = Math.round((rand() - 0.5) * 5)
      index = Math.max(0, Math.min(notes.length - 1, index + walk))
      if (strong) index = snapToChord(notes, index, chord)

      out.push({
        id: id++,
        t: barStart + s * slotDur,
        lane: ((index % 4) + 4) % 4,
        midi: notes[index],
        hold: 0,
      })
    }
  }

  out.sort((a, b) => a.t - b.t || a.lane - b.lane)

  // A gap of two beats or more becomes a hold, which is what gives the chart
  // its phrasing instead of a flat stream of taps.
  for (let i = 0; i < out.length; i++) {
    const next = out[i + 1]
    const gap = next ? next.t - out[i].t : beat * 2
    if (gap >= beat * 1.9) {
      out[i].hold = Math.min(gap - beat * 0.5, beat * 3)
    }
  }

  return out
}

export function chartStats(chart: ChartNote[]) {
  const holds = chart.filter(n => n.hold > 0).length
  return { total: chart.length, holds }
}
