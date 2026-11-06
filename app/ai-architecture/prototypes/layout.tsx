import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Architecture Prototypes — Interactive Sandboxes',
  description:
    'Interactive AI architecture prototypes and BYOK sandboxes for multi-model chat, retrieval-augmented generation, and multi-agent task handoffs.',
  path: '/ai-architecture/prototypes',
  keywords: [
    'ai architecture prototypes',
    'ai agent sandbox',
    'rag playground',
    'multi-model chat playground',
  ],
})

export default function AIArchitecturePrototypesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
