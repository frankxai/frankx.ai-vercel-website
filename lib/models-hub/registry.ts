/**
 * Multimodal generative-model registry helpers (/models).
 * Source of truth: data/generative-model-registry.json.
 * Text LLMs live in the separate model-registry.json (/llm-hub).
 */

import registry from '@/data/generative-model-registry.json'

export type GenCategory = 'image' | 'video' | 'audio' | 'voice' | 'embedding' | 'world'

export const CATEGORY_ORDER: GenCategory[] = ['image', 'video', 'audio', 'voice', 'embedding', 'world']

export interface CategoryMeta {
  id: GenCategory
  label: string
  tagline: string
  blurb: string
  accent: string
  query: string
}

export interface AccessLink {
  name: string
  url: string
}

export interface GenOrg {
  slug: string
  name: string
  url: string
  accent_color: string
}

export interface GenModel {
  id: string
  name: string
  category: GenCategory
  organization: string
  released?: string
  status?: string
  io?: string
  license?: string
  tagline?: string
  best_for?: string[]
  watch_out?: string
  pricing_note?: string
  access?: AccessLink[]
  highlight?: string
  frankx_note?: string
  sources?: string[]
}

interface RawRegistry {
  categories: Record<string, Omit<CategoryMeta, 'id'>>
  organizations: Record<string, Omit<GenOrg, 'slug'>>
  models: Record<string, Omit<GenModel, 'id'>>
}

const RAW = registry as unknown as RawRegistry

export function getCategories(): CategoryMeta[] {
  return CATEGORY_ORDER.filter((id) => RAW.categories[id]).map((id) => ({
    id,
    ...RAW.categories[id],
  }))
}

export function getCategory(id: string | undefined): CategoryMeta | undefined {
  if (!id || !RAW.categories[id]) return undefined
  return { id: id as GenCategory, ...RAW.categories[id] }
}

export function getOrg(slug: string | undefined): GenOrg | undefined {
  if (!slug || !RAW.organizations[slug]) return undefined
  return { slug, ...RAW.organizations[slug] }
}

export function getGenModel(id: string | undefined): GenModel | undefined {
  if (!id || !RAW.models[id]) return undefined
  return { id, ...RAW.models[id] } as GenModel
}

export function getAllGenModels(): GenModel[] {
  return Object.entries(RAW.models).map(([id, m]) => ({ id, ...m }) as GenModel)
}

export function getGenModelsByCategory(category: string): GenModel[] {
  return getAllGenModels().filter((m) => m.category === category)
}

export function categoryAccent(category: string): string {
  return RAW.categories[category]?.accent || '#10b981'
}

export function orgAccent(slug: string): string {
  return RAW.organizations[slug]?.accent_color || '#a855f7'
}

export function orgName(slug: string): string {
  return RAW.organizations[slug]?.name || slug
}

export interface GenRow {
  id: string
  name: string
  category: GenCategory
  categoryLabel: string
  categoryAccent: string
  org: string
  orgAccent: string
  released: string
  status: string
  license: string
  pricingNote: string
  highlight: string
}

/** Serializable rows for the client GenModelExplorer. */
export function buildGenRows(): GenRow[] {
  return getAllGenModels().map((m) => ({
    id: m.id,
    name: m.name,
    category: m.category,
    categoryLabel: RAW.categories[m.category]?.label || m.category,
    categoryAccent: categoryAccent(m.category),
    org: orgName(m.organization),
    orgAccent: orgAccent(m.organization),
    released: m.released || '',
    status: m.status || '',
    license: m.license || '',
    pricingNote: m.pricing_note || '',
    highlight: m.highlight || m.tagline || '',
  }))
}
