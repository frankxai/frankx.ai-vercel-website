import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'

import { PlatformShell } from '@/components/platform/platform-ui'
import { getDream100Member, getDream100Signal, publishedSignals } from '@/lib/dream100'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return publishedSignals.map((signal) => ({ slug: signal.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const signal = getDream100Signal((await params).slug)
  if (!signal) return {}
  return {
    title: signal.title,
    description: signal.dek,
    alternates: { canonical: `https://frankx.ai/signals/${signal.slug}` },
    openGraph: {
      title: signal.title,
      description: signal.dek,
      url: `https://frankx.ai/signals/${signal.slug}`,
      type: 'article',
      publishedTime: signal.publishedAt,
      modifiedTime: signal.updatedAt,
    },
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${value}T12:00:00Z`),
  )
}

export default async function SignalDetailPage({ params }: Props) {
  const signal = getDream100Signal((await params).slug)
  if (!signal) notFound()
  const member = getDream100Member(signal.subjectId)
  const currentIndex = publishedSignals.findIndex((entry) => entry.slug === signal.slug)
  const next = publishedSignals[(currentIndex + 1) % publishedSignals.length]
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'AnalysisNewsArticle',
    headline: signal.title,
    description: signal.dek,
    datePublished: signal.publishedAt,
    dateModified: signal.updatedAt,
    mainEntityOfPage: `https://frankx.ai/signals/${signal.slug}`,
    author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai/about' },
    publisher: { '@type': 'Organization', name: 'FrankX', url: 'https://frankx.ai' },
    about: member?.name,
    citation: signal.sourceUrl,
  }

  return (
    <PlatformShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article className="px-6 pb-24 pt-28 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <Link href="/signals" className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All signals
          </Link>

          <header className="mt-12 grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[170px_1fr]">
            <div className="font-mono text-xs leading-6 text-white/38">
              <p className="text-emerald-300">EVIDENCE RECORD</p>
              <p className="mt-4">{formatDate(signal.publishedAt)}</p>
              <p>{member?.name}</p>
              <p className="mt-4 uppercase">{signal.verification} source</p>
            </div>
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2">
                {signal.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/50">{tag}</span>
                ))}
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">{signal.title}</h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/60 sm:text-xl">{signal.dek}</p>
            </div>
          </header>

          <div className="grid gap-12 py-14 lg:grid-cols-[170px_minmax(0,720px)_1fr]">
            <aside className="text-xs leading-6 text-white/38">
              <p className="font-semibold uppercase tracking-[0.18em] text-white/55">Record anatomy</p>
              <nav className="mt-4 space-y-2">
                <a href="#observation" className="block hover:text-white">Observation</a>
                <a href="#evidence" className="block hover:text-white">Evidence</a>
                <a href="#architecture" className="block hover:text-white">Architecture</a>
                <a href="#creator" className="block hover:text-white">Creator translation</a>
                <a href="#contribution" className="block hover:text-white">Contribution</a>
              </nav>
            </aside>

            <div className="space-y-16">
              <section id="observation">
                <SignalHeading number="01" title="What changed" />
                <p className="mt-5 text-lg leading-8 text-white/72">{signal.observation}</p>
              </section>

              <section id="evidence">
                <SignalHeading number="02" title="What the source supports" />
                <ul className="mt-6 space-y-4">
                  {signal.evidence.map((item) => (
                    <li key={item} className="grid grid-cols-[18px_1fr] gap-3 text-base leading-7 text-white/65">
                      <span className="mt-3 h-px bg-emerald-300/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="architecture">
                <SignalHeading number="03" title="Architecture consequence" />
                <p className="mt-5 text-lg leading-8 text-white/72">{signal.architectureAngle}</p>
              </section>

              <section id="creator">
                <SignalHeading number="04" title="Creator translation" />
                <p className="mt-5 text-lg leading-8 text-white/72">{signal.creatorAngle}</p>
                <Link href={`https://gencreator.ai/showcase/${signal.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-white">
                  Open the creator specimen <ArrowRight className="h-4 w-4" />
                </Link>
              </section>

              <section id="contribution" className="rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.055] p-7 sm:p-9">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-300/70">Useful next move</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">Contribute before asking.</h2>
                <p className="mt-4 text-base leading-7 text-white/68">{signal.contribution}</p>
              </section>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Source receipt</p>
                <p className="mt-4 text-sm font-semibold text-white">{signal.sourceTitle}</p>
                <p className="mt-2 text-xs leading-5 text-white/42">{signal.sourceType} · {formatDate(signal.sourceDate)}</p>
                <a href={signal.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-white">
                  Inspect source <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <p className="mt-4 text-xs leading-5 text-white/32">
                Analysis is FrankX interpretation. Observed claims are kept separate and linked to the underlying release.
              </p>
            </aside>
          </div>

          <footer className="grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/35">Continue through the ledger</p>
              <p className="mt-2 text-lg font-semibold text-white">{next.title}</p>
            </div>
            <Link href={`/signals/${next.slug}`} className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-white hover:border-emerald-300/30">
              Next record <ArrowRight className="h-4 w-4" />
            </Link>
          </footer>
        </div>
      </article>
    </PlatformShell>
  )
}

function SignalHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-white/[0.08] pb-4">
      <span className="font-mono text-xs text-emerald-300/60">{number}</span>
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
    </div>
  )
}

