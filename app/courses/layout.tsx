import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Best AI Courses | Independent FrankX Course Picks',
  description:
    'A small, independently selected shelf of AI courses—mapped to learner goals, explained in plain language, and verified for freshness.',
  path: '/courses',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
