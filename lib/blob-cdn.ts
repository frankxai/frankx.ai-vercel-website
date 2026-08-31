import manifest from './blob-assets-manifest.json'

export const FRANKX_BLOB_BASE_URL = 'https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com'

type ManifestEntry = {
  url: string
  downloadUrl: string
  sizeBytes: number
  contentType: string
  uploadedAt: string
}

const typedManifest = manifest as Record<string, ManifestEntry>

/**
 * Resolves an asset filename or path to its live AnyCast Vercel Blob CDN URL.
 * Falls back to the original relative path if not found in the Blob manifest.
 */
export function getBlobUrl(assetPathOrName: string): string {
  if (!assetPathOrName) return ''
  if (assetPathOrName.startsWith('http://') || assetPathOrName.startsWith('https://')) {
    return assetPathOrName
  }

  // Normalize key by stripping leading /downloads/ or /
  const cleanKey = assetPathOrName.replace(/^\/downloads\//, '').replace(/^\//, '')

  if (typedManifest[cleanKey]) {
    return typedManifest[cleanKey].url
  }

  // If already a downloads path, route directly through Vercel Blob AnyCast CDN
  if (assetPathOrName.startsWith('/downloads/')) {
    return `${FRANKX_BLOB_BASE_URL}${assetPathOrName}`
  }

  return assetPathOrName
}

/**
 * Resolves an asset to its direct force-download AnyCast URL (?download=1).
 */
export function getBlobDownloadUrl(assetPathOrName: string): string {
  if (!assetPathOrName) return ''
  const cleanKey = assetPathOrName.replace(/^\/downloads\//, '').replace(/^\//, '')

  if (typedManifest[cleanKey]) {
    return typedManifest[cleanKey].downloadUrl
  }

  const base = getBlobUrl(assetPathOrName)
  if (base.startsWith(FRANKX_BLOB_BASE_URL)) {
    return base.includes('?') ? `${base}&download=1` : `${base}?download=1`
  }

  return base
}

/**
 * Checks if a given asset is cataloged and synced in the Vercel Blob store.
 */
export function isBlobAsset(assetPathOrName: string): boolean {
  if (!assetPathOrName) return false
  const cleanKey = assetPathOrName.replace(/^\/downloads\//, '').replace(/^\//, '')
  return Boolean(typedManifest[cleanKey])
}
