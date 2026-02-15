// ── ArcaneaVault Type Definitions ────────────────────────────────────────────

export interface VaultAsset {
  id: string
  filename: string
  src: string
  thumbnail: string | null
  collection: string
  format: string
  width: number | null
  height: number | null
  fileSize: number
  title: string
  tags: string[]
  model?: string
  featured?: boolean
  createdAt?: string
  prompt?: string
}

export interface VaultCollection {
  id: string
  name: string
  description: string
  count: number
  coverImage: string
  accent: string
  borderAccent: string
  sortOrder: number
  hidden?: boolean
  assets: VaultAsset[]
}

export interface VaultManifest {
  version: string
  generatedAt: string
  totalAssets: number
  totalCollections: number
  totalSize: number
  formats: Record<string, number>
  collections: VaultCollection[]
}
