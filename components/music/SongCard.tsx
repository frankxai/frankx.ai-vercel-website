'use client'

import Image from 'next/image'
import Link from 'next/link'

import { trackEvent } from '@/lib/analytics'

export type SongRecord = {
  title: string
  sunoUrl: string
  coverImage: string
  description: string
  releaseDate: string
  tags?: string[]
}

interface SongCardProps {
  song: SongRecord
}

export default function SongCard({ song }: SongCardProps) {
  const date = new Date(song.releaseDate)
  const displayDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_18px_45px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={song.coverImage}
          alt={song.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        <div className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          {displayDate}
        </div>
      </div>
      <div className="space-y-4 px-6 py-6 text-white">
        <h3 className="text-xl font-semibold">{song.title}</h3>
        <p className="text-sm text-white/70">{song.description}</p>
        {song.tags && song.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 text-xs text-white/60">
            {song.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex items-center justify-between pt-2 text-sm">
          <Link
            href={song.sunoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary-400/60 px-4 py-2 text-primary-200 transition hover:bg-primary-500/10"
            onClick={() => trackEvent('music_session_play', { title: song.title, url: song.sunoUrl })}
          >
            Listen on Suno
          </Link>
          <span className="text-xs uppercase tracking-[0.3em] text-white/55">FrankX Sessions</span>
        </div>
      </div>
    </article>
  )
}
