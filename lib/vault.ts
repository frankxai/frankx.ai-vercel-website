import manifestData from '@/data/vault-manifest.json'
import type { VaultManifest, VaultCollection, VaultAsset } from './vault-types'

const manifest = manifestData as unknown as VaultManifest

export function getVaultManifest(): VaultManifest {
  return manifest
}

export function getCollections(includeHidden = false): VaultCollection[] {
  return manifest.collections
    .filter(c => includeHidden || !c.hidden)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getCollection(id: string): VaultCollection | undefined {
  return manifest.collections.find(c => c.id === id)
}

export function getAllAssets(includeHidden = false): VaultAsset[] {
  return manifest.collections
    .filter(c => includeHidden || !c.hidden)
    .flatMap(c => c.assets)
}

export function searchAssets(query: string): VaultAsset[] {
  const q = query.toLowerCase()
  return getAllAssets(true).filter(
    a =>
      a.title.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q)) ||
      a.collection.toLowerCase().includes(q) ||
      a.filename.toLowerCase().includes(q)
  )
}

export function getFeaturedAssets(): VaultAsset[] {
  return getAllAssets().filter(a => a.featured)
}

export function getFormatStats(): Record<string, number> {
  return manifest.formats
}

export function getCollectionIds(includeHidden = false): string[] {
  return getCollections(includeHidden).map(c => c.id)
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB'
  return (bytes / 1073741824).toFixed(1) + ' GB'
}
