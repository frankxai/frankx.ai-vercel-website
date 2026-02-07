import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Changelog | Platform Updates & Release Notes | FrankX',
  description: 'Track every update to the FrankX platform. New features, improvements, and fixes documented with full release notes.',
  path: '/changelog',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
