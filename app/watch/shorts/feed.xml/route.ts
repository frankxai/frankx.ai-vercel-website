import { getShorts } from '@/lib/video'

const SITE_URL = 'https://frankx.ai'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * RSS 2.0 feed with MediaRSS extensions for video Shorts.
 * Used by: Google Discover, creator newsletter tools, RSS readers.
 *
 * Each item includes the YouTube embed URL and thumbnail via media: namespace,
 * letting readers render the Short inline.
 */
export async function GET() {
  const shorts = getShorts()

  const items = shorts
    .map((s) => {
      const detailUrl = `${SITE_URL}/watch/shorts/${s.id}`
      const embedUrl = `https://www.youtube.com/embed/${s.id}`
      const thumb = `https://img.youtube.com/vi/${s.id}/maxresdefault.jpg`
      const pubDate = s.uploadDate
        ? new Date(s.uploadDate).toUTCString()
        : new Date().toUTCString()
      const description = escapeXml(
        s.commentary ||
          s.description ||
          `${s.title} — curated by FrankX.`
      )
      return `    <item>
      <title>${escapeXml(s.title)}</title>
      <link>${detailUrl}</link>
      <guid isPermaLink="true">${detailUrl}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(s.category)}</category>
      <author>${escapeXml(s.author)}</author>
      <media:content url="${embedUrl}" type="text/html" medium="video" height="720" width="405" />
      <media:thumbnail url="${thumb}" height="720" width="1280" />
      <media:title>${escapeXml(s.title)}</media:title>
      <media:description>${description}</media:description>
    </item>`
    })
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>FrankX — AI Shorts</title>
    <link>${SITE_URL}/watch/shorts</link>
    <description>60-second high-signal Shorts on AI, peak performance, and the craft of building — curated by AI Architect Frank Riemer with editorial commentary.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>FrankX AI Shorts</title>
      <link>${SITE_URL}/watch/shorts</link>
    </image>
    <atom:link href="${SITE_URL}/watch/shorts/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800',
    },
  })
}
