'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { Pause, Play, RotateCcw, Square } from 'lucide-react'
import { VIOLIN_LESSONS } from '@/data/music-lab/violin-lessons'
import { ViolinEngine, type ViolinExpression } from '@/lib/music-lab/violin/engine'
import {
  VIOLIN_POSITIONS,
  VIOLIN_STRINGS,
  getKeyboardPosition,
  getViolinPosition,
  type ViolinPosition,
} from '@/lib/music-lab/violin/model'

type ViolinMode = 'play' | 'guided' | 'perform'

interface RecordedEvent {
  positionId: string
  offset: number
  duration: number
  energy: number
  pressure: number
}

interface BowState {
  pointerId: number
  positionId: string
  lastX: number
  lastTime: number
  startedAt: number
  energy: number
  pressure: number
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

const MODE_COPY: Record<ViolinMode, { label: string; description: string }> = {
  play: { label: 'Free play', description: 'Choose a finger, then tap or move across the bow surface.' },
  guided: { label: 'Guided notes', description: 'Match the highlighted string and finger in sequence.' },
  perform: { label: 'Perform', description: 'Capture a local event take and replay its notes and expression.' },
}

export function DigitalViolin({ initialMode = 'play' }: { initialMode?: ViolinMode }) {
  const engineRef = useRef<ViolinEngine | null>(null)
  const bowRef = useRef<BowState | null>(null)
  const activeTimerRef = useRef<number | null>(null)
  const replayTimersRef = useRef<number[]>([])
  const recordingRef = useRef(false)
  const takeStartRef = useRef(0)

  const [mode, setMode] = useState<ViolinMode>(initialMode)
  const [selectedId, setSelectedId] = useState('D-0')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [lessonId, setLessonId] = useState(VIOLIN_LESSONS[0].id)
  const [guidedStep, setGuidedStep] = useState(0)
  const [misses, setMisses] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [volume, setVolume] = useState(0.76)
  const [vibrato, setVibrato] = useState(0.25)
  const [room, setRoom] = useState(0.38)
  const [bowEnergy, setBowEnergy] = useState(0)
  const [bowPressure, setBowPressure] = useState(0.45)
  const [recording, setRecording] = useState(false)
  const [takeEvents, setTakeEvents] = useState<RecordedEvent[]>([])
  const [takeDuration, setTakeDuration] = useState(0)
  const [replaying, setReplaying] = useState(false)
  const [liveMessage, setLiveMessage] = useState('Select a note, then use the bow surface.')

  const lesson = useMemo(
    () => VIOLIN_LESSONS.find((candidate) => candidate.id === lessonId) ?? VIOLIN_LESSONS[0],
    [lessonId],
  )
  const expectedEvent = lesson.events[guidedStep]
  const expectedPosition = expectedEvent ? getViolinPosition(expectedEvent.positionId) : undefined
  const selectedPosition = getViolinPosition(selectedId) ?? VIOLIN_POSITIONS[0]

  const expression = useCallback((energy = 0.62, pressure = 0.48): ViolinExpression => ({
    energy,
    pressure,
    vibrato,
    room,
  }), [room, vibrato])

  const clearReplay = useCallback(() => {
    replayTimersRef.current.forEach((timer) => window.clearTimeout(timer))
    replayTimersRef.current = []
    setReplaying(false)
  }, [])

  const ensureEngine = useCallback(async () => {
    if (!engineRef.current) engineRef.current = new ViolinEngine()
    await engineRef.current.init()
    engineRef.current.setVolume(volume)
    return engineRef.current
  }, [volume])

  const stopSound = useCallback(() => {
    if (activeTimerRef.current !== null) window.clearTimeout(activeTimerRef.current)
    activeTimerRef.current = null
    bowRef.current = null
    engineRef.current?.stop(0.1)
    setActiveId(null)
    setBowEnergy(0)
  }, [])

  useEffect(() => {
    engineRef.current?.setVolume(volume)
  }, [volume])

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        stopSound()
        void engineRef.current?.suspend()
      }
    }
    window.addEventListener('blur', stopSound)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      window.removeEventListener('blur', stopSound)
      document.removeEventListener('visibilitychange', handleVisibility)
      clearReplay()
      engineRef.current?.destroy()
    }
  }, [clearReplay, stopSound])

  const registerGuidedNote = useCallback((positionId: string) => {
    if (mode !== 'guided' || completed) return
    const expected = lesson.events[guidedStep]
    if (!expected) return

    if (positionId === expected.positionId) {
      const nextStep = guidedStep + 1
      if (nextStep >= lesson.events.length) {
        setCompleted(true)
        setLiveMessage(`Phrase complete with ${misses} ${misses === 1 ? 'miss' : 'misses'}.`)
      } else {
        setGuidedStep(nextStep)
        const nextPosition = getViolinPosition(lesson.events[nextStep].positionId)
        setLiveMessage(nextPosition ? `Good. Next: ${nextPosition.string} string, finger ${nextPosition.finger}.` : 'Good. Continue.')
      }
    } else {
      setMisses((value) => value + 1)
      setLiveMessage(expectedPosition ? `Try ${expectedPosition.string} string, finger ${expectedPosition.finger}.` : 'Try the highlighted note.')
    }
  }, [completed, expectedPosition, guidedStep, lesson.events, misses, mode])

  const addRecordedEvent = useCallback((event: Omit<RecordedEvent, 'offset'>, startedAt = Date.now()) => {
    if (!recordingRef.current) return
    setTakeEvents((events) => [
      ...events,
      { ...event, offset: Math.max(0, startedAt - takeStartRef.current) },
    ])
  }, [])

  const triggerPosition = useCallback(async (position: ViolinPosition) => {
    setSelectedId(position.id)
    setActiveId(position.id)
    registerGuidedNote(position.id)

    if (bowRef.current) {
      bowRef.current.positionId = position.id
      engineRef.current?.setPitch(position.midi)
      setLiveMessage(`${position.note} · ${position.string} string · finger ${position.finger}`)
      return
    }

    if (activeTimerRef.current !== null) window.clearTimeout(activeTimerRef.current)
    try {
      const engine = await ensureEngine()
      await engine.playStroke(position.midi, expression(), 0.66)
      setLiveMessage(`${position.note} · ${position.string} string · finger ${position.finger}`)
      addRecordedEvent({ positionId: position.id, duration: 660, energy: 0.62, pressure: 0.48 })
      activeTimerRef.current = window.setTimeout(() => setActiveId(null), 700)
    } catch {
      setActiveId(null)
      setLiveMessage('Audio could not start. Check browser audio permissions and try again.')
    }
  }, [addRecordedEvent, ensureEngine, expression, registerGuidedNote])

  const setInstrumentMode = useCallback((nextMode: ViolinMode) => {
    stopSound()
    clearReplay()
    recordingRef.current = false
    setRecording(false)
    setMode(nextMode)
    if (nextMode === 'guided') {
      setGuidedStep(0)
      setMisses(0)
      setCompleted(false)
      setLiveMessage('Follow the highlighted string and finger.')
    } else if (nextMode === 'perform') {
      setLiveMessage('Start a take when you are ready.')
    } else {
      setLiveMessage('Select a note, then use the bow surface.')
    }
  }, [clearReplay, stopSound])

  const selectLesson = useCallback((nextLessonId: string) => {
    setLessonId(nextLessonId)
    setGuidedStep(0)
    setMisses(0)
    setCompleted(false)
    setLiveMessage('New exercise ready. Follow the highlighted position.')
  }, [])

  const pressureFromPointer = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const vertical = clamp(1 - (event.clientY - rect.top) / rect.height, 0.12, 1)
    return event.pressure > 0 ? clamp(vertical * 0.55 + event.pressure * 0.45, 0.12, 1) : vertical
  }

  const startBow = useCallback(async (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    const pressure = pressureFromPointer(event)
    const startedAt = Date.now()
    bowRef.current = {
      pointerId: event.pointerId,
      positionId: selectedPosition.id,
      lastX: event.clientX,
      lastTime: performance.now(),
      startedAt,
      energy: 0.42,
      pressure,
    }
    setActiveId(selectedPosition.id)
    setBowEnergy(0.42)
    setBowPressure(pressure)
    registerGuidedNote(selectedPosition.id)

    try {
      const engine = await ensureEngine()
      if (!bowRef.current || bowRef.current.pointerId !== event.pointerId) {
        engine.stop(0.08)
        return
      }
      await engine.start(selectedPosition.midi, expression(0.42, pressure))
      setLiveMessage(`Bowing ${selectedPosition.note}. Move sideways for energy and vertically for pressure.`)
    } catch {
      bowRef.current = null
      setActiveId(null)
      setLiveMessage('Audio could not start. Check browser audio permissions and try again.')
    }
  }, [ensureEngine, expression, registerGuidedNote, selectedPosition])

  const moveBow = useCallback((event: ReactPointerEvent<HTMLButtonElement>) => {
    const bow = bowRef.current
    if (!bow || bow.pointerId !== event.pointerId) return
    const now = performance.now()
    const elapsed = Math.max(8, now - bow.lastTime)
    const speed = Math.abs(event.clientX - bow.lastX) / elapsed
    const energy = clamp(0.16 + speed * 2.2, 0.16, 1)
    const pressure = pressureFromPointer(event)
    bow.lastX = event.clientX
    bow.lastTime = now
    bow.energy = energy
    bow.pressure = pressure
    setBowEnergy(energy)
    setBowPressure(pressure)
    engineRef.current?.setExpression(expression(energy, pressure))
  }, [expression])

  const endBow = useCallback((event?: ReactPointerEvent<HTMLButtonElement>) => {
    const bow = bowRef.current
    if (!bow || (event && bow.pointerId !== event.pointerId)) return
    if (event?.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    const duration = Math.max(120, Date.now() - bow.startedAt)
    addRecordedEvent({
      positionId: bow.positionId,
      duration,
      energy: bow.energy,
      pressure: bow.pressure,
    }, bow.startedAt)
    stopSound()
    setLiveMessage(`${getViolinPosition(bow.positionId)?.note ?? 'Note'} released.`)
  }, [addRecordedEvent, stopSound])

  const startTake = useCallback(() => {
    clearReplay()
    stopSound()
    takeStartRef.current = Date.now()
    recordingRef.current = true
    setTakeEvents([])
    setTakeDuration(0)
    setRecording(true)
    setLiveMessage('Take running. Play notes or shape the bow surface.')
  }, [clearReplay, stopSound])

  const finishTake = useCallback(() => {
    if (bowRef.current) endBow()
    const duration = Math.max(0, Date.now() - takeStartRef.current)
    recordingRef.current = false
    setRecording(false)
    setTakeDuration(duration)
    stopSound()
    setLiveMessage('Take saved in this page. Replay it or start another.')
  }, [endBow, stopSound])

  const replayTake = useCallback(async () => {
    if (takeEvents.length === 0) return
    clearReplay()
    recordingRef.current = false
    setRecording(false)
    setReplaying(true)
    setLiveMessage('Replaying the take.')

    try {
      const engine = await ensureEngine()
      takeEvents.forEach((event) => {
        const timer = window.setTimeout(() => {
          const position = getViolinPosition(event.positionId)
          if (!position) return
          setSelectedId(position.id)
          setActiveId(position.id)
          void engine.playStroke(position.midi, expression(event.energy, event.pressure), event.duration / 1000)
        }, event.offset)
        replayTimersRef.current.push(timer)
      })
      const lastEvent = takeEvents[takeEvents.length - 1]
      const finalTimer = window.setTimeout(() => {
        setActiveId(null)
        setReplaying(false)
        setLiveMessage('Replay complete.')
      }, lastEvent.offset + lastEvent.duration + 120)
      replayTimersRef.current.push(finalTimer)
    } catch {
      setReplaying(false)
      setLiveMessage('Audio could not start. Check browser audio permissions and try again.')
    }
  }, [clearReplay, ensureEngine, expression, takeEvents])

  const handleInstrumentKeyDown = useCallback((event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return
    const target = event.target as HTMLElement
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return
    const position = getKeyboardPosition(event.key)
    if (!position) return
    event.preventDefault()
    void triggerPosition(position)
  }, [triggerPosition])

  const startBowFromKeyboard = useCallback(async () => {
    if (bowRef.current) return
    const startedAt = Date.now()
    bowRef.current = {
      pointerId: -1,
      positionId: selectedPosition.id,
      lastX: 0,
      lastTime: performance.now(),
      startedAt,
      energy: 0.58,
      pressure: 0.5,
    }
    setActiveId(selectedPosition.id)
    setBowEnergy(0.58)
    setBowPressure(0.5)
    registerGuidedNote(selectedPosition.id)
    try {
      const engine = await ensureEngine()
      await engine.start(selectedPosition.midi, expression(0.58, 0.5))
      setLiveMessage(`Bowing ${selectedPosition.note}.`)
    } catch {
      bowRef.current = null
      setActiveId(null)
      setLiveMessage('Audio could not start. Check browser audio permissions and try again.')
    }
  }, [ensureEngine, expression, registerGuidedNote, selectedPosition])

  const resetGuided = () => {
    setGuidedStep(0)
    setMisses(0)
    setCompleted(false)
    setLiveMessage('Exercise reset. Start with the highlighted position.')
  }

  return (
    <section
      className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      onKeyDown={handleInstrumentKeyDown}
      aria-label="Digital violin instrument"
    >
      <div className="grid gap-3 rounded-2xl border border-stone-300/15 bg-[#171512] p-2 sm:grid-cols-3 sm:p-2.5" aria-label="Violin mode">
        {(Object.keys(MODE_COPY) as ViolinMode[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setInstrumentMode(option)}
            aria-pressed={mode === option}
            className={`min-h-14 rounded-xl px-4 py-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f] ${
              mode === option ? 'bg-[#d9855f] text-[#18130f]' : 'text-stone-400 hover:bg-white/[0.04] hover:text-stone-200'
            }`}
          >
            <span className="block text-sm font-semibold">{MODE_COPY[option].label}</span>
            <span className={`mt-1 hidden text-xs leading-5 lg:block ${mode === option ? 'text-[#3a2419]/75' : 'text-stone-500'}`}>{MODE_COPY[option].description}</span>
          </button>
        ))}
      </div>

      {mode === 'guided' && (
        <div className="mt-4 rounded-2xl border border-stone-300/15 bg-[#171512] p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <label className="block">
              <span className="mb-2 block text-xs text-stone-500">Exercise</span>
              <select
                value={lessonId}
                onChange={(event) => selectLesson(event.target.value)}
                className="min-h-11 w-full rounded-xl border border-stone-300/20 bg-[#11100e] px-3 text-sm text-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f] sm:w-72"
              >
                {VIOLIN_LESSONS.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name}</option>)}
              </select>
            </label>
            <div className="flex items-center gap-3">
              <span className="text-sm text-stone-500">{Math.min(guidedStep + 1, lesson.events.length)} / {lesson.events.length} · {misses} misses</span>
              <button
                type="button"
                onClick={resetGuided}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-300/20 px-4 text-sm text-stone-300 hover:border-[#d9855f]/60 hover:text-[#e49773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f]"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-stone-500">{lesson.description} · {lesson.tempo} BPM</p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-stone-800" aria-hidden="true">
            <div className="h-full bg-[#d9855f] transition-[width] duration-200 motion-reduce:transition-none" style={{ width: `${completed ? 100 : guidedStep / lesson.events.length * 100}%` }} />
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2" aria-label="Exercise note sequence">
            {lesson.events.map((event, index) => {
              const position = getViolinPosition(event.positionId)
              const isCurrent = !completed && index === guidedStep
              return (
                <div
                  key={`${event.positionId}-${index}`}
                  className={`min-w-20 rounded-xl border px-3 py-2 text-center ${
                    isCurrent
                      ? 'border-[#d9855f] bg-[#d9855f]/10 text-[#f0a27d]'
                      : index < guidedStep || completed
                        ? 'border-stone-300/10 bg-white/[0.03] text-stone-500'
                        : 'border-stone-300/10 text-stone-700'
                  }`}
                >
                  <span className="block font-mono text-sm">{position?.note}</span>
                  <span className="mt-1 block text-[10px]">{position?.string}{position?.finger} · {event.bow === 'down' ? 'down' : event.bow === 'up' ? 'up' : 'either'}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {mode === 'perform' && (
        <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-stone-300/15 bg-[#171512] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <p className="text-sm font-semibold text-stone-200">Performance take</p>
            <p className="mt-1 text-sm text-stone-500">
              {takeEvents.length > 0
                ? `${takeEvents.length} ${takeEvents.length === 1 ? 'note' : 'notes'} · ${(takeDuration / 1000).toFixed(1)} seconds · stays in this page`
                : 'Records note, timing, bow energy, and pressure. No microphone.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {!recording ? (
              <button
                type="button"
                onClick={startTake}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#d9855f] px-5 text-sm font-semibold text-[#18130f] hover:bg-[#e49773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3b391]"
              >
                <span className="size-2 rounded-full bg-[#5b1d12]" aria-hidden="true" />
                Start take
              </button>
            ) : (
              <button
                type="button"
                onClick={finishTake}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-stone-100 px-5 text-sm font-semibold text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f]"
              >
                <Square className="size-3.5" aria-hidden="true" />
                Finish take
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                if (replaying) {
                  clearReplay()
                  stopSound()
                  setLiveMessage('Replay paused.')
                } else {
                  void replayTake()
                }
              }}
              disabled={takeEvents.length === 0 || recording}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-300/20 px-5 text-sm text-stone-300 hover:border-[#d9855f]/60 hover:text-[#e49773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f] disabled:cursor-not-allowed disabled:opacity-35"
            >
              {replaying ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
              {replaying ? 'Pause' : 'Replay'}
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-stone-300/15 bg-[#171512] p-4 sm:p-6">
          <div className="flex flex-col gap-4 border-b border-stone-300/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-stone-100">First-position fingerboard</p>
              <p className="mt-1 text-xs leading-5 text-stone-500">Open string is finger 0. Keyboard shortcuts are shown on each position.</p>
            </div>
            <div className="rounded-full border border-stone-300/15 px-4 py-2 font-mono text-sm text-stone-300" aria-live="polite">
              {selectedPosition.note} · {selectedPosition.string}{selectedPosition.finger}
            </div>
          </div>

          <p className="mt-4 text-xs text-stone-500 sm:hidden">Swipe sideways to reach every finger position.</p>
          <div className="mt-4 overflow-x-auto pb-2 sm:mt-6">
            <div className="min-w-[360px] space-y-5">
              {VIOLIN_STRINGS.map((string, stringIndex) => {
                const positions = VIOLIN_POSITIONS.filter((position) => position.string === string.name)
                return (
                  <div key={string.name} className="grid grid-cols-[2.6rem_1fr] items-center gap-3 sm:grid-cols-[3.5rem_1fr] sm:gap-5">
                  <div>
                    <p className="font-mono text-base font-semibold text-stone-100">{string.name}</p>
                    <p className="font-mono text-[10px] text-stone-500">{string.openNote}</p>
                  </div>
                  <div className="relative grid grid-cols-5 gap-2 sm:gap-3">
                    <span
                      className="pointer-events-none absolute left-0 right-0 top-1/2 bg-stone-500/55"
                      style={{ height: `${Math.max(1, 4 - stringIndex)}px` }}
                      aria-hidden="true"
                    />
                    {positions.map((position) => {
                      const isSelected = selectedId === position.id
                      const isActive = activeId === position.id
                      const isExpected = mode === 'guided' && !completed && expectedEvent?.positionId === position.id
                      return (
                        <button
                          key={position.id}
                          type="button"
                          onClick={() => void triggerPosition(position)}
                          aria-label={`${position.note}, ${position.string} string, finger ${position.finger}`}
                          aria-keyshortcuts={position.keyboardKey}
                          className={`relative z-10 flex min-h-14 flex-col items-center justify-center rounded-xl border px-1 transition-[background-color,border-color,color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3b391] active:scale-[0.98] motion-reduce:transition-none ${
                            isActive
                              ? 'border-[#f3b391] bg-[#f3b391] text-[#18130f]'
                              : isExpected
                                ? 'border-[#d9855f] bg-[#d9855f]/15 text-[#f0a27d]'
                                : isSelected
                                  ? 'border-stone-200/45 bg-stone-100/10 text-stone-100'
                                  : 'border-stone-300/20 bg-[#211e1a] text-stone-400 hover:border-stone-300/45 hover:text-stone-200'
                          }`}
                        >
                          <span className="font-mono text-sm font-semibold">{position.note}</span>
                          <span className={`mt-1 text-[10px] ${isActive ? 'text-[#4d2c1d]' : 'text-stone-500'}`}>{position.finger === 0 ? 'open' : `finger ${position.finger}`} · {position.keyboardKey.toUpperCase()}</span>
                        </button>
                      )
                    })}
                  </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-stone-300/15 bg-[#171512] p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-stone-100">Continuous bow</p>
              <p className="mt-1 max-w-md text-xs leading-5 text-stone-500">Move sideways for bow energy. Move higher for more pressure. Hold Space or Enter when this surface is focused.</p>
            </div>
            <div className="text-right font-mono text-[10px] text-stone-500">
              <p>Energy {Math.round(bowEnergy * 100)}</p>
              <p>Pressure {Math.round(bowPressure * 100)}</p>
            </div>
          </div>

          <button
            type="button"
            aria-label={`Bow ${selectedPosition.note}. Move sideways for energy and vertically for pressure.`}
            onPointerDown={(event) => void startBow(event)}
            onPointerMove={moveBow}
            onPointerUp={endBow}
            onPointerCancel={endBow}
            onKeyDown={(event) => {
              if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) {
                event.preventDefault()
                void startBowFromKeyboard()
              }
            }}
            onKeyUp={(event) => {
              if (event.key === ' ' || event.key === 'Enter') {
                event.preventDefault()
                endBow()
              }
            }}
            className="relative mt-6 h-48 w-full touch-none overflow-hidden rounded-2xl border border-dashed border-[#d9855f]/45 bg-[#12110f] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3b391] sm:h-56"
          >
            <span className="pointer-events-none absolute inset-x-5 top-1/2 h-px bg-[#d9855f]/35" aria-hidden="true" />
            <span className="pointer-events-none absolute inset-y-5 left-1/2 w-px bg-[#d9855f]/20" aria-hidden="true" />
            <span
              className="pointer-events-none absolute bottom-0 left-0 right-0 bg-[linear-gradient(to_top,rgba(217,133,95,0.20),transparent)] transition-[height] duration-75 motion-reduce:transition-none"
              style={{ height: `${bowPressure * 100}%` }}
              aria-hidden="true"
            />
            <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-3xl font-semibold text-stone-200">{selectedPosition.note}</span>
              <span className="mt-2 text-xs text-stone-500">press · move · release</span>
            </span>
          </button>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
            <label className="block text-xs text-stone-500">
              <span className="flex justify-between"><span>Volume</span><span>{Math.round(volume * 100)}</span></span>
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} className="mt-2 h-2 w-full cursor-pointer accent-[#d9855f]" />
            </label>
            <label className="block text-xs text-stone-500">
              <span className="flex justify-between"><span>Vibrato</span><span>{Math.round(vibrato * 100)}</span></span>
              <input type="range" min="0" max="1" step="0.01" value={vibrato} onChange={(event) => setVibrato(Number(event.target.value))} className="mt-2 h-2 w-full cursor-pointer accent-[#d9855f]" />
            </label>
            <label className="block text-xs text-stone-500">
              <span className="flex justify-between"><span>Room</span><span>{Math.round(room * 100)}</span></span>
              <input type="range" min="0" max="1" step="0.01" value={room} onChange={(event) => setRoom(Number(event.target.value))} className="mt-2 h-2 w-full cursor-pointer accent-[#d9855f]" />
            </label>
          </div>
        </div>
      </div>

      <p className="mt-4 min-h-6 px-2 text-sm text-stone-400" aria-live="polite">{liveMessage}</p>
      <p className="mt-2 px-2 text-xs leading-5 text-stone-500">
        Audio is synthesized locally with Web Audio. Performance mode stores events only in this page until you leave or refresh; no microphone or upload is used.
      </p>
    </section>
  )
}
