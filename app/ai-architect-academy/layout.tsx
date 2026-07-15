import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Architect Academy | Enterprise AI Training | FrankX',
  description: 'Master AI architecture with structured training. From foundations to production-grade agentic systems, multi-agent patterns, and enterprise deployment.',
  path: '/ai-architect-academy',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
