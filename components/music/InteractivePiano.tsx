'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getSongProgress,
  recordAttempt,
  getVolume,
  setVolume as persistVolume,
  bumpDailySession,
  getDailySession,
  totalStars,
  type SongProgress,
} from '@/lib/piano-progress'

// ── Note Frequencies (C4 to C6, two octaves) ────────────────────────────────

interface NoteDef {
  note: string
  freq: number
  label: string
  black: boolean
  finger?: number // optional finger hint 1-5 for guided mode
}

const NOTES: NoteDef[] = [
  { note: 'C4', freq: 261.63, label: 'C', black: false },
  { note: 'C#4', freq: 277.18, label: 'C#', black: true },
  { note: 'D4', freq: 293.66, label: 'D', black: false },
  { note: 'D#4', freq: 311.13, label: 'D#', black: true },
  { note: 'E4', freq: 329.63, label: 'E', black: false },
  { note: 'F4', freq: 349.23, label: 'F', black: false },
  { note: 'F#4', freq: 369.99, label: 'F#', black: true },
  { note: 'G4', freq: 392.0, label: 'G', black: false },
  { note: 'G#4', freq: 415.3, label: 'G#', black: true },
  { note: 'A4', freq: 440.0, label: 'A', black: false },
  { note: 'A#4', freq: 466.16, label: 'A#', black: true },
  { note: 'B4', freq: 493.88, label: 'B', black: false },
  { note: 'C5', freq: 523.25, label: 'C', black: false },
  { note: 'C#5', freq: 554.37, label: 'C#', black: true },
  { note: 'D5', freq: 587.33, label: 'D', black: false },
  { note: 'D#5', freq: 622.25, label: 'D#', black: true },
  { note: 'E5', freq: 659.26, label: 'E', black: false },
  { note: 'F5', freq: 698.46, label: 'F', black: false },
  { note: 'F#5', freq: 739.99, label: 'F#', black: true },
  { note: 'G5', freq: 783.99, label: 'G', black: false },
  { note: 'G#5', freq: 830.61, label: 'G#', black: true },
  { note: 'A5', freq: 880.0, label: 'A', black: false },
  { note: 'A#5', freq: 932.33, label: 'A#', black: true },
  { note: 'B5', freq: 987.77, label: 'B', black: false },
  { note: 'C6', freq: 1046.5, label: 'C', black: false },
]

// Keyboard mapping (computer keyboard → piano notes) — extends desktop play
const KEY_TO_NOTE: Record<string, string> = {
  // Lower octave
  z: 'C4', s: 'C#4', x: 'D4', d: 'D#4', c: 'E4',
  v: 'F4', g: 'F#4', b: 'G4', h: 'G#4', n: 'A4', j: 'A#4', m: 'B4',
  // Upper octave
  q: 'C5', '2': 'C#5', w: 'D5', '3': 'D#5', e: 'E5',
  r: 'F5', '5': 'F#5', t: 'G5', '6': 'G#5', y: 'A5', '7': 'A#5', u: 'B5',
  i: 'C6',
}

// ── Songs (note sequences with timing) ──────────────────────────────────────

export interface SongStep {
  note: string
  duration: number
}

export interface Song {
  name: string
  emoji: string
  notes: SongStep[]
}

export const SONGS: Record<string, Song> = {
  twinkle: {
    name: 'Twinkle Twinkle',
    emoji: '⭐',
    notes: [
      { note: 'C4', duration: 0.4 }, { note: 'C4', duration: 0.4 },
      { note: 'G4', duration: 0.4 }, { note: 'G4', duration: 0.4 },
      { note: 'A4', duration: 0.4 }, { note: 'A4', duration: 0.4 },
      { note: 'G4', duration: 0.8 },
      { note: 'F4', duration: 0.4 }, { note: 'F4', duration: 0.4 },
      { note: 'E4', duration: 0.4 }, { note: 'E4', duration: 0.4 },
      { note: 'D4', duration: 0.4 }, { note: 'D4', duration: 0.4 },
      { note: 'C4', duration: 0.8 },
    ],
  },
  entchen: {
    name: 'Alle meine Entchen',
    emoji: '🦆',
    notes: [
      { note: 'C4', duration: 0.3 }, { note: 'D4', duration: 0.3 },
      { note: 'E4', duration: 0.3 }, { note: 'F4', duration: 0.3 },
      { note: 'G4', duration: 0.5 }, { note: 'G4', duration: 0.5 },
      { note: 'A4', duration: 0.3 }, { note: 'A4', duration: 0.3 },
      { note: 'A4', duration: 0.3 }, { note: 'A4', duration: 0.3 },
      { note: 'G4', duration: 0.8 },
    ],
  },
  ode: {
    name: 'Ode an die Freude',
    emoji: '🎵',
    notes: [
      { note: 'E4', duration: 0.4 }, { note: 'E4', duration: 0.4 },
      { note: 'F4', duration: 0.4 }, { note: 'G4', duration: 0.4 },
      { note: 'G4', duration: 0.4 }, { note: 'F4', duration: 0.4 },
      { note: 'E4', duration: 0.4 }, { note: 'D4', duration: 0.4 },
      { note: 'C4', duration: 0.4 }, { note: 'C4', duration: 0.4 },
      { note: 'D4', duration: 0.4 }, { note: 'E4', duration: 0.4 },
      { note: 'E4', duration: 0.6 }, { note: 'D4', duration: 0.2 },
      { note: 'D4', duration: 0.8 },
    ],
  },
  birthday: {
    name: 'Happy Birthday',
    emoji: '🎂',
    notes: [
      { note: 'G4', duration: 0.3 }, { note: 'G4', duration: 0.2 },
      { note: 'A4', duration: 0.5 }, { note: 'G4', duration: 0.5 },
      { note: 'C5', duration: 0.5 }, { note: 'B4', duration: 0.8 },
      { note: 'G4', duration: 0.3 }, { note: 'G4', duration: 0.2 },
      { note: 'A4', duration: 0.5 }, { note: 'G4', duration: 0.5 },
      { note: 'D5', duration: 0.5 }, { note: 'C5', duration: 0.8 },
    ],
  },
  totoro: {
    name: 'My Neighbor Totoro',
    emoji: '🌳',
    notes: [
      { note: 'E5', duration: 0.3 }, { note: 'D5', duration: 0.3 },
      { note: 'C5', duration: 0.6 }, { note: 'E5', duration: 0.3 },
      { note: 'D5', duration: 0.3 }, { note: 'C5', duration: 0.3 },
      { note: 'D5', duration: 0.3 }, { note: 'E5', duration: 0.6 },
      { note: 'G5', duration: 0.3 }, { note: 'E5', duration: 0.6 },
      { note: 'D5', duration: 0.3 }, { note: 'C5', duration: 0.8 },
    ],
  },
  spirited: {
    name: 'Always With Me',
    emoji: '🐉',
    notes: [
      { note: 'E4', duration: 0.5 }, { note: 'G4', duration: 0.5 },
      { note: 'A4', duration: 0.5 }, { note: 'B4', duration: 0.5 },
      { note: 'A4', duration: 0.5 }, { note: 'G4', duration: 0.5 },
      { note: 'E4', duration: 1.0 },
      { note: 'D4', duration: 0.5 }, { note: 'E4', duration: 0.5 },
      { note: 'G4', duration: 1.0 },
    ],
  },
  furElise: {
    name: 'Für Elise',
    emoji: '🎹',
    notes: [
      { note: 'E5', duration: 0.3 }, { note: 'D#5', duration: 0.3 },
      { note: 'E5', duration: 0.3 }, { note: 'D#5', duration: 0.3 },
      { note: 'E5', duration: 0.3 }, { note: 'B4', duration: 0.3 },
      { note: 'D5', duration: 0.3 }, { note: 'C5', duration: 0.3 },
      { note: 'A4', duration: 0.6 },
      { note: 'C4', duration: 0.3 }, { note: 'E4', duration: 0.3 },
      { note: 'A4', duration: 0.3 }, { note: 'B4', duration: 0.6 },
    ],
  },
  jingleBells: {
    name: 'Jingle Bells',
    emoji: '🔔',
    notes: [
      { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.6 },
      { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.6 },
      { note: 'E4', duration: 0.3 }, { note: 'G4', duration: 0.3 }, { note: 'C4', duration: 0.3 },
      { note: 'D4', duration: 0.3 }, { note: 'E4', duration: 0.8 },
    ],
  },
  maryLamb: {
    name: 'Mary Had a Little Lamb',
    emoji: '🐑',
    notes: [
      { note: 'E4', duration: 0.4 }, { note: 'D4', duration: 0.4 }, { note: 'C4', duration: 0.4 },
      { note: 'D4', duration: 0.4 }, { note: 'E4', duration: 0.4 }, { note: 'E4', duration: 0.4 },
      { note: 'E4', duration: 0.8 }, { note: 'D4', duration: 0.4 }, { note: 'D4', duration: 0.4 },
      { note: 'D4', duration: 0.8 }, { note: 'E4', duration: 0.4 }, { note: 'G4', duration: 0.4 },
      { note: 'G4', duration: 0.8 },
    ],
  },
  canon: {
    name: 'Canon in D',
    emoji: '🎶',
    notes: [
      { note: 'A4', duration: 0.5 }, { note: 'F#4', duration: 0.5 },
      { note: 'G4', duration: 0.5 }, { note: 'E4', duration: 0.5 },
      { note: 'F#4', duration: 0.5 }, { note: 'D4', duration: 0.5 },
      { note: 'E4', duration: 0.5 }, { note: 'F#4', duration: 0.5 },
      { note: 'G4', duration: 0.5 }, { note: 'A4', duration: 0.5 },
      { note: 'B4', duration: 0.5 }, { note: 'A4', duration: 0.5 },
    ],
  },
  amazingGrace: {
    name: 'Amazing Grace',
    emoji: '✨',
    notes: [
      { note: 'G4', duration: 0.5 }, { note: 'C5', duration: 0.8 },
      { note: 'E5', duration: 0.3 }, { note: 'C5', duration: 0.5 },
      { note: 'E5', duration: 0.5 }, { note: 'D5', duration: 0.8 },
      { note: 'C5', duration: 0.5 }, { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 0.8 },
    ],
  },
  scarborough: {
    name: 'Scarborough Fair',
    emoji: '🌿',
    notes: [
      { note: 'A4', duration: 0.5 }, { note: 'A4', duration: 0.5 },
      { note: 'E5', duration: 0.8 }, { note: 'D5', duration: 0.5 },
      { note: 'E5', duration: 0.5 }, { note: 'F5', duration: 0.5 },
      { note: 'E5', duration: 0.8 }, { note: 'C5', duration: 0.5 },
      { note: 'A4', duration: 0.8 },
    ],
  },
  greensleeves: {
    name: 'Greensleeves',
    emoji: '🏰',
    notes: [
      { note: 'A4', duration: 0.5 }, { note: 'C5', duration: 0.8 },
      { note: 'D5', duration: 0.4 }, { note: 'E5', duration: 0.6 },
      { note: 'F5', duration: 0.3 }, { note: 'E5', duration: 0.5 },
      { note: 'D5', duration: 0.8 }, { note: 'B4', duration: 0.5 },
      { note: 'G4', duration: 0.4 }, { note: 'A4', duration: 0.3 },
      { note: 'B4', duration: 0.5 }, { note: 'C5', duration: 0.8 },
      { note: 'A4', duration: 1.0 },
    ],
  },
  bruderJakob: {
    name: 'Bruder Jakob',
    emoji: '⛪',
    notes: [
      { note: 'C4', duration: 0.4 }, { note: 'D4', duration: 0.4 },
      { note: 'E4', duration: 0.4 }, { note: 'C4', duration: 0.4 },
      { note: 'C4', duration: 0.4 }, { note: 'D4', duration: 0.4 },
      { note: 'E4', duration: 0.4 }, { note: 'C4', duration: 0.4 },
      { note: 'E4', duration: 0.4 }, { note: 'F4', duration: 0.4 },
      { note: 'G4', duration: 0.8 },
    ],
  },
  clairDeLune: {
    name: 'Clair de Lune',
    emoji: '🌙',
    notes: [
      { note: 'E4', duration: 0.6 }, { note: 'F4', duration: 0.3 },
      { note: 'G4', duration: 0.8 }, { note: 'A4', duration: 0.3 },
      { note: 'G4', duration: 0.6 }, { note: 'F4', duration: 0.3 },
      { note: 'E4', duration: 0.8 }, { note: 'D4', duration: 0.3 },
      { note: 'C4', duration: 1.0 },
    ],
  },
  gymnopedie: {
    name: 'Gymnopédie No.1',
    emoji: '🎭',
    notes: [
      { note: 'D5', duration: 0.8 }, { note: 'A4', duration: 0.4 },
      { note: 'G4', duration: 0.8 }, { note: 'F#4', duration: 0.4 },
      { note: 'E4', duration: 0.8 }, { note: 'D4', duration: 0.4 },
      { note: 'B4', duration: 0.8 }, { note: 'A4', duration: 0.4 },
      { note: 'D5', duration: 1.0 },
    ],
  },
  riverFlows: {
    name: 'River Flows in You',
    emoji: '🌊',
    notes: [
      { note: 'A4', duration: 0.3 }, { note: 'B4', duration: 0.3 },
      { note: 'C#5', duration: 0.3 }, { note: 'B4', duration: 0.3 },
      { note: 'A4', duration: 0.5 }, { note: 'E4', duration: 0.5 },
      { note: 'A4', duration: 0.3 }, { note: 'B4', duration: 0.3 },
      { note: 'C#5', duration: 0.3 }, { note: 'B4', duration: 0.3 },
      { note: 'A4', duration: 0.3 }, { note: 'G#4', duration: 0.3 },
      { note: 'A4', duration: 0.8 },
    ],
  },
  amelie: {
    name: 'Comptine (Amélie)',
    emoji: '🎬',
    notes: [
      { note: 'E5', duration: 0.3 }, { note: 'D5', duration: 0.3 },
      { note: 'E5', duration: 0.3 }, { note: 'B4', duration: 0.3 },
      { note: 'D5', duration: 0.3 }, { note: 'C5', duration: 0.3 },
      { note: 'E5', duration: 0.3 }, { note: 'D5', duration: 0.3 },
      { note: 'E5', duration: 0.3 }, { note: 'B4', duration: 0.3 },
      { note: 'C5', duration: 0.5 }, { note: 'E4', duration: 0.8 },
    ],
  },
  merry: {
    name: 'Merry-Go-Round (Howl)',
    emoji: '🏰',
    notes: [
      { note: 'E4', duration: 0.5 }, { note: 'F4', duration: 0.3 },
      { note: 'G4', duration: 0.5 }, { note: 'C5', duration: 0.3 },
      { note: 'B4', duration: 0.5 }, { note: 'A4', duration: 0.3 },
      { note: 'G4', duration: 0.5 }, { note: 'F4', duration: 0.3 },
      { note: 'E4', duration: 0.5 }, { note: 'D4', duration: 0.3 },
      { note: 'C4', duration: 0.8 },
    ],
  },
}

// ── Audio Engine — warmer triangle+sine with reverb + master volume ─────────

interface AudioEngine {
  playNote: (frequency: number, duration?: number) => void
  playChime: () => void
  setMasterVolume: (v: number) => void
  resume: () => void
}

function useAudio(): AudioEngine {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const reverbRef = useRef<ConvolverNode | null>(null)
  const dryRef = useRef<GainNode | null>(null)
  const wetRef = useRef<GainNode | null>(null)

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      const ctx = new AudioContext()
      ctxRef.current = ctx

      // Master gain — controlled by volume slider
      const master = ctx.createGain()
      master.gain.value = getVolume()
      masterRef.current = master

      // Compressor — keeps peaks safe even at higher volume
      const comp = ctx.createDynamicsCompressor()
      comp.threshold.value = -10
      comp.knee.value = 12
      comp.ratio.value = 2.5
      comp.attack.value = 0.005
      comp.release.value = 0.15
      master.connect(comp)
      comp.connect(ctx.destination)

      // Tiny convolver reverb (10% wet)
      const reverb = ctx.createConvolver()
      const rate = ctx.sampleRate
      const len = rate * 1.5
      const buf = ctx.createBuffer(2, len, rate)
      for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch)
        for (let i = 0; i < len; i++) {
          const t = i / rate
          d[i] = Math.exp(-3.0 * t) * (Math.random() * 2 - 1) * 0.4
        }
      }
      reverb.buffer = buf
      reverbRef.current = reverb

      const dry = ctx.createGain()
      dry.gain.value = 0.88
      const wet = ctx.createGain()
      wet.gain.value = 0.12
      dryRef.current = dry
      wetRef.current = wet

      dry.connect(master)
      reverb.connect(wet)
      wet.connect(master)
    }
    if (ctxRef.current.state === 'suspended') {
      void ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const playNote = useCallback((frequency: number, duration = 0.6) => {
    const ctx = ensureCtx()
    const dry = dryRef.current!
    const reverb = reverbRef.current!
    const now = ctx.currentTime

    // Two-osc warmth: triangle (fundamental) + sine (octave below at 0.4 of triangle)
    const noteGain = ctx.createGain()
    noteGain.gain.value = 0
    noteGain.connect(dry)
    noteGain.connect(reverb)

    // ADSR envelope (attack 0.01, decay 0.12, sustain 0.65, release 0.45)
    const peak = 0.55
    const sustain = peak * 0.65
    noteGain.gain.setValueAtTime(0, now)
    noteGain.gain.linearRampToValueAtTime(peak, now + 0.012)
    noteGain.gain.exponentialRampToValueAtTime(Math.max(sustain, 0.001), now + 0.14)
    noteGain.gain.setValueAtTime(Math.max(sustain, 0.001), now + Math.max(duration - 0.4, 0.02))
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.4)

    // Subtle lowpass for warmth (no harsh harmonics)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 4200
    lp.Q.value = 0.7
    lp.connect(noteGain)

    const tri = ctx.createOscillator()
    tri.type = 'triangle'
    tri.frequency.value = frequency
    const triGain = ctx.createGain()
    triGain.gain.value = 0.85
    tri.connect(triGain)
    triGain.connect(lp)

    const sine = ctx.createOscillator()
    sine.type = 'sine'
    sine.frequency.value = frequency * 0.5 // octave below
    const sineGain = ctx.createGain()
    sineGain.gain.value = 0.35
    sine.connect(sineGain)
    sineGain.connect(lp)

    tri.start(now)
    sine.start(now)
    tri.stop(now + duration + 0.5)
    sine.stop(now + duration + 0.5)
  }, [ensureCtx])

  const playChime = useCallback(() => {
    // Soft "✓" reward chime — 1320 Hz sine, very short
    const ctx = ensureCtx()
    const dry = dryRef.current!
    const reverb = reverbRef.current!
    const now = ctx.currentTime
    const gain = ctx.createGain()
    gain.gain.value = 0
    gain.connect(dry)
    gain.connect(reverb)
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.3, now + 0.005)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)
    const o = ctx.createOscillator()
    o.type = 'sine'
    o.frequency.setValueAtTime(1320, now)
    o.frequency.exponentialRampToValueAtTime(1760, now + 0.12)
    o.connect(gain)
    o.start(now)
    o.stop(now + 0.25)
  }, [ensureCtx])

  const setMasterVolume = useCallback((v: number) => {
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.setTargetAtTime(v, ctxRef.current.currentTime, 0.05)
    }
  }, [])

  const resume = useCallback(() => {
    ensureCtx()
  }, [ensureCtx])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ctxRef.current && ctxRef.current.state !== 'closed') {
        try { void ctxRef.current.close() } catch { /* ok */ }
      }
    }
  }, [])

  return { playNote, playChime, setMasterVolume, resume }
}

// ── Helper: stars badge ─────────────────────────────────────────────────────

function StarsBadge({ stars, size = 'sm' }: { stars: 0 | 1 | 2 | 3; size?: 'sm' | 'md' }) {
  const cls = size === 'md' ? 'text-base' : 'text-xs'
  if (stars === 0) return null
  return (
    <span className={`${cls} text-amber-500 font-medium`} aria-label={`${stars} von 3 Sternen`}>
      {'⭐'.repeat(stars)}
      <span className="text-slate-300">{'☆'.repeat(3 - stars)}</span>
    </span>
  )
}

// ── Main Component ──────────────────────────────────────────────────────────

interface InteractivePianoProps {
  showLabels?: boolean
  compact?: boolean
  childMode?: boolean
  /** When true, "Geführter Modus" defaults ON (recommended for kids). */
  guidedDefault?: boolean
}

type Mode = 'free' | 'guided'

interface GuidedState {
  songId: string
  step: number // index into song.notes
  misses: number
  startedAt: number
}

export default function InteractivePiano({
  showLabels = true,
  compact = false,
  childMode = false,
  guidedDefault = false,
}: InteractivePianoProps) {
  const audio = useAudio()

  // Audio + UX state
  const [mode, setMode] = useState<Mode>(guidedDefault ? 'guided' : 'free')
  const [activeNote, setActiveNote] = useState<string | null>(null)
  const [highlightedNote, setHighlightedNote] = useState<string | null>(null)
  const [volume, setVolumeState] = useState(1.0)

  // Free mode (auto-play) state
  const [autoPlaying, setAutoPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState<string | null>(null)
  const stopRef = useRef(false)

  // Guided mode state
  const [guided, setGuided] = useState<GuidedState | null>(null)
  const [completion, setCompletion] = useState<{ songId: string; stars: 0 | 1 | 2 | 3 } | null>(null)

  // Progress (lazy-init from localStorage)
  const [progress, setProgress] = useState<Record<string, SongProgress>>({})
  const [todayMins, setTodayMins] = useState(0)
  const [totalStarsCount, setTotalStarsCount] = useState(0)

  const whiteKeys = NOTES.filter((n) => !n.black)
  const blackKeys = NOTES.filter((n) => n.black)

  // Hydrate progress from localStorage on mount
  useEffect(() => {
    const all: Record<string, SongProgress> = {}
    for (const id of Object.keys(SONGS)) {
      const p = getSongProgress(id)
      if (p) all[id] = p
    }
    setProgress(all)
    setTotalStarsCount(totalStars(all))
    const session = getDailySession()
    setTodayMins(Math.floor(session.practiceSeconds / 60))
    setVolumeState(getVolume())
  }, [])

  // Track practice time (every 30 s while page is active)
  useEffect(() => {
    const tick = () => {
      const next = bumpDailySession({ practiceSeconds: 30 })
      setTodayMins(Math.floor(next.practiceSeconds / 60))
    }
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  // Apply volume to audio engine + persist
  useEffect(() => {
    audio.setMasterVolume(volume)
    persistVolume(volume)
  }, [volume, audio])

  // ── Key press dispatcher (touch / mouse / keyboard) ──────────────────────

  const handleKeyPress = useCallback(
    (note: NoteDef) => {
      audio.resume()
      audio.playNote(note.freq, mode === 'guided' ? 0.7 : 0.6)
      setActiveNote(note.note)
      window.setTimeout(() => setActiveNote((cur) => (cur === note.note ? null : cur)), 220)

      // In guided mode, advance song state when correct note hit
      if (mode === 'guided' && guided) {
        const song = SONGS[guided.songId]
        const expected = song.notes[guided.step]?.note
        if (note.note === expected) {
          window.setTimeout(() => audio.playChime(), 120)
          const nextStep = guided.step + 1
          if (nextStep >= song.notes.length) {
            // Song complete!
            const result = recordAttempt(guided.songId, guided.misses)
            setProgress((prev) => ({ ...prev, [guided.songId]: result }))
            setTotalStarsCount((s) => s + result.lastStars)
            setCompletion({ songId: guided.songId, stars: result.lastStars })
            setGuided(null)
            setHighlightedNote(null)
          } else {
            setGuided({ ...guided, step: nextStep })
            setHighlightedNote(song.notes[nextStep].note)
          }
        } else {
          // Wrong note — count miss but don't punish; the highlight teaches
          setGuided({ ...guided, misses: guided.misses + 1 })
        }
      }
    },
    [audio, mode, guided]
  )

  // Computer keyboard listener (desktop play)
  useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key.toLowerCase()
      const noteName = KEY_TO_NOTE[k]
      if (noteName) {
        const note = NOTES.find((n) => n.note === noteName)
        if (note) {
          e.preventDefault()
          handleKeyPress(note)
        }
      }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [handleKeyPress])

  // ── Free mode: auto-play song with key highlighting ──────────────────────

  const playSongAuto = useCallback(
    async (songId: string) => {
      const song = SONGS[songId]
      if (!song || autoPlaying) return
      audio.resume()
      setAutoPlaying(true)
      setCurrentSong(songId)
      stopRef.current = false

      for (const step of song.notes) {
        if (stopRef.current) break
        const noteData = NOTES.find((n) => n.note === step.note)
        if (noteData) {
          audio.playNote(noteData.freq, step.duration)
          setHighlightedNote(step.note)
          await new Promise((r) => setTimeout(r, step.duration * 1000 + 80))
        }
      }
      setHighlightedNote(null)
      setAutoPlaying(false)
      setCurrentSong(null)
    },
    [audio, autoPlaying]
  )

  const stopSongAuto = useCallback(() => {
    stopRef.current = true
  }, [])

  // ── Guided mode controls ─────────────────────────────────────────────────

  const startGuided = useCallback((songId: string) => {
    const song = SONGS[songId]
    if (!song) return
    audio.resume()
    setCompletion(null)
    setGuided({ songId, step: 0, misses: 0, startedAt: Date.now() })
    setHighlightedNote(song.notes[0].note)
    setCurrentSong(songId)
  }, [audio])

  const stopGuided = useCallback(() => {
    setGuided(null)
    setHighlightedNote(null)
    setCurrentSong(null)
    setCompletion(null)
  }, [])

  const previewNote = useCallback((note: string) => {
    const n = NOTES.find((x) => x.note === note)
    if (n) {
      audio.resume()
      audio.playNote(n.freq, 0.6)
      setActiveNote(note)
      window.setTimeout(() => setActiveNote((cur) => (cur === note ? null : cur)), 220)
    }
  }, [audio])

  // Keep refs/state coherent on unmount
  useEffect(() => () => { stopRef.current = true }, [])

  // ── Render ───────────────────────────────────────────────────────────────

  const keyHeight = compact ? 'h-28' : 'h-36 sm:h-44'
  const blackKeyHeight = compact ? 'h-16' : 'h-20 sm:h-28'

  const expectedNote = guided ? SONGS[guided.songId].notes[guided.step]?.note : null
  const guidedSong = guided ? SONGS[guided.songId] : null

  const labels = childMode ? GERMAN_LABELS : ENGLISH_LABELS

  return (
    <div className="mx-auto max-w-3xl">
      {/* ── Top toolbar: mode toggle + volume + today's stats ─────────────── */}
      <div className={`mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl ${childMode ? 'bg-white/70' : 'bg-white/[0.04]'} px-4 py-3`}>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => { setMode('free'); stopGuided() }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition active:scale-95 ${
              mode === 'free'
                ? childMode ? 'bg-violet-500 text-white shadow-md' : 'bg-violet-500/30 text-violet-200'
                : childMode ? 'bg-white text-slate-600 hover:bg-slate-50' : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
            aria-pressed={mode === 'free'}
          >
            🎵 {labels.freeMode}
          </button>
          <button
            type="button"
            onClick={() => { setMode('guided'); stopSongAuto() }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition active:scale-95 ${
              mode === 'guided'
                ? childMode ? 'bg-emerald-500 text-white shadow-md' : 'bg-emerald-500/30 text-emerald-200'
                : childMode ? 'bg-white text-slate-600 hover:bg-slate-50' : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
            aria-pressed={mode === 'guided'}
          >
            ✨ {labels.guidedMode}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Today's stats */}
          {(todayMins > 0 || totalStarsCount > 0) && (
            <div className={`text-xs ${childMode ? 'text-slate-500' : 'text-white/40'} hidden sm:flex gap-3`}>
              {todayMins > 0 && <span>{labels.todayLabel}: <strong className="text-amber-500">{todayMins} {labels.minLabel}</strong></span>}
              {totalStarsCount > 0 && <span>⭐ {totalStarsCount}</span>}
            </div>
          )}

          {/* Volume slider */}
          <label className="flex items-center gap-2">
            <span className={`text-xs ${childMode ? 'text-slate-500' : 'text-white/40'}`} aria-label={labels.volumeLabel}>🔊</span>
            <input
              type="range"
              min="0"
              max="1.5"
              step="0.05"
              value={volume}
              onChange={(e) => setVolumeState(parseFloat(e.target.value))}
              className="h-1.5 w-24 cursor-pointer accent-violet-500"
              aria-label={labels.volumeLabel}
            />
          </label>
        </div>
      </div>

      {/* ── Guided mode banner: shows next note + finger hint ─────────────── */}
      <AnimatePresence>
        {mode === 'guided' && guided && guidedSong && expectedNote && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-3 flex items-center justify-between gap-3 rounded-xl px-4 py-3 ${
              childMode ? 'bg-emerald-50 border border-emerald-200' : 'bg-emerald-500/10 border border-emerald-500/20'
            }`}
          >
            <div className={childMode ? 'text-slate-700' : 'text-white/80'}>
              <p className="text-xs font-medium uppercase tracking-wide opacity-60">
                {guidedSong.emoji} {guidedSong.name} · {labels.noteLabel} {guided.step + 1} / {guidedSong.notes.length}
              </p>
              <p className="mt-1 text-base font-bold">
                {labels.pressTheKey}{' '}
                <span className="rounded-full bg-violet-500 px-3 py-0.5 text-white">
                  {NOTES.find((n) => n.note === expectedNote)?.label ?? expectedNote}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => previewNote(expectedNote)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  childMode ? 'bg-white text-emerald-700 hover:bg-emerald-100' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                🎧 {labels.hear}
              </button>
              <button
                type="button"
                onClick={stopGuided}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  childMode ? 'bg-white text-slate-500 hover:bg-slate-100' : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                ✕ {labels.stop}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Completion overlay (after guided finish) ──────────────────────── */}
      <AnimatePresence>
        {completion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`mb-3 rounded-2xl px-4 py-5 text-center ${
              childMode ? 'bg-gradient-to-br from-amber-100 to-rose-100' : 'bg-gradient-to-br from-amber-500/20 to-rose-500/20'
            }`}
          >
            <p className="text-4xl">{'⭐'.repeat(completion.stars)}{'☆'.repeat(3 - completion.stars)}</p>
            <p className={`mt-2 text-xl font-bold ${childMode ? 'text-amber-700' : 'text-amber-300'}`}>
              {completion.stars === 3 ? labels.perfect : completion.stars === 2 ? labels.greatJob : labels.completed}
            </p>
            <p className={`mt-1 text-sm ${childMode ? 'text-slate-600' : 'text-white/60'}`}>
              {SONGS[completion.songId].emoji} {SONGS[completion.songId].name}
            </p>
            <div className="mt-3 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => { const id = completion.songId; setCompletion(null); startGuided(id) }}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  childMode ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-emerald-500/30 text-emerald-200 hover:bg-emerald-500/40'
                }`}
              >
                🔄 {labels.again}
              </button>
              <button
                type="button"
                onClick={() => setCompletion(null)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  childMode ? 'bg-white text-slate-600 hover:bg-slate-50' : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {labels.pickAnother}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Piano Keyboard ─────────────────────────────────────────────────── */}
      <div className="relative mx-auto overflow-x-auto rounded-2xl border-2 border-slate-200 bg-slate-900 p-2 shadow-xl">
        <div className="relative flex min-w-[600px]">
          {/* White keys */}
          {whiteKeys.map((note) => {
            const isActive = activeNote === note.note
            const isExpected = expectedNote === note.note
            const isAutoHighlight = highlightedNote === note.note && mode === 'free'
            return (
              <button
                key={note.note}
                type="button"
                onClick={() => handleKeyPress(note)}
                aria-label={`${childMode ? note.label : note.note} ${childMode ? 'spielen' : 'play'}`}
                className={`relative flex-1 ${keyHeight} rounded-b-lg border border-slate-300 transition-all ${
                  isActive
                    ? 'bg-violet-300 shadow-inner scale-[0.98]'
                    : isExpected
                      ? 'bg-emerald-200 animate-pulse-slow shadow-[0_0_24px_rgba(16,185,129,0.5)]'
                      : isAutoHighlight
                        ? 'bg-violet-300 shadow-inner'
                        : 'bg-white hover:bg-slate-50 active:bg-violet-200'
                }`}
              >
                {showLabels && (
                  <span
                    className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold ${
                      isExpected ? 'text-emerald-800' : isActive || isAutoHighlight ? 'text-violet-700' : 'text-slate-400'
                    }`}
                  >
                    {note.label}
                  </span>
                )}
              </button>
            )
          })}
          {/* Black keys — positioned absolutely */}
          {blackKeys.map((note) => {
            const whiteIndex = whiteKeys.findIndex((w) => {
              const noteIdx = NOTES.indexOf(note)
              const prevWhite = NOTES.slice(0, noteIdx)
                .filter((n) => !n.black)
                .pop()
              return prevWhite && w.note === prevWhite.note
            })
            const totalWhite = whiteKeys.length
            const leftPercent = ((whiteIndex + 0.65) / totalWhite) * 100
            const isActive = activeNote === note.note
            const isExpected = expectedNote === note.note
            const isAutoHighlight = highlightedNote === note.note && mode === 'free'

            return (
              <button
                key={note.note}
                type="button"
                onClick={() => handleKeyPress(note)}
                aria-label={`${note.note} ${childMode ? 'spielen' : 'play'}`}
                className={`absolute top-2 z-10 w-[5%] ${blackKeyHeight} rounded-b-lg transition-all ${
                  isActive
                    ? 'bg-violet-600 shadow-inner'
                    : isExpected
                      ? 'bg-emerald-500 animate-pulse-slow shadow-[0_0_18px_rgba(16,185,129,0.7)]'
                      : isAutoHighlight
                        ? 'bg-violet-600 shadow-inner'
                        : 'bg-slate-800 hover:bg-slate-700 active:bg-violet-700'
                }`}
                style={{ left: `${leftPercent}%` }}
              />
            )
          })}
        </div>
      </div>

      {/* ── Song selector ──────────────────────────────────────────────────── */}
      <div className="mt-6">
        <p className={`mb-3 text-center text-sm font-medium ${childMode ? 'text-slate-600' : 'text-white/40'}`}>
          {mode === 'guided' ? labels.guidedHint : labels.freeHint}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(SONGS).map(([id, song]) => {
            const songProgress = progress[id]
            const isCurrentlyPlaying = currentSong === id && (autoPlaying || guided?.songId === id)
            const onClick = () => {
              if (mode === 'guided') {
                if (guided?.songId === id) stopGuided()
                else startGuided(id)
              } else {
                if (autoPlaying && currentSong === id) stopSongAuto()
                else void playSongAuto(id)
              }
            }
            return (
              <button
                key={id}
                type="button"
                onClick={onClick}
                disabled={(autoPlaying && currentSong !== id) || (!!guided && guided.songId !== id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition active:scale-95 ${
                  isCurrentlyPlaying
                    ? childMode
                      ? mode === 'guided'
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'bg-violet-500 text-white shadow-md'
                      : 'bg-violet-500/30 text-violet-300'
                    : childMode
                      ? 'bg-white/80 text-slate-700 shadow-sm hover:bg-white disabled:opacity-30'
                      : 'bg-white/10 text-white/60 hover:bg-white/15 disabled:opacity-30'
                }`}
              >
                <span className="mr-1">{song.emoji}</span>
                <span>{song.name}</span>
                {songProgress && songProgress.bestStars > 0 && (
                  <StarsBadge stars={songProgress.bestStars} />
                )}
                {isCurrentlyPlaying && <span className="ml-1">■</span>}
              </button>
            )
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// ── i18n labels ─────────────────────────────────────────────────────────────

const GERMAN_LABELS = {
  freeMode: 'Frei spielen',
  guidedMode: 'Geführter Modus',
  freeHint: 'Tippe auf ein Lied — die Tasten leuchten violett, das Klavier spielt!',
  guidedHint: 'Wähle ein Lied — drück die grün leuchtende Taste!',
  pressTheKey: 'Drück:',
  noteLabel: 'Note',
  hear: 'Hören',
  stop: 'Stopp',
  perfect: 'Perfekt!',
  greatJob: 'Sehr gut!',
  completed: 'Geschafft!',
  again: 'Nochmal',
  pickAnother: 'Anderes Lied',
  todayLabel: 'Heute',
  minLabel: 'Min',
  volumeLabel: 'Lautstärke',
}

const ENGLISH_LABELS = {
  freeMode: 'Free Play',
  guidedMode: 'Guided',
  freeHint: 'Pick a song — keys glow violet as it plays.',
  guidedHint: 'Pick a song — press the green-glowing key!',
  pressTheKey: 'Press:',
  noteLabel: 'Note',
  hear: 'Hear',
  stop: 'Stop',
  perfect: 'Perfect!',
  greatJob: 'Great job!',
  completed: 'Completed!',
  again: 'Again',
  pickAnother: 'Pick another',
  todayLabel: 'Today',
  minLabel: 'min',
  volumeLabel: 'Volume',
}
