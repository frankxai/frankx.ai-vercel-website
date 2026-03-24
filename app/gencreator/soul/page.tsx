'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Script from 'next/script'
import Image from 'next/image'
import { ArrowRight, Download, FileText, Scroll } from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'
import { soulDimensions } from '@/lib/gencreator/gencreator-data'
import type { GlowColor } from '@/components/ui/glow-card'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'GenCreator Soul — Build Your soul.md',
  description: 'The 7 dimensions of a complete GenCreator. Build your personal soul.md — the operating file that defines who you are as a creator.',
  url: 'https://frankx.ai/gencreator/soul',
  author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
}

const soulMdTemplate = `# soul.md — Your GenCreator Operating File

## Identity
- Name:
- Craft:
- Stack:
- Mission:

## Energy
- Peak hours:
- Movement practice:
- Recovery ritual:
- Energy score (1-10):

## Mind
- Currently learning:
- Books this month:
- Mental model I use most:
- Learning velocity (1-10):

## Craft
- Primary skill:
- Secondary skills:
- Current project:
- Craft score (1-10):

## Voice
- My perspective on:
- What I would say if no one judged:
- Writing style in 3 words:
- Voice clarity (1-10):

## Capital
- Revenue streams:
- Monthly target:
- Highest-leverage activity:
- Financial health (1-10):

## Circle
- Mentors:
- Peers:
- Community I serve:
- Network strength (1-10):

## Legacy
- What I want to leave behind:
- System that works without me:
- 10-year vision:
- Legacy clarity (1-10):
`

export default function SoulPage() {
  const [activeDimension, setActiveDimension] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-[#02030b] to-rose-950/15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.08),transparent_50%)]" />

        {/* FRANK-Omega thinking accent */}
        <div className="pointer-events-none absolute left-4 bottom-4 hidden w-36 opacity-[0.06] lg:block">
          <Image src="/images/mascot/frank-omega-thinking-v1.png" alt="" width={144} height={144} className="object-contain" aria-hidden="true" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-amber-200">
            7 Dimensions
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-amber-100 to-yellow-100 bg-clip-text text-transparent">
              GenCreator Soul
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl">
            The 7 dimensions of a complete creator.
            <br className="hidden sm:block" />
            Explore each dimension. Then build your <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-amber-300">soul.md</code>.
          </p>
        </div>
      </section>

      {/* ─── What is soul.md? ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">What is soul.md?</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Your soul.md is a personal configuration file — like a CLAUDE.md for your life.
                It defines your creative identity, your current state across 7 dimensions,
                and your trajectory. It is the most honest document you will ever write,
                because it is only for you.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                Review it weekly. Update it monthly. It becomes your creative compass.
              </p>
            </div>
            <div className="shrink-0 rounded-xl border border-white/[0.06] bg-[#0d1117] p-4 font-mono text-xs md:min-w-[280px]">
              <div className="mb-3 flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <div className="space-y-1 text-white/50">
                <p><span className="text-emerald-400">$</span> cat ~/soul.md</p>
                <p className="text-amber-300"># GenCreator: You</p>
                <p className="text-white/30">## Energy: 8/10</p>
                <p className="text-white/30">## Craft: AI + Music</p>
                <p className="text-white/30">## Voice: Direct, technical, warm</p>
                <p className="text-white/30">## Legacy: Systems that outlive me</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Dimensions Explorer ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
            The 7 Dimensions
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-white/50">
            Click any dimension to explore its meaning and reflect on the questions within.
          </p>

          {/* Dimension selector */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {soulDimensions.map((dim) => (
              <button
                key={dim.number}
                onClick={() => setActiveDimension(activeDimension === dim.number ? null : dim.number)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  activeDimension === dim.number
                    ? 'border-amber-400/40 bg-amber-500/15 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                    : 'border-white/[0.08] bg-white/[0.03] text-white/50 hover:border-white/[0.15] hover:text-white/80'
                }`}
              >
                <span className="text-lg">{dim.symbol}</span>
                {dim.name}
              </button>
            ))}
          </div>

          {/* Expanded dimension */}
          <AnimatePresence mode="wait">
            {activeDimension !== null && (
              <motion.div
                key={activeDimension}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mb-12"
              >
                {soulDimensions
                  .filter((d) => d.number === activeDimension)
                  .map((dim) => (
                    <GlowCard key={dim.number} color={dim.glowColor as GlowColor} className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">{dim.symbol}</span>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{dim.name}</h3>
                          <p className="text-sm text-amber-300/70">{dim.tagline}</p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-white/60 mb-6">{dim.description}</p>
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">
                          Reflection Questions
                        </p>
                        <ul className="space-y-3">
                          {dim.questions.map((q, i) => (
                            <li key={i} className="flex gap-3 text-sm text-white/50">
                              <span className="mt-0.5 shrink-0 text-amber-400/60">{i + 1}.</span>
                              {q}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </GlowCard>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* All dimensions compact grid (when none expanded) */}
          {activeDimension === null && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {soulDimensions.map((dim) => (
                <GlowCard
                  key={dim.number}
                  color={dim.glowColor as GlowColor}
                  className="cursor-pointer p-5"
                  onClick={() => setActiveDimension(dim.number)}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl">{dim.symbol}</span>
                    <h3 className="text-lg font-semibold text-white">{dim.name}</h3>
                  </div>
                  <p className="text-sm text-white/50">{dim.tagline}</p>
                  <p className="mt-3 text-xs text-white/30">{dim.questions.length} questions &rarr;</p>
                </GlowCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── soul.md Template ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Create Your soul.md
            </h2>
            <p className="mt-4 text-white/50">
              Copy this template. Fill it honestly. Review weekly. This is your creative compass.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117] p-6 font-mono text-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs text-white/20">~/soul.md</span>
            </div>
            <pre className="max-h-96 overflow-y-auto whitespace-pre-wrap text-white/50 leading-relaxed scrollbar-hide">
              {soulMdTemplate}
            </pre>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/manifesto">
              <Scroll className="h-5 w-5" />
              Read the Manifesto
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator">
              Back to Hub
            </PremiumButton>
          </div>
        </div>
      </section>

      <Script id="soul-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
