import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { cache } from 'react'

const issuesDirectory = path.join(process.cwd(), 'content/newsletters/issues')

export interface NewsletterIssue {
  /** Issue number, starts at 1 */
  issue: number
  /** URL slug — used at /newsletter/archive/{slug} */
  slug: string
  /** Subject line, ≤ 60 chars */
  subject: string
  /** Preview text, ≤ 100 chars */
  preview: string
  /** ISO date (yyyy-mm-dd) the issue ships */
  date: string
  /** ISO timestamp with timezone — when Resend triggers send */
  sendAt?: string
  /** One-line theme */
  theme: string
  /** Spotlight headline (60% section) */
  spotlight?: string
  /** Cross-references to other site surfaces this issue reinforces */
  connectsTo?: string[]
  /** Lifecycle status */
  status: 'draft' | 'staged' | 'scheduled' | 'sent' | 'archived'
  /** Did this issue cross-post to /blog/? */
  crossPost?: boolean
  /** @integrity-guard verdict — pending | pass | warn | fail */
  gateStatus?: 'pending' | 'pass' | 'warn' | 'fail'
  /** Author (defaults to Frank Riemer) */
  author?: string
  /** Approximate reading time */
  readingTime?: string
  /** Body MDX */
  content: string
}

function readIssueFile(filename: string): NewsletterIssue | null {
  const fullPath = path.join(issuesDirectory, filename)
  if (!fs.existsSync(fullPath)) return null

  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)

  if (typeof data.issue !== 'number' || !data.slug || !data.subject) {
    return null
  }

  const minutes = Math.max(1, Math.round(readingTime(content).minutes))

  return {
    issue: data.issue,
    slug: data.slug,
    subject: data.subject,
    preview: data.preview || '',
    date: data.date,
    sendAt: data.sendAt,
    theme: data.theme || '',
    spotlight: data.spotlight,
    connectsTo: Array.isArray(data.connectsTo) ? data.connectsTo : undefined,
    status: data.status || 'draft',
    crossPost: data.crossPost === true,
    gateStatus: data.gateStatus,
    author: data.author || 'Frank Riemer',
    readingTime: `${minutes} min read`,
    content,
  }
}

/**
 * Loads all newsletter issues from content/newsletters/issues/.
 * Sorted newest issue first.
 */
export const getAllIssues = cache((): NewsletterIssue[] => {
  if (!fs.existsSync(issuesDirectory)) return []

  const files = fs.readdirSync(issuesDirectory).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
  const issues = files
    .map((f) => readIssueFile(f))
    .filter((x): x is NewsletterIssue => x !== null)

  return issues.sort((a, b) => b.issue - a.issue)
})

/**
 * Loads only published (sent) issues — what shows on /newsletter/archive.
 */
export const getPublishedIssues = cache((): NewsletterIssue[] => {
  return getAllIssues().filter((i) => i.status === 'sent' || i.status === 'archived')
})

/**
 * Loads a single issue by slug.
 */
export function getIssue(slug: string): NewsletterIssue | null {
  return getAllIssues().find((i) => i.slug === slug) || null
}

/**
 * Latest issue (any status) — used for the /newsletter landing-page callout.
 */
export function getLatestIssue(): NewsletterIssue | null {
  const all = getAllIssues()
  return all[0] || null
}

/**
 * Latest published (sent) issue — used in places that should never show drafts.
 */
export function getLatestPublishedIssue(): NewsletterIssue | null {
  const published = getPublishedIssues()
  return published[0] || null
}
