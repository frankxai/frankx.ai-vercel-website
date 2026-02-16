import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import SoulbookNavigation from '@/components/soulbook/SoulbookNavigation'

export const metadata: Metadata = {
  title: 'Soulbook | 7 Pillars of a Complete Life — Free Framework',
  description: 'A practical framework for building every dimension of your life: Energy, Mind, Soul, Craft, Capital, Circle, Legacy. 11 books, 82 chapters, all free to read.',
  openGraph: {
    title: 'Soulbook | 7 Pillars of a Complete Life',
    description: 'A practical framework for building every dimension of your life. 11 books, 82 chapters, all free to read.',
    images: [
      {
        url: 'https://frankx.ai/assets/soulbook-og.png',
        width: 1200,
        height: 630,
        alt: 'Soulbook — 7 Pillars Framework',
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