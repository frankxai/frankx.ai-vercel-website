import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { researchDomains, getDomainBySlug, getRelatedDomains } from '@/lib/research/domains'
import { getSourcesForDomain } from '@/lib/research/sources'
import { getClaimCountForDomain } from '@/lib/research/validated-claims'
import { getBlogPost } from '@/lib/blog'
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
  const domainSources = getSourcesForDomain(slug)
  const claimCount = getClaimCountForDomain(slug)

  // Resolve blog post titles for display in "Published Articles" section
  const blogPostTitles: Record<string, string> = {}
  for (const postPath of domain.relatedBlogPosts) {
    const postSlug = postPath.replace('/blog/', '')
    const post = getBlogPost(postSlug)
    if (post) {
      blogPostTitles[postPath] = post.title
    }
  }

  // Generate FAQ from keyFindings (convert statements to Q&A pairs)
  const faqItems = domain.faq && domain.faq.length > 0
    ? domain.faq
    : domain.keyFindings.slice(0, 5).map((finding) => ({
        question: `What does the research show about ${finding.split(' — ')[0].split(' at ')[0].split(' leads ')[0].toLowerCase().replace(/^'?/, '')}?`,
        answer: finding,
      }))

  // JSON-LD structured data - safe because data is from our own static domain registry
  const techArticleLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: domain.title,
    alternativeHeadline: domain.subtitle,
    description: domain.tldr,
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
    dateModified: domain.lastUpdated,
    datePublished: '2026-01-27',
    mainEntityOfPage: `https://frankx.ai/research/${domain.slug}`,
    about: domain.keyFindings.slice(0, 3).join('. '),
    keywords: [domain.title, ...domain.highlights.map(h => h.label)].join(', '),
    citation: domainSources.length > 0
      ? domainSources.map(src => ({
          '@type': 'CreativeWork',
          name: src.title,
          url: src.url,
          ...(src.date && { datePublished: src.date }),
        }))
      : `${domain.sourceCount} validated sources`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Research Hub', item: 'https://frankx.ai/research' },
        { '@type': 'ListItem', position: 3, name: domain.title, item: `https://frankx.ai/research/${domain.slug}` },
      ],
    },
  })

  const faqLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: techArticleLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqLd }}
      />
      <ResearchDomainPage domain={domain} relatedDomains={relatedDomains} claimCount={claimCount} blogPostTitles={blogPostTitles} />
    </>
  )
}
