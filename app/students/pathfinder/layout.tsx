import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'AI Learning Path Generator | FrankX',
  description:
    'Get a personalized AI learning path based on your background, interests, and available time. Curated from 90+ articles, 9 courses, and 21 tools.',
  path: '/students/pathfinder',
  keywords: ['ai learning path', 'ai career path', 'personalized ai curriculum', 'learn ai'],
  type: 'website',
})

export default function PathfinderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
