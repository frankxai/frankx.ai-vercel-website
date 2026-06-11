import type { Metadata } from 'next'
import Link from 'next/link'
import { GlowCard } from '@/components/ui/glow-card'
import { FoundryApplicationForm } from '@/components/foundry/FoundryApplicationForm'
import { FOUNDRY_FAQS } from '@/lib/foundry-faqs'

export const metadata: Metadata = {
  title: 'FrankX Foundry — Operating Systems for Businesses We Believe In',
  description:
    'The Foundry installs complete AI operating systems into businesses: website, agent harness, quality gates, compounding memory. Evaluated applications only. Priority for sustainable, healthcare, and meaningful products.',
  alternates: { canonical: 'https://frankx.ai/foundry' },
  openGraph: {
    title: 'FrankX Foundry',
    description:
      'Complete AI operating systems, installed into businesses we believe in. Application-only.',
    url: 'https://frankx.ai/foundry',
  },
}

// ── The Agentic OS family — every box links to a real public repo ──
const osFamily = [
  {
    name: 'agentic-creator-os',
    audience: 'For creators',
    status: 'live' as const,
    href: 'https://github.com/frankxai/agentic-creator-os',
    note: 'The original — content engine, music, publishing pipelines.',
  },
  {
    name: 'agentic-business-os',
    audience: 'For businesses',
    status: 'live' as const,
    href: 'https://github.com/frankxai/agentic-business-os',
    note: 'Site + harness + claims gate + business memory. What the Foundry installs.',
  },
  {
    name: 'agentic-family-os',
    audience: 'For families',
    status: 'in development' as const,
    note: 'Heritage, memory, and family knowledge systems.',
  },
  {
    name: 'agentic-health-os',
    audience: 'For health',
    status: 'in development' as const,
    note: 'Training, nutrition, and recovery operating loops.',
  },
  {
    name: 'agentic-investor-os',
    audience: 'For wealth',
    status: 'in development' as const,
    note: 'Portfolio intelligence and decision memory.',
  },
]

// ── What gets installed — the five contract files, explained ──
const contracts = [
  {
    file: 'CLAUDE.md',
    name: 'The doctrine',
    body: 'The company handbook, read automatically by every AI session. Identity, rules, gates. Edit it, and every future session changes behavior.',
  },
  {
    file: 'design.md + taste.md',
    name: 'The design contract',
    body: 'Every visual value the site may use, plus the judgment tokens cannot capture. Your brand stops drifting the day these exist.',
  },
  {
    file: '@claims-guard',
    name: 'The gate',
    body: 'A zero-tolerance pre-publish audit for regulated claim language, uncited assertions, and AI-tone. A FAIL blocks publish until a human rewrites.',
  },
  {
    file: 'docs/intelligence/',
    name: 'The memory',
    body: 'Decision records, market notes, weekly reviews. Sessions check it first and update it after — week 30 is smarter than week 1.',
  },
  {
    file: 'The weekly rhythm',
    name: 'The operation',
    body: 'Monday plan, ten minutes. Friday review, fifteen. Sized for founders with day jobs; everything else is production.',
  },
]

// ── Evaluation criteria — published, not implied ──
const criteria = [
  {
    title: 'Meaningful product',
    body: 'Priority goes to sustainable, healthcare, and genuinely useful businesses. We install systems into things we want to exist.',
  },
  {
    title: 'A founder who will operate it',
    body: 'The system compounds through the weekly rhythm. If nobody runs the Friday review, the install is shelf-ware — we decline rather than ship that.',
  },
  {
    title: 'Honest category',
    body: 'If your market rewards overstatement, our claims gate will frustrate you. We take businesses that win by being right, not loud.',
  },
]

const steps = [
  {
    n: '01',
    title: 'Apply',
    body: 'Six questions. Frank reads every application personally — no form-letter pipeline.',
  },
  {
    n: '02',
    title: 'Evaluate',
    body: 'Fit call if the application lands: the business, the stage, the regulated territory, the operating capacity. Pricing follows this conversation.',
  },
  {
    n: '03',
    title: 'Forge',
    body: 'The install: brand derivation interview, design contract, voice file, doctrine, gates, site — build-verified and deploy-ready.',
  },
  {
    n: '04',
    title: 'Stay connected',
    body: 'Your repo is registered downstream. Harness improvements arrive as readable pull requests. Nothing auto-merges; your brand files are never touched.',
  },
]

export default function FoundryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
          { '@type': 'ListItem', position: 2, name: 'Foundry', item: 'https://frankx.ai/foundry' },
        ],
      },
      {
        '@type': 'Service',
        name: 'FrankX Foundry',
        url: 'https://frankx.ai/foundry',
        provider: { '@type': 'Person', name: 'Frank', url: 'https://frankx.ai' },
        description:
          'Evaluated installs of the Agentic Business OS: website, AI-agent harness, quality gates, and compounding business memory.',
        areaServed: 'Worldwide',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FOUNDRY_FAQS.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white/80">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-28 lg:pt-36">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
          FrankX Foundry
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
          We install operating systems into businesses we believe in.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/60">
          A website, an AI-agent harness, pre-publish quality gates, and a business memory that
          compounds — the same architecture that runs frankx.ai, derived for your brand and owned
          by you. Installed in days, operated in thirty minutes a week, connected for the long run.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="#apply"
            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
          >
            Apply for an Install
          </Link>
          <Link
            href="/foundry/guide"
            className="px-2 py-3.5 text-sm font-semibold text-white/60 transition-colors hover:text-white"
          >
            Read the operating guide
          </Link>
        </div>
        <p className="mt-8 font-mono text-xs text-white/40">
          Founding cohort forming · limited installs per quarter · priority: sustainable, healthcare,
          meaningful
        </p>
      </section>

      {/* The architecture — three layers, all inspectable */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
            The Architecture
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Three layers. Every one of them public.
          </h2>
          <p className="mt-3 max-w-xl text-base text-white/60">
            The claim is substance, not marketing: the substrate, the operating systems, and the
            first installs are open repositories. Verify rather than trust.
          </p>

          <div className="mt-12 space-y-4">
            <GlowCard color="cyan" className="p-7">
              <p className="font-mono text-xs text-cyan-400/70">LAYER 0 — SUBSTRATE</p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                Starlight Intelligence System
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-white/60">
                The protocol layer: memory architecture, decision records, the operating-skill
                pattern. Open source at{' '}
                <a
                  href="https://github.com/frankxai/Starlight-Intelligence-System"
                  className="text-cyan-400 hover:underline"
                  rel="noopener"
                >
                  frankxai/Starlight-Intelligence-System
                </a>
                .
              </p>
            </GlowCard>

            <GlowCard color="emerald" className="p-7">
              <p className="font-mono text-xs text-emerald-400/70">LAYER 1 — THE AGENTIC OS FAMILY</p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                One architecture, specialized per domain
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {osFamily.map((os) => (
                  <div
                    key={os.name}
                    className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
                  >
                    <p className="font-mono text-[11px] text-white/80">{os.name}</p>
                    <p className="mt-1 text-xs text-white/50">{os.audience}</p>
                    <p
                      className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        os.status === 'live'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-white/5 text-white/40'
                      }`}
                    >
                      {os.status}
                    </p>
                    <p className="mt-2 text-[11px] leading-relaxed text-white/40">{os.note}</p>
                    {os.href ? (
                      <a
                        href={os.href}
                        rel="noopener"
                        className="mt-2 block text-[11px] text-emerald-400/80 hover:text-emerald-300"
                      >
                        View repo →
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </GlowCard>

            <GlowCard color="white" className="p-7">
              <p className="font-mono text-xs text-white/50">LAYER 2 — THE SERVICE</p>
              <h3 className="mt-2 text-lg font-semibold text-white">The Foundry — this page</h3>
              <p className="mt-2 max-w-2xl text-sm text-white/60">
                The human layer: evaluate, forge, stay connected. The templates are free and
                MIT-licensed; the Foundry prices the install, the brand derivation, and the
                connected relationship.
              </p>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* What gets installed */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
            What Gets Installed
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Five contracts that teach AI your business.
          </h2>
          <p className="mt-3 max-w-xl text-base text-white/60">
            Most companies use AI as a blank chatbot. An installed OS is a repository that teaches
            the AI who you are — so every session works like a trained team member.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contracts.map((c) => (
              <GlowCard key={c.file} color="emerald" className="p-6">
                <p className="font-mono text-xs text-emerald-400/70">{c.file}</p>
                <h3 className="mt-2 text-base font-semibold text-white">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{c.body}</p>
              </GlowCard>
            ))}
            <GlowCard color="white" href="/foundry/guide" className="p-6">
              <p className="font-mono text-xs text-white/50">GUIDE.md</p>
              <h3 className="mt-2 text-base font-semibold text-white">The operating guide</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Day-1 onboarding, the weekly rhythm, the gates — written for founders, no AI
                background assumed. Read it now →
              </p>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
            Proof
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            The receipts, not the pitch.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <GlowCard color="emerald" className="p-7">
              <p className="font-mono text-xs text-white/40">INSTALL №1</p>
              <h3 className="mt-2 text-base font-semibold text-white">
                A European consumer-goods launch
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Zero to a build-verified operating system in one day: site, claims gate tuned to EU
                regulated-claim territory, business memory, weekly rhythm. Now a registered
                downstream instance — it merged its first harness-sync pull request the same week.
              </p>
            </GlowCard>
            <GlowCard color="cyan" className="p-7">
              <p className="font-mono text-xs text-white/40">THE UPDATE CHANNEL</p>
              <h3 className="mt-2 text-base font-semibold text-white">Sync you can read</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Harness improvements arrive as pull requests with plain-language changelogs —
                markdown diffs readable in the GitHub UI. Nothing auto-merges. The contract is
                public:{' '}
                <a
                  href="https://github.com/frankxai/agentic-business-os/blob/main/HARNESS.md"
                  rel="noopener"
                  className="text-cyan-400 hover:underline"
                >
                  HARNESS.md
                </a>
                .
              </p>
            </GlowCard>
            <GlowCard color="white" className="p-7">
              <p className="font-mono text-xs text-white/40">THE REFERENCE</p>
              <h3 className="mt-2 text-base font-semibold text-white">frankx.ai itself</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                This site runs the same architecture in production: 500+ routes, automated
                pre-publish gates, a public agent catalog at{' '}
                <Link href="/acos/agents" className="text-white hover:underline">
                  /acos/agents
                </Link>
                , and the operating loop documented at{' '}
                <Link href="/os" className="text-white hover:underline">
                  /os
                </Link>
                .
              </p>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* How it works + evaluation */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
            The Process
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Evaluated, not transactional.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                <p className="font-mono text-xs text-emerald-400/60">{s.n}</p>
                <h3 className="mt-2 text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-xl font-semibold text-white">What we evaluate for</h3>
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {criteria.map((c) => (
                <div key={c.title} className="border-l-2 border-emerald-500/40 pl-5">
                  <p className="text-sm font-semibold text-white">{c.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application */}
      <section id="apply" className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
            Apply
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Tell us what you&apos;re building.
          </h2>
          <p className="mt-3 max-w-xl text-base text-white/60">
            Six questions, read personally. Pricing follows evaluation — the founding cohort is
            forming now.
          </p>
          <div className="mt-10">
            <FoundryApplicationForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
            FAQ
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Straight answers.
          </h2>
          <div className="mt-12 space-y-10">
            {FOUNDRY_FAQS.map((f) => (
              <div key={f.question}>
                <h3 className="text-base font-semibold text-white">{f.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{f.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 border-t border-white/5 pt-10">
            <p className="text-sm text-white/60">
              Not ready to apply? The template is open source —{' '}
              <a
                href="https://github.com/frankxai/agentic-business-os"
                rel="noopener"
                className="text-emerald-400 hover:underline"
              >
                take it, it&apos;s yours
              </a>
              . Or start with the{' '}
              <Link href="/foundry/guide" className="text-emerald-400 hover:underline">
                operating guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
