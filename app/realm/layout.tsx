import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'The Realm | Creative AI Universe | FrankX',
  description: 'Enter the FrankX creative realm. An immersive space where AI architecture meets creative expression and digital craftsmanship.',
  path: '/realm',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
