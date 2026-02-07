import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Music Lab | AI Music Production with Suno',
  description:
    'Explore 12,000+ AI-generated tracks. Music production tools, Suno prompt templates, and genre-specific production techniques from FrankX.',
  keywords: [
    'ai music',
    'suno ai',
    'ai music production',
    'music lab',
    'suno prompts',
    'ai generated music',
    'music production tools',
  ],
  path: '/music-lab',
})

export default function MusicLabLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
