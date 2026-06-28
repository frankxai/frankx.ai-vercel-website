'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Package,
  ChevronLeft,
  Check,
  ArrowRight,
  Database,
  Users,
  Server,
  Github,
} from 'lucide-react'

import { AffiliateDisclosure } from '@/components/affiliate-disclosure'

// Free, MIT-licensed starter templates. Source lives in this repo under
// templates/<dir>; each ships with a one-click Deploy-to-Vercel button.
const REPO = 'https://github.com/frankxai/frankx.ai-vercel-website'

function deployUrl(dir: string) {
  const repoParam = encodeURIComponent(`${REPO}/tree/main/templates/${dir}`)
  return `https://vercel.com/new/clone?repository-url=${repoParam}&project-name=${dir}&repository-name=${dir}`
}

type Template = {
  id: string
  dir: string
  title: string
  subtitle: string
  icon: typeof Database
  color: string
  features: string[]
  techStack: string[]
  includesOCI: boolean
  deployable: boolean // false for the MCP server (no web deploy target)
}

const templates: Template[] = [
  {
    id: 'rag-starter',
    dir: 'rag-starter',
    title: 'RAG Starter',
    subtitle: 'Production RAG on Vercel AI SDK 6',
    icon: Database,
    color: 'emerald',
    features: [
      'Next.js + AI SDK 6 + Supabase pgvector',
      'Chunk → embed → retrieve → rerank',
      'Streaming answers with source citations',
      'BYOK (key via header, never persisted)',
      'OCI GenAI variant note',
      'One-click Deploy to Vercel',
    ],
    techStack: ['Next.js', 'AI SDK 6', 'Supabase', 'pgvector'],
    includesOCI: true,
    deployable: true,
  },
  {
    id: 'multi-agent',
    dir: 'multi-agent',
    title: 'Multi-Agent Orchestration',
    subtitle: 'Orchestrator → workers on AI SDK 6',
    icon: Users,
    color: 'violet',
    features: [
      'AI SDK 6 Agent with tool calling',
      'Orchestrator delegates to worker tools',
      'Visible step streaming',
      'Bounded loop with stop condition',
      'BYOK multi-provider',
      'One-click Deploy to Vercel',
    ],
    techStack: ['Next.js', 'AI SDK 6', 'zod'],
    includesOCI: false,
    deployable: true,
  },
  {
    id: 'mcp-server-kit',
    dir: 'mcp-server-kit',
    title: 'MCP Server Kit',
    subtitle: 'TypeScript MCP server starter',
    icon: Server,
    color: 'orange',
    features: [
      'stdio + streamable-HTTP transports',
      'Two example tools + one resource',
      'Add to Claude Code / Cursor in minutes',
      'Typed with the MCP TypeScript SDK',
      'Graceful, typed tool errors',
      'Clone and extend',
    ],
    techStack: ['TypeScript', 'MCP SDK', 'Node.js'],
    includesOCI: false,
    deployable: false,
  },
]

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
  emerald: {
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'bg-emerald-500/20 text-emerald-400',
    badge: 'bg-emerald-500 text-white',
  },
  violet: {
    bg: 'bg-violet-500/5',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    icon: 'bg-violet-500/20 text-violet-400',
    badge: 'bg-violet-500 text-white',
  },
  cyan: {
    bg: 'bg-cyan-500/5',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/20 text-cyan-400',
    badge: 'bg-cyan-500 text-white',
  },
  orange: {
    bg: 'bg-orange-500/5',
    border: 'border-orange-500/20 hover:border-orange-500/40',
    icon: 'bg-orange-500/20 text-orange-400',
    badge: 'bg-orange-500 text-white',
  },
  blue: {
    bg: 'bg-blue-500/5',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    icon: 'bg-blue-500/20 text-blue-400',
    badge: 'bg-blue-500 text-white',
  },
  amber: {
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    icon: 'bg-amber-500/20 text-amber-400',
    badge: 'bg-amber-500 text-white',
  },
}

function TemplateCard({
  template,
  index,
}: {
  template: Template
  index: number
}) {
  const Icon = template.icon
  const colors = colorMap[template.color]
  const githubUrl = `${REPO}/tree/main/templates/${template.dir}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div
        className={`relative flex h-full flex-col rounded-2xl border ${colors.border} ${colors.bg} p-6 transition-all duration-300`}
      >
        {/* Free badge */}
        <div className={`absolute -right-2 -top-2 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${colors.badge}`}>
          Free · MIT
        </div>

        {/* OCI badge */}
        {template.includesOCI && (
          <div className="absolute -left-2 -top-2 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold text-red-400 border border-red-500/30">
            OCI Ready
          </div>
        )}

        {/* Header */}
        <div className="mb-4">
          <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon}`}>
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="mb-1 text-lg font-bold text-white">{template.title}</h3>
          <p className="text-sm text-slate-400">{template.subtitle}</p>
        </div>

        {/* Features */}
        <ul className="mb-4 space-y-2">
          {template.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-slate-400">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="mb-6 flex flex-wrap gap-1">
          {template.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-500"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2">
          {template.deployable && (
            <a
              href={deployUrl(template.dir)}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition-all hover:-translate-y-0.5"
            >
              Deploy to Vercel
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          )}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            <Github className="h-4 w-4" />
            View Source
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <div className="relative mb-8 overflow-hidden rounded-2xl mx-auto max-w-6xl mt-24 px-6">
        <div className="relative aspect-[21/9]">
          <Image src="/images/architectures/llmops.png" alt="LLMOps architecture diagram" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-400/60 mb-2">AI Architecture</p>
          <h1 className="text-2xl font-bold text-white">Starter Templates</h1>
        </div>
      </div>

      {/* Header */}
      <section className="pt-8 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/ai-architecture"
            className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Hub
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Starter Templates</h1>
              <p className="text-slate-400">
                Free, open-source • <span className="text-emerald-400">Deploy to Vercel in one click</span>
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-slate-400"
          >
            Skip weeks of boilerplate. Each starter is MIT-licensed, runnable, and built on the 2026
            stack — clone it, read it, deploy it. Bring your own keys; you control costs.
          </motion.p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-8 border-y border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Full Source Code', desc: 'MIT-licensed, yours to fork' },
              { label: 'One-Click Deploy', desc: 'Deploy to Vercel from the repo' },
              { label: '2026 Stack', desc: 'AI SDK 6, MCP, pgvector' },
              { label: 'BYOK', desc: 'Your keys, your costs' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <div>
                  <p className="font-medium text-white">{item.label}</p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template, index) => (
              <TemplateCard key={template.id} template={template} index={index} />
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-2xl">
            <AffiliateDisclosure providers={['vercel']} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'What do these cost?',
                a: 'Nothing. Every starter is free and MIT-licensed. View the source on GitHub or deploy your own copy to Vercel in one click.',
              },
              {
                q: 'Can I use them for commercial projects?',
                a: 'Yes. MIT means you can use, modify, and ship them in client projects, SaaS products, or internal tools.',
              },
              {
                q: 'Do they work with OCI GenAI?',
                a: 'Starters marked "OCI Ready" include notes for swapping in an OCI GenAI provider variant alongside Anthropic / OpenAI / Google.',
              },
              {
                q: 'Do I need my own API keys?',
                a: 'Yes. Each starter is BYOK — you supply keys for the providers you use (Anthropic, OpenAI, Google, or OCI), so you control costs.',
              },
              {
                q: 'Are these turnkey production systems?',
                a: 'No — they are honest starting points. Core logic is implemented and runnable; you still add auth, evals, and hardening for production.',
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h4 className="mb-2 font-semibold text-white">{faq.q}</h4>
                <p className="text-sm text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notify */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">New starters land in the AI Architect Dispatch</h2>
          <p className="mb-6 text-slate-400">
            Get new blueprints, starters, and the patterns behind them in the bi-weekly AI Architect
            Dispatch.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Join the Dispatch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
