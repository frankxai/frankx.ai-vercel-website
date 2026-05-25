'use client'

import Image from 'next/image'
import { Play, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import type { EnhancedVideo } from '@/lib/video-types'

const levelColors: Record<string, string> = {
  intro: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  advanced: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
}

interface VideoCardProps {
  video: EnhancedVideo
  variant?: 'compact' | 'full'
  onPlay: (video: EnhancedVideo) => void
  index?: number
  blogSlugs?: string[]
}

export function VideoCard({ video, variant = 'compact', onPlay, index = 0, blogSlugs }: VideoCardProps) {
  const levelStyle = levelColors[video.level] || levelColors.intro

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group flex-none w-72 card-premium rounded-2xl p-4 cursor-pointer hover:-translate-y-1 transition-all"
        onClick={() => onPlay(video)}
      >
        <div className="aspect-video rounded-xl bg-black/40 border border-white/5 mb-3 relative overflow-hidden">
          <Image
            src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
            alt={video.title}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            sizes="288px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Play className="absolute bottom-2 right-2 w-7 h-7 text-white/60 group-hover:text-emerald-400 transition-all group-hover:scale-110" />
          {video.featured && (
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[9px] uppercase font-bold tracking-widest text-emerald-400">
              Pick
            </div>
          )}
          <div className={`absolute top-2 left-2 px-1.5 py-0.5 rounded-md border text-[9px] uppercase font-bold tracking-widest ${levelStyle}`}>
            {video.level}
          </div>
        </div>
        <h3 className="text-sm font-bold mb-1 line-clamp-2 group-hover:text-emerald-400 transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span className="font-medium text-white/60">{video.author}</span>
          <span>&middot;</span>
          <span>{video.duration}</span>
        </div>
      </motion.div>
    )
  }

  const hasBlogLink = blogSlugs && blogSlugs.length > 0

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: Math.min(index * 0.03, 0.5) }}
      className="group card-premium rounded-3xl p-6 cursor-pointer flex flex-col hover:-translate-y-1 transition-all"
      onClick={() => onPlay(video)}
    >
      <div className="aspect-video rounded-2xl bg-black/40 border border-white/5 mb-5 relative overflow-hidden">
        <Image
          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
          alt={video.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Play className="absolute bottom-3 right-3 w-8 h-8 text-white/60 group-hover:text-emerald-400 transition-all group-hover:scale-110" />
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-black/60 border border-white/10 text-[10px] uppercase font-bold tracking-widest text-white/60">
          {video.category}
        </div>
        <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-lg border text-[10px] uppercase font-bold tracking-widest ${levelStyle}`}>
          {video.level}
        </div>
        {video.featured && (
          <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-[10px] uppercase font-bold tracking-widest text-emerald-400">
            Editor&apos;s Pick
          </div>
        )}
        {hasBlogLink && !video.featured && (
          <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-[10px] uppercase font-bold tracking-widest text-cyan-400 flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            Blog
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
        {video.title}
      </h3>

      {video.description && (
        <p className="text-xs text-white/40 mb-3 line-clamp-2">{video.description}</p>
      )}

      <div className="flex items-center gap-2 mb-4 text-sm text-white/40">
        <span className="font-medium text-white/60">{video.author}</span>
        <span>&middot;</span>
        <span>{video.duration}</span>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        {video.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/5 text-white/30"
          >
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
