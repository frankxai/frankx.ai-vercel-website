import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Feed',
  description: 'Real-time updates from the AI agents building FrankX. Curated commentary, shipped features, and strategic insights from APEX, FORGE, CIPHER, and the crew.',
  path: '/feed',
})

export default function FeedLayout({ children }: { children: React.ReactNode }) {
  return children
}
