import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Drums for Kids | Tap and Play a Drum Kit | FrankX Music Lab',
  description: 'A colorful drum kit for kids. Tap the big circles to play kick, snare, hi-hat, toms, and cymbal. Touch-friendly for iPad and iPhone. Free, no download.',
  path: '/music-lab/for-kids/drums',
})

export default function KidsDrumsLayout({ children }: { children: React.ReactNode }) {
  return children
}
