import { getChangelogUpdates } from '@/lib/changelog'
import { siteConfig } from '@/lib/seo'

export const dynamic = 'force-static'

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export function GET() {
  const items = getChangelogUpdates()
    .map((update) => {
      const url = `${siteConfig.url}/changelog/${update.slug}`
      return `<item>
  <title>${escapeXml(update.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <description>${escapeXml(update.summary)}</description>
  <category>${escapeXml(update.category)}</category>
  <pubDate>${new Date(`${update.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>
</item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>FrankX Changelog</title>
  <link>${siteConfig.url}/changelog</link>
  <description>Meaningful FrankX releases with public evidence.</description>
  <language>en</language>
  <atom:link href="${siteConfig.url}/changelog/rss.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
