import { createMetadata } from '@/lib/seo'
import { getHomepageData } from '@/lib/homepage-data'
import HomeV4 from '@/components/home/variations/HomeV4'

export const metadata = createMetadata({
  title: 'FrankX — Homepage V4: Magazine Editorial',
  description: 'Premium editorial design with serif typography, pull quotes, and magazine layouts.',
  path: '/home/v4',
})

export default function HomeV4Page() {
  const data = getHomepageData()
  return <HomeV4 {...data} />
}
