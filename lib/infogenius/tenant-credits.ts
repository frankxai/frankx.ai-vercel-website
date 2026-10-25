/**
 * lib/infogenius/tenant-credits.ts
 *
 * Multi-Tenant Credit Wallet, Brand Preset Vault, and Persistent Gallery
 * backed by Upstash Redis REST API (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN)
 * with deterministic in-memory fallback for local development and tests.
 */

export type TenantPlanTier = 'free' | 'starter-credits' | 'pro-os' | 'enterprise-team'

export interface TenantGalleryItem {
  id: string
  topic: string
  style: string
  aspectRatio: string
  imageSize: string
  imageUrl: string
  provenanceUrl?: string
  createdAt: string
  creditsSpent: number
}

export interface TenantBrandPreset {
  key: string
  name: string
  palette: string[]
  instruction: string
  updatedAt: string
}

export interface TenantCreditWallet {
  tenantId: string
  plan: TenantPlanTier
  creditsRemaining: number
  creditsUsed: number
  totalPurchasedCredits: number
  customBrandPresets: TenantBrandPreset[]
  gallery: TenantGalleryItem[]
  updatedAt: string
}

export const CREDIT_COSTS = {
  architectGrounded: 1,
  infographic2K: 5,
  infographic4K: 8,
  slidePack5: 15,
  narrationTts: 2,
} as const

export const CREDIT_PACK_CATALOG = {
  'infogenius-credits-100': {
    id: 'infogenius-credits-100',
    name: 'InfoGenius Starter Credit Pack (100 Credits)',
    credits: 100,
    priceUsd: 19,
    planUpgrade: 'starter-credits' as TenantPlanTier,
    description: '20 grounded 2K infographics or 6 complete 5-slide article packs via managed Vercel AI Gateway.',
  },
  'infogenius-pro': {
    id: 'infogenius-pro',
    name: 'InfoGenius Visual Knowledge OS — Pro Pack (350 Credits + MCP/CLI)',
    credits: 350,
    priceUsd: 49,
    planUpgrade: 'pro-os' as TenantPlanTier,
    description: '70 grounded 2K infographics + standalone Claude Code / Cursor MCP Server + 18 Brand Presets.',
  },
  'infogenius-team-1000': {
    id: 'infogenius-team-1000',
    name: 'InfoGenius Team Studio Pack (1,000 Credits + Custom Brand Vault)',
    credits: 1000,
    priceUsd: 129,
    planUpgrade: 'enterprise-team' as TenantPlanTier,
    description: '200 grounded 2K/4K infographics, shared team tenant ID, and persistent Vercel Blob CDN gallery.',
  },
} as const

const memoryStore = new Map<string, TenantCreditWallet>()

export function sanitizeTenantId(raw: unknown): string {
  const str = typeof raw === 'string' ? raw.trim() : ''
  if (!str) return 'demo-public-workspace'
  const cleaned = str.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64)
  return cleaned || 'demo-public-workspace'
}

function redisKey(tenantId: string): string {
  return `infogenius:tenant:v1:${sanitizeTenantId(tenantId)}`
}

async function upstashCommand<T = unknown>(command: string[]): Promise<T | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim()
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  if (!url || !token) return null

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) return null
    const data = (await res.json()) as { result?: T }
    return data.result ?? null
  } catch {
    return null
  }
}

function createDefaultWallet(tenantId: string): TenantCreditWallet {
  const cleanId = sanitizeTenantId(tenantId)
  // Every new workspace gets 15 starter trial credits (3 full 2K infographics) so visitors can test managed generation immediately
  return {
    tenantId: cleanId,
    plan: 'free',
    creditsRemaining: 15,
    creditsUsed: 0,
    totalPurchasedCredits: 0,
    customBrandPresets: [],
    gallery: [],
    updatedAt: new Date().toISOString(),
  }
}

export async function getTenantWallet(tenantId: string): Promise<TenantCreditWallet> {
  const cleanId = sanitizeTenantId(tenantId)
  const key = redisKey(cleanId)

  const rawRedis = await upstashCommand<string>(['GET', key])
  if (rawRedis && typeof rawRedis === 'string') {
    try {
      return JSON.parse(rawRedis) as TenantCreditWallet
    } catch {
      // fall through
    }
  }

  const existing = memoryStore.get(cleanId)
  if (existing) return existing

  const fresh = createDefaultWallet(cleanId)
  memoryStore.set(cleanId, fresh)
  await upstashCommand(['SET', key, JSON.stringify(fresh)])
  return fresh
}

export async function saveTenantWallet(wallet: TenantCreditWallet): Promise<TenantCreditWallet> {
  const cleanId = sanitizeTenantId(wallet.tenantId)
  const updated: TenantCreditWallet = {
    ...wallet,
    tenantId: cleanId,
    updatedAt: new Date().toISOString(),
  }
  memoryStore.set(cleanId, updated)
  await upstashCommand(['SET', redisKey(cleanId), JSON.stringify(updated)])
  return updated
}

export async function consumeTenantCredits(
  tenantId: string,
  cost: number,
  reason: string
): Promise<{ ok: boolean; wallet: TenantCreditWallet; error?: string }> {
  const wallet = await getTenantWallet(tenantId)
  if (wallet.creditsRemaining < cost) {
    return {
      ok: false,
      wallet,
      error: `Insufficient credits (${wallet.creditsRemaining} available, ${cost} required for ${reason}). Top up a Credit Pack or connect your own BYOK API key.`,
    }
  }

  wallet.creditsRemaining -= cost
  wallet.creditsUsed += cost
  const saved = await saveTenantWallet(wallet)
  return { ok: true, wallet: saved }
}

export async function creditTenantWallet(
  tenantId: string,
  creditsToAdd: number,
  planUpgrade?: TenantPlanTier
): Promise<TenantCreditWallet> {
  const wallet = await getTenantWallet(tenantId)
  wallet.creditsRemaining += Math.max(0, creditsToAdd)
  wallet.totalPurchasedCredits += Math.max(0, creditsToAdd)
  if (planUpgrade) {
    wallet.plan = planUpgrade
  }
  return saveTenantWallet(wallet)
}

export async function appendTenantGalleryItem(
  tenantId: string,
  item: TenantGalleryItem
): Promise<TenantCreditWallet> {
  const wallet = await getTenantWallet(tenantId)
  wallet.gallery = [item, ...(wallet.gallery || [])].slice(0, 25)
  return saveTenantWallet(wallet)
}

export async function saveTenantBrandPreset(
  tenantId: string,
  preset: TenantBrandPreset
): Promise<TenantCreditWallet> {
  const wallet = await getTenantWallet(tenantId)
  const existingIdx = (wallet.customBrandPresets || []).findIndex((p) => p.key === preset.key)
  if (existingIdx >= 0) {
    wallet.customBrandPresets[existingIdx] = preset
  } else {
    wallet.customBrandPresets = [preset, ...(wallet.customBrandPresets || [])].slice(0, 20)
  }
  return saveTenantWallet(wallet)
}
