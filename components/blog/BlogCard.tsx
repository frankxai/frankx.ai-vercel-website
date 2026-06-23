'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowUpRight, Sparkles } from 'lucide-react'

import type { BlogPostSummary } from '@/lib/blog'
import { cn } from '@/lib/utils'
import { useMouseGlow } from '@/lib/hooks/useMouseGlow'

// Emerald glow RGB for blog cards
const GLOW_RGB = '16, 185, 129'

interface BlogCardProps {
  post: BlogPostSummary
  featured?: boolean
  className?: string
}

export default function BlogCard({ post, featured = false, className }: BlogCardProps) {
  const [imgError, setImgError] = useState(false)
  const showImage = post.image && !imgError
  const isEditorialHeader = post.image?.includes('/images/blog/editorial/headers/')

  const { cardRef, glowRef, handlers } = useMouseGlow<HTMLAnchorElement>({
    rgb: GLOW_RGB,
    radius: 600,
    opacity: 0.15,
  })

  return (
    <Link
      href={`/blog/${post.slug}`}
      ref={cardRef}
      onPointerMove={handlers.onPointerMove}
      onPointerLeave={handlers.onPointerLeave}
      onTouchMove={handlers.onTouchMove}
      onTouchEnd={handlers.onTouchEnd}
      className={cn(
        'group relative block overflow-hidden rounded-2xl',
        'border border-white/[0.09]',
        'bg-[#101216]',
        'transition-all duration-500',
        'hover:-translate-y-1 hover:border-emerald-500/35 hover:bg-[#12161b]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50',
        featured && 'md:col-span-2 lg:col-span-3',
        className
      )}
    >
      {/* Specular top-edge highlight */}
      <div className="pointer-events-none absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

      {/* Cursor-following radial glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 z-10"
      />

      {/* Top-edge ambient hover glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${GLOW_RGB}, 0.08), transparent 65%)` }}
      />

      {/* Hero Image */}
      {showImage && (
        <div className="relative h-48 w-full overflow-hidden bg-[#0b0d10] md:h-56">
          <Image
            src={post.image!}
            alt={post.title}
            fill
            className="object-cover object-left transition-transform duration-700 group-hover:scale-110"
            sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/35 to-transparent" />

          {!isEditorialHeader && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
                <Sparkles className="w-3 h-3" />
                {post.category || 'Article'}
              </span>
            </div>
          )}

          {featured && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-white/95 text-black backdrop-blur-sm">
                Featured
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className={cn('relative z-20 p-6', featured && 'p-8')}>
        {!showImage && (
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3 h-3" />
              {post.category || 'Article'}
            </span>
            <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </div>
        )}

        {showImage && (
          <div className="flex items-center justify-end mb-3">
            <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          </div>
        )}

        <h2
          className={cn(
            'font-semibold text-white mb-3 leading-tight group-hover:text-emerald-50 transition-colors duration-300',
            featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
          )}
        >
          {post.title}
        </h2>

        <p
          className={cn(
            'text-white/55 leading-relaxed mb-4 group-hover:text-white/70 transition-colors duration-300',
            featured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'
          )}
        >
          {post.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-white/40 group-hover:text-white/55 transition-colors duration-300">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </span>
        </div>

        {(featured || !showImage) && post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/[0.05]">
            {post.tags.slice(0, featured ? 5 : 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-xs text-white/45 bg-white/[0.04] border border-white/[0.06] group-hover:bg-white/[0.08] group-hover:text-white/60 transition-all duration-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
