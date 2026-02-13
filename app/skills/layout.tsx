import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Skills | AI Agent Capabilities & Skill Library | FrankX',
  description: 'Browse 630+ AI agent skills across architecture, music production, content creation, and more. The complete ACOS skill library.',
  path: '/skills',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
