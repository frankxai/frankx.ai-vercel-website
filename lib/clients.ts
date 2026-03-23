import clientsData from '@/data/clients.json'

// ── Types ──────────────────────────────────────────────────────────────────

export type ServiceTier = 'diy' | 'launch' | 'managed' | 'full'

export interface ClientBranding {
  primaryColor: string
  accentColor: string
  tagline: string
  logo: string | null
}

export interface ClientCommerce {
  lemonSqueezyStoreId: string | null
  resendAudienceId: string | null
  revenueSplit: [number, number] // [artistPercent, platformPercent]
}

export interface ClientSocial {
  suno?: string
  twitter?: string
  github?: string
  instagram?: string
  tiktok?: string
  youtube?: string
  spotify?: string
}

export interface ClientInventory {
  musicFile: string
  albumsFile: string
}

export interface Client {
  id: string
  artistName: string
  email: string
  tier: ServiceTier
  status: 'active' | 'onboarding' | 'paused' | 'churned'
  subdomain: string | null
  isOwner?: boolean
  branding: ClientBranding
  commerce: ClientCommerce
  social: ClientSocial
  inventory: ClientInventory
  createdAt: string
  onboardedAt: string | null
}

export interface ServiceTierConfig {
  name: string
  price: number
  recurring?: string | number
  setupFee?: boolean
  revenueSplit: [number, number]
}

// ── Data Access ────────────────────────────────────────────────────────────

const clients = clientsData.clients as Client[]
const tiers = clientsData._serviceTiers as unknown as Record<string, ServiceTierConfig>

const DEFAULT_CLIENT_ID = 'frankx'

export function getAllClients(): Client[] {
  return clients
}

export function getActiveClients(): Client[] {
  return clients.filter((c) => c.status === 'active')
}

export function getClientById(id: string): Client | undefined {
  return clients.find((c) => c.id === id)
}

export function getClientBySubdomain(subdomain: string): Client | undefined {
  return clients.find((c) => c.subdomain === subdomain)
}

export function getDefaultClient(): Client {
  const owner = clients.find((c) => c.isOwner)
  return owner || clients[0]
}

export function getClientOrDefault(clientId?: string): Client {
  if (!clientId) return getDefaultClient()
  return getClientById(clientId) || getDefaultClient()
}

// ── Tier Info ──────────────────────────────────────────────────────────────

export function getServiceTiers(): Record<string, ServiceTierConfig> {
  return tiers
}

export function getServiceTier(tier: ServiceTier): ServiceTierConfig | undefined {
  return tiers[tier]
}

// ── Inventory Paths ────────────────────────────────────────────────────────

export function getClientMusicPath(clientId: string): string {
  const client = getClientById(clientId)
  return client?.inventory.musicFile || `data/inventories/${clientId}/music.json`
}

export function getClientAlbumsPath(clientId: string): string {
  const client = getClientById(clientId)
  return client?.inventory.albumsFile || `data/inventories/${clientId}/albums.json`
}

// ── Commerce Helpers ───────────────────────────────────────────────────────

export function getRevenueSplit(clientId: string): [number, number] {
  const client = getClientById(clientId)
  if (!client) return [100, 0]
  return client.commerce.revenueSplit
}

export function calculatePayout(totalAmount: number, clientId: string): { artist: number; platform: number } {
  const [artistPercent, platformPercent] = getRevenueSplit(clientId)
  return {
    artist: Math.round(totalAmount * (artistPercent / 100) * 100) / 100,
    platform: Math.round(totalAmount * (platformPercent / 100) * 100) / 100,
  }
}

// ── Stats ──────────────────────────────────────────────────────────────────

export function getClientStats() {
  return {
    total: clients.length,
    active: clients.filter((c) => c.status === 'active').length,
    onboarding: clients.filter((c) => c.status === 'onboarding').length,
    tiers: {
      diy: clients.filter((c) => c.tier === 'diy').length,
      launch: clients.filter((c) => c.tier === 'launch').length,
      managed: clients.filter((c) => c.tier === 'managed').length,
      full: clients.filter((c) => c.tier === 'full').length,
    },
  }
}
