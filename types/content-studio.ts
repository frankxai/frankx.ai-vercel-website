// Content Studio Type Definitions
// Manages multi-platform social media content creation, scheduling, and publishing

export type Platform = 'linkedin' | 'twitter' | 'instagram'

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed'

export type ContentType = 'text' | 'image' | 'video' | 'carousel' | 'thread'

export interface Account {
  id: string
  name: string
  platform: Platform
  handle: string
  avatar?: string
  bio?: string
  verified?: boolean
  active: boolean
  credentials?: {
    apiKey?: string
    accessToken?: string
    refreshToken?: string
    expiresAt?: string
  }
}

export interface MediaAsset {
  id: string
  url: string
  type: 'image' | 'video'
  alt?: string
  width?: number
  height?: number
  size?: number
  format?: string
}

export interface ThreadPost {
  order: number
  body: string
  media?: MediaAsset[]
}

export interface PostAnalytics {
  views?: number
  likes?: number
  shares?: number
  comments?: number
  clicks?: number
  engagement?: number
  reach?: number
  impressions?: number
  fetchedAt?: string
}

export interface Post {
  id: string
  accountId: string
  platform: Platform
  contentType: ContentType
  status: PostStatus

  // Content
  body: string
  bodyWithHashtags?: string
  hashtags: string[]
  media?: MediaAsset[]
  thread?: ThreadPost[] // For Twitter threads

  // Scheduling
  schedule?: {
    publishAt: string
    timezone: string
    autoPost: boolean
  }

  // Publishing
  published?: {
    publishedAt: string
    url: string
    platformId: string
  }

  // Analytics
  analytics?: PostAnalytics

  // Source tracking
  source?: {
    type: 'blog' | 'manual' | 'template' | 'agent'
    id?: string // Blog slug, template ID, etc.
    title?: string
  }

  // AI generation metadata
  generation?: {
    agentId: string
    model: string
    prompt: string
    generatedAt: string
  }

  // Metadata
  createdAt: string
  updatedAt: string
  createdBy?: string
}

export interface CalendarDay {
  date: string // ISO date
  posts: Post[]
}

export interface WorkflowConfig {
  id: string
  name: string
  description: string
  enabled: boolean
  trigger: {
    type: 'blog_publish' | 'manual' | 'schedule'
    schedule?: string // Cron expression
  }
  actions: {
    type: 'generate_linkedin' | 'generate_twitter' | 'generate_instagram' | 'publish' | 'notify'
    accountId?: string
    config?: Record<string, unknown>
  }[]
}

export interface ContentStudioData {
  accounts: Account[]
  posts: Post[]
  workflows: WorkflowConfig[]
  lastUpdated: string
}
