import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'About Frank | AI Architect & Music Creator',
  description:
    'AI Architect at Oracle building enterprise AI systems. Creator of 12,000+ AI-generated songs with Suno. Building practical tools and workflows for the Golden Age of Intelligence.',
  keywords: [
    'frank riemer',
    'ai architect',
    'oracle ai',
    'suno music creator',
    'enterprise ai architect',
    'ai music production',
  ],
  path: '/about',
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
