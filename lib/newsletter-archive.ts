/**
 * Newsletter archive — reads issues from `content/newsletters/issues/`.
 *
 * Each issue is a `.mdx` file with frontmatter:
 *
 *   ---
 *   title: "AI Architect Newsletter — Issue 1"
 *   slug: "2026-05-23-w21"
 *   sentDate: "2026-05-23"
 *   subject: "..."
 *   preheader: "..."
 *   excerpt: "1-2 sentence summary for archive index + RSS"
 *   ---
 *
 *   # Markdown body
 *
 * Per W21 decision: starts fresh from Friday 2026-05-23. Old placeholder
 * files in `content/newsletters/{themes,daily,inspiration}/` are NOT
 * surfaced — those were templates, not actual sends.
 */

import fs from 'node:fs'
import path from 'node:path'

const ISSUES_DIR = path.join(process.cwd(), 'content', 'newsletters', 'issues')

export interface NewsletterIssue {
  slug: string
  title: string
  sentDate: string // ISO date "YYYY-MM-DD"
  subject: string
  preheader?: string
  excerpt: string
  body: string // raw markdown after frontmatter
}

interface Frontmatter {
  title?: string
  slug?: string
  sentDate?: string
  subject?: string
  preheader?: string
  excerpt?: string
}

function parseFrontmatter(raw: string): { fm: Frontmatter; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { fm: {}, body: raw }
  const fm: Frontmatter = {}
  for (const line of match[1].split('\n')) {
    const m = line.match(/^([a-zA-Z_]+):\s*(.*)$/)
    if (!m) continue
    let value = m[2].trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    ;(fm as Record<string, string>)[m[1]] = value
  }
  return { fm, body: match[2] }
}

function fileToIssue(filename: string): NewsletterIssue | null {
  const full = path.join(ISSUES_DIR, filename)
  try {
    const raw = fs.readFileSync(full, 'utf-8')
    const { fm, body } = parseFrontmatter(raw)
    const slug = fm.slug || filename.replace(/\.mdx?$/, '')
    if (!fm.title || !fm.sentDate) return null
    return {
      slug,
      title: fm.title,
      sentDate: fm.sentDate,
      subject: fm.subject || fm.title,
      preheader: fm.preheader,
      excerpt: fm.excerpt || body.trim().split('\n').slice(0, 2).join(' ').slice(0, 200),
      body: body.trim(),
    }
  } catch {
    return null
  }
}

/** All issues sorted by sentDate DESC (newest first). */
export function getAllIssues(): NewsletterIssue[] {
  if (!fs.existsSync(ISSUES_DIR)) return []
  const files = fs
    .readdirSync(ISSUES_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
  const issues: NewsletterIssue[] = []
  for (const f of files) {
    const issue = fileToIssue(f)
    if (issue) issues.push(issue)
  }
  issues.sort((a, b) => b.sentDate.localeCompare(a.sentDate))
  return issues
}

export function getIssue(slug: string): NewsletterIssue | null {
  const all = getAllIssues()
  return all.find((i) => i.slug === slug) || null
}

export function getAllIssueSlugs(): string[] {
  return getAllIssues().map((i) => i.slug)
}
