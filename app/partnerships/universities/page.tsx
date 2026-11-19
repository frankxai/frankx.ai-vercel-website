import type { Metadata } from 'next'
import CollaborationExperience from '@/components/partnerships/uva/CollaborationExperience'
import { agentContracts } from '@/content/partnerships/proposals/uva-rec-impact'
import { contractMarkdown } from '@/content/partnerships/proposals/uva-contract-snapshots'

const title = 'AI architecture lectures & university workshops | Frank Riemer'
const description = 'Invite Frank Riemer, founder of Starlight Intelligence, to teach an AI architecture lecture, founder workshop or research lab. Explore programmes, host fees and teaching evidence.'
const image = '/images/portraits/frank-presenting-oracle-2025.jpg'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/partnerships/universities' },
  openGraph: { title, description, url: '/partnerships/universities', images: [{ url: image, alt: 'Frank Riemer presenting at Oracle' }] },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
}

export default function UniversityCollaborationPage() {
  const contracts = agentContracts.map((agent, index) => ({ ...agent, markdown: contractMarkdown[index] }))
  return <CollaborationExperience contracts={contracts} context="public" />
}
