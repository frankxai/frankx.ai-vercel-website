import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  canonical: './',
  title: 'Testimonials | FrankX',
  description: 'No testimonials are published yet. Attributed stories will be published here when they exist.',
  path: '/testimonials',
  noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
