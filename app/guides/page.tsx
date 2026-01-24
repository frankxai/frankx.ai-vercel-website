import { getAllGuides, type GuideDoc } from '@/lib/guides'
import { createMetadata } from '@/lib/seo'
import GuidesPageClient from './GuidesPageClient'

// ISR: Revalidate guides every 2 hours
export const revalidate = 7200

export const metadata = createMetadata({
  title: 'Implementation Guides - Step by Step AI Building',
  description:
    'Practical implementation guides to help you build intelligence systems. Each guide is battle-tested and ready to use.',
  keywords: [
    'ai guides',
    'implementation guides',
    'ai tutorials',
    'enterprise ai',
    'ai architecture',
  ],
  path: '/guides',
})

export default function GuidesPage() {
  const guides = getAllGuides()

  return <GuidesPageClient guides={guides} />
}
