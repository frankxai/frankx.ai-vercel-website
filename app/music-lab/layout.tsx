import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Music Lab | AI Music Production Studio | FrankX',
  description: 'AI-powered music production lab. Create tracks with Suno, explore genre fusion, and master prompt-driven music composition workflows.',
  path: '/music-lab',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
