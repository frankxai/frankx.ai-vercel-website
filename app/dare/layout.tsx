import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Daily Dare | A 4-Part Daily Challenge for the Mind | FrankX',
  description:
    'One dare a day: learn something that stretches your mind with AI, run a prompt, train one principle of how the mind works, and do one good thing for the world. Part of the 30-day Beautiful Mind Quest.',
  path: '/dare',
  keywords: ['daily challenge', 'ai learning', 'think and grow rich', 'daily prompt', 'mind training'],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
