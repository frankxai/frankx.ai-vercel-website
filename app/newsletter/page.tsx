'use client'

import { useState } from 'react'
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
} from 'lucide-react'

function NewsletterBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
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
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
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
  },
  {
    icon: Code2,
    title: 'Developer Insights',
    description: 'Claude Code mastery, agentic patterns, and technical deep dives.',
  },
  {
    icon: Brain,
    title: 'AI Strategy',
    description: 'How to leverage AI tools without losing your creative soul.',
  },
  {
    icon: Gift,
    title: 'Exclusive Resources',
    description: 'First access to prompts, templates, and tools before public release.',
  },
]

const socialProof = [
  'Creators who went from confused to confident',
  'Developers building AI-powered workflows',
  'Musicians creating with Suno AI daily',
  'Entrepreneurs using AI strategically',
]

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
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
        setMessage('Welcome to the community!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
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
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5"
            >
              <Mail className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-400">The FrankX Letter</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              AI insights for
              <span className="mt-2 block bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                creators who ship
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              Weekly deep dives on AI music creation, agentic development, and building
              creative systems that amplify your voice—not replace it.
            </motion.p>

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
                  <h3 className="mb-2 text-xl font-bold text-white">You&apos;re in!</h3>
                  <p className="text-slate-400">Check your inbox for a welcome message.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-slate-500 outline-none transition-all focus:border-violet-500/50 focus:bg-white/10"
                      disabled={status === 'loading'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 px-6 py-4 font-semibold text-white transition-all hover:from-violet-500 hover:to-pink-500 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      'Subscribing...'
                    ) : (
                      <>
                        Join the community
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  {status === 'error' && (
                    <p className="text-sm text-red-400">{message}</p>
                  )}
                  <p className="text-xs text-slate-500">
                    No spam, unsubscribe anytime. By subscribing you agree to our privacy policy.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </section>

        {/* Social proof */}
        <section className="border-y border-white/5 py-10">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {socialProof.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-slate-400"
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
              <span className="mb-4 inline-block rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-1.5 text-sm font-medium text-pink-400">
                What You&apos;ll Get
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Curated intelligence, not noise
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                Every issue is crafted to make you more effective with AI tools.
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
                    className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{benefit.title}</h3>
                    <p className="text-slate-400">{benefit.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Recent topics preview */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                Recent topics covered
              </h2>
            </motion.div>

            <div className="space-y-4">
              {[
                { title: 'The Intelligence Revolution: What 2025 Means for Creators', category: 'AI Strategy' },
                { title: 'Building Your First Agentic Workflow with Claude Code', category: 'Development' },
                { title: 'Suno v4.5: Master the New Features', category: 'Music Creation' },
                { title: 'From Tech-Overwhelmed to AI-Empowered: A Framework', category: 'Creator Journey' },
                { title: 'The Soul Frequency Framework for AI Collaboration', category: 'Philosophy' },
              ].map((topic, i) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="flex items-center gap-4">
                    <Zap className="h-5 w-5 text-amber-400" />
                    <span className="font-medium text-white">{topic.title}</span>
                  </div>
                  <span className="hidden text-sm text-slate-500 sm:block">{topic.category}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-violet-900/20 to-pink-900/20 p-10 text-center"
            >
              <Sparkles className="mx-auto mb-6 h-12 w-12 text-violet-400" />
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                Ready to level up?
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-slate-400">
                Join creators who use AI to amplify their voice, not replace it.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Mail className="h-5 w-5" />
                  Subscribe now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/blog"
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  Read the blog first
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
