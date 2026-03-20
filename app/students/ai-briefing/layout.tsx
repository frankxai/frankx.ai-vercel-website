import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'State of AI 2026 — Visual Briefing for Students',
  description:
    'The AI landscape explained visually. Frontier models, coding agents, MCP protocol, most in-demand skills, and where to start. Updated quarterly by Frank X. Riemer.',
  path: '/students/ai-briefing',
  keywords: [
    'state of ai 2026',
    'ai landscape',
    'ai coding agents',
    'mcp protocol',
    'ai skills demand',
    'ai career',
    'learn ai',
    'claude code',
    'cursor ai',
    'multi agent systems',
  ],
  image: '/api/og?title=State of AI 2026&subtitle=Visual Briefing for Students %26 Builders',
  type: 'website',
})

export default function AIBriefingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
