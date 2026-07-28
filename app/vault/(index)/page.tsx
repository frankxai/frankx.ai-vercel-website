import type { Metadata } from 'next'

import { siteConfig } from '@/lib/seo'
import { getVaultManifest, getCollections, formatBytes } from '@/lib/vault'
import { VaultHubClient } from '../VaultHubClient'

const title = 'Visual Vault | AI Asset Library | FrankX'
const description =
  'Browse the FrankX visual asset library: AI-generated blog heroes, mascot concepts, ecosystem infographics, and architecture diagrams.'
const canonicalUrl = 'https://frankx.ai/vault'
const image = '/images/ecosystem/01-frankx-ecosystem-overview.png'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    siteName: 'FrankX',
    type: 'website',
    images: [{ url: image, width: 1200, height: 630, alt: 'FrankX Visual Vault' }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: siteConfig.twitter,
    title,
    description,
    images: [image],
  },
}

export default function VaultPage() {
  const manifest = getVaultManifest()
  const collections = getCollections()

  return (
    <VaultHubClient
      collections={collections}
      totalAssets={manifest.totalAssets}
      totalCollections={manifest.totalCollections}
      totalSize={manifest.totalSize}
      formats={manifest.formats}
    />
  )
}
