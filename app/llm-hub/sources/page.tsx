import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, ArrowLeft, CheckCircle2, ExternalLink, FileQuestion } from 'lucide-react'

import { getAllModels, getProviders } from '@/lib/llm-hub/registry'
import { getAllGenModels } from '@/lib/models-hub/registry'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Model Hub Sources & Provenance — Where Every Number Comes From',
  description:
    'The honest provenance dashboard: every model, every source, every verification date. Independent vs vendor-reported vs aggregated, with the data-quality breakdown.',
  alternates: { canonical: 'https://frankx.ai/llm-hub/sources' },
}

interface ProvenanceRow {
  id: string
  name: string
  org: string
  url: string
  sources: string[]
  lastVerified?: string
  quality?: string
  modality: 'text' | string
}

const PRIMARY_DOMAINS = [
  'anthropic.com', 'platform.claude.com', 'openai.com', 'platform.openai.com',
  'deepmind.google', 'ai.google.dev', 'cloud.google.com', 'aistudio.google.com',
  'x.ai', 'docs.x.ai', 'llama.meta.com', 'ai.meta.com',
  'deepseek.com', 'platform.deepseek.com', 'mistral.ai', 'docs.mistral.ai',
  'cohere.com', 'docs.cohere.com', 'voyageai.com', 'jina.ai',
  'qwenlm.github.io', 'suno.com', 'udio.com', 'elevenlabs.io',
  'cartesia.ai', 'hume.ai', 'play.ht', 'inworld.ai',
  'blackforestlabs.ai', 'midjourney.com', 'ideogram.ai', 'recraft.ai',
  'stability.ai', 'firefly.adobe.com', 'runwayml.com', 'klingai.com',
  'volcengine.com', 'hailuoai.video', 'lumalabs.ai', 'wan.video',
  'higgsfield.ai',
]
const INDEPENDENT_DOMAINS = [
  'artificialanalysis.ai', 'lmarena.ai', 'arcprize.org', 'swebench.com',
  'siliconangle.com', 'thenewstack.io', 'techcrunch.com', 'simonwillison.net',
  'macrumors.com', '9to5mac.com', 'axios.com', 'decrypt.co',
]

function classifyDomain(url: string): 'primary' | 'independent' | 'aggregator' {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '')
    if (PRIMARY_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`))) return 'primary'
    if (INDEPENDENT_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`))) return 'independent'
    return 'aggregator'
  } catch {
    return 'aggregator'
  }
}

export default function SourcesPage() {
  const llmModels = getAllModels()
  const genModels = getAllGenModels()
  const providers = getProviders()

  function orgName(modelOrg: string): string {
    // Boundary-aware: registry keys like "google" map to slugs like "google-deepmind";
    // bare includes() would false-positive (e.g. "meta" vs "metaverse").
    const p = providers.find((p) => p.org.slug === modelOrg || p.org.slug.startsWith(`${modelOrg}-`))
    return p?.org.name || modelOrg
  }

  const llmRows: ProvenanceRow[] = llmModels.map((m) => {
    const ver = (m as unknown as { verification?: { last_verified?: string; source_quality?: string } }).verification
    return {
      id: m.id,
      name: m.name,
      org: orgName(m.organization),
      url: `/llm-hub/${m.id}`,
      sources: m.sources || [],
      lastVerified: ver?.last_verified,
      quality: ver?.source_quality,
      modality: 'text',
    }
  })

  const genRows: ProvenanceRow[] = genModels.map((m) => ({
    id: m.id,
    name: m.name,
    org: m.organization,
    url: `/models/${m.category}/${m.id}`,
    sources: m.sources || [],
    modality: m.category,
  }))

  const allRows = [...llmRows, ...genRows]

  // Aggregate stats
  const llmWithSources = llmRows.filter((r) => r.sources.length > 0).length
  const genWithSources = genRows.filter((r) => r.sources.length > 0).length
  const llmVerified = llmRows.filter((r) => r.lastVerified).length

  const domainCounts: Record<string, { count: number; class: 'primary' | 'independent' | 'aggregator' }> = {}
  for (const r of allRows) {
    for (const s of r.sources) {
      try {
        const host = new URL(s).hostname.replace(/^www\./, '')
        const cls = classifyDomain(s)
        domainCounts[host] = { count: (domainCounts[host]?.count || 0) + 1, class: cls }
      } catch {
        /* ignore */
      }
    }
  }
  const topDomains = Object.entries(domainCounts).sort((a, b) => b[1].count - a[1].count).slice(0, 20)

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai/' },
      { '@type': 'ListItem', position: 2, name: 'LLM Hub', item: 'https://frankx.ai/llm-hub' },
      { '@type': 'ListItem', position: 3, name: 'Sources', item: 'https://frankx.ai/llm-hub/sources' },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <nav className="mb-8 text-sm text-white/50">
          <Link href="/llm-hub" className="inline-flex items-center gap-1 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> LLM Hub
          </Link>
        </nav>

        <header className="mb-10">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-cyan-400">
            Provenance · Honest by default
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">Sources &amp; provenance</h1>
          <p className="max-w-3xl text-lg text-white/60">
            Where every number on this hub comes from — primary vendor pages, independent measurement, aggregator
            comparisons. No source, no claim. This page is the receipts.
          </p>
        </header>

        {/* Stats */}
        <section className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat label="Text LLMs tracked" value={llmModels.length.toString()} />
          <Stat label="With sources[]" value={`${llmWithSources}/${llmModels.length}`} good={llmWithSources === llmModels.length} />
          <Stat label="Multimodal tracked" value={genModels.length.toString()} />
          <Stat label="With sources[]" value={`${genWithSources}/${genModels.length}`} good={genWithSources === genModels.length} />
        </section>

        {/* Legend */}
        <section className="mb-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">Source classification</h2>
          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <ClassBadge icon={<CheckCircle2 className="h-4 w-4" />} color="#10b981" label="Primary" desc="Direct from vendor (model card, pricing page, launch post)." />
            <ClassBadge icon={<CheckCircle2 className="h-4 w-4" />} color="#06b6d4" label="Independent" desc="Independent measurement or attributed third-party (AA, LMArena, ARC Prize, SWE-bench)." />
            <ClassBadge icon={<FileQuestion className="h-4 w-4" />} color="#f59e0b" label="Aggregator" desc="Comparison blog or analyst summary. Useful as a pointer, not a primary measurement." />
          </div>
        </section>

        {/* Top domains */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">Top source domains</h2>
          <p className="mb-4 text-sm text-white/40">The actual mix across both registries — at a glance.</p>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider text-white/40">
                  <th className="py-3 pl-4 pr-6 text-left font-medium">Domain</th>
                  <th className="py-3 pr-6 text-left font-medium">Class</th>
                  <th className="py-3 pr-4 text-right font-medium">Times cited</th>
                </tr>
              </thead>
              <tbody>
                {topDomains.map(([host, info]) => (
                  <tr key={host} className="border-b border-white/5 last:border-0">
                    <td className="py-2.5 pl-4 pr-6 font-mono text-xs text-white/80">{host}</td>
                    <td className="py-2.5 pr-6">
                      <span
                        className="inline-flex rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider"
                        style={{
                          backgroundColor:
                            info.class === 'primary' ? '#10b98122' : info.class === 'independent' ? '#06b6d422' : '#f59e0b22',
                          color:
                            info.class === 'primary' ? '#10b981' : info.class === 'independent' ? '#06b6d4' : '#f59e0b',
                        }}
                      >
                        {info.class}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-right font-mono text-xs text-white/60">{info.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Per-model provenance */}
        <section className="mb-10">
          <h2 className="mb-2 text-2xl font-bold">Every model, every source</h2>
          <p className="mb-4 text-sm text-white/40">
            Text LLMs first, then multimodal. Rows with the warning icon are flagged for the next audit cycle.
          </p>

          <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wider text-white/60">Text LLMs</h3>
          <ProvenanceTable rows={llmRows} />

          <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wider text-white/60">Multimodal</h3>
          <ProvenanceTable rows={genRows} />
        </section>

        {/* Honest note */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm leading-relaxed text-white/65">
          <h2 className="mb-2 text-lg font-bold text-white">What we don&apos;t do</h2>
          <p className="mb-3">
            We don&apos;t run our own evaluations. Frontier benchmarking infrastructure (Artificial Analysis, ARC Prize, SWE-bench)
            does that better than any solo operator could; we cite them.
          </p>
          <p className="mb-3">
            We don&apos;t publish numbers we can&apos;t source. Any model row showing a benchmark or pricing figure has a{' '}
            <code>sources[]</code> link to where the claim came from. If there&apos;s a gap, the weekly audit will surface it as a
            GitHub issue.
          </p>
          <p>
            We don&apos;t pretend our verdicts are objective. Editorial taglines and &quot;best for&quot; bullets are opinionated; they
            reflect Frank&apos;s experience building agentic systems and creator workflows. The honest disclosure: the verdict
            layer is curation, not measurement.
          </p>
          <p className="mt-4 text-xs text-white/40">
            See <Link href="/llm-hub" className="underline hover:text-white">LLM Hub</Link> ·{' '}
            <Link href="/models" className="underline hover:text-white">Model Hub</Link> ·{' '}
            <a href="/llm-hub.json" className="underline hover:text-white">/llm-hub.json</a> ·{' '}
            <a href="/models.json" className="underline hover:text-white">/models.json</a>
          </p>
        </section>
      </main>
    </div>
  )
}

function Stat({ label, value, good }: { label: string; value: string; good?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className={`font-mono text-2xl font-bold ${good ? 'text-emerald-300' : 'text-white'}`}>{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-white/40">{label}</p>
    </div>
  )
}

function ClassBadge({ icon, color, label, desc }: { icon: React.ReactNode; color: string; label: string; desc: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <p className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color }}>
        {icon} {label}
      </p>
      <p className="text-xs text-white/55">{desc}</p>
    </div>
  )
}

function ProvenanceTable({ rows }: { rows: ProvenanceRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider text-white/40">
            <th className="py-3 pl-4 pr-6 text-left font-medium">Model</th>
            <th className="py-3 pr-6 text-left font-medium">Verified</th>
            <th className="py-3 pr-4 text-left font-medium">Sources</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const counts = r.sources.reduce<Record<string, number>>((acc, s) => {
              const c = classifyDomain(s)
              acc[c] = (acc[c] || 0) + 1
              return acc
            }, {})
            const missing = r.sources.length === 0
            return (
              <tr key={r.id} className="border-b border-white/5 last:border-0">
                <td className="py-2.5 pl-4 pr-6">
                  <Link href={r.url} className="text-sm text-white transition-colors hover:text-white">
                    {r.name}
                  </Link>
                  <span className="ml-2 text-[11px] text-white/35">{r.org}</span>
                </td>
                <td className="py-2.5 pr-6 text-xs text-white/55">
                  {r.lastVerified ? r.lastVerified : <span className="text-white/30">—</span>}
                  {r.quality ? <span className="ml-2 text-[10px] uppercase tracking-wider text-white/40">{r.quality}</span> : null}
                </td>
                <td className="py-2.5 pr-4 text-xs">
                  {missing ? (
                    <span className="inline-flex items-center gap-1 text-amber-300">
                      <AlertTriangle className="h-3 w-3" /> No sources — flagged for audit
                    </span>
                  ) : (
                    <span className="inline-flex flex-wrap gap-1.5">
                      {counts.primary ? <Tag color="#10b981" label={`${counts.primary} primary`} /> : null}
                      {counts.independent ? <Tag color="#06b6d4" label={`${counts.independent} indep.`} /> : null}
                      {counts.aggregator ? <Tag color="#f59e0b" label={`${counts.aggregator} aggreg.`} /> : null}
                      {r.sources.slice(0, 1).map((s) => (
                        <a
                          key={s}
                          href={s}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-white/40 transition-colors hover:text-white/70"
                        >
                          first source <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                    </span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function Tag({ color, label }: { color: string; label: string }) {
  return (
    <span
      className="rounded-full px-1.5 py-0.5 text-[10px] uppercase tracking-wider"
      style={{ backgroundColor: `${color}22`, color }}
    >
      {label}
    </span>
  )
}
