import { researchDomains } from '@/lib/research/domains'
import { domainSources } from '@/lib/research/sources'

export const dynamic = 'force-static'

const BASE_URL = 'https://frankx.ai'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const uniqueSourceCount = new Set(
    Object.values(domainSources).flat().map(s => s.url)
  ).size

  // Sort domains by lastUpdated (most recent first)
  const sorted = [...researchDomains].sort(
    (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  )

  const items = sorted.map(domain => {
    const sources = domainSources[domain.slug] || []
    const pubDate = new Date(domain.lastUpdated).toUTCString()

    return `    <item>
      <title>${escapeXml(domain.title)}</title>
      <link>${BASE_URL}/research/${domain.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/research/${domain.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(domain.tldr)}</description>
      ${domain.category ? `<category>${escapeXml(domain.category)}</category>` : ''}
      <source url="${BASE_URL}/research">${escapeXml('FrankX Research Hub')}</source>
      ${sources.length > 0 ? `<comments>${sources.length} verified sources</comments>` : ''}
    </item>`
  }).join('\n')

  const lastBuildDate = sorted.length > 0
    ? new Date(sorted[0].lastUpdated).toUTCString()
    : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FrankX Research Intelligence Hub</title>
    <link>${BASE_URL}/research</link>
    <description>Validated AI research across ${researchDomains.length} domains with ${uniqueSourceCount}+ verified sources. Enterprise AI, multi-agent systems, production patterns, and emerging technology.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/research/feed" rel="self" type="application/rss+xml"/>
    <managingEditor>frank@frankx.ai (Frank van den Bergh)</managingEditor>
    <webMaster>frank@frankx.ai (Frank van den Bergh)</webMaster>
    <ttl>1440</ttl>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
