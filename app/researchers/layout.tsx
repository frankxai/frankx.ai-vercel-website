import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'AI for Researchers — Literature Review, Analysis, Knowledge Vaults | FrankX',
  description:
    'AI-powered research workflows for academics and scientists. Deep literature review with Perplexity, analysis with Claude, knowledge management, and research automation with coding agents.',
  path: '/researchers',
  keywords: [
    'ai for researchers', 'ai literature review', 'ai research tools', 'perplexity for research',
    'claude for academics', 'ai knowledge management', 'research automation',
  ],
  type: 'website',
})

export default function ResearchersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
