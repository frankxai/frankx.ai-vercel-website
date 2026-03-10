'use client'

import { useState } from 'react'
import Script from 'next/script'
import { ArrowRight, Wrench, ExternalLink } from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'
import { toolkitItems, toolkitCategories } from '@/lib/gencreator/gencreator-data'

const categoryColors: Record<string, string> = {
  AI: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
  Automation: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  Publishing: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  Design: 'text-pink-400 border-pink-400/30 bg-pink-400/10',
  Audio: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
  Analytics: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
}

const tagColors: Record<string, string> = {
  Essential: 'text-emerald-300 border-emerald-300/20 bg-emerald-300/5',
  Advanced: 'text-rose-300 border-rose-300/20 bg-rose-300/5',
  Growth: 'text-amber-300 border-amber-300/20 bg-amber-300/5',
  'Music Creators': 'text-cyan-300 border-cyan-300/20 bg-cyan-300/5',
  'Visual Creators': 'text-pink-300 border-pink-300/20 bg-pink-300/5',
  Beginners: 'text-teal-300 border-teal-300/20 bg-teal-300/5',
  Organization: 'text-indigo-300 border-indigo-300/20 bg-indigo-300/5',
  SEO: 'text-blue-300 border-blue-300/20 bg-blue-300/5',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'GenCreator Toolkit',
  description: 'Curated tools and platforms for generative creators.',
  url: 'https://frankx.ai/gencreator/toolkit',
  itemListElement: toolkitItems.map((tool, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: tool.name,
    description: tool.description,
  })),
}

export default function ToolkitPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const filtered = activeCategory === 'All'
    ? toolkitItems
    : toolkitItems.filter((t) => t.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-[#02030b] to-orange-950/15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-amber-200">
            <Wrench className="h-4 w-4" />
            Toolkit
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-amber-100 to-orange-100 bg-clip-text text-transparent">
              The GenCreator Stack
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl">
            Curated tools that power the GenCreator workflow.
            <br className="hidden sm:block" />
            Every tool here is one we use in production, daily.
          </p>
        </div>
      </section>

      {/* ─── Stack Philosophy ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-xl font-semibold text-white">Stack Philosophy</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            The best stack is the one you actually use. We choose tools that are{' '}
            <span className="text-amber-300">developer-friendly</span>,{' '}
            <span className="text-amber-300">self-hostable where possible</span>, and{' '}
            <span className="text-amber-300">composable via APIs</span>.
            Lightweight. Interoperable. Every tool earns its place.
          </p>
        </div>
      </section>

      {/* ─── Category Filter ─── */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {toolkitCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-amber-500/15 text-amber-300'
                    : 'text-white/50 hover:bg-white/[0.05] hover:text-white/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tool Grid ─── */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool) => (
              <GlowCard key={tool.name} color="amber" className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <tool.icon className="h-7 w-7 text-amber-400" />
                  <div className="flex gap-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${categoryColors[tool.category] || ''}`}>
                      {tool.category}
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${tagColors[tool.tag] || 'text-white/40 border-white/10 bg-white/5'}`}>
                      {tool.tag}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{tool.description}</p>
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-amber-400 hover:text-amber-300"
                  >
                    Visit <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── soul.md Stack Section ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117] p-6 font-mono text-sm">
            <div className="mb-4 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="space-y-2 text-white/70">
              <p><span className="text-amber-400">$</span> cat ~/soul.md | grep &quot;## Stack&quot;</p>
              <p className="mt-2 text-amber-300">## Stack</p>
              <p className="text-white/40">- AI: Claude Code, Claude, Gemini, OpenRouter</p>
              <p className="text-white/40">- Automation: n8n (Railway), GitHub Actions</p>
              <p className="text-white/40">- Publishing: Next.js 16, Vercel, Resend</p>
              <p className="text-white/40">- Design: Figma, Canva, Gemini Image</p>
              <p className="text-white/40">- Audio: Suno, Vercel Blob (self-hosted MP3s)</p>
              <p className="text-white/40">- Analytics: Search Console, Vercel Analytics</p>
              <p className="mt-2 text-amber-300/60">
                &gt; Your stack is unique. Build it in your soul.md.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Tools are only as good as the system behind them.
          </h2>
          <p className="mt-4 text-white/50">
            The Handbook teaches you how to build your stack into a production system.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/handbook">
              Read the Handbook
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator/blueprints">
              Browse Blueprints
            </PremiumButton>
          </div>
        </div>
      </section>

      <Script id="toolkit-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
