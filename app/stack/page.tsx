import type { Metadata } from 'next'
import StackGalleryClient from './StackGalleryClient'

export const metadata: Metadata = {
  title: 'The FrankX Stack — Curated AI Tools & Templates (April 2026)',
  description:
    'Hand-curated gallery of the best AI tools, templates, and infrastructure I use and recommend in April 2026. Battle-tested picks across templates, agents, infra, databases, and dev tools.',
  alternates: {
    canonical: 'https://frankx.ai/stack',
  },
  openGraph: {
    title: 'The FrankX Stack — Curated AI Tools & Templates',
    description:
      'Hand-curated gallery of the best AI tools, templates, and infrastructure — April 2026 edition.',
    url: 'https://frankx.ai/stack',
    siteName: 'FrankX',
    type: 'website',
    images: [
      {
        url: '/og/stack.png',
        width: 1200,
        height: 630,
        alt: 'The FrankX Stack — April 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The FrankX Stack — April 2026',
    description:
      'Hand-curated AI tools, templates, and infrastructure I actually use and recommend.',
  },
}

export default function StackPage() {
  return <StackGalleryClient />
}
