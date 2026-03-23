import { getVaultManifest, getCollections, formatBytes } from '@/lib/vault'
import { VaultHubClient } from './VaultHubClient'

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
