import Link from 'next/link'
import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import {
  workflowCategories,
  workflowRegistry,
  workflowSummary,
} from '@/lib/automation/workflow-registry'

export const metadata = createMetadata({
  title: 'n8n Automation Templates — FrankX',
  description:
    `Browse ${workflowSummary.total} production n8n workflows powering the FrankX automation empire. Morning briefs, content atomizers, mega orchestrators, and more.`,
  path: '/n8n',
  keywords: ['n8n workflows', 'automation templates', 'n8n examples', 'workflow automation', 'ai automation'],
})

const categoryColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  'Core Infrastructure': { bg: 'bg-violet-500/5', border: 'border-violet-500/20', text: 'text-violet-400', dot: 'bg-violet-400' },
  'Daily Intelligence': { bg: 'bg-cyan-500/5', border: 'border-cyan-500/20', text: 'text-cyan-400', dot: 'bg-cyan-400' },
  'Content & Marketing': { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  Analytics: { bg: 'bg-amber-500/5', border: 'border-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400' },
  DevOps: { bg: 'bg-rose-500/5', border: 'border-rose-500/20', text: 'text-rose-400', dot: 'bg-rose-400' },
}

export default function N8nPage() {
  const activeCount = workflowSummary.active

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white">
      <JsonLd
        type="CollectionPage"
        data={{
          name: 'n8n Automation Templates — FrankX',
          description: `${workflowSummary.total} production n8n workflows powering the FrankX automation empire.`,
          url: 'https://frankx.ai/n8n',
        }}
      />

      {/* Hero */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-medium tracking-widest text-emerald-400 uppercase">
            Automation Templates
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            n8n Workflow Registry
          </h1>
          <p className="max-w-2xl text-lg text-slate-400">
            {workflowSummary.total} production workflows. {activeCount} currently active.
            From morning intelligence briefs to content atomizers — this is the
            automation empire that runs the entire operation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {workflowCategories.map((cat) => {
              const c = categoryColors[cat] || categoryColors['Core Infrastructure']
              const count = workflowRegistry.filter((w) => w.category === cat).length
              return (
                <span
                  key={cat}
                  className={`inline-flex items-center gap-2 rounded-full border ${c.border} ${c.bg} px-3 py-1 text-xs ${c.text}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                  {cat} ({count})
                </span>
              )
            })}
          </div>
        </div>
      </section>

      {/* Workflow grid by category */}
      {workflowCategories.map((category) => {
        const catWorkflows = workflowRegistry.filter((w) => w.category === category)
        const c = categoryColors[category] || categoryColors['Core Infrastructure']

        return (
          <section key={category} className="px-6 pb-16">
            <div className="mx-auto max-w-5xl">
              <h2 className={`mb-6 flex items-center gap-3 text-lg font-semibold ${c.text}`}>
                <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                {category}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {catWorkflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className={`rounded-xl border ${c.border} ${c.bg} p-5 transition-all hover:border-opacity-40`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold text-white">{workflow.name}</h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          workflow.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-slate-500/10 text-slate-500'
                        }`}
                      >
                        {workflow.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{workflow.description}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                      <span>{workflow.trigger}</span>
                      {workflow.schedule && (
                        <>
                          <span>&middot;</span>
                          <span>{workflow.schedule}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-slate-400">
            Want to learn how to build your own automation empire?
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Link
              href="/automation"
              className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
            >
              See the full story
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border border-white/10 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/20"
            >
              Read tutorials
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
