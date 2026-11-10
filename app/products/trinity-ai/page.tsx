import { siteConfig, defaultTwitterImages, defaultOpenGraphImages } from '@/lib/seo'
import type { Metadata } from 'next'
import TrinityProductClient from './TrinityProductClient'

export const metadata: Metadata = {
  title: 'Trinity AI — Conscious Operating System for Human Potential',
  description:
    'A living intelligence layer that knows your mind, reads your body, and compounds everything you are. Five system layers. One unified architecture.',
  openGraph: {
    images: defaultOpenGraphImages,
    title: 'Trinity AI — Conscious Operating System for Human Potential',
    description:
      'A living intelligence layer that knows your mind, reads your body, and compounds everything you are.',
    url: `${siteConfig.url}/products/trinity-ai`,
    siteName: 'FrankX',
    type: 'website',
  },
  twitter: {
    images: defaultTwitterImages,
    card: 'summary_large_image',
    title: 'Trinity AI — Conscious Operating System for Human Potential',
    description:
      'A living intelligence layer that knows your mind, reads your body, and compounds everything you are.',
  },
}

export default function TrinityAIProductPage() {
  return <TrinityProductClient />
}
