import type { Metadata } from 'next'
import StackGalleryClient from './StackGalleryClient'

export const metadata: Metadata = {
  title: 'The FrankX Stack — Curated AI Tools, Agents & Infrastructure (2026)',
  description:
    'Hand-curated gallery of the best AI tools, agent frameworks, outbound intelligence, and infrastructure I use and recommend. Battle-tested picks across modern engineering, media, and growth.',
  alternates: {
    canonical: 'https://frankx.ai/stack',
  },
  openGraph: {
    title: 'The FrankX Stack — Curated AI Tools, Agents & Infrastructure (2026)',
    description:
      'Hand-curated gallery of the best AI tools, agent frameworks, outbound intelligence, and infrastructure — 2026 edition.',
    url: 'https://frankx.ai/stack',
    siteName: 'FrankX',
    type: 'website',
    images: [
      {
        url: '/og/stack.png',
        width: 1200,
        height: 630,
        alt: 'The FrankX Stack — 2026 Edition',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The FrankX Stack — 2026 Edition',
    description:
      'Hand-curated AI tools, agent frameworks, and sovereign infrastructure I actually use and recommend.',
  },
}

export default function StackPage() {
  return <StackGalleryClient />
}
