import { handleJoin, handleState, type ProductConfig } from './handler.ts'
import { redisRestConfig } from '../redis-env.ts'

/**
 * Other Starlight sites post their waitlist signups here so every signal lands
 * in the one store that packages/demand-capture/report.mjs reads. Only these
 * origins get a CORS grant; a browser on any other origin cannot read the reply.
 */
export const ALLOWED_ORIGINS = new Set([
  'https://starlightintelligence.academy',
  'https://www.starlightintelligence.academy',
  'https://starlightintelligence.ai',
  'https://www.starlightintelligence.ai',
  'https://www.frankx.ai',
])

/**
 * Accepting an address we cannot keep would be worse than refusing it, and
 * storing it anywhere else would split it from the cross-brand demand read.
 */
export const STORE_UNAVAILABLE = 'The list is not open yet. Nothing was saved. Try again shortly.'
const RATE_LIMITED = 'Too many requests. Please try again shortly.'

type Limiter = (key: string) => Promise<{ success: boolean }>

type Options = {
  products: ProductConfig[]
  /** Called with a per-IP key on every join. */
  limit: Limiter
  storeReady?: () => boolean
}

const defaultStoreReady = () => {
  const { url, token } = redisRestConfig()
  return Boolean(url && token)
}

export function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = { Vary: 'Origin' }
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Content-Type'
    headers['Access-Control-Max-Age'] = '86400'
  }
  return headers
}

function clientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'anonymous'
}

export function createWaitlistRoute({ products, limit, storeReady = defaultStoreReady }: Options) {
  const find = (id: unknown) => products.find((product) => product.id === id)

  const reply = (req: Request, body: unknown, status: number) =>
    Response.json(body, {
      status,
      headers: { 'Cache-Control': 'no-store', ...corsHeaders(req.headers.get('origin')) },
    })

  async function POST(req: Request) {
    let body: Record<string, unknown>
    try {
      const parsed = await req.json()
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object')
      body = parsed as Record<string, unknown>
    } catch {
      return reply(req, { error: 'Invalid request' }, 400)
    }

    const product = find(body.productId)
    if (!product) return reply(req, { error: 'Unknown product' }, 404)
    if (!storeReady()) return reply(req, { error: STORE_UNAVAILABLE }, 503)

    const allowed = await limit(`waitlist:ip:${clientIp(req)}`)
      .then((result) => result.success)
      .catch(() => false)
    if (!allowed) return reply(req, { error: RATE_LIMITED }, 429)

    try {
      const { status, body: out } = await handleJoin(product, body, req)
      return reply(req, out, status)
    } catch (error) {
      console.error('[waitlist] store unavailable', error instanceof Error ? error.message : 'unknown')
      return reply(req, { error: STORE_UNAVAILABLE }, 503)
    }
  }

  async function GET(req: Request) {
    const product = find(new URL(req.url).searchParams.get('productId'))
    if (!product) return reply(req, { error: 'Unknown product' }, 404)
    if (!storeReady()) return reply(req, { error: STORE_UNAVAILABLE }, 503)

    try {
      const { status, body: out } = await handleState(product)
      return reply(req, out, status)
    } catch (error) {
      console.error('[waitlist] store unavailable', error instanceof Error ? error.message : 'unknown')
      return reply(req, { error: STORE_UNAVAILABLE }, 503)
    }
  }

  function OPTIONS(req: Request) {
    return new Response(null, { status: 204, headers: corsHeaders(req.headers.get('origin')) })
  }

  return { POST, GET, OPTIONS }
}
