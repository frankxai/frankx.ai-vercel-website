
import { ArrowRight, BarChart4, BookOpen, CalendarCheck, Download, FileText, LinkIcon, Sparkles } from 'lucide-react'
import Link from 'next/link'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { createMetadata } from '@/lib/seo'
import { homeSpotlights, resourceCollections, updateEntries } from '@/lib/hub'

const featureCards = [
  {
    icon: CalendarCheck,
    title: 'FrankX Roadmap Hub',
    description: 'See the living specs, milestones, and rituals we maintain every time you run the roadmap check.',
    href: '/roadmap',
    label: 'Explore the hub'
  },
  {
    icon: BarChart4,
    title: 'Intelligence Atlas Vol. I',
    description: '10,000 words of adoption metrics, governance frameworks, and multi-agent blueprints that anchor the 2025 atlas.',
    href: '/blog/frankx-intelligence-atlas-volume-1',
    label: 'Read Volume I'
  },
  {
    icon: Sparkles,
    title: 'Agentic AI Roadmap 2025',
    description: 'Align your studio, enterprise, and family initiatives with the month-by-month atlas release plan.',
    href: '/blog/10-agentic-ai-roadmap-2025',
    label: 'Open the roadmap'
  }
]

const downloadCards = [
  {
    icon: FileText,
    title: 'Golden Age Modern Guide',
    description: 'Plain-language primer with rituals and a 90-day launch plan.',
    href: '/reading/GoldenAge-Modernized/article/Golden_Age_of_Intelligence_Modern_Guide.html',
    label: 'Read the guide'
  },
  {
    icon: LinkIcon,
    title: 'Template Index',
    description: 'COE scorecards, adoption canvases, and launch scripts in one archive.',
    href: '/reading/Templates/MASTER_TEMPLATE_INDEX.html',
    label: 'Browse templates'
  },
  {
    icon: Download,
    title: 'Intelligence Era One-Pager',
    description: 'Executive checklist summarising conscious AI adoption moves.',
    href: '/assets/intelligence-era-onepager.html',
    label: 'Download summary'
  }
]

const latestInsights = updateEntries.slice(0, 3)

export const metadata = createMetadata({
  title: 'FrankX Resource Library',
  description: 'Curated guides, templates, and executive assets to build conscious AI systems with confidence.',
  keywords: ['conscious ai resources', 'ai templates', 'frankx library'],
  path: '/resources',
})

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-6xl space-y-16">
          <header className="rounded-4xl border border-white/10 bg-gradient-to-br from-primary-500/15 via-slate-900 to-slate-950 p-10">
            <div className="flex flex-col gap-4">
              <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                <Sparkles className="h-4 w-4" />
                Resource Library
              </span>
              <h1 className="text-4xl font-semibold text-white md:text-5xl">Systems to accelerate your conscious AI practice.</h1>
              <p className="text-sm text-white/70 leading-relaxed max-w-3xl">
                Every artifact stems from live client work, Atlas research, and the daily intelligence ritual. Start with a spotlight below, then layer the collections, downloads, and automation to keep your stack current.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 text-sm text-white/80">
                {homeSpotlights.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 hover:bg-white/10"
                  >
                    {item.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </header>

          <section className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Featured playbooks</h2>
                <p className="text-sm text-white/70">Anchor your roadmap with the three essential guides shipping this quarter.</p>
              </div>
              <Link href="/roadmap" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-200 underline-offset-4 hover:text-primary-100 hover:underline">
                Check live roadmap
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featureCards.map((card) => (
                <article key={card.title} className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="flex items-center gap-3 text-white">
                    <card.icon className="h-5 w-5 text-primary-200" />
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">{card.description}</p>
                  <Link
                    href={card.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-200 underline-offset-4 hover:text-primary-100 hover:underline"
                  >
                    {card.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-10">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl font-semibold text-white">Libraries grouped by mission</h2>
              <p className="text-sm text-white/70">Choose the collection that matches your current momentum—each one links into operating rituals across the hub.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {resourceCollections.map((collection) => (
                <article key={collection.id} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur flex flex-col">
                  <h3 className="text-2xl font-semibold text-white">{collection.title}</h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">{collection.description}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.35em] text-white/60">Ideal for</p>
                  <p className="text-sm text-white/75 leading-relaxed">{collection.focus}</p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {collection.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/15 transition"
                        >
                          <div>
                            <p className="font-semibold text-white">{item.label}</p>
                            <p className="text-xs text-white/60">{item.type}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-white/60 group-hover:text-white" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Latest intelligence to deploy now</h2>
                <p className="text-sm text-white/70">Fresh drops wired into the Intelligence Atlas and roadmap cadence.</p>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-200 underline-offset-4 hover:text-primary-100 hover:underline">
                Visit the journal
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {latestInsights.map((entry) => (
                <article key={entry.href} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">{entry.type}</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{entry.title}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{entry.summary}</p>
                  <Link
                    href={entry.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-200 underline-offset-4 hover:text-primary-100 hover:underline"
                  >
                    Read now
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl font-semibold text-white">Essential downloads</h2>
              <p className="text-sm text-white/70">Keep these assets handy for team briefings, workshops, and offline planning.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {downloadCards.map((card) => (
                <article key={card.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="flex items-center gap-3 text-white">
                    <card.icon className="h-5 w-5 text-primary-200" />
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">{card.description}</p>
                  <Link
                    href={card.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-200 underline-offset-4 hover:text-primary-100 hover:underline"
                  >
                    {card.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <h2 className="text-xl font-semibold text-white">Daily roadmap automation</h2>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Keep every build session aligned. Run <code className="rounded bg-white/10 px-2 py-1 text-xs">npm run roadmap:check</code> before updating docs/DAILY_INTELLIGENCE_OPERATIONS.md to surface pillars, milestones, and next actions straight from the data vault.
              </p>
              <Link
                href="/docs/ROADMAP_AUTOMATION.md"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-200 underline-offset-4 hover:text-primary-100 hover:underline"
              >
                View automation playbook
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
            <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary-500/15 via-slate-900 to-slate-950 p-8 backdrop-blur">
              <h2 className="text-xl font-semibold text-white">Need a guided start?</h2>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">
                Bring your inner circle or leadership team into a focused activation. We’ll co-create your intelligence stack, publish a launch plan, and train your agents.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="mailto:hello@frankx.ai?subject=FrankX%20Intelligence%20Activation"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
                >
                  Book an intensive
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white"
                >
                  Explore products
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
