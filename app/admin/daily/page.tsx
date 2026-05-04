import type { Metadata } from 'next'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ecosystemEntries } from '@/data/ecosystem'
import DailyWalkClient from './DailyWalkClient'

export const metadata: Metadata = {
  title: 'The Daily Walk — Admin | FrankX',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

interface DailyCommit {
  repo: string
  hash: string
  date: string
  author: string
  subject: string
  raw: string
  files: number
  additions: number
  deletions: number
}

interface DailySystem {
  slug: string
  commitCount: number
  totalFiles: number
  repos: string[]
  commits: DailyCommit[]
  lastBlessing: { verdict: string; ratifiedAt: string; reason?: string | null } | null
}

interface DailyWalkData {
  generatedAt: string
  window: { since: string; until: string }
  totals: { commits: number; systems: number; repos: number }
  repoStatus: { name: string; status: string; commits?: number }[]
  systems: DailySystem[]
}

function loadDailyWalk(): DailyWalkData | null {
  const path = join(process.cwd(), 'data', 'daily-walk.json')
  if (!existsSync(path)) return null
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return null
  }
}

export default function DailyWalkPage() {
  const data = loadDailyWalk()

  // Join ecosystem registry → daily systems for richer cards
  const ecosystemBySlug = new Map(ecosystemEntries.map((e) => [e.slug, e]))

  const enriched = data?.systems.map((s) => {
    const eco = ecosystemBySlug.get(s.slug)
    return {
      ...s,
      name: eco?.name ?? prettifySlug(s.slug),
      summary: eco?.summary ?? null,
      publicUrl: eco?.publicUrl ?? null,
      color: eco?.color ?? 'slate',
      tier: eco?.tier ?? null,
      status: eco?.status ?? null,
    }
  }) ?? []

  return (
    <DailyWalkClient
      window={data?.window ?? { since: '—', until: '—' }}
      generatedAt={data?.generatedAt ?? null}
      totals={data?.totals ?? { commits: 0, systems: 0, repos: 0 }}
      repoStatus={data?.repoStatus ?? []}
      systems={enriched}
    />
  )
}

function prettifySlug(slug: string): string {
  return slug
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}
