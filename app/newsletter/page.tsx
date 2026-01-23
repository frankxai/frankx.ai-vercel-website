'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Mail,
  Sparkles,
  CheckCircle2,
  Zap,
  Music,
  Code2,
  Brain,
  Gift,
  Star,
  Users,
  Archive,
  Calendar,
} from 'lucide-react'

function NewsletterBackground() {
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
          background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
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

const benefits = [
  {
    icon: Music,
    title: 'AI Music Creation',
    description: 'Suno prompts, production techniques, and the latest in AI-generated music.',
    color: 'emerald',
  },
  {
    icon: Code2,
    title: 'Agentic Development',
    description: 'Claude Code mastery, MCP servers, and multi-agent workflow patterns.',
    color: 'cyan',
  },
  {
    icon: Brain,
    title: 'AI Strategy',
    description: 'How to leverage AI tools without losing your creative soul.',
    color: 'violet',
  },
  {
    icon: Gift,
    title: 'Exclusive Resources',
    description: 'First access to prompts, templates, and tools before public release.',
    color: 'amber',
  },
]

const recentIssues = [
  { title: 'Build Your Own Jarvis with Claude Code', category: 'Development', date: 'Jan 16' },
  { title: 'The Intelligence Revolution: What 2026 Means for Creators', category: 'AI Strategy', date: 'Jan 9' },
  { title: 'Suno v4.5: Master the New Features', category: 'Music Creation', date: 'Jan 2' },
  { title: 'From Tech-Overwhelmed to AI-Empowered', category: 'Creator Journey', date: 'Dec 26' },
  { title: 'The Soul Frequency Framework', category: 'Philosophy', date: 'Dec 19' },
]

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null)

  // Fetch subscriber count on mount
  useEffect(() => {
    fetch('/api/newsletter/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.stats?.totalContacts) {
          setSubscriberCount(data.stats.totalContacts)
        }
      })
      .catch(() => {
        // Silently fail - don't show count if API fails
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('Welcome to the community!')
        setEmail('')
        setFirstName('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  const colorClasses = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  }

  return (
    <>
      <NewsletterBackground />
      <main className="relative min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5"
            >
              <Mail className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">The FrankX Letter</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              AI insights for
              <span className="mt-2 block bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                creators who ship
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
            >
              Weekly deep dives on AI music creation, agentic development, and building
              creative systems that amplify your voice—not replace it.
            </motion.p>

            {/* Subscriber count */}
            {subscriberCount && subscriberCount > 10 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-10 inline-flex items-center gap-2 text-sm text-white/40"
              >
                <Users className="h-4 w-4" />
                Join {subscriberCount.toLocaleString()}+ creators
              </motion.div>
            )}

            {/* Main signup form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto max-w-md"
            >
              {status === 'success' ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8">
                  <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-400" />
                  <h3 className="mb-2 text-xl font-bold text-white">You're in!</h3>
                  <p className="text-white/60 mb-4">Check your inbox for a welcome message.</p>
                  <Link
                    href="/newsletter/archive"
                    className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300"
                  >
                    <Archive className="h-4 w-4" />
                    Browse past issues while you wait
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="w-1/3 rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder-white/40 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
                      disabled={status === 'loading'}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder-white/40 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
                      disabled={status === 'loading'}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      'Subscribing...'
                    ) : (
                      <>
                        Subscribe to The FrankX Letter
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  {status === 'error' && (
                    <p className="text-sm text-red-400">{message}</p>
                  )}
                  <p className="text-xs text-white/40">
                    No spam, unsubscribe anytime. By subscribing you agree to our{' '}
                    <Link href="/privacy" className="underline hover:text-white/60">
                      privacy policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </section>

        {/* Social proof */}
        <section className="border-y border-white/5 py-8">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {[
                'Creators building with AI daily',
                'Developers shipping agentic workflows',
                'Musicians creating with Suno',
                'Entrepreneurs using AI strategically',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-white/50"
                >
                  <Star className="h-4 w-4 text-amber-400" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What you'll get */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <span className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
                What You'll Get
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Curated intelligence, not noise
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-white/60">
                Every Thursday, one email packed with actionable AI insights.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors"
                  >
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${colorClasses[benefit.color as keyof typeof colorClasses]}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{benefit.title}</h3>
                    <p className="text-white/60">{benefit.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Recent issues */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center justify-between"
            >
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Recent Issues
              </h2>
              <Link
                href="/newsletter/archive"
                className="flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <Archive className="h-4 w-4" />
                View all issues
              </Link>
            </motion.div>

            <div className="space-y-3">
              {recentIssues.map((issue, i) => (
                <motion.div
                  key={issue.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/10 hover:bg-white/[0.04] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Zap className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    <span className="font-medium text-white">{issue.title}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-4">
                    <span className="text-sm text-white/40">{issue.category}</span>
                    <span className="flex items-center gap-1 text-xs text-white/30">
                      <Calendar className="h-3 w-3" />
                      {issue.date}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Frank */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-emerald-500/20">
                    F
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Written by Frank Guzman</h3>
                  <p className="text-white/60 mb-4">
                    Musician turned AI Architect at Oracle. I've created 500+ AI-generated songs,
                    built enterprise AI systems, and now I help creators navigate the AI revolution
                    without losing their soul in the process.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1 text-xs text-white/40 bg-white/5 rounded-full px-3 py-1">
                      <Music className="h-3 w-3" /> 500+ AI Songs
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-white/40 bg-white/5 rounded-full px-3 py-1">
                      <Code2 className="h-3 w-3" /> Oracle AI Architect
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-white/40 bg-white/5 rounded-full px-3 py-1">
                      <Brain className="h-3 w-3" /> Creator Educator
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-900/20 to-cyan-900/20 p-10 text-center"
            >
              <Sparkles className="mx-auto mb-6 h-12 w-12 text-emerald-400" />
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                Ready to level up?
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-white/60">
                Join creators who use AI to amplify their voice, not replace it.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Mail className="h-5 w-5" />
                  Subscribe now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <Link
                  href="/newsletter/archive"
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  <Archive className="h-5 w-5" />
                  Browse past issues
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
