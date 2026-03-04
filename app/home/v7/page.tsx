import { createMetadata } from '@/lib/seo'
import { getHomepageData } from '@/lib/homepage-data'
import HomeV7 from '@/components/home/variations/HomeV7'

export const metadata = createMetadata({
  title: 'FrankX — Homepage V7: Arcanean Mythological',
  description: 'Fantasy-cosmic aesthetic with amber/gold palette, Eldrian guardians, and runic borders.',
  path: '/home/v7',
})

export default function HomeV7Page() {
  const data = getHomepageData()
  return <HomeV7 {...data} />
}
