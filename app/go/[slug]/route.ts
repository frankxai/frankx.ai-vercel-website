import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getOutboundLink } from '@/data/outbound-links'

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

  if (!link) {
    return NextResponse.redirect(new URL('/404', request.url), 302)
  }

  if (!hasPrivacyOptOut(request)) {
    logClick({
      slug,
      destination: link.destination,
      category: link.category,
      referrer: sanitizeReferrer(request.headers.get('referer')),
      device: getDeviceClass(request.headers.get('user-agent')),
      timestamp: new Date().toISOString(),
    })
  }

  return NextResponse.redirect(link.destination, 302)
}
