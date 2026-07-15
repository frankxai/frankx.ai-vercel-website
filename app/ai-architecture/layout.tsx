import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Architecture Field Guide | Vercel, Railway & GCP | FrankX',
  description: 'Verified official AI architectures and working repositories for agent interfaces, persistent workers, enterprise RAG, MCP, durable workflows, and observability.',
  path: '/ai-architecture',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
