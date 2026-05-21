import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Bot, FileText, GitBranch, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Agentic AI Center | FrankX',
  description:
    'A practical center for agent systems, production playbooks, evaluation workflows, and operating patterns.',
  alternates: { canonical: 'https://frankx.ai/agentic-ai-center' },
}

const tracks = [
  {
    title: 'Agent Design',
    description: 'Define roles, tools, memory boundaries, and escalation paths before writing code.',
    icon: Bot,
  },
  {
    title: 'Production Playbooks',
    description: 'Turn repeatable agent work into checklists, prompts, tests, and release gates.',
    icon: FileText,
  },
  {
    title: 'Evaluation Loops',
    description: 'Measure output quality, failure modes, and operational readiness before rollout.',
    icon: ShieldCheck,
  },
  {
    title: 'MCP and Tooling',
    description: 'Connect agents to local context, repositories, and approved external systems.',
    icon: GitBranch,
  },
]

export default function AgenticAICenterPage() {
  return (
    <main className="min-h-screen bg-[#07080c] text-white">
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
            Agentic AI Center
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Agent systems that can be reviewed, tested, and improved.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            A clean operating surface for agentic AI: design patterns, implementation notes,
            evaluation habits, and production workflows for builders who care about quality.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/developers"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Developer resources
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Research notes
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tracks.map((track) => {
            const Icon = track.icon
            return (
              <article key={track.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                <Icon className="h-5 w-5 text-emerald-300" />
                <h2 className="mt-5 text-base font-semibold text-white">{track.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{track.description}</p>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
