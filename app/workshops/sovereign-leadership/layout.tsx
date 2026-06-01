import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Sovereign Leadership: Human-Centric AI | FrankX',
  description:
    'Boardroom workshop adapting the 6-pillar AI CoE framework to your real context. AI leadership as sovereignty practice, not a technology decision. 2 hours.',
  path: '/workshops/sovereign-leadership',
  image: '/hero-homepage.png',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
