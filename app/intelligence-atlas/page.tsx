import Link from 'next/link'
import Script from 'next/script'
import clsx from 'clsx'
import { ArrowRight, BookOpenCheck, CalendarCheck, Sparkles } from 'lucide-react'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { gradientPresets, glassCardClasses } from '@/lib/design/gradients'
import { createMetadata } from '@/lib/seo'
import { atlasMetrics, atlasVolumes } from '@/lib/intelligence-atlas'

const statusStyles: Record<string, string> = {
  Published: 'text-emerald-300 bg-emerald-500/10 border-emerald-400/40',
  'In Draft': 'text-sky-300 bg-sky-500/10 border-sky-400/40',
  'Research Sprint': 'text-purple-300 bg-purple-500/10 border-purple-400/40',
  Planned: 'text-white/70 bg-white/5 border-white/15',
}

const atlasJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWorkSeries',
  name: 'FrankX Intelligence Atlas',
  description:
    'A ten-volume research series documenting frontier AI adoption, agentic systems, governance frameworks, and FrankX field playbooks.',
  url: 'https://frankx.ai/intelligence-atlas',
  inLanguage: 'en-US',
  isAccessibleForFree: true,
  startDate: '2025-01-21',
  creator: {
    '@type': 'Organization',
    name: 'FrankX',
  },
  workExample: atlasVolumes
    .filter((volume) => Boolean(volume.href))
    .map((volume) => ({
      '@type': 'Article',
      name: volume.title,
      url: `https://frankx.ai${volume.href}`,
      position: volume.number,
      ...(volume.number === 1 ? { wordCount: 10009, datePublished: '2025-01-21' } : {}),
    })),
  hasPart: atlasVolumes.map((volume) => ({
    '@type': volume.href ? 'Article' : 'CreativeWork',
    name: volume.title,
    position: volume.number,
    creativeWorkStatus: volume.status,
    ...(volume.href ? { url: `https://frankx.ai${volume.href}` } : {}),
  })),
}

export const metadata = createMetadata({
  title: 'FrankX Intelligence Atlas — Multi-Volume AI Strategy Report',
  description:
    'Track the ten-volume FrankX Intelligence Atlas. Access Volume I today and follow the publication roadmap across agentic AI, creators, and enterprise systems.',
  path: '/intelligence-atlas',
  keywords: [
    'frankx intelligence atlas',
    'agentic ai strategy report',
    'creative intelligence research',
    'generative ai state of the art',
  ],
})

export default function IntelligenceAtlasPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Script
        id="atlas-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(atlasJsonLd) }}
      />
      <Navigation />

      <main className="pt-28 pb-24">
        <section className="relative overflow-hidden px-6 pb-24">
          <div className="absolute inset-0">
            <div className={clsx('absolute inset-0', gradientPresets.heroBase)} />
            <div className={clsx('absolute inset-0 opacity-60 blur-3xl', gradientPresets.heroAurora)} />
            <div className="absolute inset-x-0 -bottom-40 h-96 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_60%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl space-y-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                  <Sparkles className="h-4 w-4" />
                  FrankX Intelligence Atlas
                </span>
                <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                  A multi-volume report mapping the intelligence era for creators, builders, and families.
                </h1>
                <p className="max-w-3xl text-lg text-white/80 leading-relaxed">
                  The FrankX Intelligence Atlas is a ten-volume body of work designed to reach 100,000 words of living research. Each volume distills the latest frontier model breakthroughs, open-source momentum, adoption numbers, and on-the-ground experiments we run with the FrankX collective. Volume I is available now, with nine companion volumes scheduled across 2025.
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-white/60">
                  <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">Multi-volume</span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">Field Research</span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">Creator Operating Systems</span>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/blog/frankx-intelligence-atlas-volume-1"
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 via-primary-600 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(56,189,248,0.35)] transition hover:-translate-y-0.5"
                  >
                    Read Volume I
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="#roadmap"
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                  >
                    View publication roadmap
                  </Link>
                </div>
              </div>

              <div className={clsx(glassCardClasses, 'max-w-sm space-y-6 p-6 backdrop-blur')} aria-label="Atlas milestone summary">
                <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Atlas Milestones</div>
                <ul className="space-y-4 text-sm text-white/75">
                  <li className="flex items-start gap-3">
                    <CalendarCheck className="mt-0.5 h-4 w-4 text-primary-300" />
                    <span>Volume I published January 2025 with 10,000 words of strategy, adoption metrics, and builder playbooks.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <BookOpenCheck className="mt-0.5 h-4 w-4 text-primary-300" />
                    <span>Volumes II–X mapped with dedicated research sprints, interviews, and case studies scheduled monthly.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 h-4 w-4 text-primary-300" />
                    <span>Atlas integrates live data from open-source repos, top AI labs, and FrankX product telemetry.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {atlasMetrics.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 backdrop-blur"
                >
                  <div className="text-3xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-2 text-sm uppercase tracking-[0.3em] text-white/60">{stat.label}</div>
                  <p className="mt-3 text-sm leading-relaxed">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="px-6">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-3xl font-semibold text-white">Volume release roadmap</h2>
              <p className="text-white/70">
                Track progress across the ten-part atlas. Each volume ships with 10,000 words of research, operator interviews, and actionable frameworks crafted for creators, families, and executives building with FrankX.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {atlasVolumes.map((volume) => (
                <article
                  key={volume.number}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" aria-hidden />
                  <div className="relative space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                        Volume {volume.number}
                      </span>
                      <span className={clsx('inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold', statusStyles[volume.status])}>
                        {volume.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{volume.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{volume.summary}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-white/60">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{volume.release}</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{volume.wordCount}</span>
                    </div>
                    {volume.href ? (
                      <Link
                        href={volume.href}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        Read volume
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <div className="text-sm text-white/60">
                        Publication scheduled — contribute research notes at <a className="underline decoration-dotted" href="mailto:hello@frankx.ai?subject=FrankX%20Intelligence%20Atlas">hello@frankx.ai</a>.
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-white">How the atlas integrates into FrankX systems</h2>
              <p className="text-white/70">
                Every chapter feeds product decisions, content cadences, and client delivery. Volume I already informs the Agentic Creator OS roadmap, Vibe OS sound design rituals, and our enterprise governance playbooks. Upcoming volumes will plug directly into launch calendars, onboarding sequences, and the open community knowledge base.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className={clsx(glassCardClasses, 'p-6 space-y-3 backdrop-blur')}>
                <h3 className="text-lg font-semibold text-white">Signal in → Drops out</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Research inputs include the State of AI Report, lab releases from OpenAI, Anthropic, Google DeepMind, Meta, xAI, and open-source repos on Hugging Face and GitHub. Outputs include investor briefings, creative studio rituals, and policy playbooks that go live across the FrankX hub.
                </p>
              </div>
              <div className={clsx(glassCardClasses, 'p-6 space-y-3 backdrop-blur')}>
                <h3 className="text-lg font-semibold text-white">Living knowledge architecture</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Each volume references telemetry from FrankX products, community sessions, and advisory work. As new findings emerge, volumes receive version updates with changelogs so the atlas always mirrors the state of the field.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
            <h2 className="text-3xl font-semibold text-white">Stay synced with new atlas drops</h2>
            <p className="text-sm text-white/70">
              Join the FrankX intelligence bulletin to receive publication alerts, behind-the-scenes research notes, and invitations to agentic build sessions as each volume ships.
            </p>
            <form action="/api/newsletter" method="POST" className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-primary-500 via-primary-600 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(56,189,248,0.35)] transition-transform hover:-translate-y-0.5"
              >
                Join the bulletin
              </button>
            </form>
            <p className="text-xs text-white/60">We send high-signal updates only. Opt out anytime.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
