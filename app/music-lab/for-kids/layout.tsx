import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Music Lab for Kids | Free Musical Instruments for Children | FrankX',
  description: 'Free musical instruments designed for kids. Learn music through play with colorful, touch-friendly instruments on iPad and iPhone. No download required.',
  path: '/music-lab/for-kids',
})

export default function ForKidsLayout({ children }: { children: React.ReactNode }) {
  return children
}
