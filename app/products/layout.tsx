import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Products for the Agentic Builder',
  description: 'Templates, playbooks, systems, sprints, and advisory offers for builders turning AI into business infrastructure, creative output, and cloud-native execution.',
  path: '/products',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
