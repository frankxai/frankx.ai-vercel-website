import { createMetadata } from '@/lib/seo'
import { ACOS_REPO_SNAPSHOT } from '@/data/acos/agents'

export const metadata = createMetadata({
  title: `ACOS — The operating system for generative creators | ${ACOS_REPO_SNAPSHOT.skills} skills, ${ACOS_REPO_SNAPSHOT.agents} agents`,
  description: `Open-source AI operating system for Claude Code (${ACOS_REPO_SNAPSHOT.repo}/${ACOS_REPO_SNAPSHOT.sourcePath}, verified ${ACOS_REPO_SNAPSHOT.verifiedOn}): ${ACOS_REPO_SNAPSHOT.skills} skill modules, ${ACOS_REPO_SNAPSHOT.agents} agent profiles, and ${ACOS_REPO_SNAPSHOT.commands} slash commands.`,
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
