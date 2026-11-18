import {
  PAID_BLOB_BASE_URL,
  PaidDownloadConfigError,
  resolvePaidBlobKey,
  verifyPaidDownload,
  type PaidDownloadVerdict,
} from '@/lib/paid-download'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const refuse = (error: string, status: number) => Response.json({ error }, { status })

/**
 * Paid file download.
 *
 * GET /api/download/paid?product={id}&file={name}&exp={ms}&sig={hmac}
 *
 * The link comes from a purchase email (lib/delivery.ts). The file is streamed
 * through this route, so the storage URL is never handed out.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('product')
  const file = searchParams.get('file')
  const expiresAt = searchParams.get('exp')
  const signature = searchParams.get('sig')

  if (!productId || !file || !expiresAt || !signature) {
    return refuse('This download link is incomplete', 400)
  }

  let verdict: PaidDownloadVerdict
  try {
    verdict = verifyPaidDownload(productId, file, Number(expiresAt), signature)
  } catch (error) {
    if (!(error instanceof PaidDownloadConfigError)) throw error
    console.error('[paid-download]', error.message)
    return refuse('Service unavailable', 503)
  }
  if (verdict === 'invalid') return refuse('This download link is not valid', 403)
  if (verdict === 'expired') return refuse('This download link has expired', 410)

  const blobKey = resolvePaidBlobKey(productId, file)
  if (!blobKey) return refuse('File not found', 404)

  const upstream = await fetch(`${PAID_BLOB_BASE_URL}/${blobKey}`, { cache: 'no-store' })
  if (!upstream.ok || !upstream.body) {
    console.error('[paid-download] stored file unavailable:', { productId, blobKey, status: upstream.status })
    return refuse('This file is not available right now', 502)
  }

  const headers = new Headers({
    'Content-Type': upstream.headers.get('content-type') ?? 'application/octet-stream',
    'Content-Disposition': `attachment; filename="${file.replace(/["\\\r\n]/g, '')}"`,
    'Cache-Control': 'private, no-store',
  })
  const length = upstream.headers.get('content-length')
  if (length) headers.set('Content-Length', length)
  return new Response(upstream.body, { headers })
}
