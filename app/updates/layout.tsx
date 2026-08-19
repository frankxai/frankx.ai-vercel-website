import { createMetadata, siteConfig } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'FrankX Changelog',
  description: 'FrankX updates now live in the canonical changelog and release ledger.',
  path: '/updates',
  canonical: `${siteConfig.url}/changelog`,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
