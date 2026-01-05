'use client'

import Link from 'next/link'
import { Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

import { BlogPost } from '@/lib/blog'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
  className?: string
}

export default function BlogCard({ post, featured = false, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300',
        'hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-1',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50',
        featured && 'md:col-span-2',
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className={cn('relative p-6', featured && 'p-8')}>
        {/* Top row: Category & Meta */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {post.category}
          </span>
          <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
        </div>

        {/* Title */}
        <h2
          className={cn(
            'font-semibold text-white mb-3 leading-tight group-hover:text-emerald-100 transition-colors',
            featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
          )}
        >
          {post.title}
        </h2>

        {/* Description */}
        <p
          className={cn(
            'text-white/50 leading-relaxed mb-4 line-clamp-2',
            featured ? 'text-base' : 'text-sm'
          )}
        >
          {post.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </span>
        </div>

        {/* Tags (only show on featured) */}
        {featured && post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded text-xs text-white/40 bg-white/5"
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
