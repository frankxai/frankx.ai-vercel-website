import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Soul Frequency Quiz | Discover Your Creative Wavelength | FrankX',
  description: 'Take the Soul Frequency Quiz to discover your unique creative wavelength. Personalized insights on your strengths, style, and ideal workflow.',
  path: '/soul-frequency-quiz',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
