import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Code2,
  FlaskConical,
  Mail,
  Workflow,
} from 'lucide-react'
import Link from 'next/link'

import { createMetadata } from '@/lib/seo'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

const SITE_URL = 'https://frankx.ai'
const CANONICAL_PATH = '/contact'
const PRIMARY_EMAIL = 'frank@frankx.ai'

const intents = [
  {
    label: 'Workshop or sprint',
    subject: 'Workshop or sprint — first call',
    description: '1-day agent workshop, 5–10 day implementation sprint, or hands-on team build.',
    href: `mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent('Workshop or sprint — first call')}`,
  },
  {
    label: 'Partnership',
    subject: 'Partnership inquiry',
    description: 'Co-build, co-market, infrastructure or platform partnerships.',
    href: `mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent('Partnership inquiry')}`,
  },
  {
    label: 'Press or speaking',
    subject: 'Press / speaking',
    description: 'Quotes, interviews, keynotes, workshop bookings.',
    href: `mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent('Press / speaking')}`,
  },
  {
    label: 'Something else',
    subject: 'FrankX — general inquiry',
    description: 'Anything that doesn\'t fit the buckets above. Plain email works.',
    href: `mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent('FrankX — general inquiry')}`,
  },
] as const

const surfaces = [
  {
    icon: Code2,
    name: 'Hire Frank',
    body: 'Workshop, sprint, or template pack. Outcome-framed engagements.',
    href: '/build',
  },
  {
    icon: FlaskConical,
    name: 'Agentic Builder Lab',
    body: 'Build-in-public log. The work behind the offers.',
    href: '/agentic-builder-lab',
  },
  {
    icon: BookOpen,
    name: 'Agentic AI Center',
    body: 'Concepts, maturity model, decision frameworks. Start here if you\'re evaluating.',
    href: '/agentic-ai-center',
  },
  {
    icon: Workflow,
    name: 'BYOK Tools',
    body: 'The frontier-model tool collection. Bring your own keys.',
    href: '/lab',
  },
] as const

const faqs = [
  {
    q: 'What\'s the fastest way to start?',
    a: 'A 20-minute intro call. Frank confirms the shape of the engagement (workshop, sprint, advisory), the team or stack, and whether there\'s a fit. No pitch deck, no proposal until both sides agree on scope.',
  },
  {
    q: 'How long do engagements typically run?',
    a: 'Workshops: 1 day. Implementation sprints: 5–10 working days. Advisory retainers: monthly. Strategy reviews: 2–4 weeks. Full discovery and timeline come out of the intro call, not before.',
  },
  {
    q: 'What stack do you work with?',
    a: 'Production builds use Claude Code, Codex, Antigravity 2.0, Gemini API, Vercel, Firebase, and the Oracle Cloud blueprint. Tool choice follows the constraint, not the trend. See the lab for the working stack.',
  },
  {
    q: 'Do you take on existing systems or only greenfield?',
    a: 'Both. Most sprints integrate with an existing stack — the agentic layer slots in alongside what\'s already in production. Architecture reviews start with what you have.',
  },
  {
    q: 'What about pricing?',
    a: 'Workshop and sprint price ranges live on /build. Advisory and custom builds are scoped per engagement. Template pack is fixed-price (€149 list, early-access pricing while v1 ships).',
  },
  {
    q: 'Reply time?',
    a: 'Most replies inside 1–2 working days. Time zones: Madrid (CET/CEST). Long-form decisions or technical reviews can take a few days more.',
  },
] as const

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Frank — FrankX',
    description: 'How to reach Frank for workshops, sprints, partnerships, and advisory.',
    url: `${SITE_URL}${CANONICAL_PATH}`,
    mainEntity: {
      '@type': 'Person',
      name: 'Frank',
      email: PRIMARY_EMAIL,
      url: SITE_URL,
      jobTitle: 'AI Architect & Builder',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}${CANONICAL_PATH}` },
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

export const metadata = createMetadata({
  title: 'Contact Frank — FrankX',
  description:
    'Direct line to Frank. Workshops, implementation sprints, partnerships, and advisory. One email, intents below.',
  keywords: ['contact frankx', 'hire frank', 'ai workshop booking', 'ai sprint booking', 'frankx partnership'],
  path: CANONICAL_PATH,
})

export default function ContactPage() {
  return (
    <main id="main" className="min-h-screen bg-[#06080f] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/10 pt-28 pb-16 sm:pt-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(6,182,212,0.15),transparent_38%),radial-gradient(circle_at_82%_24%,rgba(16,185,129,0.14),transparent_36%)]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
            Contact
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08]">
            One inbox. Direct line.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] md:text-lg leading-relaxed text-slate-300/90">
            Workshops, implementation sprints, partnerships, advisory. Everything routes to{' '}
            <a href={`mailto:${PRIMARY_EMAIL}`} className="text-cyan-300 underline-offset-4 hover:underline">
              {PRIMARY_EMAIL}
            </a>
            . Pick an intent below to prefill the subject line, or just write.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PRIMARY_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              <Mail className="h-4 w-4" />
              Email Frank
            </a>
            <a
              href={MEET_AND_GROW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              <Calendar className="h-4 w-4" />
              Book a 20-min intro
            </a>
          </div>

          <p className="mt-5 text-[12px] text-slate-500">
            Most replies within 1–2 working days. Madrid time (CET/CEST).
          </p>
        </div>
      </section>

      {/* ── INTENTS ───────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
              Prefilled subjects
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              Pick the intent. Same inbox.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-400">
              Saves a second on both sides. The subject line tells Frank how to route the reply.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {intents.map((i) => (
              <li key={i.label}>
                <a
                  href={i.href}
                  className="group flex h-full flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/40 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-white">{i.label}</h3>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                  </div>
                  <p className="text-sm leading-6 text-slate-400">{i.description}</p>
                  <p className="mt-1 text-[11px] font-mono text-slate-500">
                    subject: {i.subject}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SURFACES ──────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-300/80">
              Skip the email
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              The answer might already be on the site.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-400">
              If you’re evaluating a hire, comparing tools, or learning the field — start with these.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {surfaces.map((s) => {
              const Icon = s.icon
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group flex h-full flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-300/40 hover:bg-white/[0.06]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-300/10 text-violet-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{s.name}</h3>
                  <p className="text-sm leading-6 text-slate-400">{s.body}</p>
                  <p className="mt-auto inline-flex items-center gap-1 text-[12px] font-semibold text-violet-300 transition group-hover:gap-1.5">
                    {s.href}
                    <ArrowRight className="h-3 w-3" />
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 py-20">
        <div className="mx-auto max-w-5xl px-6 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/80">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              Before you write.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-400">
              Most first emails ask one of these. Skim before you hit send.
            </p>
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

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-300" />
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
            Send the email. Frank will reply.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-slate-300/90">
            One inbox is intentional. Less routing, less noise, faster reply.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${PRIMARY_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              <Mail className="h-4 w-4" />
              {PRIMARY_EMAIL}
            </a>
            <a
              href={MEET_AND_GROW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Calendar className="h-4 w-4" />
              Book the intro instead
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
