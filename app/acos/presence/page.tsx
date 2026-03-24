'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Eye,
  Volume2,
  Wind,
  Droplets,
  Hand,
  Waves,
  Brain,
  Infinity as InfinityIcon,
  ArrowRight,
  ArrowLeft,
  Terminal,
  Clock,
  Zap,
  Circle,
  GitBranch,
  Layers,
} from 'lucide-react'

// ── Gate questions — compact form for ACOS module doc ──────────────────────

const gates = [
  { roman: 'I',    title: 'SEE',     question: 'What do you see?',                          icon: Eye,          color: '#43BFE3' },
  { roman: 'II',   title: 'HEAR',    question: 'What do you hear?',                         icon: Volume2,      color: '#7C3AED' },
  { roman: 'III',  title: 'SMELL',   question: 'What do you smell?',                        icon: Wind,         color: '#10B981' },
  { roman: 'IV',   title: 'TASTE',   question: 'What do you taste?',                        icon: Droplets,     color: '#F59E0B' },
  { roman: 'V',    title: 'FEEL',    question: 'What does your body feel?',                 icon: Hand,         color: '#F43F5E' },
  { roman: 'VI',   title: 'SENSE',   question: 'What does your whole body sense?',          icon: Waves,        color: '#14B8A6' },
  { roman: 'VII',  title: 'MIND',    question: 'What thought is here right now?',           icon: Brain,        color: '#6366F1' },
  { roman: 'VIII', title: 'WITNESS', question: 'What remains when thought is quiet?',       icon: InfinityIcon, color: '#CBD5E1' },
]

// ── Integration points ─────────────────────────────────────────────────────

const integrations = [
  {
    label: 'Pre-Session Gate',
    timing: 'Before every work block',
    description: 'Runs automatically when you open ACOS. The minimum viable version (Gates I + V) takes 30 seconds. Cannot be skipped — can be compressed.',
    level: 'Level 0 — The Gate',
    color: '#10B981',
    rgb: '16, 185, 129',
    code: `$ claude
/acos

> ACOS v10 loaded. Starting session...

⬟ Full Presence Activation — Level 0
  I   What do you see?           [5s]
  V   What does your body feel?  [8s]

> Presence confirmed. 38 agents ready.
  What are you building today?`,
  },
  {
    label: 'Mid-Session Anchor',
    timing: 'Every 45 minutes',
    description: 'A single quiet tone and one question. No interaction required. The question lands and the work continues.',
    level: 'Single gate',
    color: '#43BFE3',
    rgb: '67, 191, 227',
    code: `[45min mark — session anchor]

⬟ Are you here?
  Or are you thinking about being here?

[no response required — continue]`,
  },
  {
    label: 'Session Closing',
    timing: 'End of work block',
    description: 'One question before ACOS closes. Optional 2-sentence journaling. Saved to ACOS memory for pattern tracking.',
    level: 'Reflection prompt',
    color: '#7C3AED',
    rgb: '124, 58, 237',
    code: `/acos close

⬟ Session complete.
  What did presence make possible today
  that distraction could not?

> [optional — 2 sentences max]
  Saved to memory. Good work.`,
  },
]

// ── Depth levels — ACOS routing table ────────────────────────────────────

const levels = [
  { cmd: '/presence 0', name: 'The Gate',    dur: '30s',   gates: 'I + V',      use: 'Every session, non-negotiable',          color: '#43BFE3' },
  { cmd: '/presence 1', name: 'The Scan',    dur: '2min',  gates: 'All 8',      use: 'Morning Prime ritual default',           color: '#7C3AED' },
  { cmd: '/presence 2', name: 'The Arrival', dur: '5min',  gates: 'All 8+',     use: 'Before deep build or creative sprint',   color: '#10B981' },
  { cmd: '/presence 3', name: 'The Witness', dur: '10min', gates: 'Full+Mind',  use: 'Creative blocks, emotional resets',      color: '#F59E0B' },
  { cmd: '/presence 4', name: 'The Still',   dur: '20min', gates: 'Open',       use: 'Weekly — screen off, no ACOS',           color: '#CBD5E1' },
]

// ─────────────────────────────────────────────────────────────────────────────

export default function ACOSPresencePage() {
  return (
    <main className="min-h-screen bg-[#02030b] text-white">

      {/* ── Breadcrumb + Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-[#02030b] to-emerald-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(16,185,129,0.08),transparent_55%)]" />

        <div className="relative mx-auto max-w-4xl px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/30 mb-10">
            <Link href="/acos" className="hover:text-white/60 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              ACOS
            </Link>
            <span>/</span>
            <span className="text-white/50">presence</span>
          </div>

          {/* Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400" />
              Module · FPA v1.0
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/30 font-mono">
              /presence
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-cyan-100 bg-clip-text text-transparent">
              Full Presence
            </span>
            <br />
            <span className="text-white/40 font-light">Activation</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            The entry ritual for every ACOS session. Eight sensory gates that close the gap
            between where you were and where you need to be.
            Intelligence without presence is just speed.
          </p>

          {/* Core proposition */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 max-w-2xl">
            <p className="text-white/40 text-sm leading-relaxed font-mono">
              <span className="text-emerald-400"># Why this exists</span>
              <br /><br />
              Most sessions start mid-scatter — three browser tabs open, Slack half-read,
              yesterday's problem still running in the background.
              <br /><br />
              ACOS can load 75 skills and route 38 agents.
              But if the operator is absent, none of it reaches its depth.
              <br /><br />
              FPA is 30 seconds minimum. It is the only ACOS protocol that cannot be automated.
              You have to be there.
            </p>
          </div>
        </div>
      </section>

      {/* ── Three Integration Points ──────────────────────────────────────── */}
      <section className="relative max-w-5xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <GitBranch className="w-5 h-5 text-white/30" />
            <h2 className="text-2xl font-semibold text-white/80">Three Integration Points</h2>
          </div>
          <p className="text-white/30 ml-8">How FPA runs inside every ACOS work block.</p>
        </motion.div>

        <div className="space-y-6">
          {integrations.map((point, i) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="grid md:grid-cols-2 gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-8"
              style={{ borderLeftColor: `rgba(${point.rgb}, 0.3)`, borderLeftWidth: '2px' }}
            >
              {/* Description */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: point.color }}
                  >
                    {String(i + 1).padStart(2, '0')} — {point.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/30 text-xs mb-4 font-mono">
                  <Clock className="w-3 h-3" />
                  {point.timing}
                </div>
                <p className="text-white/50 leading-relaxed mb-3">{point.description}</p>
                <span
                  className="inline-block text-xs px-2.5 py-1 rounded-full border font-mono"
                  style={{ borderColor: `rgba(${point.rgb}, 0.25)`, color: `rgba(${point.rgb}, 0.8)` }}
                >
                  {point.level}
                </span>
              </div>

              {/* Terminal */}
              <div className="rounded-xl border border-white/[0.06] bg-[#0d1117] p-4 font-mono text-xs">
                <div className="flex gap-1.5 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                </div>
                <pre className="text-white/50 leading-relaxed whitespace-pre-wrap">
                  {point.code.split('\n').map((line, li) => {
                    if (line.startsWith('⬟')) return <div key={li} style={{ color: point.color }} className="opacity-90">{line}</div>
                    if (line.startsWith('$')) return <div key={li}><span className="text-emerald-400">$</span><span className="text-white/60">{line.slice(1)}</span></div>
                    if (line.startsWith('>')) return <div key={li} className="text-cyan-300/70">{line}</div>
                    if (line.startsWith('[')) return <div key={li} className="text-white/25 italic">{line}</div>
                    if (line.startsWith('/')) return <div key={li} className="text-purple-400">{line}</div>
                    return <div key={li}>{line}</div>
                  })}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Depth Level Routing Table ─────────────────────────────────────── */}
      <section className="relative max-w-5xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-5 h-5 text-white/30" />
            <h2 className="text-2xl font-semibold text-white/80">Depth Level Routing</h2>
          </div>
          <p className="text-white/30 ml-8">ACOS selects the level based on session context. Override manually with the command.</p>
        </motion.div>

        {/* Routing table */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[auto_1fr_auto_1fr] gap-4 px-6 py-3 border-b border-white/[0.06] text-xs font-mono text-white/25 uppercase tracking-widest">
            <span>Command</span>
            <span>Level</span>
            <span>Duration</span>
            <span>Use when</span>
          </div>
          {levels.map((level, i) => (
            <motion.div
              key={level.cmd}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group grid grid-cols-[auto_1fr_auto_1fr] gap-4 px-6 py-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors items-center"
            >
              <code
                className="text-xs px-2.5 py-1 rounded border font-mono whitespace-nowrap"
                style={{ borderColor: `rgba(${i},${i},${i},0)`, color: level.color, background: `${level.color}10`, borderColor: `${level.color}25` }}
              >
                {level.cmd}
              </code>
              <span className="text-white/60 text-sm font-medium">{level.name}</span>
              <span className="text-white/30 text-xs font-mono text-right">{level.dur}</span>
              <span className="text-white/35 text-sm">{level.use}</span>
            </motion.div>
          ))}
        </div>

        {/* Gates shorthand */}
        <div className="mt-6 rounded-xl border border-white/[0.06] bg-[#0d1117] p-5 font-mono text-xs">
          <div className="flex gap-1.5 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
          </div>
          <div className="text-white/30 space-y-1">
            <p><span className="text-emerald-400">$</span> <span className="text-white/50">claude &amp;&amp; /presence 3</span></p>
            <p className="text-white/25 italic mt-2"># Override: creative block detected, running Witness level</p>
            <p className="text-violet-400 mt-2">⬟ Full Presence Activation — Level 3: The Witness</p>
            <p className="text-white/30">  All 8 gates + extended mind observation (10 min)</p>
            <p className="text-white/20 mt-2 italic">  "What thought is here right now?"</p>
            <p className="text-white/20 italic">  Don't follow it. Watch it arrive. Watch it pass.</p>
            <p className="text-cyan-300/60 mt-3">&gt; Session unlocked after completion.</p>
          </div>
        </div>
      </section>

      {/* ── The 8 Gates — compact view ───────────────────────────────────── */}
      <section className="relative max-w-5xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-white/30" />
            <h2 className="text-2xl font-semibold text-white/80">The Eight Gates</h2>
          </div>
          <p className="text-white/30 ml-8">
            Based on the Buddhist six sense-bases (āyatana) + Eckhart Tolle's Now + Tantric somatic awakening.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {gates.map((gate, i) => {
            const Icon = gate.icon
            return (
              <motion.div
                key={gate.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <span className="block text-xs font-mono text-white/20 mb-2">{gate.roman}</span>
                <Icon className="w-4 h-4 mb-2" style={{ color: gate.color }} />
                <p className="text-xs font-semibold tracking-wide mb-1" style={{ color: gate.color }}>
                  {gate.title}
                </p>
                <p className="text-xs text-white/30 italic leading-relaxed">{gate.question}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/presence"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            Full practice with instructions and extended silence guides
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Philosophy ───────────────────────────────────────────────────── */}
      <section className="relative max-w-3xl mx-auto px-6 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10"
        >
          <Zap className="w-6 h-6 text-violet-400/50 mx-auto mb-6" />
          <blockquote className="text-xl md:text-2xl font-light text-white/60 leading-relaxed mb-6">
            &ldquo;You cannot create from depth if you arrive scattered.
            The first protocol of ACOS is not a command. It is an arrival.&rdquo;
          </blockquote>
          <p className="text-white/20 text-sm tracking-widest uppercase">FrankX — ACOS v10 Design Notes</p>
        </motion.div>
      </section>

      {/* ── CTAs ──────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-4">

            {/* Full practice */}
            <Link
              href="/presence"
              className="group rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] p-6 hover:border-violet-500/40 hover:bg-violet-500/[0.08] transition-all duration-400"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                <Eye className="w-4 h-4 text-violet-400" />
              </div>
              <h3 className="font-semibold text-white/70 mb-2 group-hover:text-white transition-colors">
                Open the Practice
              </h3>
              <p className="text-white/30 text-sm mb-4">
                The full /presence experience — all 8 gates with instructions, silence guides, and five depth levels.
              </p>
              <div className="flex items-center gap-1 text-violet-400/50 text-sm group-hover:text-violet-400 transition-colors">
                frankx.ai/presence <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            {/* Rituals */}
            <Link
              href="/rituals"
              className="group rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-6 hover:border-amber-500/30 hover:bg-amber-500/[0.06] transition-all duration-400"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="font-semibold text-white/70 mb-2 group-hover:text-white transition-colors">
                Daily Rituals
              </h3>
              <p className="text-white/30 text-sm mb-4">
                How FPA fits into Morning Prime, Deep Build, Studio Session, and Evening Review.
              </p>
              <div className="flex items-center gap-1 text-amber-400/50 text-sm group-hover:text-amber-400 transition-colors">
                View system <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            {/* ACOS main */}
            <Link
              href="/acos"
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-400"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                <Terminal className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white/70 mb-2 group-hover:text-white transition-colors">
                Back to ACOS
              </h3>
              <p className="text-white/30 text-sm mb-4">
                75+ skills, 38 agents, 35+ commands. FPA is one module in the full operating system.
              </p>
              <div className="flex items-center gap-1 text-emerald-400/50 text-sm group-hover:text-emerald-400 transition-colors">
                Explore ACOS <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
