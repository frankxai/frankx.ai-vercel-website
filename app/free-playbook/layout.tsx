import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Free AI Playbook | Getting Started with Agentic AI | FrankX',
  description: 'Free guide to building with agentic AI. Covers agent architectures, prompt engineering basics, and your first AI workflow — no signup required.',
  path: '/free-playbook',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
