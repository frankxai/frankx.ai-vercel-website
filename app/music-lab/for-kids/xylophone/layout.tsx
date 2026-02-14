import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Xylophone for Kids | Learn Music Through Play | FrankX Music Lab',
  description: 'A colorful rainbow xylophone designed for kids. Pentatonic scale means every note sounds beautiful together. Touch-friendly for iPad and iPhone.',
  path: '/music-lab/for-kids/xylophone',
})

export default function XylophoneLayout({ children }: { children: React.ReactNode }) {
  return children
}
