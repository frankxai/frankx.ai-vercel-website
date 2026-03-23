import { getVaultManifest, getCollections, formatBytes } from '@/lib/vault'
import { VaultAdminClient } from './VaultAdminClient'

export const metadata = {
  title: 'Vault Admin — Asset Management | FrankX',
  robots: { index: false, follow: false },
}

export default function VaultAdminPage() {
  const manifest = getVaultManifest()
  const allCollections = getCollections(true)

  return (
    <VaultAdminClient
      manifest={manifest}
      collections={allCollections}
    />
  )
}
