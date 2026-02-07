import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research Intelligence Hub | FrankX.AI',
  description: 'Validated research across enterprise AI, production patterns, multi-agent systems, and emerging technology. 135+ cross-referenced findings, 20 active research domains, 180+ verified sources.',
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
    description: '20 research domains. 135+ validated findings. 180+ verified sources.',
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
