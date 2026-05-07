import { getAllBlogPosts } from '@/lib/blog'
import { siteConfig } from '@/lib/seo'

const SITE_URL = siteConfig.url

function escapeXml(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const FEED_LIMIT = 50

export async function GET() {
  const posts = getAllBlogPosts().slice(0, FEED_LIMIT)

  const items = posts
    .map((post) => {
      const dateStr = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString()
      const description = post.tldr || post.description || ''
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${dateStr}</pubDate>
      <category>${escapeXml(post.category || 'AI & Systems')}</category>
      <author>noreply@frankx.ai (${escapeXml(post.author || 'Frank')})</author>
    </item>`
    })
    .join('\n')

  const buildDate = new Date().toUTCString()
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(siteConfig.name)} — AI Architect &amp; Creator</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} Frank X. Riemer</copyright>
    <managingEditor>noreply@frankx.ai (Frank)</managingEditor>
    <webMaster>noreply@frankx.ai (Frank)</webMaster>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
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

export const revalidate = 3600
