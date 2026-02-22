'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Play,
  Key,
  ChevronLeft,
  MessageSquare,
  FileSearch,
  Users,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Lock,
} from 'lucide-react'

import { AI_PROVIDER_META } from '@/types/ai-architecture'
import type { AIProvider } from '@/types/ai-architecture'

// Prototypes
const upcomingPrototypes = [
  {
    id: 'chat-playground',
    title: 'AI Chat Playground',
    description: 'Chat with Claude, GPT, and Gemini using your own API keys',
    icon: MessageSquare,
    providers: ['anthropic', 'openai', 'google'] as AIProvider[],
    status: 'live',
    href: '/prototype/chat-playground',
    features: ['Multi-model support', 'Streaming responses', 'BYOK security'],
  },
  {
    id: 'rag-tester',
    title: 'RAG Playground',
    description: 'Upload documents and ask questions with retrieval-augmented generation',
    icon: FileSearch,
    providers: ['anthropic', 'openai'] as AIProvider[],
    status: 'coming-soon',
    features: ['PDF upload', 'Chunk visualization', 'Source citations'],
  },
  {
    id: 'agent-simulator',
    title: 'Agent Simulator',
    description: 'Watch multi-agent systems coordinate to solve problems',
    icon: Users,
    providers: ['anthropic', 'openai'] as AIProvider[],
    status: 'coming-soon',
    features: ['Agent handoffs', 'Task decomposition', 'Execution trace'],
  },
  {
    id: 'prompt-engineer',
    title: 'Prompt Engineer',
    description: 'Test and refine prompts with instant feedback',
    icon: Sparkles,
    providers: ['anthropic', 'openai', 'google'] as AIProvider[],
    status: 'coming-soon',
    features: ['Variable injection', 'Output comparison', 'Save & share'],
  },
]

function ProviderBadge({ provider }: { provider: AIProvider }) {
  const meta = AI_PROVIDER_META[provider]
  const colorMap: Record<string, string> = {
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  return (
    <span className={`rounded border px-2 py-0.5 text-[10px] font-medium ${colorMap[meta.color]}`}>
      {meta.shortName}
    </span>
  )
}

function PrototypeCard({
  prototype,
  index,
}: {
  prototype: (typeof upcomingPrototypes)[0]
  index: number
}) {
  const Icon = prototype.icon
  const isLive = prototype.status === 'live'

  const CardContent = (
    <div className={`relative h-full rounded-2xl border p-6 transition-all duration-300 ${
      isLive
        ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50 cursor-pointer'
        : 'border-violet-500/20 bg-violet-500/5 hover:border-violet-500/40'
    }`}>
      {/* Status badge */}
      <div className={`absolute -right-2 -top-2 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase text-white ${
        isLive ? 'bg-emerald-500' : 'bg-violet-500'
      }`}>
        {isLive ? 'Live' : 'Coming Soon'}
      </div>

      {/* Icon */}
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
        isLive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-violet-500/20 text-violet-400'
      }`}>
        <Icon className="h-6 w-6" />
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-bold text-white">{prototype.title}</h3>
      <p className="mb-4 text-sm text-slate-400">{prototype.description}</p>

      {/* Providers */}
      <div className="mb-4 flex flex-wrap gap-1">
        {prototype.providers.map((provider) => (
          <ProviderBadge key={provider} provider={provider} />
        ))}
      </div>

      {/* Features */}
      <div className="space-y-1">
        {prototype.features.map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-xs text-slate-500">
            <span className={`h-1 w-1 rounded-full ${isLive ? 'bg-emerald-500' : 'bg-violet-500'}`} />
            {feature}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Lock className="h-4 w-4" />
          <span>BYOK</span>
        </div>
        {isLive && (
          <div className="flex items-center gap-1 text-sm text-emerald-400">
            <span>Try now</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      {isLive && 'href' in prototype ? (
        <Link href={prototype.href as string}>{CardContent}</Link>
      ) : (
        CardContent
      )}
    </motion.div>
  )
}

export default function PrototypesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <section className="pt-32 pb-12">
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
              <Play className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Interactive Prototypes</h1>
              <p className="text-slate-400">
                Try patterns with your own API keys • <span className="text-violet-400">BYOK</span>
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-slate-400"
          >
            Test architecture patterns in your browser using your own API keys. Keys stay in your
            browser - never stored on our servers. Works with Anthropic, OpenAI, Google AI, and OCI GenAI.
          </motion.p>
        </div>
      </section>

      {/* BYOK Explanation */}
      <section className="py-8 border-y border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                <Key className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Bring Your Own Key (BYOK)
                </h3>
                <p className="mb-4 text-sm text-slate-400">
                  Prototypes use your API keys to make requests. This means:
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-400">✓</span>
                    <span>Your keys stay in your browser (localStorage) - never sent to our servers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-400">✓</span>
                    <span>You control costs - uses your own API quota</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-400">✓</span>
                    <span>Works with any provider - Anthropic, OpenAI, Google, or OCI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-400">✓</span>
                    <span>Same patterns work in production on your cloud</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Provider links */}
            <div className="mt-6 flex flex-wrap gap-3">
              {(['anthropic', 'openai', 'google', 'oci'] as AIProvider[]).map((provider) => {
                const meta = AI_PROVIDER_META[provider]
                return (
                  <a
                    key={provider}
                    href={meta.keyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 transition-all hover:border-white/20 hover:text-white"
                  >
                    <Key className="h-4 w-4" />
                    Get {meta.name} Key
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prototypes Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-white">Available Prototypes</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {upcomingPrototypes.map((prototype, index) => (
              <PrototypeCard key={prototype.id} prototype={prototype} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* External Tools */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-4 text-2xl font-bold text-white">Try External Tools</h2>
          <p className="mb-8 text-slate-400">
            While we build our prototypes, try these free tools to test patterns:
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: 'Google AI Studio',
                description: 'Free Gemini playground',
                url: 'https://aistudio.google.com',
              },
              {
                name: 'Anthropic Workbench',
                description: 'Test Claude prompts',
                url: 'https://console.anthropic.com/workbench',
              },
              {
                name: 'Vercel v0',
                description: 'AI UI generation',
                url: 'https://v0.dev',
              },
              {
                name: 'Replit',
                description: 'Deploy instantly',
                url: 'https://replit.com',
              },
            ].map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/10"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold text-white">{tool.name}</h4>
                  <ExternalLink className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-sm text-slate-400">{tool.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Want Production Code?</h2>
          <p className="mb-6 text-slate-400">
            Get deployment-ready templates with one-click deploy to Vercel, Railway, or OCI.
          </p>
          <Link
            href="/ai-architecture/templates"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Browse Templates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
