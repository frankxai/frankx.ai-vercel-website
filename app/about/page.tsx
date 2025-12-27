'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  User,
  Briefcase,
  Music,
  Code,
  Brain,
  ArrowRight,
  Linkedin,
  Github,
  Award,
  Zap,
  Heart,
} from 'lucide-react'

// Premium background
function AboutBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute -left-60 top-20 h-[600px] w-[600px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.35, 0.25],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 h-[400px] w-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

const journey = [
  {
    icon: Briefcase,
    title: 'Enterprise AI',
    description:
      'Senior AI Architect at Oracle\'s Center of Excellence. I build AI systems for global organizations that work in the real world.',
    color: 'emerald',
  },
  {
    icon: Music,
    title: 'Prolific Creator',
    description:
      'Thousands of songs created with Suno AI. Not just experimenting — exploring what\'s possible with AI music.',
    color: 'cyan',
  },
  {
    icon: Code,
    title: 'Open Building',
    description:
      'Everything I learn goes into this hub. Prompts, workflows, frameworks — shared openly so you can use them too.',
    color: 'violet',
  },
]

const principles = [
  {
    icon: Brain,
    title: 'Goal-Aligned AI',
    description: 'AI should amplify your unique voice. Every workflow starts with your goals, not a template.',
  },
  {
    icon: Zap,
    title: 'Practical Over Hype',
    description: 'Tools you can use today. No jargon, no gatekeeping — just resources that help you ship.',
  },
  {
    icon: Heart,
    title: 'Open Development',
    description: 'See how everything is built. Every framework here is transparent and adaptable.',
  },
]

const colorMap = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: 'bg-emerald-500/20 text-emerald-400',
    text: 'text-emerald-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    icon: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    icon: 'bg-violet-500/20 text-violet-400',
    text: 'text-violet-400',
  },
}

export default function AboutPage() {
  return (
    <>
      <AboutBackground />
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
                <User className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                About
              </span>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-[1.5fr,1fr] lg:items-start">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
                >
                  Building AI that
                  <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
                    actually works.
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-4 text-lg leading-relaxed text-slate-400"
                >
                  <p>
                    By day, I'm a Senior AI Architect at Oracle's Center of Excellence — designing
                    enterprise AI systems for some of the world's largest organizations.
                  </p>
                  <p>
                    After hours, I create music with Suno AI—thousands of songs across genres.
                    Not as a hobby, but as a creative practice that informs everything I build.
                  </p>
                  <p>
                    This hub is where both worlds meet. Everything I learn from enterprise
                    architecture and creative experimentation, packaged into resources you can actually use.
                  </p>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8 flex gap-4"
                >
                  <a
                    href="https://linkedin.com/in/frankxai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/frankxai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </motion.div>
              </div>

              {/* Profile Image Area */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-violet-500/10">
                  {/* Placeholder for profile image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/5">
                        <User className="h-12 w-12 text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-500">Frank</p>
                      <p className="text-xs text-slate-600">AI Architect & Creator</p>
                    </div>
                  </div>
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white sm:text-3xl">The journey</h2>
              <p className="mt-2 text-slate-400">How I got here</p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {journey.map((item, index) => {
                const Icon = item.icon
                const colors = colorMap[item.color as keyof typeof colorMap]

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div
                      className={`h-full rounded-2xl border ${colors.border} ${colors.bg} p-8 backdrop-blur-sm`}
                    >
                      <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${colors.icon}`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                      <p className="leading-relaxed text-slate-400">{item.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white sm:text-3xl">How I work</h2>
              <p className="mt-2 text-slate-400">Principles that guide everything</p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {principles.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="h-full rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/[0.04]">
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-slate-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-3 text-lg font-bold text-white">{item.title}</h3>
                      <p className="leading-relaxed text-slate-400">{item.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Achievements CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/40 p-10 backdrop-blur-xl"
            >
              {/* Decorative gradient */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-3xl" />

              <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white sm:text-2xl">
                      See what I've built
                    </h2>
                    <p className="mt-2 text-slate-400">
                      Certifications, milestones, and the work behind this hub.
                    </p>
                  </div>
                </div>
                <Link
                  href="/achievements"
                  className="group flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
                >
                  View Achievements
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to explore?</h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Start with the hub overview, or dive straight into the music lab, learning paths, or prompt library.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/start"
                  className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-6 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Start Here
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/music-lab"
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  Music Lab
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
