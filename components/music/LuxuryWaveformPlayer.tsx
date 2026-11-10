'use client'

import React, { useState, useEffect, useRef, useId } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, ExternalLink, Volume2, Sparkles, Disc, Radio } from 'lucide-react'

export interface LuxuryTrack {
  id: string
  title: string
  sunoId: string
  sunoUrl: string
  audioUrl?: string
  imageUrl: string
  genre: string[]
  duration: string
  kicker: string
  studioNote: string
}

interface LuxuryWaveformPlayerProps {
  track: LuxuryTrack
  className?: string
}

// Fixed harmonic bar heights for the signature waveform shape of 'Star Show Us'
const WAVEFORM_BAR_RATIOS = [
  0.22, 0.35, 0.48, 0.65, 0.42, 0.78, 0.92, 0.68, 0.85, 0.55, 0.74, 0.95, 0.82, 0.6,
  0.88, 1.0, 0.76, 0.9, 0.62, 0.75, 0.84, 0.96, 0.72, 0.58, 0.8, 0.89, 0.94, 0.71,
  0.83, 0.64, 0.52, 0.77, 0.91, 0.86, 0.69, 0.82, 0.94, 0.88, 0.73, 0.61, 0.79, 0.85,
  0.66, 0.54, 0.45, 0.62, 0.5, 0.38, 0.28, 0.2,
]

export function LuxuryWaveformPlayer({ track, className = '' }: LuxuryWaveformPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [hoverProgress, setHoverProgress] = useState<number | null>(null)
  const [showEmbed, setShowEmbed] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0)
  const [volume, setVolume] = useState<number>(0.8)
  const [stems, setStems] = useState<Record<string, boolean>>({
    drums: true,
    bass: true,
    synths: true,
    vocals: true,
  })
  const [soloStem, setSoloStem] = useState<string | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRefs = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null)
  const animFrameRef = useRef<number | null>(null)

  // Total duration in seconds: 4:26 = 266 seconds
  const totalDuration = 266

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  // Smooth generative harmonic preview using Web Audio API when owned mp3 is not loaded
  const startHarmonicDrone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx()
      }
      const ctx = audioContextRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      // Dual warm oscillators for latin progressive house chord harmonic preview
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const filter = ctx.createBiquadFilter()
      const gain = ctx.createGain()

      // Root A2 (110Hz) & E3 (164.8Hz) warm analog feel
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(110, ctx.currentTime)
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(164.81, ctx.currentTime)

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(800, ctx.currentTime)

      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.12 * volume, ctx.currentTime + 1.2)

      osc1.connect(filter)
      osc2.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc1.start()
      osc2.start()

      oscillatorRefs.current = { osc1, osc2, gain }
    } catch {
      // AudioContext unavailable
    }
  }

  const stopHarmonicDrone = () => {
    if (oscillatorRefs.current && audioContextRef.current) {
      try {
        const { osc1, osc2, gain } = oscillatorRefs.current
        const ctx = audioContextRef.current
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5)
        setTimeout(() => {
          try {
            osc1.stop()
            osc2.stop()
            osc1.disconnect()
            osc2.disconnect()
          } catch {
            // Already disconnected
          }
        }, 500)
      } catch {
        // Disconnect error
      }
      oscillatorRefs.current = null
    }
  }

  // Playhead timer loop
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000 / playbackSpeed)
      return () => clearInterval(interval)
    }
  }, [isPlaying, totalDuration, playbackSpeed])

  // Synchronize audio drone lifecycle directly with isPlaying state
  useEffect(() => {
    if (isPlaying) {
      startHarmonicDrone()
    } else {
      stopHarmonicDrone()
    }
  }, [isPlaying])

  const toggleStemMute = (stemKey: string) => {
    setStems((prev) => {
      const nextActive = !prev[stemKey]
      // Tactile acoustic modulation on synth
      if (oscillatorRefs.current && audioContextRef.current) {
        const { gain } = oscillatorRefs.current
        gain.gain.setValueAtTime(gain.gain.value, audioContextRef.current.currentTime)
        gain.gain.linearRampToValueAtTime(
          nextActive ? 0.12 : 0.04,
          audioContextRef.current.currentTime + 0.1
        )
      }
      return {
        ...prev,
        [stemKey]: nextActive,
      }
    })
  }

  const toggleStemSolo = (stemKey: string) => {
    if (soloStem === stemKey) {
      setSoloStem(null)
      setStems({ drums: true, bass: true, synths: true, vocals: true })
    } else {
      setSoloStem(stemKey)
      setStems({
        drums: stemKey === 'drums',
        bass: stemKey === 'bass',
        synths: stemKey === 'synths',
        vocals: stemKey === 'vocals',
      })
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopHarmonicDrone()
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, clickX / rect.width))
    setCurrentTime(Math.floor(percent * totalDuration))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, clickX / rect.width))
    setHoverProgress(percent)
  }

  const currentProgressPercent = (currentTime / totalDuration) * 100

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a0b]/80 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${className}`}
    >
      {/* Background ambient radial glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/[0.03] blur-3xl" />

      {/* Main card body */}
      <div className="relative p-5 sm:p-6">
        {/* Header row: badge and suno source */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-emerald-400' : 'bg-white/30'} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-emerald-400' : 'bg-white/40'}`} />
            </span>
            <span className="text-[11px] font-medium tracking-[0.08em] text-white/70">
              {track.kicker.toLowerCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowEmbed(!showEmbed)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[11px] font-medium text-white/70 transition-colors hover:border-white/[0.2] hover:text-white"
            >
              <Radio className="h-3 w-3 text-emerald-400" />
              <span>{showEmbed ? 'waveform view' : 'suno master'}</span>
            </button>
            <a
              href={track.sunoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[11px] font-medium text-white/70 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
            >
              <span>open on suno</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Embedded Suno iframe view if toggled */}
        <AnimatePresence>
          {showEmbed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-5 overflow-hidden rounded-xl border border-white/[0.08]"
            >
              <iframe
                src={`https://suno.com/embed/${track.sunoId}`}
                className="w-full h-[180px] bg-[#0a0a0b]"
                frameBorder="0"
                allow="autoplay; clipboard-write"
                title={`${track.title} - Suno Master`}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Artwork + meta row */}
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-void/50">
            <Image
              src={track.imageUrl}
              alt={`${track.title} cover artwork`}
              fill
              className={`object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
              sizes="80px"
              priority
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[0.5px]" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-xl font-semibold tracking-[-0.02em] text-white">
                {track.title}
              </h3>
              <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[9px] font-mono font-medium text-emerald-300">
                124 bpm
              </span>
            </div>
            <p className="mt-1 text-xs text-white/50 lowercase">
              {track.genre.join(' · ')}
            </p>
            <p className="mt-1 truncate font-mono text-[11px] text-white/40">
              frankx audio atelier · sovereign release
            </p>
          </div>
        </div>

        {/* Interactive Waveform Visualizer */}
        <div className="mt-5 rounded-xl border border-white/[0.04] bg-white/[0.015] p-3">
          <div
            role="button"
            tabIndex={0}
            className="group/wave relative flex h-14 w-full cursor-pointer items-end justify-between gap-[3px] px-1 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/50"
            onClick={handleScrub}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                setCurrentTime((prev) => Math.min(totalDuration, prev + 5))
              } else if (e.key === 'ArrowLeft') {
                setCurrentTime((prev) => Math.max(0, prev - 5))
              } else if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault()
                handleTogglePlay()
              }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoverProgress(null)}
            title="click or use arrow keys to seek playback"
            aria-label="waveform timeline scrubber"
          >
            {WAVEFORM_BAR_RATIOS.map((ratio, idx) => {
              const barPercent = (idx / WAVEFORM_BAR_RATIOS.length) * 100
              const isPlayed = barPercent <= currentProgressPercent
              const isHovered = hoverProgress !== null && barPercent <= hoverProgress * 100

              // Dynamic animated height modulation during playback
              const dynamicHeight = isPlaying
                ? Math.min(100, Math.max(15, ratio * 100 + Math.sin(currentTime * 4 + idx * 0.4) * 18))
                : ratio * 100

              return (
                <div
                  key={idx}
                  className="relative flex h-full w-full items-end"
                >
                  <div
                    style={{ height: `${dynamicHeight}%` }}
                    className={`w-full rounded-full transition-[height,background-color,box-shadow] duration-150 ${
                      isPlayed
                        ? 'bg-gradient-to-t from-emerald-400 via-teal-300 to-cyan-300 shadow-[0_0_8px_rgba(52,211,153,0.3)]'
                        : isHovered
                        ? 'bg-white/40'
                        : 'bg-white/[0.12] group-hover/wave:bg-white/[0.18]'
                    }`}
                  />
                </div>
              )
            })}

            {/* Hover timestamp tooltip */}
            {hoverProgress !== null && (
              <div
                className="pointer-events-none absolute -top-6 -translate-x-1/2 rounded bg-black/90 px-1.5 py-0.5 font-mono text-[9px] text-emerald-300 border border-white/10"
                style={{ left: `${hoverProgress * 100}%` }}
              >
                {formatSeconds(hoverProgress * totalDuration)}
              </div>
            )}
          </div>

          {/* Time and playback controls row */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleTogglePlay}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-[#0a0a0b] font-medium transition-[background-color,transform] hover:bg-emerald-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                aria-label={isPlaying ? 'pause preview' : 'play audio preview'}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 fill-current" />
                ) : (
                  <Play className="ml-0.5 h-4 w-4 fill-current" />
                )}
              </button>

              <div className="font-mono text-[11px] text-white/50">
                <span className="text-white/80">{formatSeconds(currentTime)}</span>
                <span className="mx-1.5 text-white/20">/</span>
                <span>{track.duration}</span>
              </div>
            </div>

            {/* Playback speed selector */}
            <div className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-0.5">
              {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] transition-colors ${
                    playbackSpeed === speed
                      ? 'bg-emerald-400/20 text-emerald-300 font-semibold border border-emerald-400/30'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                {isPlaying ? 'previewing synthesis' : 'lossless master'}
              </span>
            </div>
          </div>

          {/* Interactive Stems Isolation Matrix */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.04] pt-2.5">
            <span className="text-[10px] font-mono text-white/40">stems isolation</span>
            <div className="flex items-center gap-1.5">
              {(['drums', 'bass', 'synths', 'vocals'] as const).map((stem) => {
                const isActive = stems[stem]
                const isSoloed = soloStem === stem

                return (
                  <div key={stem} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => toggleStemMute(stem)}
                      title={`toggle ${stem} mute`}
                      className={`rounded-l-md px-2 py-0.5 text-[10px] font-mono tracking-tight transition-[background-color,border-color,color,box-shadow] border border-r-0 ${
                        isActive
                          ? isSoloed
                            ? 'bg-emerald-400 text-black border-emerald-400 font-semibold shadow-[0_0_8px_rgba(52,211,153,0.4)]'
                            : 'bg-white/[0.04] text-white/80 border-white/[0.08] hover:bg-white/[0.08]'
                          : 'bg-black/60 text-white/20 border-white/[0.04] line-through'
                      }`}
                    >
                      {stem}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleStemSolo(stem)}
                      title={`solo ${stem}`}
                      className={`rounded-r-md px-1.5 py-0.5 text-[9px] font-mono font-medium border border-white/[0.08] transition-[background-color,border-color,color,box-shadow] ${
                        isSoloed
                          ? 'bg-emerald-400 text-black border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]'
                          : 'bg-white/[0.02] text-white/40 hover:text-white/80'
                      }`}
                    >
                      S
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Studio Note / Provenance */}
        <div className="mt-4 border-t border-white/[0.04] pt-3 text-xs leading-5 text-white/50">
          <p>{track.studioNote}</p>
        </div>

        {/* Footer link to music hub */}
        <div className="mt-3 flex items-center justify-between border-t border-white/[0.04] pt-2 text-[11px] text-white/40">
          <span>original composition by frank riemer</span>
          <Link
            href="/music"
            className="inline-flex items-center gap-1 text-emerald-400/70 transition-colors hover:text-emerald-300"
          >
            <span>explore music vault</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
