'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Heart,
  Database,
  Route,
  Github,
  ArrowRight,
  Terminal,
  Shield,
  Zap,
  Package,
  CheckCircle2,
} from 'lucide-react'
import { containerVariants, itemVariants, fadeUp, fadeUpHero } from '@/lib/motion'

/* ── Data ── */

const gold = '#D4AF37'
const goldMuted = 'rgba(212, 175, 55, 0.4)'

interface Product {
  id: string
  name: string
  version: string
  tagline: string
  description: string
  icon: typeof Heart
  accent: string
  features: string[]
  v11Features: { title: string; description: string }[]
  quickStart: string
  techStack: string[]
  githubUrl: string
  docsUrl: string
}

const products: Product[] = [
  {
    id: 'vital-intelligence-mcp',
    name: 'Vital Intelligence MCP',
    version: 'v1.1.0',
    tagline: 'Health-aware AI that reads your body',
    description:
      'An MCP server that connects biometric data to Claude. Works with zero configuration (circadian simulation) or with real wearables (Oura, Whoop, Apple Health). Now with personal percentile ranking and explainable state.',
    icon: Heart,
    accent: '#F43F5E',
    features: [
      '5 biometric-aware MCP tools',
      'Circadian science built-in',
      'Personal percentile baselines',
      'Cross-metric correlation analysis',
      'Explainable state reasoning',
      'Zero configuration to start',
    ],
    v11Features: [
      {
        title: 'ask_baseline',
        description: 'Personal percentile ranking — "Your HRV is in your personal 18th percentile" instead of generic normal ranges.',
      },
      {
        title: 'detect_trend',
        description: 'Longitudinal trend detection with linear regression. See what\'s improving, declining, or stable.',
      },
      {
        title: 'correlate',
        description: 'Cross-metric Pearson correlation with optional lag. "Your sleep predicts next-day HRV (r=0.72)".',
      },
      {
        title: 'explain_state',
        description: 'Full reasoning for every state assessment — factors, weights, confidence, and caveats.',
      },
    ],
    quickStart: 'npx @arcanea/vital-intelligence-mcp',
    techStack: ['MCP SDK', 'TypeScript', 'Zod', 'Oura API (optional)'],
    githubUrl: 'https://github.com/frankxai/vital-intelligence-mcp',
    docsUrl: '#vital-intelligence',
  },
  {
    id: 'sovereign-vault',
    name: 'Sovereign Vault',
    version: 'v1.1.0',
    tagline: 'Three-tier knowledge vault with data sovereignty',
    description:
      'Supabase schema + TypeScript client for personal, family, and business knowledge vaults. Row-level security, pgvector semantic search, hybrid search with RRF, temporal decay, and explainable retrieval.',
    icon: Database,
    accent: '#10B981',
    features: [
      'Three vault tiers (Personal/Family/Business)',
      'Row-level security isolation',
      'pgvector semantic search',
      'Hybrid search (BM25 + vector)',
      'Temporal decay for aging memories',
      'Full data export (GDPR)',
    ],
    v11Features: [
      {
        title: 'Hybrid Search with RRF',
        description: 'Combines vector similarity and BM25 full-text search using Reciprocal Rank Fusion (k=60) for best-in-class retrieval.',
      },
      {
        title: 'Temporal Decay',
        description: 'Memories fade gracefully with configurable half-life (default 90 days). Recent matters more than distant.',
      },
      {
        title: 'explain_retrieval',
        description: 'See exactly why each result matched — vector score, text score, RRF score, and plain-English reasoning.',
      },
      {
        title: 'GDPR-Ready Export',
        description: 'One call exports all your data as JSONB. Another call deletes it. Sovereignty by design.',
      },
    ],
    quickStart: 'Paste migrations into Supabase SQL editor',
    techStack: ['Supabase', 'pgvector', 'PostgreSQL', 'TypeScript'],
    githubUrl: 'https://github.com/frankxai/sovereign-vault',
    docsUrl: '#sovereign-vault',
  },
  {
    id: 'starlight-router',
    name: 'Starlight Router',
    version: 'v1.1.0',
    tagline: 'Multi-model AI router with learning and replay',
    description:
      'Intelligent routing across Claude, GPT, and local models. Self-improving via trajectory learning. Now with replay mode, shadow mode, cascade routing, and full explainability.',
    icon: Route,
    accent: '#8B5CF6',
    features: [
      'Multi-provider (Claude/GPT/local)',
      '8 intent classifications',
      'Self-improving routing',
      'File-based trajectory learning',
      'CLI, library, and MCP server modes',
      'Budget-aware optimization',
    ],
    v11Features: [
      {
        title: 'Replay Mode',
        description: 'Re-run any historical request against a challenger model. See cost delta, latency delta, similarity, and verdict — all side-by-side.',
      },
      {
        title: 'Shadow Mode',
        description: 'Silently run X% of traffic on a challenger model. Discover if cheaper models would work just as well.',
      },
      {
        title: 'Cascade Routing',
        description: 'Try cheap first (Haiku), auto-escalate to Sonnet/Opus on low confidence. How production systems save 80%.',
      },
      {
        title: 'explainRoute',
        description: 'See every factor in a routing decision — intent, complexity, budget, historical influence, all considered models.',
      },
    ],
    quickStart: 'ANTHROPIC_API_KEY=sk-... npx tsx src/index.ts "your prompt"',
    techStack: ['Anthropic SDK', 'OpenAI (optional)', 'MCP SDK', 'TypeScript'],
    githubUrl: 'https://github.com/frankxai/starlight-router',
    docsUrl: '#starlight-router',
  },
]

/* ── Components ── */

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 sm:px-8">{children}</div>
    </section>
  )
}

function GoldDivider() {
  return (
    <div
      className="mx-auto h-px w-24"
      style={{ background: `linear-gradient(to right, transparent, ${gold}, transparent)` }}
    />
  )
}

function ProductSection({ product }: { product: Product }) {
  const Icon = product.icon

  return (
    <motion.div
      id={product.id}
      className="relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-12"
      variants={itemVariants}
    >
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `${product.accent}15`,
              color: product.accent,
            }}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl font-serif">
                {product.name}
              </h2>
              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] font-mono"
                style={{
                  backgroundColor: `${product.accent}15`,
                  color: product.accent,
                }}
              >
                {product.version}
              </span>
            </div>
            <p className="mt-1 text-sm" style={{ color: product.accent }}>
              {product.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={product.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-zinc-300 transition-all hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="mb-10 text-base leading-relaxed text-zinc-400">{product.description}</p>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* Left: What's new in v1.1 */}
        <div>
          <div
            className="mb-4 text-xs font-light tracking-[0.3em] uppercase"
            style={{ color: gold }}
          >
            What's new in v1.1
          </div>
          <div className="space-y-4">
            {product.v11Features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <div className="mb-1 font-mono text-sm font-medium" style={{ color: product.accent }}>
                  {feature.title}
                </div>
                <div className="text-xs leading-relaxed text-zinc-500">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Features + quick start */}
        <div className="space-y-6">
          {/* Features checklist */}
          <div>
            <div
              className="mb-4 text-xs font-light tracking-[0.3em] uppercase"
              style={{ color: gold }}
            >
              Features
            </div>
            <div className="space-y-2.5">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    style={{ color: product.accent }}
                  />
                  <span className="text-xs text-zinc-400">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick start */}
          <div>
            <div
              className="mb-2 text-xs font-light tracking-[0.3em] uppercase"
              style={{ color: gold }}
            >
              Quick Start
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-black/40 p-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-3 w-3 shrink-0 text-zinc-500" />
                <code className="truncate font-mono text-[11px] text-zinc-300">
                  {product.quickStart}
                </code>
              </div>
            </div>
          </div>

          {/* Tech stack pills */}
          <div>
            <div
              className="mb-2 text-xs font-light tracking-[0.3em] uppercase"
              style={{ color: gold }}
            >
              Built with
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[10px] text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Page ── */

export default function OpenSourceClient() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      {/* ── Hero ── */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.5) 0%, transparent 55%), radial-gradient(ellipse at 30% 70%, rgba(20,184,166,0.3) 0%, transparent 45%)',
          }}
        />

        <motion.div className="relative z-10" {...fadeUpHero}>
          <div
            className="mb-8 text-xs font-light tracking-[0.5em]"
            style={{ color: goldMuted }}
          >
            OPEN SOURCE · MIT LICENSED
          </div>

          <h1 className="mb-6 text-5xl font-extralight tracking-tight text-white sm:text-6xl lg:text-7xl font-serif">
            Built for the community.
          </h1>

          <GoldDivider />

          <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-zinc-400">
            Three production-ready tools. Zero vendor lock-in. Zero monthly fees.
            Use them, fork them, improve them. The best AI infrastructure should
            belong to everyone.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#vital-intelligence-mcp"
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-zinc-300 transition-all hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white"
            >
              Vital Intelligence
            </a>
            <a
              href="#sovereign-vault"
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-zinc-300 transition-all hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white"
            >
              Sovereign Vault
            </a>
            <a
              href="#starlight-router"
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-zinc-300 transition-all hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white"
            >
              Starlight Router
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Products ── */}
      <Section>
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {products.map((product) => (
            <ProductSection key={product.id} product={product} />
          ))}
        </motion.div>
      </Section>

      {/* ── Philosophy ── */}
      <Section>
        <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp}>
          <div
            className="mb-4 text-xs font-light tracking-[0.4em] uppercase"
            style={{ color: gold }}
          >
            The Philosophy
          </div>
          <h2 className="mb-6 text-3xl font-extralight text-white sm:text-4xl font-serif">
            Abundance over extraction.
          </h2>
          <p className="text-base leading-relaxed text-zinc-400">
            The best AI infrastructure should belong to everyone. These tools
            are MIT licensed, zero-dependency where possible, and designed for
            developers who want to build without vendor lock-in. Use them, fork
            them, contribute back. Monetization comes later, community comes
            first.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/ai-architecture"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-all"
              style={{ borderColor: `${gold}33`, color: gold }}
            >
              Explore Architecture
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/stack"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm text-zinc-300 transition-all hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white"
            >
              The FrankX Stack
              <Package className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      </Section>
    </main>
  )
}
