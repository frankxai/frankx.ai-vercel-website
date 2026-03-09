import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'The 12 GenCreator Principles — Foundation of Generative Creation',
  description:
    '12 operating principles that define how GenCreators think, create, and build. From "Create Daily" to "Leave Artifacts" — the philosophical foundation.',
  openGraph: {
    title: 'The 12 GenCreator Principles',
    description: 'The philosophical foundation of every generative creator.',
    url: 'https://frankx.ai/gencreator/principles',
  },
}
import { ArrowRight, BookOpen } from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'
import { principles } from '@/lib/gencreator/gencreator-data'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The 12 GenCreator Principles',
  description: '12 principles that define how generative creators think, create, and build.',
  author: { '@type': 'Person', name: 'Frank Guzman', url: 'https://frankx.ai' },
  url: 'https://frankx.ai/gencreator/principles',
}

export default function PrinciplesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-[#02030b] to-teal-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.10),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-emerald-200">
            Foundation
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">
              The 12 Principles
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl">
            The philosophical foundation of every GenCreator.
            <br className="hidden sm:block" />
            These are not suggestions — they are operating principles.
          </p>
        </div>
      </section>

      {/* ─── Terminal Loader ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-8">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-xl border border-white/[0.06] bg-[#0d1117] p-4 font-mono text-sm">
            <div className="mb-3 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
            </div>
            <div className="space-y-1 text-white/50">
              <p><span className="text-emerald-400">$</span> gencreator --load principles</p>
              <p className="text-teal-300">Loading 12 GenCreator Principles...</p>
              <p className="text-white/30">
                [{principles.map((_, i) => '█').join('')}] 12/12 loaded
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Principles Grid ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {principles.map((p) => (
              <GlowCard key={p.number} color="emerald" className="p-8">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-lg font-bold text-white">
                    {p.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{p.title}</h3>
                    <p className="text-sm text-emerald-300/70">{p.tagline}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-white/60">{p.description}</p>
                <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/30">In practice</p>
                  <p className="mt-1 text-sm text-white/50">{p.example}</p>
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
            Principles are the foundation. The Handbook is the playbook.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/handbook">
              <BookOpen className="h-5 w-5" />
              Read the Handbook
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator">
              Back to Hub
            </PremiumButton>
          </div>
        </div>
      </section>

      <Script id="principles-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
