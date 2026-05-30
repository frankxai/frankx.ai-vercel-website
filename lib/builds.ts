import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { cache } from 'react'

const buildsDirectory = path.join(process.cwd(), 'content/builds')

export type BuildStatus = 'live' | 'shipping' | 'wip' | 'paused' | 'archived'

export interface Build {
  slug: string
  title: string
  summary: string
  status: BuildStatus
  stack: string[]
  day_number?: number | null
  outcome_metric?: string | null
  demo_url?: string | null
  repo_url?: string | null
  started_at?: string
  last_updated?: string
  /** Optional one-line outcome framing used on the /build commercial gallery. */
  outcome_headline?: string
  /** Optional order override for the chronological build log. */
  sort_order?: number
  content?: string
}

const STATUS_LABEL: Record<BuildStatus, string> = {
  live: 'Live',
  shipping: 'Shipping',
  wip: 'Work in progress',
  paused: 'Paused',
  archived: 'Archived',
}

export function statusLabel(status: BuildStatus): string {
  return STATUS_LABEL[status] ?? status
}

/** Hide stale day-number badges to avoid public commitment debt (>30 days since last update). */
export function isDayNumberStale(build: Pick<Build, 'last_updated'>): boolean {
  if (!build.last_updated) return false
  const last = new Date(build.last_updated).getTime()
  if (Number.isNaN(last)) return false
  const days = (Date.now() - last) / (1000 * 60 * 60 * 24)
  return days > 30
}

export const getAllBuilds = cache((): Build[] => {
  if (!fs.existsSync(buildsDirectory)) return []

  const entries = fs.readdirSync(buildsDirectory).filter((f) => f.endsWith('.mdx'))
  const builds: Build[] = entries.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(buildsDirectory, file), 'utf8')
    const { data, content } = matter(raw)
    return {
      slug,
      title: String(data.title ?? slug),
      summary: String(data.summary ?? ''),
      status: (data.status ?? 'wip') as BuildStatus,
      stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
      day_number: data.day_number ?? null,
      outcome_metric: data.outcome_metric ?? null,
      demo_url: data.demo_url ?? null,
      repo_url: data.repo_url ?? null,
      started_at: data.started_at ? String(data.started_at) : undefined,
      last_updated: data.last_updated ? String(data.last_updated) : undefined,
      outcome_headline: data.outcome_headline ? String(data.outcome_headline) : undefined,
      sort_order: typeof data.sort_order === 'number' ? data.sort_order : undefined,
      content,
    }
  })

  return builds
    .filter((b) => b.status !== 'archived')
    .sort((a, b) => {
      if (a.sort_order !== undefined && b.sort_order !== undefined) {
        return a.sort_order - b.sort_order
      }
      if (a.sort_order !== undefined) return -1
      if (b.sort_order !== undefined) return 1
      const an = a.day_number ?? Infinity
      const bn = b.day_number ?? Infinity
      return an - bn
    })
})

export function getBuildBySlug(slug: string): Build | undefined {
  return getAllBuilds().find((b) => b.slug === slug)
}

/** Commercial gallery on /build — outcome-framed subset (4 cards by default). */
export function getOutcomeFramedBuilds(limit = 4): Build[] {
  const all = getAllBuilds()
  const withOutcome = all.filter((b) => b.outcome_headline || b.outcome_metric)
  return withOutcome.slice(0, limit)
}
