import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Boxes,
  GitBranch,
  PenLine,
  Workflow,
} from 'lucide-react'

import JsonLd from '@/components/seo/JsonLd'
import { createMetadata, siteConfig } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Start with the work that is stuck',
  description:
    'Choose the FrankX route that matches your current state: first agent, production reliability, founder-routed operations, or a repeatable creator system.',
  path: '/start',
  keywords: [
    'FrankX start',
    'first AI agent',
    'production agent reliability',
    'founder workflow',
    'creator operating system',
  ],
})

const routes = [
  {
    state: 'First agent',
    title: 'I need a clear model before I build.',
    description:
      'Learn the six primitives and sketch one agent loop without choosing a stack first.',
    action: 'Get the free Primer',
    href: '/start-here',
    Icon: Boxes,
  },
  {
    state: 'Production',
    title: 'I have a working agent. Reliability is the problem.',
    description:
      'Check the Toolkit’s current release status for evaluation, observability, cost, and deployment patterns.',
    action: 'Check Toolkit status',
    href: '/build/six-primitives-toolkit',
    Icon: GitBranch,
  },
  {
    state: 'Operations',
    title: 'Approvals and handoffs still return to me.',
    description:
      'Name the recurring queue, its decision boundary, and the human approval that should remain.',
    action: 'Map the workflow',
    href: '/work-with-me#contact',
    Icon: Workflow,
  },
  {
    state: 'Creator system',
    title: 'I have expertise, but no repeatable publishing loop.',
    description:
      'Build one weekly path from source notes to published work, an offer, and a learning log.',
    action: 'Explore GenCreator',
    href: '/gencreator',
    Icon: PenLine,
  },
]

const siteUrl = siteConfig.url

const startPageSchema = {
  '@id': `${siteUrl}/start#page`,
  name: 'Start with the work that is stuck | FrankX',
  description:
    'A state-based router for first agents, production reliability, founder-routed operations, and repeatable creator systems.',
  url: `${siteUrl}/start`,
  isPartOf: {
    '@id': `${siteUrl}/#website`,
  },
  about: {
    '@id': `${siteUrl}/#frank-riemer`,
  },
}

export default function StartPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0b] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_18%_10%,rgba(16,185,129,0.13),transparent_35%),radial-gradient(circle_at_84%_22%,rgba(34,211,238,0.08),transparent_30%)]"
        aria-hidden="true"
      />

      <section className="relative mx-auto max-w-6xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-200">
          Choose by current state
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
          Start with the work that is stuck.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">
          Pick the sentence that is true today. Each route leads to one artifact, offer, or
          decision.
        </p>
      </section>

      <section className="relative border-y border-white/10 bg-white/[0.02] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:px-8 md:grid-cols-2">
          {routes.map(({ Icon, ...route }, index) => (
            <article
              key={route.state}
              className="group flex min-h-[330px] flex-col rounded-[1.75rem] border border-white/15 bg-[#0d0f10] p-6 sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200">
                  {route.state}
                </span>
                <span className="font-mono text-xs text-white/70">0{index + 1}</span>
              </div>
              <Icon className="mt-10 h-6 w-6 text-cyan-200" aria-hidden="true" />
              <h2 className="mt-5 max-w-lg text-2xl font-semibold leading-tight tracking-[-0.025em]">
                {route.title}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/75">
                {route.description}
              </p>
              <Link
                href={route.href}
                className="mt-auto inline-flex min-h-11 items-center gap-2 pt-8 text-sm font-semibold text-emerald-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                {route.action}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-8 rounded-[1.75rem] border border-white/15 bg-white/[0.035] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                Reading route
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">
                I’m here to study the work.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/blog"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Durable essays
              </Link>
              <Link
                href="/journal"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <PenLine className="h-4 w-4" aria-hidden="true" />
                Dated field notes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <JsonLd type="CollectionPage" data={startPageSchema} id="start-page" />
    </main>
  )
}
