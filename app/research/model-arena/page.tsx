import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import {
  ROUNDS,
  METHODOLOGY_STEPS,
  ROUTING_IMPLICATIONS,
  CAVEATS,
  FAQS,
  METHODOLOGY_URL,
  RUNS_DIR_URL,
} from './data'

export const metadata: Metadata = {
  title: 'Starlight Model Arena — Live Eval Receipts | FrankX Research',
  description:
    'Head-to-head LLM evals run natively inside Claude Code: Fable 5 vs Opus 4.8 (and the full Anthropic lineup) across five receipted rounds. Mechanical verification, blind judging, open JSON receipts. Which model to route where.',
  keywords: [
    'model arena',
    'LLM evals',
    'Fable 5 vs Opus 4.8',
    'Claude model comparison',
    'model routing',
    'AI eval harness',
    'Anthropic lineup benchmark',
  ],
  alternates: {
    canonical: 'https://frankx.ai/research/model-arena',
  },
  openGraph: {
    title: 'Starlight Model Arena — Live Eval Receipts',
    description:
      'Fable 5 vs Opus 4.8 and the full Anthropic lineup across five receipted rounds, run inside Claude Code. Mechanical verification, blind judging, open receipts.',
    type: 'article',
    url: 'https://frankx.ai/research/model-arena',
  },
}

export default function ModelArenaPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <JsonLd
        type="Article"
        data={{
          headline: 'Starlight Model Arena',
          description:
            'Head-to-head LLM evals run natively inside Claude Code — Fable 5 vs Opus 4.8 and the full Anthropic lineup across five receipted rounds, with mechanical verification and blind judging.',
          author: { '@type': 'Person', name: 'Frank', url: 'https://frankx.ai' },
          datePublished: '2026-06-09',
          dateModified: '2026-06-10',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://frankx.ai/research/model-arena',
          },
        }}
      />
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: FAQS.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }}
      />

      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {/* Back link */}
        <Link
          href="/research"
          className="mb-12 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Research Hub
        </Link>

        {/* Header */}
        <header className="mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            Research · Proving Ground
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Starlight Model Arena
          </h1>
          <p className="text-sm text-zinc-500">
            Five receipted rounds · June 9–10, 2026 · model-in-harness
          </p>
        </header>

        {/* TL;DR */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            TL;DR
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              You do not need an eval platform to know which model to route
              where. The Claude Code <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[0.85em] text-zinc-200">Agent</code> tool
              accepts a per-spawn <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[0.85em] text-zinc-200">model</code> override
              — which makes the CLI itself a head-to-head harness. We dispatched
              the same tasks to each model as parallel subagents, verified
              objective work mechanically, judged subjective work blind, and
              wrote a JSON receipt for every run.
            </p>
            <p>
              The headline across five rounds: <strong className="font-semibold text-white">capability is
              largely saturated</strong> — the whole Anthropic lineup, Haiku
              included, solves the coding, reasoning, and grounding tasks. The
              models separate on two different axes. <strong className="font-semibold text-white">Fable 5</strong> owns
              output-constraint discipline; <strong className="font-semibold text-white">Opus 4.8</strong> owns
              situational judgment. Route to the axis your task needs — the full
              routing table is below.
            </p>
            <p>
              The companion guides are{' '}
              <Link
                href="/blog/llm-evals-claude-code-guide"
                className="text-zinc-100 underline decoration-zinc-600 underline-offset-4 hover:decoration-zinc-400"
              >
                the eval-harness walkthrough
              </Link>{' '}
              and{' '}
              <Link
                href="/blog/ai-model-routing-guide"
                className="text-zinc-100 underline decoration-zinc-600 underline-offset-4 hover:decoration-zinc-400"
              >
                the model-routing guide
              </Link>
              . This page is the live scoreboard they cite.
            </p>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            How it works
          </h2>
          <ol className="space-y-6">
            {METHODOLOGY_STEPS.map((step, i) => (
              <li key={step.name} className="flex gap-4">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-white">{step.name}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-zinc-500">
            Full harness docs:{' '}
            <a
              href={METHODOLOGY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white"
            >
              tools/arena/README.md
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </section>

        {/* Rounds */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            The rounds
          </h2>
          <div className="space-y-6">
            {ROUNDS.map((round) => (
              <article
                key={round.id}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-white">{round.title}</h3>
                  <span className="text-xs text-zinc-500">{round.date}</span>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-zinc-400">{round.card}</p>

                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.06] px-2.5 py-0.5 text-xs font-medium text-[#D4AF37]">
                    {round.tally}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-xs text-zinc-400">
                    {round.judged ? 'blind judge + mechanical' : 'fully mechanical'}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-xs text-zinc-400">
                    {round.contestants.join(' · ')}
                  </span>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-zinc-300">{round.headline}</p>

                <ul className="mb-4 space-y-2 border-t border-white/[0.06] pt-4">
                  {round.tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                    >
                      <span className="text-sm text-zinc-400">{task.category}</span>
                      <span className="text-xs font-medium text-zinc-300">{task.winner}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={round.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-zinc-500 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-zinc-300"
                >
                  Open the JSON receipt
                  <ExternalLink className="h-3 w-3" />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Routing implications */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            Routing implications
          </h2>
          <div className="space-y-6">
            {ROUTING_IMPLICATIONS.map((r) => (
              <div key={r.lane}>
                <div className="mb-1 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h3 className="text-base font-semibold text-white">{r.lane}</h3>
                  <span className="text-sm font-semibold text-[#D4AF37]">{r.call}</span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">{r.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Caveats */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            Caveats (part of the result)
          </h2>
          <ul className="space-y-3">
            {CAVEATS.map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-zinc-400">
                <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-600" />
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            FAQ
          </h2>
          <div className="space-y-8">
            {FAQS.map((faq) => (
              <div key={faq.question}>
                <h3 className="mb-2 text-base font-semibold text-white">{faq.question}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Work */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            Related Work
          </h2>
          <ul className="space-y-3">
            {[
              {
                href: '/blog/llm-evals-claude-code-guide',
                label: 'How to Run LLM Evals Inside Claude Code (the harness)',
                external: false,
              },
              {
                href: '/blog/ai-model-routing-guide',
                label: 'The AI Model Routing Guide (which model, which task)',
                external: false,
              },
              {
                href: '/blog/claude-fable-5-analysis-2026',
                label: 'Claude Fable 5 — Launch-Day Analysis',
                external: false,
              },
              {
                href: '/blog/claude-fable-5-prompting-guide',
                label: 'Claude Fable 5 — Prompting Guide',
                external: false,
              },
              {
                href: RUNS_DIR_URL,
                label: 'All five JSON receipts (open repository)',
                external: true,
              },
            ].map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-white hover:decoration-zinc-500"
                  >
                    {item.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-white hover:decoration-zinc-500"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Status */}
        <footer className="border-t border-zinc-800 pt-8">
          <p className="text-sm text-zinc-500">
            Active Research · Starlight Model Arena · Built on SIP · 2026
          </p>
        </footer>
      </div>
    </main>
  )
}
