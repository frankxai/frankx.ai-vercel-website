import { NextRequest, NextResponse } from 'next/server'
import { handleState } from '@/lib/demand-capture/handler'
import { joinWaitlist } from '@/lib/waitlist/join'
import { waitlistProduct } from '@/lib/waitlist/products'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const parsed: unknown = await request.json().catch(() => null)
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  return joinWaitlist(request, parsed as Record<string, unknown>)
}

export async function GET(request: NextRequest) {
  const product = waitlistProduct(request.nextUrl.searchParams.get('productId'))
  if (!product) return NextResponse.json({ error: 'Unknown product' }, { status: 404 })
  try {
    const { status, body } = await handleState(product)
    return NextResponse.json(body, { status })
  } catch {
    return NextResponse.json({ error: 'Waitlist unavailable' }, { status: 503 })
  }
}
