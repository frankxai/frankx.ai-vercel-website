'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Calendar, Clock, ArrowUpRight, Sparkles } from 'lucide-react'

import { BlogPost } from '@/lib/blog'
import { cn } from '@/lib/utils'
import PremiumCard from '@/components/ui/PremiumCard'
import type { GradientPreset } from '@/components/ui/PremiumCard'
import { trackEvent } from '@/lib/analytics'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
  className?: string
}

const CATEGORY_GRADIENTS: Record<string, GradientPreset> = {
  'ai architecture': 'cyan',
  'ai tools': 'cyan',
  'music': 'gold',
  'music production': 'gold',
  'creator tools': 'emerald',
  'enterprise ai': 'purple',
  'development': 'slate',
  'ai agents': 'purple',
  'productivity': 'emerald',
  'tutorial': 'cyan',
}

function getCategoryGradient(category?: string): GradientPreset {
  if (!category) return 'cyan'
  return CATEGORY_GRADIENTS[category.toLowerCase()] || 'cyan'
}

export default function BlogCard({ post, featured = false, className }: BlogCardProps) {
  const [imgError, setImgError] = useState(false)
  const showImage = post.image && !imgError

  return (
    <PremiumCard
      href={`/blog/${post.slug}`}
      gradient={getCategoryGradient(post.category)}
      mouseGlow
      badge={featured ? 'Featured' : undefined}
      padding="p-0"
      lift
      className={cn(
        featured && 'md:col-span-2 lg:col-span-3',
        className
      )}
      onClick={() => trackEvent('blog_card_click', { slug: post.slug, category: post.category, featured })}
    >
      {/* Hero Image Section */}
      {showImage && (
        <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-purple-500/10">
          <Image
            src={post.image!}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            onError={() => setImgError(true)}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent" />

          {/* Category badge on image */}
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              {post.category || 'Article'}
            </span>
          </div>
        </div>
      )}

      <div className={cn('relative p-6', featured && 'p-8')}>
        {/* If no image, show category at top */}
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

        {/* Title */}
        <h2
          className={cn(
            'font-semibold text-white mb-3 leading-tight group-hover:text-emerald-100 transition-colors duration-300',
            featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
          )}
        >
          {post.title}
        </h2>

        {/* Description */}
        <p
          className={cn(
            'text-white/60 leading-relaxed mb-4 group-hover:text-white/70 transition-colors duration-300',
            featured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'
          )}
        >
          {post.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-white/55 group-hover:text-white/65 transition-colors duration-300">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </span>
        </div>

        {/* Tags (show on featured or if no image) */}
        {(featured || !showImage) && post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
            {post.tags.slice(0, featured ? 5 : 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded text-xs text-white/55 bg-white/5 group-hover:bg-white/10 group-hover:text-white/65 transition-all duration-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </PremiumCard>
  )
}
