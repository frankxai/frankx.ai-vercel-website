'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Boxes,
  Layers,
  Network,
  Shield,
  Database,
  Server,
  Cloud,
  Building,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Zap,
  Globe,
} from 'lucide-react'

// Architecture showcase data
const architectures = [
  {
    id: 'enterprise-rag',
    title: 'Enterprise RAG Platform',
    subtitle: 'Multi-tenant knowledge retrieval system',
    description:
      'Production-grade RAG architecture with vector databases, intelligent chunking, and hybrid search. Handles 1M+ documents with sub-second retrieval.',
    category: 'Knowledge Management',
    cloudProviders: ['AWS', 'GCP'],
    metrics: {
      documents: '1M+',
      latency: '<500ms',
      accuracy: '94%',
    },
    technologies: ['Pinecone', 'OpenAI', 'LangChain', 'FastAPI'],
    image: '/images/architectures/rag-platform.png',
    color: 'emerald',
    prototypeSlug: 'enterprise-rag-platform',
  },
  {
    id: 'multi-agent-orchestrator',
    title: 'Multi-Agent Code Assistant',
    subtitle: 'Coordinated AI agents for development workflows',
    description:
      'Intelligent agent orchestration for code review, testing, and deployment. Features handoff protocols, shared memory, and quality gates.',
    category: 'Developer Tools',
    cloudProviders: ['AWS', 'OCI'],
    metrics: {
      agents: '8',
      tasks: '50k/day',
      accuracy: '97%',
    },
    technologies: ['Claude', 'LangGraph', 'Redis', 'GitHub'],
    image: '/images/architectures/multi-agent.png',
    color: 'cyan',
    prototypeSlug: 'multi-agent-code-assistant',
  },
  {
    id: 'ai-gateway',
    title: 'Enterprise AI Gateway',
    subtitle: 'Centralized LLM access and governance',
    description:
      'Unified gateway for multiple LLM providers with rate limiting, caching, cost attribution, and compliance controls.',
    category: 'Infrastructure',
    cloudProviders: ['Multi-Cloud'],
    metrics: {
      requests: '10M/day',
      savings: '40%',
      uptime: '99.99%',
    },
    technologies: ['Kong', 'Redis', 'OpenAI', 'Anthropic'],
    image: '/images/architectures/ai-gateway.png',
    color: 'violet',
    prototypeSlug: null,
  },
  {
    id: 'llmops-pipeline',
    title: 'LLMOps Pipeline',
    subtitle: 'Continuous evaluation and improvement',
    description:
      'End-to-end pipeline for model evaluation, prompt versioning, A/B testing, and production monitoring with drift detection.',
    category: 'MLOps',
    cloudProviders: ['GCP', 'Azure'],
    metrics: {
      evals: '1000/day',
      prompts: '500+',
      coverage: '95%',
    },
    technologies: ['Weights & Biases', 'LangSmith', 'Prometheus', 'dbt'],
    image: '/images/architectures/llmops.png',
    color: 'rose',
    prototypeSlug: null,
  },
  {
    id: 'mcp-hub',
    title: 'MCP Server Hub',
    subtitle: 'Model Context Protocol ecosystem',
    description:
      'Centralized MCP server management with tool registry, authentication, and monitoring for Claude Code and other AI assistants.',
    category: 'AI Infrastructure',
    cloudProviders: ['OCI', 'AWS'],
    metrics: {
      servers: '25+',
      tools: '150+',
      daily: '100k calls',
    },
    technologies: ['Claude', 'MCP', 'PostgreSQL', 'Docker'],
    image: '/images/architectures/mcp-hub.png',
    color: 'orange',
    prototypeSlug: null,
  },
  {
    id: 'ai-coe',
    title: 'AI Center of Excellence',
    subtitle: 'Enterprise AI governance framework',
    description:
      'Complete organizational framework for AI governance including templates, policies, training programs, and measurement systems.',
    category: 'Governance',
    cloudProviders: ['Multi-Cloud'],
    metrics: {
      templates: '50+',
      policies: '30+',
      teams: '100+',
    },
    technologies: ['Confluence', 'Jira', 'Custom Dashboards'],
    image: '/images/architectures/ai-coe.png',
    color: 'blue',
    prototypeSlug: null,
  },
]

const colorMap: Record<string, { bg: string; border: string; badge: string; glow: string }> = {
  emerald: {
    bg: 'from-emerald-500/10 to-emerald-600/5',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    badge: 'bg-emerald-500/20 text-emerald-400',
    glow: 'group-hover:shadow-emerald-500/10',
  },
  cyan: {
    bg: 'from-cyan-500/10 to-cyan-600/5',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    badge: 'bg-cyan-500/20 text-cyan-400',
    glow: 'group-hover:shadow-cyan-500/10',
  },
  violet: {
    bg: 'from-violet-500/10 to-violet-600/5',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    badge: 'bg-violet-500/20 text-violet-400',
    glow: 'group-hover:shadow-violet-500/10',
  },
  rose: {
    bg: 'from-rose-500/10 to-rose-600/5',
    border: 'border-rose-500/20 hover:border-rose-500/40',
    badge: 'bg-rose-500/20 text-rose-400',
    glow: 'group-hover:shadow-rose-500/10',
  },
  orange: {
    bg: 'from-orange-500/10 to-orange-600/5',
    border: 'border-orange-500/20 hover:border-orange-500/40',
    badge: 'bg-orange-500/20 text-orange-400',
    glow: 'group-hover:shadow-orange-500/10',
  },
  blue: {
    bg: 'from-blue-500/10 to-blue-600/5',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    badge: 'bg-blue-500/20 text-blue-400',
    glow: 'group-hover:shadow-blue-500/10',
  },
}

function ArchitecturesBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      {/* Hexagonal pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 15v22L30 52 0 37V15z' fill='none' stroke='%2306b6d4' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 52px',
        }}
      />
      <motion.div
        className="absolute -left-60 top-40 h-[600px] w-[600px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
        }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function ArchitectureCard({
  architecture,
  index,
}: {
  architecture: (typeof architectures)[0]
  index: number
}) {
  const colors = colorMap[architecture.color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div
        className={`relative flex h-full flex-col rounded-2xl border bg-gradient-to-br backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl ${colors.border} ${colors.bg} ${colors.glow}`}
      >
        {/* Image placeholder */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl bg-slate-900/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <Boxes className="h-16 w-16 text-white/10" />
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] to-transparent" />
          {/* Category badge */}
          <div className="absolute left-4 top-4">
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${colors.badge}`}>
              {architecture.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-1 text-xl font-bold text-white">{architecture.title}</h3>
          <p className="mb-3 text-sm text-slate-400">{architecture.subtitle}</p>
          <p className="mb-4 text-sm text-slate-500 line-clamp-3">{architecture.description}</p>

          {/* Metrics */}
          <div className="mb-4 grid grid-cols-3 gap-2">
            {Object.entries(architecture.metrics).map(([key, value]) => (
              <div key={key} className="text-center">
                <p className="text-lg font-bold text-white">{value}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-500">{key}</p>
              </div>
            ))}
          </div>

          {/* Technologies */}
          <div className="mb-4 flex flex-wrap gap-1">
            {architecture.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Cloud providers */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4 text-slate-500" />
              <span className="text-xs text-slate-500">
                {architecture.cloudProviders.join(' / ')}
              </span>
            </div>
            {architecture.prototypeSlug ? (
              <Link
                href={`/prototype/${architecture.prototypeSlug}`}
                className="flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-white"
              >
                View details
                <ArrowRight className="h-3 w-3" />
              </Link>
            ) : (
              <span className="text-xs text-slate-600">Coming soon</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function AIArchitecturesPage() {
  return (
    <>
      <ArchitecturesBackground />
      <main className="relative min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                <Boxes className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Architecture Gallery
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl"
            >
              Real-World
              <span className="block bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                AI Architectures
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 max-w-2xl text-lg text-slate-400"
            >
              Production architectures built for enterprise scale. Each showcases proven patterns, real metrics,
              and lessons learned from live deployments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/prototypes"
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
              >
                <Layers className="h-4 w-4" />
                Browse Prototypes
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/ai-architecture"
                className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
              >
                View Methodology
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-8 border-y border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                { icon: Boxes, value: architectures.length, label: 'Architectures' },
                { icon: Globe, value: '4', label: 'Cloud Providers' },
                { icon: Zap, value: '50M+', label: 'Requests/Day' },
                { icon: CheckCircle2, value: '99.9%', label: 'Avg Uptime' },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-slate-500">{stat.label}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Architecture Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Featured Architectures</h2>
              <span className="text-sm text-slate-500">{architectures.length} total</span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {architectures.map((architecture, index) => (
                <ArchitectureCard key={architecture.id} architecture={architecture} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Sparkles className="mx-auto mb-4 h-8 w-8 text-violet-400" />
              <h2 className="mb-4 text-2xl font-bold text-white">How These Are Built</h2>
              <p className="mb-8 mx-auto max-w-2xl text-slate-400">
                Every architecture follows the AI Architect methodology: business-first design, cloud-agnostic
                patterns, security by default, and pragmatic innovation.
              </p>
              <Link
                href="/ai-architecture"
                className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-6 py-3 font-medium text-violet-400 transition-all hover:border-violet-500/50 hover:bg-violet-500/20"
              >
                Explore the Methodology
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-2xl font-bold text-white">Need a Custom Architecture?</h2>
              <p className="mb-8 text-slate-400">
                Work with an experienced AI Architect to design production-ready solutions for your specific needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-8 py-4 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  Get in Touch
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://github.com/frankxai/ai-architect-academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-medium text-white transition-all hover:bg-white/10"
                >
                  Open Source Patterns
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
