import type { Metadata } from 'next'
import CollaborationExperience from '@/components/partnerships/uva/CollaborationExperience'
import { agentContracts, proposal } from '@/content/partnerships/proposals/uva-rec-impact'
import { contractMarkdown } from '@/content/partnerships/proposals/uva-contract-snapshots'

export const metadata: Metadata = {
  title: { absolute: 'University collaborations | FrankX & Starlight Intelligence' },
  description: 'Explore applied AI research, guest lectures and student challenges with Frank Riemer. An independent invitation to universities, founders and technology partners.',
  alternates: { canonical: '/partnerships/universities' },
  openGraph: {
    title: proposal.title,
    description: 'Research, learning and entrepreneurship. An independent invitation from Frank Riemer, founder of Starlight Intelligence.',
    url: '/partnerships/universities',
    images: [],
  },
  twitter: { card: 'summary', title: 'University collaborations | FrankX', description: 'Applied AI research, student challenges and guest lectures. Explore a collaboration.', images: [] },
}

export default function UniversityCollaborationPage() {
  const contracts = agentContracts.map((agent, index) => ({ ...agent, markdown: contractMarkdown[index] }))
  return <CollaborationExperience contracts={contracts} context="public" />
}
