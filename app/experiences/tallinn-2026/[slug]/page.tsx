import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { TallinnOfferPage } from '@/components/tallinn-experience/TallinnOfferPage'
import { getTallinnExperience, tallinnExperiences } from '@/data/tallinn-experiences'
import { createMetadata } from '@/lib/seo'

interface TallinnOfferRouteProps {
  params: Promise<{ slug: string }>
}
export function generateStaticParams() {
  return tallinnExperiences.map((experience) => ({ slug: experience.slug }))
}

export async function generateMetadata({ params }: TallinnOfferRouteProps): Promise<Metadata> {
  const { slug } = await params
  const experience = getTallinnExperience(slug)

  if (!experience) {
    return createMetadata({
      title: 'Tallinn working session',
      description: 'Private concept preview.',
      path: `/experiences/tallinn-2026/${slug}`,
      noindex: true,
    })
  }

  return createMetadata({
    title: `${experience.title} — Tallinn working session`,
    description: experience.promise,
    path: `/experiences/tallinn-2026/${experience.slug}`,
    noindex: true,
  })
}

export default async function TallinnOfferRoute({ params }: TallinnOfferRouteProps) {
  const { slug } = await params
  const experience = getTallinnExperience(slug)
  if (!experience) notFound()

  const captureEnabled =
    process.env.VERCEL_ENV === 'production' &&
    process.env.TALLINN_CAPTURE_MODE === 'live'

  return <TallinnOfferPage experience={experience} captureEnabled={captureEnabled} />
}
