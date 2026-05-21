import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Building2, CheckCircle2, ShieldCheck, Workflow } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Enterprise AI Architecture | FrankX',
  description:
    'Enterprise AI architecture, governance, and agentic operating-system patterns for teams moving from pilots to production.',
  alternates: { canonical: 'https://frankx.ai/enterprise' },
}

const capabilities = [
  {
    title: 'AI Center of Excellence',
    description: 'Operating model, governance, skills, tooling, and adoption rhythm for enterprise AI programs.',
    icon: Building2,
  },
  {
    title: 'Agentic Workflows',
    description: 'Multi-agent patterns, MCP integration, and evaluation loops for production-grade automations.',
    icon: Workflow,
  },
  {
    title: 'Responsible Delivery',
    description: 'Risk controls, measurement, and release gates that help teams ship useful systems without theater.',
    icon: ShieldCheck,
  },
]

export default function EnterprisePage() {
  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Enterprise
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            AI architecture for teams moving from demos to systems.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            FrankX translates enterprise AI operating patterns into practical delivery systems:
            strategy, governance, talent, technology, data, and ethics connected to shipping work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/workshops/personal-ai-coe"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Build an AI CoE
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/ai-architecture"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View architecture hub
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {capabilities.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
                <Icon className="h-6 w-6 text-cyan-300" />
                <h2 className="mt-5 text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-12 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.06] p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-300" />
            <p className="text-sm leading-6 text-slate-300">
              This page is intentionally direct: no unverifiable claims, no inflated metrics, and no vague platform promise.
              Use it as the clean enterprise entry point for FrankX.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
