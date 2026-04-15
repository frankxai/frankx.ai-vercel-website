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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const link = getOutboundLink(slug)

  if (!link) {
    return NextResponse.redirect(new URL('/404', request.url), 302)
  }

  logClick({
    slug,
    destination: link.destination,
    category: link.category,
    referrer: request.headers.get('referer') ?? null,
    userAgent: request.headers.get('user-agent') ?? null,
    timestamp: new Date().toISOString(),
  })

  return NextResponse.redirect(link.destination, 302)
}
