import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Learn | AI Tutorials, Videos & Workshops',
  description:
    'Free AI tutorials and video workshops. Learn Claude Code, Suno music production, prompt engineering, multi-agent orchestration, and enterprise AI patterns.',
  keywords: [
    'ai tutorials',
    'ai workshops',
    'claude code tutorial',
    'suno tutorial',
    'ai learning',
    'prompt engineering tutorial',
    'agentic workflows tutorial',
  ],
  path: '/learn',
})

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
