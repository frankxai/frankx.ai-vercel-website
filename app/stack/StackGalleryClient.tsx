'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  Bot,
  Box,
  Cloud,
  Cpu,
  Database,
  Globe,
  LayoutTemplate,
  Link2,
  Mail,
  Mic,
  Music,
  Network,
  Radio,
  Server,
  Sparkles,
  Terminal,
  TrendingUp,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'
import { containerVariants, itemVariants, fadeUp, fadeUpHero } from '@/lib/motion'

/* ── Types ── */

type CategoryId =
  | 'templates'
  | 'agents'
  | 'growth'
  | 'media'
  | 'infra'
  | 'databases'
  | 'devtools'
  | 'selfhost'

interface StackItem {
  id: string
  title: string
  description: string
  category: CategoryId
  url: string
  tags: string[]
  glowColor: GlowColor
  icon: LucideIcon
}

interface CategoryMeta {
  id: CategoryId
  label: string
  title: string
  tagline: string
}

/* ── Data ── */

const categories: CategoryMeta[] = [
  {
    id: 'templates',
    label: 'AI App Templates',
    title: 'Starters worth cloning',
    tagline: 'Production-grade scaffolds that save you weeks of plumbing.',
  },
  {
    id: 'agents',
    label: 'Agent Frameworks',
    title: 'Orchestration primitives',
    tagline: 'The frameworks I reach for when building multi-agent autonomous systems.',
  },
  {
    id: 'growth',
    label: 'Growth, Outbound & Newsletters',
    title: 'Audience & revenue engines',
    tagline: 'High-leverage outbound data waterfalls, modern CRMs, and creator newsletter platforms.',
  },
  {
    id: 'media',
    label: 'Voice, Audio & Generative Media',
    title: 'Sensory intelligence',
    tagline: 'Frontier voice synthesis, low-latency media APIs, and musical intelligence engines.',
  },
  {
    id: 'infra',
    label: 'Infrastructure & Hosting',
    title: 'Where it runs',
    tagline: 'From edge functions to GPU clusters — the reliable substrate that powers intelligence.',
  },
  {
    id: 'databases',
    label: 'Databases & Memory',
    title: 'State and recall',
    tagline: 'Vectors, edge SQLite, caches, and memory layers agents need to remember.',
  },
  {
    id: 'devtools',
    label: 'Developer Tools & Editors',
    title: 'Daily drivers',
    tagline: 'The frontier editors, CLI harnesses, and toolchains that ship my code.',
  },
  {
    id: 'selfhost',
    label: 'OSS & Self-Host',
    title: 'Run it yourself',
    tagline: 'Sovereign open-source stacks when you need full local privacy and zero vendor lock-in.',
  },
]

const items: StackItem[] = [
  // ── AI App Templates ──
  {
    id: 'vercel-ai-chatbot',
    title: 'Vercel AI Chatbot',
    description: 'Full-featured Next.js AI chatbot template with streaming, auth, and persistence built-in.',
    category: 'templates',
    url: 'https://vercel.com/templates/ai/nextjs-ai-chatbot?utm_source=frankxai',
    tags: ['Next.js', 'Vercel AI SDK', 'Free'],
    glowColor: 'teal',
    icon: LayoutTemplate,
  },
  {
    id: 'v0',
    title: 'v0 by Vercel',
    description: 'AI-powered UI generation. Describe a component, get production-ready React and Tailwind.',
    category: 'templates',
    url: 'https://v0.dev?utm_source=frankxai',
    tags: ['AI UI', 'Free tier'],
    glowColor: 'cyan',
    icon: Sparkles,
  },
  {
    id: 'supabase-rag',
    title: 'Supabase AI Chat',
    description: 'RAG template with pgvector, embeddings, and doc search. Ship a knowledge assistant in a day.',
    category: 'templates',
    url: 'https://github.com/supabase-community/nextjs-openai-doc-search?utm_source=frankxai',
    tags: ['Supabase', 'RAG', 'Open source'],
    glowColor: 'emerald',
    icon: Database,
  },
  {
    id: 'claude-artifacts',
    title: 'Claude Artifacts Template',
    description: 'Starter for building Claude-powered apps with artifact streaming and tool use.',
    category: 'templates',
    url: 'https://github.com/anthropics/claude-artifacts-example?utm_source=frankxai',
    tags: ['Anthropic', 'Open source'],
    glowColor: 'orange',
    icon: Box,
  },
  {
    id: 'bolt-diy',
    title: 'Bolt.diy',
    description: 'Open-source Bolt with bring-your-own-model. Full-stack apps from a prompt, locally.',
    category: 'templates',
    url: 'https://bolt.diy?utm_source=frankxai',
    tags: ['Open source', 'Web builder'],
    glowColor: 'amber',
    icon: LayoutTemplate,
  },

  // ── Agent Frameworks ──
  {
    id: 'claude-agent-sdk',
    title: 'Claude Agent SDK',
    description: 'Anthropic’s official agent framework. Tool use, MCP, subagents, and deep orchestration primitives.',
    category: 'agents',
    url: 'https://docs.anthropic.com/en/docs/agent-sdk?utm_source=frankxai',
    tags: ['Anthropic', 'Production'],
    glowColor: 'orange',
    icon: Bot,
  },
  {
    id: 'mastra',
    title: 'Mastra',
    description: 'TypeScript-native AI framework with agents, workflows, and evals. The Next.js of agent frameworks.',
    category: 'agents',
    url: 'https://mastra.ai?utm_source=frankxai',
    tags: ['TypeScript', 'Open source'],
    glowColor: 'blue',
    icon: Cpu,
  },
  {
    id: 'openai-agents',
    title: 'OpenAI Agents SDK',
    description: 'Official OpenAI agents framework. Clean primitives for handoffs, guardrails, and tracing.',
    category: 'agents',
    url: 'https://github.com/openai/openai-agents-python?utm_source=frankxai',
    tags: ['OpenAI', 'Python'],
    glowColor: 'emerald',
    icon: Bot,
  },
  {
    id: 'langgraph',
    title: 'LangGraph',
    description: 'Graph-based agent orchestration with state machines, cycles, and human-in-the-loop checkpoints.',
    category: 'agents',
    url: 'https://langchain-ai.github.io/langgraph/?utm_source=frankxai',
    tags: ['LangChain', 'Graph'],
    glowColor: 'violet',
    icon: Network,
  },
  {
    id: 'crewai',
    title: 'CrewAI',
    description: 'Multi-agent coordination with roles, tasks, and processes. Simple mental model for crew-based workflows.',
    category: 'agents',
    url: 'https://crewai.com?utm_source=frankxai',
    tags: ['Multi-agent', 'Python'],
    glowColor: 'rose',
    icon: Bot,
  },

  // ── Growth, Outbound & Newsletters ──
  {
    id: 'clay',
    title: 'Clay',
    description: 'AI-powered data enrichment and automated waterfall prospecting. The gold standard for modern B2B outbound.',
    category: 'growth',
    url: 'https://www.clay.com?utm_source=frankxai',
    tags: ['Outbound', 'AI Enrichment', 'B2B'],
    glowColor: 'magenta',
    icon: TrendingUp,
  },
  {
    id: 'beehiiv',
    title: 'Beehiiv',
    description: 'The creator-first newsletter platform with built-in referral engines, 3D recommendations, and monetization rails.',
    category: 'growth',
    url: 'https://www.beehiiv.com?via=frankx',
    tags: ['Newsletter', 'Audience', 'Affiliate'],
    glowColor: 'amber',
    icon: Mail,
  },
  {
    id: 'loops',
    title: 'Loops.so',
    description: 'Modern email platform built for SaaS and AI apps. React Email native, clean API triggers, and zero marketing bloat.',
    category: 'growth',
    url: 'https://loops.so?utm_source=frankxai',
    tags: ['Lifecycle', 'API-first', 'Modern'],
    glowColor: 'violet',
    icon: Mail,
  },
  {
    id: 'dub',
    title: 'Dub.co',
    description: 'Open-source link management infrastructure. Branded short domains, geo-targeting, and deep conversion analytics.',
    category: 'growth',
    url: 'https://dub.co?utm_source=frankxai',
    tags: ['Links', 'Analytics', 'Open source'],
    glowColor: 'blue',
    icon: Link2,
  },
  {
    id: 'attio',
    title: 'Attio',
    description: 'Next-generation CRM for modern startups. Real-time data sync, dynamic data models, and native API-first design.',
    category: 'growth',
    url: 'https://attio.com?utm_source=frankxai',
    tags: ['CRM', 'API-first', 'Modern'],
    glowColor: 'indigo',
    icon: Globe,
  },

  // ── Voice, Audio & Generative Media ──
  {
    id: 'elevenlabs',
    title: 'ElevenLabs',
    description: 'Frontier neural voice synthesis, real-time conversational agents, and emotional speech modulation.',
    category: 'media',
    url: 'https://elevenlabs.io/?from=frankx',
    tags: ['Voice AI', 'Conversational', 'Affiliate'],
    glowColor: 'cyan',
    icon: Mic,
  },
  {
    id: 'fal-ai',
    title: 'fal.ai',
    description: 'Ultra-fast media inference platform. Real-time FLUX, SD3.5, video pipelines, and serverless ComfyUI execution.',
    category: 'media',
    url: 'https://fal.ai?utm_source=frankxai',
    tags: ['Generative Media', 'Low Latency', 'GPU'],
    glowColor: 'purple',
    icon: Radio,
  },
  {
    id: 'suno',
    title: 'Suno AI',
    description: 'Generative musical composition and multi-genre audio engine. Powers sonic branding and dynamic soundtracking.',
    category: 'media',
    url: 'https://suno.com?utm_source=frankxai',
    tags: ['Music', 'Audio AI', 'Creative'],
    glowColor: 'orange',
    icon: Music,
  },
  {
    id: 'openrouter',
    title: 'OpenRouter',
    description: 'Unified LLM routing gateway. Access 200+ models with a single API key, intelligent fallback, and granular cost metrics.',
    category: 'media',
    url: 'https://openrouter.ai?utm_source=frankxai',
    tags: ['LLM Gateway', 'BYOK', 'Cost-Opt'],
    glowColor: 'emerald',
    icon: Zap,
  },

  // ── Infrastructure & Hosting ──
  {
    id: 'railway',
    title: 'Railway',
    description: 'One-click deploy for anything with a Dockerfile. The easiest way to run backends, queues, and agent workers.',
    category: 'infra',
    url: 'https://railway.app?referralCode=frankx',
    tags: ['Deploy', 'Affiliate'],
    glowColor: 'purple',
    icon: Cloud,
  },
  {
    id: 'vercel',
    title: 'Vercel',
    description: 'The Next.js cloud. Edge functions, preview deploys, and the gold standard DX for modern web experiences.',
    category: 'infra',
    url: 'https://vercel.com?utm_source=frankxai',
    tags: ['Edge', 'Free tier'],
    glowColor: 'white',
    icon: Zap,
  },
  {
    id: 'cloudflare-workers',
    title: 'Cloudflare Workers',
    description: 'Global edge compute with sub-millisecond cold starts. Durable Objects and Workers AI included.',
    category: 'infra',
    url: 'https://workers.cloudflare.com?utm_source=frankxai',
    tags: ['Edge', 'Free tier'],
    glowColor: 'amber',
    icon: Zap,
  },
  {
    id: 'modal',
    title: 'Modal',
    description: 'Serverless GPU for Python. Spin up H100s from a decorator, pay only for inference time.',
    category: 'infra',
    url: 'https://modal.com?utm_source=frankxai',
    tags: ['GPU', 'Serverless'],
    glowColor: 'violet',
    icon: Cpu,
  },
  {
    id: 'runpod',
    title: 'RunPod',
    description: 'GPU cloud with community and secure instances. Cost-effective fine-tuning and model inference.',
    category: 'infra',
    url: 'https://runpod.io?ref=frankx',
    tags: ['GPU', 'Affiliate'],
    glowColor: 'rose',
    icon: Cpu,
  },
  {
    id: 'hetzner',
    title: 'Hetzner',
    description: 'Dedicated bare-metal servers in Europe. Unreasonably cheap and fast for high-load, 24/7 background tasks.',
    category: 'infra',
    url: 'https://hetzner.com?utm_source=frankxai',
    tags: ['Bare Metal', 'EU', 'Budget'],
    glowColor: 'blue',
    icon: Server,
  },

  // ── Databases & Memory ──
  {
    id: 'supabase',
    title: 'Supabase',
    description: 'Postgres with pgvector, auth, storage, and realtime. The open-source standard for AI applications.',
    category: 'databases',
    url: 'https://supabase.com?via=frankx',
    tags: ['Open source', 'Postgres', 'Affiliate'],
    glowColor: 'emerald',
    icon: Database,
  },
  {
    id: 'neon',
    title: 'Neon',
    description: 'Serverless Postgres with instant branching. Clone your database like a git branch for every preview deploy.',
    category: 'databases',
    url: 'https://neon.tech?utm_source=frankxai',
    tags: ['Serverless', 'Postgres'],
    glowColor: 'teal',
    icon: Database,
  },
  {
    id: 'turso',
    title: 'Turso',
    description: 'Edge SQLite built on libSQL. Millisecond reads globally, perfect for user-scoped data and embedded agents.',
    category: 'databases',
    url: 'https://turso.tech?utm_source=frankxai',
    tags: ['Edge', 'SQLite'],
    glowColor: 'cyan',
    icon: Database,
  },
  {
    id: 'upstash',
    title: 'Upstash Redis',
    description: 'Serverless Redis and QStash with HTTP access. Perfect for rate limiting, queues, and edge caching.',
    category: 'databases',
    url: 'https://upstash.com?utm_source=frankxai',
    tags: ['Serverless', 'Cache'],
    glowColor: 'rose',
    icon: Zap,
  },
  {
    id: 'mem0',
    title: 'Mem0',
    description: 'Intelligent memory layer for agents with user, session, and agent scopes. Drop-in persistence for LLMs.',
    category: 'databases',
    url: 'https://mem0.ai?utm_source=frankxai',
    tags: ['Open source', 'Agent memory'],
    glowColor: 'violet',
    icon: Cpu,
  },
  {
    id: 'pinecone',
    title: 'Pinecone',
    description: 'Managed vector database for hyper-scale semantic search and enterprise retrieval systems.',
    category: 'databases',
    url: 'https://pinecone.io?utm_source=frankxai',
    tags: ['Vector', 'Managed'],
    glowColor: 'indigo',
    icon: Network,
  },

  // ── Developer Tools & Editors ──
  {
    id: 'cursor',
    title: 'Cursor',
    description: 'AI-first code editor forked from VS Code. Composer and multi-file agent mode make complex refactors trivial.',
    category: 'devtools',
    url: 'https://cursor.com?utm_source=frankxai',
    tags: ['Editor', 'AI'],
    glowColor: 'white',
    icon: Terminal,
  },
  {
    id: 'claude-code',
    title: 'Claude Code',
    description: 'Anthropic’s terminal agent. Lives in your CLI, navigates entire codebases, and executes real PRs.',
    category: 'devtools',
    url: 'https://claude.com/claude-code?utm_source=frankxai',
    tags: ['Anthropic', 'Terminal'],
    glowColor: 'orange',
    icon: Terminal,
  },
  {
    id: 'cline',
    title: 'Cline',
    description: 'Autonomous VS Code agent that reads, writes, and executes shell tasks across your workspace.',
    category: 'devtools',
    url: 'https://github.com/cline/cline?utm_source=frankxai',
    tags: ['VS Code', 'Open source'],
    glowColor: 'cyan',
    icon: Bot,
  },
  {
    id: 'continue',
    title: 'Continue.dev',
    description: 'Open-source Copilot alternative. Bring your own model and customize prompt engineering rules.',
    category: 'devtools',
    url: 'https://continue.dev?utm_source=frankxai',
    tags: ['Open source', 'Editor'],
    glowColor: 'blue',
    icon: Wrench,
  },

  // ── OSS & Self-Host ──
  {
    id: 'ollama',
    title: 'Ollama',
    description: 'Run open weights models (Llama 3, Qwen, DeepSeek, Mistral) locally with one command.',
    category: 'selfhost',
    url: 'https://ollama.com?utm_source=frankxai',
    tags: ['Local', 'Open source'],
    glowColor: 'teal',
    icon: Server,
  },
  {
    id: 'openwebui',
    title: 'OpenWebUI',
    description: 'ChatGPT alternative UI you can self-host. Multi-model, RAG, and function calling out of the box.',
    category: 'selfhost',
    url: 'https://openwebui.com?utm_source=frankxai',
    tags: ['Self-host', 'Open source'],
    glowColor: 'emerald',
    icon: LayoutTemplate,
  },
  {
    id: 'n8n',
    title: 'n8n',
    description: 'Workflow automation with native AI nodes. Open-source Zapier with code execution and agent support.',
    category: 'selfhost',
    url: 'https://n8n.io?utm_source=frankxai',
    tags: ['Workflow', 'Open source'],
    glowColor: 'rose',
    icon: Workflow,
  },
  {
    id: 'dify',
    title: 'Dify',
    description: 'Visual LLM app development platform. Design visual flows, prompt templates, and RAG pipelines.',
    category: 'selfhost',
    url: 'https://dify.ai?utm_source=frankxai',
    tags: ['Visual', 'Open source'],
    glowColor: 'violet',
    icon: Wrench,
  },
  {
    id: 'librechat',
    title: 'LibreChat',
    description: 'Multi-model team chat with plugins, agents, and auth. Ideal for self-hosted enterprise AI workspaces.',
    category: 'selfhost',
    url: 'https://librechat.ai?utm_source=frankxai',
    tags: ['Self-host', 'Team'],
    glowColor: 'indigo',
    icon: Network,
  },
]

/* ── Filter tabs ── */

const filterTabs: { id: 'all' | CategoryId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'templates', label: 'Templates' },
  { id: 'agents', label: 'Agent Systems' },
  { id: 'growth', label: 'Growth & CRM' },
  { id: 'media', label: 'Voice & Media' },
  { id: 'infra', label: 'Infrastructure' },
  { id: 'databases', label: 'Databases & State' },
  { id: 'devtools', label: 'Dev Tools' },
  { id: 'selfhost', label: 'OSS & Self-Host' },
]

/* ── Card ── */

function StackCardContent({ item }: { item: StackItem }) {
  const Icon = item.icon
  return (
    <div className="flex h-full flex-col gap-5 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
          <Icon className="h-5 w-5 text-white/70" strokeWidth={1.5} />
        </div>
        <ArrowUpRight
          className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70"
          strokeWidth={1.5}
        />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold tracking-tight text-white">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/45">{item.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-white/50"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors duration-300 group-hover:text-white">
        <span>Explore</span>
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {'\u2192'}
        </span>
      </div>
    </div>
  )
}

function StackCard({ item }: { item: StackItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full focus:outline-none"
    >
      <GlowCard color={item.glowColor} className="h-full">
        <StackCardContent item={item} />
      </GlowCard>
    </a>
  )
}

/* ── Main Client ── */

export default function StackGalleryClient() {
  const [activeFilter, setActiveFilter] = useState<'all' | CategoryId>('all')

  const visibleCategories = useMemo(() => {
    if (activeFilter === 'all') return categories
    return categories.filter((c) => c.id === activeFilter)
  }, [activeFilter])

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return items
    return items.filter((i) => i.category === activeFilter)
  }, [activeFilter])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b]">
      {/* Ambient gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.05),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(139,92,246,0.05),transparent_40%)]" />
      </div>

      <div className="relative z-10">
        {/* ── Hero ── */}
        <section className="flex flex-col items-center justify-center px-6 pt-32 pb-16 text-center">
          <motion.div {...fadeUpHero} className="mx-auto max-w-3xl">
            <span className="mb-6 inline-block rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.08] px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] text-[#D4AF37] uppercase">
              Curated Stack · 2026 Edition
            </span>
            <h1 className="font-serif text-5xl font-bold tracking-tight text-white sm:text-7xl">
              The FrankX Stack
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/55 sm:text-2xl">
              Frontier AI tools, outbound intelligence & sovereign infrastructure I actually build with.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/35">
              Battle-tested across shipped products and agent swarms. Curated with zero-slop integrity — only what genuinely works makes the list.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            {...fadeUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-2 max-w-4xl"
          >
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? 'border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]'
                      : 'border-white/[0.08] bg-white/[0.03] text-white/50 hover:border-white/[0.15] hover:text-white/80'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </motion.div>
        </section>

        {/* ── Category sections ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-6xl px-6 pb-32"
          >
            {visibleCategories.map((category) => {
              const categoryItems = filteredItems.filter((i) => i.category === category.id)
              if (categoryItems.length === 0) return null

              return (
                <section key={category.id} className="pt-20">
                  <motion.div {...fadeUp} className="mb-8 max-w-2xl">
                    <span className="mb-3 inline-block text-[11px] font-medium tracking-[0.2em] text-[#D4AF37]/80 uppercase">
                      {category.label}
                    </span>
                    <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      {category.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/45">
                      {category.tagline}
                    </p>
                  </motion.div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.05 }}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {categoryItems.map((item) => (
                      <motion.div key={item.id} variants={itemVariants} className="h-full">
                        <StackCard item={item} />
                      </motion.div>
                    ))}
                  </motion.div>
                </section>
              )
            })}

            {/* ── Footer note ── */}
            <motion.div {...fadeUp} className="mt-32 text-center">
              <p className="text-xs text-white/30">
                Curated & Tested · Built by Frank · Verified for 2026
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
