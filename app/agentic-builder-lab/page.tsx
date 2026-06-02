import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  GitBranch,
  Globe,
  Layers,
  LineChart,
  Network,
  Rocket,
  Sparkles,
  Terminal,
  Wrench,
} from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import { EmailSignup } from '@/components/email-signup'
import { createMetadata } from '@/lib/seo'
import {
  getAllBuilds,
  isDayNumberStale,
  statusLabel,
  type Build,
  type BuildStatus,
} from '@/lib/builds'

const SITE_URL = 'https://frankx.ai'
const CANONICAL_PATH = '/agentic-builder-lab'

export const metadata = createMetadata({
  title: 'Agentic Builder Lab — Building real companies with the agentic dev stack',
  description:
    'A public build-in-public lab: Antigravity 2.0, Claude Code, Codex, Gemini API, Firebase, Android. Eight builds, one stack thesis, no hype. Field notes from a working architect.',
  path: CANONICAL_PATH,
  keywords: [
    'agentic builder lab',
    'antigravity',
    'claude code',
    'codex',
    'gemini api',
    'agentic development',
    'ai architect',
    'agentic dev stack',
    'frankx',
  ],
})

const STATUS_COLOR: Record<BuildStatus, string> = {
  live: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
  shipping: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
  wip: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
  paused: 'text-slate-400 bg-white/5 border-white/10',
  archived: 'text-slate-500 bg-white/5 border-white/10',
}

const stack = [
  {
    name: 'Antigravity 2.0',
    role: 'Greenfield, UI, browser-validated artifacts',
    body: 'Where new product surfaces are born. Generates UI from a brief, validates in a real browser, and produces walkthrough artifacts that double as demo assets.',
    icon: Sparkles,
  },
  {
    name: 'Claude Code',
    role: 'Repo work, PRs, refactors, multi-file edits',
    body: 'Owns the existing codebase: deep refactors, test repair, cross-file edits, PR discipline. Plan-then-act mode keeps the diff tight.',
    icon: Code2,
  },
  {
    name: 'Codex',
    role: 'Terminal, scripts, data pipelines',
    body: 'Terminal-heavy work where the loop is shell-script-fast. Data validation, CSV pipelines, eval harnesses.',
    icon: Terminal,
  },
  {
    name: 'Gemini API + AI Studio',
    role: 'Grounded research, Managed Agents, mobile',
    body: 'Grounded research with citations, Managed Agents for background tasks, AI Studio for prototyping, native Android target via Antigravity export.',
    icon: Globe,
  },
  {
    name: 'Firebase + Vercel + GitHub',
    role: 'Deploy, host, observe',
    body: 'The production backplane. Firebase for app data and auth, Vercel for the website, GitHub for the source of truth and CI.',
    icon: Rocket,
  },
]

const toolMatrix = {
  layers: ['Planning', 'Code generation', 'Verification', 'Deployment', 'Content flywheel'] as const,
  tools: [
    {
      name: 'Antigravity 2.0',
      cells: ['Excellent', 'Excellent (greenfield)', 'Excellent (artifacts)', 'Good (Firebase)', 'Good (walkthroughs)'],
    },
    {
      name: 'Claude Code',
      cells: ['Excellent (Plan mode)', 'Excellent (existing repos)', 'Good (tests + PRs)', 'Good', 'Excellent (MDX, drafts)'],
    },
    {
      name: 'Codex',
      cells: ['Good', 'Good (shell-fast)', 'Good (eval harness)', 'Good', 'Limited'],
    },
    {
      name: 'Gemini / AI Studio',
      cells: ['Excellent (grounded)', 'Good (prototypes)', 'Good (citations)', 'Good (Firebase)', 'Good'],
    },
    {
      name: 'Human (you)',
      cells: ['Required', 'Review', 'Required', 'Approve', 'Edit + ship'],
    },
  ],
}

const methodology = [
  {
    n: '01',
    title: 'Specify',
    body: 'Write the brief the way you would for a senior engineer joining tomorrow. Include the failure modes and the acceptance criteria.',
  },
  {
    n: '02',
    title: 'Architect',
    body: 'Use a Plan agent to map files, components, data flow, and integration points before any code is generated.',
  },
  {
    n: '03',
    title: 'Build with agents',
    body: 'Route the work to the tool that owns the layer. Antigravity for greenfield UI, Claude Code for repo work, Codex for terminal.',
  },
  {
    n: '04',
    title: 'Verify artifacts',
    body: 'Every agent output becomes a reviewable artifact: a screenshot, a walkthrough, a diff, a test report. No invisible work.',
  },
  {
    n: '05',
    title: 'Ship with content',
    body: 'Each build session produces the build-log entry, the LinkedIn draft, the demo brief, the diagram, and one reusable prompt. The ACOS skill runs the flywheel.',
  },
]

const templates = [
  {
    title: 'AGENTS.md',
    body: 'The file every agent reads when it joins a repo. Roles, scope, escalation, banned operations.',
    href: '/build/template-pack',
    label: 'In the pack',
  },
  {
    title: 'Repo instructions',
    body: 'Folder conventions, branch strategy, commit message patterns, PR review checklist.',
    href: '/build/template-pack',
    label: 'In the pack',
  },
  {
    title: 'Prompt packs',
    body: 'Tool-specific reusable prompts: planning, refactor, test repair, content extraction.',
    href: '/build/template-pack',
    label: 'In the pack',
  },
  {
    title: 'Evaluation harness',
    body: 'A minimal eval scaffold to verify agent output against acceptance criteria before merge.',
    href: '/build/template-pack',
    label: 'In the pack',
  },
]

const bridgeOffers = [
  {
    title: 'Workshop',
    body: 'One day. Your team builds a working agent on the stack you already use.',
    href: '/build#workshop',
  },
  {
    title: 'Implementation Sprint',
    body: '5 to 10 days. Idea or process to agentic prototype, shipped to a real environment.',
    href: '/build#sprint',
  },
  {
    title: 'Template Pack',
    body: 'AGENTS.md, repo conventions, prompt packs, eval harness, content flywheel.',
    href: '/build/template-pack',
  },
]

const jsonLd = (builds: Build[]) => [
  {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Agentic Builder Lab',
    description:
      'A public build-in-public lab using Antigravity, Claude Code, Codex, Gemini API, Firebase, and the Google agentic dev stack.',
    url: `${SITE_URL}${CANONICAL_PATH}`,
    author: { '@type': 'Person', name: 'Frank', jobTitle: 'AI Architect', url: SITE_URL },
    about: ['Agentic development', 'Antigravity', 'Claude Code', 'Codex', 'Gemini API', 'AI Architect'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Agentic Builder Lab', item: `${SITE_URL}${CANONICAL_PATH}` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '30-Day Build Log',
    itemListElement: builds.slice(0, 8).map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.title,
      url: `${SITE_URL}${CANONICAL_PATH}#${b.slug}`,
    })),
  },
]

export default function AgenticBuilderLabPage() {
  const builds = getAllBuilds()

  return (
    <main id="main" className="min-h-screen bg-[#06080f] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(builds)) }}
      />

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/10 pt-28 pb-20 sm:pt-36 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(67,191,227,0.22),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.16),transparent_36%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-200">
                Agentic Builder Lab
              </span>
            </span>
            <Link
              href="/agentic-ai-center"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-slate-300 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              New to agentic AI? Read the field guide
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            The developer role is splitting:{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              architect, agent commander, verification officer.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/80 sm:text-lg">
            This is the public lab where Frank builds real companies on the new agentic dev stack —
            Antigravity 2.0, Claude Code, Codex, Gemini API, Firebase, Android. Eight builds. One
            stack thesis. Receipts, not hype.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="#builds"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              See the 8 builds
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#field-notes"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              Get the Field Notes
            </Link>
            <Link
              href="/build"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-5 py-3 text-sm font-semibold text-slate-300 backdrop-blur-xl transition hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              Hire Frank
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-2xl">
            {[
              { n: '8', label: 'Builds in flight' },
              { n: '5', label: 'Agentic tools' },
              { n: '30d', label: 'Public series' },
              { n: '1', label: 'Architect' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-semibold text-white">{s.n}</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THESIS ─────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
            Why this matters now
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Agentic dev is not &quot;AI writes your code.&quot; It is a different unit of work: from file, to
            task, to agent, to verified artifact, to shipped product.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-white/80">
            The question is no longer which AI coding tool is best. The question is which builder
            knows how to command them — when to plan, when to dispatch, when to verify, when to
            ship. This lab is the receipts.
          </p>
        </div>
      </section>

      {/* ── 30-DAY BUILD LOG ───────────────────────────────────────────── */}
      <section id="builds" className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                The 30-Day Build Log
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                Eight builds. One stack. Public from day one.
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-white/80">
                Each build is a real company surface or working demo — not a sandbox. Status is
                honest: live, shipping, work in progress.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {builds.slice(0, 8).map((b) => {
              const showDay = b.day_number !== null && b.day_number !== undefined && !isDayNumberStale(b)
              return (
                <article
                  key={b.slug}
                  id={b.slug}
                  className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${STATUS_COLOR[b.status]}`}
                    >
                      {statusLabel(b.status)}
                    </span>
                    {showDay && (
                      <span className="text-[11px] font-semibold text-slate-500">
                        Day {b.day_number}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-white leading-snug">{b.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400 line-clamp-3">{b.summary}</p>
                  </div>

                  {b.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {b.stack.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-slate-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/5 pt-3">
                    {b.outcome_metric ? (
                      <span className="text-[11px] text-slate-500">{b.outcome_metric}</span>
                    ) : (
                      <span className="text-[11px] text-slate-600">No metric yet</span>
                    )}
                    {b.demo_url ? (
                      <a
                        href={b.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-300 transition group-hover:text-cyan-200"
                      >
                        Demo
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-[11px] text-slate-600">Demo soon</span>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── THE STACK ──────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-300/80">
              The Stack
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Five tools, five jobs. Each owns a layer.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-white/80">
              Picking one tool is the wrong frame. Each one earns a specific layer of the work. The
              architect routes the task to the right one.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stack.map((t) => {
              const Icon = t.icon
              return (
                <GlowCard key={t.name} color="violet" className="p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-base font-semibold text-white">{t.name}</div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-widest">{t.role}</div>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-slate-400">{t.body}</p>
                </GlowCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TOOL COMPARISON MATRIX ─────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/80">
              Tool Matrix
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Which tool owns which layer.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-white/80">
              A working architect&apos;s view — what each tool is best at, what it is acceptable at, and
              what still needs a human.
            </p>
          </div>

          {/* Desktop: table */}
          <div className="mt-10 hidden lg:block">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-white/[0.04]">
                    <th className="sticky left-0 z-10 bg-white/[0.04] px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                      Tool
                    </th>
                    {toolMatrix.layers.map((l) => (
                      <th
                        key={l}
                        className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-400"
                      >
                        {l}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {toolMatrix.tools.map((t) => (
                    <tr key={t.name} className="border-t border-white/5">
                      <th className="sticky left-0 z-10 bg-[#06080f] px-4 py-3 text-left text-sm font-semibold text-white">
                        {t.name}
                      </th>
                      {t.cells.map((c, i) => (
                        <td key={i} className="px-4 py-3 text-sm text-slate-300">
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile: vertical cards */}
          <div className="mt-10 grid gap-4 lg:hidden">
            {toolMatrix.tools.map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <div className="text-base font-semibold text-white">{t.name}</div>
                <dl className="mt-3 grid grid-cols-1 gap-2 text-sm">
                  {toolMatrix.layers.map((l, i) => (
                    <div key={l} className="flex justify-between gap-3 border-t border-white/5 pt-2 first:border-t-0 first:pt-0">
                      <dt className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">{l}</dt>
                      <dd className="text-right text-sm text-slate-300">{t.cells[i]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILD METHODOLOGY ──────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
              Methodology
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              The five steps that survive every build.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-white/80">
              Same loop every time. Specify, architect, build with agents, verify artifacts, ship
              with content. The ACOS skill handles step five.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {methodology.map((m) => (
              <article key={m.n} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300/70">
                  {m.n}
                </div>
                <h3 className="mt-3 text-base font-semibold text-white">{m.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES & FIELD NOTES ────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                Templates
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                The reusable artifacts the lab produces.
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-white/80">
                Every build adds one prompt or template to the pack. Forkable, documented, voice-spec
                clean.
              </p>
            </div>
            <Link
              href="/build/template-pack"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f] rounded-full"
            >
              See the full template pack
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {templates.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-cyan-300/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-cyan-200">
                  <Wrench className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{t.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{t.body}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-cyan-300">
                  {t.label}
                  <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRIDGE TO /build ───────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-300/80">
              Want this for your team?
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Three ways to work with Frank.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {bridgeOffers.map((o) => (
              <Link
                key={o.title}
                href={o.href}
                className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-xl transition hover:border-violet-300/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
              >
                <h3 className="text-lg font-semibold text-white">{o.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{o.body}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition group-hover:text-violet-200">
                  Open
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CROSS-LINKS ────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            Connected surfaces
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Field guide', body: 'Concepts and the maturity model.', href: '/agentic-ai-center', icon: Network },
              { name: 'Architecture', body: 'Blueprints, prototypes, templates.', href: '/ai-architecture', icon: Layers },
              { name: 'Enterprise', body: 'AI Center of Excellence model.', href: '/ai-coe', icon: LineChart },
              { name: 'Tools (BYOK)', body: 'Live tools Frank has built.', href: '/lab', icon: GitBranch },
            ].map((c) => {
              const Icon = c.icon
              return (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-white/25 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-slate-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-semibold text-white">{c.name}</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{c.body}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ─────────────────────────────────────────────────── */}
      <section id="field-notes" className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-white/[0.02] to-emerald-500/5 p-8 sm:p-10 backdrop-blur-xl">
            <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                  Field Notes
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                  One build, one architecture note, one reusable prompt — every week.
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-white/80">
                  Honest write-ups from inside the lab. What shipped, what broke, which tool earned
                  which layer. No threads, no thought-leader content.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-slate-300">
                  {[
                    'Weekly build retrospective',
                    'Architecture diagram with each entry',
                    'One reusable prompt every issue',
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <EmailSignup
                  listType="agentic-builder-lab"
                  buttonText="Get Field Notes"
                  placeholder="you@company.com"
                  showName
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
