import type { Metadata } from 'next'
import CollaborationExperience from '@/components/partnerships/uva/CollaborationExperience'
import { agentContracts } from '@/content/partnerships/proposals/uva-rec-impact'
import { contractMarkdown } from '@/content/partnerships/proposals/uva-contract-snapshots'

const title = 'University AI lectures, workshops and research labs | Frank Riemer'
const description = 'Compare seven university programmes with Frank Riemer. Try a free classroom case, inspect the teaching record and indicative fees, then request dates and a written scope.'
const image = '/images/partnerships/universities/campus-studio.webp'

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: '/partnerships/universities' },
  openGraph: { title, description, url: '/partnerships/universities', images: [{ url: image, alt: 'Mini Frank and students in an Amsterdam teaching studio' }] },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
}

export default async function UniversityCollaborationPage({ searchParams }: { searchParams: Promise<{ programme?: string | string[]; via?: string | string[] }> }) {
  const { programme, via } = await searchParams
  const contracts = agentContracts.map((agent, index) => ({ ...agent, markdown: contractMarkdown[index] }))
  return <CollaborationExperience contracts={contracts} context="public" fromSourceCheck={via === 'source-check'} initialProgrammeId={typeof programme === 'string' ? programme : undefined} />
}
