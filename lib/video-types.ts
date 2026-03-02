// ============================================================================
// VIDEO INTELLIGENCE SYSTEM — Shared Types
// Used by: /watch, /admin/youtube, /content-strategy, SEO schema, ACOS commands
// ============================================================================

// --- Core Video Types ---

export interface VaultVideo {
  id: string
  title: string
  channel?: string
  author?: string
  url: string
  duration: string
  topic?: string
  category?: string
  embeddable?: boolean
  tags: string[]
}

export interface LibraryVideo {
  id: string
  title: string
  author: string
  category: string
  personas: string[]
  tags: string[]
  description: string
  featured: boolean
  level?: 'intro' | 'intermediate' | 'advanced'
  isRitual?: boolean
}

export interface StagingVideo {
  id: string
  title: string
  channel: string
  category: string
  status: 'discovered' | 'staged' | 'published' | 'archived'
  tags: string[]
  persona: string
}

/** Merged view of a video across all 3 data sources */
export interface EnhancedVideo {
  id: string
  title: string
  author: string
  url: string
  duration: string
  category: string
  tags: string[]
  description: string
  personas: string[]
  featured: boolean
  embeddable: boolean
  status: StagingVideo['status']
  level: 'intro' | 'intermediate' | 'advanced'
}

// --- Watchlist Types ---

export interface Watchlist {
  id: string
  title: string
  description: string
  icon: string
  videoIds: string[]
  color: string
}

// --- Category & Cross-link Types ---

export interface CategorySummary {
  name: string
  count: number
  icon: string
}

export interface BlogCrossLink {
  slug: string
  title: string
  videoIds: string[]
  category: string
}

export interface VideoCrossRefs {
  videoToBlog: Record<string, string[]>
  blogToVideo: Record<string, string[]>
  videoToWatchlist: Record<string, string[]>
}

// --- Admin Types ---

export type VideoStatus = 'discovered' | 'annotated' | 'queued' | 'clipped' | 'published'

export interface VideoTimestamp {
  time: string  // MM:SS format
  seconds: number
  label: string
  type: 'highlight' | 'chapter' | 'quote' | 'clip-start' | 'clip-end'
  clipCandidate: boolean
}

export interface VideoAnnotation {
  videoId: string
  timestamps: VideoTimestamp[]
  notes: string
  updatedAt: string
}

export interface ClipQueueItem {
  id: string
  videoId: string
  videoTitle: string
  startTime: string
  endTime: string
  clipTitle: string
  status: VideoStatus
  viralScore: number  // 1-10
  targetPlatform: ('youtube-shorts' | 'tiktok' | 'reels' | 'x')[]
  createdAt: string
  updatedAt: string
}

// --- Video Creation Types ---

export interface VideoSlot {
  date: string
  title: string
  pillar: 'ai-architecture' | 'music-production' | 'creator-tools' | 'opinion' | 'shorts'
  status: 'idea' | 'scripted' | 'recorded' | 'edited' | 'published'
  format?: 'tutorial' | 'analysis' | 'short' | 'vlog' | 'review'
  duration?: string
  notes: string
}

export interface VideoCreationCalendar {
  weeks: {
    weekOf: string
    slots: VideoSlot[]
  }[]
}

// --- Schema Types ---

export interface VideoObjectSchema {
  '@type': 'VideoObject'
  name: string
  description?: string
  thumbnailUrl: string
  uploadDate?: string
  duration?: string
  contentUrl?: string
  embedUrl: string
  interactionStatistic?: {
    '@type': 'InteractionCounter'
    interactionType: { '@type': 'WatchAction' }
    userInteractionCount?: number
  }
  hasPart?: ClipSchema[]
}

export interface ClipSchema {
  '@type': 'Clip'
  name: string
  startOffset: number
  endOffset?: number
  url?: string
}
