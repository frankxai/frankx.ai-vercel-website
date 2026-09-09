import Link from 'next/link'
import { ArrowLeft, ExternalLink, AlertTriangle, Award } from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import { getExternalIntelligence, getExternalModels, getSources, getLinkOnly, isSeed } from '@/lib/intelligence/loader'
import { getReceipts, getReceiptProblems, lastMeasured } from '@/lib/intelligence/receipts'
import { buildIntelligenceRows } from '@/lib/intelligence/rows'
import AttributionFootnotes from '@/components/intelligence/AttributionFootnotes'
import FrontierScatter from '@/components/intelligence/FrontierScatter'
import PassRateSmallMultiples from '@/components/intelligence/PassRateSmallMultiples'
import ExternalCrossRefTable from '@/components/intelligence/ExternalCrossRefTable'
import ReceiptsBrowser from '@/components/intelligence/ReceiptsBrowser'
import {
  ROUNDS,
  METHODOLOGY_STEPS,
  ROUTING_IMPLICATIONS,
  CAVEATS,
  FAQS,
  METHODOLOGY_URL,
  PUBLISHED_BENCHMARKS,
} from './data'

/**
 * Built once per deploy, never re-executed at runtime: both halves of the data layer
 * read from disk via node:fs, which Next's file tracing does not follow — a
 * revalidating serverless re-execution could 500 on a missing file. Receipts and the
 * snapshot only change when a commit lands, and a commit already deploys.
 */
export const dynamic = 'force-static'
export const revalidate = false

export default function ModelArenaPage() {
  const snapshot = getExternalIntelligence()
  const receipts = getReceipts()
  const problems = getReceiptProblems()
  const rows = buildIntelligenceRows(getExternalModels(), receipts)
  const sources = getSources()
  const linkOnly = getLinkOnly()
  const measured = lastMeasured()
  const seeded = isSeed()

  const modelsDevRef = (() => {
    const idx = sources.findIndex((s) => s.id === 'models-dev')
    return idx === -1 ? '' : ` [${idx + 1}]`
  })()

  const publicReportRounds = ROUNDS.filter((r) => r.evidence === 'public-reports')

  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'FrankX Model Arena receipts',
    description:
      'First-party model eval receipts published by frankx.ai, plus a licence-tracked snapshot of third-party pricing. Every measurement claim on the page traces to a receipt file; third-party figures carry their own provenance and are never merged into a score.',
    url: 'https://frankx.ai/research/model-arena',
    creator: { '@type': 'Person', name: 'Frank', url: 'https://frankx.ai' },
    ...(measured ? { dateModified: measured } : {}),
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: 'https://frankx.ai/research/model-arena/receipts.json',
      },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-[#a855f7]/30">
      <JsonLd
        type="Article"
        data={{
          headline: 'Starlight Model Arena',
          description:
            'First-party model evals with public JSON receipts, alongside licence-tracked third-party pricing. Measured results and vendor claims are labelled separately and never merged.',
          author: { '@type': 'Person', name: 'Frank', url: 'https://frankx.ai' },
          datePublished: '2026-06-09',
          ...(measured ? { dateModified: measured } : {}),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://frankx.ai/research/model-arena',
          },
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Grid Background Effect */}
      <div className="absolute inset-0 bg-[#020617] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      <div className="absolute top-0 right-0 w-[55%] h-[45%] bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-transparent filter blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        {/* Navigation */}
        <nav className="mb-10 flex items-center justify-between">
          <Link
            href="/research"
            className="group inline-flex items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
            Research Hub
          </Link>
          <a
            href="/research/model-arena/receipts.json"
            className="text-xs text-zinc-400 hover:text-[#a855f7] transition-colors border border-white/5 bg-white/[0.02] px-3 py-1.5 rounded-full font-mono"
          >
            receipts.json
          </a>
        </nav>

        {/* Title Header */}
        <header className="mb-14 max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#a855f7] text-xs font-mono tracking-wider uppercase">
              <span>Open Receipts</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-zinc-400 text-xs font-mono tracking-wider">
              <span>
                {measured ? `Last harness measurement: ${measured}` : 'No harness measurement yet'}
              </span>
            </div>
            {!seeded && snapshot.generated_at && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-zinc-400 text-xs font-mono tracking-wider">
                <span>External snapshot: {snapshot.generated_at.slice(0, 10)}</span>
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Starlight Model Arena
          </h1>
          <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
            Which model should handle which task? This page answers with two kinds of claim, kept
            apart on purpose: <strong>first-party measurements</strong>, each backed by a public
            JSON receipt, and <strong>third-party figures</strong>, each carrying its source and
            licence. No number appears without one or the other, and the two are never merged into
            a ranking.
          </p>
        </header>

        {/* Measured evidence — receipts */}
        <section className="mb-14">
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
                Measured — harness receipts
              </h2>
              <p className="text-sm text-zinc-400">
                {receipts.length === 0
                  ? 'Nothing has been measured yet. This section stays empty rather than borrowing vendor numbers.'
                  : `Every round the harness has run, with the raw JSON each claim traces to. ${receipts.length} round${receipts.length === 1 ? '' : 's'} on the books — an honest, growing record, not a leaderboard.`}
              </p>
            </div>
            <a
              href="/research/model-arena/receipts.json"
              className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline"
            >
              Machine-readable manifest
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          </div>
          <ReceiptsBrowser receipts={receipts} problems={problems} />
        </section>

        {/* Task-level record */}
        {receipts.length > 0 && (
          <section className="mb-14">
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
                Task record
              </h2>
              <p className="text-sm text-zinc-400">
                Per-task statuses exactly as recorded — including <span className="font-mono text-amber-400">blocked</span>,
                which means the harness could not verify that task for anyone that day. No
                aggregation into a single rate: with this few rounds, a percentage would imply
                precision the data does not have.
              </p>
            </div>
            <PassRateSmallMultiples receipts={receipts} />
          </section>
        )}

        {/* Price landscape */}
        <section className="mb-14 border-t border-white/5 pt-14">
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#22d3ee] mb-2">
              Price landscape — third-party figures
            </h2>
            <p className="text-sm text-zinc-400">
              Every model the external snapshot prices, on licence-cleared data only. Emerald
              points have been through the harness at least once. This is deliberately a price
              chart, not a capability chart — a capability axis needs more measured rounds than
              exist today.
            </p>
          </div>
          <FrontierScatter rows={rows} sourceRef={modelsDevRef} />
        </section>

        {/* Cross-reference table + attribution */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#22d3ee] mb-2">
              Cross-reference
            </h2>
            <p className="text-sm text-zinc-400">
              The same figures as a table. The receipt column records whether first-party evidence
              exists for a model — it is a fact, not a score.
            </p>
          </div>
          <div className="space-y-4">
            <ExternalCrossRefTable rows={rows} sourceRef={modelsDevRef} />
            <AttributionFootnotes sources={sources} linkOnly={linkOnly} />
          </div>
        </section>

        {/* Published Benchmarks — vendor claims, labelled */}
        <section className="mb-14 border-t border-white/5 pt-14">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Vendor-published benchmarks — {PUBLISHED_BENCHMARKS.model}
            </h2>
            <span className="text-xs bg-white/5 text-white/70 px-2 py-0.5 rounded font-mono">
              Released {PUBLISHED_BENCHMARKS.released}
            </span>
          </div>
          <div className="rounded-3xl border border-white/5 bg-slate-950/40 p-6">
            <p className="text-xs text-zinc-300 mb-4">
              These are Anthropic&apos;s own numbers at launch, not measured by this harness —
              cited for context only.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-3">{PUBLISHED_BENCHMARKS.note}</p>
            <p className="text-xs text-zinc-300 mb-3 font-mono">Pricing: {PUBLISHED_BENCHMARKS.pricing}</p>
            <div className="flex flex-wrap gap-3 text-[11px]">
              {PUBLISHED_BENCHMARKS.sources.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-300 hover:text-white underline decoration-zinc-600 underline-offset-4"
                >
                  {s.label}
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Public-report orientation entries */}
        {publicReportRounds.map((round) => (
          <section key={round.id} className="mb-14">
            <div className="bg-slate-950/50 border border-white/10 rounded-3xl p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="text-xl font-bold text-white">{round.title}</h2>
                <span className="text-xs text-zinc-400 font-mono">Compiled: {round.date}</span>
              </div>
              <div className="mb-6 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] px-4 py-3 text-xs leading-relaxed text-amber-200/90">
                Synthesized from public vendor reports — not a harness result. No round was
                dispatched and no receipt exists for this entry. Treat the lane calls as
                orientation, not measurement.
              </div>
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#a855f7]/30 bg-[#a855f7]/[0.06] px-3.5 py-1 text-xs font-semibold text-[#a855f7]">
                  <Award className="w-3.5 h-3.5" aria-hidden />
                  {round.tally}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-zinc-400 font-mono">
                  Models: {round.contestants.join(' · ')}
                </span>
              </div>
              <p className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-sm leading-relaxed text-zinc-300">
                {round.headline}
              </p>
            </div>
          </section>
        ))}

        {/* Methodology List */}
        <section className="mb-14 border-t border-white/5 pt-14">
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2">
              The Proving Ground Methodology
            </h2>
            <p className="text-sm text-zinc-400">
              How the harness executes evaluations to eliminate cherry-picking bias.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {METHODOLOGY_STEPS.map((step, idx) => (
              <div key={step.name} className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#a855f7]/30 bg-[#a855f7]/5 text-xs font-bold text-[#a855f7]">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white">{step.name}</h3>
                  <p className="text-xs leading-relaxed text-zinc-400">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-zinc-400">
            Read complete verification rules in{' '}
            <a
              href={METHODOLOGY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white"
            >
              tools/arena/README.md
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          </p>
        </section>

        {/* Routing Implications Summary */}
        <section className="mb-14 border-t border-white/5 pt-14">
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2">
              Tactical Routing Guidelines
            </h2>
            <p className="text-sm text-zinc-400">
              Working hypotheses from the measured rounds and the vendor reports above — labelled
              per source, revised as rounds accumulate.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {ROUTING_IMPLICATIONS.map((impl) => (
              <div key={impl.lane} className="p-5 rounded-2xl border border-white/5 bg-[#020617]">
                <div className="flex justify-between items-baseline gap-2 mb-2">
                  <h3 className="font-semibold text-sm text-white">{impl.lane}</h3>
                  <span className="text-[10px] font-mono text-[#a855f7] bg-[#a855f7]/5 px-2 py-0.5 rounded border border-[#a855f7]/10 shrink-0">
                    {impl.call}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-zinc-400">{impl.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Caveats */}
        <section className="mb-14 border-t border-white/5 pt-14">
          <div className="p-5 rounded-2xl border border-amber-500/10 bg-amber-500/[0.02] flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden />
            <div>
              <h2 className="text-sm font-semibold text-amber-400 mb-1">Caveats &amp; Safety Guardrails</h2>
              <ul className="space-y-1.5 text-xs text-zinc-400 list-disc pl-4 leading-relaxed">
                {CAVEATS.map((caveat, idx) => (
                  <li key={idx}>{caveat}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-14 border-t border-white/5 pt-14">
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/5 bg-white/[0.01] p-5 transition-colors open:border-white/10"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-white/90 group-open:text-white">
                  {faq.question}
                  <span aria-hidden className="text-zinc-400 transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-zinc-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Page Footer */}
        <footer className="border-t border-white/5 pt-8 text-center text-xs text-zinc-400">
          <p>Starlight Model Arena • built and run by Frank&apos;s multi-agent research system • 2026</p>
        </footer>
      </div>
    </main>
  )
}
