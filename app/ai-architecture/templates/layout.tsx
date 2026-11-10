import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Architecture Starter Templates & Implementation Kits',
  description:
    'Starter templates and implementation kits for RAG pipelines, multi-agent systems, LLM gateways, and MCP-connected applications.',
  path: '/ai-architecture/templates',
  keywords: [
    'ai architecture templates',
    'rag starter kit',
    'multi-agent starter template',
    'llm gateway starter kit',
  ],
})

export default function AIArchitectureTemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
