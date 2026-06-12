import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { cache } from 'react'

const blogDirectory = path.join(process.cwd(), 'content/blog')

// FAQ item for AI-extractable structured content
export interface FAQItem {
  q: string
  a: string
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
  content: string
  featured?: boolean

  // AI-First Content Fields
  tldr?: string // 50-word summary for AI extraction
  faq?: FAQItem[] // Question-answer pairs for FAQPage schema
  schema?: string[] // Schema types to generate (Article, FAQPage, HowTo)
  lastUpdated?: string // Freshness signal for search engines
}

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

export const getAllBlogPosts = cache((): BlogPost[] => {
  const fileNames = fs.readdirSync(blogDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(blogDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const readTime = readingTime(content)

      return {
        slug,
        content,
        readingTime: readTime.text,
        ...normalizeFrontmatter(data),
      } as BlogPost
    })

  return allPostsData.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
})


export const getBlogPost = cache((slug: string): BlogPost | null => {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`)

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const readTime = readingTime(content)

    return {
      slug,
      content,
      readingTime: readTime.text,
      ...normalizeFrontmatter(data),
    } as BlogPost
  } catch {
    return null
  }
})

export function getFeaturedPosts(): BlogPost[] {
  return getAllBlogPosts().filter(post => post.featured).slice(0, 3)
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
 * Extract FAQ pairs from MDX content body.
 * Handles two formats:
 *   1. **Q: Question?** followed by answer text
 *   2. ### Question? followed by answer paragraph(s)
 * Only looks within ## FAQ or ## Frequently Asked Questions sections.
 */
export function extractFAQFromContent(content: string): { question: string; answer: string }[] {
  // Find the FAQ section
  const faqMatch = content.match(/^## (?:FAQ|Frequently Asked[^\n]*)\n([\s\S]*?)(?=\n## [^#]|\n---\n|$)/m)
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

