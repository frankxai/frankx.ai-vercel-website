import { bookReviews } from '@/data/book-reviews'

const SITE_URL = 'https://frankx.ai'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const sorted = [...bookReviews].sort((a, b) => {
    const dateA = a.reviewDate ? new Date(a.reviewDate).getTime() : 0
    const dateB = b.reviewDate ? new Date(b.reviewDate).getTime() : 0
    return dateB - dateA
  })

  const items = sorted
    .map((book) => {
      const link = `${SITE_URL}/library/${book.slug}`
      const pubDate = book.reviewDate
        ? new Date(book.reviewDate).toUTCString()
        : new Date().toUTCString()
      const description = book.tldr || book.keyInsights?.[0] || `${book.title} by ${book.author}`
      const categoryLine = (book.categories || [])
        .map((c) => `      <category>${escapeXml(c)}</category>`)
        .join('\n')
      return `    <item>
      <title>${escapeXml(book.title)} — ${escapeXml(book.author)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
${categoryLine}
    </item>`
    })
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FrankX Library — book deep-dives</title>
    <link>${SITE_URL}/library</link>
    <description>Permanent deep-dives on every book Frank reads — quotes, chapters, related reading, and videos.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/library/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
