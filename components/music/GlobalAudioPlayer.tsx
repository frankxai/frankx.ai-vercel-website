'use client'

import { useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Repeat1,
  Shuffle,
} from 'lucide-react'
import { usePlayer, usePlayerProgress } from '@/lib/player-context'

// ── Progress Bar ────────────────────────────────────────────────────────────

function ProgressBar() {
  const { progressRef, audioRef, seek } = usePlayerProgress()
  const barRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!barRef.current) return
      const rect = barRef.current.getBoundingClientRect()
      const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      seek(fraction)
    },
    [seek],
  )

  // Show current time on hover
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!barRef.current || !audioRef.current) return
      const rect = barRef.current.getBoundingClientRect()
      const fraction = (e.clientX - rect.left) / rect.width
      const time = fraction * (audioRef.current.duration || 0)
      barRef.current.title = formatTime(time)
    },
    [audioRef],
  )

  return (
    <div
      ref={barRef}
      className="group/bar relative h-1 w-full cursor-pointer rounded-full bg-white/10 transition-all hover:h-2"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={progressRef as React.RefObject<HTMLDivElement>}
        className="absolute left-0 top-0 h-full rounded-full bg-emerald-500 transition-[height] group-hover/bar:shadow-[0_0_8px_rgba(16,185,129,0.5)]"
        style={{ width: '0%' }}
      />
    </div>
  )
}

// ── Time Formatter ──────────────────────────────────────────────────────────

function formatTime(s: number): string {
  if (!s || !isFinite(s)) return '0:00'
  const mins = Math.floor(s / 60)
  const secs = Math.floor(s % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// ── Time Display (reads from audio ref, low-frequency updates) ──────────────

function TimeDisplay() {
  const { audioRef, duration } = usePlayerProgress()
  // This component intentionally does NOT use RAF — it re-renders only on duration change
  // The actual live time is shown via the progress bar width (zero-render)
  return (
    <span className="hidden text-[11px] tabular-nums text-white/40 sm:block">
      {formatTime(duration)}
    </span>
  )
}

// ── Volume Slider ───────────────────────────────────────────────────────────

function VolumeControl() {
  const { state, setVolume } = usePlayer()
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sliderRef.current) return
      const rect = sliderRef.current.getBoundingClientRect()
      const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      setVolume(fraction)
    },
    [setVolume],
  )

  const toggleMute = useCallback(() => {
    setVolume(state.volume > 0 ? 0 : 0.8)
  }, [state.volume, setVolume])

  return (
    <div className="hidden items-center gap-2 md:flex">
      <button
        onClick={toggleMute}
        className="p-1.5 text-white/50 transition-colors hover:text-white"
        aria-label={state.volume === 0 ? 'Unmute' : 'Mute'}
      >
        {state.volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
      <div
        ref={sliderRef}
        className="h-1 w-20 cursor-pointer rounded-full bg-white/10"
        onClick={handleClick}
      >
        <div
          className="h-full rounded-full bg-white/40 transition-all hover:bg-white/60"
          style={{ width: `${state.volume * 100}%` }}
        />
      </div>
    </div>
  )
}

// ── Main Player ─────────────────────────────────────────────────────────────

export default function GlobalAudioPlayer() {
  const { state, togglePlay, next, prev, setRepeat, toggleShuffle } = usePlayer()

  const cycleRepeat = useCallback(() => {
    const modes: Array<'off' | 'one' | 'all'> = ['off', 'all', 'one']
    const currentIdx = modes.indexOf(state.repeat)
    setRepeat(modes[(currentIdx + 1) % modes.length])
  }, [state.repeat, setRepeat])

  return (
    <AnimatePresence>
      {state.currentTrack && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-white/[0.04] [backdrop-filter:blur(32px)_saturate(160%)] pb-[env(safe-area-inset-bottom)]"
        >
          {/* Progress bar at the very top of the player */}
          <ProgressBar />

          <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:h-20 sm:px-6">
            {/* Left: Track info */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
              {state.currentTrack.coverUrl ? (
                <img
                  src={state.currentTrack.coverUrl}
                  alt=""
                  className="h-10 w-10 shrink-0 rounded-lg object-cover sm:h-12 sm:w-12"
                />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 sm:h-12 sm:w-12">
                  <Play className="h-4 w-4 text-emerald-400" />
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {state.currentTrack.title}
                </p>
                <p className="truncate text-xs text-white/40">
                  {state.currentTrack.genre?.join(', ') || 'FrankX'}
                </p>
              </div>
            </div>

            {/* Center: Controls */}
            <div className="flex items-center gap-1 sm:gap-3">
              <button
                onClick={toggleShuffle}
                className={`hidden p-2 transition-colors sm:block ${
                  state.shuffle ? 'text-emerald-400' : 'text-white/40 hover:text-white/70'
                }`}
                aria-label="Toggle shuffle"
              >
                <Shuffle className="h-4 w-4" />
              </button>

              <button
                onClick={prev}
                className="p-2 text-white/60 transition-colors hover:text-white"
                aria-label="Previous track"
              >
                <SkipBack className="h-5 w-5" />
              </button>

              <button
                onClick={togglePlay}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform active:scale-95 sm:h-11 sm:w-11"
                aria-label={state.isPlaying ? 'Pause' : 'Play'}
              >
                {state.isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 translate-x-[1px]" />
                )}
              </button>

              <button
                onClick={next}
                className="p-2 text-white/60 transition-colors hover:text-white"
                aria-label="Next track"
              >
                <SkipForward className="h-5 w-5" />
              </button>

              <button
                onClick={cycleRepeat}
                className={`hidden p-2 transition-colors sm:block ${
                  state.repeat !== 'off' ? 'text-emerald-400' : 'text-white/40 hover:text-white/70'
                }`}
                aria-label={`Repeat: ${state.repeat}`}
              >
                {state.repeat === 'one' ? (
                  <Repeat1 className="h-4 w-4" />
                ) : (
                  <Repeat className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Right: Volume + Duration */}
            <div className="flex flex-1 items-center justify-end gap-3">
              <TimeDisplay />
              <VolumeControl />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
