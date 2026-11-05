import { siteConfig, defaultTwitterImages, defaultOpenGraphImages } from '@/lib/seo'
import type { Metadata } from 'next'
import OpenSourceClient from './OpenSourceClient'

export const metadata: Metadata = {
  title: 'Open Source — FrankX Tools for the AI Community',
  description:
    'MIT-licensed tools built for the community: Starlight Swarm OS (3-layer multi-model swarm), Vital Intelligence MCP (health-aware AI), Sovereign Vault (sovereign knowledge), Starlight Router (multi-model AI).',
  openGraph: {
    images: defaultOpenGraphImages,
    title: 'Open Source — FrankX Tools for the AI Community',
    description:
      'Four production-ready tools. MIT licensed. Zero ops. Free forever.',
    url: `${siteConfig.url}/open-source`,
    siteName: 'FrankX',
    type: 'website',
  },
  twitter: {
    images: defaultTwitterImages,
    card: 'summary_large_image',
    title: 'Open Source — FrankX Tools for the AI Community',
    description:
      'Four production-ready tools. MIT licensed. Zero ops. Free forever.',
  },
}

export default function OpenSourcePage() {
  return <OpenSourceClient />
}
