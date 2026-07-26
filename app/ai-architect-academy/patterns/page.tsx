import Link from 'next/link'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Blocks,
  Bot,
  Database,
  Gauge,
  GitBranch,
  Network,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Architecture Patterns | AI Architect Academy',
  description:
    'A practical pattern index for AI gateways, production RAG, multi-agent orchestration, MCP servers, LLMOps, observability, security, and vector database selection.',
  path: '/ai-architect-academy/patterns',
})

type PatternEntry = {
  id: string
  aliases?: string[]
  title: string
  category: string
  description: string
  decision: string
  Icon: LucideIcon
}

const patterns: PatternEntry[] = [
  {
    id: 'ai-gateway',
    title: 'AI Gateway',
    category: 'Platform control',
    description:
      'Place one governed access layer between applications and model providers for routing, authentication, budgets, policy, and auditability.',
    decision:
      'Use it when several teams, models, or providers need one enforceable operating boundary.',
    Icon: ShieldCheck,
  },
  {
    id: 'rag-production',
    title: 'Production RAG',
    category: 'Grounded generation',
    description:
      'Separate ingestion, indexing, retrieval, answer generation, and citation checks so each stage can be evaluated and repaired.',
    decision:
      'Use it when answers must be grounded in private or frequently changing source material.',
    Icon: Database,
  },
  {
    id: 'multi-agent-orchestration',
    aliases: ['multi-agent'],
    title: 'Multi-Agent Orchestration',
    category: 'Agent systems',
    description:
      'Assign narrow roles, explicit tool contracts, shared state, and recovery paths instead of relying on one unconstrained agent loop.',
    decision:
      'Use it when work has genuinely different responsibilities, permissions, or verification steps.',
    Icon: Network,
  },
  {
    id: 'mcp-server-architecture',
    aliases: ['mcp'],
    title: 'MCP Server Architecture',
    category: 'Tool connectivity',
    description:
      'Expose tools and context through small, typed interfaces with least-privilege access, validation, and observable execution.',
    decision:
      'Use it when several assistants or agents need safe access to the same systems and data.',
    Icon: Blocks,
  },
  {
    id: 'llmops',
    title: 'LLMOps',
    category: 'Model operations',
    description:
      'Version prompts and datasets, evaluate behavior, control releases, and monitor quality, latency, and cost as one operating loop.',
    decision:
      'Use it when an LLM feature has moved beyond a prototype and changes need controlled promotion.',
    Icon: GitBranch,
  },
  {
    id: 'observability',
    title: 'AI Observability',
    category: 'Operations',
    description:
      'Trace model calls, tool use, retrieval, latency, cost, and evaluation results across the complete request path.',
    decision:
      'Use it before production incidents force you to reconstruct agent behavior from partial logs.',
    Icon: Activity,
  },
  {
    id: 'security-governance',
    title: 'Security and Governance',
    category: 'Risk control',
    description:
      'Combine identity, data boundaries, approval gates, policy checks, and evidence retention around model and tool access.',
    decision:
      'Use it whenever AI touches sensitive data, consequential actions, or regulated processes.',
    Icon: Bot,
  },
  {
    id: 'vector-database-selection',
    title: 'Vector Database Selection',
    category: 'Retrieval infrastructure',
    description:
      'Choose storage by retrieval quality, filtering, tenancy, operations, and total system cost—not benchmark speed alone.',
    decision:
      'Use it before committing a retrieval architecture to a database that cannot meet production constraints.',
    Icon: Gauge,
  },
]

export default function AcademyPatternsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="border-b border-white/[0.06] pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Link
            href="/ai-architect-academy"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#b8b8bd] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            AI Architect Academy
          </Link>
          <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-300/75">
            Pattern library
          </p>
          <h1 className="mt-6 max-w-5xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            The patterns behind production AI.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#b8b8bd]">
            Eight reusable decisions for model access, retrieval, agent coordination, operations,
            and governance. Start with the problem your system needs to survive.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="border-b border-white/[0.07]">
            {patterns.map(({ id, aliases, title, category, description, decision, Icon }, index) => (
              <article
                key={id}
                id={id}
                className="scroll-mt-28 border-t border-white/[0.07] py-9 sm:px-4"
              >
                {aliases?.map((alias) => (
                  <span key={alias} id={alias} className="scroll-mt-28" aria-hidden="true" />
                ))}
                <div className="grid gap-6 lg:grid-cols-[48px_0.45fr_0.55fr] lg:items-start">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-emerald-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300/70">
                      {String(index + 1).padStart(2, '0')} / {category}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em]">
                      {title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-[#b8b8bd]">{description}</p>
                  </div>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#111113] p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#98989f]">
                      Architecture decision
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#b8b8bd]">{decision}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-[#0d0d0f] py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/70">
              Implementation source
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em]">
              Take the pattern into a real architecture.
            </h2>
          </div>
          <TrackedLink
            href="https://github.com/frankxai/ai-architect-academy/tree/main/01-design-patterns"
            target="_blank"
            rel="noopener noreferrer"
            eventName="cta_click"
            eventProperties={{
              location: 'academy-patterns',
              target: 'implementation-patterns',
            }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0f]"
            aria-label="Open the AI Architect Academy pattern repository on GitHub (opens in a new tab)"
          >
            Explore implementation patterns
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TrackedLink>
        </div>
      </section>
    </main>
  )
}
