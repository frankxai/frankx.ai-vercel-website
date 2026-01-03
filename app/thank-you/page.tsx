'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  BookOpen,
  Sparkles,
  Music,
  MessageSquare,
} from 'lucide-react'

// Premium dark background
function ThankYouBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <motion.div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// Next steps for subscribed users
const nextSteps = [
  {
    icon: BookOpen,
    title: 'Read the Modern Guide',
    description: 'Start with our flagship guide on building with AI in 2025.',
    href: '/guides/modern-guide',
    color: 'emerald',
  },
  {
    icon: Music,
    title: 'Explore the Music Lab',
    description: 'See how AI transforms music creation with Suno prompts.',
    href: '/music-lab',
    color: 'pink',
  },
  {
    icon: Sparkles,
    title: 'Browse Resources',
    description: 'Curated tools, courses, and frameworks for creators.',
    href: '/resources',
    color: 'cyan',
  },
]

const colorMap = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'bg-emerald-500/20 text-emerald-400',
    text: 'text-emerald-400',
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20 hover:border-pink-500/40',
    icon: 'bg-pink-500/20 text-pink-400',
    text: 'text-pink-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
  },
}

export default function ThankYouPage() {
  return (
    <>
      <ThankYouBackground />
      <main className="relative min-h-screen flex items-center">
        <div className="w-full py-20">
          <div className="mx-auto max-w-3xl px-6">
            {/* Success indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <div className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-emerald-400"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Main message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
                You're In
              </h1>
              <p className="text-xl text-slate-400 mb-6">
                Welcome to the FrankX community.
              </p>
              <div className="flex items-center justify-center gap-2 text-slate-500">
                <Mail className="h-4 w-4" />
                <span className="text-sm">
                  Check your inbox for practical, hype-free AI insights.
                </span>
              </div>
            </motion.div>

            {/* What to expect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12 p-6 rounded-2xl border border-white/10 bg-white/[0.02]"
            >
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-emerald-400" />
                What you'll receive
              </h2>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Weekly insights on AI tools that actually matter for creators</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>New prompts and workflows tested in real projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Early access to guides, templates, and product launches</span>
                </li>
              </ul>
            </motion.div>

            {/* Next steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-center text-sm font-medium uppercase tracking-[0.2em] text-slate-500 mb-6">
                While you're here
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {nextSteps.map((step, i) => {
                  const colors = colorMap[step.color as keyof typeof colorMap]
                  const Icon = step.icon

                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    >
                      <Link
                        href={step.href}
                        className={`block h-full p-5 rounded-xl border ${colors.border} ${colors.bg} transition-all hover:-translate-y-1`}
                      >
                        <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${colors.icon}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-white mb-1 text-sm">
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-500">{step.description}</p>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Back to home */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to homepage
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
