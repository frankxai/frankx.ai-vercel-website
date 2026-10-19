'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Workflow,
  Globe,
  Megaphone,
  ChevronRight,
  ArrowRight,
  Cpu,
  Mail,
  Server,
  Music,
  Github,
  MessageSquare,
  Rss,
  FileText,
  ShoppingCart,
  Zap,
  BarChart3,
  BookOpen,
  Layers,
  Sparkles,
  Radio,
  Send,
  X,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'

// ── Background ──

function IntelligenceMapBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: '#0a0a0b' }} />
      <div
        className="absolute -left-60 top-20 h-[600px] w-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
      />
      <div
        className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
      />
      <div
        className="absolute left-1/3 bottom-0 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
      />
    </div>
  )
}

// ── Data ──

const stats = [
  { label: 'Repositories', value: '100+' },
  { label: 'Workflows', value: '47' },
  { label: 'Skills', value: '500+' },
  { label: 'Pages', value: '244' },
  { label: 'Blog Posts', value: '90+' },
]

type SystemNode = {
  id: string
  label: string
  description: string
  details: string[]
  icon: React.ReactNode
}

const ring1Nodes: SystemNode[] = [
  {
    id: 'claude-code',
    label: 'Claude Code',
    description: 'The intelligence core. AI-native development, reasoning, and orchestration engine.',
    details: [
      'Primary development environment for all code, content, and architecture',
      '500+ skills loaded across 6 agent profiles (Architect, Producer, Content, SEO, Designer, DevOps)',
      'ACOS framework turns Claude Code into a full operating system for creators',
      'Handles multi-file edits, research, debugging, deployment, and content generation',
    ],
    icon: <Brain className="h-6 w-6" />,
  },
]

const ring2Nodes: SystemNode[] = [
  {
    id: 'morning-brief',
    label: 'Morning Brief',
    description: 'Daily intelligence digest delivered at 7:30 AM.',
    details: ['AI news aggregation', 'Market signals', 'Action items for the day'],
    icon: <Rss className="h-5 w-5" />,
  },
  {
    id: 'content-atomizer',
    label: 'Content Atomizer',
    description: 'Blog posts atomized into platform-native social content.',
    details: ['Webhook-triggered from blog publish', 'Generates X threads + LinkedIn posts', 'Slack review before publish'],
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    id: 'newsletter-engine',
    label: 'Newsletter Engine',
    description: 'Automated newsletter compilation and delivery.',
    details: ['Curates top content weekly', 'Resend integration for delivery', 'Subscriber segmentation'],
    icon: <Mail className="h-5 w-5" />,
  },
  {
    id: 'rss-monitor',
    label: 'RSS Monitor',
    description: 'Continuous feed monitoring across 50+ sources.',
    details: ['AI industry feeds', 'Competitor tracking', 'Trend detection alerts'],
    icon: <Radio className="h-5 w-5" />,
  },
  {
    id: 'mega-orchestrator',
    label: 'Mega Orchestrator',
    description: 'Master workflow that routes intents to specialized pipelines.',
    details: ['Content, video, newsletter, and intelligence routing', 'Single webhook entry point', 'Cascading sub-workflow execution'],
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    id: 'music-sync',
    label: 'Music Catalog Sync',
    description: 'Daily synchronization of the music catalog from Suno.',
    details: ['65+ tracks indexed', 'Metadata enrichment', 'Cover art sync to Vercel Blob'],
    icon: <Music className="h-5 w-5" />,
  },
]

const ring3Nodes: SystemNode[] = [
  {
    id: 'blog',
    label: 'Blog',
    description: '90+ articles on AI architecture, creator workflows, and technical deep-dives.',
    details: ['MDX with AI-first metadata', 'FAQ schema markup', 'SEO-optimized with topic clusters'],
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: 'music-lab',
    label: 'Music Lab',
    description: '12,000+ AI songs. Custom audio player. Genre exploration.',
    details: ['Self-hosted on Vercel Blob', 'Global audio player with queue', '5 album collections'],
    icon: <Music className="h-5 w-5" />,
  },
  {
    id: 'products',
    label: 'Products',
    description: 'Digital products, frameworks, and downloadable resources.',
    details: ['Stripe checkout integration', 'PDF delivery via Resend', 'ACOS, GenCreator, SoulBook, Vibe OS'],
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    id: 'research',
    label: 'Research Hub',
    description: 'AI research aggregation and analysis platform.',
    details: ['Domain-specific intelligence feeds', 'Curated paper analysis', 'Trend identification'],
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: 'coaching',
    label: 'Coaching',
    description: 'AI strategy coaching for creators and professionals.',
    details: ['Application-based intake', 'Rolling enrollment', 'Enterprise + individual tracks'],
    icon: <Layers className="h-5 w-5" />,
  },
  {
    id: 'workshops',
    label: 'Workshops',
    description: 'Hands-on workshops for building AI creator systems.',
    details: ['ACOS implementation workshops', 'Prompt engineering masterclasses', 'Live build sessions'],
    icon: <Zap className="h-5 w-5" />,
  },
]

const ring4Nodes: SystemNode[] = [
  {
    id: 'x-twitter',
    label: 'X / Twitter',
    description: 'Primary social distribution. Threads, insights, and real-time commentary.',
    details: ['Atomized content from blog pipeline', 'AI-generated thread variants', '@frankxai handle'],
    icon: <X className="h-5 w-5" />,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    description: 'Professional distribution. Enterprise AI and career content.',
    details: ['Long-form posts from atomizer', 'Enterprise AI narrative', 'Professional network growth'],
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    id: 'github',
    label: 'GitHub',
    description: '100+ repositories. Open source tools and infrastructure.',
    details: ['frankxai organization', 'Two-repo production architecture', 'Open source contributions'],
    icon: <Github className="h-5 w-5" />,
  },
  {
    id: 'newsletter',
    label: 'Newsletter',
    description: 'Creation Chronicles. Weekly digest to subscriber base.',
    details: ['Resend-powered delivery', 'Automated curation via n8n', 'Subscriber growth funnel'],
    icon: <Send className="h-5 w-5" />,
  },
  {
    id: 'suno',
    label: 'Suno',
    description: 'AI music platform. 12,000+ tracks published under @frankx.',
    details: ['Primary music distribution', '65+ self-hosted tracks', 'Genre: Pop, Neoclassical, Electronic, Dance'],
    icon: <Music className="h-5 w-5" />,
  },
]

const rings = [
  {
    id: 'core',
    label: 'The Brain',
    sublabel: 'Claude Code',
    color: 'violet' as const,
    colorHex: '#8B5CF6',
    nodes: ring1Nodes,
  },
  {
    id: 'automation',
    label: 'Automation Layer',
    sublabel: 'n8n Workflows',
    color: 'cyan' as const,
    colorHex: '#06B6D4',
    nodes: ring2Nodes,
  },
  {
    id: 'platform',
    label: 'Platform',
    sublabel: 'frankx.ai',
    color: 'emerald' as const,
    colorHex: '#10B981',
    nodes: ring3Nodes,
  },
  {
    id: 'distribution',
    label: 'Distribution',
    sublabel: 'Channels',
    color: 'amber' as const,
    colorHex: '#F59E0B',
    nodes: ring4Nodes,
  },
]

// ── Pipelines ──

type PipelineStep = { label: string; color: string }

const pipelines: { title: string; steps: PipelineStep[] }[] = [
  {
    title: 'Content Pipeline',
    steps: [
      { label: 'Blog idea', color: '#8B5CF6' },
      { label: 'Claude Code drafts', color: '#8B5CF6' },
      { label: 'n8n atomizes', color: '#06B6D4' },
      { label: 'Slack review', color: '#06B6D4' },
      { label: 'Social publish', color: '#F59E0B' },
    ],
  },
  {
    title: 'Revenue Pipeline',
    steps: [
      { label: 'Product page', color: '#10B981' },
      { label: 'Stripe checkout', color: '#10B981' },
      { label: 'Webhook fires', color: '#06B6D4' },
      { label: 'Delivery email', color: '#06B6D4' },
      { label: 'Slack alert', color: '#F59E0B' },
    ],
  },
  {
    title: 'Intelligence Pipeline',
    steps: [
      { label: 'RSS feeds', color: '#F59E0B' },
      { label: 'n8n monitors', color: '#06B6D4' },
      { label: 'AI analysis', color: '#8B5CF6' },
      { label: 'Slack brief', color: '#06B6D4' },
      { label: 'Action items', color: '#10B981' },
    ],
  },
]

// ── Tech Stack ──

const techStack = [
  {
    name: 'Claude Code',
    role: 'AI Brain',
    description: 'Primary development and reasoning engine. 500+ skills, 6 agent profiles.',
    color: 'violet' as const,
    icon: <Brain className="h-6 w-6" />,
  },
  {
    name: 'n8n',
    role: 'Automation',
    description: 'Self-hosted workflow automation. 47 workflows across content, revenue, and intelligence.',
    color: 'cyan' as const,
    icon: <Workflow className="h-6 w-6" />,
  },
  {
    name: 'Vercel',
    role: 'Hosting',
    description: 'Edge deployment platform. Next.js App Router, Blob storage, serverless functions.',
    color: 'emerald' as const,
    icon: <Globe className="h-6 w-6" />,
  },
  {
    name: 'Resend',
    role: 'Email',
    description: 'Transactional and marketing email. PDF delivery, welcome sequences, newsletters.',
    color: 'blue' as const,
    icon: <Mail className="h-6 w-6" />,
  },
  {
    name: 'OpenRouter',
    role: 'AI Models',
    description: 'Multi-model access layer. Routes to GPT-4, Gemini, Claude, and open-source models.',
    color: 'purple' as const,
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    name: 'Slack',
    role: 'Review Hub',
    description: 'Human-in-the-loop review. Content approval, alerts, and operational dashboards.',
    color: 'amber' as const,
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    name: 'GitHub',
    role: 'Code',
    description: '100+ repositories. Two-repo production architecture. CI/CD via Vercel integration.',
    color: 'white' as const,
    icon: <Github className="h-6 w-6" />,
  },
  {
    name: 'Suno',
    role: 'Music',
    description: 'AI music generation. 12,000+ tracks. Catalog sync via n8n automation.',
    color: 'rose' as const,
    icon: <Music className="h-6 w-6" />,
  },
]

// ── Components ──

function NodeCard({
  node,
  color,
  isExpanded,
  onToggle,
}: {
  node: SystemNode
  color: 'violet' | 'cyan' | 'emerald' | 'amber'
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <GlowCard color={color} onClick={onToggle} className="p-5">
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `linear-gradient(135deg, rgba(${
              color === 'violet'
                ? '139,92,246'
                : color === 'cyan'
                  ? '6,182,212'
                  : color === 'emerald'
                    ? '16,185,129'
                    : '245,158,11'
            }, 0.15), transparent)`,
          }}
        >
          <span className={`text-${color === 'amber' ? 'amber' : color}-400`}>{node.icon}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">{node.label}</h3>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
            </motion.div>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">{node.description}</p>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
              {node.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </GlowCard>
  )
}

function PipelineFlow({ pipeline }: { pipeline: (typeof pipelines)[0] }) {
  return (
    <GlowCard color="violet" className="p-6">
      <h3 className="mb-5 text-base font-semibold text-white">{pipeline.title}</h3>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
        {pipeline.steps.map((step, i) => (
          <div key={i} className="flex items-center gap-0 sm:flex-1">
            <div className="flex flex-1 items-center gap-2 sm:flex-col sm:gap-1">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white sm:h-10 sm:w-10"
                style={{
                  background: `linear-gradient(135deg, ${step.color}33, ${step.color}11)`,
                  border: `1px solid ${step.color}44`,
                }}
              >
                {i + 1}
              </div>
              <span className="text-xs text-slate-300 sm:text-center">{step.label}</span>
            </div>
            {i < pipeline.steps.length - 1 && (
              <ArrowRight className="mx-1 hidden h-3.5 w-3.5 shrink-0 text-slate-600 sm:block" />
            )}
          </div>
        ))}
      </div>
    </GlowCard>
  )
}

// ── Page ──

export default function IntelligenceMapShell() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <IntelligenceMapBackground />

      {/* ── Hero ── */}
      <section className="relative px-4 pt-28 pb-20 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-sm font-medium tracking-widest text-violet-400 uppercase">
              System Architecture
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white">
              FrankX Intelligence Map
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/80 sm:text-lg">
              The complete architecture of an AI-powered creator ecosystem.
              Every workflow, every connection, every layer — mapped.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-0.5 text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── System Map: 4 Concentric Rings ── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-16">
            {rings.map((ring, ringIndex) => (
              <motion.div
                key={ring.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: ringIndex * 0.1 }}
              >
                {/* Ring header */}
                <div className="mb-6 flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${ring.colorHex}22, ${ring.colorHex}08)`,
                      border: `1px solid ${ring.colorHex}33`,
                      color: ring.colorHex,
                    }}
                  >
                    {ringIndex + 1}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{ring.label}</h2>
                    <p className="text-sm text-slate-500">{ring.sublabel}</p>
                  </div>
                  <div
                    className="ml-auto hidden h-px flex-1 sm:block"
                    style={{
                      background: `linear-gradient(to right, ${ring.colorHex}22, transparent)`,
                    }}
                  />
                </div>

                {/* Ring nodes grid */}
                <div
                  className={`grid gap-4 ${
                    ring.nodes.length === 1
                      ? 'grid-cols-1 max-w-xl mx-auto'
                      : ring.nodes.length <= 3
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {ring.nodes.map((node) => (
                    <NodeCard
                      key={node.id}
                      node={node}
                      color={ring.color}
                      isExpanded={expandedNodes.has(node.id)}
                      onToggle={() => toggleNode(node.id)}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflow Pipelines ── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-sm font-medium tracking-widest text-cyan-400 uppercase">
              How It Flows
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">Workflow Pipelines</h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-white/80">
              Three core pipelines power the entire ecosystem. Each one runs end-to-end
              with minimal manual intervention.
            </p>
          </motion.div>

          <div className="space-y-5">
            {pipelines.map((pipeline, i) => (
              <motion.div
                key={pipeline.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <PipelineFlow pipeline={pipeline} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technology Stack ── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-sm font-medium tracking-widest text-emerald-400 uppercase">
              Built With
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">Technology Stack</h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-white/80">
              Eight core technologies power the ecosystem. Each one chosen for composability,
              developer experience, and production reliability.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <GlowCard color={tech.color} className="p-5 h-full">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-slate-300">{tech.icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{tech.name}</h3>
                      <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                        {tech.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-400">{tech.description}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For Creators CTA ── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlowCard color="violet" className="p-8 sm:p-12 text-center">
              <p className="mb-3 text-sm font-medium tracking-widest text-violet-400 uppercase">
                For Creators
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                Build Your Own AI Creator OS
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-white/80">
                This entire system is documented and replicable. The same 6-pillar AI Center of
                Excellence framework used in enterprise environments, translated for individual
                creators at a fraction of the cost.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <PremiumButton href="/gencreator" variant="primary" size="lg">
                  GenCreator OS
                  <ArrowRight className="ml-1 h-4 w-4" />
                </PremiumButton>
                <PremiumButton href="/acos" variant="ghost" size="lg">
                  ACOS Framework
                </PremiumButton>
                <PremiumButton href="/workshops" variant="ghost" size="lg">
                  Workshops
                </PremiumButton>
              </div>

              <p className="mt-6 text-xs text-slate-500">
                Learn how to replicate this entire system.
              </p>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-16" />
    </div>
  )
}
