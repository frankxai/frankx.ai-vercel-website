import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Learn Guitar | Beginner Guide, Chords & Best Teachers | FrankX',
  description:
    'Learn guitar from scratch — open chords, strumming patterns, first songs, best YouTube teachers, free tabs, and AI tools. Acoustic, electric, and classical guitar for beginners.',
  path: '/music/learn/guitar',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
