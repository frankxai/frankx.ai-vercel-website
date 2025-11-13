import type { BlogPost } from '@/lib/types/blog'

/**
 * SEO Schema Generators for Structured Data
 * Implements BlogPosting, HowTo, and Breadcrumb schemas
 */

export function generateBlogPostingSchema(post: BlogPost, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image ? `${siteUrl}${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'Frank',
      url: `${siteUrl}/about`,
      jobTitle: 'Oracle AI Architect',
      description: 'AI Architect specializing in generative AI, agentic systems, and music production with Suno'
    },
    publisher: {
      '@type': 'Person',
      name: 'Frank',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`
    },
    keywords: post.keywords?.join(', ') || post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content ? post.content.split(/\s+/).length : undefined,
    timeRequired: post.readingTime,
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateHowToSchema(
  title: string,
  description: string,
  steps: Array<{ name: string; text: string; url?: string }>,
  siteUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url
    }))
  }
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}
