import { useId } from 'react'
import Script from 'next/script'

// Extended schema types for AI-first content optimization
type JsonLdType =
  | 'Person'
  | 'Organization'
  | 'WebSite'
  | 'Article'
  | 'Product'
  | 'Book'
  | 'Review'
  | 'BreadcrumbList'
  | 'FAQPage'
  | 'HowTo'
  | 'Course'
  | 'ItemList'
  | 'VideoObject'
  | 'CollectionPage'

type JsonLdProps = {
  type: JsonLdType
  data: Record<string, unknown>
  id?: string
}

// Interfaces for AI-extractable content
export interface FAQItem {
  question: string
  answer: string
}

export interface HowToStep {
  name: string
  text: string
  url?: string
  image?: string
}

export interface HowToData {
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string
  estimatedCost?: { currency: string; value: string }
  tool?: string[]
  supply?: string[]
  image?: string
}

// Builder functions for schema data
export function buildFAQPageData(faqs: FAQItem[]) {
  return {
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildHowToData(data: HowToData) {
  const schema: Record<string, unknown> = {
    name: data.name,
    description: data.description,
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
      ...(step.image && { image: step.image }),
    })),
  }

  if (data.totalTime) schema.totalTime = data.totalTime
  if (data.image) schema.image = data.image
  if (data.tool) schema.tool = data.tool.map((t) => ({ '@type': 'HowToTool', name: t }))
  if (data.supply) schema.supply = data.supply.map((s) => ({ '@type': 'HowToSupply', name: s }))
  if (data.estimatedCost) {
    schema.estimatedCost = {
      '@type': 'MonetaryAmount',
      currency: data.estimatedCost.currency,
      value: data.estimatedCost.value,
    }
  }

  return schema
}

export function buildArticleWithFAQ(
  article: Record<string, unknown>,
  faqs: FAQItem[]
): Record<string, unknown>[] {
  return [
    { '@type': 'Article', ...article },
    { '@type': 'FAQPage', ...buildFAQPageData(faqs) },
  ]
}

export function buildCourseData(data: {
  name: string
  description: string
  provider: string
  url?: string
  image?: string
  offers?: { price: string; priceCurrency: string }
}) {
  return {
    name: data.name,
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: data.provider,
    },
    ...(data.url && { url: data.url }),
    ...(data.image && { image: data.image }),
    ...(data.offers && {
      offers: {
        '@type': 'Offer',
        price: data.offers.price,
        priceCurrency: data.offers.priceCurrency,
      },
    }),
  }
}

// Main component
export default function JsonLd({ type, data, id }: JsonLdProps) {
  const reactId = useId()
  const scriptId = id || `json-ld-${type.toLowerCase()}-${reactId.replace(/:/g, '')}`

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type,
          ...data,
        }),
      }}
    />
  )
}

// Specialized components for common use cases
export function FAQPageJsonLd({ faqs, id }: { faqs: FAQItem[]; id?: string }) {
  return <JsonLd type="FAQPage" data={buildFAQPageData(faqs)} id={id} />
}

export function HowToJsonLd({ data, id }: { data: HowToData; id?: string }) {
  return <JsonLd type="HowTo" data={buildHowToData(data)} id={id} />
}

export function CourseJsonLd({
  data,
  id,
}: {
  data: Parameters<typeof buildCourseData>[0]
  id?: string
}) {
  return <JsonLd type="Course" data={buildCourseData(data)} id={id} />
}

// Multi-schema component for articles with FAQ
export function ArticleWithFAQJsonLd({
  article,
  faqs,
  id,
}: {
  article: Record<string, unknown>
  faqs: FAQItem[]
  id?: string
}) {
  const schemas = buildArticleWithFAQ(article, faqs)
  const reactId = useId()
  const scriptId = id || `json-ld-article-faq-${reactId.replace(/:/g, '')}`

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': schemas,
        }),
      }}
    />
  )
}
