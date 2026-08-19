import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Bot,
  FileSearch,
  Handshake,
  Network,
  NotebookText,
} from 'lucide-react'

import JsonLd from '@/components/seo/JsonLd'
import { createMetadata, siteConfig } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Start Here',
  description:
    'Choose the right entrance into Frank Riemer\'s public agentic workspace: research, book intelligence, AI architecture, guides, partnership systems, or working notes.',
  path: '/start',
  keywords: [
    'FrankX start',
    'Frank Riemer',
    'public agentic workspace',
    'AI architecture',
    'book intelligence',
    'AI research',
    'partnership systems',
    'agentic workflows',
  ],
  image: '/images/portraits/frank-presenting-oracle-2025.jpg',
})

const startingPaths = [
  {
    eyebrow: 'Understand something deeply',
    title: 'Research',
    description:
      'Source-led investigations where evidence, synthesis, uncertainty, and Frank’s decision stay distinguishable.',
    href: '/research',
    action: 'Open the research hub',
    Icon: FileSearch,
  },
  {
    eyebrow: 'Read for usable models',
    title: 'Library',
    description:
      'Book intelligence that reconstructs ideas as systems without pretending Frank’s interpretation is the source.',
    href: '/library',
    action: 'Enter the library',
    Icon: BookOpen,
  },
  {
    eyebrow: 'Design work that holds up',
    title: 'AI Architecture',
    description:
      'Reference architectures, agent workflows, control points, evaluation boundaries, and production decisions.',
    href: '/ai-architecture',
    action: 'Review architectures',
    Icon: Network,
  },
  {
    eyebrow: 'Apply a method',
    title: 'Guides',
    description:
      'Practical field guides built from experiments, source material, and work that has already met reality.',
    href: '/guides',
    action: 'Browse the guides',
    Icon: NotebookText,
  },
  {
    eyebrow: 'Build around a real mission',
    title: 'Partnerships',
    description:
      'Focused briefs, prototypes, and operating systems designed around a person, organization, or meaningful workflow.',
    href: '/partnerships',
    action: 'See partnership work',
    Icon: Handshake,
  },
  {
    eyebrow: 'Inspect the machinery',
    title: 'Agentic Workspace',
    description:
      'See how source material moves through specialist research, adversarial review, Frank’s judgment, and publication.',
    href: '/workspace',
    action: 'Inspect the workflow',
    Icon: Bot,
  },
] as const

const startPageSchema = {
  '@id': `${siteConfig.url}/start#page`,
  name: 'Start Here',
  description:
    'A guided entrance into Frank Riemer\'s public agentic workspace and its current work.',
  url: `${siteConfig.url}/start`,
  isPartOf: {
    '@id': `${siteConfig.url}/#website`,
  },
  about: {
    '@id': `${siteConfig.url}/#frank-riemer`,
  },
}

export default function StartPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <JsonLd type="CollectionPage" data={startPageSchema} id="start-page-schema" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(16,185,129,0.11),transparent_33%),radial-gradient(circle_at_14%_0%,rgba(6,182,212,0.06),transparent_28%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid min-h-[84svh] max-w-7xl items-center gap-14 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-300/80">
              Start here
            </p>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Start with the work.
              <span className="block text-white/55">Choose the question you are carrying.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              Choose what you need to understand, design, or make. Each route opens a different
              part of the work; none asks you to begin with a tool or an offer.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="#paths"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
              >
                Choose a path
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/workspace"
                className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-white/72 underline decoration-white/25 underline-offset-8 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                See how the workspace runs
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-10 max-w-xl text-[11px] leading-5 text-white/50">
              AI Architect &amp; Creator. Independent project by Frank Riemer. Not affiliated with,
              endorsed by, or sponsored by Oracle.
            </p>
          </div>

          <aside className="relative w-full lg:justify-self-end" aria-label="Quick starting paths">
            <div className="absolute -inset-8 bg-cyan-400/[0.07] blur-[90px]" aria-hidden="true" />
            <div className="relative rounded-[2rem] border border-white/10 bg-[#0d1111] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.4)] sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/75">
                Choose by intent
              </p>
              <div className="mt-5 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {startingPaths.slice(0, 4).map(({ Icon, ...path }) => (
                  <Link
                    key={path.title}
                    href={path.href}
                    className="group grid grid-cols-[40px_1fr_auto] items-center gap-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.05] text-cyan-300">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{path.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-white/55">{path.eyebrow}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-white/45 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-200" aria-hidden="true" />
                  </Link>
                ))}
              </div>
              <p className="mt-5 text-xs leading-5 text-white/55">
                Partnership work and the full workspace method continue below.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="paths"
        className="scroll-mt-20 py-24 lg:py-32"
        aria-labelledby="paths-title"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-300/70">
              Six useful entrances
            </p>
            <h2 id="paths-title" className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Pick the result before the tool.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/65">
              The right route depends on what you need to understand, design, apply, or build—not
              which model is currently loudest.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {startingPaths.map(({ Icon, ...path }) => (
              <Link
                key={path.title}
                href={path.href}
                className="group grid gap-6 rounded-[1.5rem] border border-white/[0.1] bg-white/[0.025] p-6 transition hover:border-emerald-300/25 hover:bg-white/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:grid-cols-[48px_1fr_auto] sm:items-start"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-300/[0.055] text-emerald-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                    {path.eyebrow}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{path.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">{path.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 group-hover:text-emerald-200">
                    {path.action}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-[#0c0e0e] py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Still not sure where to enter?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65">
            Open the current work and follow what makes you curious. The site is meant to reward
            attention before it asks for commitment.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#current-work"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
            >
              Explore current work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/connect"
              className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-white/72 underline decoration-white/25 underline-offset-8 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Tell me what you’re working on
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
