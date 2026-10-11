import 'server-only'
import packet from '@/data/research/dossier-candidates.json'
import { canReviewDossiers } from './dossier-policy.mjs'

export interface DossierSource {
  id: string
  title: string
  publisher: string
  url: string
  type: string
  accessedAt: string
  publishedAt: string | null
  version: string
  locators: string[]
  limitations: string[]
}
export interface DossierMedia {
  id: string
  type: 'image' | 'video' | 'youtube' | 'link'
  url: string
  embedUrl?: string
  sourceId: string
  sourceUrl: string
  publisher: string
  title: string
  width?: number
  height?: number
  alt?: string
  description: string
  rightsStatus: string
  license?: string
  licenseUrl?: string
}
export interface DossierParagraph {
  id: string
  text: string
  kind: 'analysis' | 'documented' | 'measured'
  sourceIds: string[]
}
export interface ResearchDossier {
  slug: string
  title: string
  description: string
  abstract: string
  decision: string
  category: string
  reviewStatus: 'editorial-candidate'
  reviewedAt: string
  method: string
  limitations: string[]
  related: { slug: string; reason: string }[]
  sections: {
    id: string
    title: string
    paragraphs: DossierParagraph[]
    table?: { caption: string; headings: string[]; rows: { id: string; cells: string[]; sourceIds: string[] }[] }
    code?: string
    mediaIds: string[]
  }[]
}

export const dossierCandidates = packet.dossiers as ResearchDossier[]
export const dossierSources = packet.sources as DossierSource[]
export const dossierMedia = packet.media as DossierMedia[]

// Editorial candidates are reviewable in development and Vercel previews only.
// Production remains on the existing human-attested publication gate. No flag
// or inferred approval promotes these candidates into public research.
export const dossierReviewPreview = canReviewDossiers(process.env)

export function getReviewDossier(slug: string) {
  return dossierReviewPreview ? dossierCandidates.find((dossier) => dossier.slug === slug) : undefined
}

export function sourcesForDossier(dossier: ResearchDossier) {
  const ids = new Set(dossier.sections.flatMap((section) => [
    ...section.paragraphs.flatMap((paragraph) => paragraph.sourceIds),
    ...(section.table?.rows.flatMap((row) => row.sourceIds) ?? []),
    ...section.mediaIds.flatMap((id) => dossierMedia.find((media) => media.id === id)?.sourceId ?? []),
  ]))
  return dossierSources.filter((source) => ids.has(source.id))
}

export function dossierReadingMinutes(dossier: ResearchDossier) {
  const words = dossier.sections.flatMap((section) => section.paragraphs.map((p) => p.text)).join(' ').split(/\s+/).length
  return Math.ceil(words / 220)
}
