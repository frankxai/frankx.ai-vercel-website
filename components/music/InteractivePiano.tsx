'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Note Frequencies (C4 to C6, two octaves) ────────────────────────────────

const NOTES = [
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

// ── Songs (note sequences with timing) ──────────────────────────────────────

export const SONGS: Record<string, { name: string; emoji: string; notes: { note: string; duration: number }[] }> = {
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

// ── Audio Engine ─────────────────────────────────────────────────────────────

function useAudio() {
  const ctxRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new AudioContext()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const playNote = useCallback(
    (frequency: number, duration = 0.6) => {
      const ctx = getCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.value = frequency
      gain.gain.value = 0.25
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + duration)
    },
    [getCtx]
  )

  return { playNote }
}

// ── Main Component ──────────────────────────────────────────────────────────

interface InteractivePianoProps {
  showLabels?: boolean
  compact?: boolean
  childMode?: boolean
}

export default function InteractivePiano({ showLabels = true, compact = false, childMode = false }: InteractivePianoProps) {
  const { playNote } = useAudio()
  const [activeNote, setActiveNote] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState<string | null>(null)
  const [highlightedNote, setHighlightedNote] = useState<string | null>(null)
  const stopRef = useRef(false)

  const whiteKeys = NOTES.filter((n) => !n.black)
  const blackKeys = NOTES.filter((n) => n.black)

  const handleKeyPress = useCallback(
    (note: typeof NOTES[number]) => {
      playNote(note.freq)
      setActiveNote(note.note)
      setTimeout(() => setActiveNote(null), 200)
    },
    [playNote]
  )

  const playSong = useCallback(
    async (songId: string) => {
      const song = SONGS[songId]
      if (!song || playing) return
      setPlaying(true)
      setCurrentSong(songId)
      stopRef.current = false

      for (const step of song.notes) {
        if (stopRef.current) break
        const noteData = NOTES.find((n) => n.note === step.note)
        if (noteData) {
          playNote(noteData.freq, step.duration)
          setHighlightedNote(step.note)
          await new Promise((r) => setTimeout(r, step.duration * 1000 + 80))
        }
      }
      setHighlightedNote(null)
      setPlaying(false)
      setCurrentSong(null)
    },
    [playNote, playing]
  )

  const stopSong = useCallback(() => {
    stopRef.current = true
  }, [])

  // Clean up AudioContext on unmount
  useEffect(() => {
    return () => {
      stopRef.current = true
    }
  }, [])

  const keyHeight = compact ? 'h-28' : 'h-36 sm:h-44'
  const blackKeyHeight = compact ? 'h-16' : 'h-20 sm:h-28'

  return (
    <div className="mx-auto max-w-3xl">
      {/* Piano Keyboard */}
      <div className="relative mx-auto overflow-x-auto rounded-2xl border-2 border-slate-200 bg-slate-900 p-2 shadow-xl">
        <div className="relative flex min-w-[600px]">
          {/* White keys */}
          {whiteKeys.map((note) => (
            <button
              key={note.note}
              onClick={() => handleKeyPress(note)}
              aria-label={`${childMode ? note.label : note.note} spielen`}
              className={`relative flex-1 ${keyHeight} rounded-b-lg border border-slate-300 transition-all ${
                activeNote === note.note || highlightedNote === note.note
                  ? 'bg-violet-300 shadow-inner'
                  : 'bg-white hover:bg-slate-50 active:bg-violet-200'
              }`}
            >
              {showLabels && (
                <span
                  className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold ${
                    highlightedNote === note.note ? 'text-violet-700' : 'text-slate-400'
                  }`}
                >
                  {note.label}
                </span>
              )}
            </button>
          ))}
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

            return (
              <button
                key={note.note}
                onClick={() => handleKeyPress(note)}
                aria-label={`${note.note} spielen`}
                className={`absolute top-2 z-10 w-[5%] ${blackKeyHeight} rounded-b-lg transition-all ${
                  activeNote === note.note || highlightedNote === note.note
                    ? 'bg-violet-600 shadow-inner'
                    : 'bg-slate-800 hover:bg-slate-700 active:bg-violet-700'
                }`}
                style={{ left: `${leftPercent}%` }}
              />
            )
          })}
        </div>
      </div>

      {/* Song Selector */}
      <div className="mt-6">
        <p className={`mb-3 text-center text-sm font-medium ${childMode ? 'text-slate-600' : 'text-white/40'}`}>
          {childMode ? 'Tippe auf ein Lied — die Tasten leuchten!' : 'Select a song — keys light up as it plays'}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(SONGS).map(([id, song]) => (
            <button
              key={id}
              onClick={() => (playing ? stopSong() : playSong(id))}
              disabled={playing && currentSong !== id}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition active:scale-95 ${
                currentSong === id
                  ? childMode
                    ? 'bg-violet-500 text-white shadow-md'
                    : 'bg-violet-500/30 text-violet-300'
                  : childMode
                    ? 'bg-white/80 text-slate-700 shadow-sm hover:bg-white disabled:opacity-30'
                    : 'bg-white/10 text-white/60 hover:bg-white/15 disabled:opacity-30'
              }`}
            >
              <span className="mr-1">{song.emoji}</span>
              {song.name}
              {currentSong === id && (
                <AnimatePresence>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-2"
                  >
                    ■
                  </motion.span>
                </AnimatePresence>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
