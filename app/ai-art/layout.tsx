import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Art Gallery | Generative Visual Art | FrankX',
  description: 'AI-generated visual art gallery. Explore generative art created with Midjourney, DALL-E, and other AI image tools.',
  path: '/ai-art',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
