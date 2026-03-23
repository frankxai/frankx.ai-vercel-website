import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Learn | AI Architecture & Creative Systems | FrankX',
  description: 'Learn AI architecture, agentic workflows, prompt engineering, and creative AI systems. Structured learning paths for builders.',
  path: '/learn',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
