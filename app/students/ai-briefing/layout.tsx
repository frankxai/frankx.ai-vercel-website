import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI in 2026: What You Need to Know | FrankX',
  description: 'The three waves of AI — from GenAI to autonomous agents to MCP. Career paths, essential resources, and everything you need to start building with AI today.',
  path: '/students/ai-briefing',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
