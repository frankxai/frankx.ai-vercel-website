import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, ExternalLink, GitBranch, LockKeyhole, Network, ShieldCheck } from 'lucide-react'
import EcosystemGraphWrapper from '@/components/ecosystem/EcosystemGraphWrapper'
import OperatingSystemNavigator from '@/components/ecosystem/OperatingSystemNavigator'
import { publicEcosystemEntries } from '@/data/ecosystem'
import {
  publicOperatingSystems,
  type OperatingSystemStage,
  type PublicOperatingSystem,
} from '@/data/public-operating-systems'

const PUBLIC_SYSTEM_COUNT = publicOperatingSystems.length

export const metadata: Metadata = {
  title: 'FrankX Operating Systems',
  description:
    'Choose an operating system for creative work, business, learning, life administration, music, family knowledge, or multi-agent infrastructure. Inspect the proof and start with one bounded workflow.',
  openGraph: {
    title: 'FrankX Operating Systems',
    description: 'Public blueprints, open-source systems, and private implementation boundaries for serious AI-native work.',
    type: 'website',
  },
  alternates: { canonical: 'https://frankx.ai/ecosystem' },
}

const STAGE_LABELS: Record<OperatingSystemStage, string> = {
  'open-source': 'Open source',
  'public-blueprint': 'Public blueprint',
  'private-system': 'Private system',
}

const STAGE_STYLES: Record<OperatingSystemStage, string> = {
  'open-source': 'border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-200',
  'public-blueprint': 'border-cyan-400/25 bg-cyan-400/[0.08] text-cyan-200',
  'private-system': 'border-amber-400/25 bg-amber-400/[0.08] text-amber-200',
}

function EcosystemSchema() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'FrankX Operating Systems',
    description: 'A public decision surface for choosing and inspecting FrankX operating systems.',
    url: 'https://frankx.ai/ecosystem',
    author: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: 'https://frankx.ai',
      jobTitle: 'AI Architect',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: PUBLIC_SYSTEM_COUNT,
      itemListElement: publicOperatingSystems.map((system, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: system.name,
        url: system.detailHref.startsWith('http') ? system.detailHref : `https://frankx.ai${system.detailHref}`,
      })),
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
}

function ProofLink({ system }: { system: PublicOperatingSystem }) {
  const className =
    'inline-flex min-h-10 items-center gap-1.5 rounded-lg text-sm font-medium text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101012]'

  if (system.proofHref.startsWith('http')) {
    return (
      <a href={system.proofHref} target="_blank" rel="noreferrer" className={className}>
        {system.proofLabel}
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    )
  }

  return (
    <Link href={system.proofHref} className={className}>
      {system.proofLabel}
      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  )
}

function SystemRecord({ system }: { system: PublicOperatingSystem }) {
  return (
    <article className="flex min-h-[340px] flex-col rounded-lg border border-white/[0.08] bg-[#101012] p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="max-w-[18rem] text-xl font-semibold tracking-tight text-white">{system.name}</h3>
        <span className={`rounded-md border px-2.5 py-1 text-xs ${STAGE_STYLES[system.stage]}`}>
          {STAGE_LABELS[system.stage]}
        </span>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-zinc-400">{system.audience}</p>
      <p className="mt-4 text-base leading-relaxed text-zinc-200">{system.outcome}</p>

      <div className="mt-6 border-l border-cyan-400/35 pl-4">
        <p className="text-xs text-zinc-500">First useful result</p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-300">{system.firstWin}</p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.08] pt-5">
        <Link
          href={system.detailHref}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg text-sm font-semibold text-white transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101012]"
        >
          Explore system
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
        <ProofLink system={system} />
      </div>
    </article>
  )
}

export default async function EcosystemPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const view = Array.isArray(params?.view) ? params.view[0] : params?.view
  const isRelationshipView = view === 'map' || view === '3d'

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50">
      <EcosystemSchema />

      <section className="relative overflow-hidden border-b border-white/[0.08] pt-28 sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-px bg-cyan-300/40" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <p className="text-sm font-medium text-cyan-300">FrankX operating systems</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Choose the system that matches the work.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
            FrankX is a portfolio of public blueprints, open-source operating systems, and private operator infrastructure.
            Start with the outcome you need, inspect the evidence, and keep the boundary explicit.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#navigator"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Find your starting system
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={isRelationshipView ? '/ecosystem' : '/ecosystem?view=map'}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/[0.14] px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/[0.28] hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {isRelationshipView ? 'Open decision view' : 'Open relationship map'}
              <Network className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <dl className="mt-14 grid max-w-4xl grid-cols-1 border-y border-white/[0.08] sm:grid-cols-3">
            <div className="py-4 sm:pr-6">
              <dt className="text-xs text-zinc-500">Public starting systems</dt>
              <dd className="mt-1 text-lg font-semibold text-white">{PUBLIC_SYSTEM_COUNT}</dd>
            </div>
            <div className="border-white/[0.08] py-4 sm:border-x sm:px-6">
              <dt className="text-xs text-zinc-500">Evidence types</dt>
              <dd className="mt-1 text-lg font-semibold text-white">Blueprints and repositories</dd>
            </div>
            <div className="py-4 sm:pl-6">
              <dt className="text-xs text-zinc-500">Private estate</dt>
              <dd className="mt-1 text-lg font-semibold text-white">Excluded by design</dd>
            </div>
          </dl>
        </div>
      </section>

      {isRelationshipView ? (
        <section className="border-b border-white/[0.08] py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-3xl">
              <p className="text-sm font-medium text-cyan-300">Relationship map</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Public systems, connected to their substrate.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                This lens contains only public-safe systems. Internal operations, private memory, family records, health data,
                financial data, credentials, and machine state are intentionally absent.
              </p>
            </div>
            <EcosystemGraphWrapper />
          </div>
        </section>
      ) : (
        <OperatingSystemNavigator />
      )}

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-zinc-500">Public system families</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Inspect the mechanism before you adopt the label.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              Each system states who it serves, the first useful result, the proof available today, and the actions it does not own.
            </p>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {publicOperatingSystems.map((system) => (
              <SystemRecord key={system.id} system={system} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#0d0d0f] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-medium text-cyan-300">How the portfolio fits together</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              One substrate. Several bounded operating systems.
            </h2>
          </div>
          <ol className="space-y-7">
            {[
              ['01', 'Substrate', 'Starlight supplies memory, provenance, governance, validation, and release evidence.'],
              ['02', 'Operating system', 'Each domain defines its own records, workflows, review gates, and failure boundaries.'],
              ['03', 'First workflow', 'Adoption starts with one real loop: a brief, decision, study project, release packet, or weekly review.'],
              ['04', 'Proof', 'The result is inspectable through a repository, public blueprint, generated plan, command output, or review artifact.'],
            ].map(([index, title, copy]) => (
              <li key={index} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-white/[0.08] pt-5">
                <span className="font-mono text-xs text-cyan-300">{index}</span>
                <div>
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <LockKeyhole className="h-7 w-7 text-amber-300" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white">Public by evidence. Private by default.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
              <div className="border-l border-emerald-400/35 pl-5">
                <GitBranch className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold text-white">Public layer</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Sanitized blueprints, open repositories, architecture, starter workflows, and evidence that can be inspected safely.
                </p>
              </div>
              <div className="border-l border-amber-400/35 pl-5">
                <ShieldCheck className="h-5 w-5 text-amber-300" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold text-white">Private layer</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Memory, health, finance, family records, credentials, customer data, machine state, and production authority.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/[0.08] pt-8">
            <Link href="/start-here" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200">
              Learn the six agent primitives
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 py-2.5 text-sm font-medium text-zinc-300 hover:text-white">
              Discuss a private implementation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <span className="text-xs text-zinc-600">{publicEcosystemEntries.length} public-safe entries remain available in the deeper registry.</span>
          </div>
        </div>
      </section>
    </div>
  )
}
