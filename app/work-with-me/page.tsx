import type { Metadata } from 'next'
import StudioClient from './StudioClient'

export const metadata: Metadata = {
  title: 'Expert Intelligence Systems — AI Architecture Studio | FrankX',
  description:
    'Turn your expertise, business data, and repeatable judgment into an owned AI intelligence system for operations, sales, marketing, and product creation.',
  keywords: [
    'AI architecture studio',
    'expert intelligence system',
    'founder intelligence system',
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
    title: 'Expert Intelligence Systems — FrankX',
    description:
      'Turn your expertise, business data, and repeatable judgment into an owned AI intelligence system.',
    url: 'https://frankx.ai/work-with-me',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Intelligence Systems — FrankX',
    description:
      'Turn your expertise, business data, and repeatable judgment into an owned AI intelligence system.',
  },
}

export default function WorkWithMePage() {
  return <StudioClient />
}
