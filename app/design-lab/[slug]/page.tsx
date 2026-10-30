import { siteConfig, defaultTwitterImages, defaultOpenGraphImages } from '@/lib/seo'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { designExperiments, getExperimentBySlug, experimentCategoryConfig } from '@/lib/design-lab/experiments'
import DesignLabExperimentPage from './DesignLabExperimentPage'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return designExperiments.map((experiment) => ({
    slug: experiment.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const experiment = getExperimentBySlug(slug)
  if (!experiment) return {}

  const winner = experiment.entries.find(e => e.isWinner)
  const description = winner
    ? `${experiment.entries.length} AI agents competed. Winner: ${winner.agent} (${winner.overallScore}/10). ${experiment.subtitle}`
    : experiment.subtitle

  return {
    title: `${experiment.title} | Design Lab`,
    description,
    keywords: [
      experiment.title.toLowerCase(),
      experimentCategoryConfig[experiment.category].label.toLowerCase(),
      'AI design challenge',
      'agent comparison',
      'design benchmark',
    ],
    openGraph: {
      images: defaultOpenGraphImages,
      title: `${experiment.title} | Design Lab`,
      description,
      type: 'article',
      url: `${siteConfig.url}/design-lab/${experiment.slug}`,
    },
    twitter: {
      images: defaultTwitterImages,
      card: 'summary_large_image',
      title: `${experiment.title} | Design Lab`,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/design-lab/${experiment.slug}`,
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const experiment = getExperimentBySlug(slug)

  if (!experiment) {
    notFound()
  }

  // JSON-LD structured data - content from our own static experiment registry, safe for inline rendering
  const articleLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: experiment.title,
    description: experiment.subtitle,
    url: `${siteConfig.url}/design-lab/${experiment.slug}`,
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
    dateModified: experiment.lastUpdated,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Design Lab', item: `${siteConfig.url}/design-lab` },
        { '@type': 'ListItem', position: 3, name: experiment.title, item: `${siteConfig.url}/design-lab/${experiment.slug}` },
      ],
    },
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleLd }}
      />
      <DesignLabExperimentPage experiment={experiment} />
    </>
  )
}
