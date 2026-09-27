import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Product studio | Concepts and early outlines | FrankX',
  description: 'Explore FrankX product concepts and early outlines for creative work, music, and AI. Each entry states what you can inspect today.',
  path: '/products',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
