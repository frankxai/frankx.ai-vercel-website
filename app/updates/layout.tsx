import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Updates | Latest News & Announcements | FrankX',
  description: 'Stay current with FrankX platform updates, new features, product launches, and community announcements.',
  path: '/updates',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
