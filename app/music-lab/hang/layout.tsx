import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Hang Drum | Play a Handpan in Your Browser | FrankX Music Lab',
  description: 'Play a virtual hang drum (handpan) tuned to D Kurd scale. Ethereal, meditative tones with Helmholtz resonance synthesis. Touch-optimized, free, no download.',
  path: '/music-lab/hang',
})

export default function HangLayout({ children }: { children: React.ReactNode }) {
  return children
}
