export const FOUNDER_IDENTITY_VERSION = '0.1.0' as const
export type BrandId = 'frankx' | 'starlight' | 'arcanea' | 'gencreator'
export type Placement = 'signature' | 'presence' | 'package' | 'attribution'

export interface PublicRendition {
  id: string
  characterId: 'host.frank'
  sourceSha256: string
  sha256: string
  src: string
  width: number
  height: number
  alt: string
  identityStatus: 'canonical' | 'approved-variant' | 'proposal' | 'rejected'
  rights: 'owned' | 'licensed' | 'pending'
  rightsEvidenceRef: string | null
  release: { status: 'approved' | 'pending'; approvedSha256: string | null; decisionRef: string | null }
  brands: BrandId[]
  placements: Placement[]
}

export interface ReleaseManifest {
  schemaVersion: 1
  version: string
  characterId: 'host.frank'
  referenceRevision: string
  publicRenditions: PublicRendition[]
}

const sha256 = /^[a-f0-9]{64}$/

/** Release checks never promote identity-reference approval into publication approval. */
export function isPublicRendition(asset: PublicRendition, brand: BrandId, placement: Placement): boolean {
  return asset.characterId === 'host.frank' &&
    ['canonical', 'approved-variant'].includes(asset.identityStatus) &&
    ['owned', 'licensed'].includes(asset.rights) &&
    Boolean(asset.rightsEvidenceRef?.trim()) &&
    asset.release.status === 'approved' &&
    asset.release.approvedSha256 === asset.sha256 &&
    Boolean(asset.release.decisionRef?.trim()) &&
    sha256.test(asset.sha256) && sha256.test(asset.sourceSha256) &&
    asset.src === `/images/founder-identity/${asset.sha256}.webp` &&
    Number.isInteger(asset.width) && asset.width > 0 &&
    Number.isInteger(asset.height) && asset.height > 0 &&
    Boolean(asset.alt.trim()) && asset.brands.includes(brand) && asset.placements.includes(placement)
}

export function resolvePublicRendition(manifest: ReleaseManifest, id: string | undefined, brand: BrandId, placement: Placement): PublicRendition | null {
  if (manifest.schemaVersion !== 1 || manifest.characterId !== 'host.frank' || !id) return null
  const matches = manifest.publicRenditions.filter(asset => asset.id === id)
  return matches.length === 1 && isPublicRendition(matches[0], brand, placement) ? matches[0] : null
}

export interface FounderBrand {
  id: BrandId
  name: string
  founderName: string
  role: string
  description: string
  storyHref: string
  storyLabel: string
  contactHref: string
  trustLinks: { label: string; href: string }[]
}

export interface PackageContent {
  id: string
  name: string
  audience: string | null
  includes: string[]
  limitations: string[]
  availability: 'available' | 'preview' | 'waitlist' | 'application'
  price: { display: string; cadence: string; taxNote: string | null } | null
  evidenceRef: string
  detailsHref: string
}

export function validatePackageContent(content: PackageContent): string[] {
  const errors: string[] = []
  if (!content.id.trim() || !content.name.trim()) errors.push('Package identity is required')
  if (!content.evidenceRef.trim()) errors.push('Package evidence is required')
  if (!content.limitations.length || content.limitations.some(x => !x.trim())) errors.push('Actual limitations are required')
  if (content.includes.some(x => !x.trim())) errors.push('Empty inclusion')
  if (!['available', 'preview', 'waitlist', 'application'].includes(content.availability)) errors.push('Invalid availability')
  if (!/^\/(?!\/)/.test(content.detailsHref)) errors.push('Package details must use an existing local route')
  if (content.price && (!content.price.display.trim() || !content.price.cadence.trim())) errors.push('Price and cadence must be explicit')
  return errors
}
