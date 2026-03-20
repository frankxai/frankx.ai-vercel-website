'use client'

import { useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import {
  ArrowRight,
  Music,
  Code2,
  BookOpen,
  Layers,
  Sparkles,
  ExternalLink,
  Bot,
  Palette,
  Trophy,
} from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'
import type { GlowColor } from '@/components/ui/glow-card'

interface ShowcaseItem {
  title: string
  description: string
  category: string
  icon: typeof Music
  color: GlowColor
  stats: string
  link?: string
  linkLabel?: string
}

const showcaseItems: ShowcaseItem[] = [
  {
    title: '12K+ AI Songs',
    description:
      'Full-length tracks across 30+ genres using Suno AI. From orchestral cinema to tech house, every song prompt-engineered for commercial quality.',
    category: 'Music',
    icon: Music,
    color: 'cyan',
    stats: '12,000+ songs · 30+ genres · 65 self-hosted',
    link: '/music-lab',
    linkLabel: 'Visit Music Lab',
  },
  {
    title: 'frankx.ai — This Site',
    description:
      'Built entirely with Claude Code + Next.js 16 on Vercel. 50+ pages, glassmorphic design system, MDX blog, email automation, product delivery.',
    category: 'Code',
    icon: Code2,
    color: 'emerald',
    stats: '50+ pages · Next.js 16 · Vercel Edge',
    link: '/',
    linkLabel: 'You are here',
  },
  {
    title: 'GenCreator Framework',
    description:
      '12 principles, 8 handbook chapters, 12 blueprints, 7 soul dimensions, interactive assessment, learning paths — a complete creator OS.',
    category: 'Framework',
    icon: Layers,
    color: 'amber',
    stats: '12 pages · Interactive tools · Free access',
    link: '/gencreator',
    linkLabel: 'Explore Framework',
  },
  {
    title: 'ACOS — Agentic Creator OS',
    description:
      'Multi-agent orchestration system for Claude Code. Hooks, quality gates, circuit breakers, trajectory learning, and skill routing.',
    category: 'AI System',
    icon: Bot,
    color: 'violet',
    stats: 'v10.2 · 500+ skills · Production-grade',
    link: '/acos',
    linkLabel: 'Learn about ACOS',
  },
  {
    title: 'n8n Automation Empire',
    description:
      '9 active workflows: morning briefs, content atomizer, newsletter engine, mega orchestrator, music sync, dev briefings — all self-hosted on Railway.',
    category: 'Automation',
    icon: Sparkles,
    color: 'teal',
    stats: '9 workflows · Railway hosted · Webhook-driven',
  },
  {
    title: 'Arcanea World',
    description:
      'A complete creative civilization with lore, 5 Eldrian characters, a world-state JSON system, and multi-agent storytelling across X and Discord.',
    category: 'World-Building',
    icon: Palette,
    color: 'rose',
    stats: '5 Eldrians · World-state system · Lore engine',
    link: '/arcanea',
    linkLabel: 'Enter Arcanea',
  },
  {
    title: 'Digital Product Line',
    description:
      'Soulbook, 5 Suno Prompts, Vibe OS, GenCreator OS — all with Vercel Blob delivery, email gating, and automated fulfillment via Resend.',
    category: 'Products',
    icon: BookOpen,
    color: 'indigo',
    stats: '5 products · PDF delivery · Email automation',
    link: '/products',
    linkLabel: 'Browse Products',
  },
  {
    title: 'FRANK-\u03A9 Character System',
    description:
      '10 AI-generated character variants using Gemini 3 Pro Image. Pixar, chibi, hero, chill, portrait — a full mascot system for brand consistency.',
    category: 'Visual',
    icon: Trophy,
    color: 'orange',
    stats: '10 variants · 4K Gemini 3 Pro · Full brand kit',
    link: '/frankx',
    linkLabel: 'Meet FRANK-\u03A9',
  },
]

const categories = ['All', ...Array.from(new Set(showcaseItems.map((i) => i.category)))]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'GenCreator Showcase',
  description: 'Real projects built by GenCreators using the GenCreator Framework.',
  url: 'https://frankx.ai/gencreator/showcase',
  author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
}

export default function ShowcasePage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const filtered =
    activeCategory === 'All'
      ? showcaseItems
      : showcaseItems.filter((i) => i.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-[#02030b] to-emerald-950/15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200">
            <Trophy className="h-4 w-4" />
            Showcase
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-emerald-100 bg-clip-text text-transparent">
              What GenCreators Build
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl">
            Real projects. Real systems. Real output.
            <br className="hidden sm:block" />
            This is what happens when you ship daily with AI.
          </p>
        </div>
      </section>

      {/* Proof bar */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 px-6 text-center text-sm text-white/40">
          <div>
            <span className="text-2xl font-bold text-white">12K+</span>
            <p className="text-xs">AI Songs</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <span className="text-2xl font-bold text-white">50+</span>
            <p className="text-xs">Website Pages</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <span className="text-2xl font-bold text-white">9</span>
            <p className="text-xs">Automations</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <span className="text-2xl font-bold text-white">500+</span>
            <p className="text-xs">Agent Skills</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <span className="text-2xl font-bold text-white">5</span>
            <p className="text-xs">Products Live</p>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-cyan-500/15 text-cyan-300'
                    : 'text-white/50 hover:bg-white/[0.05] hover:text-white/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((item) => (
              <GlowCard key={item.title} color={item.color} className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <item.icon className="h-7 w-7 text-white/60" />
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] text-white/40">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
                <p className="mt-3 text-xs text-white/30">{item.stats}</p>
                {item.link && (
                  <Link
                    href={item.link}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300"
                  >
                    {item.linkLabel} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.08] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Build your own showcase.
          </h2>
          <p className="mt-4 text-white/50">
            Start with the framework. Ship daily. Your portfolio builds itself.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/principles">
              Start with Principles
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator/join">
              Join GenCreator
            </PremiumButton>
          </div>
        </div>
      </section>

      <Script id="showcase-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
