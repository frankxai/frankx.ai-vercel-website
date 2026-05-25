import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'YouTube Strategy Guide | Build an AI-Powered Channel | FrankX',
  description: 'Step-by-step playbook for building a YouTube channel with AI tools. Define pillars, plan your calendar, script with Claude Code, clip with Opus Clip, and distribute everywhere.',
  path: '/youtube-strategy',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
