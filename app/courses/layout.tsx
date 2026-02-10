import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Courses | AI Architecture & Creator Systems | FrankX',
  description: 'Structured courses on AI architecture, agentic systems, and creative AI. From foundations to production-grade implementations.',
  path: '/courses',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
