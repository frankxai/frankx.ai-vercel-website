'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import {
  ArrowRight,
  Brain,
  Building,
  Workflow,
  Shield,
  Scale,
  Lightbulb,
  Target,
  Layers,
  Network,
  CheckCircle2,
  Sparkles,
  GitBranch,
  Boxes,
  Server,
  Cloud,
  ExternalLink,
  Play,
  Gamepad2,
  Palette,
} from 'lucide-react'

// Dynamic import for ArchitectureDiagram to avoid SSR issues with ReactFlow
const ArchitectureDiagram = dynamic(
  () => import('@/components/ai-architecture/ArchitectureDiagram').then((mod) => mod.ArchitectureDiagram),
  { ssr: false, loading: () => <DiagramLoadingPlaceholder /> }
)

function DiagramLoadingPlaceholder() {
  return (
    <div className="h-[500px] rounded-2xl border border-white/10 bg-slate-900/80 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
        <p className="text-slate-500 text-sm">Loading architecture diagram...</p>
      </div>
    </div>
  )
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

function MethodologyBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0b]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <motion.div
        className="absolute -right-60 top-20 h-[600px] w-[600px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
        }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

const methodology = {
  principles: [
    {
      icon: Target,
      title: 'Business-First Design',
      description:
        'Start with business outcomes, not technology. Every architecture decision maps directly to measurable business value and ROI.',
    },
    {
      icon: Scale,
      title: 'Cloud-Agnostic Patterns',
      description:
        'Design patterns that work across AWS, GCP, Azure, and OCI. Avoid vendor lock-in while leveraging platform strengths.',
    },
    {
      icon: Shield,
      title: 'Security by Default',
      description:
        'Security is foundational, not an afterthought. Every component includes guardrails, governance, and compliance considerations.',
    },
    {
      icon: Lightbulb,
      title: 'Pragmatic Innovation',
      description:
        'Balance cutting-edge capabilities with production stability. Know when to adopt new tech and when to use proven solutions.',
    },
  ],
  phases: [
    {
      number: '01',
      title: 'Discovery & Assessment',
      description: 'Deep dive into business context, existing systems, and constraints',
      activities: [
        'Stakeholder interviews and requirements gathering',
        'Current state architecture analysis',
        'Data landscape mapping',
        'Security and compliance requirements',
        'Success metrics definition',
      ],
    },
    {
      number: '02',
      title: 'Pattern Selection',
      description: 'Match use cases to battle-tested enterprise AI patterns',
      activities: [
        'Use case categorization',
        'Pattern applicability analysis',
        'Trade-off evaluation',
        'Technology stack selection',
        'Proof of concept scoping',
      ],
    },
    {
      number: '03',
      title: 'Architecture Design',
      description: 'Create detailed blueprints with implementation guidance',
      activities: [
        'Component architecture diagrams',
        'Data flow modeling',
        'Integration specifications',
        'Cost estimation and optimization',
        'Scalability planning',
      ],
    },
    {
      number: '04',
      title: 'Implementation Planning',
      description: 'Phase execution with clear milestones and deliverables',
      activities: [
        'Sprint breakdown and sequencing',
        'Resource allocation',
        'Risk mitigation strategies',
        'Testing and validation plans',
        'Rollout and monitoring setup',
      ],
    },
  ],
  patterns: [
    {
      icon: Shield,
      name: 'AI Gateway',
      description: 'Centralized LLM access with rate limiting, caching, and cost control',
    },
    {
      icon: Layers,
      name: 'RAG Production',
      description: 'Enterprise knowledge retrieval with vector databases and chunking strategies',
    },
    {
      icon: Network,
      name: 'Multi-Agent',
      description: 'Coordinated AI agents for complex workflows with handoff protocols',
    },
    {
      icon: Server,
      name: 'MCP Servers',
      description: 'Model Context Protocol for standardized tool and resource integration',
    },
    {
      icon: GitBranch,
      name: 'LLMOps',
      description: 'Evaluation, monitoring, and continuous improvement pipelines',
    },
    {
      icon: Boxes,
      name: 'AI Center of Excellence',
      description: 'Governance frameworks, templates, and organizational enablement',
    },
  ],
}

function PrincipleCard({
  principle,
  index,
}: {
  principle: (typeof methodology.principles)[0]
  index: number
}) {
  const Icon = principle.icon
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/10"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400 transition-all group-hover:scale-110">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{principle.title}</h3>
      <p className="text-sm text-slate-400">{principle.description}</p>
    </motion.div>
  )
}

function PhaseCard({
  phase,
  index,
}: {
  phase: (typeof methodology.phases)[0]
  index: number
}) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="relative"
    >
      {index < methodology.phases.length - 1 && (
        <div className="absolute left-8 top-16 h-full w-px bg-gradient-to-b from-cyan-500/50 to-transparent" />
      )}
      <div className="group flex gap-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-2xl font-bold text-cyan-400 transition-all group-hover:border-cyan-500/50 group-hover:bg-cyan-500/20">
          {phase.number}
        </div>
        <div className="flex-1 pb-12">
          <h3 className="mb-2 text-xl font-bold text-white">{phase.title}</h3>
          <p className="mb-4 text-slate-400">{phase.description}</p>
          <ul className="space-y-2">
            {phase.activities.map((activity, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500/70" />
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default function AIArchitectClient() {
  return (
    <>
      <MethodologyBackground />
      <main className="relative min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          {/* Codex — AI Architect character accent */}
          <div className="pointer-events-none absolute right-6 top-24 hidden w-52 opacity-15 lg:block xl:w-64">
            <Image src="/images/team/codex-falcon.png" alt="" width={256} height={256} className="object-contain" aria-hidden="true" />
          </div>
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                <Brain className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                AI Architecture Methodology
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Enterprise AI Architecture
              <span className="block bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                That Actually Ships
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 max-w-2xl text-lg text-slate-400"
            >
              A battle-tested methodology for designing production AI systems. From enterprise architecture experience
              building solutions across AWS, GCP, Azure, and OCI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/ai-architect-academy"
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
              >
                <Building className="h-4 w-4" />
                AI Architect Academy
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/prototypes"
                className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
              >
                <Layers className="h-4 w-4" />
                View Prototypes
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-white">Core Principles</h2>
              <p className="mx-auto max-w-2xl text-slate-400">
                Four foundational principles that guide every architecture decision
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {methodology.principles.map((principle, index) => (
                <PrincipleCard key={principle.title} principle={principle} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Methodology Phases */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="mb-4 flex items-center gap-2">
                <Workflow className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-medium uppercase tracking-wider text-cyan-400">
                  The Process
                </span>
              </div>
              <h2 className="mb-4 text-3xl font-bold text-white">Architecture Methodology</h2>
              <p className="max-w-2xl text-slate-400">
                A structured four-phase approach that transforms business requirements into production-ready
                AI architectures
              </p>
            </motion.div>

            <div className="space-y-0">
              {methodology.phases.map((phase, index) => (
                <PhaseCard key={phase.number} phase={phase} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Pattern Library Preview */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 flex items-end justify-between"
            >
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-violet-400" />
                  <span className="text-sm font-medium uppercase tracking-wider text-violet-400">
                    Pattern Library
                  </span>
                </div>
                <h2 className="mb-4 text-3xl font-bold text-white">Battle-Tested Patterns</h2>
                <p className="max-w-xl text-slate-400">
                  20+ enterprise patterns refined through real-world implementations
                </p>
              </div>
              <Link
                href="/ai-architect-academy"
                className="hidden items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 sm:flex"
              >
                View all patterns
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {methodology.patterns.map((pattern, index) => {
                const Icon = pattern.icon
                return (
                  <motion.div
                    key={pattern.name}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="group rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all hover:border-white/20 hover:bg-white/[0.04]"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-all group-hover:bg-violet-500/20 group-hover:text-violet-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-1 font-semibold text-white">{pattern.name}</h3>
                    <p className="text-sm text-slate-500">{pattern.description}</p>
                  </motion.div>
                )
              })}
            </motion.div>

            <Link
              href="/ai-architect-academy"
              className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 sm:hidden"
            >
              View all patterns
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Real Architectures Showcase */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <div className="mb-4 flex items-center justify-center gap-2">
                <Play className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-medium uppercase tracking-wider text-emerald-400">
                  Live Examples
                </span>
              </div>
              <h2 className="mb-4 text-3xl font-bold text-white">Real Architecture Designs</h2>
              <p className="mx-auto max-w-2xl text-slate-400">
                Explore interactive architecture diagrams from actual production systems.
                Drag nodes to understand component relationships.
              </p>
            </motion.div>

            {/* FrankX.AI Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30">
                    <Palette className="h-6 w-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">FrankX.AI Content Platform</h3>
                    <p className="text-sm text-slate-400">AI-powered content creation and publishing system</p>
                  </div>
                </div>
                <Link
                  href="/prototype/frankx-ai-platform"
                  className="hidden items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-400 transition-all hover:border-violet-500/50 hover:bg-violet-500/20 sm:flex"
                >
                  View Prototype
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <ArchitectureDiagram
                    preset="frankxAI"
                    title="FrankX.AI Architecture"
                    className="h-[520px]"
                  />
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                    <h4 className="mb-3 font-semibold text-white">Key Components</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                        <span><strong className="text-white">Claude Code</strong> - AI content generation with Opus/Sonnet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                        <span><strong className="text-white">15+ MCP Servers</strong> - Publishing, SEO, social tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span><strong className="text-white">Voice Synthesis</strong> - ElevenLabs integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                        <span><strong className="text-white">Vercel Edge</strong> - Next.js 16 deployment</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                    <h4 className="mb-2 font-semibold text-emerald-400">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Next.js 16', 'Claude AI', 'MCP', 'Neon Postgres', 'Vercel', 'ElevenLabs'].map((tech) => (
                        <span key={tech} className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Arcanea Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 border border-rose-500/30">
                    <Gamepad2 className="h-6 w-6 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Arcanea Game Platform</h3>
                    <p className="text-sm text-slate-400">AI-driven narrative game with dynamic world generation</p>
                  </div>
                </div>
                <Link
                  href="/prototype/arcanea-game-engine"
                  className="hidden items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-400 transition-all hover:border-rose-500/50 hover:bg-rose-500/20 sm:flex"
                >
                  View Prototype
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <ArchitectureDiagram
                    preset="arcanea"
                    title="Arcanea Game Architecture"
                    className="h-[520px]"
                  />
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                    <h4 className="mb-3 font-semibold text-white">Key Components</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                        <span><strong className="text-white">AI Narrator</strong> - Claude Opus for dynamic storytelling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                        <span><strong className="text-white">Realm Manager</strong> - State machine world control</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                        <span><strong className="text-white">Quest Engine</strong> - Dynamic quest generation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                        <span><strong className="text-white">Music Generator</strong> - Suno AI integration</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5">
                    <h4 className="mb-2 font-semibold text-rose-400">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Phaser/Unity', 'Claude Opus', 'Vector DB', 'Redis', 'Suno AI', 'Web3'].map((tech) => (
                        <span key={tech} className="rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-xs text-rose-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* View More CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Link
                href="/prototypes"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
              >
                <Layers className="h-4 w-4" />
                Explore All Prototypes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Multi-Cloud Section */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 md:p-12"
            >
              <div className="flex flex-col items-center gap-8 md:flex-row">
                <div className="flex-1">
                  <div className="mb-4 flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-cyan-400" />
                    <span className="text-sm font-medium uppercase tracking-wider text-cyan-400">
                      Multi-Cloud Expertise
                    </span>
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                    Cloud-Agnostic Architecture
                  </h2>
                  <p className="mb-6 text-slate-400">
                    Every pattern is designed to work across major cloud providers. Understand the trade-offs,
                    leverage platform strengths, and avoid vendor lock-in.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['AWS', 'GCP', 'Azure', 'OCI'].map((cloud) => (
                      <span
                        key={cloud}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300"
                      >
                        {cloud}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-3">
                  <Link
                    href="/ai-architect/multi-cloud-comparison"
                    className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 font-medium text-cyan-400 transition-all hover:border-cyan-500/50 hover:bg-cyan-500/20"
                  >
                    Multi-Cloud Comparison
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="https://github.com/frankxai/ai-architect-academy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-medium text-slate-300 transition-all hover:bg-white/5"
                  >
                    View on GitHub
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold text-white">Ready to Architect Your AI Future?</h2>
              <p className="mb-8 text-slate-400">
                Explore the full AI Architect Academy with 80+ skills, 20+ patterns, and 13 learning paths.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/ai-architect-academy"
                  className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-8 py-4 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/25"
                >
                  Enter the Academy
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-medium text-white transition-all hover:bg-white/10"
                >
                  Work With Frank
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
