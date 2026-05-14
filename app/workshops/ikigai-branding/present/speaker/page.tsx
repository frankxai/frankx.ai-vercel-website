'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  StickyNote,
  Play,
  Pause,
  RotateCcw,
  Clock,
  ExternalLink,
} from 'lucide-react'
import { SLIDES } from '../slides'
import { useDeckSync } from '../use-deck-sync'

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

/**
 * Speaker view for the Ikigai deck. Designed for a dual-screen setup:
 *   - Window 1 (`/present`) → drag to projector, hit F for fullscreen.
 *     Audience sees one slide at a time.
 *   - Window 2 (`/present/speaker`) → stays on laptop. Shows current
 *     slide, next slide, full notes, timers.
 *
 * Both windows share the slide index via BroadcastChannel + localStorage
 * fallback. Advancing on EITHER window advances the other.
 */
export default function IkigaiSpeakerPage() {
  const { index, setIndex } = useDeckSync(0)
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [slideElapsed, setSlideElapsed] = useState(0)
  const startRef = useRef<number>(Date.now())
  const slideStartRef = useRef<number>(Date.now())
  const tickRef = useRef<number | null>(null)

  const slide = SLIDES[index] ?? SLIDES[0]
  const nextSlide = SLIDES[index + 1]
  const total = SLIDES.length

  const next = useCallback(
    () => setIndex((i) => Math.min(total - 1, i + 1)),
    [setIndex, total],
  )
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), [setIndex])

  const startTimer = useCallback(() => {
    startRef.current = Date.now() - elapsed
    setRunning(true)
  }, [elapsed])
  const pauseTimer = useCallback(() => setRunning(false), [])
  const resetTimer = useCallback(() => {
    setElapsed(0)
    setSlideElapsed(0)
    startRef.current = Date.now()
    slideStartRef.current = Date.now()
  }, [])

  // Tick
  useEffect(() => {
    if (!running) return
    tickRef.current = window.setInterval(() => {
      setElapsed(Date.now() - startRef.current)
      setSlideElapsed(Date.now() - slideStartRef.current)
    }, 250) as unknown as number
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current)
    }
  }, [running])

  // Reset slide-elapsed when slide changes
  useEffect(() => {
    slideStartRef.current = Date.now()
    setSlideElapsed(0)
  }, [index])

  // Keyboard nav
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        prev()
      } else if (e.key === 'r' || e.key === 'R') {
        resetTimer()
      } else if (e.key === 'p' || e.key === 'P') {
        setRunning((v) => !v)
      } else if (/^[0-9]$/.test(e.key)) {
        const t = parseInt(e.key, 10)
        if (t < SLIDES.length) setIndex(t)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, resetTimer, setIndex])

  // Over/under target time
  const targetMs = slide.minutes * 60 * 1000
  const overTarget = slideElapsed > targetMs

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-5">
        {/* Top bar: identity + timers */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1 rounded-md border border-amber-500/30 bg-amber-500/[0.08] text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300">
              Speaker view
            </div>
            <p className="text-sm text-zinc-400">Ikigai &amp; Branding · 75 min workshop</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Total timer */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-500" />
              <div className="font-mono text-2xl tabular-nums text-white">
                {formatTime(elapsed)}
              </div>
              <button
                onClick={running ? pauseTimer : startTimer}
                className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                aria-label={running ? 'Pause' : 'Start'}
              >
                {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-white/[0.06]"
                aria-label="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <Link
              href="/workshops/ikigai-branding/present"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open audience view
            </Link>
          </div>
        </div>

        {/* Two-column slide preview */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
          {/* Current slide preview */}
          <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/[0.04] to-transparent p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300">
                Now · Slide {index + 1} of {total}
              </p>
              <div
                className={`font-mono text-sm tabular-nums ${
                  overTarget ? 'text-rose-400' : 'text-zinc-400'
                }`}
              >
                {formatTime(slideElapsed)} <span className="text-zinc-600">/ {slide.minutes}m</span>
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 min-h-[180px]">
              {slide.eyebrow && (
                <p className="text-[10px] font-medium uppercase tracking-wider text-violet-300 mb-2">
                  {slide.eyebrow}
                </p>
              )}
              <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
                {slide.title}
              </h2>
            </div>
          </div>

          {/* Next slide preview */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.015] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 mb-3">
              Next · Slide {index + 2} of {total}
            </p>
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 min-h-[180px]">
              {nextSlide ? (
                <>
                  {nextSlide.eyebrow && (
                    <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 mb-2">
                      {nextSlide.eyebrow}
                    </p>
                  )}
                  <h3 className="text-base font-semibold text-zinc-300 tracking-tight leading-tight">
                    {nextSlide.title}
                  </h3>
                </>
              ) : (
                <p className="text-sm text-zinc-600 italic">End of deck</p>
              )}
            </div>
          </div>
        </div>

        {/* Speaker notes */}
        <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.04] to-transparent p-5">
          <div className="flex items-center gap-2 mb-4">
            <StickyNote className="w-4 h-4 text-amber-300" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300">
              Speaker notes
            </p>
            <span className="text-xs text-zinc-500 ml-auto">
              Target: {slide.minutes} min
            </span>
          </div>
          <ul className="space-y-2.5">
            {slide.speakerNotes.map((n, i) => (
              <li
                key={i}
                className="text-base text-zinc-200 leading-relaxed flex items-start gap-2"
              >
                <span className="text-amber-300/60 mt-1.5">›</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nav row + jump-to */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={index === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={next}
              disabled={index === total - 1}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-violet-500/20"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Jump dots */}
          <div className="flex items-center gap-1 flex-wrap">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                title={s.title}
                aria-label={`Jump to slide ${i + 1}: ${s.title}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-8 bg-violet-400' : 'w-2 bg-white/[0.12] hover:bg-white/[0.25]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Keyboard hint */}
        <p className="text-center text-[10px] text-zinc-700">
          ← → next · P play/pause timer · R reset · 0-9 jump to slide · Open audience view in a separate window and drag to projector
        </p>
      </div>
    </div>
  )
}
