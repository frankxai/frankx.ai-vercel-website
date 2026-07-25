import type { Metadata } from 'next'

import { getVaultManifest, getCollections, formatBytes } from '@/lib/vault'
import { VaultHubClient } from './VaultHubClient'

export const metadata: Metadata = {
  title: { absolute: 'Visual Vault | AI Asset Library | FrankX' },
  alternates: {
    canonical: 'https://frankx.ai/vault',
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
