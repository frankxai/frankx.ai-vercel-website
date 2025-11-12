'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Tag, Sparkles } from 'lucide-react'
import type { BlogPost } from '@/lib/types/blog'
import { CATEGORY_DISPLAY_NAMES } from '@/lib/types/blog'

interface BlogCardCompactProps {
  post: BlogPost
  index?: number
}

export default function BlogCardCompact({ post, index = 0 }: BlogCardCompactProps) {
  const [isHovered, setIsHovered] = useState(false)
  const categoryDisplay = CATEGORY_DISPLAY_NAMES[post.sourceCategory || post.category] || post.category

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.45, 0.27, 0.9] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-950 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2"
    >
      {/* Premium noise texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay pointer-events-none" />

      {/* Gradient glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(600px circle at 50% 0%, rgba(6, 182, 212, 0.08), transparent 40%)"
        }}
      />

      {/* Header Image */}
      {post.image && (
        <div className="relative h-56 w-full overflow-hidden">
          <motion.div
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: [0.21, 0.45, 0.27, 0.9] }}
            className="w-full h-full"
          >
            <Image
              src={post.image}
              alt={`${post.title} header image`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent" />

          {/* Shimmer effect on image hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={isHovered ? { x: ['-100%', '100%'] } : { x: '-100%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Category badge with animation */}
          <motion.span
            animate={isHovered ? { scale: 1.05, y: -2 } : { scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-cyan-300 shadow-lg"
          >
            <Tag className="w-3 h-3" />
            {categoryDisplay}
          </motion.span>
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Title with gradient on hover */}
        <h3 className="text-xl font-bold mb-3 line-clamp-2 leading-tight">
          <Link
            href={`/blog/${post.slug}`}
            className="bg-gradient-to-br from-white via-white to-white/90 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-white group-hover:to-purple-300 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded"
          >
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed group-hover:text-slate-200 transition-colors">
          {post.description}
        </p>

        {/* Meta info with enhanced animations */}
        <div className="flex items-center justify-between text-xs pt-4 border-t border-white/10">
          <motion.span
            className="flex items-center gap-1.5 text-slate-400 group-hover:text-cyan-400 transition-colors"
            animate={isHovered ? { x: 2 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </motion.span>

          <Link
            href={`/blog/${post.slug}`}
            className="group/cta inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded px-3 py-1.5 hover:bg-cyan-500/10"
          >
            Read Article
            <motion.div
              animate={isHovered ? { x: 3 } : { x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
