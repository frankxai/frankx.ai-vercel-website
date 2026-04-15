'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { VideoLightbox } from '@/components/watch/VideoLightbox'
import { ShortCard } from '@/components/watch/ShortCard'
import type { EnhancedVideo } from '@/lib/video-types'

interface ShortsClientProps {
  shorts: EnhancedVideo[]
  allVideos: EnhancedVideo[]
}

export default function ShortsClient({ shorts, allVideos }: ShortsClientProps) {
  const [activeShort, setActiveShort] = useState<EnhancedVideo | null>(null)

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
      {/* Shorts grid — vertical 9:16 cards */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {shorts.map((short, i) => (
            <ShortCard
              key={short.id}
              short={short}
              index={i}
              size="md"
              onPlay={setActiveShort}
            />
          ))}
        </div>
      </section>

      {/* Lightbox — VideoLightbox uses UniversalEmbed which already handles 9:16 */}
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
