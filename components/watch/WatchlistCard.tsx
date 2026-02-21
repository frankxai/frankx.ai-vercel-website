'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play, ChevronRight } from 'lucide-react'
import type { EnhancedVideo, Watchlist } from '@/lib/video-types'

interface WatchlistCardProps {
  watchlist: Watchlist
  videos: EnhancedVideo[]
  index?: number
  onClick: () => void
}

export function WatchlistCard({ watchlist, videos, index = 0, onClick }: WatchlistCardProps) {
  const thumbnails = videos.slice(0, 4)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group card-premium rounded-2xl p-5 cursor-pointer hover:-translate-y-1 transition-all"
      onClick={onClick}
    >
      <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden mb-4 aspect-video">
        {thumbnails.map((v) => (
          <div key={v.id} className="relative bg-black/40">
            <Image
              src={`https://img.youtube.com/vi/${v.id}/default.jpg`}
              alt={v.title}
              fill
              className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
              sizes="144px"
            />
          </div>
        ))}
        {thumbnails.length < 4 &&
          Array.from({ length: 4 - thumbnails.length }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-white/5" />
          ))}
      </div>

      <h3 className="text-base font-bold mb-1 group-hover:text-emerald-400 transition-colors">
        {watchlist.title}
      </h3>
      <p className="text-xs text-white/40 line-clamp-2 mb-3">{watchlist.description}</p>
      <div className="flex items-center gap-1 text-xs text-white/30">
        <Play className="w-3 h-3" />
        <span>{videos.length} videos</span>
        <ChevronRight className="w-3 h-3 ml-auto group-hover:translate-x-0.5 transition-transform" />
      </div>
    </motion.div>
  )
}
