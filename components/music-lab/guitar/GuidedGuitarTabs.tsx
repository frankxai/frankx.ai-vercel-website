'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { GuitarEngine } from '@/lib/music-lab/guitar/engine'
import {
  PlaybackTimeline,
  type PlaybackState,
  type PlaybackTimelineEvent,
} from '@/lib/music-lab/playback-timeline'

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
  const engineRef = useRef<GuitarEngine | null>(null)
  const timelineRef = useRef<PlaybackTimeline<TabEvent> | null>(null)
  const timelineLessonRef = useRef<string | null>(null)
  const [lessonId, setLessonId] = useState(TAB_LESSONS[0].id)
  const [step, setStep] = useState(0)
  const [tempo, setTempo] = useState(TAB_LESSONS[0].tempo)
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle')
  const [message, setMessage] = useState('Start at the left and read one column at a time.')

  const lesson = useMemo(
    () => TAB_LESSONS.find((candidate) => candidate.id === lessonId) ?? TAB_LESSONS[0],
    [lessonId],
  )
  const currentEvent = lesson.events[step]
  const currentMidi = midiFor(currentEvent)
  const playing = playbackState === 'playing'
  const paused = playbackState === 'paused'

  const getEngine = useCallback(() => {
    if (!engineRef.current) engineRef.current = new GuitarEngine()
    return engineRef.current
  }, [])

  const activateEngine = useCallback(async () => {
    const engine = getEngine()
    await engine.activate()
    return engine
  }, [getEngine])

  const playPluck = useCallback((engine: GuitarEngine, event: TabEvent, durationMs = 720) => {
    const frequency = 440 * Math.pow(2, (midiFor(event) - 69) / 12)
    if (!engine.playPluck(frequency, durationMs)) return false
    setMessage(`${midiName(midiFor(event))} · ${event.string} string · fret ${event.fret}`)
    return true
  }, [])

  const disposeTimeline = useCallback(() => {
    timelineRef.current?.dispose()
    timelineRef.current = null
    timelineLessonRef.current = null
  }, [])

  const stopTimeline = useCallback((suspend = false) => {
    timelineRef.current?.stop()
    if (suspend) void engineRef.current?.suspend()
  }, [])

  useEffect(() => {
    const pauseForNavigation = () => {
      const timeline = timelineRef.current
      if (timeline?.getSnapshot().state === 'playing') {
        timeline.pause()
        setMessage('Phrase paused. Resume when the page is active again.')
      }
      void engineRef.current?.suspend()
    }
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') pauseForNavigation()
    }

    window.addEventListener('blur', pauseForNavigation)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      window.removeEventListener('blur', pauseForNavigation)
      document.removeEventListener('visibilitychange', handleVisibility)
      timelineRef.current?.dispose()
      timelineRef.current = null
      void engineRef.current?.destroy()
      engineRef.current = null
    }
  }, [])

  const playStep = useCallback(async (index: number) => {
    const event = lesson.events[index]
    stopTimeline()
    setStep(index)
    try {
      const engine = await activateEngine()
      playPluck(engine, event, 60000 / tempo * event.beats)
      trackEvent('music_lab_instrument_played', {
        instrument: 'guitar',
        action: 'single_note',
        lesson_id: lesson.id,
      })
    } catch {
      setMessage('Audio could not start. Check browser audio permissions and try again.')
    }
  }, [activateEngine, lesson.events, lesson.id, playPluck, stopTimeline, tempo])

  const nextStep = () => {
    const next = (step + 1) % lesson.events.length
    void playStep(next)
  }

  const createTimeline = useCallback((engine: GuitarEngine) => {
    let beatOffset = 0
    const events: PlaybackTimelineEvent<TabEvent>[] = lesson.events.map((event) => {
      const timelineEvent = { at: beatOffset, duration: event.beats, value: event }
      beatOffset += event.beats
      return timelineEvent
    })

    const timeline = new PlaybackTimeline(events, tempo / 60000, {
      onInterrupt: () => engine.stopAll(),
      onEvent: (event, index, _remainingBeats, remainingMs) => {
        setStep(index)
        playPluck(engine, event.value, remainingMs)
      },
      onStateChange: (snapshot) => {
        setPlaybackState(snapshot.state)
        if (snapshot.state === 'completed') {
          setMessage('Phrase complete. Repeat it slowly, then raise the tempo.')
        }
      },
    })
    timelineRef.current = timeline
    timelineLessonRef.current = lesson.id
    return timeline
  }, [lesson.events, lesson.id, playPluck, tempo])

  const playSequence = useCallback(async () => {
    const wasPaused = timelineRef.current?.getSnapshot().state === 'paused'
    try {
      const engine = await activateEngine()
      const timeline = timelineRef.current && timelineLessonRef.current === lesson.id
        ? timelineRef.current
        : createTimeline(engine)
      timeline.setRate(tempo / 60000)
      timeline.play()
      trackEvent('music_lab_instrument_played', {
        instrument: 'guitar',
        action: wasPaused ? 'resume_phrase' : 'play_phrase',
        lesson_id: lesson.id,
      })
    } catch {
      setPlaybackState('idle')
      setMessage('Audio could not start. Check browser audio permissions and try again.')
    }
  }, [activateEngine, createTimeline, lesson.id, tempo])

  const pauseSequence = useCallback(() => {
    timelineRef.current?.pause()
    void engineRef.current?.suspend()
    setMessage('Phrase paused. Resume continues from this note.')
    trackEvent('music_lab_sequence_paused', { instrument: 'guitar', lesson_id: lesson.id })
  }, [lesson.id])

  const changeTempo = useCallback((nextTempo: number) => {
    setTempo(nextTempo)
    timelineRef.current?.setRate(nextTempo / 60000)
  }, [])

  const changeLesson = (nextLessonId: string) => {
    disposeTimeline()
    engineRef.current?.stopAll()
    void engineRef.current?.suspend()
    const nextLesson = TAB_LESSONS.find((candidate) => candidate.id === nextLessonId) ?? TAB_LESSONS[0]
    setLessonId(nextLesson.id)
    setTempo(nextLesson.tempo)
    setStep(0)
    setPlaybackState('idle')
    setMessage('New tab ready. Start with the highlighted column.')
    trackEvent('music_lab_lesson_selected', { instrument: 'guitar', lesson_id: nextLesson.id })
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
            <input type="range" min="48" max="132" step="1" value={tempo} onChange={(event) => changeTempo(Number(event.target.value))} className="mt-3 h-2 w-full cursor-pointer accent-[#d9855f]" />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-stone-100">{lesson.name}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">{lesson.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={playing ? pauseSequence : () => void playSequence()} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#d9855f] px-5 text-sm font-semibold text-[#18130f] hover:bg-[#e49773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3b391]">
              {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
              {playing ? 'Pause' : paused ? 'Resume phrase' : 'Play phrase'}
            </button>
            <button type="button" onClick={nextStep} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-300/20 px-5 text-sm text-stone-300 hover:border-[#d9855f]/60 hover:text-[#e49773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f]">
              <SkipForward className="size-4" aria-hidden="true" />
              Next note
            </button>
            <button type="button" onClick={() => { stopTimeline(true); setStep(0); setMessage('Exercise reset to the first note.') }} aria-label="Reset exercise" className="flex size-11 items-center justify-center rounded-full border border-stone-300/20 text-stone-400 hover:border-[#d9855f]/60 hover:text-[#e49773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f]">
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
                      index === step ? 'bg-[#d9855f]/15 text-[#f0a27d]' : 'text-stone-500'
                    }`

                    return carriesNote ? (
                      <button
                        key={`${string.id}-${index}`}
                        type="button"
                        onClick={() => void playStep(index)}
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
            <p className="text-xs text-stone-500">Current note</p>
            <p className="mt-1 font-mono text-lg text-stone-200">{midiName(currentMidi)}</p>
          </div>
          <div className="rounded-xl border border-stone-300/10 bg-white/[0.025] p-4">
            <p className="text-xs text-stone-500">String and fret</p>
            <p className="mt-1 font-mono text-lg text-stone-200">{currentEvent.string} · {currentEvent.fret}</p>
          </div>
          <div className="rounded-xl border border-stone-300/10 bg-white/[0.025] p-4">
            <p className="text-xs text-stone-500">Beat length</p>
            <p className="mt-1 font-mono text-lg text-stone-200">{currentEvent.beats}</p>
          </div>
        </div>
      </div>

      <p className="mt-4 min-h-6 px-2 text-sm text-stone-400" aria-live="polite">{message}</p>
      <p className="mt-2 px-2 text-xs leading-5 text-stone-500">The reference tone is synthesized locally. No microphone, recording, or upload is used.</p>
    </section>
  )
}
