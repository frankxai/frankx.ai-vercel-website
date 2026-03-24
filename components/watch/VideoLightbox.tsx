'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { X, BookOpen, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { UniversalEmbed } from '@/components/embeds/UniversalEmbed'
import type { EnhancedVideo } from '@/lib/video-types'

interface VideoLightboxProps {
  video: EnhancedVideo
  allVideos: EnhancedVideo[]
  onClose: () => void
  onNavigate: (video: EnhancedVideo) => void
  blogCrossLinks: Record<string, string[]>
}

export function VideoLightbox({ video, allVideos, onClose, onNavigate, blogCrossLinks }: VideoLightboxProps) {
  const categoryVideos = allVideos.filter((v) => v.category === video.category)
  const currentIndex = categoryVideos.findIndex((v) => v.id === video.id)
  const prevVideo = currentIndex > 0 ? categoryVideos[currentIndex - 1] : null
  const nextVideo = currentIndex < categoryVideos.length - 1 ? categoryVideos[currentIndex + 1] : null

  const upNext = categoryVideos
    .filter((v) => v.id !== video.id)
    .slice(Math.max(0, currentIndex), Math.max(0, currentIndex) + 3)
  if (upNext.length < 3) {
    const featured = allVideos.filter((v) => v.featured && v.id !== video.id && !upNext.some((u) => u.id === v.id))
    upNext.push(...featured.slice(0, 3 - upNext.length))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && prevVideo) onNavigate(prevVideo)
      if (e.key === 'ArrowRight' && nextVideo) onNavigate(nextVideo)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNavigate, prevVideo, nextVideo])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-void/95 backdrop-blur-2xl overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-grow min-w-0">
            <h2 id="lightbox-title" className="text-2xl md:text-3xl font-bold mb-2">{video.title}</h2>
            <p className="text-white/50">
              {video.author} &middot; {video.category} &middot; {video.duration}
            </p>
            {video.description && (
              <p className="text-sm text-white/40 mt-2 max-w-2xl">{video.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2 flex-none ml-4">
            {prevVideo && (
              <button
                aria-label="Previous video"
                onClick={() => onNavigate(prevVideo)}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {nextVideo && (
              <button
                aria-label="Next video"
                onClick={() => onNavigate(nextVideo)}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <button
              aria-label="Close video"
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-grow">
            <div className="aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <UniversalEmbed type="youtube" id={video.id} autoplay={true} />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {video.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
            {blogCrossLinks[video.id]?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {blogCrossLinks[video.id].map((slug) => (
                  <Link
                    key={slug}
                    href={`/blog/${slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-colors"
                  >
                    <BookOpen className="w-3 h-3" />
                    Read article
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:block w-72 flex-none">
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">
              Up Next
            </h3>
            <div className="space-y-3">
              {upNext.slice(0, 5).map((v) => (
                <div
                  key={v.id}
                  role="button"
                  tabIndex={0}
                  className="group flex gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={() => onNavigate(v)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate(v) } }}
                >
                  <div className="w-24 aspect-video rounded-lg bg-black/40 relative overflow-hidden flex-none">
                    <Image
                      src={`https://img.youtube.com/vi/${v.id}/default.jpg`}
                      alt={v.title}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                      sizes="96px"
                    />
                    <Play className="absolute inset-0 m-auto w-5 h-5 text-white/50" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {v.title}
                    </h4>
                    <p className="text-[10px] text-white/30 mt-1">{v.author}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-[10px] text-white/20">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                &larr;
              </kbd>{' '}
              /{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                &rarr;
              </kbd>{' '}
              to navigate &middot;{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                Esc
              </kbd>{' '}
              to close
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
