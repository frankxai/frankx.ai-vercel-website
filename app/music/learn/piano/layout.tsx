import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Learn Piano | Beginner Guide & Best Teachers | FrankX',
  description:
    'Learn piano from scratch with curated YouTube teachers, first songs, practice tips, and fun facts. For kids and beginners of all ages.',
  path: '/music/learn/piano',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
