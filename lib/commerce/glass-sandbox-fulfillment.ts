import { createHash } from 'node:crypto'
import Stripe from 'stripe'
import { canonicalProduct } from '../product-fulfillment'
import type { ProductRecord } from '@/types/products'

/** A staged extension of the existing fulfillment owner. No route or default I/O. */
export type GlassRelease = {
  productId: 'aurora-ui-kit'; edition: 'essential'; sourceSha: string
  artifactId: string; artifactSha256: string; artifactBytes: number
  priceId: string; amount: 7900; currency: 'eur'
  termsVersion: string; termsSha256: string; termsScope: 'sandbox-rehearsal-only'
}
export type SandboxAttempt = GlassRelease & { sessionId: string; subjectId: string; acceptedAt: string }
export type SandboxEntitlement = SandboxAttempt & { paymentIntent: string; state: 'active' | 'revoked' }
export interface SandboxLedger {
  register(attempt: SandboxAttempt): Promise<void>
  attempt(sessionId: string): Promise<SandboxAttempt | null>
  grant(eventId: string, entitlement: SandboxEntitlement): Promise<'applied' | 'duplicate'>
  revoke(eventId: string, paymentIntent: string): Promise<'applied' | 'duplicate'>
  entitlement(sessionId: string): Promise<SandboxEntitlement | null>
}
export interface SandboxStripeReads {
  session(id: string): Promise<Stripe.Checkout.Session>
  lineItems(id: string): Promise<Stripe.ApiList<Stripe.LineItem>>
  charge(id: string): Promise<Stripe.Charge>
}
export type SandboxOptions = {
  mode: 'test'; secretKey: string; webhookSecret: string; products: readonly ProductRecord[]
  release: GlassRelease; ledger: SandboxLedger; reads: SandboxStripeReads
  deadlineMs?: number
}
const validSubject = (value: unknown): value is string => typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9:_-]{0,127}$/.test(value)
const sessionId = (value: unknown): value is string => typeof value === 'string' && /^cs_test_[A-Za-z0-9_]{1,200}$/.test(value)
const intentId = (value: unknown): value is string => typeof value === 'string' && /^pi_[A-Za-z0-9_]{1,200}$/.test(value)
const digest = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex')
const sameRelease = (a: GlassRelease, b: GlassRelease) => ['productId', 'edition', 'sourceSha', 'artifactId', 'artifactSha256', 'artifactBytes', 'priceId', 'amount', 'currency', 'termsVersion', 'termsSha256', 'termsScope'].every(key => a[key as keyof GlassRelease] === b[key as keyof GlassRelease])
const validAcceptedAt = (value: string) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value && Date.parse(value) <= Date.now()

function configured(options: SandboxOptions) {
  if (typeof window !== 'undefined' || options.mode !== 'test' || !/^sk_test_[A-Za-z0-9_]{8,}$/.test(options.secretKey)
    || !/^whsec_[A-Za-z0-9_]{16,}$/.test(options.webhookSecret)) throw new Error('SANDBOX_CONFIGURATION_REQUIRED')
  const r = options.release
  if (r.productId !== 'aurora-ui-kit' || r.edition !== 'essential' || r.amount !== 7900 || r.currency !== 'eur'
    || !/^[a-f0-9]{40}$/.test(r.sourceSha) || !/^[a-f0-9]{64}$/.test(r.artifactSha256)
    || !/^[a-z0-9][a-z0-9._-]{0,150}$/.test(r.artifactId) || !/^price_[A-Za-z0-9_]{1,200}$/.test(r.priceId)
    || !Number.isSafeInteger(r.artifactBytes) || r.artifactBytes < 1 || r.artifactBytes > 20_000_000
    || !/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(r.termsVersion) || !/^[a-f0-9]{64}$/.test(r.termsSha256) || r.termsScope !== 'sandbox-rehearsal-only'
    || canonicalProduct(options.products, r.productId)?.id !== r.productId) throw new Error('SANDBOX_RELEASE_REQUIRED')
  if (options.deadlineMs !== undefined && (!Number.isSafeInteger(options.deadlineMs) || options.deadlineMs < 1 || options.deadlineMs > 10_000)) throw new Error('INVALID_SANDBOX_DEADLINE')
}

async function bounded<T>(operation: () => Promise<T>, options: SandboxOptions): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  try { return await Promise.race([operation(), new Promise<never>((_, reject) => { timer=setTimeout(() => reject(new Error('SANDBOX_DEADLINE')), options.deadlineMs ?? 10_000) })]) }
  finally { clearTimeout(timer) }
}

/** Call only after host authentication and test checkout creation, never from browser fields. */
export async function registerGlassSandboxAttempt(options: SandboxOptions, prepared: { sessionId: string; subjectId: string; acceptedAt: string }) {
  configured(options)
  if (!sessionId(prepared.sessionId) || !validSubject(prepared.subjectId) || !validAcceptedAt(prepared.acceptedAt)) throw new Error('INVALID_SANDBOX_ATTEMPT')
  await options.ledger.register({ ...options.release, ...prepared })
}

const responseHeaders = { 'Cache-Control': 'private, no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff' }
const refusal = (status: number, code: string) => Response.json({ error: code }, { status, headers: responseHeaders })

/** Host-owned identity, origin and attempt key; no browser product/price/owner inputs. */
export async function glassSandboxCheckout(request: Request, options: SandboxOptions & {
  authenticate(request: Request): Promise<{ subjectId: string; termsSha256: string; acceptedAt: string } | null>
  transport: typeof fetch; siteOrigin: string; purchaseAttemptId: string
}): Promise<Response> {
  if (request.method !== 'POST') return refusal(405, 'method_not_allowed')
  try { configured(options) } catch { return refusal(503, 'sandbox_unavailable') }
  try {
    const origin = new URL(options.siteOrigin)
    if (origin.origin !== options.siteOrigin || !(origin.protocol === 'https:' || (origin.protocol === 'http:' && origin.hostname === '127.0.0.1'))
      || !/^[A-Za-z0-9_-]{16,128}$/.test(options.purchaseAttemptId)
      || typeof options.transport !== 'function') return refusal(503, 'sandbox_unavailable')
    if (request.headers.get('origin') !== origin.origin) return refusal(403, 'origin_required')
    const principal = await options.authenticate(request)
    if (!principal || !validSubject(principal.subjectId)) return refusal(401, 'authentication_required')
    const release = options.release
    if (principal.termsSha256 !== release.termsSha256 || !validAcceptedAt(principal.acceptedAt)) return refusal(409, 'terms_acceptance_required')
    const idempotencyKey = `glass-test-${digest(Buffer.from(JSON.stringify([principal.subjectId, release, options.purchaseAttemptId])))}`
    const client = new Stripe(options.secretKey, { httpClient: Stripe.createFetchHttpClient(options.transport), maxNetworkRetries: 0, timeout: 5000 })
    const session = await bounded(() => client.checkout.sessions.create({
      mode: 'payment', payment_method_types: ['card'], line_items: [{ price: release.priceId, quantity: 1 }],
      client_reference_id: principal.subjectId,
      metadata: { productSlug: release.productId, tier: release.edition, edition: release.edition, sourceSha: release.sourceSha, termsVersion: release.termsVersion, termsSha256: release.termsSha256, termsScope: release.termsScope },
      success_url: `${origin.origin}/products/aurora-ui-kit/sandbox/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin.origin}/products/aurora-ui-kit`,
    }, { idempotencyKey }), options)
    if (!sessionId(session.id) || session.livemode !== false || session.mode !== 'payment' || session.status !== 'open'
      || !session.url || new URL(session.url).origin !== 'https://checkout.stripe.com') return refusal(502, 'sandbox_checkout_mismatch')
    // Retrying an interrupted binding uses the same provider idempotency key.
    await registerGlassSandboxAttempt(options, { sessionId: session.id, subjectId: principal.subjectId, acceptedAt: principal.acceptedAt })
    return Response.json({ mode: 'test', sessionId: session.id, url: session.url }, { status: 201, headers: responseHeaders })
  } catch { return refusal(503, 'sandbox_checkout_unavailable') }
}

/** Uses the actual Stripe SDK signature verifier; all provider reads remain explicitly injected. */
export async function glassSandboxWebhook(request: Request, options: SandboxOptions): Promise<Response> {
  if (request.method !== 'POST') return refusal(405, 'method_not_allowed')
  try { configured(options) } catch { return refusal(503, 'sandbox_unavailable') }
  const signature = request.headers.get('stripe-signature')
  if (!signature) return refusal(400, 'signature_required')
  const declared = Number(request.headers.get('content-length'))
  if (Number.isFinite(declared) && declared > 65_536) return refusal(413, 'event_too_large')
  const chunks: Uint8Array[] = []; let count = 0
  const bodyDeadline = Date.now() + (options.deadlineMs ?? 10_000)
  const reader = request.body?.getReader()
  if (!reader) return refusal(400, 'invalid_event')
  try {
    while (true) { const remaining=bodyDeadline-Date.now(); if(remaining<=0)throw new Error('EVENT_DEADLINE'); const part=await bounded(() => reader.read(),{...options,deadlineMs:remaining}); if(part.done)break; count+=part.value.byteLength; if(count>65_536)return refusal(413,'event_too_large'); chunks.push(part.value) }
  } catch { return refusal(400, 'invalid_event') }
  finally { void reader.cancel().catch(() => {}) }
  const raw = Buffer.concat(chunks).toString('utf8')
  let event: Stripe.Event
  try { event = new Stripe(options.secretKey).webhooks.constructEvent(raw, signature, options.webhookSecret) }
  catch { return refusal(401, 'invalid_signature') }
  if (event.livemode !== false || event.account || !/^evt_[A-Za-z0-9_]{1,200}$/.test(event.id)) return refusal(422, 'sandbox_event_required')
  const release = options.release
  try {
    if (event.type === 'charge.refunded') {
      const candidate = event.data.object as Stripe.Charge
      if (!/^ch_[A-Za-z0-9_]{1,200}$/.test(candidate.id)) return refusal(422, 'payment_mismatch')
      const charge = await bounded(() => options.reads.charge(candidate.id),options)
      if (charge.id !== candidate.id || charge.livemode !== false || !intentId(charge.payment_intent)
        || charge.currency !== release.currency || !Number.isSafeInteger(charge.amount_refunded) || charge.amount_refunded <= 0) return refusal(422, 'refund_mismatch')
      // Conservative policy: any confirmed refund revokes access, including out-of-order events.
      const result = await options.ledger.revoke(event.id, charge.payment_intent)
      return Response.json({ received: true, mode: 'test', result }, { headers: responseHeaders })
    }
    if (event.type !== 'checkout.session.completed' && event.type !== 'checkout.session.async_payment_succeeded') return Response.json({ received: true, ignored: true }, { headers: responseHeaders })
    const candidate = event.data.object as Stripe.Checkout.Session
    if (!sessionId(candidate.id)) return refusal(422, 'sandbox_session_required')
    const attempt = await options.ledger.attempt(candidate.id)
    if (!attempt || !sameRelease(attempt, release)) return refusal(422, 'unbound_purchase')
    const session = await bounded(() => options.reads.session(candidate.id),options)
    if (session.id !== candidate.id || session.livemode !== false || session.mode !== 'payment'
      || session.payment_status !== 'paid' || session.currency !== release.currency || session.amount_total !== release.amount || session.client_reference_id !== attempt.subjectId
      || !intentId(session.payment_intent) || session.metadata?.productSlug !== release.productId
      || session.metadata?.tier !== release.edition || session.metadata?.edition !== release.edition
      || session.metadata?.sourceSha !== release.sourceSha || session.metadata?.termsVersion !== release.termsVersion
      || session.metadata?.termsSha256 !== release.termsSha256 || session.metadata?.termsScope !== release.termsScope) return refusal(422, 'payment_mismatch')
    const lines = await bounded(() => options.reads.lineItems(candidate.id),options)
    const line = lines.data[0]
    if (lines.has_more || lines.data.length !== 1 || line.quantity !== 1 || line.amount_total !== release.amount
      || line.currency !== release.currency || line.price?.id !== release.priceId || line.price.currency !== release.currency) return refusal(422, 'line_item_mismatch')
    const result = await options.ledger.grant(event.id, { ...attempt, paymentIntent: session.payment_intent, state: 'active' })
    return Response.json({ received: true, mode: 'test', result }, { headers: responseHeaders })
  } catch { return refusal(503, 'sandbox_verification_unavailable') }
}

/** Auth identity comes from the host's server session adapter, never a query/body/header claim. */
export async function glassSandboxDownload(request: Request, options: SandboxOptions & {
  authenticate(request: Request): Promise<{ subjectId: string } | null>
  readPrivateArtifact(artifactId: string): Promise<Uint8Array>
}): Promise<Response> {
  if (request.method !== 'GET') return refusal(405, 'method_not_allowed')
  try { configured(options) } catch { return refusal(503, 'sandbox_unavailable') }
  const url = new URL(request.url)
  if (url.searchParams.getAll('session').length !== 1 || [...url.searchParams.keys()].some(key => key !== 'session') || !sessionId(url.searchParams.get('session'))) return refusal(400, 'invalid_download_request')
  try {
    const principal = await options.authenticate(request)
    if (!principal || !validSubject(principal.subjectId)) return refusal(401, 'authentication_required')
    const entitlement = await options.ledger.entitlement(url.searchParams.get('session')!)
    if (!entitlement || entitlement.subjectId !== principal.subjectId) return refusal(404, 'download_not_found')
    if (entitlement.state !== 'active') return refusal(410, 'entitlement_revoked')
    if (!sameRelease(entitlement, options.release)) return refusal(409, 'artifact_version_unavailable')
    const bytes = await bounded(() => options.readPrivateArtifact(entitlement.artifactId),options)
    if (!(bytes instanceof Uint8Array) || bytes.byteLength !== entitlement.artifactBytes || digest(bytes) !== entitlement.artifactSha256) return refusal(502, 'artifact_integrity_failed')
    return new Response(new Uint8Array(bytes), { headers: { ...responseHeaders, 'Content-Type': 'application/zip', 'Content-Length': String(bytes.byteLength), 'Content-Disposition': 'attachment; filename="starlight-glass-core-essential.zip"' } })
  } catch { return refusal(503, 'sandbox_download_unavailable') }
}

/** Real Stripe SDK API adapter, with an explicitly supplied test transport and no retries. */
export function stripeSandboxReads(secretKey: string, transport: typeof fetch): SandboxStripeReads {
  if (!/^sk_test_[A-Za-z0-9_]{8,}$/.test(secretKey) || typeof transport !== 'function') throw new Error('TEST_TRANSPORT_REQUIRED')
  const client = new Stripe(secretKey,{httpClient:Stripe.createFetchHttpClient(transport),maxNetworkRetries:0,timeout:5000})
  return {
    session: id => client.checkout.sessions.retrieve(id),
    lineItems: id => client.checkout.sessions.listLineItems(id,{limit:2}),
    charge: id => client.charges.retrieve(id),
  }
}

/** Uses the existing private-storage owner; a public bucket is rejected before download. */
export function supabasePrivateArtifactReader(storage: {
  getBucket(id:string):Promise<{data:{public:boolean}|null;error:unknown}>
  from(id:string):{download(key:string):Promise<{data:Blob|null;error:unknown}>}
}, bucket:string, objects:Readonly<Record<string,string>>) {
  if (!/^[a-z0-9][a-z0-9_-]{0,62}$/.test(bucket)) throw new Error('PRIVATE_BUCKET_REQUIRED')
  const approved = {...objects}
  return async (id:string) => {
    const key=Object.hasOwn(approved,id)?approved[id]:undefined
    if(!key || key.length>512 || key.split('/').some(part=>!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(part)||part==='..'))throw new Error('ARTIFACT_NOT_CONFIGURED')
    const metadata=await storage.getBucket(bucket)
    if(metadata.error || metadata.data?.public!==false)throw new Error('PRIVATE_BUCKET_REQUIRED')
    const file=await storage.from(bucket).download(key)
    if(file.error || !file.data || file.data.size>20_000_000)throw new Error('PRIVATE_ARTIFACT_UNAVAILABLE')
    return new Uint8Array(await file.data.arrayBuffer())
  }
}

/** Existing Supabase/Postgres owner can supply this RPC after separately reviewed SQL admission. */
export function supabaseSandboxLedger(rpc: (name: string, args: Record<string, unknown>) => Promise<{ data: unknown; error: unknown }>): SandboxLedger {
  async function command(operation: string, payload: unknown) {
    const result = await rpc('glass_sandbox_command', { operation, payload })
    if (result.error) throw new Error('SANDBOX_LEDGER_UNAVAILABLE')
    return result.data
  }
  return {
    register: async attempt => { await command('register', attempt) },
    attempt: async id => await command('attempt', { sessionId: id }) as SandboxAttempt | null,
    grant: async (eventId, entitlement) => await command('grant', { eventId, entitlement }) as 'applied' | 'duplicate',
    revoke: async (eventId, paymentIntent) => await command('revoke', { eventId, paymentIntent }) as 'applied' | 'duplicate',
    entitlement: async id => await command('entitlement', { sessionId: id }) as SandboxEntitlement | null,
  }
}
