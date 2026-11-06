import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Architecture Blueprints — Production Reference Designs',
  description:
    'Interactive AI architecture blueprints for multi-agent orchestration, enterprise RAG, LLM gateways, MCP tool servers, and cloud cost estimation.',
  path: '/ai-architecture/blueprints',
  keywords: [
    'ai architecture blueprints',
    'enterprise rag architecture',
    'multi-agent orchestration blueprint',
    'llm gateway architecture',
    'mcp server architecture',
  ],
})

export default function AIArchitectureBlueprintsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
