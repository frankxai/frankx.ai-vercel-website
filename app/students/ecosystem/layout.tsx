import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'FrankX Ecosystem Map — Every AI Tool in One Place',
  description:
    'Visual map of the complete FrankX platform: student tools, creative AI systems, 90+ articles, 12K+ songs, research hub, and coaching. All free to explore.',
  path: '/students/ecosystem',
  keywords: ['frankx ecosystem', 'ai learning platform', 'ai tools', 'creator tools', 'ai education'],
  type: 'website',
})

export default function EcosystemLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
