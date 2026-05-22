import Link from 'next/link'
import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import { workflowSummary } from '@/lib/automation/workflow-registry'

export const metadata = createMetadata({
  title: 'Automation Empire — FrankX',
  description:
    `How one builder went from 0 to ${workflowSummary.total} production n8n workflows. The architecture, the lessons, and the automation empire that runs the entire FrankX operation.`,
  path: '/automation',
  keywords: [
    'n8n automation',
    'workflow automation',
    'automation empire',
    'ai automation',
    'n8n workflows',
    'mega orchestrator',
  ],
})

// ── Timeline data ──

const timeline = [
  { phase: 'Foundation', workflows: '0 → 3', description: 'Morning Brief, Intelligence Hub, Mega Orchestrator — the core three that proved the concept.', color: 'violet' },
  { phase: 'Intelligence', workflows: '3 → 7', description: 'Added Strategic Brief, Dev Briefing, ACOS Skills Agent, and CoinGecko Pulse for market data.', color: 'cyan' },
  { phase: 'Content', workflows: '7 → 10', description: 'Newsletter Engine, Content Atomizer, RSS Monitor, and the content pipeline came online.', color: 'emerald' },
  { phase: 'Scale', workflows: '10 → 12', description: 'Music Catalog Sync and extended DevOps lanes completed the current production registry.', color: 'amber' },
]

const stats = [
  { label: 'Active Workflows', value: String(workflowSummary.active) },
  { label: 'Total Registry', value: String(workflowSummary.total), sublabel: `${workflowSummary.inactive} paused` },
  { label: 'Slack Channels', value: '8' },
  { label: 'Trigger Types', value: String(workflowSummary.triggerTypes), sublabel: 'Cron + Webhook' },
  { label: 'Routes (Mega Orchestrator)', value: '8' },
  { label: 'Daily Automations', value: '10+' },
  { label: 'Infrastructure Cost', value: '$5/mo', sublabel: 'Railway hosting' },
]

export default function AutomationPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white">
      <JsonLd
        type="CollectionPage"
        data={{
          name: 'Automation Empire — FrankX',
          description: `${workflowSummary.active} active n8n workflows powering the FrankX operation.`,
          url: 'https://frankx.ai/automation',
        }}
      />

      {/* Hero */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-medium tracking-widest text-emerald-400 uppercase">
            Infrastructure
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            The Automation Empire
          </h1>
          <p className="max-w-2xl text-xl text-slate-400">
            {workflowSummary.total} workflows. 8 Slack channels. {workflowSummary.triggerTypes} trigger types. One architect.
            This is the automation infrastructure that runs everything — from
            morning intelligence briefs to content distribution to music catalog management.
          </p>
        </div>
      </section>

      {/* Stats grid */}
      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-5"
            >
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              {stat.sublabel && (
                <p className="mt-0.5 text-xs text-slate-600">{stat.sublabel}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-2xl font-bold">The Build Timeline</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-cyan-500/40 via-emerald-500/40 to-amber-500/40" />

            <div className="space-y-12">
              {timeline.map((phase, i) => {
                const dotColors: Record<string, string> = {
                  violet: 'bg-violet-400 shadow-violet-400/40',
                  cyan: 'bg-cyan-400 shadow-cyan-400/40',
                  emerald: 'bg-emerald-400 shadow-emerald-400/40',
                  amber: 'bg-amber-400 shadow-amber-400/40',
                }
                const textColors: Record<string, string> = {
                  violet: 'text-violet-400',
                  cyan: 'text-cyan-400',
                  emerald: 'text-emerald-400',
                  amber: 'text-amber-400',
                }

                return (
                  <div key={phase.phase} className="relative pl-12">
                    <div
                      className={`absolute left-2.5 top-1 h-3 w-3 rounded-full ${dotColors[phase.color]} shadow-lg`}
                    />
                    <div className="flex items-baseline gap-3">
                      <span className={`font-mono text-sm font-semibold ${textColors[phase.color]}`}>
                        Phase {i + 1}: {phase.phase}
                      </span>
                      <span className="font-mono text-xs text-slate-500">
                        {phase.workflows} workflows
                      </span>
                    </div>
                    <p className="mt-2 text-slate-400">{phase.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture diagram — Mega Orchestrator */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-2xl font-bold">The Mega Orchestrator</h2>
          <p className="mb-8 text-slate-400">
            The central hub that routes all intents. 14 nodes, 8 routes, one webhook
            that handles everything from content creation to crypto analysis.
          </p>

          <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                Mega Orchestrator
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { route: 'CONTENT', color: 'emerald' },
                  { route: 'NEWSLETTER', color: 'cyan' },
                  { route: 'VIDEO', color: 'rose' },
                  { route: 'CRYPTO', color: 'amber' },
                  { route: 'MUSIC', color: 'purple' },
                  { route: 'ANALYTICS', color: 'blue' },
                  { route: 'INTELLIGENCE', color: 'indigo' },
                  { route: 'DEPLOY', color: 'teal' },
                ].map((r) => {
                  const bg: Record<string, string> = {
                    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
                    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
                    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
                    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
                    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
                    indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
                    teal: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
                  }
                  return (
                    <div
                      key={r.route}
                      className={`rounded-lg border px-3 py-2 text-xs font-medium ${bg[r.color]}`}
                    >
                      {r.route}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="border-t border-white/5 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/n8n"
              className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 transition-all hover:border-emerald-500/30"
            >
              <h3 className="font-semibold text-emerald-300">Workflow Templates</h3>
              <p className="mt-1 text-sm text-slate-400">
                Browse all {workflowSummary.total} workflows with trigger types and schedules.
              </p>
            </Link>
            <Link
              href="/blog/multi-agent-orchestration-patterns-2026"
              className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5 transition-all hover:border-violet-500/30"
            >
              <h3 className="font-semibold text-violet-300">Orchestration Philosophy</h3>
              <p className="mt-1 text-sm text-slate-400">
                Why orchestration beats automation — the deeper thinking.
              </p>
            </Link>
            <Link
              href="/blog"
              className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5 transition-all hover:border-cyan-500/30"
            >
              <h3 className="font-semibold text-cyan-300">Technical Field Guides</h3>
              <p className="mt-1 text-sm text-slate-400">
                Tutorials on building your own automation systems.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
