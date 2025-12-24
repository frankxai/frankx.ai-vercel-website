'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  ArrowRight,
  BookOpen,
  Target,
  Award,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react'

// Premium background
function StudentsBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute -left-40 top-20 h-[600px] w-[600px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.35, 0.25],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-60 top-1/2 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-40 left-1/3 h-[400px] w-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
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

// Learning paths data
const learningPaths = [
  {
    id: 'oracle-ai',
    title: 'Oracle AI Fundamentals',
    provider: 'Oracle',
    duration: '8-12 hours',
    level: 'Beginner',
    description:
      'Official Oracle certification path covering AI fundamentals, machine learning basics, and Oracle Cloud AI services.',
    url: 'https://mylearn.oracle.com/ou/learning-path/oracle-ai-foundations/122395',
    highlights: ['Free certification', 'Cloud AI services', 'Enterprise-ready skills'],
    color: 'cyan',
  },
  {
    id: 'google-ai',
    title: 'Google AI Essentials',
    provider: 'Google',
    duration: '10 hours',
    level: 'Beginner',
    description:
      'Google\'s foundational AI course covering practical applications of AI, prompt engineering, and responsible AI use.',
    url: 'https://grow.google/ai-essentials',
    highlights: ['Hands-on projects', 'Prompt engineering', 'Career-ready certificate'],
    color: 'emerald',
  },
  {
    id: 'mit-intro',
    title: 'Introduction to Deep Learning',
    provider: 'MIT',
    duration: '20+ hours',
    level: 'Intermediate',
    description:
      'MIT\'s legendary deep learning course covering neural networks, computer vision, NLP, and generative AI.',
    url: 'http://introtodeeplearning.com/',
    highlights: ['World-class instruction', 'Deep technical foundations', 'Research-grade content'],
    color: 'violet',
  },
  {
    id: 'anthropic-prompt',
    title: 'Prompt Engineering Guide',
    provider: 'Anthropic',
    duration: '3-5 hours',
    level: 'Beginner',
    description:
      'Learn to write effective prompts for Claude and other LLMs. Essential skills for working with AI.',
    url: 'https://docs.anthropic.com/claude/docs/prompt-engineering',
    highlights: ['Official Claude docs', 'Best practices', 'Real examples'],
    color: 'amber',
  },
]

const colorMap = {
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
    badge: 'bg-cyan-500/20 text-cyan-400',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'bg-emerald-500/20 text-emerald-400',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-400',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    icon: 'bg-violet-500/20 text-violet-400',
    text: 'text-violet-400',
    badge: 'bg-violet-500/20 text-violet-400',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    icon: 'bg-amber-500/20 text-amber-400',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-400',
  },
}

export default function StudentsPage() {
  return (
    <>
      <StudentsBackground />
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Learning Paths
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Learn AI the right way.
              <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400">
                Free, world-class courses.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              I've curated the best free AI courses from Oracle, Google, MIT, and more.
              No paywalls, no fluff — just high-quality learning from top institutions.
            </motion.p>
          </div>
        </section>

        {/* Ikigai Workshop Feature */}
        <section className="py-8">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/students/ikigai" className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-slate-900/50 to-cyan-500/10 p-8 backdrop-blur-sm transition-all duration-500 hover:border-violet-500/40 sm:p-10">
                  {/* Decorative gradient */}
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-3xl" />

                  <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                          <Target className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="text-xs font-medium uppercase tracking-[0.15em] text-violet-400">
                            Featured Workshop
                          </span>
                          <h2 className="text-2xl font-bold text-white">Ikigai Workshop</h2>
                        </div>
                      </div>
                      <p className="text-slate-400">
                        Find your purpose at the intersection of passion, skill, impact, and income.
                        Build your 30/60/90 plan and portfolio strategy.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                          Self-paced
                        </span>
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                          2-3 hours
                        </span>
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                          Privacy-first
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 transition-colors group-hover:text-white">
                      <span className="font-medium">Start workshop</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Learning Paths Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Curated courses</h2>
              <p className="mt-2 text-slate-400">Hand-picked from top institutions</p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {learningPaths.map((path, index) => {
                const colors = colorMap[path.color as keyof typeof colorMap]

                return (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <a
                      href={path.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full"
                    >
                      <div
                        className={`relative flex h-full flex-col rounded-2xl border ${colors.border} ${colors.bg} p-8 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-1`}
                      >
                        {/* Header */}
                        <div className="mb-6 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon}`}>
                              <BookOpen className="h-6 w-6" />
                            </div>
                            <div>
                              <span className={`text-xs font-medium ${colors.text}`}>
                                {path.provider}
                              </span>
                              <h3 className="text-xl font-bold text-white">{path.title}</h3>
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-slate-500 transition-colors group-hover:text-white" />
                        </div>

                        {/* Description */}
                        <p className="mb-6 flex-1 leading-relaxed text-slate-400">{path.description}</p>

                        {/* Highlights */}
                        <ul className="mb-6 space-y-2">
                          {path.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex items-center gap-2 text-sm text-slate-300"
                            >
                              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
                              {highlight}
                            </li>
                          ))}
                        </ul>

                        {/* Footer */}
                        <div className="flex items-center justify-between border-t border-white/5 pt-6">
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {path.duration}
                            </span>
                            <span className={`rounded-full px-2 py-0.5 text-xs ${colors.badge}`}>
                              {path.level}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-400 transition-colors group-hover:text-white">
                            <span className="text-sm font-medium">Start</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                )
              })}
            </div>
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
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/40 p-10 backdrop-blur-xl"
            >
              {/* Decorative gradient */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 blur-3xl" />

              <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white sm:text-2xl">
                      Track your progress
                    </h2>
                    <p className="mt-2 text-slate-400">
                      See my certifications and the paths I've completed.
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
      </main>
    </>
  )
}
