import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { cache } from 'react'

/**
 * The MVU journey hub content collection.
 *
 * Reads markdown from content/mvu/ so anything Frank writes in Codex (journal
 * notes, essays, learnings) drops onto frankx.ai/mvu just by committing a file
 * — no code change. Mirrors the gray-matter pattern in lib/blog.ts rather than
 * inventing a second content system.
 *
 * Frontmatter contract (all optional except title + date):
 *   title:     string
 *   date:      YYYY-MM-DD
 *   kind:      'journal' | 'essay' | 'note'   (default 'note')
 *   layer:     'frank-note' | 'field-intelligence' | 'practice-guide'
 *   session:   human-readable event/session label
 *   provenance: short public explanation of the source boundary
 *   pullQuote: exact line used by the hub hero or cards
 *   recordedAt: optional human-readable capture time
 *   featured:  boolean
 *   summary:   one-line teaser for the hub list
 *   tags:      string[]
 *   published: boolean  (default true — set false to keep a draft out of prod)
 */

const mvuDirectory = path.join(process.cwd(), 'content/mvu')

export type MvuKind = 'journal' | 'essay' | 'note'
export type MvuLayer = 'frank-note' | 'field-intelligence' | 'practice-guide'

export interface MvuEntry {
  slug: string
  title: string
  date: string
  kind: MvuKind
  layer: MvuLayer
  session: string
  provenance: string
  pullQuote: string
  recordedAt: string
  featured: boolean
  summary: string
  tags: string[]
  published: boolean
  readingTime: string
  content: string
}

export type MvuEntrySummary = Omit<MvuEntry, 'content'>

function buildEntry(slug: string, data: Record<string, unknown>, content: string): MvuEntry {
  const kind = (data.kind as MvuKind) || 'note'
  const defaultLayer: MvuLayer = kind === 'journal' ? 'frank-note' : 'field-intelligence'
  const layer = (data.layer as MvuLayer) || defaultLayer
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    kind: (['journal', 'essay', 'note'] as const).includes(kind) ? kind : 'note',
    layer: (['frank-note', 'field-intelligence', 'practice-guide'] as const).includes(layer)
      ? layer
      : defaultLayer,
    session: String(data.session ?? ''),
    provenance: String(data.provenance ?? ''),
    pullQuote: String(data.pullQuote ?? ''),
    recordedAt: String(data.recordedAt ?? ''),
    featured: data.featured === true,
    summary: String(data.summary ?? ''),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    published: data.published !== false,
    readingTime: readingTime(content).text,
    content,
  }
}

function readAll(): MvuEntry[] {
  let fileNames: string[]
  try {
    fileNames = fs.readdirSync(mvuDirectory)
  } catch {
    // Directory absent (e.g. before the first entry is committed) — an empty
    // hub is a valid state, not an error.
    return []
  }

  return fileNames
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(mvuDirectory, fileName)
      const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
      return buildEntry(slug, data, content)
    })
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
}

/** Published entries only — what the live site shows. Newest first. */
export const getMvuEntries = cache((): MvuEntry[] =>
  readAll().filter((entry) => entry.published),
)

export const getMvuEntrySummaries = cache((): MvuEntrySummary[] =>
  getMvuEntries().map(({ content: _content, ...rest }) => rest),
)

export const getMvuEntry = cache((slug: string): MvuEntry | null => {
  const entry = readAll().find((e) => e.slug === slug && e.published)
  return entry ?? null
})

export function getMvuEntriesByKind(kind: MvuKind): MvuEntry[] {
  return getMvuEntries().filter((entry) => entry.kind === kind)
}
