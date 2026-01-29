'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Zap,
  Brain,
  BarChart3,
  Code2,
  Layers,
  Shield,
  Sparkles,
  ChevronRight,
  Play,
  FileText,
  Mic,
  Image as ImageIcon,
  Database,
  Bot,
  GitBranch,
  Terminal,
  CheckCircle,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import dynamic from 'next/dynamic'

/**
 * Oracle AI World Showcase Page
 *
 * Demonstrates Oracle AI capabilities through:
 * - Hero: Signal → Insight → Action narrative
 * - Interactive ecosystem graph
 * - Architecture diagrams (Insurance, RAG, CX)
 * - Industry solutions gallery
 * - Oracle Code Assistant section
 * - CTA
 *
 * Design System: FrankX tech spectrum (cyan/emerald)
 * Analytics: PostHog tracking on all CTAs
 */

// Dynamic imports for heavy components
const EcosystemGraph = dynamic(
  () => import('@/components/ai-world/EcosystemGraph').then((m) => m.EcosystemGraph),
  { ssr: false, loading: () => <GraphSkeleton /> }
)
const ArchitectureDiagram = dynamic(
  () => import('@/components/ai-world/ArchitectureDiagram').then((m) => m.ArchitectureDiagram),
  { ssr: false, loading: () => <DiagramSkeleton /> }
)
const IndustryPacksGallery = dynamic(
  () => import('@/components/ai-world/IndustryPackCard').then((m) => m.IndustryPacksGallery),
  { ssr: false }
)

// Skeleton components
function GraphSkeleton() {
  return (
    <div className="w-full h-[500px] rounded-2xl bg-slate-800/50 animate-pulse flex items-center justify-center">
      <div className="text-slate-500">Loading ecosystem graph...</div>
    </div>
  )
}

function DiagramSkeleton() {
  return (
    <div className="w-full h-[400px] rounded-2xl bg-slate-800/50 animate-pulse flex items-center justify-center">
      <div className="text-slate-500">Loading architecture diagram...</div>
    </div>
  )
}

// PostHog tracking
declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void
    }
  }
}

const trackClick = (label: string, href: string, type: string) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture('ai_world_click', {
      label,
      href,
      type,
      page: 'ai-world',
    })
  }
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// Hero pillars data
const heroPillars = [
  {
    icon: Zap,
    label: 'SIGNAL',
    title: 'Capture Everything',
    description: 'Documents, images, audio, and structured data flow into the platform',
    color: '#F57C00',
  },
  {
    icon: Brain,
    label: 'INSIGHT',
    title: 'AI Synthesizes Meaning',
    description: 'GenAI, RAG, and multi-agent systems extract actionable intelligence',
    color: '#7B1FA2',
  },
  {
    icon: BarChart3,
    label: 'ACTION',
    title: 'Drive Business Outcomes',
    description: 'Structured outputs trigger workflows, decisions, and automation',
    color: '#1976D2',
  },
]

// Architecture showcase data
const architectureShowcases = [
  {
    key: 'insurance' as const,
    title: 'Insurance Claims Automation',
    description: 'Process multimodal claims with AI-powered fraud detection and damage assessment. From crash photos to structured reports.',
    imagePath: '/images/ai-world/insurance-claims-architecture.png',
    stats: [
      { label: 'Processing Time', value: '< 30s' },
      { label: 'Accuracy', value: '97.3%' },
      { label: 'Cost Reduction', value: '60%' },
    ],
  },
  {
    key: 'rag' as const,
    title: 'Agentic RAG Report Generator',
    description: 'Multi-document research with automated citation, cross-referencing, and executive summary generation.',
    imagePath: '/images/ai-world/agentic-rag-architecture.png',
    stats: [
      { label: 'Context Window', value: '256K' },
      { label: 'Source Attribution', value: '100%' },
      { label: 'Report Generation', value: '< 2min' },
    ],
  },
  {
    key: 'cx' as const,
    title: 'CX Conversation Intelligence',
    description: 'Real-time sentiment analysis, customer intent classification, and conversation summarization at scale.',
    imagePath: '/images/ai-world/cx-conversation-architecture.png',
    stats: [
      { label: 'Languages', value: '40+' },
      { label: 'Sentiment Accuracy', value: '94%' },
      { label: 'Real-time', value: 'Yes' },
    ],
  },
]

// OCA capabilities
const ocaCapabilities = [
  {
    icon: GitBranch,
    title: 'Scan Repository Assets',
    description: 'Instantly discover and catalog AI components across your codebase',
  },
  {
    icon: Layers,
    title: 'Generate Industry Packs',
    description: 'Auto-create vertical solutions from existing building blocks',
  },
  {
    icon: Code2,
    title: 'Create Custom Schemas',
    description: 'Domain-specific data models tailored to your industry',
  },
  {
    icon: FileText,
    title: 'Auto-Generate Runbooks',
    description: 'Documentation and demo scripts created automatically',
  },
]

export default function AIWorldPage() {
  const [activeArchitecture, setActiveArchitecture] = useState<'insurance' | 'rag' | 'cx'>('insurance')
  const activeShowcase = architectureShowcases.find((s) => s.key === activeArchitecture)!

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Aurora background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C74634]/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7B1FA2]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1976D2]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-white/10">
        <motion.div
          className="mx-auto max-w-7xl px-6 py-20 lg:py-28"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C74634]/20 border border-[#C74634]/30 text-xs font-bold tracking-wider text-[#C74634]">
              <Sparkles className="w-3.5 h-3.5" />
              ORACLE AI WORLD
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            <span className="text-white">From </span>
            <span className="bg-gradient-to-r from-[#F57C00] via-[#C74634] to-[#7B1FA2] bg-clip-text text-transparent">Signal</span>
            <span className="text-white"> to </span>
            <span className="bg-gradient-to-r from-[#7B1FA2] to-[#1976D2] bg-clip-text text-transparent">Action</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-center text-lg text-slate-300 max-w-3xl mx-auto mb-12"
          >
            Oracle AI transforms unstructured chaos into structured intelligence.
            See how enterprise AI workflows process documents, images, and audio
            to drive real business outcomes.
          </motion.p>

          {/* Hero Pillars */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {heroPillars.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.label}
                  className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  {/* Connector line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
                  )}

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${pillar.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: pillar.color }} />
                  </div>

                  <div
                    className="text-xs font-bold tracking-wider mb-2"
                    style={{ color: pillar.color }}
                  >
                    {pillar.label}
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {pillar.description}
                  </p>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </header>

      <main className="relative">
        {/* Ecosystem Graph Section */}
        <section className="py-20 px-6 border-b border-white/10">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Oracle AI Ecosystem
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Interactive visualization of the end-to-end AI platform. Drag nodes to explore
                how data flows from sources through processing, AI services, and into actionable outputs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <EcosystemGraph />
            </motion.div>
          </div>
        </section>

        {/* Architecture Diagrams Section */}
        <section className="py-20 px-6 border-b border-white/10">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Production Architectures
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Real-world AI solutions built on Oracle Cloud Infrastructure.
                Each architecture demonstrates the Signal → Insight → Action pattern.
              </p>
            </motion.div>

            {/* Architecture Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {architectureShowcases.map((showcase) => (
                <button
                  key={showcase.key}
                  onClick={() => {
                    setActiveArchitecture(showcase.key)
                    trackClick(showcase.title, '#', 'architecture_tab')
                  }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeArchitecture === showcase.key
                      ? 'bg-[#C74634] text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {showcase.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Active Architecture Display */}
            <motion.div
              key={activeArchitecture}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-8 items-start"
            >
              {/* Diagram */}
              <div className="order-2 lg:order-1">
                <ArchitectureDiagram configKey={activeArchitecture} />

                {/* Stats */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {activeShowcase.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 text-center"
                    >
                      <div className="text-lg font-bold text-[#C74634]">{stat.value}</div>
                      <div className="text-xs text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Card + Image */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {activeShowcase.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    {activeShowcase.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-semibold text-[#C74634]">
                    <Play className="w-4 h-4" />
                    View Demo
                  </div>
                </div>

                {/* Architecture Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={activeShowcase.imagePath}
                    alt={activeShowcase.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Industry Packs Section */}
        <section className="py-20 px-6 border-b border-white/10">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Industry Solution Packs
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Pre-built vertical solutions that combine Oracle AI services with
                industry-specific workflows, schemas, and best practices.
              </p>
            </motion.div>

            <IndustryPacksGallery />
          </div>
        </section>

        {/* Oracle Code Assistant Section */}
        <section className="py-20 px-6 border-b border-white/10 bg-gradient-to-b from-transparent via-[#7B1FA2]/5 to-transparent">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7B1FA2]/20 border border-[#7B1FA2]/30 text-xs font-bold tracking-wider text-[#7B1FA2] mb-4">
                  <Terminal className="w-3.5 h-3.5" />
                  ORACLE CODE ASSISTANT
                </span>

                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Reuse the Repo Faster
                </h2>

                <p className="text-slate-300 mb-8 leading-relaxed">
                  Oracle Code Assistant accelerates how you discover, customize, and package
                  AI assets from the repository. Generate industry packs, create schemas, and
                  build runbooks in minutes, not days.
                </p>

                {/* Capabilities */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {ocaCapabilities.map((cap) => {
                    const Icon = cap.icon
                    return (
                      <div
                        key={cap.title}
                        className="p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <Icon className="w-5 h-5 text-[#7B1FA2] mb-2" />
                        <h4 className="text-sm font-semibold text-white mb-1">{cap.title}</h4>
                        <p className="text-xs text-slate-400">{cap.description}</p>
                      </div>
                    )
                  })}
                </div>

                <Link
                  href="https://www.oracle.com/application-development/code-assist/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick('Oracle Code Assistant', 'https://www.oracle.com/application-development/code-assist/', 'cta')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7B1FA2] text-white font-semibold hover:bg-[#6A1B8A] transition-colors"
                >
                  Explore Code Assistant
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Terminal Demo */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
                  {/* Terminal header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-white/10">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-slate-400">Oracle Code Assistant</span>
                  </div>

                  {/* Terminal content */}
                  <div className="p-4 font-mono text-sm space-y-3">
                    <div className="text-slate-400">
                      <span className="text-[#7B1FA2]">oca&gt;</span> find all insurance assets
                    </div>
                    <div className="text-emerald-400 pl-4">
                      Found 12 assets in ai/generative-ai-service/
                      <br />
                      - car-accident-report-generator
                      <br />
                      - car-insurance-chatbot
                      <br />
                      - fraud-detection-pipeline
                      <br />
                      <span className="text-slate-500">... and 9 more</span>
                    </div>

                    <div className="text-slate-400 pt-2">
                      <span className="text-[#7B1FA2]">oca&gt;</span> generate industry pack --vertical insurance
                    </div>
                    <div className="text-emerald-400 pl-4">
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Created: ai/industry-solutions/insurance/
                      <br />
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Generated: schema.json, runbook.md, demo-script.md
                    </div>

                    <div className="text-slate-400 pt-2">
                      <span className="text-[#7B1FA2]">oca&gt;</span> <span className="animate-pulse">_</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative p-8 sm:p-12 rounded-3xl overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C74634]/20 via-[#7B1FA2]/20 to-[#1976D2]/20" />
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />
              <div className="absolute inset-0 border border-white/10 rounded-3xl" />

              {/* Content */}
              <div className="relative text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Ready to Transform Your AI Strategy?
                </h2>
                <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                  Let&apos;s discuss how Oracle AI can accelerate your enterprise intelligence initiatives.
                  From proof-of-concept to production deployment.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    onClick={() => trackClick('Schedule Consultation', '/contact', 'cta_primary')}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#C74634] text-white font-semibold hover:bg-[#A13626] transition-colors"
                  >
                    Schedule Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/ai-architecture"
                    onClick={() => trackClick('View Blueprints', '/ai-architecture', 'cta_secondary')}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
                  >
                    View Architecture Blueprints
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How to Update Section */}
        <section className="py-12 px-6 border-t border-white/10">
          <div className="mx-auto max-w-3xl">
            <details className="group">
              <summary className="cursor-pointer list-none flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors">
                <ChevronRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
                <span className="text-sm font-semibold">How to Update Demos</span>
              </summary>
              <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 space-y-3">
                <p><strong>Architecture Images:</strong> Replace PNGs in <code className="px-1 py-0.5 rounded bg-white/10">public/images/ai-world/</code></p>
                <p><strong>Interactive Diagrams:</strong> Edit configs in <code className="px-1 py-0.5 rounded bg-white/10">components/ai-world/ArchitectureDiagram.tsx</code></p>
                <p><strong>Industry Packs:</strong> Update array in <code className="px-1 py-0.5 rounded bg-white/10">components/ai-world/IndustryPackCard.tsx</code></p>
                <p><strong>Ecosystem Graph:</strong> Modify nodes/edges in <code className="px-1 py-0.5 rounded bg-white/10">components/ai-world/EcosystemGraph.tsx</code></p>
              </div>
            </details>
          </div>
        </section>
      </main>
    </div>
  )
}
