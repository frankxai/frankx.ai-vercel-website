export const dynamic = 'force-static'

const BASE_URL = 'https://frankx.ai'

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FrankX Research Intelligence Hub</title>
    <link>${BASE_URL}/research</link>
    <description>Reviewed research briefs from FrankX. Publication is paused while source review is in progress.</description>
    <language>en-us</language>
    <atom:link href="${BASE_URL}/research/feed" rel="self" type="application/rss+xml"/>
    <managingEditor>frank@frankx.ai (Frank Riemer)</managingEditor>
    <webMaster>frank@frankx.ai (Frank Riemer)</webMaster>
    <ttl>1440</ttl>
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
