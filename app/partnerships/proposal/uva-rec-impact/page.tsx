import type { Metadata } from 'next'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import CollaborationExperience from '@/components/partnerships/uva/CollaborationExperience'
import { agentContracts, proposal } from '@/content/partnerships/proposals/uva-rec-impact'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: 'What becomes possible when we build together? | FrankX' },
  description: proposal.subtitle,
  robots: {
    index: false, follow: false, noarchive: true, nosnippet: true,
    googleBot: { index: false, follow: false, noarchive: true, nosnippet: true },
  },
  openGraph: {
    title: 'An independent proposal for a university collaboration',
    description: 'A founder-authored discussion draft by Frank Riemer. No university endorsement or partnership is implied.',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'An independent proposal for a university collaboration',
    description: 'A discussion draft by Frank Riemer. No university endorsement is implied.',
    images: [],
  },
}

export default function UvaCollaborationPage() {
  // Fixed, reviewed public files only. Never accept a path from the request.
  // Literal paths also keep Next.js output-file tracing narrow and deterministic.
  const markdown = [
    readFileSync(join(process.cwd(), '.claude/agents/starlight-architecture-design.md'), 'utf8'),
    readFileSync(join(process.cwd(), '.claude/agents/research-guardian.md'), 'utf8'),
    readFileSync(join(process.cwd(), '.claude/agents/integrity-guard.md'), 'utf8'),
  ]
  const contracts = agentContracts.map((agent, index) => ({
    ...agent,
    markdown: markdown[index],
  }))
  return <CollaborationExperience contracts={contracts} />
}
