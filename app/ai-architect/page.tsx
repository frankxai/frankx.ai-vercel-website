import type { Metadata } from 'next'
import AIArchitectClient from './AIArchitectClient'

// Server-side metadata for SEO
export const metadata: Metadata = {
  title: 'AI Architect | Enterprise AI Architecture Methodology',
  description:
    'A battle-tested methodology for designing production AI systems. From enterprise AI architecture experience building solutions across AWS, GCP, Azure, and OCI.',
  keywords: [
    'AI architecture',
    'enterprise AI',
    'cloud architecture',
    'ai systems architect',
    'multi-cloud AI',
    'RAG patterns',
    'LLMOps',
    'AI Gateway',
    'MCP servers',
  ],
  openGraph: {
    title: 'AI Architect | Enterprise AI Architecture That Ships',
    description:
      'Battle-tested methodology for designing production AI systems. 20+ patterns, multi-cloud expertise, and real architecture examples.',
    type: 'website',
    url: '/ai-architect',
    images: [
      {
        url: '/og/ai-architect.png',
        width: 1200,
        height: 630,
        alt: 'AI Architect - Enterprise AI Architecture Methodology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Architect | Enterprise AI Architecture That Ships',
    description:
      'Battle-tested methodology for designing production AI systems with 20+ patterns.',
  },
}

// Server Component - renders the client-side interactive content
export default function AIArchitectPage() {
  return <AIArchitectClient />
}
