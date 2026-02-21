'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { X, Play, Clock } from 'lucide-react'
import type { EnhancedVideo, Watchlist } from '@/lib/video-types'

interface WatchlistViewProps {
  watchlist: Watchlist
  videos: EnhancedVideo[]
  onClose: () => void
  onPlay: (video: EnhancedVideo) => void
}

export function WatchlistView({ watchlist, videos, onClose, onPlay }: WatchlistViewProps) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="watchlist-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-void/95 backdrop-blur-2xl overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-start justify-between mb-10">
          <div>
            <div className="text-xs text-emerald-400 uppercase tracking-widest mb-2">
              Watchlist
            </div>
            <h2 id="watchlist-title" className="text-3xl md:text-4xl font-bold mb-3">{watchlist.title}</h2>
            <p className="text-white/50 max-w-xl">{watchlist.description}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
              <span>{videos.length} videos</span>
            </div>
          </div>
          <button
            aria-label="Close watchlist"
            onClick={onClose}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-3">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-center gap-4 p-4 rounded-2xl card-premium cursor-pointer hover:-translate-y-0.5 transition-all"
              onClick={() => onPlay(video)}
            >
              <div className="text-2xl font-bold text-white/20 w-8 text-center flex-none">
                {i + 1}
              </div>
              <div className="w-40 aspect-video rounded-xl bg-black/40 relative overflow-hidden flex-none">
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  sizes="160px"
                />
                <Play className="absolute inset-0 m-auto w-8 h-8 text-white/60 group-hover:text-emerald-400 transition-colors" />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-bold text-sm mb-1 group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <span>{video.author}</span>
                  <span>&middot;</span>
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>
                {video.description && (
                  <p className="text-xs text-white/30 mt-1 line-clamp-1">{video.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {videos.length > 0 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => onPlay(videos[0])}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors"
            >
              <Play className="w-5 h-5" />
              Start Watching
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
