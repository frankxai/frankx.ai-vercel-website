import { createMetadata } from '@/lib/seo'

// Shared across the whole /ai-architecture segment. Every child page here is a
// 'use client' component with no metadata of its own, so anything set below is
// inherited by /tools, /templates, /blueprints, /prototypes and
// /multi-cloud-comparison. Article-shaped fields (type, updatedTime) therefore
// live on the hub's own page.tsx, not here — those catalog pages are not articles.
// The root layout applies a `%s | FrankX` title template, so titles omit the suffix.
export const metadata = createMetadata({
  title: 'AI Architecture: The Field Guide to Production Agent Systems',
  description:
    'How to structure a system that calls a language model: the seven planes, choosing between workflow and agent, the 2026-07-28 MCP revision, the OWASP GenAI LLM Top 10 2026, and where these systems actually break.',
  path: '/ai-architecture',
  keywords: [
    'ai architecture',
    'ai agent architecture',
    'llm application architecture',
    'agent architecture best practices',
    'model context protocol',
    'rag architecture',
    'multi-agent systems',
    'ai observability',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
