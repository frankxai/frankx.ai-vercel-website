import type { Metadata } from 'next'

import vaultManifest from '@/data/vault-manifest.json'

const { totalAssets, totalCollections } = vaultManifest

export const metadata: Metadata = {
  title: 'ArcaneaVault — Visual Asset Library | FrankX',
  description: `Browse ${totalAssets.toLocaleString('en-US')} AI-generated visual assets across ${totalCollections} collections — blog heroes, mascot concepts, ecosystem infographics, architecture diagrams, and more.`,
  openGraph: {
    title: 'ArcaneaVault — Visual Asset Library',
    description: `The complete visual asset library for the FrankX ecosystem. ${totalAssets.toLocaleString('en-US')} assets. ${totalCollections} collections.`,
    images: ['/images/ecosystem/01-frankx-ecosystem-overview.png'],
  },
}

export default function VaultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
