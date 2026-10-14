import { createHash } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { handleJoin } from '@/lib/demand-capture/handler'
import { emailRatelimit, getClientIdentifier } from '@/lib/ratelimit'
import { waitlistProduct } from '@/lib/waitlist/products'

const UNAVAILABLE = 'The list is not taking names right now. Please try again later.'

async function isRateLimited(request: NextRequest, email: unknown): Promise<boolean> {
  const keys = [`waitlist:ip:${getClientIdentifier(request)}`]
  if (typeof email === 'string' && email.trim()) {
    keys.push(`waitlist:email:${createHash('sha256').update(email.trim().toLowerCase()).digest('hex')}`)
  }
  return Promise.all(keys.map((key) => emailRatelimit.limit(key)))
    .then((results) => results.some((result) => !result.success))
    .catch(() => true)
}

/**
 * The one write path for waitlist signups on this site: the shared demand-capture handler, which
 * stores a DemandSignal per product and email. Both /api/waitlist and the legacy /api/demand
 * adapter call this, so every signup lands in the same schema the estate report reads.
 */
export async function joinWaitlist(request: NextRequest, body: Record<string, unknown>) {
  const product = waitlistProduct(body.productId)
  if (!product) return NextResponse.json({ error: 'Unknown product' }, { status: 404 })
  if (await isRateLimited(request, body.email)) {
    return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 })
  }
  try {
    const { status, body: out } = await handleJoin(product, body, request)
    return NextResponse.json(out, { status })
  } catch (error) {
    console.error('Waitlist join failed:', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: UNAVAILABLE }, { status: 503 })
  }
}
