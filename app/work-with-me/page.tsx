import type { Metadata } from 'next'
import StudioClient from './StudioClient'

export const metadata: Metadata = {
  title: 'AI Architecture Studio — FrankX',
  description:
    'AI Architecture Studio. I architect systems, coach builders, and create what doesn\'t exist yet.',
  keywords: [
    'AI architecture studio',
    'enterprise AI',
    'GenAI architecture',
    'RAG architecture',
    'agentic AI',
    'cloud-native AI',
    'AI strategy',
    'AI coaching',
  ],
  openGraph: {
    title: 'AI Architecture Studio — FrankX',
    description: 'AI Architecture Studio. I architect systems, coach builders, and create what doesn\'t exist yet.',
    url: 'https://frankx.ai/work-with-me',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Architecture Studio — FrankX',
    description: 'AI Architecture Studio. I architect systems, coach builders, and create what doesn\'t exist yet.',
  },
}

export default function WorkWithMePage() {
  return <StudioClient />
}
