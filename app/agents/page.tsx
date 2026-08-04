import { Suspense } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import type { Metadata } from 'next'
import { ArrowRight, Github, ShieldCheck } from 'lucide-react'
import { PILLARS, enrichedSlot, pillarCounts } from '@/data/acos/agents'
import { catalogL99 } from '@/lib/acos/l99-score'
import { AgentRegistry, type RegistryPillar } from '@/components/agents/AgentRegistry'

export const metadata: Metadata = {
  title: 'Agent Registry · The FrankX Operating Surface',
  description: 'The canonical public registry of FrankX agents, skills, commands, and MCP capabilities—computed from source with honest ship states and quality gates.',
  alternates: { canonical: 'https://frankx.ai/agents' },
  openGraph: {
    title: 'FrankX Agent Registry',
    description: 'Every declared capability, current state, model tier, and quality gate—computed from the operating source.',
    url: 'https://frankx.ai/agents',
    siteName: 'FrankX',
    type: 'website',
  },
}

function registryPillars(): RegistryPillar[] {
  return PILLARS.map((pillar) => ({
    id: pillar.id,
    number: pillar.number,
    title: pillar.title,
    tagline: pillar.tagline,
    accent: pillar.accent,
    agents: pillar.specialists.map((raw) => {
      const slot = enrichedSlot(raw)
      return {
        name: slot.name,
        kind: slot.kind,
        ref: slot.ref ?? null,
        status: slot.status,
        tier: slot.tier ?? null,
        summary: slot.one_liner,
        gates: slot.gates ?? null,
      }
    }),
  }))
}

export default function AgentsPage() {
  const counts = pillarCounts()
  const l99 = catalogL99()
  const pillars = registryPillars()
  const slots = pillars.flatMap((pillar) => pillar.agents)
  const dispatchable = slots.filter((slot) => slot.gates?.dispatchable).length
  const tested = slots.filter((slot) => slot.gates?.tested).length
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://frankx.ai/agents#page',
        name: 'FrankX Agent Registry',
        description: 'The canonical public operating registry for FrankX agents and capabilities.',
        url: 'https://frankx.ai/agents',
        isPartOf: { '@type': 'WebSite', name: 'FrankX', url: 'https://frankx.ai' },
        hasPart: pillars.map((pillar) => ({
          '@type': 'Collection',
          name: pillar.title,
          description: pillar.tagline,
          url: `https://frankx.ai/agents#${pillar.id}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'FrankX', item: 'https://frankx.ai' },
          { '@type': 'ListItem', position: 2, name: 'Agent Registry', item: 'https://frankx.ai/agents' },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <Script id="agents-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="relative overflow-hidden border-b border-white/[0.08] px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute left-[-20rem] top-[-18rem] h-[52rem] w-[52rem] rounded-full bg-emerald-500/[0.09] blur-[170px]" />
          <div className="absolute right-[-20rem] top-[-8rem] h-[50rem] w-[50rem] rounded-full bg-cyan-500/[0.08] blur-[170px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300/75">
            Canonical public registry · computed from source
          </p>
          <h1 className="mt-5 max-w-5xl text-balance font-display text-4xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Every agent. Every state.<br />No invented number.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
            This is the operating surface behind FrankX: {counts.total} declared capability slots across {PILLARS.length} pillars. Shipped means an implementation reference exists. The four gates below show whether a role is dispatchable, tested, composed, and ready to carry public work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/agent?from=registry" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 text-sm font-semibold text-slate-950 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]">
              Ask Frank Intelligence <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href="https://github.com/frankxai/frankx.ai-vercel-website/blob/main/data/acos/agents.ts" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white/70 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              <Github className="h-4 w-4" aria-hidden /> Public source
            </a>
          </div>

          <dl className="mt-12 grid overflow-hidden rounded-2xl border border-white/10 bg-black/20 sm:grid-cols-5">
            {[
              ['Declared', counts.total, 'capability slots'],
              ['Shipped', counts.shipped, 'implementation refs'],
              ['Dispatchable', dispatchable, 'gate verified'],
              ['Tested', tested, 'smoke evidence'],
              ['Registry quality', `L${l99.level}`, 'four-gate rollup'],
            ].map(([label, value, note]) => (
              <div key={label} className="border-b border-white/[0.08] p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <dt className="text-xs font-medium text-white/38">{label}</dt>
                <dd className="mt-2 font-mono text-2xl text-white">{value}</dd>
                <p className="mt-1 text-xs text-white/30">{note}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-white/[0.08] px-5 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-start gap-3 rounded-xl border border-emerald-300/15 bg-emerald-300/[0.035] px-4 py-4 text-sm leading-6 text-white/55">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
          <p><strong className="text-white">Truth model:</strong> status and quality are separate. A shipped agent can still be waiting on a test, composition path, or brand gate. Gaps stay visible until the implementation exists.</p>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[40rem]" />}>
        <AgentRegistry pillars={pillars} />
      </Suspense>
    </main>
  )
}
