import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  ExternalLink,
  Gauge,
  Layers3,
  ShieldCheck,
} from 'lucide-react'

import {
  CANVA_LAST_VERIFIED,
  canvaArchitectureSteps,
  canvaContentRoadmap,
  canvaFounderFaqs,
  canvaMcpCapabilities,
  officialCanvaSources,
} from '@/data/canva-founder-content'
import { YouTubeEmbed } from '@/components/embeds'

import { CanvaGraphStage } from './CanvaGraphStage'
import { TrackedCanvaLink } from './TrackedCanvaLink'

const operatingPrinciples = [
  {
    number: '01',
    title: 'Keep evidence outside the canvas',
    body: 'Research, approved claims, rights, and performance data stay in systems built to preserve provenance. Canva receives an explicit brief, not an invitation to invent the strategy.',
  },
  {
    number: '02',
    title: 'Give agents bounded production jobs',
    body: 'Let an agent discover approved assets, prepare candidates, apply scoped edits, and package variants. Require it to expose what it changed and which source supports the output.',
  },
  {
    number: '03',
    title: 'Make approval a system component',
    body: 'Claims, rights, accessibility, brand integrity, and public distribution pass through a named human release gate. That is control architecture, not a last-minute review ritual.',
  },
  {
    number: '04',
    title: 'Measure decisions, not design volume',
    body: 'Track whether the work earns qualified attention, accelerates approval, gets reused, and moves the next high-intent action. Asset count is throughput, not value.',
  },
]

const scorecard = [
  ['Brief-to-acceptance time', 'How quickly an approved argument becomes a usable asset'],
  ['First-pass approval rate', 'Whether the system understands brand, evidence, and channel fit'],
  ['Qualified outbound clicks', 'Interest in the actual Canva workflow, not ambient page traffic'],
  ['Content-assisted actions', 'Newsletter joins, guide depth, or founder conversations after entry'],
  ['Reuse yield', 'How many accepted channel variants come from one governed source'],
]

const statusStyles = {
  live: 'border-emerald-300/25 bg-emerald-300/[0.07] text-emerald-200',
  next: 'border-cyan-300/20 bg-cyan-300/[0.06] text-cyan-200',
  planned: 'border-white/10 bg-white/[0.03] text-white/60',
} as const

export function CanvaFounderHub() {
  return (
    <main className="min-h-screen bg-[#090a0b] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_77%_16%,rgba(125,92,255,0.14),transparent_31%),radial-gradient(circle_at_18%_0%,rgba(16,185,129,0.12),transparent_32%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:pb-28 lg:pt-36">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-200/75">
              FrankX founder system · Source-verified {CANVA_LAST_VERIFIED}
            </p>
            <h1 className="mt-7 max-w-5xl font-display text-5xl font-bold leading-[0.94] tracking-[-0.052em] sm:text-6xl lg:text-[5.35rem]">
              Canva is not the strategy.
              <span className="mt-2 block font-serif font-normal italic text-white/60">
                It is the visual operating layer.
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/68 sm:text-xl">
              A founder-grade system for connecting verified research, agent orchestration,
              Canva&apos;s official MCP server, human judgment, owned media, and a measurable
              learning loop—without handing your brand to an ungoverned content machine.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <TrackedCanvaLink
                href="/go/canva"
                placement="hero"
                destination="canva"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Open Canva
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedCanvaLink>
              <TrackedCanvaLink
                href="/guides/canva-mcp-for-founders"
                placement="hero"
                destination="mcp-guide"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-emerald-200/40 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Build the MCP workflow
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedCanvaLink>
            </div>
          </div>

          <aside className="border-y border-white/10 py-7 lg:border-l lg:border-y-0 lg:py-0 lg:pl-10">
            <div className="inline-flex rounded-2xl bg-white p-3">
              <Image
                src="/brand/canva/canva-wordmark.svg"
                width={160}
                height={56}
                alt="Canva"
                priority
              />
            </div>
            <p className="mt-7 text-sm font-semibold text-white">Independent editorial disclosure</p>
            <p className="mt-3 text-sm leading-6 text-white/57">
              FrankX is not a Canva affiliate or official Canva partner. Canva says the
              Canvassador Program is now its only pathway to affiliate benefits and that
              applications are currently closed. If that changes, commercial links will be
              labeled before publication.
            </p>
            <TrackedCanvaLink
              href="/go/canva-canvassador"
              placement="hero-disclosure"
              destination="canvassador-status"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-medium text-white/65 underline decoration-white/25 underline-offset-8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Verify the current program status
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </TrackedCanvaLink>
          </aside>
        </div>
      </section>

      <section className="border-b border-white/[0.07] bg-[#0b0d0e]" aria-label="System guarantees">
        <div className="mx-auto grid max-w-7xl divide-y divide-white/[0.07] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
          {[
            ['Source-led', 'Official documentation anchors changing product claims.'],
            ['Human-gated', 'Public distribution remains an accountable decision.'],
            ['Agent-usable', 'Every node exposes a concrete next action or source.'],
          ].map(([title, body]) => (
            <div key={title} className="py-6 sm:px-7 sm:first:pl-0 sm:last:pr-0">
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="mt-2 text-xs leading-5 text-white/60">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="agent-graph" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="architecture-title">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-200/65">
                Interactive architecture
              </p>
              <h2 id="architecture-title" className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                The agentic content graph.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-white/60 lg:justify-self-end">
              Each node is clickable. The system separates evidence, orchestration, visual
              production, judgment, delivery, and learning so one tool never quietly becomes the
              whole company. On smaller screens, the graph becomes an accessible operating sequence.
            </p>
          </div>
          <div className="mt-12">
            <CanvaGraphStage />
            <ol className="border-y border-white/10 md:hidden">
              {canvaArchitectureSteps.map((step, index) => (
                <li key={step.kind} className="border-b border-white/[0.07] py-5 last:border-b-0">
                  <TrackedCanvaLink
                    href={step.href}
                    placement="architecture-mobile"
                    destination={step.kind}
                    target={step.external ? '_blank' : undefined}
                    rel={step.external ? 'noreferrer' : undefined}
                    className="group grid min-h-11 grid-cols-[44px_1fr_auto] items-start gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      {step.kind === 'canva' ? (
                        <Image src="/brand/canva/canva-icon.svg" width={24} height={24} alt="Canva" />
                      ) : (
                        <span className="font-mono text-[10px] text-white/55">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      )}
                    </span>
                    <span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-200/60">
                        {step.eyebrow}
                      </span>
                      <span className="mt-1 block text-base font-semibold text-white">{step.label}</span>
                      <span className="mt-2 block text-sm leading-6 text-white/55">{step.description}</span>
                    </span>
                    <ExternalLink className="mt-3 h-4 w-4 text-white/30 transition-colors group-hover:text-white" aria-hidden="true" />
                  </TrackedCanvaLink>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-5 text-xs leading-5 text-white/60">
            Architecture is a FrankX recommendation, not an endorsed Canva reference design.
            The official Canva mark is used under Canva&apos;s published brand guidelines.
          </p>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0c0e0f] px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="principles-title">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.68fr_1.32fr] lg:gap-24">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-200/65">
              Operating doctrine
            </p>
            <h2 id="principles-title" className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Four boundaries make the speed usable.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/58">
              Automation compounds whatever the system already rewards. These boundaries reward
              evidence, judgment, and learning—not the number of assets pushed into a folder.
            </p>
          </div>
          <div className="border-y border-white/10">
            {operatingPrinciples.map((principle) => (
              <article key={principle.number} className="grid gap-3 border-b border-white/[0.07] py-7 last:border-b-0 sm:grid-cols-[72px_1fr]">
                <p className="font-mono text-[10px] text-emerald-200/60">{principle.number}</p>
                <div>
                  <h3 className="text-lg font-semibold text-white">{principle.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">{principle.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="capabilities-title">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-violet-200/65">
              Official MCP · founder translation
            </p>
            <h2 id="capabilities-title" className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Tool capability is not operating intent.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/60">
              Canva documents the tools. This layer translates them into the jobs a founder should
              actually delegate. Available tools and limits can vary, so the agent must discover its
              live tool inventory rather than hard-code assumptions.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto border-y border-white/10">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.18em] text-white/60">
                  <th className="px-3 py-4 font-medium">Capability</th>
                  <th className="px-3 py-4 font-medium">Mechanism</th>
                  <th className="px-3 py-4 font-medium">Founder job</th>
                </tr>
              </thead>
              <tbody>
                {canvaMcpCapabilities.map((item) => (
                  <tr key={item.capability} className="border-b border-white/[0.06] align-top last:border-b-0">
                    <th className="px-3 py-5 text-sm font-semibold text-white">{item.capability}</th>
                    <td className="px-3 py-5 text-sm leading-6 text-white/58">{item.mechanism}</td>
                    <td className="px-3 py-5 text-sm leading-6 text-white/72">{item.founderJob}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <TrackedCanvaLink
              href="/go/canva-mcp"
              placement="capabilities"
              destination="official-mcp-docs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-emerald-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Read the official MCP documentation
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </TrackedCanvaLink>
            <Link
              href="/guides/canva-mcp-for-founders"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Use the FrankX implementation guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0b0d0e] px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="video-title">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-200/65">
                First-party watchlist
              </p>
              <h2 id="video-title" className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                See the product from Canva.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/58 lg:justify-self-end">
              These official Canva videos establish the current product direction. Playback is
              click-to-load, so YouTube is not contacted until the reader chooses to watch.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div>
              <YouTubeEmbed id="WJ8Jj44ehWE" title="Introducing Canva AI 2.0 — Canva Create 2026" />
              <p className="mt-4 text-sm font-medium text-white">Canva AI 2.0 · Canva Create 2026</p>
              <p className="mt-2 text-xs leading-5 text-white/60">Official Canva YouTube channel.</p>
            </div>
            <div>
              <YouTubeEmbed id="1GNYx2P1OB8" title="Visual Suite 2.0 — Canva Create 2025" />
              <p className="mt-4 text-sm font-medium text-white">Visual Suite 2.0 · Canva Create 2025</p>
              <p className="mt-2 text-xs leading-5 text-white/60">Official Canva YouTube channel.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="roadmap-title">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.64fr_1.36fr] lg:gap-24">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-200/65">
                Search + answer engine cluster
              </p>
              <h2 id="roadmap-title" className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                One audience. Twelve decisions.
              </h2>
              <p className="mt-6 text-base leading-7 text-white/58">
                The cluster follows the founder journey from “should I use this?” through setup,
                governance, comparison, and measurement. Each page owns one intent and links readers
                to the next decision—not to a generic archive.
              </p>
            </div>

            <div className="border-y border-white/10">
              {canvaContentRoadmap.map((entry, index) => {
                const content = (
                  <>
                    <span className="font-mono text-[9px] text-white/28">{String(index + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block text-base font-semibold text-white">{entry.title}</span>
                      <span className="mt-2 block text-xs leading-5 text-white/60">
                        {entry.primaryQuery} · {entry.format} · intent: {entry.intent}
                      </span>
                    </span>
                    <span className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] ${statusStyles[entry.status]}`}>
                      {entry.status}
                    </span>
                  </>
                )

                return entry.href ? (
                  <Link
                    key={entry.title}
                    href={entry.href}
                    className="grid min-h-16 grid-cols-[28px_1fr_auto] items-start gap-3 border-b border-white/[0.07] py-5 transition-colors last:border-b-0 hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={entry.title} className="grid min-h-16 grid-cols-[28px_1fr_auto] items-start gap-3 border-b border-white/[0.07] py-5 last:border-b-0">
                    {content}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="scorecard" className="border-y border-white/[0.07] bg-[#0c0e0f] px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="scorecard-title">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-200">
              <Gauge className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 id="scorecard-title" className="mt-7 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              The scorecard protects the mission.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/58">
              Traffic matters when the right founder reaches the right decision. These measures
              distinguish useful compounding from a content treadmill.
            </p>
          </div>
          <dl className="border-y border-white/10">
            {scorecard.map(([term, description]) => (
              <div key={term} className="grid gap-2 border-b border-white/[0.07] py-6 last:border-b-0 sm:grid-cols-[0.72fr_1.28fr] sm:gap-8">
                <dt className="text-sm font-semibold text-white">{term}</dt>
                <dd className="text-sm leading-6 text-white/56">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="fit-title">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
            <div className="border-t border-emerald-300/35 pt-7">
              <CheckCircle2 className="h-5 w-5 text-emerald-200" aria-hidden="true" />
              <h2 id="fit-title" className="mt-5 text-3xl font-semibold tracking-[-0.035em]">Use this system when…</h2>
              <ul className="mt-7 space-y-4 text-sm leading-6 text-white/60">
                <li>You publish repeatedly across owned, social, video, and sales channels.</li>
                <li>Your brand has more value than any single design and needs explicit governance.</li>
                <li>You want agents to reduce coordination work without authorizing unreviewed claims.</li>
                <li>You can measure which artifacts earn qualified attention or accelerate a decision.</li>
              </ul>
            </div>
            <div className="border-t border-amber-200/30 pt-7">
              <CircleDot className="h-5 w-5 text-amber-100" aria-hidden="true" />
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em]">Keep it simpler when…</h2>
              <ul className="mt-7 space-y-4 text-sm leading-6 text-white/60">
                <li>You publish occasionally and one competent editor can hold the workflow.</li>
                <li>Your evidence, rights, and brand system are not yet explicit enough to delegate.</li>
                <li>You are optimizing for asset volume before proving a recurring audience need.</li>
                <li>The work contains sensitive material that should not enter a public embed.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0b0d0e] px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="faq-title">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.58fr_1.42fr] lg:gap-24">
          <div>
            <ShieldCheck className="h-6 w-6 text-emerald-200" aria-hidden="true" />
            <h2 id="faq-title" className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Founder questions.</h2>
            <p className="mt-6 text-base leading-7 text-white/55">
              Direct answers, written for extraction and still worth reading in context.
            </p>
          </div>
          <div className="border-y border-white/10">
            {canvaFounderFaqs.map((faq) => (
              <details key={faq.question} className="group border-b border-white/[0.07] py-6 last:border-b-0">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-left text-base font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                  {faq.question}
                  <span className="text-white/35 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-3xl pb-1 pt-4 text-sm leading-7 text-white/58">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="sources-title">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/60">Source ledger</p>
              <h2 id="sources-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em]">First-party claims, inspectable.</h2>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/60">
              <span>Last verified {CANVA_LAST_VERIFIED}</span>
              <a
                href="/canva/llms.txt"
                className="font-medium text-emerald-100/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Agent-readable brief
              </a>
            </div>
          </div>
          <ol className="divide-y divide-white/[0.07]">
            {officialCanvaSources.map((source, index) => (
              <li key={source.href}>
                <TrackedCanvaLink
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  placement="source-ledger"
                  destination={source.title}
                  className="grid min-h-16 gap-3 py-5 transition-colors hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:grid-cols-[40px_0.75fr_1.25fr_auto] sm:items-center"
                >
                  <span className="font-mono text-[9px] text-white/25">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-semibold text-white">{source.title}</span>
                  <span className="text-xs leading-5 text-white/60">{source.role}</span>
                  <ExternalLink className="h-4 w-4 text-white/30" aria-hidden="true" />
                </TrackedCanvaLink>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/[0.07] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
            <Layers3 className="h-6 w-6 text-emerald-200" aria-hidden="true" />
          </div>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-200/65">Build the smallest governed loop</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
            One verified brief. One accepted artifact. One measurable next action.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/57">
            Start there. Add autonomy only after the loop proves that it protects the brand and helps a real reader decide.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <TrackedCanvaLink
              href="/go/canva"
              placement="closing-cta"
              destination="canva"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Open Canva
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedCanvaLink>
            <Link
              href="/blog/ultimate-canva-ai-workflow-2026"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:border-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Read the founder field guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
