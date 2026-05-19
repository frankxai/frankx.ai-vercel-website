import { getAllIssues } from '@/lib/newsletter-archive'

const SITE_URL = 'https://frankx.ai'
const TITLE = 'AI Architect Newsletter'
const DESCRIPTION =
  'Weekly signal from the intersection of AI, architecture, and the creator economy. No drip sequence, no marketing automation.'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const issues = getAllIssues()
  const lastBuild = issues[0]?.sentDate || new Date().toISOString().slice(0, 10)

  const items = issues
    .map((issue) => {
      const url = `${SITE_URL}/newsletter/archive/${issue.slug}`
      return `
    <item>
      <title>${escapeXml(issue.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(issue.sentDate).toUTCString()}</pubDate>
      <description>${escapeXml(issue.excerpt)}</description>
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(TITLE)}</title>
    <link>${SITE_URL}/newsletter/archive</link>
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/newsletter/feed.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
