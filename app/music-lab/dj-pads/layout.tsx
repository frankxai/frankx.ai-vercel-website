import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'DJ Pads | Tropical House Beat Maker | FrankX Music Lab',
  description: 'Play tropical house beats like Kygo and Lost Frequencies. 16 pads with marimba, steel drums, pluck synths, and more. Free browser-based DJ pad.',
  path: '/music-lab/dj-pads',
})

export default function DJPadsLayout({ children }: { children: React.ReactNode }) {
  return children
}
