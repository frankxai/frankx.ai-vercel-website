'use client'

import { Play, Pause, ExternalLink } from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { usePlayer } from '@/lib/player-context'
import type { Track } from '@/lib/music'

// CSS-only equalizer bars animation
function EqBars() {
  return (
    <div className="flex h-4 items-end gap-[2px]">
      <span className="w-[3px] animate-[eq_0.8s_ease-in-out_infinite] rounded-full bg-emerald-400" style={{ animationDelay: '0s' }} />
      <span className="w-[3px] animate-[eq_0.8s_ease-in-out_infinite] rounded-full bg-emerald-400" style={{ animationDelay: '0.15s' }} />
      <span className="w-[3px] animate-[eq_0.8s_ease-in-out_infinite] rounded-full bg-emerald-400" style={{ animationDelay: '0.3s' }} />
    </div>
  )
}

interface TrackCardProps {
  track: Track
  /** compact = list row, featured = larger card with cover art */
  variant?: 'compact' | 'featured'
  /** Tracks to queue when this card is played (defaults to just this track) */
  queue?: Track[]
}

export default function TrackCard({ track, variant = 'compact', queue }: TrackCardProps) {
  const { state, playTrack, togglePlay } = usePlayer()

  const isCurrentTrack = state.currentTrack?.id === track.id
  const isPlaying = isCurrentTrack && state.isPlaying
  const canPlay = !!(track.audioUrl || track.sunoId)

  const handlePlay = () => {
    if (isCurrentTrack) {
      togglePlay()
    } else {
      playTrack(track, queue)
    }
  }

  if (variant === 'featured') {
    return (
      <GlowCard color="emerald" className="p-0 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Cover art area */}
          <div className="relative aspect-square w-full sm:w-48 shrink-0 bg-emerald-500/10">
            {track.coverUrl ? (
              <img src={track.coverUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Play className="h-12 w-12 text-emerald-400/40" />
              </div>
            )}
            {canPlay && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100"
                aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black transition-transform active:scale-95">
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 translate-x-[1px]" />}
                </div>
              </button>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-1 flex-col justify-center gap-2 p-5">
            <div className="flex items-center gap-2">
              {isPlaying && <EqBars />}
              <h3 className={`text-lg font-semibold ${isCurrentTrack ? 'text-emerald-400' : 'text-white'}`}>
                {track.title}
              </h3>
            </div>
            <p className="text-sm text-white/40">
              {track.genre?.join(' / ') || 'Mixed'}
              {track.plays ? ` · ${track.plays} plays` : ''}
              {track.duration ? ` · ${track.duration}` : ''}
            </p>
            {track.mood && track.mood.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {track.mood.map((m) => (
                  <span key={m} className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-white/50">
                    {m}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </GlowCard>
    )
  }

  // Compact variant — list row
  return (
    <div
      onClick={canPlay ? handlePlay : undefined}
      className={`group flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
        isCurrentTrack
          ? 'border-emerald-500/30 bg-emerald-500/5'
          : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]'
      } ${canPlay ? 'cursor-pointer' : ''}`}
      role={canPlay ? 'button' : undefined}
      tabIndex={canPlay ? 0 : undefined}
      onKeyDown={canPlay ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePlay() } } : undefined}
      aria-label={canPlay ? (isPlaying ? `Pause ${track.title}` : `Play ${track.title}`) : track.title}
    >
      {/* Play button / eq indicator */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
        {isPlaying ? (
          <EqBars />
        ) : (
          <Play className={`h-4 w-4 ${isCurrentTrack ? 'text-emerald-400' : 'text-white/40 group-hover:text-white/70'} transition-colors`} />
        )}
      </div>

      {/* Track info */}
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-medium ${isCurrentTrack ? 'text-emerald-400' : 'text-white'}`}>
          {track.title}
        </p>
        <p className="truncate text-xs text-white/40">
          {track.genre?.join(', ') || 'Mixed'}
          {track.plays ? ` · ${track.plays} plays` : ''}
        </p>
      </div>

      {/* Duration */}
      {track.duration && (
        <span className="shrink-0 text-xs tabular-nums text-white/30">{track.duration}</span>
      )}

      {/* External link (Suno) */}
      {track.sunoId && (
        <a
          href={`https://suno.com/song/${track.sunoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 p-1.5 text-white/20 transition-colors hover:text-white/50"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Open ${track.title} on Suno`}
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  )
}
