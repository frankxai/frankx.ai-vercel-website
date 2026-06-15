import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'The Beautiful Mind Quest | 30 Days, 6 Principles | FrankX',
  description:
    'A 30-day arc of daily dares: stretch your mind with AI, run one prompt a day, train the mechanics of belief, attention, and imagination — and do one good thing for the world, every day.',
  path: '/quest',
  keywords: ['30 day challenge', 'think and grow rich', 'ai learning', 'mind training', 'daily quest'],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
