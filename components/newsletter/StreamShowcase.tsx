'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  CheckCircle2,
  Check,
  Clock,
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

// Map each stream to its thematic team character
const streamCharacters: Record<string, { src: string; name: string }> = {
  'creation-chronicles': {
    src: '/images/mascot/mascot-v25-crystal-familiar.png',
    name: 'Axi',
  },
  'ai-architect': {
    src: '/images/team/codex-falcon.png',
    name: 'Codex',
  },
  'music-lab': {
    src: '/images/team/echo-leopard.png',
    name: 'Echo',
  },
  arcanea: {
    src: '/images/team/stella-owl.png',
    name: 'Stella',
  },
  investor: {
    src: '/images/team/draconia-tiger.png',
    name: 'Draconia',
  },
  'inner-circle': {
    src: '/images/team/nero-umbra.png',
    name: 'Nero',
  },
}

// Map each stream ID to a thematic ecosystem image
const streamImages: Record<string, { src: string; alt: string }> = {
  'creation-chronicles': {
    src: '/images/ecosystem/13-creation-chronicles.png',
    alt: 'Creation Chronicles — behind-the-scenes of building an AI-powered creator business',
  },
  'ai-architect': {
    src: '/images/ecosystem/15-acos-claude-code.png',
    alt: 'AI Architect Dispatch — Claude Code, ACOS architecture, and enterprise AI systems',
  },
  'music-lab': {
    src: '/images/ecosystem/12-creative-ai-toolkit.png',
    alt: 'FrankX Music Letters — AI music production toolkit and Suno mastery',
  },
  arcanea: {
    src: '/images/ecosystem/07-arcanea-10-gates.png',
    alt: 'Arcanea Transmissions — the 10 Gates mythology and creative universe',
  },
  investor: {
    src: '/images/ecosystem/05-value-ladder-progression.png',
    alt: 'Investor Intelligence Brief — AI-powered investing and portfolio strategies',
  },
  'inner-circle': {
    src: '/images/design-lab/nature-09-crystal-garden.png',
    alt: 'Inner Circle — exclusive access, revenue breakdowns, and system architecture',
  },
}

// Email preview mimicking actual email template header
function EmailPreview({ stream }: { stream: NewsletterStream }) {
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
      <div className="border-b border-white/[0.08] bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ background: stream.accentHex }}
          >
            F
          </div>
          <div>
            <div className="text-[10px] font-medium text-white/80">
              Frank &lt;frank@frankx.ai&gt;
            </div>
            <div className="text-[9px] text-white/30">to me</div>
          </div>
        </div>
      </div>

      {/* Email body */}
      <div className="px-5 pb-5 pt-6" style={{ background: '#0a0f1a' }}>
        {/* Star dots */}
        <div className="mb-4 flex justify-center gap-6">
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: stream.accentHex,
              boxShadow: `0 0 8px ${stream.accentHex}`,
            }}
          />
          <div
            className="h-2 w-2 rounded-full"
            style={{
              background: '#43BFE3',
              boxShadow: '0 0 10px rgba(67,191,227,0.8)',
            }}
          />
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: '#10B981',
              boxShadow: '0 0 8px rgba(16,185,129,0.7)',
            }}
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
        <p className="mb-4 text-center text-[9px] text-white/40">
          {stream.tagline}
        </p>

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
        <div className="mt-2 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3">
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

// Individual stream card with ecosystem image + email preview + subscribe
function StreamCard({
  stream,
  index,
}: {
  stream: NewsletterStream
  index: number
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const Icon = iconMap[stream.icon] || Mail
  const image = streamImages[stream.id]

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
      style={{
        boxShadow: `0 0 80px -20px ${stream.accentHex}15`,
      }}
    >
      {/* Premium badge */}
      {'premium' in stream && stream.premium && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300">
          Premium
        </div>
      )}

      {/* Ecosystem image banner */}
      {image && (
        <div className="relative h-48 w-full overflow-hidden border-b border-white/5">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent" />
          {/* Bioluminescent glow accent */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${stream.accentHex}60, transparent)`,
              boxShadow: `0 0 20px 2px ${stream.accentHex}30`,
            }}
          />
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
              {streamCharacters[stream.id] ? (
                <Image
                  src={streamCharacters[stream.id].src}
                  alt={streamCharacters[stream.id].name}
                  width={48}
                  height={48}
                  className="rounded-xl"
                  style={{
                    boxShadow: `0 0 20px -6px ${stream.accentHex}50`,
                  }}
                />
              ) : (
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: stream.bgHex }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: stream.accentHex }}
                  />
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-white">{stream.name}</h3>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Clock className="h-3 w-3" />
                  {stream.cadence}
                  {streamCharacters[stream.id] && (
                    <span className="text-white/25">
                      {streamCharacters[stream.id].name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mb-4 text-sm leading-relaxed text-slate-400">
              {stream.description}
            </p>

            {/* Sample topics */}
            <div className="mb-5 space-y-1.5">
              {stream.sampleTopics.slice(0, 3).map((topic) => (
                <div
                  key={topic}
                  className="flex items-start gap-2 text-xs text-slate-500"
                >
                  <Check
                    className="mt-0.5 h-3 w-3 flex-shrink-0"
                    style={{ color: stream.accentHex }}
                  />
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
                <span className="text-sm font-medium text-emerald-300">
                  Subscribed
                </span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubscribe}
                className="flex gap-2"
              >
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

export default function StreamShowcase({
  streams,
}: {
  streams: NewsletterStream[]
}) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl space-y-8 px-6">
        {streams.map((stream, i) => (
          <div key={stream.id} id={stream.id}>
            <StreamCard stream={stream} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
