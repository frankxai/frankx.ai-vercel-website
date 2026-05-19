import { NextResponse } from 'next/server'
import { listIssuesForStream } from '@/lib/newsletter/compile-mdx'
import { renderRssFeed } from '@/lib/newsletter/render-rss'

const KNOWN_STREAMS = new Set([
  'creation-chronicles',
  'ai-architect',
  'music-lab',
  'arcanea',
  'investor',
  'inner-circle',
])

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ stream: string }> },
) {
  const { stream } = await params

  if (!KNOWN_STREAMS.has(stream)) {
    return new NextResponse('Unknown stream', { status: 404 })
  }

  const issues = listIssuesForStream(stream)
  const feed = renderRssFeed(stream, issues)

  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}

export const dynamic = 'force-dynamic'
