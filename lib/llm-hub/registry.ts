import registry from '@/data/model-registry.json'
import { CAPABILITIES, type Capability } from './capabilities'

type RawRegistry = typeof registry

export interface ModelEntry {
  /** Canonical routing slug = registry key (e.g. "gpt-5-2-pro"). */
  id: string
  /** Provider-facing versioned id (e.g. "gpt-5.2-pro"), if it differs from the key. */
  apiId?: string
  name: string
  organization: string
  family?: string
  released?: string
  status?: string
  architecture?: string
  parameters?: string
  context_window?: number
  context_window_beta?: number
  max_output_tokens?: number
  modalities?: string[]
  capabilities?: Capability[]
  pricing?: {
    input_per_1m?: number
    output_per_1m?: number
    [k: string]: unknown
  }
  benchmarks?: Record<string, number | string>
  key_capabilities?: string[]
  acos_tier?: string
  frankx_notes?: string
  sources?: string[]
  verification?: {
    last_verified?: string
    source_quality?: 'independent' | 'vendor-reported' | 'aggregated'
    independent_corroboration?: string[]
  }
}

export interface OrganizationEntry {
  slug: string
  name: string
  url: string
  models: string[]
  founded?: number
  headquarters?: string
  one_liner?: string
  flagship_model_id?: string
  capability_focus?: Capability[]
  agentic_platforms?: string[]
  pricing_tier_summary?: 'budget' | 'mid' | 'premium-mid' | 'premium' | 'open'
  accent_color?: string
  notable_tech?: string[]
}

export interface AgenticPlatformEntry {
  id: string
  name: string
  org: string
  type: string
  released?: string
  flagship_model_id?: string
  url?: string
  one_liner?: string
  tags?: string[]
}

export interface ProviderJoin {
  org: OrganizationEntry
  flagship?: ModelEntry
  models: ModelEntry[]
  platforms: AgenticPlatformEntry[]
}

const RAW = registry as unknown as RawRegistry & {
  organizations: Record<string, Omit<OrganizationEntry, 'slug'> & { slug?: string }>
  agentic_platforms?: Record<string, AgenticPlatformEntry>
  models: Record<string, ModelEntry>
}

function rawModels(): Record<string, ModelEntry> {
  return RAW.models as Record<string, ModelEntry>
}

/**
 * Canonicalize a model so its `id` is the registry KEY (the routing slug),
 * preserving the provider-facing versioned id as `apiId`. This keeps slugs,
 * editorial keys, comparisons, and the decision matrix all aligned on one
 * identifier regardless of how the vendor versions the model string.
 */
function normaliseModel(key: string, raw: ModelEntry): ModelEntry {
  return { ...raw, apiId: raw.id !== key ? raw.id : undefined, id: key }
}

export function getModel(idOrKey: string | undefined): ModelEntry | undefined {
  if (!idOrKey) return undefined
  const models = rawModels()
  if (models[idOrKey]) return normaliseModel(idOrKey, models[idOrKey])
  // Fallback: match by the provider-facing versioned id.
  const found = Object.entries(models).find(([, m]) => m.id === idOrKey)
  return found ? normaliseModel(found[0], found[1]) : undefined
}

export function getPlatform(id: string | undefined): AgenticPlatformEntry | undefined {
  if (!id) return undefined
  return (RAW.agentic_platforms || {})[id]
}

export function getAllModels(): ModelEntry[] {
  return Object.entries(rawModels()).map(([key, m]) => normaliseModel(key, m))
}

export function getAllPlatforms(): AgenticPlatformEntry[] {
  return Object.values(RAW.agentic_platforms || {})
}

function normaliseOrg(key: string, raw: OrganizationEntry): OrganizationEntry {
  return {
    ...raw,
    slug: raw.slug || key,
    models: raw.models || [],
    capability_focus: (raw.capability_focus || []) as Capability[],
    agentic_platforms: raw.agentic_platforms || [],
  }
}

export function getProviders(): ProviderJoin[] {
  return Object.entries(RAW.organizations).map(([key, raw]) => {
    const org = normaliseOrg(key, raw as OrganizationEntry)
    const modelsById = rawModels()
    const models = org.models
      .map((mid) => (modelsById[mid] ? normaliseModel(mid, modelsById[mid]) : undefined))
      .filter((m): m is ModelEntry => Boolean(m))
    const platforms = (org.agentic_platforms || [])
      .map((pid) => (RAW.agentic_platforms || {})[pid])
      .filter((p): p is AgenticPlatformEntry => Boolean(p))
    return {
      org,
      flagship: getModel(org.flagship_model_id),
      models,
      platforms,
    }
  })
}

export function getCapabilityGroups(): Array<{
  capability: Capability
  providers: ProviderJoin[]
}> {
  const all = getProviders()
  return (Object.keys(CAPABILITIES) as Capability[]).map((capability) => ({
    capability,
    providers: all.filter((p) => p.org.capability_focus?.includes(capability)),
  }))
}

export function formatContext(tokens?: number): string {
  if (!tokens) return '—'
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(tokens % 1_000_000 === 0 ? 0 : 1)}M`
  if (tokens >= 1_000) return `${(tokens / 1_000).toFixed(0)}K`
  return `${tokens}`
}

export function formatPricing(model?: ModelEntry): string {
  if (!model?.pricing) return '—'
  const inP = model.pricing.input_per_1m
  const outP = model.pricing.output_per_1m
  if (typeof inP === 'number' && typeof outP === 'number') {
    if (inP === 0 && outP === 0) return 'Open weights'
    return `$${inP}/$${outP}`
  }
  return '—'
}
