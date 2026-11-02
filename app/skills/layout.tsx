import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  canonical: './',
  title: 'Claude Code Skills & Agent Skill Library — SKILL.md Hub',
  description:
    'Install, build, and evaluate Claude Code skills using the open SKILL.md format. Compare skills, plugins, subagents, slash commands, and MCP servers across production harnesses.',
  keywords: [
    'claude code skills',
    'claude skills',
    'SKILL.md',
    'agent skills',
    'claude code plugins vs skills',
    'claude skills library',
    'codex skills',
    'gemini cli skills',
  ],
  path: '/skills',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
