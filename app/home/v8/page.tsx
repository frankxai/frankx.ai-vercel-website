import { createMetadata } from '@/lib/seo'
import { getHomepageData } from '@/lib/homepage-data'
import HomeV8 from '@/components/home/variations/HomeV8'

export const metadata = createMetadata({
  title: 'FrankX — Homepage V8: Split-Screen Duality',
  description: 'Dual-column contrast: technical architect vs creative maker, blue vs emerald.',
  path: '/home/v8',
})

export default function HomeV8Page() {
  const data = getHomepageData()
  return <HomeV8 {...data} />
}
