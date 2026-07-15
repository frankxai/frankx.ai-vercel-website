import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { TallinnFormatPage } from '@/components/tallinn-experience/TallinnFormatPage'
import {
  getTallinnPublicFormat,
  TALLINN_PUBLIC_ROUTE_SLUGS,
} from '@/data/tallinn-studio'
import { createMetadata } from '@/lib/seo'

interface TallinnFormatRouteProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return TALLINN_PUBLIC_ROUTE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: TallinnFormatRouteProps): Promise<Metadata> {
  const { slug } = await params
  const format = getTallinnPublicFormat(slug)

  if (!format) {
    return createMetadata({
      title: 'Tallinn session format',
      description: 'Explore independent session and workshop formats for Tallinn 2026.',
      path: `/experiences/tallinn-2026/${slug}`,
      noindex: true,
    })
  }

  return createMetadata({
    title: `${format.title} — Tallinn Session Studio`,
    description: format.promise,
    path: `/experiences/tallinn-2026/${slug}`,
    canonical: `https://frankx.ai/experiences/tallinn-2026/${format.slug}`,
  })
}

export default async function TallinnFormatRoute({ params }: TallinnFormatRouteProps) {
  const { slug } = await params
  const format = getTallinnPublicFormat(slug)
  if (!format) notFound()

  return <TallinnFormatPage format={format} />
}
