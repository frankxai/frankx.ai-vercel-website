import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

import { PlatformHero, PlatformShell, SectionHeader } from '@/components/platform/platform-ui'
import { dream100, getDream100Member, publishedSignals } from '@/lib/dream100'

export const metadata: Metadata = {
  title: 'Signals — source-backed AI architecture notes',
  description:
    'A source-linked ledger of consequential AI work, its architecture implications, and one useful contribution.',
  alternates: { canonical: 'https://frankx.ai/signals' },
  openGraph: {
    title: 'Signals — FrankX',
    description: 'Read the work. Trace the evidence. Build the useful next move.',
    url: 'https://frankx.ai/signals',
    type: 'website',
  },
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(`${value}T12:00:00Z`),
  )
}

export default function SignalsPage() {
  const [latest, ...archive] = publishedSignals
  const latestMember = getDream100Member(latest.subjectId)
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'FrankX Signals',
    url: 'https://frankx.ai/signals',
    description: 'Source-backed AI architecture notes and useful contributions.',
    hasPart: publishedSignals.map((signal) => ({
      '@type': 'Article',
      headline: signal.title,
      url: `https://frankx.ai/signals/${signal.slug}`,
      datePublished: signal.publishedAt,
      citation: signal.sourceUrl,
    })),
  }

  return (
    <PlatformShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <PlatformHero
        eyebrow="Signals · Evidence ledger"
        title="Read the work. Trace the evidence."
        highlight="Build the useful next move."
        deck="Not a news feed and not a ranking. Each record starts at the primary source, names the architecture consequence, translates it for creators, and proposes a contribution worth making."
        primaryCta={{ label: 'Read the latest signal', href: `/signals/${latest.slug}` }}
        secondaryCta={{ label: 'Meet the Dream 100', href: '/dream-100' }}
        metrics={[
          { value: String(dream100.members.length), label: 'durable people and organizations' },
          { value: String(publishedSignals.length), label: 'source-backed records this edition' },
          { value: '0', label: 'automatic outreach or paid placement' },
        ]}
        visualTitle={`Snapshot ${dream100.snapshotId}`}
        visualItems={['Observe the work', 'Verify the source', 'Translate the consequence', 'Contribute something useful']}
      />

      <section className="border-y border-white/[0.07] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[180px_1fr]">
            <div>
              <p className="font-mono text-xs text-emerald-300">LATEST / 01</p>
              <p className="mt-3 text-xs leading-5 text-white/40">{formatDate(latest.publishedAt)}</p>
              <p className="mt-1 text-xs leading-5 text-white/40">{latestMember?.name}</p>
            </div>
            <article className="max-w-4xl">
              <div className="flex flex-wrap gap-2">
                {latest.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/50">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-5xl">{latest.title}</h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">{latest.dek}</p>
              <div className="mt-8 border-l border-emerald-300/30 pl-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300/70">Architecture consequence</p>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/67">{latest.architectureAngle}</p>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link href={`/signals/${latest.slug}`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-100">
                  Inspect the record <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={latest.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white">
                  Primary source <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="The ledger"
            title="Consequential work, one inspectable record at a time"
            deck="The date belongs to the underlying work. The source link is always visible. Analysis is separated from observed evidence."
          />
          <div className="mt-12 border-t border-white/10">
            {archive.map((signal, index) => {
              const member = getDream100Member(signal.subjectId)
              return (
                <Link
                  key={signal.slug}
                  href={`/signals/${signal.slug}`}
                  className="group grid gap-5 border-b border-white/[0.08] py-7 transition hover:bg-white/[0.025] sm:grid-cols-[80px_150px_1fr_auto] sm:items-start sm:px-3"
                >
                  <span className="font-mono text-xs text-white/28">{String(index + 2).padStart(2, '0')}</span>
                  <span>
                    <span className="block text-xs font-semibold text-white/70">{member?.name}</span>
                    <span className="mt-1 block text-[11px] text-white/35">{formatDate(signal.publishedAt)}</span>
                  </span>
                  <span>
                    <span className="block text-lg font-semibold tracking-tight text-white transition group-hover:text-emerald-200">{signal.title}</span>
                    <span className="mt-2 block max-w-2xl text-sm leading-6 text-white/48">{signal.dek}</span>
                  </span>
                  <ArrowRight className="hidden h-4 w-4 text-white/30 transition group-hover:translate-x-1 group-hover:text-emerald-300 sm:block" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-white/[0.018] px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_2fr]">
          <SectionHeader eyebrow="Editorial contract" title="Praise is not the product. Usefulness is." />
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
            {[
              ['01', 'Observe', dream100.methodology.inclusion],
              ['02', 'Verify', dream100.methodology.signals],
              ['03', 'Contribute', dream100.methodology.relationship],
              ['04', 'Correct', dream100.methodology.correction],
            ].map(([number, label, copy]) => (
              <li key={number} className="bg-[#0a0a0b] p-6">
                <span className="font-mono text-xs text-emerald-300/60">{number}</span>
                <h3 className="mt-4 text-base font-semibold text-white">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-white/48">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PlatformShell>
  )
}

