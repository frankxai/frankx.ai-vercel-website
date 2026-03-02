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
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'

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
    id: 'music',
    icon: Music,
    title: 'Create AI Music',
    subtitle: 'The Music Lab',
    description: 'Learn how I create music with Suno AI. Prompts, workflows, and the creative process.',
    href: '/music-lab',
    color: 'emerald',
    stats: '12K+ songs',
  },
  {
    id: 'learn',
    icon: BookOpen,
    title: 'Learn AI Skills',
    subtitle: 'Curated Courses',
    description: 'Free courses from Oracle, Google, and MIT. Hand-picked learning paths for AI mastery.',
    href: '/students',
    color: 'cyan',
    stats: '20+ courses',
  },
  {
    id: 'prompts',
    icon: Sparkles,
    title: 'Use My Prompts',
    subtitle: 'Prompt Library',
    description: 'Battle-tested prompts I actually use daily. Copy them, adapt them, make them yours.',
    href: '/prompt-library',
    color: 'violet',
    stats: '22 prompts',
  },
  {
    id: 'build',
    icon: Code,
    title: 'Build with AI',
    subtitle: 'Architecture Hub',
    description: 'Blueprints, BYOK prototypes, and production templates for AI systems.',
    href: '/ai-architecture',
    color: 'amber',
    stats: 'Blueprints & Templates',
  },
]

const quickWins = [
  {
    title: 'Browse the blog',
    description: 'Deep dives on AI workflows and creative systems',
    href: '/blog',
    icon: Lightbulb,
  },
  {
    title: 'See my achievements',
    description: 'Certifications, milestones, and what I\'ve built',
    href: '/achievements',
    icon: Target,
  },
  {
    title: 'Get the newsletter',
    description: 'Weekly insights on AI music and creative tech',
    href: '/creation-chronicles',
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
                Your Starting Point
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Welcome to the hub.
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
              AI architect by day. Music creator by night.
              Everything I learn and build—shared openly.
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
                const iconColorMap: Record<string, string> = {
                  emerald: 'bg-emerald-500/10 text-emerald-400',
                  cyan: 'bg-cyan-500/10 text-cyan-400',
                  violet: 'bg-violet-500/10 text-violet-400',
                  amber: 'bg-amber-500/10 text-amber-400',
                }
                const textColorMap: Record<string, string> = {
                  emerald: 'text-emerald-400',
                  cyan: 'text-cyan-400',
                  violet: 'text-violet-400',
                  amber: 'text-amber-400',
                }

                return (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <GlowCard href={path.href} color={path.color as GlowColor} className="p-8 h-full">
                      {/* Icon and Stats Row */}
                      <div className="mb-6 flex items-start justify-between">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconColorMap[path.color] ?? ''}`}>
                          <Icon className="h-7 w-7" />
                        </div>
                        <span className={`text-sm font-medium ${textColorMap[path.color] ?? ''}`}>
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
                        <span className="text-sm font-medium">Explore</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </GlowCard>
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
              <h2 className="text-2xl font-bold text-white">Quick links</h2>
              <p className="mt-2 text-white/40">More ways to explore</p>
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
                    <GlowCard href={item.href} color="emerald" className="p-5">
                      <div className="flex items-center justify-between">
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
                      </div>
                    </GlowCard>
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
            >
              <GlowCard color="emerald" className="p-10">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    Want the full story?
                  </h2>
                  <p className="mt-3 text-white/40">
                    Learn about my journey from enterprise architecture to AI music creation,
                    and why I built this hub to share everything openly.
                  </p>
                </div>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30"
                >
                  About me
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              </GlowCard>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
