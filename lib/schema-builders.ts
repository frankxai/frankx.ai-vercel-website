/**
 * Schema Builders for AI-First Content Optimization
 *
 * These utilities help generate structured data that AI agents (ChatGPT, Perplexity, Claude)
 * can easily extract and cite. Each builder follows schema.org specifications optimized
 * for LLM discovery patterns.
 */

import type { FAQItem, HowToStep } from '@/components/seo/JsonLd'

// Site-wide constants for consistent schema data
export const SITE_CONFIG = {
  name: 'FrankX.AI',
  url: 'https://frankx.ai',
  author: {
    name: 'Frank Villanueva',
    url: 'https://frankx.ai/about',
    jobTitle: 'AI Architect & Creator',
    sameAs: [
      'https://linkedin.com/in/frankxvillanueva',
      'https://twitter.com/FrankXVillanueva',
      'https://github.com/FrankXVillanueva',
    ],
  },
  organization: {
    name: 'FrankX.AI',
    logo: 'https://frankx.ai/logo.png',
    description: 'Empowering creators with AI-first tools and strategies',
  },
}

// Build complete Article schema with all AI-relevant fields
export function buildArticleSchema(data: {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
  author?: string
  image?: string
  keywords?: string[]
  wordCount?: number
  tldr?: string
}) {
  return {
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    url: `${SITE_CONFIG.url}/blog/${data.slug}`,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': 'Person',
      name: data.author || SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.organization.name,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.organization.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${data.slug}`,
    },
    ...(data.image && {
      image: {
        '@type': 'ImageObject',
        url: data.image.startsWith('http') ? data.image : `${SITE_CONFIG.url}${data.image}`,
      },
    }),
    ...(data.keywords && { keywords: data.keywords.join(', ') }),
    ...(data.wordCount && { wordCount: data.wordCount }),
    ...(data.tldr && { abstract: data.tldr }),
  }
}

// Build FAQ schema optimized for AI extraction
export function buildFAQSchema(faqs: FAQItem[]) {
  return {
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

// Build HowTo schema for tutorials
export function buildHowToSchema(data: {
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  tools?: string[]
  image?: string
}) {
  return {
    '@type': 'HowTo',
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
    ...(data.totalTime && { totalTime: data.totalTime }),
    ...(data.tools && {
      tool: data.tools.map((tool) => ({ '@type': 'HowToTool', name: tool })),
    }),
    ...(data.image && { image: data.image }),
  }
}

// Build combined Article + FAQ schema graph
export function buildArticleWithFAQSchema(
  article: Parameters<typeof buildArticleSchema>[0],
  faqs: FAQItem[]
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [buildArticleSchema(article), buildFAQSchema(faqs)],
  }
}

// Build BreadcrumbList for navigation context
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  }
}

// Build Course schema for educational content
export function buildCourseSchema(data: {
  name: string
  description: string
  url?: string
  image?: string
  duration?: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced'
  price?: { amount: string; currency: string }
  topics?: string[]
}) {
  return {
    '@type': 'Course',
    name: data.name,
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.organization.name,
      sameAs: SITE_CONFIG.url,
    },
    ...(data.url && { url: data.url }),
    ...(data.image && { image: data.image }),
    ...(data.duration && { timeRequired: data.duration }),
    ...(data.level && { educationalLevel: data.level }),
    ...(data.price && {
      offers: {
        '@type': 'Offer',
        price: data.price.amount,
        priceCurrency: data.price.currency,
      },
    }),
    ...(data.topics && { about: data.topics.map((t) => ({ '@type': 'Thing', name: t })) }),
  }
}

// Build ItemList for collection pages (topic clusters)
export function buildItemListSchema(data: {
  name: string
  description: string
  items: { name: string; url: string; description?: string }[]
}) {
  return {
    '@type': 'ItemList',
    name: data.name,
    description: data.description,
    numberOfItems: data.items.length,
    itemListElement: data.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`,
      ...(item.description && { description: item.description }),
    })),
  }
}

// Build Person schema for author pages
export function buildPersonSchema(overrides?: Partial<typeof SITE_CONFIG.author>) {
  const author = { ...SITE_CONFIG.author, ...overrides }
  return {
    '@type': 'Person',
    name: author.name,
    url: author.url,
    jobTitle: author.jobTitle,
    sameAs: author.sameAs,
    worksFor: {
      '@type': 'Organization',
      name: SITE_CONFIG.organization.name,
    },
  }
}

// Build WebSite schema with search action for sitelinks
export function buildWebSiteSchema() {
  return {
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.organization.description,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.organization.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// Extract FAQ pairs from MDX content (for automation)
export function extractFAQFromContent(content: string): FAQItem[] {
  const faqs: FAQItem[] = []

  // Match FAQ section with Q&A patterns (using [\s\S] instead of . with s flag)
  const faqSectionMatch = content.match(/##\s*FAQ[\s\S]*?(?=##[^#]|$)/i)
  if (!faqSectionMatch) return faqs

  const faqSection = faqSectionMatch[0]

  // Match Q: A: patterns
  const lines = faqSection.split('\n')
  let currentQuestion = ''
  let currentAnswer = ''

  for (const line of lines) {
    if (line.startsWith('**Q:') || line.startsWith('### ')) {
      if (currentQuestion && currentAnswer) {
        faqs.push({ question: currentQuestion.trim(), answer: currentAnswer.trim() })
      }
      currentQuestion = line.replace(/^\*\*Q:\*\*|^###\s*/, '').trim()
      currentAnswer = ''
    } else if (line.startsWith('**A:')) {
      currentAnswer = line.replace(/^\*\*A:\*\*/, '').trim()
    } else if (currentQuestion && !line.startsWith('##')) {
      currentAnswer += ' ' + line.trim()
    }
  }

  if (currentQuestion && currentAnswer) {
    faqs.push({ question: currentQuestion.trim(), answer: currentAnswer.trim() })
  }

  return faqs
}

// Validate schema for required fields
export function validateSchema(
  schema: Record<string, unknown>
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!schema['@type']) errors.push('Missing @type field')

  const type = schema['@type'] as string
  switch (type) {
    case 'Article':
      if (!schema.headline) errors.push('Article missing headline')
      if (!schema.datePublished) errors.push('Article missing datePublished')
      break
    case 'FAQPage':
      if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
        errors.push('FAQPage missing mainEntity array')
      }
      break
    case 'HowTo':
      if (!schema.name) errors.push('HowTo missing name')
      if (!schema.step || !Array.isArray(schema.step)) {
        errors.push('HowTo missing step array')
      }
      break
  }

  return { valid: errors.length === 0, errors }
}
