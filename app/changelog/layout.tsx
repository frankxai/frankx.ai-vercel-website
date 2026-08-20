import type { Metadata } from 'next'

import { createMetadata } from '@/lib/seo'

const baseMetadata = createMetadata({
  title: 'Changelog | Verified FrankX Releases',
  description: 'Meaningful FrankX releases explained in plain language, with dates, outcomes, and public GitHub evidence.',
  path: '/changelog',
})

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    ...baseMetadata.alternates,
    types: {
      'application/rss+xml': '/changelog/rss.xml',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
