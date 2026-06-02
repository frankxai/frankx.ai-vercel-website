import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Package,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import { createMetadata } from '@/lib/seo'
import { MEET_AND_GROW_URL, PARTNERSHIP_EMAIL } from '@/lib/cta-links'
import { getOutcomeFramedBuilds, statusLabel, type BuildStatus } from '@/lib/builds'

const SITE_URL = 'https://frankx.ai'
const CANONICAL_PATH = '/build'

export const metadata = createMetadata({
  title: 'Build with Frank — Workshops, sprints, and the agentic template pack',
  description:
    'For teams building on the agentic dev stack. One-day workshop, 5–10 day implementation sprint, and the template pack used in the public Agentic Builder Lab.',
  path: CANONICAL_PATH,
  keywords: [
    'ai workshop',
    'agentic ai sprint',
    'ai consulting',
    'ai architect',
    'agentic templates',
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

const offers = [
  {
    id: 'workshop',
    icon: Users,
    title: 'Workshop',
    headline: 'One day. Your team ships a working agent.',
    price: 'From €4,500',
    timing: '1 day · on-site or remote',
    body: 'A focused day with your team. We pick one workflow you already do, build a working agent for it on the stack you already use, and leave you with the repo and the AGENTS.md so it keeps shipping after we leave.',
    deliverables: [
      'Live build of one agent end-to-end',
      'Repo with AGENTS.md and PR conventions',
      'Recording of the full session',
      'Async follow-up week for questions',
    ],
    cta: { label: 'Ship your first agent in one day', href: MEET_AND_GROW_URL, external: true },
    accent: 'from-cyan-500/10 to-emerald-500/5',
    border: 'border-cyan-500/20',
  },
  {
    id: 'sprint',
    icon: Rocket,
    title: 'Implementation Sprint',
    headline: 'Idea or process to agentic prototype, shipped.',
    price: '€7,500 – €25,000',
    timing: '5 – 10 working days',
    body: 'A focused build-with-you sprint. We take one process or product idea and ship a working prototype in your environment — your repo, your data, your auth. You leave with the system running, not a slide deck.',
    deliverables: [
      'Working prototype in your environment',
      'Architecture diagram and decision log',
      'Production-ready repo with tests',
      'Knowledge transfer session for your team',
      'Two weeks async support after handoff',
    ],
    cta: { label: 'Book a sprint intro call', href: MEET_AND_GROW_URL, external: true },
    accent: 'from-violet-500/10 to-cyan-500/5',
    border: 'border-violet-500/30',
    featured: true,
  },
  {
    id: 'templates',
    icon: Package,
    title: 'Template Pack',
    headline: 'The artifacts behind every build in the lab.',
    price: 'Self-serve',
    timing: 'Instant download',
    body: 'The AGENTS.md, repo conventions, prompt packs, PR review checklists, eval harness, and content flywheel Frank uses on every build. Forkable, documented, voice-spec clean.',
    deliverables: [
      'AGENTS.md template',
      'Repo conventions and PR checklists',
      'Prompt packs for planning, refactor, content',
      'Minimal eval harness',
      'One year of updates · commercial license',
    ],
    cta: { label: 'Download the template pack', href: '/build/template-pack', external: false },
    accent: 'from-emerald-500/10 to-amber-500/5',
    border: 'border-emerald-500/20',
  },
] as const

const trust = [
  { metric: '12,000+', label: 'AI tracks shipped (Suno)' },
  { metric: 'Oracle', label: 'Enterprise AI background' },
  { metric: '8', label: 'Builds in public on the lab' },
  { metric: '5', label: 'Agentic tools in active production' },
]

const faqs = [
  {
    q: 'How quickly can we start?',
    a: 'Workshops usually book 2 to 4 weeks out. Sprints depend on scope — discovery to start is typically 1 to 3 weeks. Template pack is instant.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do. Sprints ship into your repo with your license. The template pack is commercially licensed for use across your projects.',
  },
  {
    q: 'What stack do you work in?',
    a: 'Next.js, Python, Node, TypeScript, Postgres, Firebase, Vercel. Tools: Claude Code, Codex, Antigravity 2.0, Gemini API. If your stack differs we discuss before booking.',
  },
  {
    q: 'Do you take equity instead of fees?',
    a: 'For early-stage companies with strong founder fit, yes. Discuss on the intro call.',
  },
  {
    q: 'What is the refund policy?',
    a: 'Workshops and sprints: 100% refund up to 7 days before the start date; pro-rata after. Template pack: 14-day no-questions refund.',
  },
  {
    q: 'Where does the public build log live?',
    a: 'On the Agentic Builder Lab page — every build the team does in public has its own entry with stack, outcome, and demo.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Frank Riemer — AI Architect',
    url: `${SITE_URL}${CANONICAL_PATH}`,
    description:
      'Workshops, implementation sprints, and the agentic template pack for teams building on the new AI dev stack.',
    areaServed: 'Worldwide',
    serviceType: ['AI workshop', 'AI implementation sprint', 'AI advisory', 'Agentic templates'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Build with Frank', item: `${SITE_URL}${CANONICAL_PATH}` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
]

export default function BuildPage() {
  const galleryBuilds = getOutcomeFramedBuilds(4)

  return (
    <main id="main" className="min-h-screen bg-[#06080f] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Build gallery on this page is a re-frame of the canonical collection on /agentic-builder-lab */}
      <link rel="alternate" href={`${SITE_URL}/agentic-builder-lab`} />

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/10 pt-28 pb-20 sm:pt-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(139,92,246,0.18),transparent_38%),radial-gradient(circle_at_78%_22%,rgba(16,185,129,0.14),transparent_36%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 mb-6">
            <Briefcase className="h-3.5 w-3.5 text-violet-300" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-violet-200">
              Build with Frank
            </span>
          </span>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
            Build agentic systems with the architect{' '}
            <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
              shipping them in public.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-300">
            For teams hiring Frank for hands-on agentic work. For self-serve courses see{' '}
            <Link href="/workshops" className="rounded text-cyan-300 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2">
              /workshops
            </Link>
            . For the live BYOK tools see{' '}
            <Link href="/lab" className="rounded text-cyan-300 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2">
              /lab
            </Link>
            .
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={MEET_AND_GROW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-violet-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-violet-500/20 transition-all hover:bg-violet-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              Book a 20-min intro
              <Calendar className="h-4 w-4" />
            </a>
            <Link
              href="/build/template-pack"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              Get the template pack
              <Package className="h-4 w-4" />
            </Link>
            <Link
              href="/agentic-builder-lab"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              See the live builds
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {trust.map((t) => (
              <div key={t.label}>
                <div className="text-2xl font-semibold text-white sm:text-3xl">{t.metric}</div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-slate-500">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFERS ─────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Three ways to work together
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              From a focused day to a shipped prototype.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {offers.map((o) => {
              const Icon = o.icon
              return (
                <article
                  key={o.id}
                  id={o.id}
                  className={`relative flex flex-col rounded-2xl border bg-gradient-to-b ${o.accent} ${o.border} p-6 ${'featured' in o && o.featured ? 'lg:scale-[1.02] lg:shadow-2xl lg:shadow-violet-500/10' : ''}`}
                >
                  {'featured' in o && o.featured && (
                    <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full border border-violet-500/40 bg-violet-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-violet-200">
                      Most requested
                    </span>
                  )}

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-widest text-slate-500">{o.timing}</div>
                      <div className="mt-1 text-sm font-semibold text-white">{o.price}</div>
                    </div>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">{o.title}</h3>
                  <p className="mt-2 text-sm font-medium text-slate-300">{o.headline}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{o.body}</p>

                  <div className="mt-5 border-t border-white/10 pt-4">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                      What you actually get
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      {o.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-6">
                    {o.cta.external ? (
                      <a
                        href={o.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-slate-100 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
                      >
                        {o.cta.label}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href={o.cta.href}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-slate-100 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
                      >
                        {o.cta.label}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── ADVISORY CALL ──────────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                  <Clock className="h-3.5 w-3.5" />
                  Not sure which fits?
                </div>
                <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                  Book a 20-minute call. We figure out the right shape together.
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Or email{' '}
                  <a href={PARTNERSHIP_EMAIL} className="rounded text-cyan-300 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2">
                    hello@frankx.ai
                  </a>{' '}
                  with what you are building.
                </p>
              </div>
              <a
                href={MEET_AND_GROW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
              >
                Book intro call
                <Calendar className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUILD GALLERY (proof below) ────────────────────────────────── */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
                Receipts
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Recent builds with outcomes.
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-slate-300">
                A re-frame of the public build log — same builds, outcome-led. Full chronological
                series and learnings on the Agentic Builder Lab page.
              </p>
            </div>
            <Link
              href="/agentic-builder-lab"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              See the full 30-day log
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {galleryBuilds.length === 0 ? (
              <div className="col-span-full rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm text-slate-400">
                Builds are loading. See the full log on the{' '}
                <Link href="/agentic-builder-lab" className="rounded text-cyan-300 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2">
                  Agentic Builder Lab
                </Link>
                .
              </div>
            ) : (
              galleryBuilds.map((b) => (
                <GlowCard key={b.slug} color="emerald" className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${STATUS_COLOR[b.status]}`}
                    >
                      {statusLabel(b.status)}
                    </span>
                    {b.stack[0] && (
                      <span className="text-[11px] text-slate-500">{b.stack.slice(0, 3).join(' · ')}</span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white leading-snug">{b.title}</h3>
                    <p className="mt-2 text-sm font-medium text-emerald-200">
                      {b.outcome_headline ?? b.outcome_metric}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-400 line-clamp-3">{b.summary}</p>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                    <Link
                      href={`/agentic-builder-lab#${b.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                    >
                      Read the full build log
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    {b.demo_url && (
                      <a
                        href={b.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-slate-400 transition hover:text-white"
                      >
                        Demo →
                      </a>
                    )}
                  </div>
                </GlowCard>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/80">
              Common questions
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              The questions teams ask before booking.
            </h2>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              <span>No subcontractors. Frank does the work.</span>
            </div>
          </div>

          <div className="grid gap-4">
            {faqs.map((f) => (
              <article key={f.q} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-base font-semibold text-white">{f.q}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{f.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Sparkles className="mx-auto h-6 w-6 text-cyan-300" />
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Build the next one with the architect doing it in public.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-slate-300">
            One call. We figure out whether it is a workshop, a sprint, or just the template pack.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={MEET_AND_GROW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              Book intro call
              <Calendar className="h-4 w-4" />
            </a>
            <Link
              href="/agentic-builder-lab"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              See the lab
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA — clears the MobileBottomNav (56-64px) */}
      <div className="fixed inset-x-0 bottom-20 z-40 px-4 lg:hidden">
        <a
          href={MEET_AND_GROW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-2xl shadow-cyan-500/30 transition hover:bg-cyan-200"
        >
          Book a 20-min intro
          <Calendar className="h-4 w-4" />
        </a>
      </div>
    </main>
  )
}
