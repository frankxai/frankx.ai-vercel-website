import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Interactive AI Prototypes — Bring Your Own Key | FrankX',
  description: 'Runnable, bring-your-own-key AI prototypes — a RAG tester and an agent simulator — to feel how retrieval, streaming, and agent loops behave before you build.',
  path: '/ai-architecture/prototypes',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
