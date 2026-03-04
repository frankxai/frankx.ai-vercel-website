import { createMetadata } from '@/lib/seo'
import { getHomepageData } from '@/lib/homepage-data'
import HomeV2 from '@/components/home/variations/HomeV2'

export const metadata = createMetadata({
  title: 'FrankX — Homepage V2: Bento Dashboard',
  description: 'Apple/Linear-style bento grid layout with maximum information density.',
  path: '/home/v2',
})

export default function HomeV2Page() {
  const data = getHomepageData()
  return <HomeV2 {...data} />
}
