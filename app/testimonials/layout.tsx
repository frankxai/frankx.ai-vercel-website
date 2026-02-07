import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Testimonials | What Builders Say About FrankX | FrankX',
  description: 'Hear from AI architects, creators, and developers who use FrankX tools and systems. Real results from real builders.',
  path: '/testimonials',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
