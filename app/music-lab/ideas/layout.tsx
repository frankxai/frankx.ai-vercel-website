import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Song Ideas | Suno Prompt Lab | FrankX Music Lab',
  description:
    'Production-ready Suno AI prompts crafted with the 5-layer prompt architecture. Copy-paste prompts for anime rock, house, punk, hip hop, EDM, and experimental pop. 300-400 characters each, optimized for high-quality output.',
  path: '/music-lab/ideas',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
