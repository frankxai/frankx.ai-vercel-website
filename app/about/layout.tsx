import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'About Frank van den Bergh | AI Architect & Creator',
  description: 'Oracle AI Architect, creator of 500+ AI songs, and builder of the Agentic Creator OS. Enterprise AI systems, music production, and digital products.',
  path: '/about',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
