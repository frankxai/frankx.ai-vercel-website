import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Create Music with AI | Suno, Prompts & Production | FrankX',
  description:
    'Learn to create professional AI music. Suno AI mastery, prompt engineering for music, genre techniques, and production workflows from an AI Architect with 500+ tracks.',
  path: '/music/create',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
