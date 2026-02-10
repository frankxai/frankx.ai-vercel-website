import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Resources | Templates, Guides & Tools | FrankX',
  description: 'Free and premium resources for AI architects and creators. Templates, playbooks, assessments, and technical guides.',
  path: '/resources',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
