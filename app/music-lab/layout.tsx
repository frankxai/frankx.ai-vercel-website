import { siteConfig, defaultOpenGraphImages } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Music Lab — Browser Instruments, Guided Notes & Performance',
  description: 'Play responsive browser instruments, follow guided piano and violin notes, and practice timing with focused performance tools.',
  alternates: { canonical: './' },
  openGraph: {
    images: defaultOpenGraphImages,
    title: 'FrankX Music Lab',
    description: 'Play. Practice. Perform with responsive browser instruments and guided notes.',
    url: `${siteConfig.url}/music-lab`,
    type: 'website',
  },
}

export default function MusicLabLayout({ children }: { children: React.ReactNode }) {
  return children
}
