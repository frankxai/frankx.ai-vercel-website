import { createMetadata } from '@/lib/seo'
import { getHomepageData } from '@/lib/homepage-data'
import HomeV6 from '@/components/home/variations/HomeV6'

export const metadata = createMetadata({
  title: 'FrankX — Homepage V6: Narrative Journey',
  description: 'Vertical timeline storytelling: chapters of creation from architect to builder.',
  path: '/home/v6',
})

export default function HomeV6Page() {
  const data = getHomepageData()
  return <HomeV6 {...data} />
}
