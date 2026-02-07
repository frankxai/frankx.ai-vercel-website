import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Architecture Hub | Enterprise Patterns & Blueprints',
  description:
    'Enterprise AI architecture patterns, blueprints, and reference designs. RAG systems, multi-agent orchestration, production deployment patterns, and Oracle Cloud AI integration.',
  keywords: [
    'ai architecture',
    'enterprise ai patterns',
    'rag architecture',
    'multi-agent systems',
    'ai blueprints',
    'oracle cloud ai',
    'production ai patterns',
    'ai system design',
  ],
  path: '/ai-architecture',
})

export default function AIArchitectureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
