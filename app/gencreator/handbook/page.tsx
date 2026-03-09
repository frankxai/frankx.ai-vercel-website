import Script from 'next/script'
import { ArrowRight, Map } from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'
import { chapters } from '@/lib/gencreator/gencreator-data'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: "The GenCreator's Handbook",
  description: '8 chapters covering the complete operating system for generative creators — from identity to legacy.',
  author: { '@type': 'Person', name: 'Frank Guzman', url: 'https://frankx.ai' },
  url: 'https://frankx.ai/gencreator/handbook',
  numberOfPages: 8,
}

export default function HandbookPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-[#02030b] to-blue-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.10),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200">
            8 Chapters
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
              The GenCreator&apos;s Handbook
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl">
            The complete operating manual for building, creating, and sustaining
            <br className="hidden sm:block" />
            a generative creator practice. From identity to legacy.
          </p>
        </div>
      </section>

      {/* ─── How to Use ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-xl font-semibold text-white">How to Use This Handbook</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            Read sequentially for the full journey, or jump to the chapter that matches your current challenge.
            Each chapter is self-contained but connects to the larger system.
            Estimated total read time: <span className="text-cyan-300">~130 minutes</span>.
          </p>
        </div>
      </section>

      {/* ─── Chapters ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-6">
            {chapters.map((ch) => (
              <GlowCard key={ch.number} color="cyan" className="p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="flex shrink-0 items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${ch.color}`}>
                      <ch.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="md:hidden">
                      <h3 className="text-lg font-bold text-white">
                        <span className="text-white/30">Ch {ch.number}.</span> {ch.title}
                      </h3>
                      <p className="text-sm text-cyan-300/70">{ch.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="hidden md:block">
                      <h3 className="text-xl font-bold text-white">
                        <span className="text-white/30">Chapter {ch.number}.</span> {ch.title}
                      </h3>
                      <p className="mt-1 text-sm text-cyan-300/70">{ch.subtitle}</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{ch.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {ch.topics.map((topic) => (
                        <span key={topic} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-white/40">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 text-sm text-white/30">
                    <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-xs">
                      {ch.readTime}
                    </span>
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
            Knowledge without action is entertainment.
          </h2>
          <p className="mt-4 text-white/50">
            The Blueprints turn handbook knowledge into executable workflows.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/blueprints">
              <Map className="h-5 w-5" />
              Browse Blueprints
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator">
              Back to Hub
            </PremiumButton>
          </div>
        </div>
      </section>

      <Script id="handbook-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
