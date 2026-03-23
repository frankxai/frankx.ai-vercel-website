import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { planInitiatives, getInitiativeBySlug, getRelatedInitiatives, planTrackConfig } from '@/lib/plan/initiatives'
import PlanInitiativePage from './PlanInitiativePage'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return planInitiatives.map((initiative) => ({
    slug: initiative.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const initiative = getInitiativeBySlug(slug)
  if (!initiative) return {}

  return {
    title: `${initiative.title} | The Plan | FrankX.AI`,
    description: initiative.tldr,
    keywords: [
      initiative.title.toLowerCase(),
      planTrackConfig[initiative.track].label.toLowerCase(),
      'build in public',
      'AI roadmap',
      'frank van den bergh',
    ],
    openGraph: {
      title: `${initiative.title} | The Plan`,
      description: initiative.tldr,
      type: 'article',
      url: `https://frankx.ai/plan/${initiative.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${initiative.title} | The Plan`,
      description: initiative.tldr,
    },
    alternates: {
      canonical: `https://frankx.ai/plan/${initiative.slug}`,
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const initiative = getInitiativeBySlug(slug)

  if (!initiative) {
    notFound()
  }

  const relatedInitiatives = getRelatedInitiatives(slug)

  // JSON-LD structured data - content from our own static initiative registry, safe for inline rendering
  const articleLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: initiative.title,
    description: initiative.tldr,
    url: `https://frankx.ai/plan/${initiative.slug}`,
    author: {
      '@type': 'Person',
      name: 'Frank van den Bergh',
      url: 'https://frankx.ai',
      jobTitle: 'AI Architect',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FrankX',
      url: 'https://frankx.ai',
    },
    dateModified: initiative.lastUpdated,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'The Plan', item: 'https://frankx.ai/plan' },
        { '@type': 'ListItem', position: 3, name: initiative.title, item: `https://frankx.ai/plan/${initiative.slug}` },
      ],
    },
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleLd }}
      />
      <PlanInitiativePage initiative={initiative} relatedInitiatives={relatedInitiatives} />
    </>
  )
}
