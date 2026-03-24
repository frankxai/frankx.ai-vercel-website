import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Music Theory | Notes, Scales, Chords & Keys | FrankX Music Academy',
  description:
    'Master music theory fundamentals — notes, scales, chords, keys, intervals, time signatures. Visual guides and practical exercises for beginners.',
  path: '/music/learn/theory',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
