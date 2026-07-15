import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HardwareCategoryPage from '@/components/ai-hardware/HardwareCategoryPage'
import { HARDWARE_CATEGORIES, HARDWARE_CATEGORY_MAP } from '@/data/hardware-taxonomy'
import { HARDWARE_REVIEWED_AT } from '@/data/hardware-intelligence'
import { ldJson } from '@/lib/seo/jsonld'

export const dynamicParams = false

export function generateStaticParams() {
  return HARDWARE_CATEGORIES.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params
  const category = HARDWARE_CATEGORY_MAP[slug]
  if (!category) return {}
  return {
    title: `${category.title}: Selection Guide and Architecture | FrankX`,
    description: category.summary,
    alternates: { canonical: `/ai-hardware/${category.slug}` },
    openGraph: {
      title: `${category.title} | FrankX AI Hardware Intelligence`,
      description: category.summary,
      url: `https://frankx.ai/ai-hardware/${category.slug}`,
      type: 'article',
    },
  }
}

export default async function HardwareCategoryRoute({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params
  const category = HARDWARE_CATEGORY_MAP[slug]
  if (!category) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: category.title,
    description: category.summary,
    url: `https://frankx.ai/ai-hardware/${category.slug}`,
    dateModified: HARDWARE_REVIEWED_AT,
    author: { '@type': 'Person', name: 'Frank Riemer', jobTitle: 'AI Architect', url: 'https://frankx.ai/about' },
    publisher: { '@type': 'Organization', name: 'FrankX', url: 'https://frankx.ai' },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: category.faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
      { '@type': 'ListItem', position: 2, name: 'AI Hardware', item: 'https://frankx.ai/ai-hardware' },
      { '@type': 'ListItem', position: 3, name: category.shortTitle, item: `https://frankx.ai/ai-hardware/${category.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbSchema) }} />
      <HardwareCategoryPage category={category} />
    </>
  )
}
