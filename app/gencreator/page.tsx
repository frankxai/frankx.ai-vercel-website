import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'The GenCreator Framework — Principles, Handbook, Blueprints & Soul',
  description:
    'The complete operating system for generative creators. 12 principles, 8 handbook chapters, 12 actionable blueprints, 7 soul dimensions, and a manifesto.',
  openGraph: {
    title: 'The GenCreator Framework',
    description: 'Principles. Handbook. Blueprints. Soul. The complete creator operating system.',
    url: 'https://frankx.ai/gencreator',
  },
}
import {
  ArrowRight,
  BookOpen,
  Compass,
  Flame,
  Heart,
  Map,
  Scroll,
  Users,
  GraduationCap,
  Wrench,
  CreditCard,
  Target,
  Trophy,
} from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'
import { hubStats } from '@/lib/gencreator/gencreator-data'

const sections = [
  {
    title: 'GenCreator Principles',
    description: '12 principles that define how GenCreators think, create, and build. The philosophical foundation.',
    href: '/gencreator/principles',
    icon: Compass,
    color: 'emerald' as const,
    count: '12 principles',
  },
  {
    title: "Creator's Handbook",
    description: '8 chapters covering the complete GenCreator operating system — from identity to legacy.',
    href: '/gencreator/handbook',
    icon: BookOpen,
    color: 'cyan' as const,
    count: '8 chapters',
  },
  {
    title: "Creator's Blueprints",
    description: 'Actionable frameworks for specific creative workflows. Copy, customize, execute.',
    href: '/gencreator/blueprints',
    icon: Map,
    color: 'violet' as const,
    count: '12 blueprints',
  },
  {
    title: 'GenCreator Soul',
    description: 'The 7 dimensions of a complete creator. Build your personal soul.md — your creative operating file.',
    href: '/gencreator/soul',
    icon: Heart,
    color: 'amber' as const,
    count: '7 dimensions',
  },
  {
    title: 'Self-Assessment',
    description: 'Score yourself across 7 dimensions. See your radar chart and get personalized growth recommendations.',
    href: '/gencreator/assess',
    icon: Target,
    color: 'violet' as const,
    count: '2 min quiz',
  },
  {
    title: 'Learning Paths',
    description: '12-week progressive curriculum. Foundation, Builder, Master. Ship something real every week.',
    href: '/gencreator/learn',
    icon: GraduationCap,
    color: 'teal' as const,
    count: '3 tracks',
  },
  {
    title: 'Creator Toolkit',
    description: 'Curated tools that power the GenCreator workflow. AI, automation, publishing, design.',
    href: '/gencreator/toolkit',
    icon: Wrench,
    color: 'orange' as const,
    count: '13 tools',
  },
  {
    title: 'Community',
    description: 'Build together, ship together. Discord channels, weekly challenges, peer review circles.',
    href: '/gencreator/community',
    icon: Users,
    color: 'indigo' as const,
    count: 'Growing',
  },
  {
    title: 'Shipping Tracker',
    description: 'Log your daily creative output. Build streaks. Track your 3-tier shipping habit with a visual calendar.',
    href: '/gencreator/tracker',
    icon: Flame,
    color: 'orange' as const,
    count: 'Free tool',
  },
  {
    title: 'Showcase',
    description: 'Real projects built with the GenCreator approach. Music, code, products, automations — proof the framework works.',
    href: '/gencreator/showcase',
    icon: Trophy,
    color: 'cyan' as const,
    count: '8 projects',
  },
  {
    title: 'The Manifesto',
    description: 'A short, powerful declaration of what it means to be a GenCreator. Read it. Share it. Live it.',
    href: '/gencreator/manifesto',
    icon: Scroll,
    color: 'rose' as const,
    count: 'One page',
  },
  {
    title: 'Join GenCreator',
    description: 'Free Starter Kit, Pro membership, or Mastery coaching. Choose the path that fits your ambition.',
    href: '/gencreator/join',
    icon: CreditCard,
    color: 'cyan' as const,
    count: '3 tiers',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'The GenCreator Framework',
  description: 'The complete framework for generative creators. 12 principles, 8 handbook chapters, 12 blueprints, 7 soul dimensions, and a manifesto.',
  url: 'https://frankx.ai/gencreator',
  author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: sections.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      url: `https://frankx.ai${s.href}`,
    })),
  },
}

export default function GenCreatorHubPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-[#02030b] to-teal-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.12),transparent_55%)]" />

        {/* FRANK-Omega accent */}
        <div className="pointer-events-none absolute right-4 bottom-8 hidden w-44 opacity-[0.08] lg:block xl:w-56">
          <Image src="/images/mascot/frank-omega-thinking-v1.png" alt="" width={224} height={224} className="object-contain" aria-hidden="true" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 flex flex-col items-center gap-4">
            <Image
              src="/images/mascot/frank-omega-pixar-blue-v1.png"
              alt="FRANK-Omega — GenCreator Guide"
              width={80}
              height={80}
              className="rounded-2xl"
              style={{ boxShadow: '0 0 40px -8px rgba(16,185,129,0.4)' }}
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-emerald-200">
              <Flame className="h-4 w-4" />
              Framework
            </div>
          </div>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">
              The GenCreator Framework
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl md:text-2xl">
            The complete operating system for generative creators.
            <br className="hidden sm:block" />
            Principles. Handbook. Blueprints. Soul. Manifesto.
          </p>

          {/* Terminal teaser */}
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-white/10 bg-[#0d1117] p-6 text-left font-mono text-sm shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="mb-4 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="space-y-2 text-white/70">
              <p><span className="text-emerald-400">$</span> cat ~/soul.md</p>
              <p className="mt-2 text-teal-300"># GenCreator: Frank Riemer</p>
              <p className="text-white/40">## Craft: AI Architecture + Music + Content</p>
              <p className="text-white/40">## Stack: Claude, Suno, n8n, Next.js, Vercel</p>
              <p className="text-white/40">## Principle: Ship daily. Compound relentlessly.</p>
              <p className="mt-2 text-emerald-300/60">
                &gt; 12 principles loaded. 8 chapters ready. 12 blueprints active.
              </p>
            </div>
          </div>

          {/* FRANK-Omega quote */}
          <div className="mx-auto mt-8 max-w-md">
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 px-5 py-3">
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-emerald-500/30">
                <Image src="/images/mascot/frank-omega-chibi-avatar-v1_thumb.jpeg" alt="FRANK-Omega" width={32} height={32} className="h-full w-full object-cover object-top" />
              </div>
              <p className="text-xs italic leading-relaxed text-white/50">
                &ldquo;Every great creator operates from a framework. This is yours.&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/principles">
              Start with Principles
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator/manifesto">
              Read the Manifesto
            </PremiumButton>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 lg:grid-cols-4">
          {hubStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Sections ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Explore the Framework
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/50">
            Five interconnected systems that together form a complete creator operating framework.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <GlowCard key={section.title} color={section.color} href={section.href} className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <section.icon className="h-8 w-8 text-emerald-400" />
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/40">
                    {section.count}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{section.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-400">
                  Explore <ArrowRight className="h-4 w-4" />
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Philosophy Teaser ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            What is a GenCreator?
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-white/60">
            <p>
              A GenCreator is the new breed of creator — someone who wields AI as a creative force multiplier.
              They build systems that compound, ship daily, own their infrastructure,
              and leave artifacts that outlive trends.
            </p>
            <p>
              Part architect. Part artist. Part engineer of the invisible.
              A GenCreator lives at the intersection of <span className="text-emerald-300">human taste</span> and{' '}
              <span className="text-teal-300">machine scale</span> — where one person builds what entire studios once required.
            </p>
          </div>
          <div className="mt-10">
            <PremiumButton variant="primary" size="lg" href="/gencreator/manifesto">
              Read the Full Manifesto
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Start Your GenCreator Journey
          </h2>
          <p className="mt-4 text-lg text-white/50">
            Begin with the principles. Read the handbook. Execute the blueprints. Build your soul.md.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/handbook">
              <BookOpen className="h-5 w-5" />
              Open the Handbook
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator/blueprints">
              <Map className="h-5 w-5" />
              Browse Blueprints
            </PremiumButton>
          </div>
        </div>
      </section>

      <Script id="gencreator-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
