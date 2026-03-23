import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'For AI Architects — Enterprise Patterns & Multi-Agent Systems | FrankX.AI',
  description:
    'Production AI architecture patterns from enterprise experience. Multi-agent systems, RAG architectures, agentic workflows, and enterprise deployment guides. 630+ skills, 40+ agents in open-source ACOS.',
  keywords: [
    'ai architect',
    'enterprise ai architecture',
    'multi-agent systems',
    'rag architecture',
    'ai systems architecture',
    'agentic workflows',
    'ai agent patterns',
    'production ai systems',
    'claude code',
    'ai coding agents',
  ],
  path: '/for/architects',
})

export default function ArchitectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
