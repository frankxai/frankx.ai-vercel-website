/**
 * Schema.org structured data generators for SEO rich results.
 * Used in guide pages, blog posts, and key landing pages.
 */

const SITE_URL = 'https://frankx.ai'

const AUTHOR_PERSON = {
  '@type': 'Person' as const,
  name: 'Frank van den Bergh',
  url: SITE_URL,
  jobTitle: 'AI Architect & Creator',
  sameAs: [
    'https://twitter.com/frankxai',
    'https://github.com/frankxai',
    'https://linkedin.com/in/frankxai',
  ],
}

export function generateArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  image,
  section,
}: {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
  image?: string
  section?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE_URL}/${slug}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: AUTHOR_PERSON,
    publisher: {
      '@type': 'Organization',
      name: 'FrankX',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(image ? { image } : {}),
    ...(section ? { articleSection: section } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${slug}`,
    },
  }
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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

export function generateHowToSchema({
  name,
  description,
  steps,
  totalTime,
  image,
}: {
  name: string
  description: string
  steps: Array<{ name: string; text: string }>
  totalTime?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime ? { totalTime } : {}),
    ...(image ? { image } : {}),
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function generateGuideSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  image,
  category,
  faqs,
}: {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
  image?: string
  category?: string
  faqs?: Array<{ question: string; answer: string }>
}): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [
    generateArticleSchema({
      title,
      description,
      slug: `guides/${slug}`,
      datePublished,
      dateModified,
      image,
      section: category,
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides' },
      { name: title, url: `/guides/${slug}` },
    ]),
  ]

  if (faqs && faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs))
  }

  return schemas
}
