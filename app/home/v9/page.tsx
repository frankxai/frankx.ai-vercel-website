import { createMetadata } from '@/lib/seo'
import { getHomepageData } from '@/lib/homepage-data'
import HomeV9 from '@/components/home/variations/HomeV9'

export const metadata = createMetadata({
  title: 'FrankX — Homepage V9: Audio-Visual Immersive',
  description: 'Music-first homepage with audio-reactive elements, waveform visualizations, and rhythm.',
  path: '/home/v9',
})

export default function HomeV9Page() {
  const data = getHomepageData()
  return <HomeV9 {...data} />
}
