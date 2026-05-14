'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronUp,
  ChevronDown,
  Pause,
  Play,
  RotateCcw,
  StickyNote,
  X,
  Maximize2,
} from 'lucide-react'

/**
 * Speaker notes per section. Keys must match section element ids on the page.
 * Keep notes tight — these display in a small drawer, not a long manuscript.
 */
const SPEAKER_NOTES: Record<string, { title: string; minutes: number; notes: string[] }> = {
  intro: {
    title: 'Welcome + Outcomes',
    minutes: 5,
    notes: [
      'Open with the 3Cs hook: "Skills that compound when paired with AI."',
      'Set the deliverable: by the end you will have a purpose statement + 30-day plan.',
      'Ask: "Raise a hand if you have ever written a LinkedIn bio and felt nothing." Pause.',
    ],
  },
  'three-cs': {
    title: 'The 3Cs framework',
    minutes: 6,
    notes: [
      'Collaboration = your pair with AI. Communication = how you make outputs land. Creation = shipping small.',
      'Bridge: "Your Ikigai points at WHAT. The 3Cs are HOW."',
      'Avoid: do not get pulled into AI tooling questions yet — bookmark for Module 5.',
    ],
  },
  'module-1': {
    title: 'Module 1 · Ikigai Map (15 min)',
    minutes: 15,
    notes: [
      'Run the wizard live on screen. Spend 3 min per circle.',
      'Coach prompt: "External evidence only. Other people\'s words."',
      'If someone stalls on "what pays" — point at courses + agencies + SaaS in their space.',
    ],
  },
  synthesis: {
    title: 'Module 2 · Purpose Statement (10 min)',
    minutes: 10,
    notes: [
      'Show the draft auto-generator. Then have them write their own — drafts beat templates.',
      'Quality check: "If a direct competitor could say this sentence verbatim, sharpen it."',
      'Export to markdown live so they see it works.',
    ],
  },
  'brand-bridge': {
    title: 'Module 3 · Brand Bridge (10 min)',
    minutes: 10,
    notes: [
      'Three exercises: Positioning · Audience-of-One · 3 Pillars. They all anchor to Module 2 statement.',
      'Audience-of-One is the hardest. Force a single name + situation.',
      'Pillars: each must survive 12 months of weekly posts without repeating.',
    ],
  },
  'content-plan': {
    title: 'Module 4 · Content Operating Plan (12 min)',
    minutes: 12,
    notes: [
      'Show the 5 hook formats. Have them pick one and draft a post during the workshop.',
      '3+2+1+1 rhythm. Insight is the engine. Build-in-Public is the trust loop. Connection is the reach loop.',
      'Channel matrix: stop reposting the same thing 4×. Each channel has a different job.',
    ],
  },
  'gencreator-stack': {
    title: 'Module 5 · GenCreator Stack (5 min)',
    minutes: 5,
    notes: [
      'Speed-run the 5 categories. Do not let them ask about every tool.',
      'Discipline: add a tool only when an existing tool fails you twice.',
      '"Toolbelt envy is not leverage" — repeat the line.',
    ],
  },
  'live-artifact': {
    title: 'Module 6 · Live Artifact (5 min)',
    minutes: 5,
    notes: [
      'Play the Loom OR demo live (Claude Cowork open in second window).',
      'Narrate: "Notice I rejected the first 2 hooks. Specificity beats template."',
      'End on: "AI-assisted. Voice-preserved. Ship today."',
    ],
  },
  activation: {
    title: 'Module 7 · Activation + CTA (4 min)',
    minutes: 4,
    notes: [
      '4 visible artifacts in 30 days. Public commitment increases follow-through 3×.',
      'Hand the QR for Coach GPT. Promise the Resource Pack email lands tonight.',
      'Day-7 check-in is the secret weapon. Show one.',
    ],
  },
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

function formatTime(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`
}

interface PresenterOverlayProps {
  /** Ordered section ids the presenter will navigate through. */
  sectionIds: string[]
  /** When true, render the HUD. Page passes searchParams.present === '1'. */
  active: boolean
}

export function PresenterOverlay({ sectionIds, active }: PresenterOverlayProps) {
  const [currentId, setCurrentId] = useState<string>(sectionIds[0] ?? '')
  const [notesOpen, setNotesOpen] = useState(false)
  const [running, setRunning] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const tickRef = useRef<number | null>(null)
  const startRef = useRef<number>(Date.now())

  // Timer
  useEffect(() => {
    if (!active || !running) return
    tickRef.current = window.setInterval(() => {
      setElapsed(Date.now() - startRef.current)
    }, 250) as unknown as number
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current)
    }
  }, [active, running])

  // Section detection via IntersectionObserver
  useEffect(() => {
    if (!active) return
    const observers: IntersectionObserver[] = []
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setCurrentId(id)
            }
          })
        },
        { threshold: [0.3, 0.5, 0.7] },
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [active, sectionIds])

  const currentIndex = useMemo(
    () => Math.max(0, sectionIds.indexOf(currentId)),
    [currentId, sectionIds],
  )

  const goTo = useCallback(
    (index: number) => {
      const id = sectionIds[index]
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    [sectionIds],
  )

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])

  const reset = useCallback(() => {
    startRef.current = Date.now()
    setElapsed(0)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    if (!active) return
    function onKey(e: KeyboardEvent) {
      // Ignore when typing in inputs
      const target = e.target as HTMLElement
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        prev()
      } else if (e.key === 'n' || e.key === 'N') {
        setNotesOpen((v) => !v)
      } else if (e.key === 'r' || e.key === 'R') {
        reset()
      } else if (e.key === 'p' || e.key === 'P') {
        setRunning((v) => !v)
      } else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {})
        } else {
          document.exitFullscreen().catch(() => {})
        }
      } else if (e.key === 'Escape') {
        setNotesOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, next, prev, reset])

  if (!active) return null

  const note = SPEAKER_NOTES[currentId]
  const sectionLabel = note?.title ?? currentId
  const sectionMinutes = note?.minutes

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none print:hidden">
      {/* Notes drawer */}
      {notesOpen && note && (
        <div className="pointer-events-auto mx-auto max-w-3xl mb-2 px-4">
          <div className="rounded-2xl border border-white/[0.10] bg-[#0a0a0b]/95 backdrop-blur-xl shadow-2xl shadow-black/60 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-amber-300" />
                <p className="text-sm font-semibold text-white">{note.title}</p>
                <span className="text-xs text-zinc-500">· suggested {note.minutes} min</span>
              </div>
              <button
                onClick={() => setNotesOpen(false)}
                className="text-zinc-500 hover:text-zinc-200"
                aria-label="Close speaker notes"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ul className="space-y-1.5">
              {note.notes.map((n, i) => (
                <li key={i} className="text-sm text-zinc-300 flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-300/60 mt-0.5">›</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* HUD */}
      <div className="pointer-events-auto mx-auto max-w-3xl mb-4 px-4">
        <div className="rounded-2xl border border-white/[0.10] bg-[#0a0a0b]/90 backdrop-blur-xl shadow-2xl shadow-black/60 px-4 py-2.5 flex items-center gap-3">
          {/* Section info */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
              {currentIndex + 1}/{sectionIds.length}
            </span>
            <span className="text-sm font-medium text-white truncate">{sectionLabel}</span>
            {sectionMinutes && (
              <span className="hidden sm:inline text-xs text-zinc-500">· {sectionMinutes}m</span>
            )}
          </div>

          {/* Timer */}
          <div className="flex items-center gap-1.5 text-sm font-mono">
            <span className={running ? 'text-emerald-300' : 'text-zinc-500'}>
              {formatTime(elapsed)}
            </span>
            <button
              onClick={() => setRunning((v) => !v)}
              className="text-zinc-400 hover:text-white"
              aria-label={running ? 'Pause timer' : 'Start timer'}
            >
              {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={reset}
              className="text-zinc-500 hover:text-white"
              aria-label="Reset timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Nav */}
          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              disabled={currentIndex <= 0}
              className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous section"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= sectionIds.length - 1}
              className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next section"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => setNotesOpen((v) => !v)}
              className={`p-1.5 rounded-md hover:bg-white/[0.06] ${notesOpen ? 'text-amber-300' : 'text-zinc-400 hover:text-white'}`}
              aria-label="Toggle speaker notes (N)"
              aria-pressed={notesOpen}
            >
              <StickyNote className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {})
                } else {
                  document.exitFullscreen().catch(() => {})
                }
              }}
              className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06]"
              aria-label="Toggle fullscreen (F)"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Keyboard hint */}
        <p className="hidden sm:block text-center mt-1.5 text-[10px] text-zinc-600">
          ← → next · N notes · P pause · R reset · F fullscreen
        </p>
      </div>
    </div>
  )
}
