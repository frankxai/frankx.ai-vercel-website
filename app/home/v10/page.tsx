import { createMetadata } from '@/lib/seo'
import { getHomepageData } from '@/lib/homepage-data'
import HomeV10 from '@/components/home/variations/HomeV10'

export const metadata = createMetadata({
  title: 'FrankX — Homepage V10: Brutalist Minimalist',
  description: 'Anti-design: no gradients, no blur, no glow. Raw content, maximum speed, black/white with emerald accent.',
  path: '/home/v10',
})

export default function HomeV10Page() {
  const data = getHomepageData()
  return <HomeV10 {...data} />
}
