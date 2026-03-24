import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'ACOS — The Operating System for Generative Creators | 75+ Skills, 38 Agents',
  description: 'Open-source AI operating system for Claude Code. 75+ auto-activating skills, 38 specialized agents, 35+ commands. Free to clone. Premium support available.',
  path: '/acos',
  keywords: [
    'agentic creator os',
    'claude code operating system',
    'ai agent skills',
    'claude code skills',
    'mcp server management',
    'ai creator tools',
    'open source ai agents',
  ],
})

export default function ACOSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
