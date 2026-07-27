import { getJournalEntrySummaries } from '@/lib/journal'
import { siteConfig } from '@/lib/seo'

export const dynamic = 'force-static'
// Match the index page, so the feed and the page never disagree about which
// entries exist.
export const revalidate = 3600

const BASE_URL = siteConfig.url

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  // Private and unpublished entries never reach this list — the loader filters
  // them before anything here runs.
  const entries = getJournalEntrySummaries()

  const items = entries
    .map((entry) => {
      const date = new Date(entry.date)
      const pubDate = Number.isNaN(date.getTime())
        ? new Date().toUTCString()
        : date.toUTCString()

      return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${BASE_URL}/journal/${entry.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/journal/${entry.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(entry.summary || entry.title)}</description>
      <category>${escapeXml(entry.kind)}</category>
    </item>`
    })
    .join('\n')

  const latest = entries[0] ? new Date(entries[0].date) : null
  const lastBuildDate =
    latest && !Number.isNaN(latest.getTime())
      ? latest.toUTCString()
      : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FrankX Journal</title>
    <link>${BASE_URL}/journal</link>
    <description>Short, dated working notes from Frank Riemer on AI architecture, building, and creative systems. Long-form articles live at ${BASE_URL}/blog.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/journal/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>frank@frankx.ai (Frank Riemer)</managingEditor>
    <webMaster>frank@frankx.ai (Frank Riemer)</webMaster>
    <ttl>1440</ttl>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
