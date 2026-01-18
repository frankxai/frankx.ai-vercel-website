'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { clsx } from 'clsx'
import Image from 'next/image'

/**
 * Testimonial Component
 * Creator testimonials with glassmorphic design
 */

export interface TestimonialProps {
  quote: string
  author: {
    name: string
    role: string
    avatar?: string
    company?: string
  }
  rating?: number
  beforeAfter?: {
    before: string
    after: string
  }
  featured?: boolean
  className?: string
}

export function Testimonial({
  quote,
  author,
  rating = 5,
  beforeAfter,
  featured = false,
  className,
}: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={clsx(
        'group relative overflow-hidden rounded-2xl p-6',
        'bg-white/5 backdrop-blur-sm border border-white/10',
        'hover:border-emerald-500/30 transition-all duration-300',
        featured && 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-transparent',
        className
      )}
    >
      {/* Quote Icon */}
      <div className="absolute -top-2 -right-2 text-emerald-500/10">
        <Quote className="w-24 h-24" />
      </div>

      {/* Rating */}
      {rating > 0 && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={clsx(
                'w-4 h-4',
                i < rating ? 'fill-amber-500 text-amber-500' : 'text-white/20'
              )}
            />
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className="relative z-10 mb-6">
        <p className="text-white/90 leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
      </blockquote>

      {/* Before/After (Optional) */}
      {beforeAfter && (
        <div className="mb-6 space-y-2 p-4 rounded-lg bg-white/5 border border-white/5">
          <div>
            <span className="text-xs text-red-400 font-medium">Before:</span>
            <p className="text-sm text-white/60 mt-1">{beforeAfter.before}</p>
          </div>
          <div>
            <span className="text-xs text-emerald-400 font-medium">After:</span>
            <p className="text-sm text-white/90 mt-1">{beforeAfter.after}</p>
          </div>
        </div>
      )}

      {/* Author */}
      <div className="flex items-center gap-3 relative z-10">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            width={48}
            height={48}
            className="rounded-full border-2 border-white/10"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
            {author.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-white">{author.name}</p>
          <p className="text-sm text-white/60">
            {author.role}
            {author.company && ` at ${author.company}`}
          </p>
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-xl" />
      </div>
    </motion.div>
  )
}

/**
 * Testimonial Grid
 * Responsive grid layout for testimonials
 */
export function TestimonialGrid({
  testimonials,
  columns = 3,
}: {
  testimonials: TestimonialProps[]
  columns?: 2 | 3 | 4
}) {
  return (
    <div
      className={clsx(
        'grid gap-6',
        columns === 2 && 'grid-cols-1 md:grid-cols-2',
        columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      )}
    >
      {testimonials.map((testimonial, index) => (
        <Testimonial key={index} {...testimonial} />
      ))}
    </div>
  )
}
