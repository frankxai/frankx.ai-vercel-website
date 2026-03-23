import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Operations Research Hub | FrankX.AI',
  description: 'The definitive knowledge base for AI Operations. Production-ready LLM infrastructure, OCI AI Accelerator Packs, memory systems, multi-agent orchestration, and the path to AGI.',
  keywords: [
    'AI Ops',
    'LLM Operations',
    'AI infrastructure',
    'OCI AI Blueprints',
    'AI Accelerator Packs',
    'LiteLLM',
    'Langfuse',
    'vLLM',
    'multi-agent systems',
    'LangGraph',
    'Mem0',
    'AGI',
    'AI architecture',
  ],
  openGraph: {
    title: 'AI Operations Research Hub | FrankX.AI',
    description: 'Production-ready AI infrastructure patterns, OCI AI Accelerator Packs, and the path to AGI. Built for enterprise deployment.',
    type: 'website',
    url: 'https://frankx.ai/ai-ops',
    images: [
      {
        url: '/research/ai-ops/images/ai-ops-hero-banner.png',
        width: 1376,
        height: 768,
        alt: 'FrankX AI Operations Research Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Operations Research Hub | FrankX.AI',
    description: 'The operating layer for human-AI collaboration. Enterprise AI infrastructure patterns.',
    images: ['/research/ai-ops/images/ai-ops-hero-banner.png'],
  },
  alternates: {
    canonical: 'https://frankx.ai/ai-ops',
  },
}

export default function AIopsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
