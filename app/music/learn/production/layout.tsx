import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Music Production | Recording, Mixing & Mastering | FrankX Music Academy',
  description:
    'Learn music production from scratch — DAWs, recording, mixing, mastering, plugins. From bedroom producer to professional sound.',
  path: '/music/learn/production',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
