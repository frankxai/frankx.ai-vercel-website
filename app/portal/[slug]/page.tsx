import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { getPortalPartner, getAllPortalSlugs } from '@/content/portal'
import { toRecommendationGroups, validateRecommendations } from '@/lib/portal/recommend'
import { PortalHero } from '@/components/portal/PortalHero'
import { ProvidesGrid } from '@/components/portal/ProvidesGrid'
import { ProjectPlanTimeline } from '@/components/portal/ProjectPlanTimeline'
import { YearPlanGrid } from '@/components/portal/YearPlanGrid'
import { RecommendationDeck } from '@/components/portal/RecommendationDeck'
import { CompoundingBand } from '@/components/portal/CompoundingBand'
import { TeamBand } from '@/components/portal/TeamBand'
import { PortalCrossLinks } from '@/components/portal/PortalCrossLinks'

const SITE_URL = 'https://frankx.ai'

export function generateStaticParams() {
  return getAllPortalSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const partner = getPortalPartner(slug)
  if (!partner) return {}

  return createMetadata({
    title: partner.seo.title,
    description: partner.seo.description,
    path: `/portal/${partner.slug}`,
    noindex: partner.noindex,
  })
}

export default async function PortalPartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const partner = getPortalPartner(slug)
  if (!partner) notFound()

  // This page is statically generated, so there's no request-time cost to
  // validating here — fail the build with a descriptive error on any dead
  // recommendation slug rather than let it reach production silently.
  const errors = validateRecommendations(partner.recommendations)
  if (errors.length > 0) {
    throw new Error(
      `Portal partner "${partner.slug}" has unresolvable recommendations:\n${errors.join('\n')}`
    )
  }
  const recommendationGroups = toRecommendationGroups(partner.recommendations)

  const url = `${SITE_URL}/portal/${partner.slug}`
  const schemaLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Partner Portal', item: `${SITE_URL}/portal` },
          { '@type': 'ListItem', position: 3, name: partner.name, item: url },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': url,
        name: partner.seo.title,
        description: partner.seo.description,
        url,
        isPartOf: { '@type': 'WebSite', name: 'FrankX', url: SITE_URL },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />

      <PortalHero partner={partner} />
      <ProvidesGrid items={partner.provides} />
      <ProjectPlanTimeline phases={partner.projectPlan} />
      <YearPlanGrid yearPlan={partner.yearPlan} />
      <RecommendationDeck groups={recommendationGroups} />
      <CompoundingBand nodes={partner.compounding} sharedUpside={partner.sharedUpside} />
      <TeamBand team={partner.team} />
      <PortalCrossLinks links={partner.crossLinks} />

      {partner.lastUpdated ? (
        <p className="mx-auto max-w-4xl px-6 pb-12 text-center text-xs text-white/30">
          Last updated{' '}
          <time dateTime={partner.lastUpdated}>
            {new Date(partner.lastUpdated + 'T00:00:00Z').toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            })}
          </time>
        </p>
      ) : null}
    </>
  )
}
