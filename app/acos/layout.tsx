import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'ACOS — The Operating System for Generative Creators | 630+ Skills, 40+ Agents',
  description: 'Open-source AI operating system for Claude Code. 630+ auto-activating skills, 40+ specialized agents, 130+ commands. Free to clone. Premium support available.',
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
