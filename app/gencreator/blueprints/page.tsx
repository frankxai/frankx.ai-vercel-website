'use client'

import { useState } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import { ArrowRight, Heart } from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'
import {
  blueprints,
  blueprintCategories,
  difficultyColors,
} from '@/lib/gencreator/gencreator-data'
import type { BlueprintCategory } from '@/lib/gencreator/gencreator-types'

const categoryColors: Record<string, string> = {
  Content: 'text-cyan-400',
  Music: 'text-violet-400',
  Product: 'text-amber-400',
  System: 'text-emerald-400',
  Growth: 'text-rose-400',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "GenCreator Blueprints",
  description: 'Actionable frameworks for specific creative workflows. Copy, customize, execute.',
  url: 'https://frankx.ai/gencreator/blueprints',
  numberOfItems: blueprints.length,
  itemListElement: blueprints.map((bp, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: bp.title,
    description: bp.description,
  })),
}

export default function BlueprintsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered =
    activeCategory === 'All'
      ? blueprints
      : blueprints.filter((bp) => bp.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* Hero Image */}
      <div className="relative mb-8 overflow-hidden rounded-2xl mx-auto max-w-5xl mt-6 px-6">
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
          <Image src="/images/blog/agentic-creator-os-complete-guide-hero.png" alt="GenCreator Blueprints — actionable creator frameworks" fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-400/60 mb-2">GenCreator</p>
          <h1 className="text-2xl font-bold text-white">Creator&apos;s Blueprints</h1>
        </div>
      </div>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-[#02030b] to-purple-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.10),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-violet-200">
            {blueprints.length} Blueprints
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-violet-100 to-purple-100 bg-clip-text text-transparent">
              Creator&apos;s Blueprints
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl">
            Actionable frameworks for specific creative workflows.
            <br className="hidden sm:block" />
            Copy the blueprint. Customize for your stack. Execute.
          </p>
        </div>
      </section>

      {/* ─── Category Filter ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 overflow-x-auto px-6 scrollbar-hide">
          {blueprintCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-violet-500/15 text-violet-300'
                  : 'text-white/50 hover:bg-white/[0.05] hover:text-white/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ─── Blueprint Grid ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((bp) => (
              <GlowCard key={bp.title} color="violet" className="flex flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                  <bp.icon className="h-7 w-7 text-violet-400" />
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${difficultyColors[bp.difficulty]}`}>
                    {bp.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{bp.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{bp.description}</p>

                <div className="mt-4 space-y-3 border-t border-white/[0.06] pt-4">
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <span className={categoryColors[bp.category] || 'text-white/40'}>
                      {bp.category}
                    </span>
                    <span>{bp.timeEstimate}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {bp.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/40"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-white/[0.08] bg-white/[0.03] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Blueprints shape what you do. Soul shapes who you are.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/soul">
              <Heart className="h-5 w-5" />
              Explore GenCreator Soul
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator">
              Back to Hub
            </PremiumButton>
          </div>
        </div>
      </section>

      <Script id="blueprints-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
