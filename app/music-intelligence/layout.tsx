import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Music Intelligence System — AI Agents, Tools & Research | FrankX',
  description:
    'The connected ecosystem for AI music production: 13 portable agents (Claude Projects, Custom GPTs, Gemini Gems), vibe-os MCP server, research into music psychology and state-change, free Suno prompt templates.',
  path: '/music-intelligence',
})

export default function MusicIntelligenceLayout({ children }: { children: React.ReactNode }) {
  return children
}
