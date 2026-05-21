import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import {
  EXPERIMENTS,
  aggregateVerdicts,
  experimentCount,
  type Experiment,
  type HypothesisVerdict,
} from '@/data/experiments'
import { CircleCheck, CircleDot, CircleSlash, Clock, ExternalLink } from 'lucide-react'

const SITE_URL = 'https://frankx.ai'
const PAGE_URL = `${SITE_URL}/experiments`

export const metadata: Metadata = {
  title: 'Experiments | Hypothesis-Driven Research Artifacts | FrankX',
  description:
    'Pre-registered, reproducible research artifacts on agentic systems, content engineering, and personal AI. Every claim falsifiable; every experiment citable.',
  keywords: [
    'AI experiments',
    'agentic research',
    'hypothesis driven',
    'reproducible research',
    'FrankX experiments',
    'agent intelligence',
    'L99 catalog',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'FrankX Experiments — Hypothesis-Driven Research',
    description:
      'Pre-registered research artifacts on agentic systems. Reproducible. Citable. Honest about negative results.',
    url: PAGE_URL,
    siteName: 'FrankX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FrankX Experiments',
    description:
      'Pre-registered research artifacts on agentic systems. Reproducible. Citable.',
  },
}

const VERDICT_STYLE: Record<
  HypothesisVerdict,
  { label: string; className: string; Icon: typeof CircleCheck }
> = {
  supported: {
    label: 'Supported',
    className: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300',
    Icon: CircleCheck,
  },
  partial: {
    label: 'Partial',
    className: 'border-amber-400/30 bg-amber-500/10 text-amber-300',
    Icon: CircleDot,
  },
  'not-supported': {
    label: 'Not supported',
    className: 'border-rose-400/30 bg-rose-500/10 text-rose-300',
    Icon: CircleSlash,
  },
  deferred: {
    label: 'Deferred',
    className: 'border-slate-400/30 bg-slate-500/10 text-slate-300',
    Icon: Clock,
  },
}

function ExperimentJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Experiments', item: PAGE_URL },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${PAGE_URL}#page`,
        name: 'FrankX Experiments',
        description:
          'Pre-registered, reproducible research artifacts on agentic systems and personal AI.',
        url: PAGE_URL,
        isPartOf: { '@type': 'WebSite', name: 'FrankX', url: SITE_URL },
      },
      {
        '@type': 'ItemList',
        name: 'Research Experiments',
        numberOfItems: EXPERIMENTS.length,
        itemListElement: EXPERIMENTS.map((e, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'ScholarlyArticle',
            name: e.title,
            headline: e.oneLiner,
            datePublished: e.date,
            author: { '@type': 'Person', name: 'Frank Riemer' },
            url: `${PAGE_URL}/${e.slug}`,
          },
        })),
      },
    ],
  }
  return (
    <Script
      id="experiments-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

function VerdictPill({ verdict }: { verdict: HypothesisVerdict }) {
  const style = VERDICT_STYLE[verdict]
  const Icon = style.Icon
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${style.className}`}
    >
      <Icon className="size-2.5" />
      {style.label}
    </span>
  )
}

function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const supported = experiment.hypotheses.filter((h) => h.verdict === 'supported').length
  const total = experiment.hypotheses.length
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]">
      <header className="mb-3 flex items-baseline justify-between gap-4">
        <time className="text-xs uppercase tracking-wider text-slate-500">
          {experiment.date}
        </time>
        <span className="text-xs uppercase tracking-wider text-emerald-400/80">
          {experiment.status === 'shipped' ? 'Shipped' : experiment.status}
        </span>
      </header>

      <h2 className="mb-2 text-xl font-medium leading-tight text-white">
        <Link href={`/experiments/${experiment.slug}`} className="hover:text-emerald-300">
          {experiment.title}
        </Link>
      </h2>

      <p className="mb-4 text-sm leading-relaxed text-slate-400">{experiment.oneLiner}</p>

      <div className="mb-4 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
        <div className="text-[10px] uppercase tracking-wider text-slate-500">
          {experiment.headlineMetric.label}
        </div>
        <div className="font-mono text-sm text-emerald-300">
          {experiment.headlineMetric.value}
          {experiment.headlineMetric.n !== undefined && (
            <span className="ml-2 text-slate-500">(n = {experiment.headlineMetric.n})</span>
          )}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {experiment.hypotheses.map((h) => (
          <div key={h.id} className="flex items-center gap-1.5 text-[11px]">
            <span className="font-mono text-slate-500">{h.id}</span>
            <VerdictPill verdict={h.verdict} />
          </div>
        ))}
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-white/5 pt-3">
        <div className="text-[11px] text-slate-500">
          {supported}/{total} hypotheses supported
        </div>
        <div className="flex items-center gap-3 text-xs">
          <Link
            href={`/experiments/${experiment.slug}`}
            className="text-slate-300 hover:text-emerald-300"
          >
            Read summary →
          </Link>
          <a
            href={experiment.rawArtifactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300"
          >
            Raw artifact <ExternalLink className="size-3" />
          </a>
        </div>
      </footer>
    </article>
  )
}

export default function ExperimentsPage() {
  const verdicts = aggregateVerdicts()
  const totalCount = experimentCount()

  return (
    <>
      <ExperimentJsonLd />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="mb-12 border-b border-white/10 pb-12">
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-emerald-400/80">
            FrankX OS · Experiment Intelligence System
          </div>
          <h1 className="mb-4 text-4xl font-medium tracking-tight text-white sm:text-5xl">
            Experiments
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
            Pre-registered, hypothesis-driven research on agentic systems, personal AI, and
            content engineering. Every claim is falsifiable. Every experiment is reproducible.
            Negative results ship as readily as positive ones.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric label="Experiments" value={String(totalCount)} />
            <Metric
              label="Supported"
              value={String(verdicts.supported)}
              tone="emerald"
            />
            <Metric label="Not supported" value={String(verdicts['not-supported'])} tone="rose" />
            <Metric label="Deferred" value={String(verdicts.deferred)} tone="slate" />
          </div>
        </header>

        {/* Why this exists */}
        <section className="mb-12 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-slate-300">
            The 5-doc discipline
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-400">
            Borrowed from how Anthropic, DeepMind, and OpenAI publish research artifacts. Every
            experiment ships these five documents, authored in this exact order, before any data
            is interpreted:
          </p>
          <ol className="grid gap-3 text-sm text-slate-400 sm:grid-cols-2">
            <li className="rounded-lg border border-white/5 px-3 py-2">
              <span className="block text-xs uppercase tracking-wider text-slate-500">1</span>
              <span className="font-medium text-slate-200">hypothesis.md</span> — pre-registered
              claims before data
            </li>
            <li className="rounded-lg border border-white/5 px-3 py-2">
              <span className="block text-xs uppercase tracking-wider text-slate-500">2</span>
              <span className="font-medium text-slate-200">methodology.md</span> — locked
              protocol + metrics
            </li>
            <li className="rounded-lg border border-white/5 px-3 py-2">
              <span className="block text-xs uppercase tracking-wider text-slate-500">3</span>
              <span className="font-medium text-slate-200">results.md</span> — quantitative +
              qualitative findings
            </li>
            <li className="rounded-lg border border-white/5 px-3 py-2">
              <span className="block text-xs uppercase tracking-wider text-slate-500">4</span>
              <span className="font-medium text-slate-200">recommendations.md</span> — ranked
              action queue
            </li>
            <li className="rounded-lg border border-white/5 px-3 py-2 sm:col-span-2">
              <span className="block text-xs uppercase tracking-wider text-slate-500">5</span>
              <span className="font-medium text-slate-200">replicate.md</span> — reproducibility
              commands so anyone can re-run
            </li>
          </ol>
        </section>

        {/* Experiments list */}
        <section className="space-y-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-slate-300">
            Shipped experiments
          </h2>
          {EXPERIMENTS.length === 0 ? (
            <p className="text-sm text-slate-500">No experiments shipped yet.</p>
          ) : (
            EXPERIMENTS.map((e) => <ExperimentCard key={e.slug} experiment={e} />)
          )}
        </section>

        {/* Methodology link */}
        <footer className="mt-16 border-t border-white/10 pt-8 text-sm text-slate-500">
          <p className="mb-2">
            Substrate documentation:{' '}
            <a
              href="https://github.com/frankxai/FrankX/blob/main/experiments/README.md"
              className="text-emerald-400 hover:text-emerald-300"
            >
              experiments/README.md
            </a>
          </p>
          <p>
            All raw artifacts and data live in the FrankX GitHub repo at{' '}
            <a
              href="https://github.com/frankxai/FrankX/tree/main/experiments"
              className="text-emerald-400 hover:text-emerald-300"
            >
              github.com/frankxai/FrankX/experiments
            </a>{' '}
            (MIT). Cite as documented per experiment.
          </p>
        </footer>
      </main>
    </>
  )
}

function Metric({
  label,
  value,
  tone = 'slate',
}: {
  label: string
  value: string
  tone?: 'emerald' | 'rose' | 'slate'
}) {
  const colorMap = {
    emerald: 'text-emerald-300',
    rose: 'text-rose-300',
    slate: 'text-slate-300',
  }
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
      <div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className={`mt-1 font-mono text-2xl ${colorMap[tone]}`}>{value}</div>
    </div>
  )
}
