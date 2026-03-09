import type { Metadata } from 'next'
import Script from 'next/script'
import { ArrowRight, GraduationCap, CheckCircle2 } from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'
import { learningTracks } from '@/lib/gencreator/gencreator-data'

export const metadata: Metadata = {
  title: 'Learn — 12-Week GenCreator Curriculum',
  description:
    'Three progressive learning tracks: Foundation (weeks 1-4), Builder (weeks 5-8), Master (weeks 9-12). From first soul.md to running your creative empire.',
  openGraph: {
    title: 'GenCreator Learning Paths',
    description: '12-week curriculum. Foundation → Builder → Master. Ship something real every week.',
    url: 'https://frankx.ai/gencreator/learn',
  },
}

const trackColors = ['emerald', 'cyan', 'violet'] as const

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'GenCreator Learning Paths',
  description: '12-week curriculum for generative creators — from foundation to mastery.',
  url: 'https://frankx.ai/gencreator/learn',
  provider: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
  hasCourseInstance: learningTracks.map((track) => ({
    '@type': 'CourseInstance',
    name: `Track ${track.number}: ${track.name}`,
    description: track.description,
    courseWorkload: track.weeks,
  })),
}

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/30 via-[#02030b] to-emerald-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.10),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-teal-200">
            <GraduationCap className="h-4 w-4" />
            12-Week Curriculum
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-teal-100 to-emerald-100 bg-clip-text text-transparent">
              Learn by Shipping
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl">
            Three progressive tracks. Each week ends with a real deliverable.
            <br className="hidden sm:block" />
            Not theory — practice. Not courses — outcomes.
          </p>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { step: '01', title: 'Read', desc: 'Each week maps to specific handbook chapters and principles.' },
              { step: '02', title: 'Execute', desc: 'Apply a blueprint to your own creative practice.' },
              { step: '03', title: 'Ship', desc: 'Every week ends with a deliverable. Published, live, real.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-teal-400/30 bg-teal-500/10 font-mono text-sm font-bold text-teal-300">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Learning Tracks ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-16">
            {learningTracks.map((track, trackIdx) => (
              <div key={track.number}>
                {/* Track Header */}
                <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${track.color}`}>
                    <track.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-white sm:text-3xl">
                        Track {track.number}: {track.name}
                      </h2>
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/40">
                        {track.weeks}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-white/40">{track.tagline}</p>
                  </div>
                </div>

                <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/60">
                  {track.description}
                </p>

                {/* Modules */}
                <div className="grid gap-4 md:grid-cols-2">
                  {track.modules.map((mod, modIdx) => (
                    <GlowCard key={mod.title} color={trackColors[trackIdx]} className="p-6">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.08] font-mono text-xs font-bold text-white/50">
                          {trackIdx * 4 + modIdx + 1}
                        </div>
                        <h3 className="text-base font-semibold text-white">{mod.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-white/60">{mod.description}</p>
                      <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-400/10 bg-emerald-500/5 px-3 py-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span className="text-xs text-emerald-300/80">
                          <span className="font-semibold">Deliverable:</span> {mod.deliverable}
                        </span>
                      </div>
                    </GlowCard>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── After 12 Weeks ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            After 12 Weeks, You Will Have
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-3 text-left">
            {[
              'A completed soul.md defining your creative identity',
              'A production-grade creative stack (tools + automation)',
              'At least 3 executed blueprints with published output',
              'A launched digital product with revenue potential',
              'Custom AI agents automating your unique workflow',
              'An active peer network and community presence',
              'A self-sustaining creative flywheel',
              '84+ daily ships in your portfolio',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-sm text-white/70">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Start Week 1 Today.
          </h2>
          <p className="mt-4 text-white/50">
            The free Starter Kit includes everything you need for Track 1.
            Pro unlocks the complete 12-week curriculum.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/join">
              Start Learning
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator/handbook">
              Read the Handbook First
            </PremiumButton>
          </div>
        </div>
      </section>

      <Script id="learn-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
