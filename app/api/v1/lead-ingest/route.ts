import { NextRequest, NextResponse } from 'next/server'

import { getClientIdentifier, leadRatelimit } from '@/lib/ratelimit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Records a lead-magnet download request in Growth Core under its own program.
// It does not add the person to the newsletter or send any email: the download
// forms never asked for that consent. Callers already unlock the free asset on
// failure, so this route only decides whether the request is stored.
const GROWTH_CAPTURE_URL =
  process.env.GROWTH_CAPTURE_URL ??
  'https://gfrfcqyprekhazzugdkr.supabase.co/functions/v1/growth-capture'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ALLOWED_SOURCES = new Set(['lead_magnet_landing_page', 'blog_inline_card'])

function text(value: unknown, max = 120) {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : undefined
}

export async function POST(request: NextRequest) {
  const { success } = await leadRatelimit.limit(getClientIdentifier(request))
  if (!success) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  const raw = (await request.json().catch(() => null)) as Record<string, unknown> | null
  const email = text(raw?.email, 320)?.toLowerCase()
  const leadMagnetId = text(raw?.leadMagnetId)
  if (!email || !EMAIL_RE.test(email) || !leadMagnetId) {
    return NextResponse.json({ error: 'A valid email and leadMagnetId are required.' }, { status: 400 })
  }
  const source = text(raw?.source)
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()

  try {
    const response = await fetch(GROWTH_CAPTURE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: new URL(request.url).origin,
        ...(clientIp ? { 'x-growth-client-ip': clientIp } : {}),
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(5_000),
      body: JSON.stringify({
        email,
        program: 'frankx-lead-magnet',
        source: source && ALLOWED_SOURCES.has(source) ? source : 'lead_magnet',
        referrer: request.headers.get('referer') ?? undefined,
        metadata: {
          lead_magnet_id: leadMagnetId,
          lead_magnet_title: text(raw?.leadMagnetTitle, 200),
          icp: text(raw?.icp),
          variant_id: text(raw?.variantId, 8),
        },
      }),
    })
    const result = (await response.json().catch(() => null)) as { accepted?: boolean } | null
    if (!response.ok || result?.accepted !== true) {
      console.error('Lead-magnet capture rejected:', response.status)
      return NextResponse.json({ error: 'Capture unavailable.' }, { status: 503 })
    }
    return NextResponse.json({ ok: true }, { status: 202 })
  } catch (error) {
    console.error('Lead-magnet capture unavailable:', error)
    return NextResponse.json({ error: 'Capture unavailable.' }, { status: 503 })
  }
}
