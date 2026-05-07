import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Architecture | System Design for Intelligent Applications | FrankX',
  description: 'Practical reference for AI system architecture. Design patterns for LLM applications, agent orchestration, and production AI infrastructure.',
  path: '/ai-architecture',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
