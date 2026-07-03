import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { cache } from 'react'
import imageNeeds from '@/data/tools/image-needs.json'

const blogDirectory = path.join(process.cwd(), 'content/blog')
const blogImageFallback = '/images/blog/editorial/headers/best-ai-tools-for-creators-2026-hero.webp'
const pendingBlogHeroPaths = new Set(
  (imageNeeds.needs as Array<{ heroPath: string; status?: string }>)
    .filter((need) => need.status?.startsWith('pending'))
    .map((need) => need.heroPath)
)

// FAQ item for AI-extractable structured content
export interface FAQItem {
  q: string
  a: string
}

// Multi-part series membership. Articles sharing a series.slug are linked
// together (prev/next nav + "Part N of M") by SeriesNav.
export interface BlogSeries {
  slug: string // stable series id, e.g. "higher-self-protocol"
  title: string // display title, e.g. "The Higher Self Protocol"
  part: number // 1-based position of this article in the series
  total: number // total parts planned (for "Part N of M")
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  image?: string
  readingTime: string
  keywords?: string[]
  readingGoal?: string
  content?: string
  featured?: boolean
  flagship?: boolean
  flagshipOrder?: number
  canonical?: string // Override canonical URL (point a duplicate at its primary)

  // AI-First Content Fields
  tldr?: string // 50-word summary for AI extraction
  faq?: FAQItem[] // Question-answer pairs for FAQPage schema
  schema?: string[] // Schema types to generate (Article, FAQPage, HowTo)
  lastUpdated?: string // Freshness signal for search engines

  // Series membership (optional) — drives SeriesNav prev/next
  series?: BlogSeries

  /**
   * AI Architect Recommendation box (rendered after the Reading Goal).
   * The signature format: the routing call, which AI CoE pillar the decision
   * lives in, and which agent personas should run what.
   */
  architectNote?: {
    recommendation: string
    coePillar?: string
    personas?: Array<{ persona: string; pick: string }>
  }
}

export type BlogPostSummary = Omit<BlogPost, 'content'>

// Normalize frontmatter field variants to canonical BlogPost fields
function normalizeFrontmatter(data: Record<string, any>): Record<string, any> {
  const normalized = { ...data }
  if (!normalized.date && normalized.publishedAt) {
    normalized.date = normalized.publishedAt
  }
  if (!normalized.description && normalized.excerpt) {
    normalized.description = normalized.excerpt
  }
  if (!normalized.lastUpdated && normalized.updatedAt) {
    normalized.lastUpdated = normalized.updatedAt
  }
  if (!normalized.keywords && normalized.seo?.keywords) {
    normalized.keywords = normalized.seo.keywords
  }
  return normalized
}

// Themed fallback: pick the most relevant hero based on slug keywords.
// No filesystem access — pure string matching so Turbopack can tree-shake safely.
function themedImageFallback(slug: string): string {
  if (/video|short|youtube|image|photo|camera|canva|capcut|descript|heygen|higgsfield|opus|presentation|gamma/.test(slug)) {
    return '/images/blog/generated/ai-image-video-generation-playbook-2026-premium-hero.png'
  }
  if (/claude|chatgpt|gemini|gpt|grok|llm|model|frontier|local/.test(slug)) {
    return '/images/blog/editorial/headers/ai-model-routing-guide-hero.webp'
  }
  if (/agent|workflow|automation|n8n|builder|production|acos|creator-os/.test(slug)) {
    return '/images/blog/generated/production-agentic-ai-systems-premium-hero.png'
  }
  if (/code|coding|cursor|windsurf|claude-code/.test(slug)) {
    return '/images/blog/generated/ultimate-guide-ai-coding-agents-2026-premium-hero.png'
  }
  if (/soul|conscious|higher-self|frequency|music|spiritual/.test(slug)) {
    return '/images/blog/editorial/headers/ai-model-routing-guide-hero.webp'
  }
  if (/creator|golden-age|independent|solopreneur/.test(slug)) {
    return '/images/blog/generated/production-agentic-ai-systems-premium-hero.png'
  }
  return blogImageFallback
}

function resolveBlogImage(image: unknown, slug: string): string | undefined {
  // No image in frontmatter — use themed fallback based on slug
  if (typeof image !== 'string' || image.trim() === '') {
    return themedImageFallback(slug)
  }
  // External or relative — use as-is
  if (!image.startsWith('/')) return image

  // If the frontmatter image path is flagged as a pending/placeholder, use themed fallback
  if (pendingBlogHeroPaths.has(image)) return themedImageFallback(slug)

  // Otherwise trust the frontmatter path — it will resolve to a 404 image at runtime
  // only if the file was renamed, but that is preferable to Turbopack bundling all of /public
  return image
}

function buildBlogPost(slug: string, data: Record<string, any>, content: string): BlogPost {
  const normalized = normalizeFrontmatter(data)
  const readTime = readingTime(content)

  return {
    slug,
    content,
    readingTime: readTime.text,
    ...normalized,
    image: resolveBlogImage(normalized.image, slug),
  } as BlogPost
}

export const getAllBlogPosts = cache((): BlogPost[] => {
  const fileNames = fs.readdirSync(blogDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(blogDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      return buildBlogPost(slug, data, content)
    })

  return allPostsData.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
})

export const getAllBlogPostSummaries = cache((): BlogPostSummary[] => {
  return getAllBlogPosts().map(({ content: _content, ...post }) => post)
})

export const getBlogPost = cache((slug: string): BlogPost | null => {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`)

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return buildBlogPost(slug, data, content)
  } catch {
    return null
  }
})

export function getFeaturedPosts(): BlogPost[] {
  return getAllBlogPosts().filter(post => post.featured).slice(0, 3)
}

/**
 * Curated flagship articles — the editorial best-of, shown first on the blog
 * index with large visuals. Driven by `flagship: true` frontmatter and ordered
 * by `flagshipOrder` (ascending). Distinct from the broad `featured` flag.
 */
export function getFlagshipPosts(): BlogPost[] {
  return getAllBlogPosts()
    .filter((post) => post.flagship)
    .sort((a, b) => (a.flagshipOrder ?? 99) - (b.flagshipOrder ?? 99))
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  )
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Return every published post in a series, ordered by part number.
 * Used by SeriesNav to resolve prev/next and the "Part N of M" rail.
 */
export function getSeriesPosts(seriesSlug: string): BlogPost[] {
  return getAllBlogPosts()
    .filter(post => post.series?.slug === seriesSlug)
    .sort((a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0))
}

/**
 * Extract FAQ pairs from MDX content body.
 * Handles two formats:
 *   1. **Q: Question?** followed by answer text
 *   2. ### Question? followed by answer paragraph(s)
 * Only looks within ## FAQ or ## Frequently Asked Questions sections.
 */
export function extractFAQFromContent(content: string): { question: string; answer: string }[] {
  // Find the FAQ section.
  // NOTE: no `m` flag on purpose — with `m`, `$` matches at every end-of-line,
  // so the lazy capture stops at the first newline and the section comes back
  // empty (zero FAQ pairs for every post). Anchor the heading with `(?:^|\n)`
  // instead so `$` here means end-of-string.
  const faqMatch = content.match(/(?:^|\n)## (?:FAQ|Frequently Asked[^\n]*)\n([\s\S]*?)(?=\n## [^#]|\n---\n|$)/)
  if (!faqMatch) return []

  const faqSection = faqMatch[1]
  const faqs: { question: string; answer: string }[] = []

  // Pattern 1: **Q: Question?** \n Answer
  const boldQPattern = /\*\*Q:\s*(.+?)\*\*\s*\n([\s\S]*?)(?=\*\*Q:|### |$)/g
  let match
  while ((match = boldQPattern.exec(faqSection)) !== null) {
    const question = match[1].trim()
    const answer = match[2].trim()
    if (question && answer) {
      faqs.push({ question, answer })
    }
  }

  // Pattern 2: ### Question? \n\n Answer paragraph
  if (faqs.length === 0) {
    const h3Pattern = /### (.+?)\n\n([\s\S]*?)(?=\n### |\n## |$)/g
    while ((match = h3Pattern.exec(faqSection)) !== null) {
      const question = match[1].trim()
      const answer = match[2].trim()
      if (question && answer) {
        faqs.push({ question, answer })
      }
    }
  }

  return faqs
}
