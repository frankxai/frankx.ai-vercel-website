/**
 * Newsletter Archive Library
 * Manages newsletter issues stored as MDX files
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { cache } from 'react'

const newslettersDirectory = path.join(process.cwd(), 'content/newsletters')

export interface NewsletterIssue {
  slug: string
  issueNumber: number
  title: string
  date: string
  description: string
  excerpt: string
  content: string
  featured?: boolean
  tags?: string[]
}

/**
 * Get all newsletter issues sorted by issue number (descending)
 */
export const getAllNewsletters = cache((): NewsletterIssue[] => {
  // Create directory if it doesn't exist
  if (!fs.existsSync(newslettersDirectory)) {
    fs.mkdirSync(newslettersDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(newslettersDirectory)
  const newsletters = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(newslettersDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        ...data,
      } as NewsletterIssue
    })

  // Sort by issue number descending (newest first)
  return newsletters.sort((a, b) => b.issueNumber - a.issueNumber)
})

/**
 * Get a single newsletter by slug
 */
export const getNewsletter = cache((slug: string): NewsletterIssue | null => {
  try {
    const fullPath = path.join(newslettersDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...data,
    } as NewsletterIssue
  } catch {
    return null
  }
})

/**
 * Get featured newsletters
 */
export function getFeaturedNewsletters(): NewsletterIssue[] {
  return getAllNewsletters().filter((n) => n.featured).slice(0, 3)
}

/**
 * Get latest newsletter
 */
export function getLatestNewsletter(): NewsletterIssue | null {
  const newsletters = getAllNewsletters()
  return newsletters.length > 0 ? newsletters[0] : null
}

/**
 * Get newsletter count
 */
export function getNewsletterCount(): number {
  return getAllNewsletters().length
}
