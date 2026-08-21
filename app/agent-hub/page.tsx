import Link from 'next/link'
import { ArrowRight, Compass, ShieldCheck, Boxes } from 'lucide-react'
import {
  agentRegistryCaveat,
  agentRegistryLastUpdated,
  getAgentEntriesByKind,
  getAgentKinds,
  getAgentOrganization,
  type AgentEntry,
} from '@/lib/agent-hub/registry'
import { ldJson } from '@/lib/seo/jsonld'

export const revalidate = 3600

/** ISO date from the registry -> the long form the hero uses. */
function formatUpdated(iso: string): string {
  if (!iso) return 'recently'
  const parsed = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime())) return 'recently'
  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

const GRADE_STYLE: Record<string, string> = {
  A: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  B: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
  C: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  D: 'border-white/15 bg-white/5 text-white/50',
}

const FAQ = [
  {
    q: 'What is the best AI coding agent in 2026?',
    a: 'The question is underspecified, and that is the useful answer. Framework and harness choice alone moves agentic results by up to 30 absolute points on identical models and identical tasks, so "best agent" depends on the scaffold you run it in and the shape of your work. Pick by job: terminal-scale refactors, background pull requests, in-editor edits, or fully autonomous runs.',
  },
  {
    q: 'Why does this hub not publish a leaderboard?',
    a: 'Because the leaderboards are known to be gameable. An automated scanning agent broke all eight major agent benchmarks by reward hacking, reaching near-perfect scores without solving a single task. Publishing a ranked list of numbers we cannot reproduce would look authoritative and mean very little.',
  },
  {
    q: 'What is an evidence grade?',
    a: 'The same A-to-D scale the FrankX research hub already uses. A is reproducible first-party measurement with published receipts, B is an independent third-party benchmark, C is mixed or partly corroborated vendor figures, D is vendor-stated or editorial only. Most entries here are C or D, and saying so is the point.',
  },
  {
    q: 'How is this different from the FrankX agent catalog at /agents?',
    a: 'This page is the landscape: what exists in the world and what each thing is for. /agents is the proof: the 99-agent Creator OS actually built and run on this stack, packaged as installable artifacts.',
  },
  {
    q: 'Does MCP support matter when choosing?',
    a: 'It decides whether your tool surface travels. Frameworks built for MCP from day one inherit new protocol capabilities as they ship; frameworks that bolt it on through an adapter tend to lag. Each entry records whether MCP is native, supported, or absent.',
  },
]

function EntryCard({ entry }: { entry: AgentEntry }) {
  const org = getAgentOrganization(entry.organization)
  return (
    <Link
      href={`/agent-hub/${entry.id}`}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{entry.name}</h3>
          <p className="text-xs uppercase tracking-wider text-white/40">{org?.name ?? entry.organization}</p>
        </div>
        <span
          className={`shrink-0 rounded-md border px-2 py-1 text-xs font-medium ${GRADE_STYLE[entry.evidence_grade] ?? GRADE_STYLE.D}`}
          title="Evidence grade"
        >
          {entry.evidence_grade}
        </span>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-white/60">{entry.one_liner}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 text-xs text-white/40">
        <span className="rounded border border-white/10 px-2 py-0.5">MCP: {entry.mcp}</span>
        {entry.interfaces.slice(0, 3).map((surface) => (
          <span key={surface} className="rounded border border-white/10 px-2 py-0.5">
            {surface}
          </span>
        ))}
      </div>
    </Link>
  )
}

export default function AgentHubPage() {
  const kinds = getAgentKinds()
  const caveat = agentRegistryCaveat()
  const updated = formatUpdated(agentRegistryLastUpdated())

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Agent Hub 2026',
    description:
      'Agent platforms and frameworks compared, each claim carrying an evidence grade.',
    itemListElement: kinds.flatMap((kind, kindIndex) =>
      getAgentEntriesByKind(kind.id).map((entry, index) => ({
        '@type': 'ListItem',
        position: kindIndex * 100 + index + 1,
        item: {
          '@type': 'SoftwareApplication',
          '@id': `https://frankx.ai/agent-hub/${entry.id}`,
          name: entry.name,
          applicationCategory: 'DeveloperApplication',
          description: entry.one_liner,
        },
      }))
    ),
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Agent Hub', item: 'https://frankx.ai/agent-hub' },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbJsonLd) }} />

      <main className="relative z-10">
        <section className="px-6 pb-12 pt-16">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 font-mono text-sm uppercase tracking-wider text-emerald-400">
              Agent Intelligence Directory · Updated {updated}
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
              Agent Hub <span className="text-white/40">2026</span>
            </h1>
            <p className="mb-6 max-w-3xl text-lg text-white/60">
              The platforms you run agents in, and the frameworks you build them with — what each is
              for, and where each stops being the right answer.
            </p>

            <div className="mb-8 max-w-3xl rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-5">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-200">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Read this before the tables
              </p>
              <p className="text-sm leading-relaxed text-white/70">{caveat}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/agents"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 transition-colors hover:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
              >
                <Boxes className="h-4 w-4" aria-hidden="true" /> See the 99-agent catalog
              </Link>
              <Link
                href="/llm-hub"
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition-colors hover:border-cyan-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                <Compass className="h-4 w-4" aria-hidden="true" /> The model layer
              </Link>
            </div>
          </div>
        </section>

        {kinds.map((kind) => (
          <section key={kind.id} id={kind.id} className="px-6 py-10">
            <div className="mx-auto max-w-6xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {kind.label} <span className="text-white/30">({kind.count})</span>
                </h2>
                <p className="mt-1 text-sm text-white/50">{kind.description}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {getAgentEntriesByKind(kind.id).map((entry) => (
                  <EntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-white">Questions worth asking first</h2>
            <div className="space-y-5">
              {FAQ.map((item) => (
                <div key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <h3 className="mb-2 font-semibold text-white">{item.q}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{item.a}</p>
                </div>
              ))}
            </div>
            <Link
              href="/agents"
              className="mt-8 inline-flex items-center gap-2 text-sm text-emerald-300 transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            >
              See what was built on this stack <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
