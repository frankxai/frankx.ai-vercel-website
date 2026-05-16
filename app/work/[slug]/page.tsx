import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getEngagement, listEngagements } from '@/content/work'
import { SubstratePositioningStrip } from '@/components/work/SubstratePositioningStrip'
import { ShippedList } from '@/components/work/ShippedList'
import { StackBlock } from '@/components/work/StackBlock'
import { OutcomeBlock } from '@/components/work/OutcomeBlock'
import { EngagementCTA } from '@/components/work/EngagementCTA'
import { AntiPositioning } from '@/components/partnerships/AntiPositioning'
import type { Engagement } from '@/content/work/types'

const SITE_URL = 'https://frankx.ai'

export function generateStaticParams() {
  // Only public-statable engagements (status !== 'private') render as routes.
  return listEngagements()
    .filter((e) => e.status !== 'private')
    .map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const engagement = getEngagement(slug)
  if (!engagement || engagement.status === 'private') return {}

  return createMetadata({
    title: engagement.seo.title,
    description: engagement.seo.description,
    path: `/work/${engagement.slug}`,
    ...(engagement.ogImagePath ? { image: engagement.ogImagePath } : {}),
  })
}

export default async function WorkEngagementPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const engagement = getEngagement(slug)
  if (!engagement || engagement.status === 'private') notFound()

  const url = `${SITE_URL}/work/${engagement.slug}`

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Work',
          item: `${SITE_URL}/work`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: engagement.name,
          item: url,
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': url,
      name: engagement.seo.title,
      description: engagement.seo.description,
      url,
      isPartOf: { '@type': 'WebSite', name: 'FrankX', url: SITE_URL },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}#frank`,
      name: 'Frank Riemer',
      jobTitle: engagement.title,
      url: SITE_URL,
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${url}#engagement`,
      name: `FrankX × ${engagement.name}`,
      description: engagement.tagline,
      provider: { '@id': `${SITE_URL}#frank` },
      areaServed: 'EMEA',
    },
  ]

  const schemaLd = {
    '@context': 'https://schema.org',
    '@graph': graph,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />

      {/* Substrate positioning strip — only for substrate engagements */}
      {engagement.engagementType === 'substrate' &&
      engagement.substratePositioning ? (
        <SubstratePositioningStrip line={engagement.substratePositioning} />
      ) : null}

      {/* Hero */}
      <WorkHero engagement={engagement} />

      {/* Context window — one paragraph, sets up the engagement */}
      <ContextWindow context={engagement.contextWindow} />

      {/* What got built */}
      <ShippedList items={engagement.shipped} />

      {/* Stack */}
      <StackBlock stack={engagement.stack} />

      {/* Outcome */}
      <OutcomeBlock outcome={engagement.outcome} />

      {/* Anti-positioning — what this engagement is NOT (reused from /partnerships) */}
      {engagement.whatThisIsNot.length > 0 ? (
        <AntiPositioning items={engagement.whatThisIsNot} />
      ) : null}

      {/* Closing CTA */}
      <EngagementCTA engagement={engagement} />
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* Hero — peer-architect framing, matches /partnerships visual language        */
/* -------------------------------------------------------------------------- */

const STATUS_LABEL: Record<Engagement['status'], string> = {
  live: 'In motion',
  past: 'Shipped',
  private: 'Private',
}

function WorkHero({ engagement }: { engagement: Engagement }) {
  return (
    <section
      aria-labelledby="work-hero-title"
      className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.05] via-transparent to-transparent"
      />
      <div
        aria-hidden
        className="absolute top-24 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-emerald-500/[0.04] blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Eyebrow + status */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/work"
            className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 hover:text-emerald-300 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400/60 rounded"
          >
            Work
          </Link>
          <span aria-hidden className="text-white/20">
            /
          </span>
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-medium">
            {engagement.client}
          </p>
          <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            {STATUS_LABEL[engagement.status]}
          </span>
        </div>

        {/* Brand pairing — FrankX × Client, equal weight */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-lg font-semibold tracking-tight text-white">
            FrankX
          </span>
          <span className="text-white/30 text-lg" aria-hidden>
            ×
          </span>
          {engagement.clientLogoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={engagement.clientLogoUrl}
              alt={`${engagement.name} logo`}
              className="h-6 w-auto opacity-90"
              loading="eager"
            />
          ) : (
            <span className="text-lg font-semibold tracking-tight text-white/85">
              {engagement.name}
            </span>
          )}
        </div>

        {/* Role */}
        <p className="text-sm md:text-base text-emerald-300/80 font-medium mb-4">
          {engagement.title}
        </p>

        {/* Tagline */}
        <h1
          id="work-hero-title"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-5 max-w-3xl"
          style={{ fontFamily: 'var(--font-poppins, Poppins), Inter, sans-serif' }}
        >
          {engagement.tagline}
        </h1>

        {/* Sub-tagline */}
        {engagement.subTagline ? (
          <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-2xl">
            {engagement.subTagline}
          </p>
        ) : null}

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={engagement.cta.href}
            target={
              engagement.cta.href.startsWith('http') ? '_blank' : undefined
            }
            rel={
              engagement.cta.href.startsWith('http')
                ? 'noopener noreferrer'
                : undefined
            }
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
          >
            {engagement.cta.label}
            <ArrowUpRight className="w-4 h-4" aria-hidden />
          </Link>
          <Link
            href="/partnerships"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-white/20 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            View partnerships
          </Link>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Context window — one paragraph, ~150 words                                  */
/* -------------------------------------------------------------------------- */

function ContextWindow({ context }: { context: string }) {
  if (!context) return null
  return (
    <section
      aria-labelledby="context-heading"
      className="border-t border-white/5 py-20 lg:py-24"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
          Context
        </p>
        <h2 id="context-heading" className="sr-only">
          Engagement context
        </h2>
        <p className="text-base text-zinc-300 leading-relaxed">{context}</p>
      </div>
    </section>
  )
}
