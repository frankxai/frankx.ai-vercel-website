import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'About Frank Riemer | AI Architect & Creator',
  description: 'Enterprise AI Architect and builder of the Agentic Creator OS. AI systems, music production, and digital products.',
  path: '/about',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
