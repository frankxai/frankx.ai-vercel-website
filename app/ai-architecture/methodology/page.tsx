import Link from 'next/link'
import { ChevronLeft, FlaskConical, GitPullRequest, Scale, ShieldAlert } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Methodology — How the numbers are made | AI Architecture',
  description:
    'How frankx.ai/ai-architecture collects, dates, sources, and retires every number — what "verified" means, how to challenge a figure, and what this reference deliberately does not cover.',
  path: '/ai-architecture/methodology',
})

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof FlaskConical
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="space-y-3 text-[15px] leading-relaxed text-slate-300">{children}</div>
    </section>
  )
}

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      <section className="pt-28 pb-10 border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/ai-architecture"
            className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Hub
          </Link>
          <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-emerald-400/60">AI Architecture</p>
          <h1 className="mb-4 text-4xl font-bold text-white">Methodology</h1>
          <p className="text-lg text-slate-400">
            A reference you can check beats a reference you have to trust. Here is exactly how every
            number on this hub is made, dated, sourced, and retired — and how to prove one wrong.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <Section icon={FlaskConical} title="Two kinds of numbers, never mixed">
            <p>
              <strong className="text-white">First-party benchmarks</strong> are numbers we generate
              ourselves with a runnable harness — corpus, seeds, code, and raw logs published so you
              can reproduce them. These are the headline. See the{' '}
              <a
                href="https://github.com/frankxai/frankx.ai-vercel-website/tree/main/benchmarks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                benchmark spine
              </a>
              .
            </p>
            <p>
              <strong className="text-white">Borrowed statistics</strong> from third parties appear
              only in the{' '}
              <Link href="/ai-architecture/data" className="text-emerald-400 hover:underline">
                cost &amp; reliability dataset
              </Link>
              , one row each, tagged with the denominator (N), the exact definition of what was
              measured, the source URL, the retrieval date, and a confidence level. They are marked
              <em> corroborating, methodology varies</em> — never presented as our own rigor.
            </p>
          </Section>

          <Section icon={Scale} title="What 'verified' means">
            <p>A number is only published if it clears all of these:</p>
            <ul className="space-y-2 pl-1">
              {[
                'It resolves to a reachable primary source that actually states the value — not a blog repeating a blog.',
                'We can name the denominator: what population, corpus, or sample the number is computed over.',
                'We can state the definition of the measured event (what counts as a "failure", a "hit", "in production").',
                'It carries a retrieval date, because every one of these numbers decays.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {t}
                </li>
              ))}
            </ul>
            <p>
              If a widely-repeated figure has no traceable primary source with a stateable
              denominator, it does not go on the hub. It goes on a cut list.
            </p>
          </Section>

          <Section icon={GitPullRequest} title="Dating, retirement, and corrections">
            <p>
              Every figure carries an <code className="text-cyan-300">as of</code> date. A figure
              past its freshness window is flagged stale by a CI check and either re-sourced or
              retired — a half-maintained &ldquo;living&rdquo; reference is worse than an honest
              static one.
            </p>
            <p>
              The dataset ships as a versioned, forkable file. Found an error, a better source, or a
              missing denominator? Open a pull request against{' '}
              <code className="text-cyan-300">data/ai-architecture/cost-reliability-ledger.json</code>{' '}
              or an issue. Corrections are reviewed within one week. Critics are the quality system,
              not a threat to it.
            </p>
          </Section>

          <Section icon={ShieldAlert} title="Boundaries — what this is not">
            <ul className="space-y-2 pl-1">
              {[
                'Not legal advice. Compliance-mapped architectures (EU AI Act, SR 11-7, HIPAA) are architecture guidance only; verify obligations with qualified counsel.',
                'Not a universal benchmark. A first-party number holds for the corpus and task distribution it was run on, stated alongside it — not for your stack until you re-run it.',
                'Not vendor-neutral by accident. Affiliate and sponsor links live only on clearly-labeled deploy and tooling pages, never on a benchmark, dataset, or reference page.',
                'Not exhaustive. This reference covers production patterns, retrieval, agents, evals, cost, and governance. It does not cover model training, research-grade ML, or hardware.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  {t}
                </li>
              ))}
            </ul>
          </Section>

          <p className="mt-12 border-t border-white/5 pt-6 text-sm text-slate-500">
            Independent project. Not affiliated with, endorsed by, or sponsored by Oracle. Built by{' '}
            <a href="https://frankx.ai" className="text-slate-400 hover:text-white">
              Frank Riemer
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
