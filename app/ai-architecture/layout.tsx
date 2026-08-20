import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Architecture: The Field Guide to Production Agent Systems | FrankX',
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
  type: 'article',
  updatedTime: '2026-08-20',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
