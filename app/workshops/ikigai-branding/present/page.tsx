'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Minimize2,
  StickyNote,
  X,
  Play,
  Pause,
  RotateCcw,
  MonitorSmartphone,
} from 'lucide-react'
import { SLIDES, type SlideDef } from './slides'
import { useDeckSync } from './use-deck-sync'

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

const CHROME_REVEAL_MS = 2500

export default function IkigaiPresentPage() {
  const { index, setIndex } = useDeckSync(0)
  const [notesOpen, setNotesOpen] = useState(false)
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [chromeVisible, setChromeVisible] = useState(true)
  const startRef = useRef<number>(Date.now())
  const tickRef = useRef<number | null>(null)
  const chromeTimerRef = useRef<number | null>(null)
  const touchStartXRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)

  const slide = SLIDES[index] ?? SLIDES[0]
  const total = SLIDES.length

  const next = useCallback(
    () => setIndex((i: number) => Math.min(total - 1, i + 1)),
    [setIndex, total],
  )
  const prev = useCallback(() => setIndex((i: number) => Math.max(0, i - 1)), [setIndex])

  const startTimer = useCallback(() => {
    startRef.current = Date.now() - elapsed
    setRunning(true)
  }, [elapsed])

  const pauseTimer = useCallback(() => setRunning(false), [])

  const resetTimer = useCallback(() => {
    setElapsed(0)
    startRef.current = Date.now()
  }, [])

  useEffect(() => {
    if (!running) return
    tickRef.current = window.setInterval(() => {
      setElapsed(Date.now() - startRef.current)
    }, 250) as unknown as number
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current)
    }
  }, [running])

  // Track fullscreen state
  useEffect(() => {
    function onChange() {
      const fs = Boolean(document.fullscreenElement)
      setIsFullscreen(fs)
      // When entering fullscreen, hide chrome and start the reveal timer
      if (fs) {
        setChromeVisible(false)
      } else {
        setChromeVisible(true)
      }
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  // Auto-hide chrome on inactivity when fullscreen
  useEffect(() => {
    if (!isFullscreen) return
    function reveal() {
      setChromeVisible(true)
      if (chromeTimerRef.current) window.clearTimeout(chromeTimerRef.current)
      chromeTimerRef.current = window.setTimeout(() => {
        setChromeVisible(false)
      }, CHROME_REVEAL_MS) as unknown as number
    }
    window.addEventListener('mousemove', reveal)
    window.addEventListener('keydown', reveal)
    return () => {
      window.removeEventListener('mousemove', reveal)
      window.removeEventListener('keydown', reveal)
      if (chromeTimerRef.current) window.clearTimeout(chromeTimerRef.current)
    }
  }, [isFullscreen])

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

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
      } else if (e.key === 'n' || e.key === 'N') {
        setNotesOpen((v) => !v)
      } else if (e.key === 'r' || e.key === 'R') {
        resetTimer()
      } else if (e.key === 'p' || e.key === 'P') {
        setRunning((v) => !v)
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      } else if (e.key === 'Escape') {
        setNotesOpen(false)
      } else if (/^[0-9]$/.test(e.key)) {
        const target = parseInt(e.key, 10)
        if (target < SLIDES.length) setIndex(target)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, resetTimer, setIndex])

  const progress = useMemo(() => ((index + 1) / total) * 100, [index, total])

  // Touch handlers — mobile swipe navigation
  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0]
    touchStartXRef.current = t.clientX
    touchStartYRef.current = t.clientY
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStartXRef.current
    const dy = t.clientY - touchStartYRef.current
    touchStartXRef.current = null
    touchStartYRef.current = null
    // Ignore short or vertical-dominant swipes (so scrolling still works)
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx)) return
    if (dx < 0) next()
    else prev()
  }

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={`fixed inset-0 bg-[#0a0a0b] text-white overflow-hidden ${
        isFullscreen ? 'cursor-none' : ''
      } ${chromeVisible ? '!cursor-default' : ''}`}
      data-workshop-deck="ikigai-branding"
      data-slide-index={index}
      data-slide-id={slide.id}
      data-slide-total={total}
    >
      {/* Backdrop gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] via-transparent to-amber-500/[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-violet-500/[0.05] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Slide stage */}
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <AnimatePresence>
          {chromeVisible && (
            <motion.div
              initial={{ y: -32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -32, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between px-8 py-5 border-b border-white/[0.04] print:hidden"
            >
              <Link
                href="/workshops/ikigai-branding"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to workshop page
              </Link>
              <div className="flex items-center gap-3">
                <Link
                  href="/workshops/ikigai-branding/present/speaker"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-amber-300 transition-colors"
                  title="Opens speaker view in new window for dual-screen setup"
                >
                  <MonitorSmartphone className="w-3.5 h-3.5" />
                  Speaker view
                </Link>
                <div className="text-xs text-zinc-600 font-mono">
                  {pad(index + 1)} / {pad(total)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <AnimatePresence>
          {chromeVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-0.5 bg-white/[0.04] print:hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-violet-400 to-amber-400"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slide content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 overflow-hidden relative">
          {/* Mobile tap zones — visible only when chrome hidden (fullscreen).
              On windowed mode the footer buttons handle navigation. */}
          {isFullscreen && !chromeVisible && (
            <>
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="absolute inset-y-0 left-0 w-1/3 z-10 cursor-default"
              />
              <button
                onClick={next}
                aria-label="Next slide"
                className="absolute inset-y-0 right-0 w-1/3 z-10 cursor-default"
              />
              <button
                onClick={() => setChromeVisible(true)}
                aria-label="Show controls"
                className="absolute inset-y-0 left-1/3 right-1/3 z-10 cursor-default"
              />
            </>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-6xl mx-auto relative z-20 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_iframe]:pointer-events-auto"
            >
              {slide.eyebrow && (
                <p className="text-xs font-medium uppercase tracking-wider text-violet-300 mb-3">
                  {slide.eyebrow}
                </p>
              )}
              {slide.id !== 'cover' && (
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 sm:mb-10 max-w-4xl">
                  {slide.title}
                </h2>
              )}
              {slide.body()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer HUD */}
        <AnimatePresence>
          {chromeVisible && (
            <motion.div
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between px-8 py-4 border-t border-white/[0.04] print:hidden"
            >
              {/* Nav dots */}
              <div className="flex items-center gap-1">
                {SLIDES.map((s: SlideDef, i: number) => (
                  <button
                    key={s.id}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}: ${s.title}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? 'w-6 bg-violet-400' : 'w-1.5 bg-white/[0.12] hover:bg-white/[0.25]'
                    }`}
                  />
                ))}
              </div>

              {/* Timer + controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-sm font-mono">
                  <span className={running ? 'text-emerald-300' : 'text-zinc-500'}>
                    {formatTime(elapsed)}
                  </span>
                  <button
                    onClick={running ? pauseTimer : startTimer}
                    className="text-zinc-400 hover:text-white p-1"
                    aria-label={running ? 'Pause timer' : 'Start timer'}
                  >
                    {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="text-zinc-500 hover:text-white p-1"
                    aria-label="Reset timer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="w-px h-5 bg-white/[0.08]" />

                <button
                  onClick={() => setNotesOpen((v) => !v)}
                  className={`p-1.5 rounded-md hover:bg-white/[0.06] ${notesOpen ? 'text-amber-300' : 'text-zinc-400 hover:text-white'}`}
                  aria-label="Toggle notes"
                >
                  <StickyNote className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                  aria-label="Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <div className="w-px h-5 bg-white/[0.08]" />

                <button
                  onClick={prev}
                  disabled={index === 0}
                  className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  disabled={index === total - 1}
                  className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Next slide"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Notes drawer (audience view — speakers should use /present/speaker on second screen) */}
      <AnimatePresence>
        {notesOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute inset-x-0 bottom-16 z-40 px-8 print:hidden"
          >
            <div className="max-w-3xl mx-auto rounded-2xl border border-white/[0.10] bg-[#0a0a0b]/95 backdrop-blur-xl shadow-2xl shadow-black/60 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <StickyNote className="w-4 h-4 text-amber-300" />
                  <p className="text-sm font-semibold text-white">Speaker notes</p>
                  <span className="text-xs text-zinc-500">· suggested {slide.minutes} min</span>
                  <Link
                    href="/workshops/ikigai-branding/present/speaker"
                    target="_blank"
                    className="text-xs text-amber-300 hover:text-amber-200 ml-2 underline underline-offset-2"
                  >
                    Open full speaker view →
                  </Link>
                </div>
                <button
                  onClick={() => setNotesOpen(false)}
                  className="text-zinc-500 hover:text-zinc-200"
                  aria-label="Close notes"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ul className="space-y-1.5">
                {slide.speakerNotes.map((n: string, i: number) => (
                  <li key={i} className="text-sm text-zinc-300 flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-300/60 mt-0.5">›</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard hint — only when chrome visible */}
      <AnimatePresence>
        {chromeVisible && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-1 inset-x-0 text-center text-[10px] text-zinc-700 print:hidden"
          >
            ← → next · N notes · P pause · R reset · F fullscreen · 0-9 jump · Speaker view opens in new window
          </motion.p>
        )}
      </AnimatePresence>

      <style jsx global>{`
        html, body {
          /* Prevent pull-to-refresh and bounce on mobile while in presenter mode */
          overscroll-behavior: contain;
        }
        @media (prefers-reduced-motion: reduce) {
          /* Respect users who request reduced motion */
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        @media print {
          html, body { background: white !important; color: black !important; }
          .fixed { position: static !important; }
        }
      `}</style>
    </div>
  )
}
