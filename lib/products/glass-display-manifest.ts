import { z } from 'zod'

// Read only the public fields rendered here. The edition service owns the
// authoritative schema and product; a changed release needs a matching specimen.
const digest = z.string().regex(/^[a-f0-9]{64}$/)
export const responseShape = z.object({
  schema: z.literal('starlight.glass.product-manifest.v1'),
  product: z.object({ id: z.literal('aurora-ui-kit'), edition: z.literal('essential'), title: z.string().min(1).max(120) }),
  release: z.object({ version: z.string().max(64), sourceRevision: z.literal('bf3d078d6f66afb37eb0e3f2d81fb4cb5569b00c'), state: z.literal('review-candidate') }),
  assets: z.array(z.object({ kind: z.string(), bytes: z.number().int().positive(), entries: z.number().int().positive().optional(), sha256: digest })).max(8),
  license: z.object({ source: z.literal('UNLICENSED'), operativeGrant: z.null() }),
  commerce: z.object({ checkoutEnabled: z.literal(false), priceHypothesis: z.object({ currency: z.literal('EUR'), amountMinor: z.number().int().positive() }) }),
  compatibility: z.object({ declared: z.object({ react: z.string().max(48), moduleFormat: z.string().max(16) }) }),
  capabilities: z.object({ publicInspection: z.literal(true), purchase: z.literal(false), paidInstallation: z.literal(false), automaticExecution: z.literal(false) }),
})
export type GlassDisplayManifest = z.infer<typeof responseShape>
