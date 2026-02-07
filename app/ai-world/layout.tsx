import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Oracle AI World Showcase | Enterprise AI Architecture',
  description:
    'Explore Oracle AI capabilities through interactive architecture diagrams. See how enterprise AI transforms unstructured signals into actionable business insights. Insurance, RAG, and CX solutions.',
  keywords: [
    'oracle ai',
    'oracle cloud ai',
    'enterprise ai architecture',
    'oci generative ai',
    'oracle agent hub',
    'ai database 26ai',
    'multimodal ai',
    'agentic rag',
    'conversation intelligence',
    'ai insurance automation',
    'oracle code assistant',
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
