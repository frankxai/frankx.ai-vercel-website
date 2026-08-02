'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'

import { GlowCard } from '@/components/ui/glow-card'

export type FeaturedTrackPlayerTrack = {
  title: string
  sunoUrl: string
  audioUrl: string
  imageUrl: string
  genre: string[]
  duration: string
  kicker: string
  studioNote: string
}

const parseDuration = (value: string) => {
  const [minutes, seconds] = value.split(':').map(Number)
  if (!Number.isFinite(minutes) || !Number.isFinite(seconds)) return 0

  return minutes * 60 + seconds
}

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'

  const minutes = Math.floor(seconds / 60)
  const remainder = Math.floor(seconds % 60)
  return `${minutes}:${remainder.toString().padStart(2, '0')}`
}

export function FeaturedTrackPlayer({ track }: { track: FeaturedTrackPlayerTrack }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(() => parseDuration(track.duration))
  const [playbackError, setPlaybackError] = useState(false)

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      setPlaybackError(false)

      try {
        await audio.play()
      } catch {
        setPlaybackError(true)
        setIsPlaying(false)
      }
      return
    }

    audio.pause()
  }

  const seek = (nextTime: number) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(nextTime)) return

    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const syncDuration = (nextDuration: number) => {
    setDuration((currentDuration) =>
      Number.isFinite(nextDuration) && nextDuration > 0 ? nextDuration : currentDuration,
    )
  }

  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0

  return (
    <GlowCard color="emerald" className="overflow-hidden p-0">
      <div
        id="studio-release"
        className="relative min-h-[300px] overflow-hidden rounded-2xl sm:min-h-[340px] lg:min-h-[380px]"
      >
        <Image
          src={track.imageUrl}
          alt={`${track.title} cover artwork`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/20 via-[#0a0a0b]/45 to-[#0a0a0b]" />

        {/* Original music; no spoken-word caption track applies. */}
        <audio
          ref={audioRef}
          src={track.audioUrl}
          preload="metadata"
          onLoadedMetadata={(event) => syncDuration(event.currentTarget.duration)}
          onDurationChange={(event) => syncDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false)
            setCurrentTime(0)
          }}
          onError={() => {
            setPlaybackError(true)
            setIsPlaying(false)
          }}
        />

        <div className="relative z-10 flex min-h-[300px] flex-col justify-between p-5 sm:min-h-[340px] sm:p-6 lg:min-h-[380px]">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full border border-white/15 bg-[#0a0a0b]/70 px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] text-white/70">
              Latest studio release
            </span>
            <a
              href={track.sunoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0a0a0b]/70 px-3 py-1.5 text-[11px] font-medium text-white/70 transition-colors hover:border-emerald-300/40 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
            >
              Open on Suno
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-[#0a0a0b]/85 p-4 sm:p-5">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={togglePlayback}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-[#07110d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Play className="ml-0.5 h-5 w-5" aria-hidden="true" />
                )}
              </button>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xl font-semibold tracking-[-0.02em] text-white">
                  {track.title}
                </p>
                <p className="mt-1 truncate text-xs text-white/55">{track.genre.join(' · ')}</p>
              </div>
            </div>

            <div className="mt-5">
              <div className="relative flex h-4 items-center">
                <div className="absolute h-1 w-full rounded-full bg-white/15" />
                <div
                  className="absolute h-1 rounded-full bg-emerald-300"
                  style={{ width: `${progress}%` }}
                  aria-hidden="true"
                />
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={Math.min(currentTime, duration || 0)}
                  onChange={(event) => seek(Number(event.currentTarget.value))}
                  disabled={!duration}
                  aria-label={`Seek through ${track.title}`}
                  className="relative z-10 h-4 w-full cursor-pointer appearance-none bg-transparent accent-emerald-300 disabled:cursor-not-allowed"
                />
              </div>
              <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-white/55">
                <span>{formatTime(currentTime)}</span>
                <span>{duration > 0 ? formatTime(duration) : track.duration}</span>
              </div>
            </div>

            {playbackError ? (
              <p className="mt-3 text-xs text-amber-200/80">
                Playback could not start here. The verified Suno source remains available above.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.07] px-5 py-4">
        <p className="text-[11px] font-semibold tracking-[0.08em] text-emerald-300/60">
          {track.kicker}
        </p>
        <p className="mt-2 max-w-md text-xs leading-5 text-white/60">{track.studioNote}</p>

        <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
          <span className="text-[11px] text-white/60">Original music by FrankX</span>
          <Link
            href="/music"
            className="inline-flex items-center gap-1.5 text-xs text-white/60 transition-colors hover:text-emerald-300"
          >
            Enter Music
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </GlowCard>
  )
}
