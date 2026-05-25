import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Learn Violin | Beginner Guide & Best Teachers | FrankX',
  description:
    'Learn violin with curated YouTube teachers, first pieces, practice tips, and inspiring stories. For kids and beginners of all ages.',
  path: '/music/learn/violin',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
