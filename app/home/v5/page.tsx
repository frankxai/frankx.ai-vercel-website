import { createMetadata } from '@/lib/seo'
import { getHomepageData } from '@/lib/homepage-data'
import HomeV5 from '@/components/home/variations/HomeV5'

export const metadata = createMetadata({
  title: 'FrankX — Homepage V5: Immersive Gallery',
  description: 'Photo-forward layout where images dominate with minimal text overlays.',
  path: '/home/v5',
})

export default function HomeV5Page() {
  const data = getHomepageData()
  return <HomeV5 {...data} />
}
