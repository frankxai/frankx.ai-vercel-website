import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Singing Bowls | All 9 Solfeggio Frequencies | FrankX Music Lab',
  description: 'Play all 9 Solfeggio frequencies (174–963 Hz) as singing bowls with authentic beating resonance. Meditative sound healing in your browser. Free, no download.',
  path: '/music-lab/singing-bowls',
})

export default function SingingBowlsLayout({ children }: { children: React.ReactNode }) {
  return children
}
