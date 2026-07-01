import type { Metadata } from 'next'

import MindPageClient from '@/components/mind/MindPageClient'
import { createMetadata } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = createMetadata({
  title: 'The Mind as an Operating System',
  description:
    'A practical map of the human operator behind AI systems: attention, memory, taste, feedback loops, and multi-agent thinking for builders.',
  path: '/mind',
  image: '/images/mind/mind-og-system-map.png',
  keywords: [
    'AI architect',
    'human operator',
    'AI systems',
    'agent workflows',
    'multi-agent thinking',
    'creative discipline',
    'FrankX',
  ],
})

export default function MindPage() {
  return <MindPageClient />
}
