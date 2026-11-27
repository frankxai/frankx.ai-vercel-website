import { z } from 'zod'
import type { ProductRecord } from '@/types/products'
import { canonicalProduct } from '../product-fulfillment'
import type { GlassRelease, SandboxLedger } from './glass-sandbox-fulfillment'

// Public release metadata projected from Design Intelligence #97/#123. No storage keys or seller-supplied instructions.
const release = {
  version: '0.2.0-rc.2', sourceSha: 'bf3d078d6f66afb37eb0e3f2d81fb4cb5569b00c',
  artifactId: 'starlight-glass-core-essential-0.2.0-rc.2', artifactBytes: 80099,
  artifactSha256: 'ed825d6a1b20336e1a38fc8f34466b96ded5266320dd9fd6935d0ab37160820c',
} as const
const draft = {
  version: 'starlight-glass-commercial-1.0-draft',
  sha256: '482d4ddd84ac3fb9f193dc5a2f9b5651cd2f8ecf73050e5ef85175d0387c47f0',
} as const
const tested = { node: '24.22.3', react: '19.3.1', reactDom: '19.3.1', vite: '8.3.5' } as const
const version = z.string().max(26).regex(/^(0|[1-9]\d{0,7})\.(0|[1-9]\d{0,7})\.(0|[1-9]\d{0,7})$/)
const runtimeSchema = z.strictObject({ node: version, react: version, reactDom: version, vite: version })
const planSchema = z.strictObject({
  schema: z.literal('starlight.glass.plan-request.v1'),
  sessionId: z.string().regex(/^cs_test_[A-Za-z0-9_]{1,200}$/),
  runtime: runtimeSchema,
})

const sha256 = z.string().regex(/^[a-f0-9]{64}$/)
const asset = z.strictObject({
  kind: z.enum(['archive', 'embedded-npm-package']), id: z.string().min(1).max(160),
  sha256, bytes: z.number().int().positive(), entries: z.number().int().positive().optional(),
})
export const glassManifestSchema = z.strictObject({
  schema: z.literal('starlight.glass.product-manifest.v1'),
  product: z.strictObject({ id: z.literal('aurora-ui-kit'), edition: z.literal('essential'), title: z.string() }),
  creator: z.strictObject({ name: z.string(), sourceRepository: z.string() }),
  release: z.strictObject({ version: z.string(), sourceRevision: z.string().regex(/^[a-f0-9]{40}$/), state: z.literal('review-candidate') }),
  assets: z.array(asset).length(2),
  license: z.strictObject({ source: z.literal('UNLICENSED'), operativeGrant: z.null(),
    draft: z.strictObject({ version: z.string(), sha256 }), permittedRedistribution: z.null() }),
  commerce: z.strictObject({ priceHypothesis: z.strictObject({ amountMinor: z.number().int().positive(), currency: z.literal('EUR') }),
    taxInclusivePrice: z.null(), checkoutEnabled: z.literal(false) }),
  compatibility: z.strictObject({ declared: z.strictObject({ node: z.string(), react: z.string(), reactDom: z.string(), moduleFormat: z.literal('ESM') }),
    testedConsumer: runtimeSchema, nativeFigmaLibrary: z.literal(false), nativeWebflowLibrary: z.literal(false) }),
  capabilities: z.strictObject({ publicInspection: z.literal(true), paidInstallation: z.literal(false),
    purchase: z.literal(false), automaticExecution: z.literal(false) }),
})

export function glassPublicManifest(products: readonly ProductRecord[]) {
  const product = canonicalProduct(products, 'aurora-ui-kit')
  if (product?.id !== 'aurora-ui-kit' || product.slug !== product.id) return null
  return glassManifestSchema.parse({
    schema: 'starlight.glass.product-manifest.v1',
    product: { id: product.id, edition: 'essential', title: 'Starlight Glass Core Essential' },
    creator: { name: 'Starlight Intelligence', sourceRepository: 'Starlight-Intelligence/starlight-design-intelligence' },
    release: { version: release.version, sourceRevision: release.sourceSha, state: 'review-candidate' },
    assets: [
      { kind: 'archive', id: release.artifactId, sha256: release.artifactSha256, bytes: release.artifactBytes, entries: 47 },
      { kind: 'embedded-npm-package', id: '@starlight/living-design@0.2.0', bytes: 24213,
        sha256: '30e07d8516cf48de20cd7805b1634e03495347d86a8a61ea5df13fa7183bc871' },
    ],
    license: { source: 'UNLICENSED', operativeGrant: null, draft: { ...draft }, permittedRedistribution: null },
    commerce: { priceHypothesis: { amountMinor: 7900, currency: 'EUR' }, taxInclusivePrice: null, checkoutEnabled: false },
    compatibility: { declared: { node: '>=22.18.0', react: '^19.0.0', reactDom: '^19.0.0', moduleFormat: 'ESM' },
      testedConsumer: { ...tested }, nativeFigmaLibrary: false, nativeWebflowLibrary: false },
    capabilities: { publicInspection: true, paidInstallation: false, purchase: false, automaticExecution: false },
  })
}

export type GlassPublicManifest = NonNullable<ReturnType<typeof glassPublicManifest>>

export function glassCompatibility(input: unknown): 'tested' | 'outside-declaration' | 'unverified' {
  const result = runtimeSchema.safeParse(input)
  if (!result.success) return 'unverified'
  const { node, react, reactDom, vite } = result.data
  if (node === tested.node && react === tested.react && reactDom === tested.reactDom && vite === tested.vite) return 'tested'
  const [major, minor] = node.split('.').map(Number)
  if (major < 22 || (major === 22 && minor < 18) || !react.startsWith('19.') || !reactDom.startsWith('19.')) return 'outside-declaration'
  return 'unverified'
}

// Host resolves identity and a previously persisted human inspection. Public transports cannot supply either record.
type Principal = { scope: 'personal'; subjectId: string; tenantId: string }
type HumanInspection = { source: 'human-inspection'; sessionId: string; tenantId: string; subjectId: string; artifactSha256: string; inspectedAt: string }
type PlanHost = {
  products: readonly ProductRecord[]
  release: GlassRelease
  ledger: Pick<SandboxLedger, 'entitlement'>
  principal(): Promise<Principal | null>
  inspection(sessionId: string, subjectId: string): Promise<HumanInspection | null>
}
const refused = { ok: false, reason: 'plan-unavailable' } as const

function recordedAt(value: unknown) {
  if (typeof value !== 'string' || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(value)) return false
  const time = Date.parse(value)
  return Number.isFinite(time) && time <= Date.now() && new Date(time).toISOString() === value
}

/** Read-only rehearsal. The ledger supports personal subjects only. A commercial grant requires a separate approved edition. */
export async function glassSandboxInstallationPlan(input: unknown, host: PlanHost) {
  const args = planSchema.safeParse(input)
  if (!args.success || glassCompatibility(args.data.runtime) !== 'tested') return refused
  const manifest = glassPublicManifest(host.products)
  if (!manifest) return refused
  // Snapshot server-owned terms and edition before any async identity or ledger read.
  const pinned: GlassRelease = {
    productId: 'aurora-ui-kit', edition: 'essential', sourceSha: release.sourceSha,
    artifactId: release.artifactId, artifactBytes: release.artifactBytes, artifactSha256: release.artifactSha256,
    amount: 7900, currency: 'eur', priceId: host.release.priceId, termsScope: 'sandbox-rehearsal-only',
    termsVersion: draft.version, termsSha256: draft.sha256,
  }
  const fields = Object.keys(pinned) as (keyof GlassRelease)[]
  if (!/^price_[A-Za-z0-9_]{1,200}$/.test(pinned.priceId) || !fields.every(key => host.release[key] === pinned[key])) return refused
  const { sessionId } = args.data
  try {
    const principal = await host.principal()
    if (!principal || principal.scope !== 'personal' || typeof principal.subjectId !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9:_-]{0,127}$/.test(principal.subjectId)
      || principal.tenantId !== principal.subjectId) return refused
    const { subjectId } = principal
    const inspection = await host.inspection(sessionId, subjectId)
    if (!inspection || inspection.source !== 'human-inspection' || inspection.sessionId !== sessionId
      || inspection.subjectId !== subjectId || inspection.tenantId !== subjectId || inspection.artifactSha256 !== release.artifactSha256
      || !recordedAt(inspection.inspectedAt)) return refused
    const entitlement = await host.ledger.entitlement(sessionId, subjectId)
    if (!entitlement || entitlement.sessionId !== sessionId || entitlement.subjectId !== subjectId || entitlement.state !== 'active'
      || !/^pi_[A-Za-z0-9_]{1,200}$/.test(entitlement.paymentIntent) || !recordedAt(entitlement.acceptedAt)
      || inspection.inspectedAt < entitlement.acceptedAt || !fields.every(key => entitlement[key] === pinned[key])) return refused
    return {
      ok: true, schema: 'starlight.glass.installation-plan.v1', mode: 'sandbox-rehearsal-only',
      product: manifest.product, release: manifest.release, inspectedSha256: release.artifactSha256,
      compatibility: 'tested', commercialGrant: null, executable: false,
      steps: ['review-embedded-package-and-peer-versions', 'review-stylesheet-and-source-placement', 'obtain-operative-license-before-installation'],
    } as const
  } catch {
    return refused
  }
}
