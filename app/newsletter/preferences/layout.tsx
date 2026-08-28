import type { ReactNode } from 'react'

import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Email Preferences',
  description:
    'Confirm ownership and manage the complete set of FrankX newsletter topics you want to receive.',
  path: '/newsletter/preferences',
  noindex: true,
})

export default function NewsletterPreferencesLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
