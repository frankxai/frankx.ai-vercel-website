'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { EnhancedVideo } from '@/lib/video-types'
import { VideoCard } from './VideoCard'

interface VideoCarouselProps {
  videos: EnhancedVideo[]
  onPlay: (video: EnhancedVideo) => void
}

export function VideoCarousel({ videos, onPlay }: VideoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = direction === 'left' ? -300 : 300
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="relative group/carousel">
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
        {videos.map((video, i) => (
          <VideoCard key={video.id} video={video} onPlay={onPlay} index={i} variant="compact" />
        ))}
      </div>
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 border border-white/10 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white/10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 border border-white/10 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white/10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
