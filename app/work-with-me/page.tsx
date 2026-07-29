import type { Metadata } from 'next'
import StudioClient from './StudioClient'

export const metadata: Metadata = {
  title: 'Build Your Intelligence Advantage — AI Architecture Studio | FrankX',
  description:
    'Turn what only you know into what your business can do. Build an owned AI operating advantage around your expertise, data, and judgment.',
  keywords: [
    'AI architecture studio',
    'intelligence advantage',
    'sovereign intelligence',
    'personal AI operating system',
    'AI operating system for business',
    'enterprise AI',
    'GenAI architecture',
    'RAG architecture',
    'agentic AI',
    'cloud-native AI',
    'AI strategy',
    'AI coaching',
  ],
  openGraph: {
    title: 'Build Your Intelligence Advantage — FrankX',
    description:
      'Turn what only you know into what your business can do with an AI operating advantage you own.',
    url: 'https://frankx.ai/work-with-me',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build Your Intelligence Advantage — FrankX',
    description:
      'Turn what only you know into what your business can do with an AI operating advantage you own.',
  },
}

export default function WorkWithMePage() {
  return <StudioClient />
}
