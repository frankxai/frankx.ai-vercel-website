import type { Metadata } from 'next'
import Script from 'next/script'
import { ArrowRight, Users, MessageSquare, Trophy, Radio, Award, Zap } from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'
import { communitySpaces, communityEvents } from '@/lib/gencreator/gencreator-data'

export const metadata: Metadata = {
  title: 'GenCreator Community — Build Together, Ship Together',
  description:
    'Join the GenCreator community. Discord channels, weekly challenges, live workshops, creator showcases, peer review circles, and AI-powered mentoring.',
  openGraph: {
    title: 'GenCreator Community',
    description: 'Discord community for generative creators. Challenges, workshops, showcases.',
    url: 'https://frankx.ai/gencreator/community',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'GenCreator Community',
  description: 'The community for generative creators — build together, ship together, grow together.',
  url: 'https://frankx.ai/gencreator/community',
  author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-[#02030b] to-purple-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.10),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-indigo-200">
            <Users className="h-4 w-4" />
            Community
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent">
              Build Together. Ship Together.
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl">
            Every GenCreator amplifies every other. A community of builders, creators,
            <br className="hidden sm:block" />
            and operators who ship daily and compound relentlessly.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/join">
              Join the Community
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator">
              Back to Framework
            </PremiumButton>
          </div>
        </div>
      </section>

      {/* ─── Community Values ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 sm:grid-cols-3">
          {[
            { icon: Zap, title: 'Ship Daily', desc: 'The core habit. Every member commits to creating something — anything — every day.' },
            { icon: MessageSquare, title: 'Give Feedback', desc: 'Honest, constructive, actionable. We make each other better through direct feedback.' },
            { icon: Trophy, title: 'Celebrate Wins', desc: 'Every launch, every milestone, every streak gets recognized. We lift each other up.' },
          ].map((v) => (
            <div key={v.title} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
                <v.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">{v.title}</h3>
              <p className="mt-2 text-sm text-white/50">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Discord Spaces ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Community Spaces
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/50">
            Structured channels designed for different types of creative work and collaboration.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {communitySpaces.map((space) => (
              <GlowCard key={space.name} color="violet" className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <space.icon className="h-6 w-6 text-indigo-400" />
                  <code className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-sm text-indigo-300">
                    {space.name}
                  </code>
                </div>
                <p className="text-sm leading-relaxed text-white/60">{space.description}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Events ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Weekly & Monthly Events
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/50">
            Consistent rhythms that keep the community engaged and growing.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {communityEvents.map((event) => (
              <GlowCard key={event.name} color="indigo" className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
                    <event.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{event.name}</h3>
                    <p className="mt-1 text-xs font-medium text-indigo-300/70">{event.frequency}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{event.description}</p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI Mentor ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-emerald-950/20 via-[#0d1117] to-teal-950/20 p-8 md:p-12">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-3xl shadow-lg shadow-emerald-500/20">
                🤖
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  AI-Powered Community Mentor
                </h2>
                <p className="mt-3 text-white/60">
                  An always-on AI assistant trained on the full GenCreator framework — principles, handbook, blueprints, and soul dimensions.
                  Ask questions, get blueprint recommendations, and receive personalized guidance 24/7.
                </p>
                <p className="mt-2 text-sm text-emerald-300/60">
                  Powered by Claude + ACOS. Available to Pro and Mastery members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Peer Review Pods ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Peer Review Circles
          </h2>
          <p className="mt-4 text-white/50">
            Small groups of 4 creators matched by skill level and creative focus.
            Weekly accountability, honest feedback, and shared growth.
          </p>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-left sm:grid-cols-2">
            {[
              'Matched by skill level and interests',
              'Weekly check-ins and work reviews',
              'Shared blueprint execution tracking',
              'Direct feedback on shipped work',
              'Accountability partnerships',
              'Rotating every 3 months for fresh perspectives',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                <div className="h-2 w-2 shrink-0 rounded-full bg-indigo-400" />
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
            Your circle determines your ceiling.
          </h2>
          <p className="mt-4 text-white/50">
            Join creators who ship daily, give honest feedback, and build systems that compound.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/join">
              Join GenCreator Pro
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator/join">
              Start Free
            </PremiumButton>
          </div>
        </div>
      </section>

      <Script id="community-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
