import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'For Creators | AI-Augmented Creative Workflows | FrankX',
  description: 'Tools and systems for creators who want to scale with AI. Music production, content automation, prompt libraries, and the Creator OS.',
  path: '/creators',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
