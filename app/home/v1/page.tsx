import { createMetadata } from '@/lib/seo'
import { getHomepageData } from '@/lib/homepage-data'
import HomeV1 from '@/components/home/variations/HomeV1'

export const metadata = createMetadata({
  title: 'FrankX — Homepage V1: Cinematic Scroll',
  description: 'Full-viewport scroll-driven storytelling with parallax imagery and cinematic reveals.',
  path: '/home/v1',
})

export default function HomeV1Page() {
  const data = getHomepageData()
  return <HomeV1 {...data} />
}
