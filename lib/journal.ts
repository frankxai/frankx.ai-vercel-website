import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { cache } from 'react'

/**
 * The public journal at /journal — short, dated entries.
 *
 * This is deliberately NOT the blog. /blog holds researched articles with
 * heroes, FAQ schema, and SEO intent; the journal holds daily notes and short
 * observations that are worth publishing but not worth producing. Reads
 * markdown from content/journal/ so a committed file is a published entry —
 * no code change. Mirrors the gray-matter pattern in lib/blog.ts and lib/mvu.ts
 * rather than inventing a third content system.
 *
 * Frontmatter contract (all optional except title + date):
 *   title:      string
 *   date:       YYYY-MM-DD
 *   kind:       'daily' | 'note' | 'log'      (default 'daily')
 *   summary:    one-line teaser for the index
 *   tags:       string[]
 *   visibility: 'public' | 'private'          (default 'public')
 *   published:  boolean                       (default true)
 *
 * Files whose name starts with `_` are skipped (that is where _TEMPLATE.md
 * lives), as are entries that are unpublished or private.
 *
 * `visibility: private` is the whole private-journal mechanism: the entry stays
 * in the repo and in Frank's editor, and is excluded from every public surface
 * — the index, its own URL, the sitemap, and the RSS feed. It is not access
 * control. A private entry committed to a public repo is still readable on
 * GitHub; it just is not published to frankx.ai.
 */

const journalDirectory = path.join(process.cwd(), 'content/journal')

export type JournalKind = 'daily' | 'note' | 'log'
export type JournalVisibility = 'public' | 'private'

const JOURNAL_KINDS: readonly JournalKind[] = ['daily', 'note', 'log']

/**
 * Display labels for entry kinds, shared so the index and the entry page agree.
 * Icons stay with the pages that render them — this module stays presentation-free.
 */
export const JOURNAL_KIND_LABEL: Record<JournalKind, string> = {
  daily: 'Daily',
  note: 'Note',
  log: 'Log',
}

/** Format a journal date consistently without letting the runtime timezone shift the day. */
export function formatJournalDate(date: string, month: 'short' | 'long'): string {
  if (!date) return ''
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month,
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export interface JournalEntry {
  slug: string
  title: string
  date: string
  kind: JournalKind
  summary: string
  tags: string[]
  visibility: JournalVisibility
  published: boolean
  readingTime: string
  content: string
}

export type JournalEntrySummary = Omit<JournalEntry, 'content'>

/**
 * Frontmatter dates arrive as either a string or a Date: YAML parses an
 * unquoted `date: 2026-07-26` into a Date, and `String()`-ing that yields
 * "Sun Jul 26 2026 …", which breaks the YYYY-MM month grouping and the
 * <time datetime> attribute. Normalize both shapes to YYYY-MM-DD so writing
 * the date the natural way cannot break the page.
 */
function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? '' : value.toISOString().slice(0, 10)
  }
  return typeof value === 'string' ? value.trim() : ''
}

function buildEntry(slug: string, data: Record<string, unknown>, content: string): JournalEntry {
  const kind = data.kind as JournalKind
  return {
    slug,
    title: String(data.title ?? slug),
    date: normalizeDate(data.date),
    kind: JOURNAL_KINDS.includes(kind) ? kind : 'daily',
    summary: String(data.summary ?? ''),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    visibility: data.visibility === 'private' ? 'private' : 'public',
    published: data.published !== false,
    readingTime: readingTime(content).text,
    content,
  }
}

function readAll(): JournalEntry[] {
  let fileNames: string[]
  try {
    fileNames = fs.readdirSync(journalDirectory)
  } catch {
    // Directory absent — an empty journal is a valid state, not an error.
    return []
  }

  return fileNames
    .filter((name) => !name.startsWith('_'))
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const { data, content } = matter(
        fs.readFileSync(path.join(journalDirectory, fileName), 'utf8'),
      )
      return buildEntry(slug, data, content)
    })
    .sort((a, b) => {
      // Newest first. Must return 0 for equal dates — several notes can share a
      // day, and a comparator that never returns 0 gives them a non-deterministic
      // order that then flows into prev/next links, the feed, and the sitemap.
      // Unparseable dates sort last instead of poisoning the comparison with NaN.
      const at = new Date(a.date).getTime()
      const bt = new Date(b.date).getTime()
      if (Number.isNaN(at) && Number.isNaN(bt)) return 0
      if (Number.isNaN(at)) return 1
      if (Number.isNaN(bt)) return -1
      return bt - at
    })
}

function isPublic(entry: JournalEntry): boolean {
  return entry.published && entry.visibility === 'public'
}

/** Public entries only — what the live site shows. Newest first. */
export const getJournalEntries = cache((): JournalEntry[] => readAll().filter(isPublic))

export const getJournalEntrySummaries = cache((): JournalEntrySummary[] =>
  getJournalEntries().map(({ content: _content, ...rest }) => rest),
)

export const getJournalEntry = cache((slug: string): JournalEntry | null => {
  return getJournalEntries().find((entry) => entry.slug === slug) ?? null
})

/** Newest-first entries grouped into month buckets for the index. */
export function getJournalEntriesByMonth(): Array<{
  key: string
  label: string
  entries: JournalEntrySummary[]
}> {
  const buckets = new Map<string, JournalEntrySummary[]>()

  for (const entry of getJournalEntrySummaries()) {
    const parsed = new Date(entry.date)
    const key = Number.isNaN(parsed.getTime()) ? 'undated' : entry.date.slice(0, 7)
    const bucket = buckets.get(key)
    if (bucket) bucket.push(entry)
    else buckets.set(key, [entry])
  }

  return Array.from(buckets.entries()).map(([key, entries]) => ({
    key,
    label:
      key === 'undated'
        ? 'Undated'
        : new Date(`${key}-01T00:00:00Z`).toLocaleDateString('en-GB', {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
          }),
    entries,
  }))
}

/**
 * Adjacent entries in reverse-chronological order, for prev/next links on an
 * entry page. `newer` is the entry published after this one.
 */
export function getAdjacentJournalEntries(slug: string): {
  newer: JournalEntrySummary | null
  older: JournalEntrySummary | null
} {
  const entries = getJournalEntrySummaries()
  const index = entries.findIndex((entry) => entry.slug === slug)
  if (index === -1) return { newer: null, older: null }
  return {
    newer: entries[index - 1] ?? null,
    older: entries[index + 1] ?? null,
  }
}
