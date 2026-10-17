import { NextRequest, NextResponse } from 'next/server'
import { sanitizeIntent } from '@/lib/diagnostic/waitlist-intents'
import { joinWaitlist } from '@/lib/waitlist/join'
import { patchDemandProperties } from '@/lib/waitlist/legacy-demand'
import { waitlistProduct } from '@/lib/waitlist/products'

export const runtime = 'nodejs'

/**
 * Thin adapter onto the shared demand capture. The wire format is unchanged
 * ({ email, intent, priceBand, role, pain }, plus optional consent), so existing callers keep
 * working. A consented call for a registry product becomes a DemandSignal through the same
 * handler as /api/waitlist, with `intent` read as the productId. Anything else keeps the
 * pre-migration Resend property update.
 */
export async function POST(request: NextRequest) {
  try {
    const parsed: unknown = await request.json().catch(() => null)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }
    const raw = parsed as Record<string, unknown>
    const productId = sanitizeIntent(raw.intent)

    if (raw.consent === true && waitlistProduct(productId)) {
      const response = await joinWaitlist(request, { ...raw, productId })
      if (!response.ok) return response
      return NextResponse.json({ success: true, ...(await response.json()) })
    }

    return await patchDemandProperties(request, raw)
  } catch (error) {
    console.error('Demand capture error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
