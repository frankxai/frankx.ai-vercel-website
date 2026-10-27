import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllWorkshopSlugs, getWorkshopBySlug } from '@/data/workshops'
import { siteConfig } from '@/lib/seo'
import WorkshopClient from './WorkshopClient'

const SITE_URL = siteConfig.url

type Params = { slug: string }

// Pre-render every workshop at build time so metadata + schema are static.
export function generateStaticParams(): Params[] {
  return getAllWorkshopSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params
  const workshop = getWorkshopBySlug(slug)
  if (!workshop) {
    return {
      title: 'Workshop not found · FrankX',
      robots: { index: false },
    }
  }

  const url = `${SITE_URL}/workshops/${workshop.slug}`
  const title = `${workshop.title} · FrankX Workshop Studio`
  const provenanceLead = {
    'delivered-personal': 'Personally developed and delivered workshop.',
    'delivered-studio-assisted': 'Delivered workshop with a studio-assisted architecture.',
    'studio-draft': 'Studio architecture to tailor and pilot.',
  }[workshop.provenance]
  const description = `${provenanceLead} ${workshop.subtitle || workshop.overview.slice(0, 120)}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.shortName,
      type: 'article',
      images: [
        {
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(workshop.title)}&subtitle=${encodeURIComponent(workshop.subtitle)}`,
          width: 1200,
          height: 630,
          alt: workshop.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: siteConfig.twitter,
    },
    keywords: [
      'workshop',
      workshop.audience,
      workshop.difficulty,
      'AI Architect',
      'Frank Riemer',
      ...(workshop.title.split(' ').filter((w) => w.length > 3)),
    ],
  }
}

function BreadcrumbJsonLd({ workshop }: { workshop: NonNullable<ReturnType<typeof getWorkshopBySlug>> }) {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Workshops', item: `${SITE_URL}/workshops` },
      { '@type': 'ListItem', position: 3, name: workshop.title, item: `${SITE_URL}/workshops/${workshop.slug}` },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
    />
  )
}

export default async function WorkshopDetailPage(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params
  const workshop = getWorkshopBySlug(slug)

  if (!workshop) {
    notFound()
  }

  return (
    <>
      <BreadcrumbJsonLd workshop={workshop} />
      <WorkshopClient workshop={workshop} />
    </>
  )
}
