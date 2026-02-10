import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Architectures | Reference Designs & Patterns | FrankX',
  description: 'Production-ready AI architecture patterns. RAG pipelines, multi-agent orchestration, agentic workflows, and enterprise deployment blueprints.',
  path: '/ai-architectures',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
