'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react'

type GuitarStringId = 'e' | 'B' | 'G' | 'D' | 'A' | 'E'

interface TabEvent {
  string: GuitarStringId
  fret: number
  beats: number
}

interface TabLesson {
  id: string
  name: string
  description: string
  tempo: number
  events: TabEvent[]
}

const GUITAR_STRINGS: Array<{ id: GuitarStringId; label: string; openMidi: number }> = [
  { id: 'e', label: 'e', openMidi: 64 },
  { id: 'B', label: 'B', openMidi: 59 },
  { id: 'G', label: 'G', openMidi: 55 },
  { id: 'D', label: 'D', openMidi: 50 },
  { id: 'A', label: 'A', openMidi: 45 },
  { id: 'E', label: 'E', openMidi: 40 },
]

const TAB_LESSONS: TabLesson[] = [
  {
    id: 'open-strings',
    name: 'Open-string warm-up',
    description: 'Read from the low E string upward. A zero means play the string open.',
    tempo: 64,
    events: [
      { string: 'E', fret: 0, beats: 1 },
      { string: 'A', fret: 0, beats: 1 },
      { string: 'D', fret: 0, beats: 1 },
      { string: 'G', fret: 0, beats: 1 },
      { string: 'B', fret: 0, beats: 1 },
      { string: 'e', fret: 0, beats: 2 },
    ],
  },
  {
    id: 'c-major-arpeggio',
    name: 'C-major arpeggio',
    description: 'A clean five-note shape across adjacent strings: C, E, G, C, E.',
    tempo: 72,
    events: [
      { string: 'A', fret: 3, beats: 1 },
      { string: 'D', fret: 2, beats: 1 },
      { string: 'G', fret: 0, beats: 1 },
      { string: 'B', fret: 1, beats: 1 },
      { string: 'e', fret: 0, beats: 2 },
      { string: 'B', fret: 1, beats: 1 },
      { string: 'G', fret: 0, beats: 1 },
      { string: 'D', fret: 2, beats: 1 },
      { string: 'A', fret: 3, beats: 2 },
    ],
  },
  {
    id: 'ode-to-joy',
    name: 'Ode to Joy phrase',
    description: 'A public-domain melody on the high E string. Keep every note even.',
    tempo: 82,
    events: [
      { string: 'e', fret: 0, beats: 1 },
      { string: 'e', fret: 0, beats: 1 },
      { string: 'e', fret: 2, beats: 1 },
      { string: 'e', fret: 4, beats: 1 },
      { string: 'e', fret: 4, beats: 1 },
      { string: 'e', fret: 2, beats: 1 },
      { string: 'e', fret: 0, beats: 1 },
      { string: 'B', fret: 3, beats: 1 },
      { string: 'B', fret: 1, beats: 1 },
      { string: 'B', fret: 1, beats: 1 },
      { string: 'B', fret: 3, beats: 1 },
      { string: 'e', fret: 0, beats: 1.5 },
      { string: 'e', fret: 0, beats: 0.5 },
      { string: 'B', fret: 3, beats: 2 },
    ],
  },
]

function midiFor(event: TabEvent) {
  const string = GUITAR_STRINGS.find((candidate) => candidate.id === event.string)
  return (string?.openMidi ?? 40) + event.fret
}

function midiName(midi: number) {
  const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  return `${names[midi % 12]}${Math.floor(midi / 12) - 1}`
}

export function GuidedGuitarTabs() {
  const audioRef = useRef<AudioContext | null>(null)
  const timersRef = useRef<number[]>([])
  const [lessonId, setLessonId] = useState(TAB_LESSONS[0].id)
  const [step, setStep] = useState(0)
  const [tempo, setTempo] = useState(TAB_LESSONS[0].tempo)
  const [playing, setPlaying] = useState(false)
  const [message, setMessage] = useState('Start at the left and read one column at a time.')

  const lesson = useMemo(
    () => TAB_LESSONS.find((candidate) => candidate.id === lessonId) ?? TAB_LESSONS[0],
    [lessonId],
  )
  const currentEvent = lesson.events[step]
  const currentMidi = midiFor(currentEvent)

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
    setPlaying(false)
  }, [])

  useEffect(() => () => {
    clearTimers()
    if (audioRef.current?.state !== 'closed') void audioRef.current?.close()
  }, [clearTimers])

  const getAudio = useCallback(async () => {
    if (!audioRef.current || audioRef.current.state === 'closed') {
      audioRef.current = new AudioContext({ latencyHint: 'interactive' })
    }
    if (audioRef.current.state === 'suspended') await audioRef.current.resume()
    return audioRef.current
  }, [])

  const playPluck = useCallback(async (event: TabEvent, durationMs = 720) => {
    try {
      const context = await getAudio()
      const now = context.currentTime
      const frequency = 440 * Math.pow(2, (midiFor(event) - 69) / 12)

      const limiter = context.createDynamicsCompressor()
      limiter.threshold.value = -12
      limiter.ratio.value = 3
      limiter.connect(context.destination)

      const body = context.createBiquadFilter()
      body.type = 'peaking'
      body.frequency.value = 240
      body.Q.value = 0.8
      body.gain.value = 3
      body.connect(limiter)

      const gain = context.createGain()
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.linearRampToValueAtTime(0.52, now + 0.004)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.45, durationMs / 1000 + 0.55))
      gain.connect(body)

      const tone = context.createBiquadFilter()
      tone.type = 'lowpass'
      tone.frequency.setValueAtTime(5600, now)
      tone.frequency.exponentialRampToValueAtTime(1700, now + 0.65)
      tone.Q.value = 0.65
      tone.connect(gain)

      const fundamental = context.createOscillator()
      fundamental.type = 'triangle'
      fundamental.frequency.value = frequency
      const harmonic = context.createOscillator()
      harmonic.type = 'sine'
      harmonic.frequency.value = frequency * 2
      const harmonicGain = context.createGain()
      harmonicGain.gain.value = 0.18
      fundamental.connect(tone)
      harmonic.connect(harmonicGain)
      harmonicGain.connect(tone)

      const pickBuffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.028), context.sampleRate)
      const pick = pickBuffer.getChannelData(0)
      for (let index = 0; index < pick.length; index += 1) {
        pick[index] = (Math.random() * 2 - 1) * Math.pow(1 - index / pick.length, 3)
      }
      const pickSource = context.createBufferSource()
      pickSource.buffer = pickBuffer
      const pickGain = context.createGain()
      pickGain.gain.value = 0.16
      pickSource.connect(pickGain)
      pickGain.connect(tone)

      fundamental.start(now)
      harmonic.start(now)
      pickSource.start(now)
      const stopAt = now + Math.max(0.6, durationMs / 1000 + 0.75)
      fundamental.stop(stopAt)
      harmonic.stop(stopAt)
      setMessage(`${midiName(midiFor(event))} · ${event.string} string · fret ${event.fret}`)
    } catch {
      setMessage('Audio could not start. Check browser audio permissions and try again.')
    }
  }, [getAudio])

  const playStep = useCallback((index: number) => {
    const event = lesson.events[index]
    setStep(index)
    void playPluck(event, 60000 / tempo * event.beats)
  }, [lesson.events, playPluck, tempo])

  const nextStep = () => {
    const next = (step + 1) % lesson.events.length
    playStep(next)
  }

  const playSequence = useCallback(() => {
    clearTimers()
    setPlaying(true)
    let elapsed = 0
    const beatMs = 60000 / tempo

    lesson.events.forEach((event, index) => {
      const timer = window.setTimeout(() => {
        setStep(index)
        void playPluck(event, beatMs * event.beats)
      }, elapsed)
      timersRef.current.push(timer)
      elapsed += beatMs * event.beats
    })

    const endTimer = window.setTimeout(() => {
      setPlaying(false)
      setMessage('Phrase complete. Repeat it slowly, then raise the tempo.')
    }, elapsed + 100)
    timersRef.current.push(endTimer)
  }, [clearTimers, lesson.events, playPluck, tempo])

  const changeLesson = (nextLessonId: string) => {
    clearTimers()
    const nextLesson = TAB_LESSONS.find((candidate) => candidate.id === nextLessonId) ?? TAB_LESSONS[0]
    setLessonId(nextLesson.id)
    setTempo(nextLesson.tempo)
    setStep(0)
    setMessage('New tab ready. Start with the highlighted column.')
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="Guided guitar tablature">
      <div className="rounded-[1.75rem] border border-stone-300/15 bg-[#171512] p-4 sm:p-6">
        <div className="grid gap-5 border-b border-stone-300/15 pb-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <label>
            <span className="mb-2 block text-xs text-stone-500">Exercise</span>
            <select
              value={lessonId}
              onChange={(event) => changeLesson(event.target.value)}
              className="min-h-11 w-full rounded-xl border border-stone-300/20 bg-[#11100e] px-3 text-sm text-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f] sm:w-72"
            >
              {TAB_LESSONS.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name}</option>)}
            </select>
          </label>
          <label className="block min-w-52 text-xs text-stone-500">
            <span className="flex justify-between"><span>Tempo</span><span>{tempo} BPM</span></span>
            <input type="range" min="48" max="132" step="1" value={tempo} onChange={(event) => setTempo(Number(event.target.value))} className="mt-3 h-2 w-full cursor-pointer accent-[#d9855f]" />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-stone-100">{lesson.name}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">{lesson.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={playing ? clearTimers : playSequence} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#d9855f] px-5 text-sm font-semibold text-[#18130f] hover:bg-[#e49773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3b391]">
              {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
              {playing ? 'Pause' : 'Play phrase'}
            </button>
            <button type="button" onClick={nextStep} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-300/20 px-5 text-sm text-stone-300 hover:border-[#d9855f]/60 hover:text-[#e49773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f]">
              <SkipForward className="size-4" aria-hidden="true" />
              Next note
            </button>
            <button type="button" onClick={() => { clearTimers(); setStep(0); setMessage('Exercise reset to the first note.') }} aria-label="Reset exercise" className="flex size-11 items-center justify-center rounded-full border border-stone-300/20 text-stone-400 hover:border-[#d9855f]/60 hover:text-[#e49773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f]">
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-7 overflow-x-auto pb-3">
          <div className="min-w-max rounded-2xl border border-stone-300/15 bg-[#11100e] px-3 py-5 sm:px-5">
            {GUITAR_STRINGS.map((string) => (
              <div key={string.id} className="grid grid-cols-[2rem_1fr] items-center">
                <span className="font-mono text-xs text-stone-500">{string.label}</span>
                <div className="relative flex">
                  <span className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-stone-600" aria-hidden="true" />
                  {lesson.events.map((event, index) => {
                    const carriesNote = event.string === string.id
                    const className = `relative z-10 flex size-12 items-center justify-center border-x border-transparent font-mono text-sm ${
                      index === step ? 'bg-[#d9855f]/15 text-[#f0a27d]' : 'text-stone-600'
                    }`

                    return carriesNote ? (
                      <button
                        key={`${string.id}-${index}`}
                        type="button"
                        onClick={() => playStep(index)}
                        aria-label={`Step ${index + 1}, ${string.label} string fret ${event.fret}`}
                        className={`${className} hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f]`}
                      >
                        <span className="rounded-full bg-[#11100e] px-1.5 py-0.5">{event.fret}</span>
                      </button>
                    ) : (
                      <span key={`${string.id}-${index}`} className={className} aria-hidden="true" />
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-stone-300/10 bg-white/[0.025] p-4">
            <p className="text-xs text-stone-600">Current note</p>
            <p className="mt-1 font-mono text-lg text-stone-200">{midiName(currentMidi)}</p>
          </div>
          <div className="rounded-xl border border-stone-300/10 bg-white/[0.025] p-4">
            <p className="text-xs text-stone-600">String and fret</p>
            <p className="mt-1 font-mono text-lg text-stone-200">{currentEvent.string} · {currentEvent.fret}</p>
          </div>
          <div className="rounded-xl border border-stone-300/10 bg-white/[0.025] p-4">
            <p className="text-xs text-stone-600">Beat length</p>
            <p className="mt-1 font-mono text-lg text-stone-200">{currentEvent.beats}</p>
          </div>
        </div>
      </div>

      <p className="mt-4 min-h-6 px-2 text-sm text-stone-400" aria-live="polite">{message}</p>
      <p className="mt-2 px-2 text-xs leading-5 text-stone-600">The reference tone is synthesized locally. No microphone, recording, or upload is used.</p>
    </section>
  )
}
