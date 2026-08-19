import type { Metadata } from 'next'

import Dream100Cockpit from './Dream100Cockpit'

export const metadata: Metadata = {
  title: 'Dream 100 cockpit · FrankX',
  description: 'Private contribution and relationship operating surface.',
  robots: { index: false, follow: false },
}

export default function Dream100AdminPage() {
  return <Dream100Cockpit />
}

