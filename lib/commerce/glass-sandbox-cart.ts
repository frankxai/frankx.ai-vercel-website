import { createHmac } from 'node:crypto'
import { z } from 'zod'
import type { ProductRecord } from '@/types/products'
import { glassPublicManifest } from './glass-edition'

const selection = z.strictObject({
  schema: z.literal('starlight.glass.cart-request.v1'),
  item: z.strictObject({ productId: z.literal('aurora-ui-kit'), edition: z.literal('essential'), quantity: z.literal(1) }),
})

// This record is supplied exclusively by the server host after authenticating the person
// and loading their explicit test-cart decision. It is never parsed out of agent arguments.
const approvedDecision = z.strictObject({
  purpose: z.literal('prepare-nonbinding-test-cart'), actor: z.literal('human'), mode: z.literal('test'),
  channel: z.literal('frankx-owned-web-sandbox'), scope: z.literal('personal'),
  subjectId: z.string().regex(/^[A-Za-z0-9][A-Za-z0-9:_-]{0,127}$/), tenantId: z.string().min(1).max(128),
  // Random per-decision nonce, generated and persisted by the host. Never returned or used as payment authority.
  nonce: z.string().regex(/^[0-9a-f]{64}$/),
  acceptedAt: z.iso.datetime({ precision: 3 }), expiresAt: z.iso.datetime({ precision: 3 }),
  productId: z.literal('aurora-ui-kit'), edition: z.literal('essential'), quantity: z.literal(1),
  artifactSha256: z.string().regex(/^[0-9a-f]{64}$/), draftTermsSha256: z.string().regex(/^[0-9a-f]{64}$/),
  amountMinor: z.number().int().positive(), currency: z.literal('EUR'),
})

type Host = { products: readonly ProductRecord[]; decision: z.input<typeof approvedDecision> | null }
const unavailable = { ok: false, reason: 'cart-unavailable' } as const
const maxDecisionMs = 15 * 60_000

/** Pure server-side preparation. No provider, network, ledger, inventory or session operations. */
export function prepareGlassSandboxCart(input: unknown, host: Host) {
  const request = selection.safeParse(input)
  const decision = approvedDecision.safeParse(host.decision)
  if (!request.success || !decision.success) return unavailable
  const allowed = decision.data
  const now = Date.now()
  const accepted = Date.parse(allowed.acceptedAt)
  const expires = Date.parse(allowed.expiresAt)
  if (allowed.subjectId !== allowed.tenantId || accepted > now || expires <= now || expires - accepted > maxDecisionMs) return unavailable

  const manifest = glassPublicManifest(host.products)
  if (!manifest) return unavailable
  const archive = manifest.assets.find(asset => asset.kind === 'archive')
  const price = manifest.commerce.priceHypothesis
  if (!archive || allowed.artifactSha256 !== archive.sha256 || allowed.draftTermsSha256 !== manifest.license.draft.sha256
    || allowed.amountMinor !== price.amountMinor || allowed.currency !== price.currency) return unavailable

  const reference = createHmac('sha256', Buffer.from(allowed.nonce, 'hex'))
    .update(JSON.stringify(['starlight.glass.sandbox-cart.v1', allowed.channel, allowed.subjectId, allowed.acceptedAt,
      allowed.expiresAt, allowed.productId, allowed.edition, allowed.quantity, archive.sha256, allowed.draftTermsSha256,
      price.amountMinor, price.currency]))
    .digest('base64url')
  return {
    ok: true, schema: 'starlight.glass.sandbox-cart.v1', reference, expiresAt: allowed.expiresAt,
    item: request.data.item, release: manifest.release, archiveSha256: archive.sha256,
    proposedSubtotal: price, tax: null, payableTotal: null, terms: manifest.license,
    availability: 'sandbox-rehearsal-only', checkoutAuthorized: false,
  } as const
}
