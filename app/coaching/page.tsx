'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Calendar,
  Clock,
  Users,
  Target,
  Zap,
  Brain,
  Heart,
  CheckCircle2,
  Sparkles,
  Mail,
} from 'lucide-react'

// Premium background
function CoachingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-void" />
      <motion.div
        className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)',
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

// What coaching covers
const coachingAreas = [
  {
    icon: Brain,
    title: 'AI Strategy',
    description: 'Identify where AI creates the most value for your specific situation and goals.',
    color: 'cyan',
  },
  {
    icon: Zap,
    title: 'Workflow Design',
    description: 'Build practical AI-assisted workflows that actually fit into your creative process.',
    color: 'emerald',
  },
  {
    icon: Target,
    title: 'Tool Selection',
    description: 'Cut through the noise. Focus on the AI tools that matter for your use case.',
    color: 'violet',
  },
  {
    icon: Heart,
    title: 'Voice Preservation',
    description: 'Use AI to amplify your unique creative voice, not replace it.',
    color: 'pink',
  },
]

// Who this is for
const idealFor = [
  'Creators wanting to integrate AI into their workflow',
  'Founders building AI-powered products or services',
  'Professionals transitioning to AI-focused roles',
  'Teams implementing AI tools for the first time',
]

// Format options being developed
const formats = [
  {
    title: '1:1 Strategy Call',
    description: '60-minute focused session on your specific AI challenges.',
    duration: '60 min',
    status: 'coming',
  },
  {
    title: 'Implementation Sprint',
    description: 'Multi-session engagement to build your AI workflow from scratch.',
    duration: '4 weeks',
    status: 'coming',
  },
  {
    title: 'Team Workshop',
    description: 'Custom workshop for teams adopting AI tools together.',
    duration: 'Half day',
    status: 'coming',
  },
]

const colorMap = {
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
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    icon: 'bg-violet-500/20 text-violet-400',
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    icon: 'bg-pink-500/20 text-pink-400',
  },
}

export default function CoachingPage() {
  return (
    <>
      <CoachingBackground />
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Coaching
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl"
            >
              AI Coaching
              <span className="block text-cyan-400">That Fits Your Reality</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-400"
            >
              Skip the generic AI advice. Work directly with someone who's built 500+ AI songs,
              shipped production systems, and helped creators integrate AI into their real workflows.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-400"
            >
              <Sparkles className="h-4 w-4" />
              Coming Soon
            </motion.div>
          </div>
        </section>

        {/* What We Cover */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                What Coaching Covers
              </h2>
              <p className="text-slate-400 max-w-xl">
                Practical guidance focused on your specific goals and situation.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {coachingAreas.map((area, i) => {
                const colors = colorMap[area.color as keyof typeof colorMap]
                const Icon = area.icon

                return (
                  <motion.div
                    key={area.title}
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
                      {area.title}
                    </h3>
                    <p className="text-sm text-slate-400">{area.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Ideal For
              </h2>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {idealFor.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Formats */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Engagement Formats
              </h2>
              <p className="text-slate-400 max-w-xl">
                Different options for different needs.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
              {formats.map((format, i) => (
                <motion.div
                  key={format.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl border border-white/10 bg-white/[0.02]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-500">{format.duration}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {format.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">{format.description}</p>
                  <span className="text-xs text-amber-400 uppercase tracking-wider">
                    Coming Soon
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Notified */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-10 text-center backdrop-blur-xl"
            >
              <Calendar className="mx-auto mb-6 h-12 w-12 text-cyan-400" />
              <h2 className="mb-4 text-2xl font-bold text-white">
                Interested in Coaching?
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-slate-400">
                Join the waitlist to be notified when coaching opens.
                Newsletter subscribers get priority access.
              </p>
              <Link
                href="/start"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
              >
                <Mail className="h-5 w-5" />
                Join the Waitlist
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
