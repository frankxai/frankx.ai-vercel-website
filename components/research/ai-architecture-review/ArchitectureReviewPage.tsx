import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CircleDot,
  ExternalLink,
  FileCheck2,
  GitBranch,
  LockKeyhole,
  Network,
  ShieldCheck,
  TimerReset,
} from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import {
  REVIEW_WINDOW,
  architectureLayers,
  connectorMatrix,
  frameworkComparisons,
  getSources,
  internalDecisions,
  modelAvailabilityWatch,
  modelRoutes,
  repoActivity,
  repoSignals,
  reviewStats,
  sourceLedger,
  weeklyChanges,
  type WeeklyChange,
} from '@/lib/research/ai-architecture-weekly'
import { cn } from '@/lib/utils'

import { ArchitectureReviewMap } from './ArchitectureReviewMap'

const classificationLabels: Record<WeeklyChange['classification'], string> = {
  'model-release': 'Model endpoint',
  'model-availability': 'Availability',
  'agent-runtime': 'Agent runtime',
  governance: 'Governance',
  connector: 'Connector',
  protocol: 'Protocol',
  infrastructure: 'Infrastructure',
}

const classificationStyles: Record<WeeklyChange['classification'], string> = {
  'model-release': 'border-cyan-300/20 bg-cyan-300/[0.06] text-cyan-200',
  'model-availability': 'border-sky-300/20 bg-sky-300/[0.06] text-sky-200',
  'agent-runtime':
    'border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-200',
  governance: 'border-amber-300/20 bg-amber-300/[0.06] text-amber-200',
  connector: 'border-violet-300/20 bg-violet-300/[0.06] text-violet-200',
  protocol: 'border-teal-300/20 bg-teal-300/[0.06] text-teal-200',
  infrastructure: 'border-zinc-300/20 bg-white/[0.04] text-zinc-300',
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  timeZone: 'UTC',
})

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`)).toUpperCase()
}

function Logo({
  src,
  alt,
  size = 22,
}: {
  src: string
  alt: string
  size?: number
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/25"
      style={{ width: size + 14, height: size + 14 }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="h-auto max-h-full w-auto max-w-full object-contain"
      />
    </span>
  )
}

function SourceLinks({
  sourceIds,
  compact = false,
}: {
  sourceIds: readonly string[]
  compact?: boolean
}) {
  const sources = getSources([...sourceIds])

  return (
    <div className={cn('flex flex-wrap', compact ? 'gap-1.5' : 'gap-2')}>
      {sources.map((source) => (
        <a
          key={source.id}
          href={source.url}
          target="_blank"
          rel="noreferrer"
          className={cn(
            'inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.025] font-mono text-zinc-400 transition-colors hover:border-emerald-300/30 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70',
            compact ? 'px-2 py-1 text-[8px]' : 'px-2.5 py-1.5 text-[9px]',
          )}
        >
          {source.organization}
          <ExternalLink className="h-2.5 w-2.5" aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="grid gap-5 border-t border-white/10 pt-8 md:grid-cols-[160px_minmax(0,760px)] md:gap-10">
      <div className="font-mono text-[10px] tracking-[0.18em] text-emerald-200">
        {index} / {eyebrow}
      </div>
      <div>
        <h2 className="font-display text-3xl font-bold tracking-[-0.025em] text-zinc-50 md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
          {description}
        </p>
      </div>
    </div>
  )
}

function Hero() {
  const stats = [
    { label: 'Dated changes', value: reviewStats.verifiedChanges },
    { label: 'Official sources', value: reviewStats.officialSources },
    { label: 'Public commits sampled', value: reviewStats.sampledCommits },
    { label: 'Repositories in sample', value: reviewStats.sampledRepositories },
  ]

  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-28 md:pt-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_72%_22%,rgba(39,181,132,0.10),transparent_42%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-10 lg:pb-20">
        <nav
          aria-label="Breadcrumb"
          className="mb-9 flex items-center gap-2 font-mono text-[9px] tracking-[0.13em] text-zinc-500"
        >
          <Link
            href="/research"
            className="transition-colors hover:text-zinc-200"
          >
            RESEARCH
          </Link>
          <span>/</span>
          <span className="text-zinc-300">AI ARCHITECTURE REVIEW</span>
        </nav>

        <div className="grid items-start gap-12 xl:grid-cols-[0.78fr_1.22fr] xl:gap-14">
          <div className="max-w-2xl">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/[0.07] px-3 py-1.5 font-mono text-[9px] tracking-[0.14em] text-emerald-100">
                <CircleDot className="h-3 w-3" aria-hidden="true" />
                WEEKLY REVIEW · VERIFIED
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] tracking-[0.12em] text-zinc-400">
                ISSUE {REVIEW_WINDOW.issue} ·{' '}
                {REVIEW_WINDOW.label.toUpperCase()}
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.8rem,6vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.045em] text-zinc-50">
              The model race
              <span className="block text-emerald-200">moved up a layer.</span>
            </h1>

            <div className="mt-7 max-w-xl space-y-5 text-[15px] leading-7 text-zinc-300 md:text-[17px] md:leading-8">
              <p>
                Between 24 and 31 August, Google shipped two GA model endpoint
                families; OpenAI closed the Assistants API and moved Codex work
                toward Responses, WebMCP, and event triggers; GitHub turned
                model and plugin choice into enterprise policy; and Vercel
                normalized another coding harness while making connector
                credentials short-lived.
              </p>
              <p className="text-zinc-400">
                In parallel, our repositories moved toward graph-owned state,
                provenance-enforced data, fail-closed security, and draft-first
                release evidence. My decision is concrete: own the graph,
                normalize the harness, choose one durability layer, gate every
                connector, and route models by workload evidence.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink
                href="#architecture"
                eventName="ai_architecture_review_cta"
                eventProperties={{
                  target: 'architecture',
                  issue: REVIEW_WINDOW.end,
                }}
                className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030605]"
              >
                Inspect the operating model
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href="#sources"
                eventName="ai_architecture_review_cta"
                eventProperties={{
                  target: 'source_ledger',
                  issue: REVIEW_WINDOW.end,
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/25 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/80"
              >
                Open the source ledger
              </TrackedLink>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-white/10 pt-7">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-2xl font-bold text-zinc-100">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-xs leading-5 text-zinc-500">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <div id="architecture" className="scroll-mt-28">
            <ArchitectureReviewMap />
          </div>
        </div>
      </div>
    </section>
  )
}

function VerdictSection() {
  const shifts = [
    {
      number: '01',
      title: 'Models became services',
      detail:
        'Speech and video moved into dedicated endpoints while frontier families spread across governed clouds and gateways.',
    },
    {
      number: '02',
      title: 'Harnesses became adapters',
      detail:
        'Codex, Claude Code, Cursor, Grok Build, and other coding runtimes are increasingly reachable behind normalized interfaces.',
    },
    {
      number: '03',
      title: 'Control became product surface',
      detail:
        'Model defaults, plugin marketplaces, connector credentials, bot review, and release receipts are now first-class engineering concerns.',
    },
  ]

  return (
    <section id="verdict" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          index="01"
          eyebrow="EDITORIAL VERDICT"
          title="The consequential change was orchestration, not a benchmark crown."
          description="The week did produce new model endpoints. But the durable architecture shift happened around them: how work starts, which runtime executes it, which identity reaches a tool, where state survives, and what proof accompanies the result."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {shifts.map((shift) => (
            <article key={shift.number} className="bg-[#050807] p-6 md:p-7">
              <p className="font-mono text-[10px] tracking-[0.16em] text-emerald-200">
                SHIFT {shift.number}
              </p>
              <h3 className="mt-5 font-display text-xl font-semibold text-zinc-100">
                {shift.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {shift.detail}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-zinc-500">
              MY CALL
            </p>
            <p className="mt-5 max-w-xl font-display text-2xl font-semibold leading-9 text-zinc-100 md:text-3xl md:leading-[1.35]">
              Build Starlight as a graph-owned operating system. Let agents
              execute bounded nodes; do not let a harness become the company
              database.
            </p>
          </div>
          <ol className="space-y-0 border-t border-white/10">
            {internalDecisions.map((decision, index) => (
              <li
                key={decision}
                className="grid grid-cols-[38px_1fr] gap-3 border-b border-white/10 py-4 text-sm leading-6 text-zinc-300"
              >
                <span className="font-mono text-[10px] text-emerald-200">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {decision}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function WeeklyChangesSection() {
  return (
    <section
      id="changes"
      className="scroll-mt-28 border-y border-white/10 bg-[#040706] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          index="02"
          eyebrow="SEVEN-DAY LEDGER"
          title="Seventeen changes, classified by the layer they actually moved."
          description="A release, an availability event, and a governance change are not interchangeable. This ledger names each one so the architecture response stays proportional."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['New GA model endpoints', 'Google Transcribe + Omni'],
            ['Distribution shifts', 'Bedrock, Foundry, AI Gateway'],
            ['Runtime shifts', 'Codex workflows, HarnessAgent, managed loops'],
            ['Control shifts', 'Model policy, connector identity, bot review'],
          ].map(([label, value]) => (
            <div
              key={label}
              className="border-l border-emerald-300/30 py-1 pl-4"
            >
              <p className="font-mono text-[9px] tracking-[0.12em] text-zinc-500">
                {label.toUpperCase()}
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-zinc-200">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10">
          {weeklyChanges.map((change, index) => (
            <article
              key={`${change.date}-${change.organization}-${change.title}`}
              className="grid gap-5 border-b border-white/10 py-6 md:grid-cols-[92px_230px_minmax(0,1fr)] md:gap-7"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.13em] text-zinc-500">
                  {formatDate(change.date)}
                </p>
                <p className="mt-1 font-mono text-[9px] text-zinc-700">
                  {String(index + 1).padStart(2, '0')}
                </p>
              </div>
              <div className="flex items-start gap-3">
                {change.logo ? (
                  <Logo src={change.logo} alt={change.organization} size={18} />
                ) : null}
                <div>
                  <p className="text-xs font-semibold text-zinc-200">
                    {change.organization}
                  </p>
                  <span
                    className={cn(
                      'mt-2 inline-flex rounded-full border px-2 py-1 font-mono text-[8px] tracking-[0.1em]',
                      classificationStyles[change.classification],
                    )}
                  >
                    {classificationLabels[change.classification].toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
                <div>
                  <h3 className="font-display text-lg font-semibold text-zinc-100">
                    {change.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {change.signal}
                  </p>
                  <div className="mt-3">
                    <SourceLinks sourceIds={change.sourceIds} compact />
                  </div>
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-black/15 px-4 py-3">
                  <p className="font-mono text-[9px] tracking-[0.12em] text-emerald-200">
                    ARCHITECTURE MOVE
                  </p>
                  <p className="mt-2 text-xs leading-5 text-zinc-300">
                    {change.architectureMove}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ModelRoutesSection() {
  return (
    <section id="models" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          index="03"
          eyebrow="MODEL ROUTING"
          title="Compare roles, boundaries, and freshness—not one synthetic score."
          description="This is an architecture shortlist. Provider positioning and availability are cited; no row is presented as an independently measured winner. Repository-specific evals remain the promotion gate."
        />

        <div className="mt-12 overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[1120px] w-full border-collapse text-left">
            <thead className="bg-white/[0.035]">
              <tr className="font-mono text-[9px] tracking-[0.14em] text-zinc-500">
                <th className="w-[230px] px-5 py-4 font-medium">
                  MODEL FAMILY
                </th>
                <th className="w-[250px] px-5 py-4 font-medium">
                  DEFAULT ROLE
                </th>
                <th className="px-5 py-4 font-medium">
                  WHY IT STAYS ON THE BOARD
                </th>
                <th className="px-5 py-4 font-medium">ROUTING CAUTION</th>
              </tr>
            </thead>
            <tbody>
              {modelRoutes.map((route) => (
                <tr
                  key={route.family}
                  className="border-t border-white/10 align-top"
                >
                  <td className="px-5 py-5">
                    <div className="flex items-start gap-3">
                      <Logo src={route.logo} alt={route.provider} size={20} />
                      <div>
                        <p className="text-sm font-semibold text-zinc-100">
                          {route.family}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {route.provider}
                        </p>
                        <p className="mt-2 font-mono text-[8px] leading-4 text-emerald-200">
                          {route.freshness.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-xs leading-6 text-zinc-300">
                    {route.defaultRole}
                  </td>
                  <td className="px-5 py-5 text-xs leading-6 text-zinc-400">
                    {route.whyItStaysOnTheBoard}
                    <div className="mt-3">
                      <SourceLinks sourceIds={route.sourceIds} compact />
                    </div>
                  </td>
                  <td className="px-5 py-5 text-xs leading-6 text-zinc-400">
                    {route.routingCaution}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {modelAvailabilityWatch.map((item) => (
            <article key={item.model} className="bg-[#050807] p-5">
              <div className="flex items-center gap-3">
                <Logo src={item.logo} alt={item.model} size={18} />
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">
                    {item.model}
                  </h3>
                  <p className="mt-1 font-mono text-[8px] tracking-[0.08em] text-zinc-500">
                    {item.classification.toUpperCase()}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-zinc-400">
                {item.event}
              </p>
              <div className="mt-3">
                <SourceLinks sourceIds={item.sourceIds} compact />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-300/15 bg-amber-300/[0.035] p-5">
          <ShieldCheck
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-200"
            aria-hidden="true"
          />
          <p className="text-xs leading-6 text-zinc-300">
            Coverage note: in the official streams reviewed, Google released the
            new GA endpoint families inside this window. Anthropic, Mistral, and
            DeepSeek had material protocol, infrastructure, or boundary-context
            updates but no in-window flagship LLM launch. Gateway arrivals are
            labeled as availability, not as original release dates.
          </p>
        </div>
      </div>
    </section>
  )
}

function RepositorySection() {
  const maxCommits = Math.max(...repoActivity.map((item) => item.commits))

  return (
    <section
      id="repositories"
      className="scroll-mt-28 border-y border-white/10 bg-[#040706] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          index="04"
          eyebrow="OUR ENGINEERING WEEK"
          title="The repository work converged on graph contracts, truth gates, and shared infrastructure."
          description="The public GitHub sample hit the connector cap at 100 commits across 10 repositories, so these counts are a lower-bound sample—not a claim that only 100 commits existed."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <div className="flex items-end gap-4">
              <span className="font-display text-7xl font-bold tracking-[-0.06em] text-zinc-100">
                {reviewStats.sampledCommits}
              </span>
              <span className="pb-2 text-sm leading-5 text-zinc-500">
                public commits
                <br />
                in the capped sample
              </span>
            </div>
            <div className="mt-8 space-y-4">
              {repoActivity.map((item) => (
                <div key={item.repo}>
                  <div className="mb-1.5 flex items-center justify-between gap-4 text-xs">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="min-w-0 truncate text-zinc-300 transition-colors hover:text-emerald-100"
                    >
                      {item.repo}
                    </a>
                    <span className="font-mono text-[10px] text-zinc-500">
                      {item.commits}
                    </span>
                  </div>
                  <div
                    className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]"
                    role="img"
                    aria-label={`${item.repo}: ${item.commits} commits in the sampled window`}
                  >
                    <div
                      className="h-full rounded-full bg-emerald-300/70"
                      style={{
                        width: `${Math.max(4, (item.commits / maxCommits) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10">
            {repoSignals.map((signal, index) => (
              <article
                key={signal.title}
                className="border-b border-white/10 py-6"
              >
                <div className="grid gap-3 sm:grid-cols-[38px_1fr]">
                  <span className="font-mono text-[10px] text-emerald-200">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-zinc-100">
                      {signal.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {signal.detail}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {signal.receipts.map((receipt) => (
                        <a
                          key={receipt.href}
                          href={receipt.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1.5 font-mono text-[8px] text-zinc-400 transition-colors hover:border-emerald-300/30 hover:text-emerald-100"
                        >
                          <GitBranch className="h-3 w-3" aria-hidden="true" />
                          {receipt.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StackSection() {
  return (
    <section id="stack" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          index="05"
          eyebrow="RECOMMENDED STACK"
          title="Starlight Graph OS: six owned boundaries, no nominal swarm."
          description="The stack keeps business truth in one place while models, harnesses, and connector providers remain replaceable. It adds specialist frameworks only when a measured workload needs them."
        />

        <div className="mt-12 border-t border-white/10">
          {architectureLayers.map((layer) => (
            <article
              key={layer.index}
              className="grid gap-5 border-b border-white/10 py-6 md:grid-cols-[55px_260px_minmax(0,1fr)] md:gap-7"
            >
              <span className="font-mono text-[10px] text-emerald-200">
                {layer.index}
              </span>
              <div className="flex items-start gap-3">
                <Logo src={layer.logo} alt={layer.default} size={20} />
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">
                    {layer.name}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    {layer.default}
                  </p>
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                <p className="text-sm leading-6 text-zinc-400">
                  {layer.responsibility}
                </p>
                <p className="border-l border-emerald-300/25 pl-4 text-xs font-medium leading-6 text-zinc-200">
                  {layer.rule}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] tracking-[0.16em] text-zinc-500">
              FRAMEWORK DECISIONS
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold text-zinc-100 md:text-3xl">
              Use each tool for the boundary it actually owns.
            </h3>
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
            <table className="min-w-[960px] w-full text-left">
              <thead className="bg-white/[0.035] font-mono text-[9px] tracking-[0.14em] text-zinc-500">
                <tr>
                  <th className="px-5 py-4 font-medium">TOOL</th>
                  <th className="px-5 py-4 font-medium">USE WHEN</th>
                  <th className="px-5 py-4 font-medium">DO NOT USE AS</th>
                  <th className="px-5 py-4 font-medium">DECISION</th>
                </tr>
              </thead>
              <tbody>
                {frameworkComparisons.map((item) => (
                  <tr
                    key={item.tool}
                    className="border-t border-white/10 align-top"
                  >
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <Logo src={item.logo} alt={item.tool} size={18} />
                        <span className="text-xs font-semibold text-zinc-100">
                          {item.tool}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-xs leading-6 text-zinc-400">
                      {item.useWhen}
                    </td>
                    <td className="px-5 py-5 text-xs leading-6 text-zinc-400">
                      {item.doNotUseAs}
                    </td>
                    <td className="px-5 py-5 text-xs font-medium leading-6 text-emerald-100">
                      {item.decision}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

function ConnectorsSection() {
  return (
    <section
      id="connectors"
      className="scroll-mt-28 border-y border-white/10 bg-[#040706] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          index="06"
          eyebrow="MCP + CONNECTORS"
          title="The connector is a capability boundary, not a convenience import."
          description="Every connector needs a read scope, write scope, identity model, approval rule, and evidence trail. This is the minimum control matrix for the software we use to build and operate."
        />

        <div className="mt-12 overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[1120px] w-full text-left">
            <thead className="bg-white/[0.035] font-mono text-[9px] tracking-[0.14em] text-zinc-500">
              <tr>
                <th className="px-5 py-4 font-medium">CONNECTOR</th>
                <th className="px-5 py-4 font-medium">READS</th>
                <th className="px-5 py-4 font-medium">WRITES</th>
                <th className="px-5 py-4 font-medium">DEFAULT CONTROL</th>
                <th className="px-5 py-4 font-medium">APPROVAL</th>
              </tr>
            </thead>
            <tbody>
              {connectorMatrix.map((item) => (
                <tr
                  key={item.connector}
                  className="border-t border-white/10 align-top"
                >
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <Logo src={item.logo} alt={item.connector} size={19} />
                      <span className="text-xs font-semibold text-zinc-100">
                        {item.connector}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-xs leading-6 text-zinc-400">
                    {item.reads}
                  </td>
                  <td className="px-5 py-5 text-xs leading-6 text-zinc-400">
                    {item.writes}
                  </td>
                  <td className="px-5 py-5 text-xs leading-6 text-zinc-300">
                    {item.defaultControl}
                  </td>
                  <td className="px-5 py-5 text-xs font-medium leading-6 text-amber-100">
                    {item.approval}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: LockKeyhole,
              title: 'Identity before tools',
              text: 'Resolve the actor, tenant, and task before issuing a token or mounting an MCP server.',
            },
            {
              icon: Network,
              title: 'Capability before autonomy',
              text: 'An agent receives named actions with explicit schemas, not broad account access.',
            },
            {
              icon: FileCheck2,
              title: 'Receipt before completion',
              text: 'A side effect is complete only when the system can retrieve the source, action, result, and reviewer state.',
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-[#07100c] p-5"
            >
              <item.icon
                className="h-5 w-5 text-emerald-200"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-sm font-semibold text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-5 text-zinc-400">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SourceLedgerSection() {
  const organizations = Array.from(
    new Set(sourceLedger.map((source) => source.organization)),
  )

  const sourceHeadingId = (organization: string) =>
    `sources-${organization
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}`

  return (
    <section id="sources" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          index="07"
          eyebrow="SOURCE LEDGER"
          title="Every external statement resolves to an official source."
          description="The ledger is intentionally narrower than the whole AI news cycle. It covers the model, agent-runtime, governance, connector, protocol, and infrastructure changes used in this review."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-[#07100c] p-5">
              <p className="font-mono text-[9px] tracking-[0.14em] text-emerald-200">
                METHOD
              </p>
              <dl className="mt-5 space-y-4 text-xs">
                <div>
                  <dt className="text-zinc-500">Window</dt>
                  <dd className="mt-1 text-zinc-200">{REVIEW_WINDOW.label}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Last checked</dt>
                  <dd className="mt-1 text-zinc-200">
                    31 Aug 2026 · 02:00 UTC
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-500">External evidence</dt>
                  <dd className="mt-1 text-zinc-200">
                    Official releases, docs, changelogs, roadmaps
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Repository evidence</dt>
                  <dd className="mt-1 text-zinc-200">
                    Public commit sample, capped at 100 results
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Internal context</dt>
                  <dd className="mt-1 text-zinc-200">
                    Current workspace decisions; no private chat content quoted
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mt-4 rounded-2xl border border-amber-300/15 bg-amber-300/[0.035] p-5">
              <p className="text-xs leading-6 text-zinc-300">
                “No in-window release” means none was found in the official
                streams reviewed. It is not a universal claim about every
                regional endpoint, research checkpoint, or private preview.
              </p>
            </div>
          </aside>

          <div className="space-y-10">
            {organizations.map((organization) => {
              const sources = sourceLedger.filter(
                (source) => source.organization === organization,
              )

              return (
                <section
                  key={organization}
                  aria-labelledby={sourceHeadingId(organization)}
                >
                  <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                    <h3
                      id={sourceHeadingId(organization)}
                      className="text-sm font-semibold text-zinc-100"
                    >
                      {organization}
                    </h3>
                    <span className="font-mono text-[9px] text-zinc-600">
                      {sources.length}{' '}
                      {sources.length === 1 ? 'SOURCE' : 'SOURCES'}
                    </span>
                  </div>
                  <div>
                    {sources.map((source) => (
                      <a
                        key={source.id}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group grid gap-3 border-b border-white/[0.07] py-4 transition-colors hover:border-emerald-300/20 sm:grid-cols-[96px_minmax(0,1fr)_120px] sm:gap-5"
                      >
                        <span className="font-mono text-[9px] text-zinc-600">
                          {source.published}
                        </span>
                        <span>
                          <span className="flex items-center gap-2 text-sm font-medium text-zinc-200 transition-colors group-hover:text-emerald-100">
                            {source.title}
                            <ExternalLink
                              className="h-3 w-3 shrink-0"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="mt-1.5 block text-xs leading-5 text-zinc-500">
                            {source.note}
                          </span>
                        </span>
                        <span className="font-mono text-[8px] leading-4 text-zinc-600 sm:text-right">
                          {source.scope === 'in-window'
                            ? 'IN WINDOW'
                            : 'BOUNDARY CONTEXT'}
                          <br />
                          {source.kind.replaceAll('-', ' ').toUpperCase()}
                        </span>
                      </a>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function ClosingSection() {
  return (
    <section className="border-t border-white/10 bg-[#050907] py-20 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-emerald-200">
              THE OPERATING DECISION
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-zinc-50 md:text-5xl">
              Own state. Rent intelligence. Prove the transition between them.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
              That is the architecture I would carry forward from this week: a
              relational graph contract, bounded agent harnesses, explicit
              durability, governed connectors, and release evidence that
              survives the model cycle.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <TrackedLink
              href="/ai-architecture"
              eventName="ai_architecture_review_cta"
              eventProperties={{
                target: 'field_guide',
                issue: REVIEW_WINDOW.end,
              }}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/80"
            >
              Open the field guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href="/research"
              eventName="ai_architecture_review_cta"
              eventProperties={{
                target: 'research_hub',
                issue: REVIEW_WINDOW.end,
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/80"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Research hub
            </TrackedLink>
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
          {[
            {
              icon: CheckCircle2,
              label: 'External claims',
              value: 'Official-source linked',
            },
            {
              icon: TimerReset,
              label: 'Freshness',
              value: 'Checked 31 Aug 2026',
            },
            {
              icon: ShieldCheck,
              label: 'Release stance',
              value: 'Preview before production',
            },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon
                className="h-4 w-4 text-emerald-200"
                aria-hidden="true"
              />
              <div>
                <p className="font-mono text-[8px] tracking-[0.12em] text-zinc-600">
                  {item.label.toUpperCase()}
                </p>
                <p className="mt-1 text-xs text-zinc-300">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ArchitectureReviewPage() {
  return (
    <main className="min-h-screen bg-[#030605] text-zinc-100 selection:bg-emerald-300/20">
      <Hero />
      <VerdictSection />
      <WeeklyChangesSection />
      <ModelRoutesSection />
      <RepositorySection />
      <StackSection />
      <ConnectorsSection />
      <SourceLedgerSection />
      <ClosingSection />
    </main>
  )
}
