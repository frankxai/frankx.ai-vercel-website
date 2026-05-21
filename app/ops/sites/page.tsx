import type { Metadata } from 'next'
import Link from 'next/link'
import path from 'node:path'
import { promises as fs } from 'node:fs'

export const metadata: Metadata = {
  title: 'Sites — Sentinel | FrankX Ops',
  description:
    'Multi-site portfolio status. CWV, deploy state, schema, freshness, AI citation across all properties.',
  robots: { index: false, follow: false },
}

// Sentinel data lives outside FrankX. We read from a synced mirror at
// data/observability/sentinel/ which `scripts/sync-from-sentinel.mjs` populates.
// In dev this also falls back to reading C:\Users\frank\sentinel directly.
const SENTINEL_MIRROR = path.join(process.cwd(), 'data', 'observability', 'sentinel')
const SENTINEL_DEV_PATH = 'C:\\Users\\frank\\sentinel'

interface SiteConfig {
  id: string
  name: string
  host: string
  tags?: string[]
  notes?: string
  slo: { performance: number; lcp: number; inp: number; cls: number; tbt: number }
}

interface CWVSnapshot {
  fetchedAt: string
  routes?: Array<{
    route: string
    device: string
    scores?: { performance: number; accessibility: number; bestPractices: number; seo: number }
    cwv?: { lcp: number | null; inp: number | null; cls: number | null; source?: string }
    error?: string
  }>
  skipped?: boolean
}

interface DeploySnapshot {
  project?: string
  fetchedAt?: string
  latestProduction?: {
    state: string
    durationMs: number | null
    sha: string | null
    readyAt: string | null
  } | null
  stats?: { avgDurationMs: number | null; failures7d: number; deployCount7d: number }
  skipped?: boolean
  reason?: string
}

interface CrawlSnapshot {
  fetchedAt: string
  routes?: Array<{ route: string; status?: number; error?: string }>
}

interface SchemaSnapshot {
  fetchedAt: string
  routes?: Array<{ route: string; allValid?: boolean; scriptCount?: number }>
}

interface FreshnessSnapshot {
  fetchedAt?: string
  routes?: Array<{ route: string; verdict: string; ageDays: number | null; rule?: { pattern: string; maxAgeDays: number | null } }>
  skipped?: boolean
  reason?: string
}

interface SiteSummary {
  site: SiteConfig
  cwv: CWVSnapshot | null
  deploy: DeploySnapshot | null
  crawl: CrawlSnapshot | null
  schema: SchemaSnapshot | null
  freshness: FreshnessSnapshot | null
  brief: { date: string; markdown: string } | null
  overall: 'green' | 'yellow' | 'red' | 'gray'
}

async function readJsonIfExists<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

async function readTextIfExists(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch {
    return null
  }
}

async function findSentinelRoot(): Promise<string> {
  try {
    await fs.access(SENTINEL_MIRROR)
    return SENTINEL_MIRROR
  } catch {
    // Fallback to dev path
    return SENTINEL_DEV_PATH
  }
}

async function loadSites(root: string): Promise<SiteConfig[]> {
  const file = path.join(root, 'sites', 'sites.json')
  const sites = await readJsonIfExists<SiteConfig[]>(file)
  return sites ?? []
}

async function loadLatestSnapshot<T>(root: string, siteId: string, dimension: string): Promise<T | null> {
  const snapshotsDir = path.join(root, 'data', 'snapshots')
  try {
    const dates = (await fs.readdir(snapshotsDir)).sort().reverse()
    for (const date of dates.slice(0, 30)) {
      const file = path.join(snapshotsDir, date, siteId, `${dimension}.json`)
      const data = await readJsonIfExists<T>(file)
      if (data) return data
    }
  } catch {
    /* directory missing — first run */
  }
  return null
}

async function loadLatestBrief(root: string): Promise<{ date: string; markdown: string } | null> {
  const briefsDir = path.join(root, 'data', 'briefs')
  try {
    const files = (await fs.readdir(briefsDir)).filter(f => f.endsWith('.md')).sort().reverse()
    if (files.length === 0) return null
    const date = files[0].replace(/\.md$/, '')
    const markdown = await readTextIfExists(path.join(briefsDir, files[0]))
    return markdown ? { date, markdown } : null
  } catch {
    return null
  }
}

function computeOverall(s: Omit<SiteSummary, 'overall' | 'brief'>): 'green' | 'yellow' | 'red' | 'gray' {
  if (!s.cwv && !s.deploy && !s.crawl) return 'gray'
  let level: 'green' | 'yellow' | 'red' | 'gray' = 'green'
  // CWV violations
  if (s.cwv?.routes) {
    for (const r of s.cwv.routes) {
      if (r.error) continue
      if ((r.cwv?.lcp ?? 0) > s.site.slo.lcp * 1.5) level = 'red'
      else if ((r.cwv?.lcp ?? 0) > s.site.slo.lcp && level !== 'red') level = 'yellow'
      if ((r.cwv?.inp ?? 0) > s.site.slo.inp * 1.5) level = 'red'
      else if ((r.cwv?.inp ?? 0) > s.site.slo.inp && level !== 'red') level = 'yellow'
    }
  }
  // Deploy state
  if (s.deploy?.latestProduction?.state === 'ERROR') level = 'red'
  // Crawl
  if (s.crawl?.routes) {
    const broken = s.crawl.routes.filter(r => r.status && r.status >= 400).length
    if (broken > 0 && level !== 'red') level = 'yellow'
    if (broken > s.crawl.routes.length / 2) level = 'red'
  }
  // Freshness
  if (s.freshness?.routes?.some(r => r.verdict === 'red') && level !== 'red') level = 'yellow'
  return level
}

const dot = (level: 'green' | 'yellow' | 'red' | 'gray') => {
  const colors = {
    green: 'bg-emerald-500',
    yellow: 'bg-amber-400',
    red: 'bg-rose-500',
    gray: 'bg-slate-600',
  } as const
  return colors[level]
}

const label = (level: 'green' | 'yellow' | 'red' | 'gray') => {
  return { green: 'GREEN', yellow: 'YELLOW', red: 'RED', gray: 'NO DATA' }[level]
}

async function gatherAll(): Promise<SiteSummary[]> {
  const root = await findSentinelRoot()
  const sites = await loadSites(root)
  const summaries: SiteSummary[] = []
  const brief = await loadLatestBrief(root)

  for (const site of sites) {
    const [cwv, deploy, crawl, schema, freshness] = await Promise.all([
      loadLatestSnapshot<CWVSnapshot>(root, site.id, 'cwv'),
      loadLatestSnapshot<DeploySnapshot>(root, site.id, 'deploys'),
      loadLatestSnapshot<CrawlSnapshot>(root, site.id, 'crawl'),
      loadLatestSnapshot<SchemaSnapshot>(root, site.id, 'schema'),
      loadLatestSnapshot<FreshnessSnapshot>(root, site.id, 'freshness'),
    ])
    const partial = { site, cwv, deploy, crawl, schema, freshness }
    summaries.push({ ...partial, brief, overall: computeOverall(partial) })
  }

  // Order: red > yellow > gray > green
  const order = { red: 0, yellow: 1, gray: 2, green: 3 } as const
  summaries.sort((a, b) => order[a.overall] - order[b.overall])
  return summaries
}

function formatMs(ms: number | null | undefined): string {
  if (ms == null) return '—'
  if (ms < 1000) return `${Math.round(ms)}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

function MetricBadge({ value, budget, lowerIsBetter = true, suffix = '' }: {
  value: number | null | undefined
  budget: number
  lowerIsBetter?: boolean
  suffix?: string
}) {
  if (value == null) return <span className="text-slate-500">—</span>
  const ratio = lowerIsBetter ? value / budget : budget / value
  const color =
    ratio <= 1 ? 'text-emerald-300' :
    ratio <= 1.25 ? 'text-amber-300' :
    'text-rose-300'
  return <span className={color}>{Math.round(value)}{suffix}</span>
}

export default async function SitesOpsPage() {
  const summaries = await gatherAll()
  const briefMd = summaries[0]?.brief

  const totals = {
    red: summaries.filter(s => s.overall === 'red').length,
    yellow: summaries.filter(s => s.overall === 'yellow').length,
    green: summaries.filter(s => s.overall === 'green').length,
    gray: summaries.filter(s => s.overall === 'gray').length,
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Header */}
        <header className="mb-12 border-b border-white/10 pb-8">
          <p className="text-sm font-medium text-cyan-400">Ops · Sentinel</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Multi-site portfolio status</h1>
          <p className="mt-3 max-w-2xl text-base text-slate-400">
            CWV, deploy state, schema validity, content freshness, AI citation across every property.
            Read-only view. Data comes from{' '}
            <a href="https://github.com/frankxai/sentinel" className="text-cyan-300 underline-offset-4 hover:underline">
              Sentinel
            </a>{' '}— a standing AI agency in its own repo.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-3 py-1 text-rose-300">
              <span className="h-2 w-2 rounded-full bg-rose-500" /> {totals.red} red
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-400" /> {totals.yellow} yellow
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> {totals.green} green
            </span>
            {totals.gray > 0 && (
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-500/10 px-3 py-1 text-slate-400">
                <span className="h-2 w-2 rounded-full bg-slate-600" /> {totals.gray} no data
              </span>
            )}
          </div>
        </header>

        {/* Empty state */}
        {summaries.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-medium">No sentinel data yet.</p>
            <p className="mt-2 text-sm text-slate-400">
              Run <code className="rounded bg-black/40 px-2 py-0.5 font-mono text-cyan-300">sentinel scan --all</code> to populate snapshots.
            </p>
          </div>
        )}

        {/* Site cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {summaries.map((s) => (
            <article
              key={s.site.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block h-2.5 w-2.5 rounded-full ${dot(s.overall)}`} />
                    <h2 className="text-lg font-semibold">{s.site.name}</h2>
                  </div>
                  <p className="mt-1 font-mono text-xs text-slate-400">{s.site.host}</p>
                </div>
                <span className="rounded-md bg-black/30 px-2 py-1 font-mono text-[10px] tracking-wider text-slate-300">
                  {label(s.overall)}
                </span>
              </div>

              {/* Tags */}
              {s.site.tags && s.site.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.site.tags.map((tag) => (
                    <span key={tag} className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Metrics grid */}
              <dl className="mt-5 space-y-3 text-sm">
                {/* CWV */}
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">CWV (mobile, /)</dt>
                  <dd className="mt-1 flex gap-4 font-mono">
                    {(() => {
                      const home = s.cwv?.routes?.find(r => r.route === '/' && r.device === 'mobile')
                        ?? s.cwv?.routes?.[0]
                      if (!home) return <span className="text-slate-500">no scan</span>
                      return (
                        <>
                          <span>LCP <MetricBadge value={home.cwv?.lcp} budget={s.site.slo.lcp} suffix="ms" /></span>
                          <span>INP <MetricBadge value={home.cwv?.inp} budget={s.site.slo.inp} suffix="ms" /></span>
                          <span>CLS <MetricBadge value={home.cwv?.cls != null ? home.cwv.cls * 100 : null} budget={s.site.slo.cls * 100} /></span>
                        </>
                      )
                    })()}
                  </dd>
                </div>

                {/* Deploy */}
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Deploy</dt>
                  <dd className="mt-1 font-mono">
                    {!s.deploy ? (
                      <span className="text-slate-500">no scan</span>
                    ) : s.deploy.skipped ? (
                      <span className="text-slate-500" title={s.deploy.reason}>{s.deploy.reason ?? 'skipped'}</span>
                    ) : s.deploy.latestProduction ? (
                      <span>
                        <span className={
                          s.deploy.latestProduction.state === 'READY' ? 'text-emerald-300' :
                          s.deploy.latestProduction.state === 'ERROR' ? 'text-rose-300' : 'text-amber-300'
                        }>
                          {s.deploy.latestProduction.state}
                        </span>
                        <span className="text-slate-500"> · build {formatMs(s.deploy.latestProduction.durationMs)}</span>
                        {s.deploy.latestProduction.sha && (
                          <span className="text-slate-500"> · {s.deploy.latestProduction.sha.slice(0, 7)}</span>
                        )}
                      </span>
                    ) : (
                      <span className="text-slate-500">no recent prod deploy</span>
                    )}
                  </dd>
                </div>

                {/* Crawl */}
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Crawl</dt>
                  <dd className="mt-1 font-mono">
                    {!s.crawl?.routes ? (
                      <span className="text-slate-500">no scan</span>
                    ) : (() => {
                      const ok = s.crawl.routes.filter(r => r.status === 200).length
                      const total = s.crawl.routes.length
                      const color = ok === total ? 'text-emerald-300' :
                                    ok / total >= 0.5 ? 'text-amber-300' : 'text-rose-300'
                      return <span className={color}>{ok}/{total} routes 200</span>
                    })()}
                  </dd>
                </div>

                {/* Schema */}
                {s.schema?.routes && s.schema.routes.length > 0 && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-500">Schema</dt>
                    <dd className="mt-1 font-mono">
                      {(() => {
                        const valid = s.schema.routes.filter(r => r.allValid).length
                        const total = s.schema.routes.length
                        const color = valid === total ? 'text-emerald-300' : 'text-amber-300'
                        return <span className={color}>{valid}/{total} routes valid</span>
                      })()}
                    </dd>
                  </div>
                )}

                {/* Freshness */}
                {s.freshness?.routes && !s.freshness.skipped && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-500">Freshness</dt>
                    <dd className="mt-1 font-mono">
                      {(() => {
                        const stale = s.freshness.routes!.filter(r => r.verdict === 'red' || r.verdict === 'yellow').length
                        const color = stale === 0 ? 'text-emerald-300' : 'text-amber-300'
                        return <span className={color}>{stale} stale routes</span>
                      })()}
                    </dd>
                  </div>
                )}
              </dl>

              {s.site.notes && (
                <p className="mt-4 border-t border-white/5 pt-3 text-xs italic text-slate-500">
                  {s.site.notes}
                </p>
              )}
            </article>
          ))}
        </div>

        {/* Latest brief */}
        {briefMd && (
          <section className="mt-16">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight">
              Latest brief — <span className="font-mono text-slate-400">{briefMd.date}</span>
            </h2>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur">
              <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-300">
                {briefMd.markdown}
              </pre>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 pt-6 text-xs text-slate-500">
          <p>
            Data refreshes daily via{' '}
            <a href="https://github.com/frankxai/sentinel" className="text-cyan-400 hover:underline">
              Sentinel
            </a>
            . Runbooks at{' '}
            <code className="font-mono">docs/PLAYBOOK.md</code>.
          </p>
          <p className="mt-1">
            Read more — <Link href="/ops" className="text-cyan-400 hover:underline">Ops mission control</Link>{' '}
            ·{' '}
            <Link href="/os" className="text-cyan-400 hover:underline">FrankX OS</Link>{' '}
            ·{' '}
            <Link href="/changelog" className="text-cyan-400 hover:underline">Changelog</Link>
          </p>
        </footer>
      </div>
    </main>
  )
}
