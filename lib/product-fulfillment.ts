import { createHmac, timingSafeEqual } from 'node:crypto'
import type { ProductFile, ProductRecord } from '@/types/products'

export const PRODUCT_DOWNLOAD_PATH = '/api/download/purchased'
export const PRODUCT_DOWNLOAD_TTL_SECONDS = 24 * 60 * 60
export const PRODUCT_BLOB_ORIGIN = 'https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com'
const DOWNLOAD_ORIGINS = new Set(['https://www.frankx.ai', 'https://frankx.ai'])

// Existing checkout products only. This does not create or activate variants.
export const LEMON_PRODUCT_VARIANT_ENV_KEYS: Readonly<Record<string, string>> = Object.freeze({
  'system-architect-starter-kit': 'LEMON_SQUEEZY_VARIANT_STARTER_KIT',
  'command-center-template': 'LEMON_SQUEEZY_VARIANT_COMMAND_CENTER_TEMPLATE',
})

// Existing server Price-ID bindings, shared by checkout and signed callbacks.
export const STRIPE_PRODUCT_PRICE_ENV_KEYS: Readonly<Record<string, string>> = Object.freeze({
  'creative-ai-toolkit': 'STRIPE_PRICE_TOOLKIT',
  'agentic-creator-os': 'STRIPE_PRICE_ACOS',
  'suno-prompt-library': 'STRIPE_PRICE_SUNO',
  'system-architect-starter-kit': 'STRIPE_PRICE_SYSTEM_ARCHITECT',
  'visual-creation-loop': 'STRIPE_PRICE_VISUAL_LOOP',
  'income-architecture-blueprint': 'STRIPE_PRICE_INCOME_ARCH',
  'dpi-field-kit': 'STRIPE_PRICE_DPI_KIT',
  'agent-fleet-pro': 'STRIPE_PRICE_FLEET_PRO',
  'memory-palace-os': 'STRIPE_PRICE_MEMORY_PALACE',
  'agentic-media-machine': 'STRIPE_PRICE_MEDIA_MACHINE',
  'agentic-content-engine': 'STRIPE_PRICE_AGENTIC_CONTENT',
  'starlight-operator-pack': 'STRIPE_PRICE_OPERATOR_PACK',
  'aurora-ui-kit': 'STRIPE_PRICE_AURORA',
  'founders-circle-guild': 'STRIPE_PRICE_FOUNDERS_GUILD',
  'creation-chronicles': 'STRIPE_PRICE_CHRONICLES',
  'command-center-template': 'STRIPE_PRICE_COMMAND_CENTER',
})

export function stripePriceForProduct(productId: string, env: Environment) {
  const key = STRIPE_PRODUCT_PRICE_ENV_KEYS[productId]
  const id = key ? env[key] : undefined
  return id && /^price_[A-Za-z0-9_]+$/.test(id) && Object.values(STRIPE_PRODUCT_PRICE_ENV_KEYS).filter(name => env[name] === id).length === 1 ? id : undefined
}

type DownloadClaim = { version: 1; productId: string; blobKey: string; expiresAt: number }
type Environment = Readonly<Record<string, string | undefined>>

export function canonicalProduct(products: readonly ProductRecord[], identity: unknown) {
  if (typeof identity !== 'string' || !identity) return undefined
  const matches = products.filter(product => product.id === identity || product.slug === identity)
  return matches.length === 1 ? matches[0] : undefined
}

export function productFromCheckoutMetadata(products: readonly ProductRecord[], metadata: Record<string, unknown> | null | undefined) {
  if (!metadata) return undefined
  const identities = ['productId', 'productSlug', 'product_slug'].filter(key => metadata[key] !== undefined).map(key => canonicalProduct(products, metadata[key]))
  if (!identities.length || identities.some(product => !product)) return undefined
  const product = identities[0]!
  return identities.every(match => match?.id === product.id) ? product : undefined
}

function variantId(value: unknown) {
  const id = typeof value === 'number' && Number.isSafeInteger(value) ? String(value) : value
  return typeof id === 'string' && /^[1-9]\d*$/.test(id) ? id : undefined
}

export function lemonVariantForProduct(productId: string, env: Environment) {
  const key = LEMON_PRODUCT_VARIANT_ENV_KEYS[productId]
  const id = key ? variantId(env[key]) : undefined
  return id && Object.values(LEMON_PRODUCT_VARIANT_ENV_KEYS).filter(name => variantId(env[name]) === id).length === 1 ? id : undefined
}

export function productForLemonVariant(products: readonly ProductRecord[], value: unknown, env: Environment) {
  const id = variantId(value)
  if (!id) return undefined
  const matches = Object.keys(LEMON_PRODUCT_VARIANT_ENV_KEYS).filter(productId => lemonVariantForProduct(productId, env) === id)
  return matches.length === 1 ? canonicalProduct(products, matches[0]) : undefined
}

function usableSecret(secret: string | undefined): secret is string {
  return typeof secret === 'string' && Buffer.byteLength(secret, 'utf8') >= 32
}

function safeBlobKey(key: string) {
  return key.length <= 512 && key.split('/').every(part => /^[a-zA-Z0-9][a-zA-Z0-9._ -]*$/.test(part) && part !== '.' && part !== '..')
}

function downloadableFile(product: ProductRecord | undefined, blobKey: string): ProductFile | undefined {
  if (!product || !(product.offer?.primaryPrice > 0) || !safeBlobKey(blobKey)) return undefined
  const matches = product.delivery?.files?.filter(file => file.blobKey === blobKey) ?? []
  const file = matches.length === 1 ? matches[0] : undefined
  if (!file || !['pdf', 'zip', 'notion'].includes(file.format)) return undefined
  if (file.format === 'pdf' ? !blobKey.endsWith('.pdf') : !blobKey.endsWith('.zip')) return undefined
  return file
}

function downloadOrigin(value?: string) {
  try {
    const origin = new URL(value || 'https://www.frankx.ai')
    return DOWNLOAD_ORIGINS.has(origin.origin) && !origin.username && !origin.password && origin.pathname === '/' && !origin.search && !origin.hash ? origin : undefined
  } catch {
    return undefined
  }
}

export function productDownloadConfigured(product: ProductRecord | undefined, secret: string | undefined, origin?: string) {
  return usableSecret(secret) && Boolean(downloadOrigin(origin) && product?.delivery?.files?.length && product.delivery.files.every(file => downloadableFile(product, file.blobKey)))
}

export function lemonExpectedTestMode(env: Environment) {
  return env.LEMON_SQUEEZY_EXPECT_TEST_MODE === 'false' ? false : env.LEMON_SQUEEZY_EXPECT_TEST_MODE === 'true' ? true : undefined
}

export function stripeExpectedLiveMode(env: Environment) {
  const key = env.STRIPE_SECRET_KEY ?? ''
  return /^(sk|rk)_live_/.test(key) ? true : /^(sk|rk)_test_/.test(key) ? false : undefined
}

/** Code prerequisites only; merchant/provider configuration must still be verified. */
export function productFulfillmentConfigured(product: ProductRecord | undefined, provider: 'stripe' | 'lemon', env: Environment) {
  if (!product || !productDownloadConfigured(product, env.PRODUCT_DOWNLOAD_SECRET, env.NEXT_PUBLIC_SITE_URL) || !env.RESEND_API_KEY?.trim()) return false
  if (provider === 'stripe') return Boolean(env.STRIPE_WEBHOOK_SECRET?.trim() && stripeExpectedLiveMode(env) === true && stripePriceForProduct(product.id, env))
  return Boolean(env.LEMON_SQUEEZY_API_KEY?.trim() && env.LEMON_SQUEEZY_STORE_ID?.trim() && env.LEMON_SQUEEZY_WEBHOOK_SECRET?.trim()
    && lemonExpectedTestMode(env) === false && lemonVariantForProduct(product.id, env))
}

export function createProductDownloadUrl(products: readonly ProductRecord[], productId: string, blobKey: string, options: {
  secret: string | undefined; origin?: string; now?: number
}) {
  if (!usableSecret(options.secret)) throw new Error('Product download signing is not configured')
  const product = canonicalProduct(products, productId)
  if (!product || product.id !== productId || !downloadableFile(product, blobKey)) throw new Error('Product file is not configured')
  const origin = downloadOrigin(options.origin)
  if (!origin) throw new Error('Product download origin is not allowed')
  const now = options.now ?? Date.now()
  const claim: DownloadClaim = { version: 1, productId, blobKey, expiresAt: Math.floor(now / 1000) + PRODUCT_DOWNLOAD_TTL_SECONDS }
  const payload = Buffer.from(JSON.stringify(claim), 'utf8').toString('base64url')
  const signature = createHmac('sha256', options.secret).update(payload).digest('base64url')
  const url = new URL(PRODUCT_DOWNLOAD_PATH, origin)
  url.searchParams.set('token', `${payload}.${signature}`)
  return url.toString()
}

export function verifyProductDownloadToken(token: unknown, secret: string | undefined, now = Date.now()): DownloadClaim | undefined {
  if (!usableSecret(secret) || typeof token !== 'string' || token.length > 2048) return undefined
  const parts = token.split('.')
  if (parts.length !== 2 || !parts.every(part => /^[A-Za-z0-9_-]+$/.test(part))) return undefined
  const [payload, signature] = parts
  const expected = createHmac('sha256', secret).update(payload).digest()
  const received = Buffer.from(signature, 'base64url')
  if (received.length !== expected.length || received.toString('base64url') !== signature || !timingSafeEqual(received, expected)) return undefined
  try {
    const bytes = Buffer.from(payload, 'base64url')
    if (bytes.toString('base64url') !== payload) return undefined
    const claim = JSON.parse(bytes.toString('utf8'))
    if (!claim || typeof claim !== 'object' || Array.isArray(claim) || Object.keys(claim).sort().join(',') !== 'blobKey,expiresAt,productId,version') return undefined
    const seconds = Math.floor(now / 1000)
    if (claim.version !== 1 || typeof claim.productId !== 'string' || typeof claim.blobKey !== 'string' || !safeBlobKey(claim.blobKey)
      || !Number.isSafeInteger(claim.expiresAt) || claim.expiresAt <= seconds || claim.expiresAt > seconds + PRODUCT_DOWNLOAD_TTL_SECONDS) return undefined
    return claim
  } catch {
    return undefined
  }
}

/** Bearer-link protection for this route only. Existing public Blob objects remain public. */
export async function purchasedDownload(request: Request, options: {
  products: readonly ProductRecord[]; secret: string | undefined; now?: number; fetch?: typeof fetch
}) {
  const headers = { 'Cache-Control': 'private, no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff' }
  if (!usableSecret(options.secret)) return Response.json({ error: 'Download delivery unavailable' }, { status: 503, headers })
  const url = new URL(request.url)
  if (url.pathname !== PRODUCT_DOWNLOAD_PATH || url.searchParams.getAll('token').length !== 1) return Response.json({ error: 'Invalid download link' }, { status: 401, headers })
  const claim = verifyProductDownloadToken(url.searchParams.get('token'), options.secret, options.now)
  if (!claim) return Response.json({ error: 'Invalid or expired download link' }, { status: 401, headers })
  const product = canonicalProduct(options.products, claim.productId)
  const file = product?.id === claim.productId ? downloadableFile(product, claim.blobKey) : undefined
  if (!file) return Response.json({ error: 'Download not found' }, { status: 404, headers })
  const upstreamUrl = new URL(claim.blobKey.split('/').map(encodeURIComponent).join('/'), `${PRODUCT_BLOB_ORIGIN}/`)
  if (upstreamUrl.origin !== PRODUCT_BLOB_ORIGIN) return Response.json({ error: 'Download not found' }, { status: 404, headers })
  try {
    const upstream = await (options.fetch ?? fetch)(upstreamUrl, { redirect: 'error', cache: 'no-store', signal: request.signal })
    const contentType = upstream.headers.get('content-type')?.split(';')[0].trim().toLowerCase()
    const allowedTypes = file.format === 'pdf' ? ['application/pdf'] : ['application/zip', 'application/x-zip-compressed']
    if (!upstream.ok || !upstream.body || !contentType || !allowedTypes.includes(contentType)) return Response.json({ error: 'Download delivery unavailable' }, { status: 502, headers })
    const filename = encodeURIComponent(claim.blobKey.split('/').at(-1)!).replace(/[!'()*]/g, char => `%${char.charCodeAt(0).toString(16).toUpperCase()}`)
    return new Response(upstream.body, { headers: { ...headers, 'Content-Type': contentType, 'Content-Disposition': `attachment; filename*=UTF-8''${filename}` } })
  } catch {
    return Response.json({ error: 'Download delivery unavailable' }, { status: 502, headers })
  }
}
