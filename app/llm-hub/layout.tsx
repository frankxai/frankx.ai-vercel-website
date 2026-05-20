import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LLM Provider Hub 2026 — Every Frontier Model + Agentic Platform',
  description:
    'Compare every major LLM provider in 2026: Anthropic, OpenAI, Google DeepMind, xAI, Meta, Mistral, DeepSeek, Cohere, Alibaba Qwen. Frontier models, agentic platforms, pricing, capabilities, side by side.',
  keywords: [
    'llm provider comparison',
    'best llm 2026',
    'agentic ai platforms',
    'frontier ai models 2026',
    'llm hub',
    'gemini 3.5 flash',
    'claude opus 4.6',
    'gpt-5.2',
    'antigravity 2.0',
    'open source llm 2026',
  ],
  alternates: { canonical: 'https://frankx.ai/llm-hub' },
  openGraph: {
    title: 'LLM Provider Hub 2026 — Every Frontier Model + Agentic Platform',
    description:
      'Categorized directory of every frontier LLM provider, model, and agentic platform — pricing, benchmarks, capabilities. Updated continuously.',
    url: 'https://frankx.ai/llm-hub',
    type: 'website',
  },
}

export default function LlmHubLayout({ children }: { children: React.ReactNode }) {
  return children
}
