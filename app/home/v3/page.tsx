import { createMetadata } from '@/lib/seo'
import { getHomepageData } from '@/lib/homepage-data'
import HomeV3 from '@/components/home/variations/HomeV3'

export const metadata = createMetadata({
  title: 'FrankX — Homepage V3: Terminal Hacker',
  description: 'Developer-aesthetic homepage with terminal UI, monospace fonts, and typing animations.',
  path: '/home/v3',
})

export default function HomeV3Page() {
  const data = getHomepageData()
  return <HomeV3 {...data} />
}
