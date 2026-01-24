'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Users,
  Heart,
  Sparkles,
  Mail,
  Music,
  BookOpen,
  Code2,
} from 'lucide-react'

// Premium background
function TestimonialsBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <motion.div
        className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          y: [0, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// Types of stories we'll feature
const storyTypes = [
  {
    icon: Music,
    title: 'Music Creators',
    description: 'Creators using Suno AI and other tools to produce original music.',
    color: 'pink',
  },
  {
    icon: BookOpen,
    title: 'Writers & Content Creators',
    description: 'Writers who have integrated AI into their creative process.',
    color: 'violet',
  },
  {
    icon: Code2,
    title: 'Developers & Builders',
    description: 'Developers building with AI tools and agentic systems.',
    color: 'cyan',
  },
  {
    icon: Users,
    title: 'Career Changers',
    description: 'Professionals who have pivoted to AI-focused roles.',
    color: 'emerald',
  },
]

const colorMap = {
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    icon: 'bg-pink-500/20 text-pink-400',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    icon: 'bg-violet-500/20 text-violet-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    icon: 'bg-cyan-500/20 text-cyan-400',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: 'bg-emerald-500/20 text-emerald-400',
  },
}

export default function TestimonialsPage() {
  return (
    <>
      <TestimonialsBackground />
      <main className="relative min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                <Heart className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Success Stories
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl"
            >
              Real Stories from
              <span className="block text-violet-400">Real Creators</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-400"
            >
              This page will feature genuine stories from creators, students, and developers
              who've used FrankX resources to level up their AI skills.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-400"
            >
              <Sparkles className="h-4 w-4" />
              Collecting Stories
            </motion.div>
          </div>
        </section>

        {/* Story Types */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Stories We're Looking For
              </h2>
              <p className="text-slate-400 max-w-xl">
                If you've used FrankX resources to achieve something meaningful,
                we'd love to hear from you.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {storyTypes.map((type, i) => {
                const colors = colorMap[type.color as keyof typeof colorMap]
                const Icon = type.icon

                return (
                  <motion.div
                    key={type.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-2xl border ${colors.border} ${colors.bg}`}
                  >
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {type.title}
                    </h3>
                    <p className="text-sm text-slate-400">{type.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Share Your Story CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-10 text-center backdrop-blur-xl"
            >
              <Users className="mx-auto mb-6 h-12 w-12 text-violet-400" />
              <h2 className="mb-4 text-2xl font-bold text-white">
                Share Your Story
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-slate-400">
                Have you used FrankX prompts, guides, or resources to create something or level up your skills?
                I'd love to feature your story here.
              </p>
              <a
                href="mailto:frank@frankx.ai?subject=Success%20Story"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
              >
                <Mail className="h-5 w-5" />
                Share Your Story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Meanwhile CTA */}
        <section className="py-12 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-slate-400 mb-6">
                While we collect stories, explore the resources that creators are using.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/prompt-library"
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  Prompt Library
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/guides"
                  className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  Guides
                </Link>
                <Link
                  href="/music-lab"
                  className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  Music Lab
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
