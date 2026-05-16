import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { getPartner, listPartners } from '@/content/partnerships'
import { PartnershipHero } from '@/components/partnerships/PartnershipHero'
import { PartnerContextWindow } from '@/components/partnerships/PartnerContextWindow'
import { WorkingReality } from '@/components/partnerships/WorkingReality'
import { ProofPoints } from '@/components/partnerships/ProofPoints'
import { ProposalDivider } from '@/components/partnerships/ProposalDivider'
import { AsymmetricValueGrid } from '@/components/partnerships/AsymmetricValueGrid'
import { ProgramStack } from '@/components/partnerships/ProgramStack'
import { CompoundingTimeline } from '@/components/partnerships/CompoundingTimeline'
import { CrossLinkTour } from '@/components/partnerships/CrossLinkTour'
import { AntiPositioning } from '@/components/partnerships/AntiPositioning'
import { PartnerCTA } from '@/components/partnerships/PartnerCTA'
import { PlaceholderState } from '@/components/partnerships/PlaceholderState'
import { AlreadySharedSection } from '@/components/partnerships/AlreadySharedSection'
import { FormalizeBand } from '@/components/partnerships/FormalizeBand'

const SITE_URL = 'https://frankx.ai'

export function generateStaticParams() {
  return listPartners().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const partner = getPartner(slug)
  if (!partner) return {}

  // Partner-specific OG when available; otherwise fall through to the
  // site default in createMetadata (currently /hero-homepage.png).
  // Default partner-specific OG images live under /images/partnerships/.
  return createMetadata({
    title: partner.seo.title,
    description: partner.seo.description,
    path: `/partnerships/${partner.slug}`,
    ...(partner.ogImagePath ? { image: partner.ogImagePath } : {}),
  })
}

export default async function PartnershipPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const partner = getPartner(slug)
  if (!partner) notFound()

  const isProposalTier =
    partner.status === 'active' || partner.status === 'strategic-alignment'
  const isActiveConversation = partner.status === 'active'
  const url = `${SITE_URL}/partnerships/${partner.slug}`

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Partnerships',
          item: `${SITE_URL}/partnerships`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: partner.name,
          item: url,
        },
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
    {
      '@type': 'Person',
      '@id': `${SITE_URL}#frank`,
      name: 'Frank Riemer',
      jobTitle: partner.title,
      url: SITE_URL,
    },
  ]

  if (isProposalTier) {
    graph.push({
      '@type': 'ProfessionalService',
      '@id': `${url}#practice`,
      name: `FrankX × ${partner.name} — AI CoE practice`,
      description: partner.tagline,
      provider: { '@id': `${SITE_URL}#frank` },
      areaServed: 'EMEA',
      makesOffer: partner.programs.map((program) => ({
        '@type': 'Offer',
        name: program.name,
        category: program.cadence,
        description: program.whatItIs,
      })),
    })
  }

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

      {/* Hero — always renders */}
      <PartnershipHero
        partner={partner}
        secondaryCta={
          isProposalTier
            ? { label: 'View the methodology', href: '/ai-coe' }
            : undefined
        }
      />

      {/* Tier 1 — working reality (renders for active + placeholder) */}
      {partner.contextWindow ? (
        <PartnerContextWindow context={partner.contextWindow} />
      ) : null}

      {partner.workingReality.length > 0 ? (
        <WorkingReality blocks={partner.workingReality} />
      ) : null}

      {partner.proofPoints.length > 0 ? (
        <ProofPoints points={partner.proofPoints} />
      ) : null}

      {/* Tier 2 — labeled proposal (only for active partners) */}
      {isProposalTier ? (
        <>
          <ProposalDivider
            variant={isActiveConversation ? 'active' : 'strategic-alignment'}
          />

          {partner.visualSummaryUrl ? (
            <section
              aria-labelledby="visual-summary-heading"
              className="max-w-6xl mx-auto px-6 lg:px-8 pb-8"
            >
              <h2 id="visual-summary-heading" className="sr-only">
                Partnership shape at a glance
              </h2>
              <figure className="rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.01]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.visualSummaryUrl}
                  alt={partner.visualSummaryAlt ?? `${partner.name} partnership at a glance`}
                  className="w-full h-auto block"
                  loading="eager"
                />
              </figure>
            </section>
          ) : null}

          {partner.proposalIntro ? (
            <section className="max-w-3xl mx-auto px-6 lg:px-8 pb-12">
              <p className="text-base text-zinc-300 leading-relaxed">
                {partner.proposalIntro}
              </p>
            </section>
          ) : null}

          {partner.alreadyShared && partner.alreadyShared.length > 0 ? (
            <AlreadySharedSection items={partner.alreadyShared} />
          ) : null}

          {partner.asymmetricValue.length > 0 ? (
            <AsymmetricValueGrid blocks={partner.asymmetricValue} />
          ) : null}

          {partner.programs.length > 0 ? (
            <ProgramStack programs={partner.programs} />
          ) : null}

          {partner.compoundingModel.length > 0 ? (
            <CompoundingTimeline nodes={partner.compoundingModel} />
          ) : null}

          {partner.crossLinks.length > 0 ? (
            <CrossLinkTour links={partner.crossLinks} />
          ) : null}

          {partner.whatThisIsNot.length > 0 ? (
            <AntiPositioning items={partner.whatThisIsNot} />
          ) : null}

          {partner.formalizationAsk ? (
            <FormalizeBand text={partner.formalizationAsk} />
          ) : null}

          <PartnerCTA partner={partner} />
        </>
      ) : (
        <PlaceholderState partner={partner} />
      )}
    </>
  )
}
