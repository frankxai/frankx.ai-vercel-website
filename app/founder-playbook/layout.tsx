import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Founder Playbook | AI-First Business Building Guide | FrankX',
  description: 'The complete playbook for building an AI-first business. Strategy, systems, tools, and frameworks for solo founders and small teams.',
  path: '/founder-playbook',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
