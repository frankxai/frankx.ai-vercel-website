'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Package,
  ChevronLeft,
  Check,
  ArrowRight,
  Database,
  Users,
  MessageSquare,
  Server,
  Zap,
  Shield,
  ExternalLink,
} from 'lucide-react'

// Template products (coming soon)
const templates = [
  {
    id: 'rag-starter-kit',
    title: 'RAG Starter Kit',
    subtitle: 'Production-ready document Q&A',
    price: 49,
    originalPrice: 79,
    icon: Database,
    color: 'emerald',
    features: [
      'Next.js 15 + TypeScript',
      'Pinecone vector database',
      'Multi-provider (Claude, GPT, OCI)',
      'PDF/DOCX ingestion',
      'Source citations',
      'One-click Vercel deploy',
    ],
    techStack: ['Next.js', 'Pinecone', 'Vercel AI SDK', 'TypeScript'],
    includesOCI: true,
    status: 'coming-soon',
  },
  {
    id: 'multi-agent-framework',
    title: 'Multi-Agent Framework',
    subtitle: 'Coordinated agent workflows',
    price: 99,
    originalPrice: 149,
    icon: Users,
    color: 'violet',
    features: [
      'LangGraph orchestration',
      '5 agent patterns included',
      'Tool calling & handoffs',
      'Execution tracing',
      'State persistence',
      'OCI GenAI variant',
    ],
    techStack: ['LangGraph', 'Python', 'Claude/GPT', 'Redis'],
    includesOCI: true,
    status: 'coming-soon',
  },
  {
    id: 'ai-chat-widget',
    title: 'AI Chat Widget',
    subtitle: 'Embeddable chat component',
    price: 29,
    originalPrice: 49,
    icon: MessageSquare,
    color: 'cyan',
    features: [
      'React component',
      'Streaming responses',
      'Customizable styling',
      'Conversation history',
      'Embed anywhere',
      'TypeScript types',
    ],
    techStack: ['React', 'Vercel AI SDK', 'Tailwind CSS'],
    includesOCI: false,
    status: 'coming-soon',
  },
  {
    id: 'mcp-server-starter',
    title: 'MCP Server Starter',
    subtitle: 'Custom tool integrations',
    price: 49,
    originalPrice: 69,
    icon: Server,
    color: 'orange',
    features: [
      'MCP server boilerplate',
      'Tool & resource patterns',
      'Claude Code integration',
      'Testing utilities',
      'Documentation',
      'Example tools',
    ],
    techStack: ['TypeScript', 'MCP SDK', 'Node.js'],
    includesOCI: false,
    status: 'coming-soon',
  },
  {
    id: 'enterprise-rag-platform',
    title: 'Enterprise RAG Platform',
    subtitle: 'Full production system',
    price: 199,
    originalPrice: 299,
    icon: Shield,
    color: 'blue',
    features: [
      'Everything in Starter Kit',
      'Auth (NextAuth.js)',
      'Admin dashboard',
      'Usage analytics',
      'Team permissions',
      'Terraform for OCI',
    ],
    techStack: ['Next.js', 'PostgreSQL', 'NextAuth', 'Terraform'],
    includesOCI: true,
    status: 'coming-soon',
  },
  {
    id: 'llmops-pipeline',
    title: 'LLMOps Pipeline',
    subtitle: 'Evaluation & monitoring',
    price: 79,
    originalPrice: 119,
    icon: Zap,
    color: 'amber',
    features: [
      'Prompt versioning',
      'A/B testing framework',
      'Evaluation metrics',
      'Cost tracking',
      'Logging & traces',
      'Dashboard UI',
    ],
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Langfuse'],
    includesOCI: true,
    status: 'coming-soon',
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
  template: (typeof templates)[0]
  index: number
}) {
  const Icon = template.icon
  const colors = colorMap[template.color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div
        className={`relative h-full rounded-2xl border ${colors.border} ${colors.bg} p-6 transition-all duration-300`}
      >
        {/* Coming soon badge */}
        <div className={`absolute -right-2 -top-2 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${colors.badge}`}>
          Coming Soon
        </div>

        {/* OCI badge */}
        {template.includesOCI && (
          <div className="absolute -left-2 -top-2 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold text-red-400 border border-red-500/30">
            OCI Ready
          </div>
        )}

        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="text-right">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">${template.price}</span>
              <span className="text-sm text-slate-500 line-through">${template.originalPrice}</span>
            </div>
            <span className="text-xs text-emerald-400">
              Save ${template.originalPrice - template.price}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-1 text-lg font-bold text-white">{template.title}</h3>
        <p className="mb-4 text-sm text-slate-400">{template.subtitle}</p>

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

        {/* Button */}
        <button
          disabled
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 font-semibold text-slate-400 cursor-not-allowed"
        >
          Coming Soon
        </button>
      </div>
    </motion.div>
  )
}

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-[#030712]">
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Starter Templates</h1>
              <p className="text-slate-400">
                Production-ready code • <span className="text-emerald-400">$29-199</span>
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-slate-400"
          >
            Skip weeks of boilerplate. Each template includes full source code, one-click deploy
            buttons, and OCI GenAI variants where applicable. Buy once, use forever.
          </motion.p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-8 border-y border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Full Source Code', desc: 'No obfuscation, yours forever' },
              { label: 'One-Click Deploy', desc: 'Vercel, Railway, Render' },
              { label: 'Video Walkthrough', desc: 'Setup & customization guide' },
              { label: 'Discord Support', desc: 'Community help channel' },
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
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'What do I get when I purchase?',
                a: 'You get access to a private GitHub repository with full source code, deploy buttons for Vercel/Railway/Render, a video walkthrough, and access to our Discord support channel.',
              },
              {
                q: 'Can I use templates for commercial projects?',
                a: 'Yes! All templates include a commercial license. Use them for client projects, SaaS products, or internal tools.',
              },
              {
                q: 'Do templates work with OCI GenAI?',
                a: 'Templates marked "OCI Ready" include OCI GenAI provider variants and Terraform deployment scripts for Oracle Cloud Infrastructure.',
              },
              {
                q: 'Do I need my own API keys?',
                a: 'Yes, templates require your own API keys for the AI providers you want to use (Anthropic, OpenAI, Google, or OCI). This gives you full control over costs.',
              },
              {
                q: 'Are there refunds?',
                a: 'Due to the digital nature of templates (you receive source code immediately), we cannot offer refunds. Please review the features carefully before purchasing.',
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
          <h2 className="mb-4 text-2xl font-bold text-white">Get Notified at Launch</h2>
          <p className="mb-6 text-slate-400">
            Be the first to know when templates are available. Early subscribers get 20% off.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Join Newsletter
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
