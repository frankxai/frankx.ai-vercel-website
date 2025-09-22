import clsx from 'clsx'
import Link from 'next/link'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { gradientPresets, glassCardClasses } from '@/lib/design/gradients'
import { createMetadata } from '@/lib/seo'
import roadmapData from '@/data/specs-roadmap.json'

const { vision, pillars, milestones, rituals, signals, nextActions } = roadmapData as {
  vision: string
  pillars: Array<{ title: string; description: string; source: string }>
  milestones: Array<{ quarter: string; focus: string; deliverables: string[] }>
  rituals: Array<{ name: string; cadence: string; owner: string; description: string; source: string }>
  signals: Array<{ name: string; metric: string; target: string; source: string }>
  nextActions: Array<{ title: string; status: string; note: string }>
}

const statusBadges: Record<string, string> = {
  blocked: 'bg-red-500/10 border-red-400/50 text-red-200',
  'in-progress': 'bg-amber-500/10 border-amber-400/50 text-amber-200',
  shipping: 'bg-emerald-500/10 border-emerald-400/50 text-emerald-200',
}

const toHref = (path: string) => (path.startsWith('/') ? path : '/' + path)

export const metadata = createMetadata({
  title: 'FrankX Roadmap & Specs Hub',
  description:
    'Track the FrankX.ai roadmap, core specifications, delivery rituals, and success metrics powering the Intelligence Atlas and creative operating systems.',
  path: '/roadmap',
  keywords: [
    'frankx roadmap',
    'agentic ai roadmap',
    'creative ai strategy specs',
    'frankx delivery rituals',
  ],
})

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="pt-28 pb-24">
        <section className="relative overflow-hidden px-6 pb-24">
          <div className="absolute inset-0">
            <div className={clsx('absolute inset-0', gradientPresets.heroBase)} />
            <div className={clsx('absolute inset-0 opacity-60 blur-3xl', gradientPresets.heroAurora)} />
            <div className="absolute inset-x-0 -bottom-44 h-96 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_60%)]" />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl space-y-10">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                FrankX Roadmap
              </span>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                Specs, rituals, and milestones that power the FrankX Intelligence Atlas.
              </h1>
              <p className="max-w-3xl text-lg text-white/80 leading-relaxed">
                This hub distills our operating commitments into one living roadmap. Review the pillars guiding product and content drops, align with quarterly milestones, and plug into the rituals that keep the FrankX collective shipping with integrity.
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-white/60">
                <Link
                  href="/intelligence-atlas"
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 transition hover:bg-white/10"
                >
                  Intelligence Atlas
                </Link>
                <Link
                  href="/products/vibe-os"
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 transition hover:bg-white/10"
                >
                  Vibe OS
                </Link>
                <Link
                  href="/docs/DAILY_INTELLIGENCE_OPERATIONS.md"
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 transition hover:bg-white/10"
                >
                  Daily Operations
                </Link>
              </div>
            </div>

            <div className={clsx(glassCardClasses, 'space-y-6 p-8 backdrop-blur')}>
              <h2 className="text-2xl font-semibold text-white">Roadmap north star</h2>
              <p className="text-sm text-white/70 leading-relaxed">{vision}</p>
            </div>
          </div>
        </section>

        <section className="px-6 pt-10">
          <div className="mx-auto max-w-6xl space-y-10">
            <header className="space-y-3">
              <h2 className="text-3xl font-semibold text-white">Pillars we uphold</h2>
              <p className="text-sm text-white/70">
                Each pillar maps back to our published specs. Use the quick links to dive into the full documentation.
              </p>
            </header>
            <div className="grid gap-6 md:grid-cols-2">
              {pillars.map((pillar) => (
                <article key={pillar.title} className={clsx(glassCardClasses, 'p-6 space-y-4 backdrop-blur')}>
                  <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{pillar.description}</p>
                  <Link
                    href={toHref(pillar.source)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-200 underline-offset-4 hover:text-primary-100 hover:underline"
                  >
                    Review spec source
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-6xl space-y-10">
            <header className="space-y-3">
              <h2 className="text-3xl font-semibold text-white">Quarterly milestones</h2>
              <p className="text-sm text-white/70">
                Align your experiments and deliverables with our macro focus each quarter.
              </p>
            </header>
            <div className="space-y-6">
              {milestones.map((milestone) => (
                <article key={milestone.quarter} className="rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h3 className="text-2xl font-semibold text-white">{milestone.quarter}</h3>
                    <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                      Focus
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-white/75 leading-relaxed">{milestone.focus}</p>
                  <ul className="mt-6 space-y-3 text-sm text-white/75">
                    {milestone.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-primary-300" aria-hidden />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-6xl space-y-8">
            <header className="space-y-3">
              <h2 className="text-3xl font-semibold text-white">Delivery rituals</h2>
              <p className="text-sm text-white/70">
                Rituals keep the roadmap living. Plug into the cadence that matches your role.
              </p>
            </header>
            <div className="grid gap-6 md:grid-cols-3">
              {rituals.map((ritual) => (
                <article key={ritual.name} className={clsx(glassCardClasses, 'p-6 space-y-3 backdrop-blur')}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{ritual.name}</h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/60">
                      {ritual.cadence}
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">Owner: {ritual.owner}</p>
                  <p className="text-sm text-white/70 leading-relaxed">{ritual.description}</p>
                  <Link
                    href={toHref(ritual.source)}
                    className="text-xs font-semibold text-primary-200 underline-offset-4 hover:text-primary-100 hover:underline"
                  >
                    View ritual playbook
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-6xl space-y-8">
            <header className="space-y-3">
              <h2 className="text-3xl font-semibold text-white">Signals that matter</h2>
              <p className="text-sm text-white/70">
                We ship against observable metrics so the roadmap stays accountable to outcomes, not hype.
              </p>
            </header>
            <div className="grid gap-6 md:grid-cols-3">
              {signals.map((signal) => (
                <article key={signal.name} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <h3 className="text-lg font-semibold text-white">{signal.name}</h3>
                  <p className="mt-3 text-sm text-white/70"><span className="font-semibold text-white/80">Metric:</span> {signal.metric}</p>
                  <p className="mt-2 text-sm text-white/70"><span className="font-semibold text-white/80">Target:</span> {signal.target}</p>
                  <Link
                    href={toHref(signal.source)}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary-200 underline-offset-4 hover:text-primary-100 hover:underline"
                  >
                    Validate source
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-6xl space-y-8">
            <header className="space-y-3">
              <h2 className="text-3xl font-semibold text-white">Next actions</h2>
              <p className="text-sm text-white/70">
                These are the priority moves we track when you ask for a specs and roadmap check.
              </p>
            </header>
            <div className="grid gap-6 md:grid-cols-3">
              {nextActions.map((action) => (
                <article key={action.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{action.title}</h3>
                    <span className={clsx(
                      'rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em]',
                      statusBadges[action.status] ?? 'border-white/15 text-white/70'
                    )}>
                      {action.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">{action.note}</p>
                </article>
              ))}
            </div>
            <div className="rounded-3xl border border-primary-400/40 bg-primary-500/10 p-6 text-sm text-white/80">
              <p>
                Need a deeper dive? Run <code className="rounded bg-white/10 px-2 py-1 text-xs">npm run roadmap:check</code> in the workspace to generate the latest CLI snapshot of pillars, milestones, and open actions.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
