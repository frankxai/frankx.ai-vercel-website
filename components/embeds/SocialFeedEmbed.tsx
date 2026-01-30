'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Play, Heart, MessageCircle, Share2, X, Maximize2 } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

type Platform = 'tiktok' | 'instagram' | 'twitter' | 'youtube'

interface SocialPost {
  id: string
  platform: Platform
  embedUrl?: string
  thumbnailUrl?: string
  title?: string
  author?: string
  authorAvatar?: string
  likes?: number
  comments?: number
  views?: number
}

interface SocialFeedEmbedProps {
  posts: SocialPost[]
  layout?: 'grid' | 'carousel' | 'wall' | 'masonry'
  columns?: 2 | 3 | 4
  maxItems?: number
  showStats?: boolean
  showLightbox?: boolean
  theme?: 'tech' | 'soul'
  className?: string
}

// ============================================================================
// PLATFORM CONFIGS
// ============================================================================

const platformConfig = {
  tiktok: {
    name: 'TikTok',
    color: '#00f2ea',
    embedBase: 'https://www.tiktok.com/embed/v2/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
    ),
  },
  instagram: {
    name: 'Instagram',
    color: '#e4405f',
    embedBase: 'https://www.instagram.com/p/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  twitter: {
    name: 'X',
    color: '#1da1f2',
    embedBase: 'https://twitter.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  youtube: {
    name: 'YouTube',
    color: '#ff0000',
    embedBase: 'https://www.youtube.com/embed/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
}

// ============================================================================
// SOCIAL POST CARD
// ============================================================================

function SocialPostCard({
  post,
  showStats,
  theme,
  onOpenLightbox,
}: {
  post: SocialPost
  showStats: boolean
  theme: 'tech' | 'soul'
  onOpenLightbox: () => void
}) {
  const config = platformConfig[post.platform]
  const accentColor = theme === 'tech' ? 'emerald' : 'amber'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative bg-[#111113] rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Thumbnail / Preview */}
      <div
        className="relative aspect-[9/16] bg-black/50 cursor-pointer"
        onClick={onOpenLightbox}
      >
        {post.thumbnailUrl ? (
          <img
            src={post.thumbnailUrl}
            alt={post.title || 'Social media post'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#18181b] to-[#0a0a0b]">
            <div style={{ color: config.color }}>{config.icon}</div>
          </div>
        )}

        {/* Play overlay for videos */}
        {(post.platform === 'tiktok' || post.platform === 'youtube') && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`w-16 h-16 rounded-full bg-${accentColor}-500/90 flex items-center justify-center`}
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </motion.div>
          </div>
        )}

        {/* Expand button */}
        <button
          onClick={onOpenLightbox}
          className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 text-white/80 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Platform badge */}
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1"
          style={{ backgroundColor: `${config.color}20`, color: config.color }}
        >
          {config.icon}
          <span>{config.name}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Author */}
        {post.author && (
          <div className="flex items-center gap-2 mb-2">
            {post.authorAvatar && (
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span className="text-sm text-white/70">@{post.author}</span>
          </div>
        )}

        {/* Title */}
        {post.title && (
          <p className="text-sm text-white/90 line-clamp-2 mb-3">{post.title}</p>
        )}

        {/* Stats */}
        {showStats && (
          <div className="flex items-center gap-4 text-xs text-white/50">
            {post.likes !== undefined && (
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5" />
                {formatNumber(post.likes)}
              </span>
            )}
            {post.comments !== undefined && (
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                {formatNumber(post.comments)}
              </span>
            )}
            {post.views !== undefined && (
              <span className="flex items-center gap-1">
                <Play className="w-3.5 h-3.5" />
                {formatNumber(post.views)}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ============================================================================
// LIGHTBOX
// ============================================================================

function EmbedLightbox({
  post,
  onClose,
}: {
  post: SocialPost
  onClose: () => void
}) {
  const config = platformConfig[post.platform]

  // Generate embed URL
  const getEmbedUrl = () => {
    if (post.embedUrl) return post.embedUrl

    switch (post.platform) {
      case 'tiktok':
        return `${config.embedBase}${post.id}`
      case 'instagram':
        return `${config.embedBase}${post.id}/embed`
      case 'youtube':
        return `${config.embedBase}${post.id}?autoplay=1`
      case 'twitter':
        return `https://platform.twitter.com/embed/Tweet.html?id=${post.id}`
      default:
        return ''
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg bg-[#111113] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white/80 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Embed iframe */}
        <div className="aspect-[9/16] w-full">
          <iframe
            src={getEmbedUrl()}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span style={{ color: config.color }}>{config.icon}</span>
              <span className="text-sm text-white/70">{config.name}</span>
            </div>
            <a
              href={post.embedUrl || `${config.embedBase}${post.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors"
            >
              Open in {config.name}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function SocialFeedEmbed({
  posts,
  layout = 'grid',
  columns = 3,
  maxItems = 9,
  showStats = true,
  showLightbox = true,
  theme = 'tech',
  className = '',
}: SocialFeedEmbedProps) {
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null)
  const displayPosts = posts.slice(0, maxItems)

  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className={className}>
      {/* Grid Layout */}
      {layout === 'grid' && (
        <div className={`grid ${gridClasses[columns]} gap-4`}>
          {displayPosts.map((post) => (
            <SocialPostCard
              key={`${post.platform}-${post.id}`}
              post={post}
              showStats={showStats}
              theme={theme}
              onOpenLightbox={() => showLightbox && setSelectedPost(post)}
            />
          ))}
        </div>
      )}

      {/* Masonry Layout */}
      {layout === 'masonry' && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {displayPosts.map((post) => (
            <div key={`${post.platform}-${post.id}`} className="break-inside-avoid">
              <SocialPostCard
                post={post}
                showStats={showStats}
                theme={theme}
                onOpenLightbox={() => showLightbox && setSelectedPost(post)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Carousel Layout */}
      {layout === 'carousel' && (
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {displayPosts.map((post) => (
            <div
              key={`${post.platform}-${post.id}`}
              className="flex-shrink-0 w-72 snap-center"
            >
              <SocialPostCard
                post={post}
                showStats={showStats}
                theme={theme}
                onOpenLightbox={() => showLightbox && setSelectedPost(post)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPost && (
          <EmbedLightbox
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// UTILITIES
// ============================================================================

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { SocialPost, Platform, SocialFeedEmbedProps }
