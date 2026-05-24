/**
 * Server-side knowledge loader for the Studio Crew tools.
 *
 * Loads the catalog indexes lazily (singleton-per-process) and exposes
 * lexical search via Lunr. No vector DB needed — the 88-entry content
 * index + 559-entry route index fit in a single Gemini context window.
 */

import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import lunr from 'lunr'

export type EntryType =
  | 'blog'
  | 'product'
  | 'workshop'
  | 'route'
  | 'guide'
  | 'newsletter'
  | 'os'
  | 'video'
  | 'partnership'
  | 'core'
  | 'section'
  | 'static'
  | 'library'
  | 'community'
  | 'tool'
  | 'research'

export interface KnowledgeEntry {
  id: string
  type: EntryType
  title: string
  href: string
  description?: string
  tags?: string[]
  publishedAt?: string
  category?: string
}

const ROOT = process.cwd()
const CONTENT_INDEX_PATH = join(ROOT, 'data', 'content-index.json')
const ROUTE_INDEX_PATH = join(ROOT, 'data', 'route-index.json')

interface LoadedIndex {
  entries: KnowledgeEntry[]
  lunrIndex: lunr.Index
  byHref: Map<string, KnowledgeEntry>
}

let cached: LoadedIndex | null = null

function safeRead<T>(path: string, fallback: T): T {
  if (!existsSync(path)) return fallback
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as T
  } catch {
    return fallback
  }
}

function loadEntries(): KnowledgeEntry[] {
  const entries: KnowledgeEntry[] = []
  const seen = new Set<string>()

  const contentIdx = safeRead<{ entries?: any[] }>(CONTENT_INDEX_PATH, {})
  if (Array.isArray(contentIdx.entries)) {
    for (const e of contentIdx.entries) {
      if (!e?.href || !e?.title) continue
      if (seen.has(e.href)) continue
      seen.add(e.href)
      entries.push({
        id: e.id || e.href,
        type: (e.type as EntryType) || 'blog',
        title: String(e.title),
        href: String(e.href),
        description: e.description ? String(e.description) : undefined,
        tags: Array.isArray(e.tags) ? e.tags.map(String) : undefined,
        publishedAt: e.publishedAt ? String(e.publishedAt) : undefined,
        category: e.category ? String(e.category) : undefined,
      })
    }
  }

  const routeIdx = safeRead<{ routes?: any[] }>(ROUTE_INDEX_PATH, {})
  if (Array.isArray(routeIdx.routes)) {
    for (const r of routeIdx.routes) {
      if (!r?.href || !r?.title) continue
      if (seen.has(r.href)) continue
      seen.add(r.href)
      entries.push({
        id: r.href,
        type: (r.type as EntryType) || 'section',
        title: String(r.title),
        href: String(r.href),
        description: r.description ? String(r.description) : undefined,
      })
    }
  }

  return entries
}

function buildIndex(): LoadedIndex {
  const entries = loadEntries()
  const byHref = new Map<string, KnowledgeEntry>()
  for (const e of entries) byHref.set(e.href, e)

  const lunrIndex = lunr(function (this: lunr.Builder) {
    this.ref('id')
    this.field('title', { boost: 5 })
    this.field('description', { boost: 2 })
    this.field('tags', { boost: 3 })
    this.field('type')
    for (const e of entries) {
      this.add({
        id: e.id,
        title: e.title,
        description: e.description || '',
        tags: (e.tags || []).join(' '),
        type: e.type,
      })
    }
  })

  return { entries, lunrIndex, byHref }
}

function getIndex(): LoadedIndex {
  if (!cached) cached = buildIndex()
  return cached
}

export interface SearchOptions {
  limit?: number
  types?: EntryType[]
}

export function searchKnowledge(query: string, opts: SearchOptions = {}): KnowledgeEntry[] {
  const { entries, lunrIndex } = getIndex()
  const limit = opts.limit ?? 5
  const wantTypes = opts.types && opts.types.length > 0 ? new Set(opts.types) : null

  const trimmed = query.trim()
  if (!trimmed) return []

  let hits: { ref: string; score: number }[] = []
  try {
    hits = lunrIndex.search(trimmed)
  } catch {
    // Fall back to a tolerant wildcard search if the raw query has lunr operators
    try {
      const safe = trimmed
        .split(/\s+/)
        .filter(Boolean)
        .map((t) => `${t.replace(/[^a-zA-Z0-9]/g, '')}*`)
        .join(' ')
      hits = safe ? lunrIndex.search(safe) : []
    } catch {
      hits = []
    }
  }

  const byId = new Map(entries.map((e) => [e.id, e]))
  const results: KnowledgeEntry[] = []
  for (const h of hits) {
    const e = byId.get(h.ref)
    if (!e) continue
    if (wantTypes && !wantTypes.has(e.type)) continue
    results.push(e)
    if (results.length >= limit) break
  }
  return results
}

export function getEntryByHref(href: string): KnowledgeEntry | undefined {
  return getIndex().byHref.get(href)
}

export function listEntriesByType(type: EntryType, limit = 10): KnowledgeEntry[] {
  return getIndex().entries.filter((e) => e.type === type).slice(0, limit)
}
