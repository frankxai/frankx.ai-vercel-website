'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Music,
  BookOpen,
  Sparkles,
  ArrowRight,
  Code,
  Lightbulb,
  Target,
  Zap,
  ChevronRight,
  Terminal,
} from 'lucide-react'
import FrankOmega from '@/components/FrankOmega'
import { GlowCard } from '@/components/ui/glow-card'
import type { GlowColor } from '@/components/ui/glow-card'

const journeyPaths = [
  {
    id: 'acos',
    icon: Terminal,
    title: 'Get the Creator OS',
    subtitle: 'ACOS — Free & Open Source',
    description: '75+ skills, 38 agents, 35+ commands. The open-source operating system for Claude Code.',
    href: '/acos',
    color: 'emerald' as GlowColor,
    image: '/images/acos/acos-architecture.png',
    stats: 'Free forever',
  },
  {
    id: 'music',
    icon: Music,
    title: 'Create AI Music',
    subtitle: 'The Music Lab',
    description: 'Prompts, production workflows, and genre mastery from 12,000+ songs of experience.',
    href: '/music-lab',
    color: 'cyan' as GlowColor,
    image: '/images/acos/creation-pipeline.png',
    stats: '12K+ songs',
  },
  {
    id: 'learn',
    icon: BookOpen,
    title: 'Learn AI Skills',
    subtitle: 'Free Courses & Guides',
    description: 'Curated learning paths from Oracle, Google, and MIT. Hand-picked for creators who want real AI expertise.',
    href: '/students',
    color: 'violet' as GlowColor,
    image: '/images/acos/acos-smart-router.png',
    stats: '20+ courses',
  },
  {
    id: 'build',
    icon: Code,
    title: 'Build AI Systems',
    subtitle: 'Architecture Hub',
    description: 'Production-tested blueprints for multi-agent systems, MCP integrations, and enterprise AI.',
    href: '/ai-architecture',
    color: 'amber' as GlowColor,
    image: '/images/acos/acos-self-learning.png',
    stats: 'Production patterns',
  },
]

const quickWins = [
  { title: 'Read the blog', description: 'Deep technical guides on AI workflows and creative systems', href: '/blog', icon: Lightbulb },
  { title: 'Browse the prompt library', description: 'Battle-tested prompts for music, writing, coding, and images', href: '/prompt-library', icon: Target },
  { title: 'Join the newsletter', description: 'Weekly dispatch — AI architecture insights and early access to tools', href: '/newsletter', icon: Zap },
]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function StartPage() {
  return (
    <div className="min-h-screen bg-[#050507]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-40 top-20 h-[600px] w-[600px] rounded-full bg-emerald-600/[0.06] blur-[120px]" />
        <div className="absolute -right-40 top-1/2 h-[700px] w-[700px] rounded-full bg-cyan-600/[0.04] blur-[120px]" />
        <div className="absolute bottom-20 left-1/3 h-[500px] w-[500px] rounded-full bg-violet-600/[0.03] blur-[100px]" />
      </div>

      <motion.main
        className="relative"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Hero */}
        <section className="pt-28 pb-12">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div variants={fadeUp} className="mb-8 flex items-center gap-4">
              <FrankOmega variant="chibi-avatar" size="sm" glow rounded className="border-2 border-emerald-500/20" />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
                Free Access
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mb-6 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Everything starts here.
              <span className="mt-2 block bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Pick your path.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-lg leading-relaxed text-white/40 sm:text-xl"
            >
              Free tools, guides, and systems built by an AI architect who ships.
            </motion.p>
          </div>
        </section>

        {/* Journey Paths — GlowCard grid */}
        <section className="py-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-5 md:grid-cols-2">
              {journeyPaths.map((path) => {
                const Icon = path.icon
                return (
                  <motion.div key={path.id} variants={fadeUp}>
                    <GlowCard color={path.color} href={path.href} className="!rounded-3xl">
                      <div className="relative overflow-hidden p-7">
                        {/* Background image */}
                        {path.image && (
                          <div className="absolute inset-0">
                            <Image
                              src={path.image}
                              alt=""
                              fill
                              className="object-cover opacity-[0.08]"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        )}

                        <div className="relative">
                          <div className="mb-5 flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06]">
                              <Icon className="h-6 w-6 text-white/60" />
                            </div>
                            <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/50">
                              {path.stats}
                            </span>
                          </div>

                          <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.15em] text-white/30">
                            {path.subtitle}
                          </p>
                          <h3 className="mb-2 text-xl font-bold text-white">
                            {path.title}
                          </h3>
                          <p className="mb-5 text-sm leading-relaxed text-white/35">
                            {path.description}
                          </p>

                          <div className="flex items-center gap-2 text-sm font-medium text-white/40">
                            Get started free
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-14">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div variants={fadeUp} className="mb-8">
              <h2 className="text-2xl font-bold text-white">More to explore</h2>
              <p className="mt-2 text-white/30">All free. All worth your time.</p>
            </motion.div>

            <div className="space-y-3">
              {quickWins.map((item) => {
                const Icon = item.icon
                return (
                  <motion.div key={item.title} variants={fadeUp}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] text-white/30 group-hover:text-white/60 transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{item.title}</h3>
                          <p className="text-xs text-white/30">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/20 group-hover:translate-x-0.5 group-hover:text-white/40 transition-all" />
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Coaching CTA */}
        <section className="py-14 pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div variants={fadeUp}>
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-10">
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/15 to-cyan-500/15 blur-3xl" />

                <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-5">
                    <FrankOmega variant="portrait" size="sm" glow rounded className="shrink-0 border-2 border-violet-500/20" />
                    <div className="max-w-lg">
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
                        <Sparkles className="h-3 w-3" />
                        Premium
                      </div>
                      <h2 className="text-2xl font-bold text-white sm:text-3xl">
                        Ready to go deeper?
                      </h2>
                      <p className="mt-2 text-sm text-white/35">
                        1-on-1 coaching, architecture reviews, and direct access to an AI architect who ships.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/coaching"
                    className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30"
                  >
                    Apply for coaching
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.main>
    </div>
  )
}
