import { getPublishedIssues } from '@/lib/newsletter-issues'

export const dynamic = 'force-dynamic'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const issues = getPublishedIssues()

  const items = issues
    .map((issue) => {
      const url = `https://frankx.ai/newsletter/archive/${issue.slug}`
      return [
        '<item>',
        `<title>${escapeXml(issue.subject)}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<pubDate>${new Date(issue.date).toUTCString()}</pubDate>`,
        `<description>${escapeXml(issue.preview || issue.theme)}</description>`,
        '</item>',
      ].join('')
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>FrankX Newsletter</title><link>https://frankx.ai/newsletter</link><description>Weekly AI operating notes from FrankX.</description>${items}</channel></rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
