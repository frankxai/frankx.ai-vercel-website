'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, ShieldCheck, Activity, Award, HelpCircle, AlertTriangle, Code2 } from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import { ThreeArenaScene } from '@/components/research/ThreeArenaScene'
import { TaskRoutingPlayground } from '@/components/research/TaskRoutingPlayground'
import {
  ROUNDS,
  METHODOLOGY_STEPS,
  ROUTING_IMPLICATIONS,
  CAVEATS,
  FAQS,
  METHODOLOGY_URL,
  RUNS_DIR_URL,
} from './data'

export default function ModelArenaPage() {
  const [selectedRoundId, setSelectedRoundId] = useState(ROUNDS[0].id)
  const activeRound = ROUNDS.find((r) => r.id === selectedRoundId) || ROUNDS[0]

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Starlight Model Arena Rounds',
    description: 'Head-to-head LLM evals run natively inside Claude Code across multiple rounds.',
    itemListElement: ROUNDS.map((r, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: r.title,
      description: r.headline
    }))
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
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
          backgroundSize: '45px 45px' 
        }} 
      />
      <div className="absolute top-0 right-0 w-[50%] h-[40%] bg-gradient-to-br from-indigo-500/5 to-transparent filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        {/* Navigation */}
        <nav className="mb-10">
          <Link
            href="/research"
            className="group inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Research Hub
          </Link>
        </nav>

        {/* Title Header */}
        <header className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#a855f7] text-xs font-mono tracking-wider uppercase">
            <span>6-Pillar CoE • Proving Ground</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Starlight Model Arena
          </h1>
          <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
            Head-to-head LLM evaluations run natively inside the Claude Code agent harness. Fable 5, Opus 4.8, and the Anthropic lineup tested on real-world engineering constraints. <strong>Mechanical verification, blind judging, open JSON receipts.</strong>
          </p>
        </header>

        {/* 3D Visual Scene */}
        <section className="mb-14">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#a855f7]">
              Performance Visualization
            </h2>
            <span className="text-[10px] text-zinc-500 font-mono">Interactive WebGL Canvas</span>
          </div>
          <ThreeArenaScene />
        </section>

        {/* Dynamic Router Playground */}
        <section className="mb-14 border-t border-white/5 pt-14">
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2">
              Dynamic Routing Playground
            </h2>
            <p className="text-sm text-zinc-400">See how developer pipelines and agents utilize the Arena Hub to dynamically choose target models based on constraints.</p>
          </div>
          <TaskRoutingPlayground />
        </section>

        {/* The Scoreboard Tab System */}
        <section className="mb-14 border-t border-white/5 pt-14">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2">
                Evaluation Rounds Standings
              </h2>
              <p className="text-sm text-zinc-400">Detailed receipt logs from head-to-head runs. Select a round to inspect metrics.</p>
            </div>
            <a
              href={RUNS_DIR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#a855f7] hover:underline"
            >
              Browse Open JSON Receipts
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Round selectors */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-white/5 pb-4">
            {ROUNDS.map((round) => (
              <button
                key={round.id}
                onClick={() => setSelectedRoundId(round.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  selectedRoundId === round.id
                    ? 'bg-white text-black border-white shadow-lg'
                    : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
                }`}
              >
                {round.title}
              </button>
            ))}
          </div>

          {/* Active Round card */}
          {activeRound && (
            <div className="bg-slate-950/50 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h3 className="text-xl font-bold text-white">{activeRound.card}</h3>
                <span className="text-xs text-zinc-500 font-mono">Executed: {activeRound.date}</span>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#a855f7]/30 bg-[#a855f7]/[0.06] px-3.5 py-1 text-xs font-semibold text-[#a855f7]">
                  <Award className="w-3.5 h-3.5" />
                  {activeRound.tally}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-zinc-400 font-mono">
                  {activeRound.judged ? 'Blind LLM Judge + Mechanical Tests' : 'Fully Mechanical assertions'}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-zinc-400 font-mono">
                  Contestants: {activeRound.contestants.join(' vs ')}
                </span>
              </div>

              <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-sm leading-relaxed text-zinc-300">
                <span className="font-semibold text-white">Headline: </span>
                {activeRound.headline}
              </div>

              {/* Task Breakdown list */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">TASK SPECIFICS</div>
                {activeRound.tasks.map((task) => (
                  <div 
                    key={task.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#020617] border border-white/5 hover:border-white/10 transition-all text-xs"
                  >
                    <span className="text-zinc-400 font-medium mb-1 sm:mb-0">{task.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500 font-mono text-[10px]">{task.id}</span>
                      <span className="font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                        {task.winner}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <a
                  href={activeRound.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
                >
                  <Code2 className="w-4 h-4 text-zinc-400" />
                  View canonical JSON receipt mapping this round
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}
        </section>

        {/* Methodology List */}
        <section className="mb-14 border-t border-white/5 pt-14">
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2">
              The Proving Ground Methodology
            </h2>
            <p className="text-sm text-zinc-400">How the harness executes evaluations to eliminate cherry-picking bias.</p>
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

          <p className="mt-6 text-xs text-zinc-500">
            Read complete verification rules in{' '}
            <a
              href={METHODOLOGY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white"
            >
              tools/arena/README.md
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </section>

        {/* Routing Implications Summary */}
        <section className="mb-14 border-t border-white/5 pt-14">
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2">
              Tactical Routing Guidelines
            </h2>
            <p className="text-sm text-zinc-400">Core operational logic derived directly from the scorecard receipts.</p>
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

        {/* Caveats Accordion */}
        <section className="mb-14 border-t border-white/5 pt-14">
          <div className="p-5 rounded-2xl border border-amber-500/10 bg-amber-500/[0.02] flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-amber-400 mb-1">Caveats & Safety Guardrails</h3>
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
                  <span className="text-zinc-500 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-zinc-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Page Footer */}
        <footer className="border-t border-white/5 pt-8 text-center text-xs text-zinc-500">
          <p>Starlight Model Arena • Built on Starlight Intelligence Protocol (SIP) • 2026</p>
        </footer>
      </div>
    </main>
  )
}
