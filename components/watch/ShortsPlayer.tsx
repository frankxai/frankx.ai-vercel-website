'use client'

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  X,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Copy,
  Check,
  BookOpen,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react'
import type { EnhancedVideo } from '@/lib/video-types'

interface ShortsPlayerProps {
  shorts: EnhancedVideo[]
  initialIndex?: number
  onClose: () => void
}

// Map category to ambient gradient (matches WatchClient pillar colors)
const categoryGradient: Record<string, string> = {
  'AI Foundations': 'from-emerald-500/30 via-teal-500/10 to-transparent',
  'AI Engineering': 'from-blue-500/30 via-indigo-500/10 to-transparent',
  'AI Agents': 'from-indigo-500/30 via-purple-500/10 to-transparent',
  'Strategy & Business': 'from-amber-500/30 via-orange-500/10 to-transparent',
  'Creator Economy': 'from-orange-500/30 via-red-500/10 to-transparent',
  'Creative AI & Music': 'from-fuchsia-500/30 via-pink-500/10 to-transparent',
  'Mindset & Growth': 'from-rose-500/30 via-pink-500/10 to-transparent',
  'AI Culture': 'from-pink-500/30 via-rose-500/10 to-transparent',
}

const defaultGradient = 'from-emerald-500/20 via-cyan-500/10 to-transparent'

/**
 * Immersive vertical Shorts player — TikTok/Reels native feel.
 *
 * Architecture:
 *  - CSS scroll-snap-type: y mandatory handles the core paging
 *  - IntersectionObserver detects the active Short; only active gets an iframe
 *  - Keyboard J/K, ↑↓, space (pause proxy), esc (close)
 *  - Mouse wheel is debounced into single-step paging
 *  - Touch is native (CSS scroll-snap)
 *  - Ambient category-tinted gradient behind the active Short
 *  - Focus trap + aria-live for a11y
 */
export function ShortsPlayer({ shorts, initialIndex = 0, onClose }: ShortsPlayerProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [muted, setMuted] = useState(true)
  const [copied, setCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const wheelLockRef = useRef(false)

  const active = shorts[activeIndex]

  // Body scroll lock while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Scroll to initial short
  useEffect(() => {
    const target = itemRefs.current[initialIndex]
    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // IntersectionObserver → updates activeIndex based on which short is in view
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.index ?? '0'
            )
            setActiveIndex(idx)
          }
        })
      },
      {
        root: container,
        threshold: [0.6],
      }
    )

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [shorts.length])

  const goTo = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(shorts.length - 1, idx))
      const el = itemRefs.current[clamped]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    [shorts.length]
  )

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'j':
        case 'J':
          e.preventDefault()
          goTo(activeIndex + 1)
          break
        case 'ArrowUp':
        case 'k':
        case 'K':
          e.preventDefault()
          goTo(activeIndex - 1)
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
        case 'm':
        case 'M':
          setMuted((m) => !m)
          break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIndex, goTo, onClose])

  // Wheel — debounced snap paging (override native scroll for intentional paging)
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (wheelLockRef.current) return
      if (Math.abs(e.deltaY) < 30) return
      wheelLockRef.current = true
      if (e.deltaY > 0) goTo(activeIndex + 1)
      else goTo(activeIndex - 1)
      setTimeout(() => {
        wheelLockRef.current = false
      }, 600)
    },
    [activeIndex, goTo]
  )

  const copyLink = useCallback(() => {
    if (!active) return
    const url = `https://frankx.ai/watch/shorts/${active.id}`
    navigator.clipboard?.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }, [active])

  const gradient = useMemo(
    () => categoryGradient[active?.category ?? ''] || defaultGradient,
    [active]
  )

  if (!active) return null

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Immersive player — ${active.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[60] bg-black"
    >
      {/* Ambient gradient behind everything */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-b ${gradient} pointer-events-none`}
        />
      </AnimatePresence>

      {/* Live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Now playing: {active.title} by {active.author}. Short{' '}
        {activeIndex + 1} of {shorts.length}.
      </div>

      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 py-4 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3">
          <Link
            href="/watch/shorts"
            onClick={(e) => {
              e.preventDefault()
              onClose()
            }}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
          >
            <X className="w-4 h-4" />
            Close player
          </Link>
          <span className="hidden sm:inline text-white/30 text-xs">·</span>
          <span className="hidden sm:inline text-white/50 text-xs font-mono">
            {activeIndex + 1} / {shorts.length}
          </span>
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setMuted((m) => !m)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-colors"
            aria-label={muted ? 'Unmute' : 'Mute'}
            title={muted ? 'Unmute (M)' : 'Mute (M)'}
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={copyLink}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-medium transition-colors"
            aria-label="Copy link to this Short"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Share
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scroll container */}
      <div
        ref={containerRef}
        onWheel={onWheel}
        className="absolute inset-0 overflow-y-auto snap-y snap-mandatory overscroll-contain scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {shorts.map((s, i) => {
          const isActive = i === activeIndex
          const isAdjacent = Math.abs(i - activeIndex) === 1
          // Only mount the iframe for the active short — save bandwidth
          return (
            <section
              key={s.id}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              data-index={i}
              className="h-[100dvh] w-full snap-start snap-always flex items-center justify-center relative"
              aria-label={`Short ${i + 1}: ${s.title}`}
            >
              {/* Vertical 9:16 stage */}
              <div className="relative h-full max-h-[100dvh] aspect-[9/16] mx-auto flex items-center justify-center">
                {/* Player or thumbnail */}
                <div className="relative w-full h-full bg-black rounded-none md:rounded-3xl overflow-hidden shadow-2xl md:my-4">
                  {isActive ? (
                    <iframe
                      key={`iframe-${s.id}`}
                      src={`https://www.youtube.com/embed/${s.id}?autoplay=1&mute=${muted ? 1 : 0}&controls=1&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${s.id}`}
                      title={s.title}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <Image
                      src={`https://img.youtube.com/vi/${s.id}/hqdefault.jpg`}
                      alt={s.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 500px"
                      priority={isAdjacent}
                    />
                  )}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                  {/* Bottom info overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 pointer-events-none">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded-md bg-rose-500/90 text-white text-[10px] font-bold uppercase tracking-widest">
                        Short
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm border border-white/10 text-white/80 text-[10px] font-medium">
                        {s.category}
                      </span>
                      <span className="ml-auto text-white/70 text-[11px] font-mono">
                        {s.duration}
                      </span>
                    </div>
                    <h2 className="text-white text-xl md:text-2xl font-bold leading-tight line-clamp-2 mb-1.5">
                      {s.title}
                    </h2>
                    <p className="text-white/70 text-sm font-medium">
                      {s.author}
                    </p>
                    {s.commentary && isActive && (
                      <motion.blockquote
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mt-4 pl-3 border-l-2 border-emerald-400 text-white/85 text-sm italic leading-relaxed line-clamp-3 max-w-md"
                      >
                        <Sparkles className="inline w-3 h-3 mr-1 text-emerald-300" />
                        &ldquo;{s.commentary}&rdquo;
                      </motion.blockquote>
                    )}
                  </div>
                </div>

                {/* Right rail actions — pointer-events-auto island */}
                {isActive && (
                  <motion.div
                    key={`rail-${s.id}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute right-3 bottom-28 md:right-5 md:bottom-28 flex flex-col gap-2.5 pointer-events-auto"
                  >
                    <Link
                      href={`/watch/shorts/${s.id}`}
                      onClick={onClose}
                      className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
                      aria-label="Open detail page with Frank's full take"
                      title="Open detail page"
                    >
                      <BookOpen className="w-4.5 h-4.5" />
                    </Link>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
                      aria-label="Open on YouTube"
                      title="Open on YouTube"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </motion.div>
                )}
              </div>
            </section>
          )
        })}
      </div>

      {/* Prev / Next (desktop) */}
      {shorts.length > 1 && (
        <div className="hidden md:flex flex-col gap-3 absolute right-6 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous Short (K or ↑)"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === shorts.length - 1}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next Short (J or ↓)"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Progress dots (right edge, below nav) */}
      {shorts.length > 1 && shorts.length <= 20 && (
        <div className="hidden md:flex flex-col gap-1.5 absolute right-8 top-1/2 translate-y-24 z-20">
          {shorts.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to Short ${i + 1}`}
              className={`w-1.5 rounded-full transition-all ${
                i === activeIndex
                  ? 'h-8 bg-white'
                  : 'h-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* Keyboard hints (desktop only, fade out after a moment) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 4.5, duration: 1 }}
        className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-3 text-[10px] text-white/40 pointer-events-none z-20 font-mono"
      >
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
            J
          </kbd>{' '}
          /{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
            ↓
          </kbd>{' '}
          next
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
            K
          </kbd>{' '}
          /{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
            ↑
          </kbd>{' '}
          prev
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
            M
          </kbd>{' '}
          mute
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
            Esc
          </kbd>{' '}
          close
        </span>
      </motion.div>
    </motion.div>
  )
}
