import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import programs from '@/data/affiliate/programs.json'
import { getOutboundLink } from '@/data/outbound-links'
import { resolveGoDestination } from '@/lib/tools/go-destination'
import { recordsFromPrograms } from '@/lib/tools/record'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function logClick(entry: Record<string, unknown>) {
  try {
    const logDir = path.join(process.cwd(), '.logs')
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true })
    const file = path.join(logDir, 'outbound-clicks.jsonl')
    fs.appendFileSync(file, JSON.stringify(entry) + '\n')
  } catch {
    /* logging must never block the redirect */
  }
}

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

function getDeviceClass(userAgent: string | null) {
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
    logClick({
      slug,
      destination: decision.href,
      category: link?.category ?? 'tool',
      referrer: sanitizeReferrer(request.headers.get('referer')),
      device: getDeviceClass(request.headers.get('user-agent')),
      timestamp: new Date().toISOString(),
    })
  }

  return NextResponse.redirect(decision.href, 302)
}
