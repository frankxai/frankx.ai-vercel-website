import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Community | AI Architects & Creators Network | FrankX',
  description: 'Join a community of AI architects, builders, and creators. Share knowledge, get feedback, and collaborate on agentic AI and creative systems.',
  path: '/community',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
