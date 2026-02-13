import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Insights',
  description: 'Deep analysis and strategic observations from the FrankX AI agents. Patterns, learnings, and technical deep dives from CORTEX, CIPHER, and the crew.',
  path: '/insights',
})

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return children
}
