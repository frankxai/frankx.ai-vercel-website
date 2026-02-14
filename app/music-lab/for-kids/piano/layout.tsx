import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Piano for Kids | Learn Notes Through Color | FrankX Music Lab',
  description: 'A colorful one-octave piano for kids. Each key has its own color and note name. Touch-friendly for iPad and iPhone. Free, no download required.',
  path: '/music-lab/for-kids/piano',
})

export default function KidsPianoLayout({ children }: { children: React.ReactNode }) {
  return children
}
