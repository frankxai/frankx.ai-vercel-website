'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  Brain,
  Zap,
  Target,
  Shield,
  Layers,
  Repeat,
  Compass,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Flame,
  Clock,
  ExternalLink,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'

interface MentalModel {
  id: string
  number: string
  title: string
  tagline: string
  category: 'systems' | 'leverage' | 'mindset'
  icon: typeof Brain
  accentColor: 'emerald' | 'cyan' | 'violet' | 'amber'
  description: string
  architecturalApplication: string
  operationalProtocol: string
  quote: string
}

const mentalModels: MentalModel[] = [
  {
    id: 'first-principles',
    number: '01',
    title: 'First-Principles Deconstruction',
    tagline: 'Strip every assumption to its physical and logical constants.',
    category: 'systems',
    icon: Cpu,
    accentColor: 'emerald',
    description:
      'Reasoning by analogy creates copies of legacy solutions. First-principles deconstruction breaks complex problems down to their fundamental truths and builds upwards from the ground truth.',
    architecturalApplication:
      'In AI architecture, never blindly adopt monolithic SaaS frameworks. Deconstruct the workflow into context extraction, model inference, tool validation, and deterministic output.',
    operationalProtocol:
      'Before writing code or designing a business, ask: "What are the irreducible constraints? What is physically necessary vs. socially assumed?"',
    quote: 'The simplest architecture that solves the root invariant always outperforms complex abstractions.',
  },
  {
    id: 'high-order-leverage',
    number: '02',
    title: 'High-Order Leverage Vectors',
    tagline: 'Align effort where 1 unit of input yields 100 units of recurring yield.',
    category: 'leverage',
    icon: Zap,
    accentColor: 'cyan',
    description:
      'Labor and capital are permissioned leverage. Code, content, and autonomous agent swarms are permissionless leverage that work 24/7 with zero marginal replication cost.',
    architecturalApplication:
      'Build "Sell the Weapon, Not the Server" modular templates, MCP endpoints, and skill packs that appreciate over time with user context.',
    operationalProtocol:
      'Audit your weekly output: How much time was spent on linear labor vs. compounding assets (templates, code libraries, recorded knowledge)?',
    quote: 'Fortunes in the Golden Age are built by sovereign architects who orchestrate permissionless leverage.',
  },
  {
    id: 'cybernetics',
    number: '03',
    title: 'Cybernetic Feedback Loops',
    tagline: 'Steer through continuous measurement, telemetry, and rapid correction.',
    category: 'systems',
    icon: Repeat,
    accentColor: 'violet',
    description:
      'Systems without closed feedback loops drift into entropy and failure. Cybernetics is the science of goal-directed communication, error sensing, and self-correcting trajectory control.',
    architecturalApplication:
      'Equip agent swarms with automated test gates, conversion telemetry, and memory layers (SIP / ACOS memory) that learn from past execution history.',
    operationalProtocol:
      'Implement short feedback cycles: Daily sprint check-ins, automated typechecks, link-audits, and weekly retrospectives.',
    quote: 'A system that senses error rapidly will always defeat a theoretically perfect system that cannot measure itself.',
  },
  {
    id: 'inversion-asymmetry',
    number: '04',
    title: 'Inversion & Asymmetric Payoffs',
    tagline: 'Map catastrophic failure modes first; structure bets with capped downside and infinite upside.',
    category: 'leverage',
    icon: Target,
    accentColor: 'amber',
    description:
      'Instead of asking how to succeed, ask how to guarantee failure—and ruthlessly eliminate those failure modes. Structure digital products with low downside and unbounded upside.',
    architecturalApplication:
      'Design fail-safes (circuit breakers, rate limiters, fallback models) and isolate risk across modular B.V. entities and independent repositories.',
    operationalProtocol:
      'Perform a pre-mortem before every product launch: "If this failed completely in 6 months, what caused it?" Fix those vulnerabilities now.',
    quote: 'Invert, always invert. Avoid stupidity rather than seeking brilliance.',
  },
  {
    id: 'antifragility',
    number: '05',
    title: 'Antifragile System Architecture',
    tagline: 'Build architectures that strengthen under stress and technological volatility.',
    category: 'systems',
    icon: Shield,
    accentColor: 'emerald',
    description:
      'Fragile systems break under stress. Robust systems resist stress. Antifragile systems actually gain performance and market share when volatility and disruption strike.',
    architecturalApplication:
      'Multi-LLM routing (Claude + OpenAI + Gemini + local weights) ensures your infrastructure thrives even if a single AI vendor experiences an outage or policy shift.',
    operationalProtocol:
      'Decouple critical systems. Never rely on a single distribution platform, single payment rail, or single proprietary API.',
    quote: 'Wind extinguishes a candle and energizes fire. Be the fire.',
  },
  {
    id: 'flow-state-architecture',
    number: '06',
    title: 'Deep Work & Flow State Protocols',
    tagline: 'Protect cognitive reserves through 90-minute uninterrupted creative sprints.',
    category: 'mindset',
    icon: Flame,
    accentColor: 'cyan',
    description:
      'Superficial multi-tasking and Slack notifications fracture attention. Deep work is the ability to focus without distraction on a cognitively demanding task, triggering flow state.',
    architecturalApplication:
      'Automate rote operational tasks with autonomous subagents so human architects spend 100% of their energy on high-level synthesis and taste judgment.',
    operationalProtocol:
      'Structure days into 90-minute hyperfocus blocks. Morning neuro-priming, zero phone interruptions, followed by late-night creation seasons.',
    quote: 'High cognitive bandwidth is the rarest currency in the modern world. Guard it ruthlessly.',
  },
  {
    id: 'radical-agency',
    number: '07',
    title: 'Radical Agency & Sovereignty',
    tagline: 'Assume 100% ownership over infrastructure, distribution, and outcomes.',
    category: 'mindset',
    icon: Compass,
    accentColor: 'violet',
    description:
      'Radical agency is the refusal to accept artificial constraints. Sovereign creators do not wait for permission, credentials, or corporate validation—they ship and prove capability through output.',
    architecturalApplication:
      'Local-first codebases, private memory vaults, and sovereign digital assets that cannot be de-platformed or rented back to you.',
    operationalProtocol:
      'Eliminate victim language. When an obstacle emerges, ask: "What leverage vector or agentic tool can I build right now to overcome this?"',
    quote: 'The world is pliable when approached with technical mastery, high agency, and relentless execution.',
  },
  {
    id: 'humble-mastery',
    number: '08',
    title: 'Humble Mastery & Zero Slop',
    tagline: 'Let the volume of production and execution perfection speak louder than hype.',
    category: 'mindset',
    icon: Sparkles,
    accentColor: 'amber',
    description:
      'The market is saturated with empty marketing and generic AI slop. True authority is forged through thousands of hours of craft, real production systems, and meticulous attention to detail.',
    architecturalApplication:
      'Strict type-checking, WCAG AA accessibility, 60fps micro-animations, and verified benchmarks across every user-facing surface.',
    operationalProtocol:
      'Hold every output to the Santa Verification Standard: Does it reflect world-class taste? Would you stake your reputation on it?',
    quote: 'Excellence in execution is the ultimate differentiator. Let the work speak.',
  },
]

const peakProtocols = [
  {
    title: '01. Morning Neuro-Priming',
    time: '07:00 – 08:30',
    description: 'Physical priming, breathwork, hydration, and goal visualization before touching digital inputs.',
    deliverable: 'Mental clarity filter & prioritized 3-task sprint board.',
  },
  {
    title: '02. The Deep Work Core',
    time: '09:00 – 12:30',
    description: 'Two 90-minute uninterrupted engineering and architecture blocks with zero notifications.',
    deliverable: 'High-leverage code, modular starter kits, and core system design.',
  },
  {
    title: '03. Swarm Orchestration & Review',
    time: '14:00 – 16:30',
    description: 'Dispatching subagents, reviewing pull requests, running type-checks, and testing integrations.',
    deliverable: 'Autonomous agent pipelines executed and verified.',
  },
  {
    title: '04. The Midnight Creation Season',
    time: '00:00 – 03:30',
    description: 'When the world is quiet: music generation, generative art, and expansive creative exploration.',
    deliverable: 'AI music tracks, creative writing, and next-generation product prototypes.',
  },
]

export default function MentalModelsView() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'systems' | 'leverage' | 'mindset'>('all')
  const shouldReduceMotion = useReducedMotion()

  const filteredModels = activeCategory === 'all' 
    ? mentalModels 
    : mentalModels.filter((m) => m.category === activeCategory)

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* ── Hero Section ── */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 mb-6"
        >
          <Brain className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-300">Cognitive Operating System</span>
        </motion.div>

        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6"
        >
          The 8 Sovereign <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
            Mental Models
          </span>
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-white/60 leading-relaxed"
        >
          The instrument is only as capable as the mind wielding it. These are the battle-tested principles, cognitive frameworks, and peak performance protocols for architects operating in Godmode.
        </motion.p>
      </div>

      {/* ── Category Filter Tabs ── */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl gap-1">
          {[
            { id: 'all', label: 'All Models' },
            { id: 'systems', label: 'Systems & Architecture' },
            { id: 'leverage', label: 'Leverage & Payoffs' },
            { id: 'mindset', label: 'Mindset & Mastery' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeCategory === tab.id
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-semibold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Models Grid ── */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-24">
        <AnimatePresence mode="popLayout">
          {filteredModels.map((model, index) => {
            const Icon = model.icon
            return (
              <motion.div
                key={model.id}
                layout
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <GlowCard color={model.accentColor} className="p-6 sm:p-8 h-full flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="text-xs font-mono font-bold text-white/40 tracking-wider">
                          MODEL // {model.number}
                        </span>
                      </div>
                      <span className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">
                        {model.category}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {model.title}
                    </h2>
                    <p className="text-sm font-medium text-emerald-400/90 mb-4">
                      {model.tagline}
                    </p>

                    <p className="text-sm text-white/60 leading-relaxed mb-6">
                      {model.description}
                    </p>

                    {/* Applications */}
                    <div className="space-y-3 mb-6 pt-4 border-t border-white/5">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-wider text-white/40 mb-1">
                          Architectural Application:
                        </p>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                          {model.architecturalApplication}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-mono uppercase tracking-wider text-white/40 mb-1">
                          Operational Protocol:
                        </p>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                          {model.operationalProtocol}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs italic text-white/50 font-serif">
                    &ldquo;{model.quote}&rdquo;
                  </div>
                </GlowCard>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* ── Peak Performance Operating Protocols ── */}
      <section className="py-16 border-t border-white/5 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-400/60 font-medium mb-3">
            Daily Execution Cadence
          </p>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
            Peak Performance Operating Protocols
          </h2>
          <p className="text-sm text-white/50">
            How an AI Architect structures time, energy, and execution bandwidth to sustain elite output without burnout.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {peakProtocols.map((proto, i) => (
            <motion.div
              key={proto.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlowCard color="cyan" className="p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{proto.time}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {proto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed mb-4">
                    {proto.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 text-xs text-emerald-400/80 font-medium">
                  → {proto.deliverable}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Dual-Engine Action CTA ── */}
      <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-emerald-500/20 bg-gradient-to-b from-emerald-500/10 via-black/40 to-black/80 text-center max-w-4xl mx-auto">
        <div className="relative z-10 space-y-6">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-mono">
            Execute in Godmode
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Pair the Mind with the Instrument
          </h2>
          <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed">
            Mental models provide the clarity. Our modular business starter kits and autonomous swarms provide the leverage. Build your sovereign business today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-semibold text-black text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
            >
              Explore Business Starter Kits
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/acos"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all"
            >
              Agentic Creator OS
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
