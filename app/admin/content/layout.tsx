import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Content Command Center | FrankX Admin',
  description: 'Content strategy, publishing pipeline, and social distribution command center.',
  path: '/admin/content',
})

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return children
}
