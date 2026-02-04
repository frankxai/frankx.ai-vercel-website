import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI World | Research & Coverage by Frank van den Bergh',
  description:
    'Documenting the global AI revolution. Research, analysis, and technical deep dives on frontier labs, enterprise AI, agentic systems, and production patterns.',
  keywords: [
    'ai research',
    'ai architecture',
    'agentic systems',
    'multi-agent ai',
    'enterprise ai',
    'production ai',
    'ai news',
    'ai labs',
    'anthropic',
    'openai',
    'oracle ai',
    'rag patterns',
    'vector databases',
    'ai music',
    'creative ai',
  ],
  path: '/ai-world',
})

export default function AIWorldLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
