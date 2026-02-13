import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Vault | Exclusive Releases & Premium Content | FrankX',
  description: 'The FrankX Vault: exclusive AI music tracks, premium templates, and limited-access content for community members.',
  path: '/vault',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
