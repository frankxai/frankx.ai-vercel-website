import Link from 'next/link'
import type { Metadata } from 'next'
import {
  Video,
  Users,
  Film,
  Cpu,
  Building2,
  Database,
  ArrowRight,
  Sparkles,
  Workflow,
  ExternalLink,
  BookOpen,
  Zap,
  Layers,
  LineChart,
  Hammer,
} from 'lucide-react'
import { FrankXOSHeader } from '@/components/os/FrankXOSHeader'
import { osModules, osCRM, type OSModule, type ModuleColor, type ModulePhase } from '@/data/os-modules'

export const metadata: Metadata = {
  title: 'FrankX OS — Personal AI Operating System',
  description:
    'The constellation of systems Frank Riemer uses to run an AI-augmented creator business. Watch OS, Workshop OS, Agentic Content Officer, ACOS, AI CoE Hub, Library OS, and the Build First AI Agent Funnel — one operating system.',
  openGraph: {
    title: 'FrankX OS — Personal AI Operating System',
    description:
      'Seven interlocking modules. One CRM. One amplification loop. The operating system behind frankx.ai.',
    url: 'https://frankx.ai/os',
    siteName: 'FrankX',
    type: 'website',
    images: [
      {
        url: '/hero-homepage.png',
        width: 1200,
        height: 630,
        alt: 'FrankX OS — the operating system behind frankx.ai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FrankX OS — Personal AI Operating System',
    description: 'Seven interlocking modules. One CRM. One amplification loop.',
    images: ['/hero-homepage.png'],
  },
  alternates: { canonical: 'https://frankx.ai/os' },
}

const ICON_MAP = { Video, Users, Film, Cpu, Building2, BookOpen, Zap, LineChart, Hammer }

const COLOR_TOKENS: Record<ModuleColor, { ring: string; text: string; bg: string; glow: string }> = {
  cyan: {
    ring: 'ring-cyan-400/30 hover:ring-cyan-400/60',
    text: 'text-cyan-300',
    bg: 'bg-cyan-500/10',
    glow: 'from-cyan-500/[0.08]',
  },
  violet: {
    ring: 'ring-violet-400/30 hover:ring-violet-400/60',
    text: 'text-violet-300',
    bg: 'bg-violet-500/10',
    glow: 'from-violet-500/[0.08]',
  },
  amber: {
    ring: 'ring-amber-400/30 hover:ring-amber-400/60',
    text: 'text-amber-300',
    bg: 'bg-amber-500/10',
    glow: 'from-amber-500/[0.08]',
  },
  emerald: {
    ring: 'ring-emerald-400/30 hover:ring-emerald-400/60',
    text: 'text-emerald-300',
    bg: 'bg-emerald-500/10',
    glow: 'from-emerald-500/[0.08]',
  },
  rose: {
    ring: 'ring-rose-400/30 hover:ring-rose-400/60',
    text: 'text-rose-300',
    bg: 'bg-rose-500/10',
    glow: 'from-rose-500/[0.08]',
  },
  slate: {
    ring: 'ring-zinc-400/30 hover:ring-zinc-400/60',
    text: 'text-zinc-200',
    bg: 'bg-zinc-500/10',
    glow: 'from-zinc-500/[0.08]',
  },
  fuchsia: {
    ring: 'ring-fuchsia-400/30 hover:ring-fuchsia-400/60',
    text: 'text-fuchsia-300',
    bg: 'bg-fuchsia-500/10',
    glow: 'from-fuchsia-500/[0.08]',
  },
  teal: {
    ring: 'ring-teal-400/30 hover:ring-teal-400/60',
    text: 'text-teal-300',
    bg: 'bg-teal-500/10',
    glow: 'from-teal-500/[0.08]',
  },
  lime: {
    ring: 'ring-lime-400/30 hover:ring-lime-400/60',
    text: 'text-lime-300',
    bg: 'bg-lime-500/10',
    glow: 'from-lime-500/[0.08]',
  },
}

const STATUS_LABEL = {
  live: 'Live',
  active: 'Active',
  scaffolded: 'Scaffolded',
  deferred: 'Deferred',
}

const STATUS_STYLE = {
  live: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  active: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  scaffolded: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  deferred: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/25',
}

const PHASE_LABEL: Record<ModulePhase, string> = {
  authoring: 'Authoring',
  funnel: 'Funnel',
  amplify: 'Amplify',
  'cross-cutting': 'Cross-cutting',
}

function OSSchema() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FrankX OS',
    description: 'Personal AI Operating System. Five interlocking modules + unified CRM.',
    url: 'https://frankx.ai/os',
    author: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: 'https://frankx.ai',
      jobTitle: 'AI Architect',
    },
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
  )
}

function ModuleCard({ module }: { module: OSModule }) {
  const Icon = ICON_MAP[module.iconName as keyof typeof ICON_MAP] ?? Sparkles
  const tokens = COLOR_TOKENS[module.color]

  return (
    <Link
      href={`/os/${module.slug}`}
      className={`group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 ring-1 ${tokens.ring} transition-all hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
      aria-label={`Open ${module.name} module overview`}
    >
      <div
        className={`absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br ${tokens.glow} to-transparent blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${tokens.bg}`}>
            <Icon className={`h-5 w-5 ${tokens.text}`} aria-hidden="true" />
          </div>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[module.status]}`}
          >
            {STATUS_LABEL[module.status]}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-zinc-50 mb-1">{module.name}</h3>
        <p className={`text-xs ${tokens.text} mb-3`}>{module.oneLine}</p>
        <p className="text-sm leading-relaxed text-zinc-400 mb-4">{module.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4" aria-label="Phases this module owns">
          {module.phases.map((phase) => (
            <span
              key={phase}
              className="inline-flex items-center rounded-md bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 text-[11px] text-zinc-400"
            >
              {PHASE_LABEL[phase]}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span>Shipped {module.shipped}</span>
            <span aria-hidden="true">·</span>
            <span>{module.connectsTo.length} connections</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">
            <span>Explore</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </div>
        </div>
      </div>
    </Link>
  )
}

function ConnectionMatrix() {
  // Renders a compact table: for each module, which other modules it connects to.
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <caption className="sr-only">Connection matrix between FrankX OS modules</caption>
          <thead>
            <tr className="border-b border-white/[0.06] text-left">
              <th scope="col" className="px-4 py-3 font-medium text-zinc-400">Module</th>
              <th scope="col" className="px-4 py-3 font-medium text-zinc-400">Feeds into</th>
              <th scope="col" className="px-4 py-3 font-medium text-zinc-400">Primary artifacts</th>
              <th scope="col" className="px-4 py-3 font-medium text-zinc-400 hidden sm:table-cell">Commands</th>
            </tr>
          </thead>
          <tbody>
            {osModules.map((m, i) => {
              const tokens = COLOR_TOKENS[m.color]
              const downstream = m.connectsTo
                .map((id) => osModules.find((x) => x.id === id)?.name)
                .filter(Boolean)
                .join(', ')
              return (
                <tr
                  key={m.id}
                  className={i < osModules.length - 1 ? 'border-b border-white/[0.04]' : ''}
                >
                  <td className="px-4 py-3">
                    <Link href={`/os/${m.slug}`} className={`font-medium ${tokens.text} hover:underline`}>
                      {m.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{downstream || '—'}</td>
                  <td className="px-4 py-3 text-zinc-500 text-xs">
                    {m.artifacts.slice(0, 2).join(', ')}
                    {m.artifacts.length > 2 ? '…' : ''}
                  </td>
                  <td className="px-4 py-3 text-zinc-500 text-xs hidden sm:table-cell">
                    {m.commands.slice(0, 2).map((c) => (
                      <code key={c} className="mr-1.5 rounded bg-white/[0.04] px-1.5 py-0.5 text-[11px]">
                        {c}
                      </code>
                    ))}
                    {m.commands.length > 2 ? <span className="text-zinc-600">+{m.commands.length - 2}</span> : null}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function OSPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <OSSchema />
      <FrankXOSHeader />

      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] via-violet-500/[0.02] to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[140px]"
          aria-hidden="true"
        />
        <div
          className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-violet-500/[0.04] rounded-full blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 mb-5">
            <Workflow className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Personal AI Operating System</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-50 leading-tight tracking-tight mb-6">
            FrankX OS
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl leading-relaxed mb-6">
            Seven interlocking modules. One CRM. One amplification loop.
            <br className="hidden sm:block" />
            The operating system behind every workshop, video, and agent on this site.
          </p>

          <p className="text-base text-zinc-500 max-w-3xl leading-relaxed">
            Each module follows the same spine — private authoring → public funnel → amplification loop.
            The whole thing is the enterprise AI Center of Excellence pattern adapted for one person,
            then made installable for anyone.
          </p>

          <p className="text-sm text-zinc-500 max-w-3xl leading-relaxed mt-5">
            Looking for everything else — substrate repos, operational layers, ops tooling? See the full{' '}
            <Link
              href="/ecosystem"
              className="inline-flex items-center gap-1 text-fuchsia-300 hover:text-fuchsia-200 underline decoration-fuchsia-300/30 hover:decoration-fuchsia-300/60 underline-offset-2"
            >
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              FrankX Ecosystem map
            </Link>
            {' '}— 28 systems across 4 tiers.
          </p>
        </div>
      </section>

      {/* The spine explainer */}
      <section className="relative py-8 border-y border-white/[0.04] bg-white/[0.01]">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 mb-5">
            The shared spine
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-xs font-medium text-cyan-300 uppercase tracking-wider mb-2">
                1. Private authoring
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Briefs, drafts, per-attendee research, run-of-show — all in private repo. Templates +
                skills + agents do the heavy lifting.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-xs font-medium text-violet-300 uppercase tracking-wider mb-2">
                2. Public funnel
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Public-facing page with clear CTA. Intake form logs to unified CRM. Linktree routes
                audience segments to the right module.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-xs font-medium text-amber-300 uppercase tracking-wider mb-2">
                3. Amplification
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Post-delivery content kit. Attendees publish. Frank reposts. Every loop closes in the
                CRM with a measurable engagement record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Module grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-zinc-50 mb-1">The seven modules</h2>
              <p className="text-sm text-zinc-500">
                Click any module for the full overview, or jump straight to the surface.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {osModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      </section>

      {/* Unified CRM */}
      <section className="py-12 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-500/10">
                <Database className="h-5 w-5 text-zinc-300" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-zinc-50 mb-1">{osCRM.name}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
                  {osCRM.description}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {osCRM.files.map((f) => (
                <div
                  key={f.path}
                  className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                >
                  <code className="text-xs text-cyan-300 font-mono whitespace-nowrap">{f.path}</code>
                  <span className="text-xs text-zinc-500">— {f.purpose}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Hub — the thinking under the modules */}
      <section className="py-12 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-violet-500/[0.16] bg-violet-500/[0.03] p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/15">
                <BookOpen className="h-5 w-5 text-violet-300" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-xl font-semibold text-zinc-50">Research Hub</h2>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-violet-200">flagship articles</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl mt-1">
                  The deep editorial thinking under the modules. Where the prompts come from,
                  why the architecture is built the way it is, what the longevity research
                  actually says about meaning.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link
                href="/research/blue-zones-ikigai-ai-era"
                className="group block rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-violet-500/30 p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-2">
                  Meaning &middot; longevity &middot; AI era
                </p>
                <h3 className="text-base font-semibold text-zinc-50 mb-2">
                  Blue Zones, Ikigai, and the AI Era
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  What 110-year-olds in Okinawa understand about meaning that AI is now
                  forcing the rest of us to learn. 12-min read.
                </p>
              </Link>
              <Link
                href="/research/conscious-ai-operating-systems"
                className="group block rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-violet-500/30 p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-2">
                  Sovereign AI &middot; architecture
                </p>
                <h3 className="text-base font-semibold text-zinc-50 mb-2">
                  Conscious AI Operating Systems
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  The architectural answer to the meaning question. Sovereign AI as the
                  instrument, not the replacement.
                </p>
              </Link>
            </div>
            <div className="mt-5">
              <Link
                href="/research"
                className="inline-flex items-center gap-1.5 text-sm text-violet-300 hover:text-violet-200 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] px-1 py-0.5"
              >
                Browse the full Research Hub
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Connection matrix */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-50 mb-1">Connection matrix</h2>
          <p className="text-sm text-zinc-500 mb-6">
            How each module feeds the next. The loop compounds.
          </p>
          <ConnectionMatrix />
        </div>
      </section>

      {/* How to use + fork */}
      <section className="py-16 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-zinc-50 mb-3">How Frank uses this daily</h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li className="flex gap-3">
                <span className="text-cyan-400 font-mono text-xs mt-1">01</span>
                <span>Morning: ACOS picks up yesterday&apos;s trajectories and surfaces what needs attention.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-mono text-xs mt-1">02</span>
                <span>Any confirmed workshop runs through Workshop OS — brief, attendee prep, run-of-show.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-mono text-xs mt-1">03</span>
                <span>Videos (talking-head, workshop recap, product demo) route through the Agentic Content Officer.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-mono text-xs mt-1">04</span>
                <span>Every outcome logs as an engagement in the unified CRM. People, not platforms.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-mono text-xs mt-1">05</span>
                <span>The CoE Hub stays the reference framework — the why behind the workflows.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-violet-500/[0.06] via-cyan-500/[0.02] to-transparent p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-violet-300 mb-3">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Coming soon</span>
            </div>
            <h3 className="text-xl font-semibold text-zinc-50 mb-3">Fork this OS</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-5">
              The full stack is being packaged as an open-source template. One command scaffolds the
              private authoring folders, the CRM, and the LLM-agnostic skill packs. Works with Claude
              Code, ChatGPT Projects, Codex, and Gemini CLI out of the box.
            </p>
            <div className="rounded-lg border border-white/[0.08] bg-black/40 px-4 py-3 font-mono text-sm text-zinc-300 mb-4">
              <span className="text-zinc-500">$</span> npx create-workshop-os my-ops
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <span>MIT licensed</span>
              <span aria-hidden="true">·</span>
              <span>No tracking</span>
              <span aria-hidden="true">·</span>
              <span>Portable across LLMs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="py-16 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-zinc-500 leading-relaxed">
            Frank Riemer is a AI Architect & Creator. FrankX adapts enterprise AI architecture
            patterns (Strategy, Governance, Talent, Technology, Data, Ethics) to one-person and small-team
            creative systems. Independent project. Not affiliated with, endorsed by, or sponsored by Oracle.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-zinc-600">
            <Link
              href="/ai-architect/ai-coe-hub"
              className="inline-flex items-center gap-1.5 hover:text-zinc-400 transition-colors"
            >
              AI CoE Hub
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/about"
              className="hover:text-zinc-400 transition-colors"
            >
              About Frank
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/contact"
              className="hover:text-zinc-400 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
