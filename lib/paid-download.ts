import crypto from 'crypto'
import registry from '@/data/products.json'
import type { ProductRecord } from '@/types/products'

/**
 * Signed links to paid files.
 *
 * There is no order store, so the signature is the entitlement: the purchase
 * email carries a link only the server could have signed, and
 * `/api/download/paid` serves the file to whoever holds it until it expires.
 * A missing secret throws. A buyer must never receive a link that cannot verify.
 */

export const PAID_DOWNLOAD_TTL_MS = 30 * 24 * 60 * 60 * 1000
export const PAID_BLOB_BASE_URL = 'https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com'

export class PaidDownloadConfigError extends Error {
  constructor() {
    super('EMAIL_TOKEN_SECRET is not configured. Paid download links cannot be signed or verified.')
    this.name = 'PaidDownloadConfigError'
  }
}

const products = registry as ProductRecord[]

// Same secret as lib/email-config.ts. The purpose prefix below keeps a paid
// download signature from ever verifying as a confirm or unsubscribe token.
function signingSecret(): string {
  const secret = process.env.EMAIL_TOKEN_SECRET || process.env.NEWSLETTER_TOKEN_SECRET
  if (!secret) throw new PaidDownloadConfigError()
  return secret
}

function sign(productId: string, file: string, expiresAt: number): string {
  return crypto
    .createHmac('sha256', signingSecret())
    .update(`paid-download:v1:${productId}:${file}:${expiresAt}`)
    .digest('hex')
}

/** The registered blob for a product file, matched on file name. Null when the catalog has none. */
export function resolvePaidBlobKey(productId: string, file: string): string | null {
  const product = products.find((candidate) => candidate.id === productId)
  const match = product?.delivery?.files?.find((entry) => entry.blobKey.split('/').pop() === file)
  return match?.blobKey ?? null
}

/**
 * `issuedAt` is when the purchase happened. Reading the clock here would change
 * the link on a retried webhook, and the email provider's idempotency check
 * rejects a changed email.
 */
export function buildPaidDownloadUrl(productId: string, file: string, issuedAt: number, baseUrl: string): string {
  const expiresAt = issuedAt + PAID_DOWNLOAD_TTL_MS
  const url = new URL('/api/download/paid', baseUrl)
  url.searchParams.set('product', productId)
  url.searchParams.set('file', file)
  url.searchParams.set('exp', String(expiresAt))
  url.searchParams.set('sig', sign(productId, file, expiresAt))
  return url.toString()
}

export type PaidDownloadVerdict = 'ok' | 'expired' | 'invalid'

export function verifyPaidDownload(
  productId: string,
  file: string,
  expiresAt: number,
  signature: string,
  now: number = Date.now(),
): PaidDownloadVerdict {
  if (!Number.isSafeInteger(expiresAt)) return 'invalid'
  const expected = Buffer.from(sign(productId, file, expiresAt))
  const given = Buffer.from(signature)
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return 'invalid'
  return now > expiresAt ? 'expired' : 'ok'
}
