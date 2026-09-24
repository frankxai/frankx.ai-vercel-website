import { after, NextRequest, NextResponse } from 'next/server'
import programs from '@/data/affiliate/programs.json'
import { getOutboundLink } from '@/data/outbound-links'
import { resolveGoDestination } from '@/lib/tools/go-destination'
import { recordHop, type HopDevice } from '@/lib/tools/hop-log'
import { recordsFromPrograms } from '@/lib/tools/record'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function hasPrivacyOptOut(request: NextRequest) {
  return (
    request.headers.get('dnt') === '1' ||
    request.headers.get('sec-gpc') === '1'
  )
}

function sanitizeReferrer(value: string | null) {
  if (!value) return null
  try {
    const url = new URL(value)
    return `${url.origin}${url.pathname}`
  } catch {
    return null
  }
}

function getDeviceClass(userAgent: string | null): HopDevice {
  if (!userAgent) return 'unknown'
  return /mobile|android|iphone|ipad/i.test(userAgent) ? 'mobile' : 'desktop'
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const link = getOutboundLink(slug)
  const decision = resolveGoDestination({
    slug,
    records: recordsFromPrograms(programs.programs),
    outboundDestination: link?.destination,
  })

  if (decision.action === 'missing') {
    return NextResponse.redirect(new URL('/404', request.url), 302)
  }

  if (decision.action === 'stack') {
    return NextResponse.redirect(new URL(`/stack/${decision.id}`, request.url), 302)
  }

  if (!hasPrivacyOptOut(request)) {
    const event = {
      slug,
      destination: decision.href,
      device: getDeviceClass(request.headers.get('user-agent')),
      sponsored: decision.action === 'hop',
      at: new Date().toISOString(),
      referrer: sanitizeReferrer(request.headers.get('referer')),
    }
    after(() => recordHop(event))
  }

  return NextResponse.redirect(decision.href, 302)
}
