'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import type { EnhancedVideo } from '@/lib/video-types'

interface ShortCardProps {
  short: EnhancedVideo
  onPlay: (short: EnhancedVideo) => void
  index?: number
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Vertical 9:16 card optimized for YouTube Shorts / TikTok-style content.
 * Pairs with VideoLightbox for playback (which uses UniversalEmbed with aspectRatio='9:16').
 */
export function ShortCard({ short, onPlay, index = 0, size = 'md' }: ShortCardProps) {
  const widthClass =
    size === 'sm' ? 'w-40' : size === 'lg' ? 'w-64' : 'w-52'

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.4 }}
      onClick={() => onPlay(short)}
      className={`group ${widthClass} flex-none text-left rounded-2xl overflow-hidden card-premium hover:-translate-y-1 transition-all cursor-pointer`}
      aria-label={`Play Short: ${short.title}`}
    >
      <div className="relative aspect-[9/16] bg-black/40 border border-white/5 overflow-hidden">
        <Image
          src={`https://img.youtube.com/vi/${short.id}/hqdefault.jpg`}
          alt={short.title}
          fill
          className="object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 40vw, 208px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Shorts badge */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-rose-500/90 text-white text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm">
          Short
        </div>

        {/* Duration */}
        <div className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded-md bg-black/70 border border-white/10 text-[10px] font-mono text-white/80">
          {short.duration}
        </div>

        {/* Play icon — floating center on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-emerald-500/90 backdrop-blur-sm flex items-center justify-center shadow-2xl">
            <Play className="w-6 h-6 ml-0.5 fill-current text-white" />
          </div>
        </div>

        {/* Title at bottom */}
        <div className="absolute bottom-0 inset-x-0 p-3">
          <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
            {short.title}
          </h3>
          <p className="text-[10px] text-white/60 mt-1 font-medium">{short.author}</p>
        </div>
      </div>
    </motion.button>
  )
}
