import Link from 'next/link'
import { ChevronLeft, Database, GitPullRequest, ExternalLink } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import ledger from '@/data/ai-architecture/cost-reliability-ledger.json'

export const metadata = createMetadata({
  title: 'Cost & Reliability Dataset | AI Architecture',
  description:
    'A forkable, denominator-tagged dataset of production-AI cost and reliability statistics — every row carries its N, definition, source, date, and confidence. Corrections by pull request.',
  path: '/ai-architecture/data',
})

interface LedgerRow {
  id?: string
  metric: string
  value: string
  denominator: string
  failure_definition: string
  source_url: string
  source_title?: string
  source_type?: string
  retrieval_date?: string
  applicability?: string
  confidence: 'low' | 'medium' | 'high'
  contested?: boolean
  notes?: string
}

const rows = (ledger.rows as LedgerRow[]) || []

const CONFIDENCE_STYLE: Record<string, string> = {
  high: 'text-emerald-300 border-emerald-500/30',
  medium: 'text-amber-300 border-amber-500/30',
  low: 'text-rose-300 border-rose-500/30',
}

const REPO_FILE =
  'https://github.com/frankxai/frankx.ai-vercel-website/blob/main/data/ai-architecture/cost-reliability-ledger.json'

export default function DataLedgerPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      <section className="pt-28 pb-10 border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/ai-architecture"
            className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Hub
          </Link>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-400/60">AI Architecture</p>
              <h1 className="text-3xl font-bold text-white">Cost &amp; Reliability Dataset</h1>
            </div>
          </div>
          <p className="max-w-2xl text-[15px] leading-relaxed text-slate-400">
            Borrowed statistics about how production AI actually behaves — each one tagged with its
            denominator, definition, source, and date so you can check it instead of trusting it.
            First-party numbers we generated ourselves live in the{' '}
            <a
              href="https://github.com/frankxai/frankx.ai-vercel-website/tree/main/benchmarks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              benchmark spine
            </a>
            ; read the{' '}
            <Link href="/ai-architecture/methodology" className="text-cyan-400 hover:underline">
              methodology
            </Link>{' '}
            for what &ldquo;verified&rdquo; means.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span>v{ledger.version}</span>
            <span>·</span>
            <span>updated {ledger.lastUpdated}</span>
            <span>·</span>
            <span>{rows.length} rows</span>
            <a
              href={REPO_FILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan-400 hover:underline"
            >
              <GitPullRequest className="h-3.5 w-3.5" /> correct a row
            </a>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          {rows.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <p className="mx-auto max-w-xl text-slate-400">
                This dataset is intentionally starting small. Rows are added only when a figure
                resolves to a primary source with a stateable denominator — a thin, checkable dataset
                beats a large, un-auditable one. The first verified rows land here shortly; the
                benchmark spine carries the first-party numbers in the meantime.
              </p>
              <a
                href={REPO_FILE}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Submit a sourced figure
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {rows.map((r, i) => (
                <div
                  key={r.id || i}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <span className="text-lg font-bold text-white">{r.value}</span>
                      <span className="ml-2 text-sm text-slate-400">{r.metric}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {r.contested && (
                        <span className="rounded border border-rose-500/30 px-2 py-0.5 text-[10px] text-rose-300">
                          contested
                        </span>
                      )}
                      <span
                        className={`rounded border px-2 py-0.5 text-[10px] ${CONFIDENCE_STYLE[r.confidence] || 'text-slate-400 border-white/20'}`}
                      >
                        {r.confidence} confidence
                      </span>
                    </div>
                  </div>
                  <dl className="grid gap-x-6 gap-y-1 text-xs text-slate-400 sm:grid-cols-2">
                    <div>
                      <dt className="inline font-semibold text-slate-500">N / denominator: </dt>
                      <dd className="inline">{r.denominator}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-slate-500">measures: </dt>
                      <dd className="inline">{r.failure_definition}</dd>
                    </div>
                    {r.applicability && (
                      <div>
                        <dt className="inline font-semibold text-slate-500">holds for: </dt>
                        <dd className="inline">{r.applicability}</dd>
                      </div>
                    )}
                    {r.retrieval_date && (
                      <div>
                        <dt className="inline font-semibold text-slate-500">as of: </dt>
                        <dd className="inline">{r.retrieval_date}</dd>
                      </div>
                    )}
                  </dl>
                  <div className="mt-3">
                    <a
                      href={r.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline"
                    >
                      {r.source_title || 'source'}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    {r.notes && <p className="mt-2 text-xs text-slate-500">{r.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
