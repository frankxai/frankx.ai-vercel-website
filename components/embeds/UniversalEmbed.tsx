'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Play, Maximize2, Volume2, VolumeX } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

type EmbedType =
  | 'youtube'
  | 'tiktok'
  | 'instagram'
  | 'twitter'
  | 'spotify'
  | 'soundcloud'
  | 'suno'
  | 'vimeo'
  | 'figma'
  | 'codepen'
  | 'github-gist'
  | 'loom'
  | 'miro'
  | 'notion'

interface UniversalEmbedProps {
  type: EmbedType
  id: string
  title?: string
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:3' | 'auto'
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  showControls?: boolean
  theme?: 'tech' | 'soul'
  className?: string
}

// ============================================================================
// EMBED CONFIGS
// ============================================================================

const embedConfigs: Record<
  EmbedType,
  {
    name: string
    color: string
    getEmbedUrl: (id: string, options: Partial<UniversalEmbedProps>) => string
    getDirectUrl: (id: string) => string
  }
> = {
  youtube: {
    name: 'YouTube',
    color: '#ff0000',
    getEmbedUrl: (id, { autoplay, muted, loop }) => {
      const params = new URLSearchParams()
      if (autoplay) params.set('autoplay', '1')
      if (muted) params.set('mute', '1')
      if (loop) params.set('loop', '1')
      params.set('rel', '0')
      return `https://www.youtube.com/embed/${id}?${params.toString()}`
    },
    getDirectUrl: (id) => `https://www.youtube.com/watch?v=${id}`,
  },
  tiktok: {
    name: 'TikTok',
    color: '#00f2ea',
    getEmbedUrl: (id) => `https://www.tiktok.com/embed/v2/${id}`,
    getDirectUrl: (id) => `https://www.tiktok.com/@user/video/${id}`,
  },
  instagram: {
    name: 'Instagram',
    color: '#e4405f',
    getEmbedUrl: (id) => `https://www.instagram.com/p/${id}/embed`,
    getDirectUrl: (id) => `https://www.instagram.com/p/${id}`,
  },
  twitter: {
    name: 'X',
    color: '#1da1f2',
    getEmbedUrl: (id) => `https://platform.twitter.com/embed/Tweet.html?id=${id}&theme=dark`,
    getDirectUrl: (id) => `https://twitter.com/i/status/${id}`,
  },
  spotify: {
    name: 'Spotify',
    color: '#1db954',
    getEmbedUrl: (id) => `https://open.spotify.com/embed/track/${id}?theme=0`,
    getDirectUrl: (id) => `https://open.spotify.com/track/${id}`,
  },
  soundcloud: {
    name: 'SoundCloud',
    color: '#ff5500',
    getEmbedUrl: (id) =>
      `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`,
    getDirectUrl: (id) => `https://soundcloud.com/tracks/${id}`,
  },
  suno: {
    name: 'Suno',
    color: '#10b981',
    getEmbedUrl: (id) => `https://suno.com/embed/${id}`,
    getDirectUrl: (id) => `https://suno.com/song/${id}`,
  },
  vimeo: {
    name: 'Vimeo',
    color: '#1ab7ea',
    getEmbedUrl: (id, { autoplay, muted, loop }) => {
      const params = new URLSearchParams()
      if (autoplay) params.set('autoplay', '1')
      if (muted) params.set('muted', '1')
      if (loop) params.set('loop', '1')
      return `https://player.vimeo.com/video/${id}?${params.toString()}`
    },
    getDirectUrl: (id) => `https://vimeo.com/${id}`,
  },
  figma: {
    name: 'Figma',
    color: '#f24e1e',
    getEmbedUrl: (id) => `https://www.figma.com/embed?embed_host=frankx&url=${encodeURIComponent(id)}`,
    getDirectUrl: (id) => id,
  },
  codepen: {
    name: 'CodePen',
    color: '#47cf73',
    getEmbedUrl: (id) => {
      const [user, pen] = id.split('/')
      return `https://codepen.io/${user}/embed/${pen}?default-tab=result&theme-id=dark`
    },
    getDirectUrl: (id) => {
      const [user, pen] = id.split('/')
      return `https://codepen.io/${user}/pen/${pen}`
    },
  },
  'github-gist': {
    name: 'GitHub Gist',
    color: '#24292e',
    getEmbedUrl: (id) => `https://gist.github.com/${id}.pibb`,
    getDirectUrl: (id) => `https://gist.github.com/${id}`,
  },
  loom: {
    name: 'Loom',
    color: '#625df5',
    getEmbedUrl: (id) => `https://www.loom.com/embed/${id}`,
    getDirectUrl: (id) => `https://www.loom.com/share/${id}`,
  },
  miro: {
    name: 'Miro',
    color: '#050038',
    getEmbedUrl: (id) => `https://miro.com/app/embed/${id}`,
    getDirectUrl: (id) => `https://miro.com/app/board/${id}`,
  },
  notion: {
    name: 'Notion',
    color: '#000000',
    getEmbedUrl: (id) => `https://notion.so/embed/${id}`,
    getDirectUrl: (id) => `https://notion.so/${id}`,
  },
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function UniversalEmbed({
  type,
  id,
  title,
  aspectRatio = '16:9',
  autoplay = false,
  muted = false,
  loop = false,
  showControls = true,
  theme = 'tech',
  className = '',
}: UniversalEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showEmbed, setShowEmbed] = useState(autoplay)

  const config = embedConfigs[type]
  if (!config) {
    console.error(`Unknown embed type: ${type}`)
    return null
  }

  const embedUrl = config.getEmbedUrl(id, { autoplay, muted, loop })
  const directUrl = config.getDirectUrl(id)

  const aspectClasses = {
    '16:9': 'aspect-video',
    '9:16': 'aspect-[9/16]',
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    auto: '',
  }

  const accentColor = theme === 'tech' ? '#10b981' : '#f59e0b'

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[#111113] border border-white/10 ${className}`}
    >
      {/* Header bar */}
      {showControls && (
        <div className="flex items-center justify-between px-4 py-2 bg-black/30 border-b border-white/5">
          <div
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: config.color }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: config.color }}
            />
            {config.name}
          </div>
          <div className="flex items-center gap-2">
            {title && (
              <span className="text-sm text-white/60 truncate max-w-[200px]">
                {title}
              </span>
            )}
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              title={`Open in ${config.name}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Embed container */}
      <div className={`relative ${aspectClasses[aspectRatio]}`}>
        {/* Click to load overlay (for non-autoplay) */}
        {!showEmbed && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowEmbed(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#18181b] to-[#0a0a0b] group cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${config.color}20` }}
            >
              <Play className="w-10 h-10 ml-1" style={{ color: config.color }} />
            </motion.div>
            <span className="text-white/70 group-hover:text-white transition-colors">
              Click to load {config.name}
            </span>
          </motion.button>
        )}

        {/* Actual embed iframe */}
        {showEmbed && (
          <>
            {/* Loading skeleton */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-[#111113] animate-pulse flex items-center justify-center">
                <div
                  className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: `${config.color} transparent transparent transparent` }}
                />
              </div>
            )}

            <iframe
              src={embedUrl}
              title={title || `${config.name} embed`}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setIsLoaded(true)}
            />
          </>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// MDX SHORTHAND COMPONENTS
// ============================================================================

// For easy MDX usage: <YouTubeEmbed id="..." />
export function YouTubeEmbed(props: Omit<UniversalEmbedProps, 'type'>) {
  return <UniversalEmbed type="youtube" {...props} />
}

export function TikTokEmbed(props: Omit<UniversalEmbedProps, 'type'>) {
  return <UniversalEmbed type="tiktok" aspectRatio="9:16" {...props} />
}

export function InstagramEmbed(props: Omit<UniversalEmbedProps, 'type'>) {
  return <UniversalEmbed type="instagram" aspectRatio="1:1" {...props} />
}

export function TwitterEmbed(props: Omit<UniversalEmbedProps, 'type'>) {
  return <UniversalEmbed type="twitter" aspectRatio="auto" {...props} />
}

export function SpotifyEmbed(props: Omit<UniversalEmbedProps, 'type'> & { id: string }) {
  return (
    <div className="h-20">
      <UniversalEmbed type="spotify" aspectRatio="auto" showControls={false} {...props} />
    </div>
  )
}

export function VimeoEmbed(props: Omit<UniversalEmbedProps, 'type'>) {
  return <UniversalEmbed type="vimeo" {...props} />
}

export function FigmaEmbed(props: Omit<UniversalEmbedProps, 'type'>) {
  return <UniversalEmbed type="figma" {...props} />
}

export function CodePenEmbed(props: Omit<UniversalEmbedProps, 'type'>) {
  return <UniversalEmbed type="codepen" {...props} />
}

export function SunoEmbed(props: Omit<UniversalEmbedProps, 'type'>) {
  return <UniversalEmbed type="suno" {...props} />
}

export function LoomEmbed(props: Omit<UniversalEmbedProps, 'type'>) {
  return <UniversalEmbed type="loom" {...props} />
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { EmbedType, UniversalEmbedProps }
