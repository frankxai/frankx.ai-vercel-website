'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Music,
  FileText,
  CheckCircle2,
  Sparkles,
  Zap,
  Star,
  Gift,
} from 'lucide-react'

function PlaybookBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <motion.div
        className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1], x: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
        }}
        animate={{ scale: [1.1, 1, 1.1], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

const playbooks = [
  {
    id: 'suno',
    title: 'The Suno AI Prompt Playbook',
    description: 'Master AI music generation with structured prompts, genre templates, and production techniques.',
    icon: Music,
    color: 'emerald',
    pages: '15+',
    value: '$47',
    includes: [
      'Genre-specific prompt templates',
      'Structure tags reference guide',
      'Commercial licensing guide',
      'Daily creation workflow',
    ],
    downloadUrl: '/guides/suno-prompt-playbook',
  },
  {
    id: 'prompts',
    title: 'Top 50 AI Prompts Collection',
    description: 'Battle-tested prompts for ChatGPT, Claude, Midjourney, and Suno across all creative domains.',
    icon: FileText,
    color: 'cyan',
    pages: '20+',
    value: '$37',
    includes: [
      'Writing & content prompts',
      'Coding & development prompts',
      'Image generation prompts',
      'Business & productivity prompts',
    ],
    downloadUrl: '/guides/top-50-ai-prompts',
  },
  {
    id: 'claude',
    title: 'Claude Code Quick Start',
    description: 'Get productive with Claude Code in 30 minutes. CLAUDE.md setup, workflows, and best practices.',
    icon: Zap,
    color: 'violet',
    pages: '12+',
    value: '$27',
    includes: [
      'CLAUDE.md configuration guide',
      'Multi-file editing patterns',
      'Agent orchestration basics',
      'Productivity shortcuts',
    ],
    downloadUrl: '/guides/claude-code-getting-started',
  },
]

const colorMap = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30 hover:border-emerald-500/50',
    icon: 'bg-emerald-500/20 text-emerald-400',
    button: 'bg-emerald-600 hover:bg-emerald-500',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30 hover:border-cyan-500/50',
    icon: 'bg-cyan-500/20 text-cyan-400',
    button: 'bg-cyan-600 hover:bg-cyan-500',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30 hover:border-violet-500/50',
    icon: 'bg-violet-500/20 text-violet-400',
    button: 'bg-violet-600 hover:bg-violet-500',
  },
}

export default function FreePlaybookPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [unlockedResources, setUnlockedResources] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      const formData = new FormData()
      formData.append('email', email)

      const res = await fetch('/api/newsletter', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        setStatus('success')
        setUnlockedResources(true)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PlaybookBackground />
      <main className="relative min-h-screen pt-28 pb-20">
        <div className="mx-auto max-w-5xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
              <Gift className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Free Resources</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Get the complete
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                AI Creator Toolkit
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-slate-400 mb-8">
              Three battle-tested playbooks from 500+ AI songs and years of Claude Code mastery.
              Normally <span className="text-white font-semibold line-through">$111</span> total value.
              <span className="text-emerald-400 font-semibold"> Free today.</span>
            </p>

            {/* Email Capture */}
            {!unlockedResources ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mx-auto max-w-md"
              >
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-slate-500 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
                    disabled={status === 'loading'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-6 py-4 font-semibold text-white transition-all hover:from-emerald-500 hover:to-cyan-500 disabled:opacity-50"
                  >
                    {status === 'loading' ? '...' : 'Unlock All'}
                  </button>
                </form>
                {status === 'error' && (
                  <p className="mt-2 text-sm text-red-400">Please enter a valid email</p>
                )}
                <p className="mt-3 text-xs text-slate-500">
                  Instant access. No spam. Unsubscribe anytime.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto max-w-md rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6"
              >
                <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-emerald-400" />
                <p className="text-lg font-semibold text-white">Resources Unlocked!</p>
                <p className="text-sm text-slate-400">Click any playbook below to access</p>
              </motion.div>
            )}
          </motion.div>

          {/* Playbook Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-16">
            {playbooks.map((playbook, i) => {
              const colors = colorMap[playbook.color as keyof typeof colorMap]
              const Icon = playbook.icon

              return (
                <motion.div
                  key={playbook.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className={`relative rounded-2xl border ${colors.border} ${colors.bg} p-6 backdrop-blur-sm transition-all`}
                >
                  {/* Value badge */}
                  <div className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-bold text-white">
                    {playbook.value} VALUE
                  </div>

                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon}`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white">{playbook.title}</h3>
                  <p className="mb-4 text-sm text-slate-400">{playbook.description}</p>

                  <div className="mb-4 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {playbook.pages} pages
                    </span>
                  </div>

                  <ul className="mb-6 space-y-2">
                    {playbook.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {unlockedResources ? (
                    <Link
                      href={playbook.downloadUrl}
                      className={`flex w-full items-center justify-center gap-2 rounded-xl ${colors.button} px-4 py-3 font-semibold text-white transition-all`}
                    >
                      <ArrowRight className="h-4 w-4" />
                      Read Now
                    </Link>
                  ) : (
                    <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-700/50 px-4 py-3 font-semibold text-slate-400 cursor-not-allowed">
                      <Sparkles className="h-4 w-4" />
                      Enter email to unlock
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400">
              {[
                { value: '500+', label: 'AI Songs Created' },
                { value: '74', label: 'Prompts Included' },
                { value: '5+', label: 'Years Experience' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trust Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center"
          >
            <div className="flex items-center justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-lg text-white mb-2">
              &quot;The Suno playbook alone transformed my music production workflow.
              I went from struggling to consistent releases.&quot;
            </p>
            <p className="text-sm text-slate-400">
              Alex Rivera, Music Producer
            </p>
          </motion.div>

          {/* Bottom CTA */}
          {!unlockedResources && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <p className="text-slate-400 mb-4">
                Ready to level up your AI creativity?
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Get All 3 Playbooks Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </>
  )
}
