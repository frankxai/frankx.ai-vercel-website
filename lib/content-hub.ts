import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

// ─── Types ─────────────────────────────────────────────────────

export interface BlogArticle {
  slug: string
  title: string
  description: string
  date: string
  lastModified?: string
  author: string
  category: string
  tags: string[]
  keywords?: string[]
  featured: boolean
  image?: string
  readingTime?: string
  wordCount: number
  filePath: string
}

export interface SocialPost {
  platform: 'twitter' | 'linkedin' | 'newsletter'
  content: string | string[]
  status: 'draft' | 'scheduled' | 'published'
}

export interface SocialQueueItem {
  id: string
  source: string
  createdAt: string
  status: string
  platforms: Record<string, SocialPost>
}

export interface MediaAsset {
  type: 'hero' | 'infographic' | 'social' | 'thumbnail' | 'other'
  path: string
  filename: string
  hasThumbnail: boolean
}

export interface ContentItem {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  featured: boolean
  image?: string
  readingTime?: string
  wordCount: number
  // Media assets
  media: MediaAsset[]
  mediaCount: number
  hasHeroImage: boolean
  hasThumbnail: boolean
  // Social coverage
  hasSocial: boolean
  socialPlatforms: string[]
  socialStatus: Record<string, string>
  // Pipeline stage
  pipelineStage: PipelineStage
}

export type PipelineStage =
  | 'draft'
  | 'review'
  | 'images'
  | 'published'
  | 'distributed'
  | 'analyzed'

export interface PipelineStats {
  total: number
  byStage: Record<PipelineStage, number>
  socialCoverage: number // percentage
  drafts: number
  published: number
  withSocial: number
  withoutSocial: number
  platformCounts: Record<string, number>
}

// ─── File paths ────────────────────────────────────────────────

const ROOT = process.cwd()
const BLOG_DIR = join(ROOT, 'content', 'blog')
const BLOG_IMAGES_DIR = join(ROOT, 'public', 'images', 'blog')
const SOCIAL_QUEUE_PATH = join(ROOT, 'data', 'social-queue.json')
const CONTENT_QUEUE_PATH = join(ROOT, 'data', 'content-queue', 'queue.json')
const BLOG_INVENTORY_PATH = join(ROOT, 'data', 'inventories', 'frankx', 'blog-articles.json')

// ─── Raw data loaders ──────────────────────────────────────────

function loadSocialQueue(): SocialQueueItem[] {
  if (!existsSync(SOCIAL_QUEUE_PATH)) return []
  try {
    const data = JSON.parse(readFileSync(SOCIAL_QUEUE_PATH, 'utf-8'))
    return data.queue || []
  } catch {
    return []
  }
}

function loadContentQueue(): { pending: unknown[]; completed: unknown[] } {
  if (!existsSync(CONTENT_QUEUE_PATH)) return { pending: [], completed: [] }
  try {
    return JSON.parse(readFileSync(CONTENT_QUEUE_PATH, 'utf-8'))
  } catch {
    return { pending: [], completed: [] }
  }
}

function loadBlogInventory(): { articles: Array<Record<string, unknown>>; _count: number } {
  if (!existsSync(BLOG_INVENTORY_PATH)) return { articles: [], _count: 0 }
  try {
    return JSON.parse(readFileSync(BLOG_INVENTORY_PATH, 'utf-8'))
  } catch {
    return { articles: [], _count: 0 }
  }
}

// ─── Blog articles from MDX frontmatter (live) ────────────────

function getBlogArticlesFromMDX(): BlogArticle[] {
  if (!existsSync(BLOG_DIR)) return []

  const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  const articles: BlogArticle[] = []

  for (const file of files) {
    try {
      const filePath = join(BLOG_DIR, file)
      const raw = readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)

      if (!data.title) continue

      const wordCount = content.split(/\s+/).filter(Boolean).length
      const slug = file.replace('.mdx', '')

      articles.push({
        slug,
        title: data.title,
        description: data.description || '',
        date: data.date || '',
        lastModified: data.lastModified,
        author: data.author || 'Frank',
        category: data.category || 'General',
        tags: data.tags || [],
        keywords: data.keywords,
        featured: data.featured || false,
        image: data.image,
        readingTime: data.readingTime || `${Math.ceil(wordCount / 250)} min`,
        wordCount,
        filePath: `content/blog/${file}`,
      })
    } catch {
      // Skip files that fail to parse
    }
  }

  // Sort by date descending
  articles.sort((a, b) => {
    const da = new Date(a.date || 0).getTime()
    const db = new Date(b.date || 0).getTime()
    return db - da
  })

  return articles
}

// ─── Media asset scanning ──────────────────────────────────────

function scanMediaForSlug(slug: string, heroImagePath?: string): MediaAsset[] {
  if (!existsSync(BLOG_IMAGES_DIR)) return []

  try {
    const allFiles = readdirSync(BLOG_IMAGES_DIR)
    const assets: MediaAsset[] = []

    // Build slug prefix for partial matching (first 2-3 hyphen-delimited words)
    // e.g. "acos-v10-autonomous-intelligence" → tries "acos-v10" (2-word prefix)
    const slugParts = slug.split('-')
    const slugPrefix = slugParts.length > 2 ? slugParts.slice(0, 2).join('-') : slug

    // Match files that start with the slug, contain it, or match the prefix
    const matchingFiles = allFiles.filter(f => {
      const lower = f.toLowerCase()
      if (lower.startsWith(slug) || lower.includes(slug)) return true
      // Partial prefix match (e.g. "acos-v10" matches "acos-v10-social-infographic.png")
      if (slugPrefix.length >= 6 && lower.startsWith(slugPrefix)) return true
      // Match hero image filename from frontmatter
      if (heroImagePath) {
        const heroFilename = heroImagePath.split('/').pop()?.toLowerCase()
        if (heroFilename) {
          const heroBase = heroFilename.replace(/\.[^.]+$/, '')
          if (lower.startsWith(heroBase)) return true
        }
      }
      return false
    })

    // Also check for files referenced by the article's hero image
    const imageExts = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.mp4', '.webm']

    for (const file of matchingFiles) {
      const ext = file.substring(file.lastIndexOf('.')).toLowerCase()
      if (!imageExts.includes(ext)) continue
      if (file.includes('_thumb')) continue // skip thumbnails, tracked via hasThumbnail

      const hasThumbnail = matchingFiles.some(
        f => f === file.replace(ext, '_thumb.jpeg') || f === file.replace(ext, '_thumb.png')
      )

      let type: MediaAsset['type'] = 'other'
      if (file.includes('hero')) type = 'hero'
      else if (file.includes('twitter') || file.includes('linkedin') || file.includes('social')) type = 'social'
      else if (file.includes('infographic') || file.includes('diagram') || file.includes('architecture') || file.includes('stack') || file.includes('flow')) type = 'infographic'
      else type = 'hero' // Default: if it matches the slug, it's likely the hero

      assets.push({
        type,
        path: `/images/blog/${file}`,
        filename: file,
        hasThumbnail,
      })
    }

    return assets
  } catch {
    return []
  }
}

// ─── Social coverage mapping ───────────────────────────────────

function buildSocialCoverageMap(): Map<string, { platforms: string[]; statuses: Record<string, string> }> {
  const queue = loadSocialQueue()
  const map = new Map<string, { platforms: string[]; statuses: Record<string, string> }>()

  for (const item of queue) {
    const slug = item.source
    const platforms: string[] = []
    const statuses: Record<string, string> = {}

    for (const [platform, post] of Object.entries(item.platforms)) {
      platforms.push(platform)
      statuses[platform] = (post as SocialPost).status || 'draft'
    }

    map.set(slug, { platforms, statuses })
  }

  return map
}

// ─── Determine pipeline stage ──────────────────────────────────

function determinePipelineStage(
  article: BlogArticle,
  hasSocial: boolean,
  socialStatuses: Record<string, string>
): PipelineStage {
  // Check if any social content is published
  const hasPublishedSocial = Object.values(socialStatuses).some(s => s === 'published')
  if (hasPublishedSocial) return 'distributed'

  // Has social content (even draft) means it's been through distribution generation
  if (hasSocial) return 'distributed'

  // Has an image = published stage
  if (article.image) return 'published'

  // Has a date = at minimum published
  if (article.date) return 'published'

  return 'draft'
}

// ─── Public API ────────────────────────────────────────────────

export function getAllContent(): ContentItem[] {
  const articles = getBlogArticlesFromMDX()
  const socialMap = buildSocialCoverageMap()

  return articles.map(article => {
    const social = socialMap.get(article.slug)
    const hasSocial = !!social
    const socialPlatforms = social?.platforms || []
    const socialStatus = social?.statuses || {}
    const media = scanMediaForSlug(article.slug, article.image)
    const hasHeroImage = !!article.image || media.some(m => m.type === 'hero')
    const hasThumbnail = media.some(m => m.hasThumbnail)

    return {
      slug: article.slug,
      title: article.title,
      description: article.description,
      date: article.date,
      category: article.category,
      tags: article.tags,
      featured: article.featured,
      image: article.image,
      readingTime: article.readingTime,
      wordCount: article.wordCount,
      media,
      mediaCount: media.length,
      hasHeroImage,
      hasThumbnail,
      hasSocial,
      socialPlatforms,
      socialStatus,
      pipelineStage: determinePipelineStage(article, hasSocial, socialStatus),
    }
  })
}

export function getContentBySlug(slug: string): {
  article: BlogArticle
  social: SocialQueueItem | null
} | null {
  const articles = getBlogArticlesFromMDX()
  const article = articles.find(a => a.slug === slug)
  if (!article) return null

  const queue = loadSocialQueue()
  const social = queue.find(q => q.source === slug) || null

  return { article, social }
}

export function getPipelineStats(): PipelineStats {
  const content = getAllContent()
  const socialQueue = loadSocialQueue()

  const byStage: Record<PipelineStage, number> = {
    draft: 0,
    review: 0,
    images: 0,
    published: 0,
    distributed: 0,
    analyzed: 0,
  }

  let withSocial = 0
  let withoutSocial = 0
  const platformCounts: Record<string, number> = {
    twitter: 0,
    linkedin: 0,
    newsletter: 0,
  }

  for (const item of content) {
    byStage[item.pipelineStage]++
    if (item.hasSocial) {
      withSocial++
      for (const p of item.socialPlatforms) {
        platformCounts[p] = (platformCounts[p] || 0) + 1
      }
    } else {
      withoutSocial++
    }
  }

  // Count platform entries from social queue
  for (const item of socialQueue) {
    for (const platform of Object.keys(item.platforms)) {
      platformCounts[platform] = (platformCounts[platform] || 0)
    }
  }

  return {
    total: content.length,
    byStage,
    socialCoverage: content.length > 0 ? Math.round((withSocial / content.length) * 100) : 0,
    drafts: byStage.draft,
    published: byStage.published + byStage.distributed + byStage.analyzed,
    withSocial,
    withoutSocial,
    platformCounts,
  }
}

export function getArticlesNeedingSocial(): ContentItem[] {
  const content = getAllContent()
  return content.filter(c => !c.hasSocial && c.pipelineStage !== 'draft')
}
