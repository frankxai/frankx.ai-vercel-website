'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Compass,
  Music,
  BookOpen,
  Sparkles,
  ArrowRight,
  Code,
  Lightbulb,
  Target,
  Zap,
  ChevronRight,
} from 'lucide-react'

// Premium background matching the site aesthetic
function StartBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: '#0a0a0b' }} />

      {/* Static gradient orbs — ambient depth */}
      <div
        className="absolute -left-40 top-20 h-[600px] w-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)', filter: 'blur(128px)' }}
      />
      <div
        className="absolute -right-40 top-1/2 h-[700px] w-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)', filter: 'blur(128px)' }}
      />
      <div
        className="absolute bottom-20 left-1/3 h-[500px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)', filter: 'blur(128px)' }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}

const journeyPaths = [
  {
    id: 'acos',
    icon: Sparkles,
    title: 'Get the Creator OS',
    subtitle: 'ACOS — Free & Open Source',
    description: '75+ skills, 38 agents, 35+ commands. The open-source operating system for Claude Code. Start building in minutes.',
    href: '/acos',
    color: 'emerald',
    stats: 'Free forever',
  },
  {
    id: 'music',
    icon: Music,
    title: 'Create AI Music',
    subtitle: 'The Music Lab',
    description: 'Learn how to create with Suno AI. Prompts, production workflows, and genre mastery from 12,000+ tracks of experience.',
    href: '/music-lab',
    color: 'cyan',
    stats: '12K+ tracks',
  },
  {
    id: 'learn',
    icon: BookOpen,
    title: 'Learn AI Skills',
    subtitle: 'Free Courses & Guides',
    description: 'Curated learning paths from Oracle, Google, and MIT. Hand-picked for creators who want real AI expertise.',
    href: '/students',
    color: 'violet',
    stats: '20+ courses',
  },
  {
    id: 'build',
    icon: Code,
    title: 'Build AI Systems',
    subtitle: 'Architecture Hub',
    description: 'Production-tested blueprints for multi-agent systems, MCP integrations, and enterprise AI architecture.',
    href: '/ai-architecture',
    color: 'amber',
    stats: 'Production patterns',
  },
]

const quickWins = [
  {
    title: 'Read the blog',
    description: 'Deep technical guides on AI workflows and creative systems',
    href: '/blog',
    icon: Lightbulb,
  },
  {
    title: 'Browse the prompt library',
    description: 'Battle-tested prompts for music, writing, coding, and images',
    href: '/prompt-library',
    icon: Target,
  },
  {
    title: 'Join the inner circle',
    description: 'Weekly dispatch — AI architecture insights and early access to new tools',
    href: '/newsletter',
    icon: Zap,
  },
]

export default function StartPage() {
  return (
    <>
      <StartBackground />
      <main id="main" className="relative min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
                Free Access
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Everything starts here.
              <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
                Pick your path.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-lg leading-relaxed text-white/40 sm:text-xl"
            >
              Free tools, guides, and systems built by an AI architect who ships.
              Go deep when you&apos;re ready — premium access unlocks everything.
            </motion.p>
          </div>
        </section>

        {/* Journey Paths Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {journeyPaths.map((path, index) => {
                const Icon = path.icon
                const colorMap = {
                  emerald: {
                    bg: 'bg-white/[0.03]',
                    border: 'border-white/[0.08] hover:border-emerald-500/30',
                    icon: 'bg-emerald-500/10 text-emerald-400',
                    text: 'text-emerald-400',
                    glow: 'group-hover:shadow-lg group-hover:shadow-emerald-500/10',
                  },
                  cyan: {
                    bg: 'bg-white/[0.03]',
                    border: 'border-white/[0.08] hover:border-cyan-500/30',
                    icon: 'bg-cyan-500/10 text-cyan-400',
                    text: 'text-cyan-400',
                    glow: 'group-hover:shadow-lg group-hover:shadow-cyan-500/10',
                  },
                  violet: {
                    bg: 'bg-white/[0.03]',
                    border: 'border-white/[0.08] hover:border-violet-500/30',
                    icon: 'bg-violet-500/10 text-violet-400',
                    text: 'text-violet-400',
                    glow: 'group-hover:shadow-lg group-hover:shadow-violet-500/10',
                  },
                  amber: {
                    bg: 'bg-white/[0.03]',
                    border: 'border-white/[0.08] hover:border-amber-500/30',
                    icon: 'bg-amber-500/10 text-amber-400',
                    text: 'text-amber-400',
                    glow: 'group-hover:shadow-lg group-hover:shadow-amber-500/10',
                  },
                }
                const colors = colorMap[path.color as keyof typeof colorMap]

                return (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Link href={path.href} className="group block h-full">
                      <div
                        className={`relative h-full overflow-hidden rounded-3xl border ${colors.border} ${colors.bg} p-8 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 ${colors.glow}`}
                      >
                        {/* Icon and Stats Row */}
                        <div className="mb-6 flex items-start justify-between">
                          <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.icon}`}>
                            <Icon className="h-7 w-7" />
                          </div>
                          <span className={`text-sm font-medium ${colors.text}`}>
                            {path.stats}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                          <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                            {path.subtitle}
                          </p>
                          <h3 className="text-2xl font-bold text-white group-hover:text-white/90">
                            {path.title}
                          </h3>
                          <p className="leading-relaxed text-white/40">
                            {path.description}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div className="mt-6 flex items-center gap-2 text-white/40 transition-colors group-hover:text-white">
                          <span className="text-sm font-medium">Get started free</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-white">More to explore</h2>
              <p className="mt-2 text-white/40">All free. All worth your time.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              {quickWins.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/40 transition-colors group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{item.title}</h3>
                          <p className="text-sm text-white/40">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-white/40" />
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* About CTA */}
        <section className="py-16 pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-10 backdrop-blur-xl"
            >
              {/* Decorative gradient */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-3xl" />

              <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                    <Sparkles className="h-3 w-3" />
                    Premium
                  </div>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    Ready to go deeper?
                  </h2>
                  <p className="mt-3 text-white/40">
                    Premium coaching, direct support, and advanced systems — available by application
                    when you&apos;ve outgrown the free tools.
                  </p>
                </div>
                <Link
                  href="/coaching"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30"
                >
                  Apply for coaching
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
