'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Mail,
  CheckCircle2,
  Sparkles,
  Code2,
  Music,
  TrendingUp,
  Flame,
  Crown,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { NewsletterStream } from '@/lib/newsletter'

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Code2,
  Music,
  TrendingUp,
  Flame,
  Crown,
}

export default function NewsletterHero({
  streams,
}: {
  streams: NewsletterStream[]
}) {
  const [allEmail, setAllEmail] = useState('')
  const [allStatus, setAllStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

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
    <section className="relative overflow-hidden pb-16 pt-32">
      {/* Nature-tech constellation background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/images/design-lab/nature-10-constellation-garden.png"
          alt=""
          fill
          className="object-cover opacity-[0.03]"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
      </div>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-15"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(circle, rgba(67,191,227,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5"
        >
          <Mail className="h-4 w-4 text-violet-400" />
          <span className="text-sm font-medium text-violet-400">
            6 Streams. Pick Your Signal.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex justify-center"
        >
          <Image
            src="/images/mascot/mascot-v25-crystal-familiar.png"
            alt="Axi — FrankX.AI mascot"
            width={80}
            height={80}
            className="rounded-2xl"
            style={{ boxShadow: '0 0 40px -8px rgba(139,92,246,0.4)' }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
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
          AI architecture, music production, investing, worldbuilding — each
          stream has its own voice, cadence, and depth. Subscribe to one or all.
        </motion.p>

        {/* Subscribe to all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto max-w-md"
        >
          <AnimatePresence mode="wait">
            {allStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-4"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="font-medium text-emerald-300">
                  Subscribed to all streams
                </span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubscribeAll}
                className="flex gap-2"
              >
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
              </motion.form>
            )}
          </AnimatePresence>
          <p className="mt-3 text-xs text-slate-500">
            One click, all 6 streams. Unsubscribe from any individually.
          </p>
        </motion.div>
      </div>

      {/* Stream nav pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mx-auto mt-12 max-w-5xl border-y border-white/5 px-6 py-6"
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          {streams.map((s) => {
            const Icon = iconMap[s.icon] || Mail
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-sm text-white/50 transition-all hover:border-white/15 hover:bg-white/[0.04] hover:text-white/80"
                style={
                  {
                    '--accent': s.accentHex,
                  } as React.CSSProperties
                }
              >
                <Icon
                  className="h-4 w-4 transition-colors group-hover:drop-shadow-sm"
                  style={{ color: s.accentHex }}
                />
                {s.name}
              </a>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
