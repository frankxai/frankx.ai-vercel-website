/**
 * /admin/404-radar — operator surface for the soft-404 telemetry stream.
 *
 * Auth-gated by middleware.ts (the existing `/admin/:path*` protected-paths block
 * catches this route automatically).
 *
 * Reads from private/404-log.jsonl (local dev) or /tmp/404-log.jsonl (Vercel),
 * aggregates by path over the last N days, surfaces:
 *   - hit count
 *   - last-hit timestamp
 *   - current top fuzzy match + confidence
 *   - whether an alias already exists (and what canonical it points to)
 *   - "Add alias →" form that POSTs to /api/404/alias
 *
 * The aggregation runs server-side on each request — fast enough up to ~10k log
 * entries; beyond that, move to KV/Blob (the file path is a deliberate Phase 2
 * shortcut, see /api/404/log for the migration breadcrumb).
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import { matchRoute, getAliases } from '@/lib/fuzzy-route-match'
import RadarRow from './RadarRow'
import AgentQueueRow from './AgentQueueRow'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface LogEntry {
  ts: string
  path: string
  referrer?: string
  userAgent?: string
  topConfidence?: number
  topMatch?: string
}

interface PathStat {
  path: string
  count: number
  lastHit: string
  topReferrer?: string
  topMatch?: string
  topMatchTitle?: string
  topConfidence: number
  existingAlias?: string
}

function getLogPath() {
  if (process.env.VERCEL) return '/tmp/404-log.jsonl'
  return path.join(process.cwd(), 'private', '404-log.jsonl')
}

function getQueuePath() {
  if (process.env.VERCEL) return '/tmp/404-agent-queue.jsonl'
  return path.join(process.cwd(), 'private', '404-agent-queue.jsonl')
}

interface AgentProposal {
  runId: string
  status: 'pending' | 'approved' | 'rejected'
  kind: 'alias' | 'stub-page'
  pattern?: string
  canonical?: string
  topic?: string
  targetRoute?: string
  outline?: string[]
  confidence?: 'high' | 'medium' | 'low'
  reasoning?: string
  rationale?: string
}

async function readAgentQueue(): Promise<AgentProposal[]> {
  try {
    const raw = await fs.readFile(getQueuePath(), 'utf8')
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as AgentProposal
        } catch {
          return null
        }
      })
      .filter((p): p is AgentProposal => p !== null)
  } catch {
    return []
  }
}

async function readLog(maxEntries = 5000): Promise<LogEntry[]> {
  const logPath = getLogPath()
  try {
    const raw = await fs.readFile(logPath, 'utf8')
    const lines = raw.split('\n').filter(Boolean).slice(-maxEntries)
    const out: LogEntry[] = []
    for (const line of lines) {
      try {
        out.push(JSON.parse(line))
      } catch {
        /* skip malformed lines */
      }
    }
    return out
  } catch {
    return []
  }
}

function aggregate(entries: LogEntry[], aliases: Record<string, string>): PathStat[] {
  const byPath = new Map<string, { count: number; lastHit: string; referrers: Map<string, number> }>()

  for (const e of entries) {
    const cur = byPath.get(e.path) ?? { count: 0, lastHit: e.ts, referrers: new Map() }
    cur.count += 1
    if (e.ts > cur.lastHit) cur.lastHit = e.ts
    if (e.referrer) cur.referrers.set(e.referrer, (cur.referrers.get(e.referrer) ?? 0) + 1)
    byPath.set(e.path, cur)
  }

  const stats: PathStat[] = []
  for (const [pathKey, v] of byPath) {
    const topReferrer = [...v.referrers.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]
    const match = matchRoute(pathKey, 1)
    stats.push({
      path: pathKey,
      count: v.count,
      lastHit: v.lastHit,
      topReferrer,
      topMatch: match.matches[0]?.href,
      topMatchTitle: match.matches[0]?.title,
      topConfidence: match.topConfidence,
      existingAlias: aliases[pathKey],
    })
  }
  stats.sort((a, b) => b.count - a.count)
  return stats
}

export default async function Radar404Page({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const params = await searchParams
  const filter = params.filter ?? 'unresolved'

  const [entries, agentQueue] = await Promise.all([readLog(), readAgentQueue()])
  const aliases = getAliases()
  const allStats = aggregate(entries, aliases)
  const stats = filter === 'unresolved' ? allStats.filter((s) => !s.existingAlias) : allStats

  const totalHits = entries.length
  const uniquePaths = allStats.length
  const unresolvedCount = allStats.filter((s) => !s.existingAlias).length
  const pendingProposals = agentQueue.filter((p) => p.status === 'pending')

  return (
    <div className="min-h-screen bg-[#080808] text-white/90 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <p className="text-[10px] font-mono text-white/30 mb-2">/admin/404-radar</p>
          <h1 className="text-3xl font-bold tracking-tight">404 Radar</h1>
          <p className="text-sm text-white/50 mt-2 max-w-2xl">
            Soft-404 telemetry from <code className="text-white/70">/api/404/log</code>.
            Approve aliases inline to turn future hits on these paths into clean 301s.
          </p>
        </header>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard label="Total hits" value={totalHits.toLocaleString()} />
          <StatCard label="Unique paths" value={uniquePaths.toLocaleString()} />
          <StatCard label="Unresolved" value={unresolvedCount.toLocaleString()} accent />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 text-xs font-mono">
          <FilterTab label="Unresolved" active={filter === 'unresolved'} href="?filter=unresolved" />
          <FilterTab label="All" active={filter === 'all'} href="?filter=all" />
        </div>

        {/* Empty state */}
        {stats.length === 0 && (
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-10 text-center">
            <p className="text-sm text-white/50">No 404 events recorded yet.</p>
            <p className="text-xs text-white/30 mt-2">
              Trigger one by visiting an unknown path, then refresh.
            </p>
          </div>
        )}

        {/* Table */}
        {stats.length > 0 && (
          <div className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10 text-[11px] uppercase tracking-wider text-white/40">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Path</th>
                  <th className="text-right px-4 py-3 font-medium w-20">Hits</th>
                  <th className="text-left px-4 py-3 font-medium">Top match</th>
                  <th className="text-right px-4 py-3 font-medium w-20">Conf.</th>
                  <th className="text-right px-4 py-3 font-medium w-32">Action</th>
                </tr>
              </thead>
              <tbody>
                {stats.slice(0, 100).map((s) => (
                  <RadarRow key={s.path} stat={s} />
                ))}
              </tbody>
            </table>
            {stats.length > 100 && (
              <p className="px-4 py-3 text-[11px] font-mono text-white/30 border-t border-white/10">
                Showing top 100 of {stats.length} paths
              </p>
            )}
          </div>
        )}

        {/* Agent queue — Phase 3 proposals awaiting operator approval */}
        {pendingProposals.length > 0 && (
          <section className="mt-12">
            <header className="mb-4">
              <h2 className="text-lg font-semibold tracking-tight">Agent queue</h2>
              <p className="text-xs text-white/40 mt-1">
                {pendingProposals.length} proposal{pendingProposals.length === 1 ? '' : 's'} from the daily AI Gateway cron.
                Review each before approving — proposals never auto-apply.
              </p>
            </header>
            <div className="rounded-lg border border-fuchsia-500/20 bg-fuchsia-950/[0.08] divide-y divide-white/[0.06]">
              {pendingProposals.slice(0, 30).map((p, i) => (
                <AgentQueueRow key={`${p.runId}-${i}`} proposal={p} />
              ))}
            </div>
          </section>
        )}

        <footer className="mt-12 text-[11px] font-mono text-white/30">
          <p>Storage: {process.env.VERCEL ? '/tmp/404-log.jsonl (ephemeral)' : 'private/404-log.jsonl'}</p>
          <p className="mt-1">
            Approving aliases writes to <code>data/redirect-aliases.json</code>.
            Run <code>pnpm routes:build</code> and redeploy for changes to take effect.
          </p>
          <p className="mt-1">
            <Link href="/admin" className="underline hover:text-white/60">← back to /admin</Link>
          </p>
        </footer>
      </div>
    </div>
  )
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
      <p className="text-[10px] font-mono uppercase tracking-wider text-white/30">{label}</p>
      <p className={`text-2xl font-semibold mt-1 ${accent ? 'text-amber-400' : 'text-white/90'}`}>{value}</p>
    </div>
  )
}

function FilterTab({ label, active, href }: { label: string; active: boolean; href: string }) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded border transition-colors ${
        active
          ? 'border-white/30 bg-white/[0.06] text-white/90'
          : 'border-white/[0.08] bg-white/[0.01] text-white/40 hover:text-white/70'
      }`}
    >
      {label}
    </Link>
  )
}
