'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Network,
  Layers,
  Shield,
  Code2,
  BookOpen,
  Workflow,
  Database,
  Server,
  GitBranch,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Bot,
  GraduationCap,
  Building,
} from 'lucide-react'
import dynamic from 'next/dynamic'

const Hero3D = dynamic(
  () => import('@/components/ai-architecture/Hero3D').then((mod) => mod.Hero3D),
  { ssr: false, loading: () => <div className="w-full h-full bg-[#030712]" /> }
)

// Premium animated background
function AcademyBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Architecture grid pattern */}
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

      {/* Gradient orbs */}
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
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          y: [0, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// Feature badges for tech stack
const techBadges = [
  { name: 'RAG', color: 'from-emerald-500 to-green-500' },
  { name: 'Multi-Agent', color: 'from-violet-500 to-purple-500' },
  { name: 'MCP Servers', color: 'from-orange-500 to-amber-500' },
  { name: 'LLMOps', color: 'from-cyan-500 to-blue-500' },
  { name: 'AI Gateway', color: 'from-rose-500 to-pink-500' },
]

// Cloud provider badges
const cloudProviders = [
  { name: 'AWS', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  { name: 'GCP', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { name: 'Azure', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
  { name: 'OCI', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
]

// Pattern highlights
const patterns = [
  {
    icon: Shield,
    title: 'AI Gateway Pattern',
    description: 'Unified access, authentication, rate limiting, and observability for all AI services.',
    href: '/ai-architect-academy/patterns#ai-gateway',
    color: 'violet',
  },
  {
    icon: Database,
    title: 'RAG Production',
    description: 'Enterprise document Q&A with vector search, retrieval, and source citations.',
    href: '/ai-architect-academy/patterns#rag-production',
    color: 'emerald',
  },
  {
    icon: Network,
    title: 'Multi-Agent Orchestration',
    description: 'Coordinate specialized agents for complex, autonomous workflows.',
    href: '/ai-architect-academy/patterns#multi-agent',
    color: 'cyan',
  },
  {
    icon: Server,
    title: 'MCP Servers',
    description: 'Standardized tool integration with Model Context Protocol.',
    href: '/ai-architect-academy/patterns#mcp',
    color: 'orange',
  },
]

// Learning paths preview
const learningPaths = [
  {
    title: 'AI Architecture Foundations',
    duration: '2 weeks',
    difficulty: 'Beginner',
    color: 'emerald',
  },
  {
    title: 'RAG Mastery',
    duration: '4 weeks',
    difficulty: 'Intermediate',
    color: 'blue',
  },
  {
    title: 'Multi-Agent Systems',
    duration: '4 weeks',
    difficulty: 'Advanced',
    color: 'violet',
  },
  {
    title: 'Claude Code Mastery',
    duration: '3 weeks',
    difficulty: 'Intermediate',
    color: 'orange',
  },
]

const colorMap = {
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    icon: 'bg-violet-500/20 text-violet-400',
    text: 'text-violet-400',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'bg-emerald-500/20 text-emerald-400',
    text: 'text-emerald-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20 hover:border-orange-500/40',
    icon: 'bg-orange-500/20 text-orange-400',
    text: 'text-orange-400',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    icon: 'bg-blue-500/20 text-blue-400',
    text: 'text-blue-400',
  },
}

export default function AIArchitectAcademyPage() {
  return (
    <>
      <AcademyBackground />
      <main className="relative min-h-screen">
        {/* Hero Section with 3D */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* 3D Background */}
          <div className="absolute inset-0 -z-5">
            <Hero3D height="h-full" className="opacity-60" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                <Building className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                AI Architect Academy
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Become an
              <span className="mt-2 block bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                AI Architect.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              Master enterprise AI patterns, Claude Code skills, and production architectures.
              80+ skills, 20+ battle-tested patterns, and 13 learning paths from an Oracle AI Architect.
            </motion.p>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 flex flex-wrap gap-3"
            >
              {techBadges.map((badge) => (
                <span
                  key={badge.name}
                  className={`rounded-full bg-gradient-to-r ${badge.color} px-4 py-1.5 text-sm font-medium text-white/90`}
                >
                  {badge.name}
                </span>
              ))}
            </motion.div>

            {/* Cloud providers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mb-10 flex flex-wrap items-center gap-2"
            >
              <span className="text-sm text-slate-500">Multi-cloud:</span>
              {cloudProviders.map((provider) => (
                <span
                  key={provider.name}
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${provider.color}`}
                >
                  {provider.name}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="https://github.com/frankxai/ai-architect-academy"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
              >
                <GitBranch className="h-5 w-5" />
                Explore on GitHub
                <ExternalLink className="h-4 w-4 text-slate-500" />
              </a>
              <Link
                href="/prototypes"
                className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
              >
                <Layers className="h-5 w-5" />
                View Prototypes
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: '80+', label: 'Claude Skills', sublabel: 'Ready to use' },
                { value: '20+', label: 'Design Patterns', sublabel: 'Enterprise-grade' },
                { value: '13', label: 'Learning Paths', sublabel: 'Structured curriculum' },
                { value: 'Free', label: 'Open Source', sublabel: 'MIT License' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl font-bold text-white md:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-white/60">{stat.label}</p>
                  <p className="text-xs text-white/40">{stat.sublabel}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Patterns Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <span className="mb-4 inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400">
                Pattern Library
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Battle-Tested Patterns
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                Enterprise AI architecture patterns from real-world deployments. Each pattern includes problem, solution, tradeoffs, and implementation guidance.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {patterns.map((pattern, i) => {
                const colors = colorMap[pattern.color as keyof typeof colorMap]
                const Icon = pattern.icon

                return (
                  <motion.div
                    key={pattern.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div
                      className={`relative flex h-full flex-col rounded-2xl border ${colors.border} ${colors.bg} p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                    >
                      <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${colors.icon}`}>
                        <Icon className="h-7 w-7" />
                      </div>

                      <h3 className="mb-3 text-xl font-bold text-white">{pattern.title}</h3>
                      <p className="mb-6 flex-1 text-slate-400">{pattern.description}</p>

                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-sm font-medium">Learn pattern</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 text-center"
            >
              <a
                href="https://github.com/frankxai/ai-architect-academy/tree/main/01-design-patterns"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300"
              >
                View all 20+ patterns on GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Learning Paths Section */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
                Learning Paths
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Structured Learning
              </h2>
              <p className="max-w-2xl text-lg text-slate-400">
                13 comprehensive learning paths from beginner to expert. Start with foundations, progress to advanced multi-agent systems.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {learningPaths.map((path, i) => {
                const colors = colorMap[path.color as keyof typeof colorMap]

                return (
                  <motion.div
                    key={path.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`rounded-xl border ${colors.border} ${colors.bg} p-6 backdrop-blur-sm`}
                  >
                    <GraduationCap className={`mb-4 h-6 w-6 ${colors.text}`} />
                    <h3 className="mb-2 font-semibold text-white">{path.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <span>{path.duration}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-600" />
                      <span>{path.difficulty}</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 text-center"
            >
              <a
                href="https://github.com/frankxai/ai-architect-academy/tree/main/02-learning-paths"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                Explore all 13 learning paths
                <ExternalLink className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
                  Claude Code Skills
                </span>
                <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
                  80+ Ready-to-Use Skills
                </h2>
                <p className="mb-8 text-lg text-slate-400">
                  Comprehensive Claude Code skills covering MCP servers, agent development, cloud services, and automation.
                  Drop them into your CLAUDE.md and start building.
                </p>

                <ul className="mb-8 space-y-3">
                  {[
                    'MCP Architecture & Development',
                    'Claude Agent SDK Patterns',
                    'LangGraph Workflow Design',
                    'Multi-Cloud AI Services (AWS, GCP, Azure, OCI)',
                    'Security & Governance',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://github.com/frankxai/ai-architect-academy/tree/main/claude-ai-architect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-500"
                >
                  Browse Skills Library
                  <ExternalLink className="h-4 w-4" />
                </a>
              </motion.div>

              {/* Code preview mockup */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-6 font-mono text-sm">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/60" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                    <div className="h-3 w-3 rounded-full bg-green-500/60" />
                    <span className="ml-2 text-xs text-slate-500">CLAUDE.md</span>
                  </div>
                  <pre className="text-slate-300 overflow-x-auto">
                    <code>{`# AI Architect Academy Skills

## Loaded Skills
- mcp-architecture
- claude-sdk
- langgraph-patterns
- oci-services-expert

## Commands
/prototype [use-case]
/ai-architecture-patterns

## Agent: AI Architect
- Enterprise architecture expertise
- Multi-cloud platform knowledge
- Pattern selection wisdom`}</code>
                  </pre>
                </div>

                {/* Floating badge */}
                <div className="absolute -right-4 -top-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  80+ Skills
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-10 text-center backdrop-blur-xl"
            >
              <Building className="mx-auto mb-6 h-12 w-12 text-violet-400" />
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                Start Building Today
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-slate-400">
                The AI Architect Academy is free and open source.
                Clone the repo, explore the patterns, and start shipping production AI architectures.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://github.com/frankxai/ai-architect-academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <GitBranch className="h-5 w-5" />
                  Clone Repository
                  <ExternalLink className="h-4 w-4 text-slate-500" />
                </a>
                <Link
                  href="/developers"
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  <Code2 className="h-5 w-5" />
                  Developer Hub
                </Link>
                <Link
                  href="/ai-architecture/multi-cloud-comparison"
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  <Workflow className="h-5 w-5" />
                  Multi-Cloud Research
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Future: AI Architect OS teaser */}
        <section className="py-12 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-sm text-slate-500">
                <Sparkles className="mr-2 inline h-4 w-4" />
                Coming soon: <span className="text-slate-400">AI Architect OS</span> -
                The complete system packaged for teams. Interactive guided wizard, templates, and more.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
