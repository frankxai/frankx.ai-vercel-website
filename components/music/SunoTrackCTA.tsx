'use client'

import { ExternalLink, ArrowRight } from 'lucide-react'

interface SunoTrackCTAProps {
  sunoId: string
  title: string
  genre?: string
  albumTitle?: string
  albumUrl?: string
  className?: string
}

/**
 * Inline blog CTA — embeds a Suno track player with an optional album/product link.
 * Use in MDX blog posts to cross-promote music and products.
 */
export function SunoTrackCTA({
  sunoId,
  title,
  genre,
  albumTitle,
  albumUrl,
  className = '',
}: SunoTrackCTAProps) {
  return (
    <div className={`my-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 overflow-hidden ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-emerald-400/80 font-medium mb-1">
              Featured Track
            </p>
            <p className="text-sm font-semibold text-white">{title}</p>
            {genre && <p className="text-xs text-white/40">{genre}</p>}
          </div>
          <a
            href={`https://suno.com/song/${sunoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-white/50" />
          </a>
        </div>

        <iframe
          src={`https://suno.com/embed/${sunoId}`}
          className="w-full aspect-[2/1] rounded-lg"
          frameBorder="0"
          allow="autoplay; clipboard-write"
          loading="lazy"
          title={title}
        />
      </div>

      {albumTitle && albumUrl && (
        <a
          href={albumUrl}
          className="flex items-center justify-between px-4 py-3 bg-emerald-500/10 border-t border-emerald-500/20 hover:bg-emerald-500/15 transition-colors group"
        >
          <span className="text-sm text-emerald-300">
            From the album: <strong>{albumTitle}</strong>
          </span>
          <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </a>
      )}
    </div>
  )
}
