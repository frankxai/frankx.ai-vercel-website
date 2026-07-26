import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Dashboard | Progress, Goals & Recommendations | FrankX',
  description:
    'Track your learning progress, goals, achievements, and recent activity, with personalized recommendations across FrankX courses, tools, and community.',
  path: '/dashboard',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
