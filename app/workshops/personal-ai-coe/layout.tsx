import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Build Your Personal AI Center of Excellence | FrankX',
  description:
    'The enterprise 6-pillar CoE framework Frank ships to Oracle clients, scaled to one person. 90 minutes. Leave with your AI operating system running.',
  path: '/workshops/personal-ai-coe',
  image: '/hero-homepage.png',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
