import registry from '@/data/products.graph.json'
import type { ProductConfig } from '@/lib/demand-capture/handler'

// data/products.graph.json is a copy of the estate registry rows for products this site sells.
// AGENTS.md section 5c: a product without a fresh PRODUCT-RELEASE-GATE PASS gets a waitlist,
// never a price or a checkout. The row's `gate` text is the only place that status is recorded.

type RegistryRow = (typeof registry.products)[number]

const rows = registry.products as RegistryRow[]

const rowFor = (id: unknown) => (typeof id === 'string' ? rows.find((row) => row.id === id) : undefined)

// Only a gate text that opens with a G5 PASS stamp (the price-evidence gate) lifts the hold.
// An intermediate pass such as "G1 PASS", or "G1 FAIL; earlier PASS revoked", does not.
const holdsGatePass = (row: RegistryRow) => /^G5\s+PASS\b/.test(row.gate.trim())

/** True while the product may only be offered through its waitlist: no price, no buy path. */
export function isWaitlistOnly(id: unknown): boolean {
  const row = rowFor(id)
  return Boolean(row && !holdsGatePass(row))
}

/** The registry row as the shared capture handler expects it, or undefined for an unknown id. */
export function waitlistProduct(id: unknown): ProductConfig | undefined {
  const row = rowFor(id)
  if (!row || !row.waitlist.enabled) return undefined
  return { id: row.id, stage: row.stage as ProductConfig['stage'], waitlist: row.waitlist }
}

export const waitlistIds = (): string[] => rows.filter((row) => row.waitlist.enabled).map((row) => row.id)

export const waitlistHref = (id: string) => `/waitlist/${id}`

export const NOT_PRICED_LABEL = 'Not priced yet'
