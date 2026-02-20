'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Mail,
  Sparkles,
  Code2,
  Music,
  TrendingUp,
  Flame,
  Crown,
  CheckCircle2,
  Check,
  Clock,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import streams from '@/data/newsletter-streams.json'

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Code2,
  Music,
  TrendingUp,
  Flame,
  Crown,
}

// Visual email preview for each stream — mimics actual email template header
function EmailPreview({ stream }: { stream: (typeof streams.streams)[number] }) {
  return (
    <div className="relative mx-auto w-full max-w-[280px] overflow-hidden rounded-xl border border-white/10 shadow-2xl">
      {/* Email "app" chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-white/[0.03] px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-red-500/60" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
        <div className="h-2 w-2 rounded-full bg-green-500/60" />
        <span className="ml-2 text-[9px] text-white/30">Inbox</span>
      </div>

      {/* Email header bar */}
      <div className="border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ background: stream.accentHex }}
          >
            F
          </div>
          <div>
            <div className="text-[10px] font-medium text-white/80">Frank &lt;frank@frankx.ai&gt;</div>
            <div className="text-[9px] text-white/30">to me</div>
          </div>
        </div>
      </div>

      {/* Email body — styled to match actual template */}
      <div
        className="px-5 pb-5 pt-6"
        style={{ background: '#0a0f1a' }}
      >
        {/* Star dots */}
        <div className="mb-4 flex justify-center gap-6">
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: stream.accentHex, boxShadow: `0 0 8px ${stream.accentHex}` }}
          />
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: '#43BFE3', boxShadow: '0 0 10px rgba(67,191,227,0.8)' }}
          />
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.7)' }}
          />
        </div>

        {/* Title */}
        <h4
          className="mb-1 text-center text-sm font-bold"
          style={{
            background: `linear-gradient(135deg, #ffffff, ${stream.accentHex})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {stream.name}
        </h4>
        <p className="mb-4 text-center text-[9px] text-white/40">{stream.tagline}</p>

        {/* Content card preview */}
        <div
          className="rounded-lg p-3"
          style={{
            background: stream.bgHex,
            border: `1px solid ${stream.borderHex}`,
          }}
        >
          <div
            className="mb-1.5 h-1.5 w-16 rounded-full opacity-60"
            style={{ background: stream.accentHex }}
          />
          <div className="space-y-1">
            <div className="h-1 w-full rounded-full bg-white/10" />
            <div className="h-1 w-4/5 rounded-full bg-white/10" />
            <div className="h-1 w-3/5 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Second card */}
        <div className="mt-2 rounded-lg border border-white/5 bg-white/[0.02] p-3">
          <div className="mb-1.5 h-1.5 w-12 rounded-full bg-cyan-500/40" />
          <div className="space-y-1">
            <div className="h-1 w-full rounded-full bg-white/8" />
            <div className="h-1 w-3/4 rounded-full bg-white/8" />
          </div>
        </div>

        {/* CTA button */}
        <div className="mt-4 flex justify-center">
          <div
            className="rounded-md px-6 py-1.5 text-[9px] font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, ${stream.accentHex}, #43BFE3)`,
            }}
          >
            Read More
          </div>
        </div>
      </div>
    </div>
  )
}

// Stream card with email preview + subscribe
function StreamCard({
  stream,
  index,
}: {
  stream: (typeof streams.streams)[number]
  index: number
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const Icon = iconMap[stream.icon] || Mail

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, listType: stream.listType }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/10 hover:bg-white/[0.03]"
    >
      {/* Premium badge */}
      {'premium' in stream && stream.premium && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300">
          Premium
        </div>
      )}

      <div className="grid gap-0 md:grid-cols-2">
        {/* Left: Email preview */}
        <div className="flex items-center justify-center border-b border-white/5 bg-black/20 p-6 md:border-b-0 md:border-r">
          <div className="transform transition-transform group-hover:scale-[1.02]">
            <EmailPreview stream={stream} />
          </div>
        </div>

        {/* Right: Info + subscribe */}
        <div className="flex flex-col justify-between p-6">
          <div>
            {/* Header */}
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: stream.bgHex }}
              >
                <Icon className="h-5 w-5" style={{ color: stream.accentHex }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{stream.name}</h3>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Clock className="h-3 w-3" />
                  {stream.cadence}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mb-4 text-sm leading-relaxed text-slate-400">{stream.description}</p>

            {/* Sample topics */}
            <div className="mb-5 space-y-1.5">
              {stream.sampleTopics.slice(0, 3).map((topic) => (
                <div key={topic} className="flex items-start gap-2 text-xs text-slate-500">
                  <Check className="mt-0.5 h-3 w-3 flex-shrink-0" style={{ color: stream.accentHex }} />
                  {topic}
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe form */}
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">Subscribed</span>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={status === 'loading'}
                  className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-white/20 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex-shrink-0 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${stream.accentHex}, ${stream.accentHex}cc)`,
                  }}
                >
                  {status === 'loading' ? '...' : 'Join'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default function NewsletterPage() {
  const [allEmail, setAllEmail] = useState('')
  const [allStatus, setAllStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribeAll = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!allEmail || !allEmail.includes('@')) return

    setAllStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: allEmail, listType: 'all' }),
      })
      if (res.ok) {
        setAllStatus('success')
        setAllEmail('')
      } else {
        setAllStatus('error')
      }
    } catch {
      setAllStatus('error')
    }
  }

  return (
    <main className="relative min-h-screen bg-[#030712]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(67,191,227,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Hero */}
      <section className="pb-16 pt-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5"
          >
            <Mail className="h-4 w-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-400">6 Streams. Pick Your Signal.</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Subscribe to what
            <span className="mt-2 block bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              you actually care about
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            AI architecture, music production, investing, worldbuilding — each stream
            has its own voice, cadence, and depth. Subscribe to one or all.
          </motion.p>

          {/* Subscribe to all */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto max-w-md"
          >
            {allStatus === 'success' ? (
              <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="font-medium text-emerald-300">Subscribed to all streams</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribeAll} className="flex gap-2">
                <input
                  type="email"
                  value={allEmail}
                  onChange={(e) => setAllEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={allStatus === 'loading'}
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-slate-500 outline-none transition-all focus:border-violet-500/30 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={allStatus === 'loading'}
                  className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-4 font-semibold text-white transition-all hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50"
                >
                  {allStatus === 'loading' ? '...' : 'Get All'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
            <p className="mt-3 text-xs text-slate-500">
              One click, all 6 streams. Unsubscribe from any individually.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stream count bar */}
      <section className="border-y border-white/5 py-6">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {streams.streams.map((s) => {
              const Icon = iconMap[s.icon] || Mail
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
                >
                  <Icon className="h-4 w-4" style={{ color: s.accentHex }} />
                  {s.name}
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stream cards */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl space-y-8 px-6">
          {streams.streams.map((stream, i) => (
            <div key={stream.id} id={stream.id}>
              <StreamCard stream={stream} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">How it works</h2>
            <p className="text-slate-400">Each stream is independent. Subscribe to what matters.</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Pick your streams',
                desc: 'Choose one or all. Each has its own cadence and content type.',
              },
              {
                step: '02',
                title: 'Get curated content',
                desc: 'Not repurposed blog posts. Original insights crafted for each stream.',
              },
              {
                step: '03',
                title: 'Stay in control',
                desc: 'Manage each stream independently. Unsubscribe from one without losing others.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-6"
              >
                <div className="mb-3 text-2xl font-bold text-white/10">{item.step}</div>
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-gradient-to-b from-violet-900/20 to-cyan-900/20 p-10 text-center"
          >
            <Sparkles className="mx-auto mb-6 h-10 w-10 text-violet-400" />
            <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
              Not sure which stream?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-slate-400">
              Start with Creation Chronicles — it covers everything and you&apos;ll see what resonates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#creation-chronicles"
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                Start with the main stream
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/blog"
                className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/5"
              >
                Read the blog first
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
