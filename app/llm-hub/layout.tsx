import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LLM Hub 2026 — GPT-6 Astra, Pricing and Evaluation',
  description:
    'Compare selected LLM providers, inspect GPT-6 Astra sources and pricing, and explore workload evaluation with free founder, creator and architecture guides.',
  keywords: [
    'llm provider comparison',
    'best llm 2026',
    'agentic ai platforms',
    'frontier ai models 2026',
    'llm hub',
    'gemini 3.5 flash',
    'claude opus 4.6',
    'gpt-6-astra',
    'antigravity 2.0',
    'open source llm 2026',
  ],
  alternates: { canonical: 'https://frankx.ai/llm-hub' },
  openGraph: {
    title: 'LLM Hub 2026 — GPT-6 Astra, Pricing and Evaluation',
    description:
      'A reviewed LLM directory with GPT-6 Astra, source-backed prices, evaluation status and practical guides. Entries retain their source dates.',
    url: 'https://frankx.ai/llm-hub',
    type: 'website',
  },
}

export default function LlmHubLayout({ children }: { children: React.ReactNode }) {
  return children
}
