import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import SoulbookNavigation from '@/components/soulbook/SoulbookNavigation'

export const metadata: Metadata = {
  title: 'Soulbook | Transform Your Life Through the 7 Pillars',
  description: 'A transformative journey through 7 pillars of conscious living. Discover who you truly are and create the life you were born to live with the Soulbook framework.',
  openGraph: {
    title: 'Soulbook | Transform Your Life Through the 7 Pillars',
    description: 'A transformative journey through 7 pillars of conscious living. Discover who you truly are and create the life you were born to live.',
    images: [
      {
        url: 'https://frankx.ai/assets/soulbook-og.png',
        width: 1200,
        height: 630,
        alt: 'Soulbook - Transform Your Life',
      },
    ],
  },
}

export default function SoulbookLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <SoulbookNavigation />
      {children}
    </>
  )
}