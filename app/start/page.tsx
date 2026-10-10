import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Brain,
  CircleDot,
  Hammer,
  HeartPulse,
  Users,
} from 'lucide-react'

import JsonLd from '@/components/seo/JsonLd'
import { createMetadata, siteConfig } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Start Here — Find Your Founder Constraint',
  description:
    'Start with the Founder Stack Map, then choose the route that matches your current constraint: signal, systems, strategy, the Human Layer, or field notes.',
  path: '/start',
  keywords: [
    'Founder Stack',
    'founder assessment',
    'AI systems for founders',
    'founder strategy',
  ],
})

const startingPaths = [
  {
    eyebrow: 'Diagnose',
    title: 'Founder Stack Map',
    description:
      'Ten private questions identify the current constraint across State, Signal, Systems, Scale, and Stewardship.',
    href: '/founder-stack',
    action: 'Map my stack',
    Icon: CircleDot,
  },
  {
    eyebrow: 'Protect the signal',
    title: 'Founder Signal Scan',
    description:
      'A specialist scan for the voice, judgment, and earned beliefs your AI systems should amplify rather than average away.',
    href: '/founder-signal',
    action: 'Run the signal scan',
    Icon: Brain,
  },
  {
    eyebrow: 'Install',
    title: 'The Foundry',
    description:
      'A bounded build engagement for installing your site, agent harness, business memory, and quality controls around real work.',
    href: '/foundry',
    action: 'Explore the Foundry',
    Icon: Hammer,
  },
  {
    eyebrow: 'Compound judgment',
    title: "Founder's Circle",
    description:
      'A quarterly strategic route for consequential architecture, product, and AI decisions under uncertainty.',
    href: '/founders-circle',
    action: 'Explore the Circle',
    Icon: Users,
  },
  {
    eyebrow: 'Founder statecraft',
    title: 'The Human Layer',
    description:
      'Meditation, breathwork, sound, neurotechnology, manifestation, dream practice, and related fields through four honest lenses.',
    href: '/human-layer',
    action: 'Study the Human Layer',
    Icon: HeartPulse,
  },
  {
    eyebrow: 'Stay in the loop',
    title: 'Founder Field Notes',
    description:
      'Join the Signal Loop for founder field notes and explore the wider newsletter hub for specialist editorial lanes.',
    href: '/newsletter',
    action: 'Choose my streams',
    Icon: BookOpen,
  },
] as const

const itemListSchema = {
  '@type': 'ItemList',
  '@id': `${siteConfig.url}/start#founder-routes`,
  name: 'FrankX founder starting paths',
  itemListElement: startingPaths.map((path, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: path.title,
    url: `${siteConfig.url}${path.href}`,
  })),
}

export default function StartPage() {
  return (
    <main tabIndex={-1} className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_5%,rgba(16,185,129,0.12),transparent_34%),radial-gradient(circle_at_14%_10%,rgba(6,182,212,0.06),transparent_30%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid min-h-[78svh] max-w-7xl items-center gap-12 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:px-10">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-300/80">
              Start with the constraint
            </p>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.96] tracking-[-0.048em] sm:text-6xl lg:text-7xl">
              One founder.
              <span className="block font-serif font-normal italic text-emerald-100/78">
                Five operating layers.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
              Entrepreneur, solopreneur, coach, and creator-led operator are
              contexts. If you carry the risk and make the consequential
              decisions, founder is the word used here.
            </p>
            <Link
              href="/founder-stack"
              className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
            >
              Map my Founder Stack
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <aside
            className="rounded-[2rem] border border-white/10 bg-[#0d1111] p-6 shadow-[0_36px_120px_rgba(0,0,0,0.42)] sm:p-8"
            aria-label="Founder route summary"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/75">
              Choose by intent
            </p>
            <div className="mt-5 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {startingPaths.slice(0, 4).map(({ Icon, ...path }) => (
                <Link
                  key={path.title}
                  href={path.href}
                  className="group grid min-h-16 grid-cols-[40px_1fr_auto] items-center gap-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-cyan-200">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {path.title}
                    </span>
                    <span className="mt-1 block text-xs text-white/52">
                      {path.eyebrow}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="py-20 lg:py-24" aria-labelledby="routes-title">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/52">
              Founder routes
            </p>
            <h2
              id="routes-title"
              className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
            >
              Choose the next useful move.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/64">
              The map is the default. Direct routes remain open when you already
              know what kind of help you need.
            </p>
          </div>
          <div className="mt-14 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {startingPaths.map(({ Icon, ...path }) => (
              <article
                key={path.title}
                className="grid gap-5 py-7 sm:grid-cols-[48px_1fr_auto] sm:items-start"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.05] text-emerald-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/52">
                    {path.eyebrow}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {path.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/64">
                    {path.description}
                  </p>
                </div>
                <Link
                  href={path.href}
                  className="inline-flex min-h-11 items-center gap-2 self-center text-sm font-medium text-emerald-300 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  {path.action}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <JsonLd type="ItemList" data={itemListSchema} />
    </main>
  )
}
