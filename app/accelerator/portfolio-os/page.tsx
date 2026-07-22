import type { Metadata } from 'next'
import Link from 'next/link'
import { GlowCard } from '@/components/ui/glow-card'
import { AcceleratorSubnav } from '@/components/accelerator/AcceleratorSubnav'

export const metadata: Metadata = {
  title: 'Starlight Portfolio OS — Infrastructure for Accelerators',
  description:
    'Program-level intelligence, diligence workflows, agent swarms, shared pattern libraries, and Day-0 founder OS kits. The product accelerators install to amplify portfolio companies.',
  alternates: { canonical: 'https://frankx.ai/accelerator/portfolio-os' },
  openGraph: {
    title: 'Starlight Portfolio OS',
    description:
      'Shared AI infrastructure for accelerators and VCs — not automated investing.',
    url: 'https://frankx.ai/accelerator/portfolio-os',
  },
}

const capabilities = [
  {
    title: 'Program intelligence system',
    body: 'Thesis, deal, portfolio, and ops memory vaults — one shared brain for the program, not forty disconnected chat threads.',
  },
  {
    title: 'Diligence fabric',
    body: 'Structured intake, evidence queues, memo drafts, and risk registers using Investor OS workflows. Partners remain the decision owners.',
  },
  {
    title: 'Agent swarms',
    body: 'Program roles (intake, diligence, support, finops, compliance) plus per-startup packs for ops, build, GTM, and creative work.',
  },
  {
    title: 'Day-0 founder OS kits',
    body: 'Every accepted company receives a derived Business or Creator OS: doctrine, design contract, gates, weekly rhythm, update channel.',
  },
  {
    title: 'Shared institutional patterns',
    body: 'Anonymized cohort learnings that compound across batches — never raw founder secrets in public datasets.',
  },
  {
    title: 'Human approval gates',
    body: 'Capital, outreach, publication, credentials, and production deploys stay human-gated. Agents draft; operators decide.',
  },
]

const delivery = [
  {
    n: '01',
    title: 'Pilot scope',
    body: 'One cohort or a bounded diligence sprint — not a multi-year SaaS fantasy on week one.',
  },
  {
    n: '02',
    title: 'Program control plane',
    body: 'Git-first program repo + agent fabric + board cadence. Hosted console only when tenancy is ready.',
  },
  {
    n: '03',
    title: 'Issue startup kits',
    body: 'Each company gets instance-owned brand files and shared machinery with readable harness-update PRs.',
  },
  {
    n: '04',
    title: 'Support loop',
    body: 'Weekly portfolio support plans, proof rituals, and spend envelopes — partners review, agents prepare.',
  },
]

export default function PortfolioOsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white/80">
      <AcceleratorSubnav active="/accelerator/portfolio-os" />

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 lg:pt-24">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-cyan-400/60">
          Product · L2 Portfolio surface
        </p>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl">
          Starlight Portfolio OS
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/60">
          The operating system accelerators and VCs run so every portfolio company inherits agentic
          infrastructure — intelligence, swarms, diligence, and founder OS kits — without each
          startup reinventing AI chaos alone.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/accelerator#apply"
            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
          >
            Apply for a pilot
          </Link>
          <Link
            href="https://github.com/frankxai/agentic-investor-os"
            rel="noopener"
            className="px-2 py-3.5 text-sm font-semibold text-cyan-400/80 hover:text-cyan-300"
          >
            Public Investor OS →
          </Link>
        </div>
      </section>

      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white">What you equip</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <GlowCard key={c.title} color="cyan" className="p-6">
                <h3 className="text-base font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{c.body}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white">How a pilot lands</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {delivery.map((d) => (
              <div key={d.n} className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                <p className="font-mono text-xs text-cyan-400/60">{d.n}</p>
                <h3 className="mt-2 text-base font-semibold text-white">{d.title}</h3>
                <p className="mt-2 text-sm text-white/60">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <GlowCard color="white" className="p-8">
            <h2 className="text-2xl font-bold text-white">Brand is theirs. Machinery is shared.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/60">
              The same contract that powers Foundry installs: founder-facing doctrine, voice, and
              design tokens stay instance-owned and never auto-overwritten. Shared gates, agent
              contracts, and workflows improve upstream and arrive as readable pull requests programs
              and companies choose to merge. See the public harness doctrine in{' '}
              <a
                href="https://github.com/frankxai/agentic-business-os/blob/main/HARNESS.md"
                rel="noopener"
                className="text-cyan-400 hover:underline"
              >
                agentic-business-os HARNESS.md
              </a>
              .
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/accelerator/starlight" className="text-sm font-semibold text-violet-300">
                Starlight thesis →
              </Link>
              <Link href="/accelerator/arcanea" className="text-sm font-semibold text-amber-300">
                Arcanea thesis →
              </Link>
              <Link href="/accelerator/guide" className="text-sm font-semibold text-white/70">
                Operating guide →
              </Link>
            </div>
          </GlowCard>
        </div>
      </section>
    </main>
  )
}
