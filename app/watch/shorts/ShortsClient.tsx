'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, Zap, LayoutGrid } from 'lucide-react'
import { VideoLightbox } from '@/components/watch/VideoLightbox'
import { ShortCard } from '@/components/watch/ShortCard'
import { ShortsPlayer } from '@/components/watch/ShortsPlayer'
import type { EnhancedVideo } from '@/lib/video-types'

interface ShortsClientProps {
  shorts: EnhancedVideo[]
  allVideos: EnhancedVideo[]
}

export default function ShortsClient({ shorts, allVideos }: ShortsClientProps) {
  const [activeShort, setActiveShort] = useState<EnhancedVideo | null>(null)
  const [playerOpen, setPlayerOpen] = useState(false)
  const [playerStartIndex, setPlayerStartIndex] = useState(0)

  const openPlayerAt = useCallback(
    (short: EnhancedVideo) => {
      const idx = shorts.findIndex((s) => s.id === short.id)
      setPlayerStartIndex(Math.max(0, idx))
      setPlayerOpen(true)
    },
    [shorts]
  )

  if (shorts.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-14">
        <div className="card-premium rounded-3xl p-10 text-center border border-white/10">
          <p className="text-white/60">
            The Shorts library is being seeded. First Short lands this week.
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Primary CTA — Open Immersive Player */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setPlayerStartIndex(0)
              setPlayerOpen(true)
            }}
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-emerald-500 text-white font-bold text-sm shadow-2xl shadow-rose-500/25 hover:shadow-rose-500/40 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Enter Immersive Player</span>
            <span className="hidden sm:inline text-white/70 text-xs font-normal">
              &middot; TikTok-style vertical scroll
            </span>
          </motion.button>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Or browse the grid below</span>
          </div>
          <div className="hidden md:inline-flex items-center gap-1.5 ml-auto text-[10px] text-white/30 font-mono">
            <Zap className="w-3 h-3 text-rose-400" />
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                J
              </kbd>{' '}
              /{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                K
              </kbd>{' '}
              nav ·{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                M
              </kbd>{' '}
              mute
            </span>
          </div>
        </div>
      </section>

      {/* Grid — ambient + staggered entry */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {shorts.map((short, i) => (
            <ShortCard
              key={short.id}
              short={short}
              index={i}
              size="md"
              onPlay={openPlayerAt}
            />
          ))}
        </div>
      </section>

      {/* Immersive Player (modal) */}
      <AnimatePresence>
        {playerOpen && (
          <ShortsPlayer
            shorts={shorts}
            initialIndex={playerStartIndex}
            onClose={() => setPlayerOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Legacy lightbox — kept as fallback for now */}
      <AnimatePresence>
        {activeShort && (
          <VideoLightbox
            video={activeShort}
            allVideos={allVideos}
            onClose={() => setActiveShort(null)}
            onNavigate={setActiveShort}
            blogCrossLinks={{}}
          />
        )}
      </AnimatePresence>
    </>
  )
}
