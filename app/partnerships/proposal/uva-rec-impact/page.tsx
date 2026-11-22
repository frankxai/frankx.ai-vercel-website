import type { Metadata } from 'next'
import { contractMarkdown } from '@/content/partnerships/proposals/uva-contract-snapshots'
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
  // Reviewed, immutable public snapshots; no request-dependent file access.
  const contracts = agentContracts.map((agent, index) => ({
    ...agent,
    markdown: contractMarkdown[index],
  }))
  return <CollaborationExperience contracts={contracts} />
}
