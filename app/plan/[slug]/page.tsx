import { siteConfig, defaultTwitterImages, defaultOpenGraphImages } from '@/lib/seo'
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
    title: `${initiative.title} | The Plan`,
    description: initiative.tldr,
    keywords: [
      initiative.title.toLowerCase(),
      planTrackConfig[initiative.track].label.toLowerCase(),
      'build in public',
      'AI roadmap',
      'Frank Riemer',
    ],
    openGraph: {
      images: defaultOpenGraphImages,
      title: `${initiative.title} | The Plan`,
      description: initiative.tldr,
      type: 'article',
      url: `${siteConfig.url}/plan/${initiative.slug}`,
    },
    twitter: {
      images: defaultTwitterImages,
      card: 'summary_large_image',
      title: `${initiative.title} | The Plan`,
      description: initiative.tldr,
    },
    alternates: {
      canonical: `${siteConfig.url}/plan/${initiative.slug}`,
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
    url: `${siteConfig.url}/plan/${initiative.slug}`,
    author: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: siteConfig.url,
      jobTitle: 'AI Architect',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FrankX',
      url: siteConfig.url,
    },
    dateModified: initiative.lastUpdated,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'The Plan', item: `${siteConfig.url}/plan` },
        { '@type': 'ListItem', position: 3, name: initiative.title, item: `${siteConfig.url}/plan/${initiative.slug}` },
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
