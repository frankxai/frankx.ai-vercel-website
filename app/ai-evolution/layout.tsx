import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The AI Evolution: From GenAI to AGI | FrankX Research',
  description:
    'A living research map of the complete AI landscape — from foundation models through agentic AI to the AGI horizon. Model taxonomy, automation stack, and builder resources.',
  keywords: [
    'AI evolution',
    'generative AI',
    'AGI',
    'agentic AI',
    'foundation models',
    'multi-agent systems',
    'Claude',
    'GPT',
    'Gemini',
    'AI models landscape',
    'AI automation',
    'MCP protocol',
    'AI timeline',
    'artificial general intelligence',
  ],
  openGraph: {
    title: 'The AI Evolution: From GenAI to AGI | FrankX Research',
    description:
      'A living research map of the complete AI landscape — foundation models, agentic AI, multi-agent systems, and the path to AGI.',
    type: 'article',
    url: 'https://frankx.ai/ai-evolution',
    siteName: 'FrankX',
    images: [
      {
        url: '/api/og?title=The%20AI%20Evolution',
        width: 1200,
        height: 630,
        alt: 'The AI Evolution: From GenAI to AGI',
      },
    ],
    publishedTime: '2026-03-22T00:00:00Z',
    authors: ['Frank Riemer'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The AI Evolution: From GenAI to AGI | FrankX Research',
    description:
      'A living research map from foundation models to the AGI horizon. Model taxonomy, automation stack, builder resources.',
    images: ['/api/og?title=The%20AI%20Evolution'],
    creator: '@frankxai',
  },
  alternates: {
    canonical: 'https://frankx.ai/ai-evolution',
  },
}

const articleLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The AI Evolution: From GenAI to AGI',
  description:
    'A living research map of the complete AI landscape — from foundation models through agentic AI to the AGI horizon.',
  url: 'https://frankx.ai/ai-evolution',
  datePublished: '2026-03-22T00:00:00Z',
  dateModified: '2026-03-22T00:00:00Z',
  author: {
    '@type': 'Person',
    name: 'Frank Riemer',
    url: 'https://frankx.ai',
    jobTitle: 'AI Architect',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FrankX',
    url: 'https://frankx.ai',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://frankx.ai/ai-evolution',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://frankx.ai',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Research Hub',
        item: 'https://frankx.ai/research',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'The AI Evolution',
        item: 'https://frankx.ai/ai-evolution',
      },
    ],
  },
})

export default function AIEvolutionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        // Static JSON-LD structured data — no user input, safe for inline rendering
        dangerouslySetInnerHTML={{ __html: articleLd }}
      />
      {children}
    </>
  )
}
