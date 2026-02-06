import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research Intelligence Hub | FrankX.AI',
  description: 'Validated research across enterprise AI, production patterns, multi-agent systems, and emerging technology. 80+ cross-referenced claims, 12 active research domains, 160+ sources.',
  keywords: [
    'AI research',
    'enterprise AI architecture',
    'multi-agent systems',
    'production AI patterns',
    'RAG architecture',
    'AI agents',
    'MCP protocol',
    'AI operations',
    'vector databases',
    'AI security',
    'AI coding assistants',
    'AI neuroscience',
  ],
  openGraph: {
    title: 'Research Intelligence Hub | FrankX.AI',
    description: 'Validated research across enterprise AI, production patterns, multi-agent systems, and emerging technology.',
    type: 'website',
    url: 'https://frankx.ai/research',
    images: [
      {
        url: '/images/brand/og-template.png',
        width: 1200,
        height: 630,
        alt: 'FrankX Research Intelligence Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research Intelligence Hub | FrankX.AI',
    description: '12 research domains. 80+ validated claims. 160+ cross-referenced sources.',
    images: ['/images/brand/og-template.png'],
  },
  alternates: {
    canonical: 'https://frankx.ai/research',
  },
}

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
