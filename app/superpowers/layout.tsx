import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Superpowers Directory | The Ultimate Agent & MCP Stack | FrankX',
  description: 'A curated, interactive directory of AI tools, custom agent systems, and MCP servers mapped by creator superpower. Web-verified for June 2026.',
  path: '/superpowers',
})

export default function SuperpowersLayout({ children }: { children: React.ReactNode }) {
  return children
}
