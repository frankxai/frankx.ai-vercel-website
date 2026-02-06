import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { researchDomains, getDomainBySlug, getRelatedDomains } from '@/lib/research/domains'
import ResearchDomainPage from './ResearchDomainPage'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return researchDomains.map((domain) => ({
    slug: domain.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const domain = getDomainBySlug(slug)
  if (!domain) return {}

  return {
    title: `${domain.title} | Research Hub | FrankX.AI`,
    description: domain.tldr,
    keywords: [
      domain.title.toLowerCase(),
      ...domain.highlights.map(h => h.label.toLowerCase()),
      'AI research',
      'frank van den bergh',
    ],
    openGraph: {
      title: `${domain.title} | FrankX Research`,
      description: domain.description,
      type: 'article',
      url: `https://frankx.ai/research/${domain.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain.title} | FrankX Research`,
      description: domain.tldr,
    },
    alternates: {
      canonical: `https://frankx.ai/research/${domain.slug}`,
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const domain = getDomainBySlug(slug)

  if (!domain) {
    notFound()
  }

  const relatedDomains = getRelatedDomains(slug)

  // JSON-LD structured data - safe because data is from our own static domain registry
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: domain.title,
    description: domain.tldr,
    author: {
      '@type': 'Person',
      name: 'Frank van den Bergh',
      url: 'https://frankx.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FrankX',
      url: 'https://frankx.ai',
    },
    dateModified: domain.lastUpdated,
    mainEntityOfPage: `https://frankx.ai/research/${domain.slug}`,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <ResearchDomainPage domain={domain} relatedDomains={relatedDomains} />
    </>
  )
}
