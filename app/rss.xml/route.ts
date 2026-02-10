import { getAllBlogPosts } from '@/lib/blog'
import { getAllGuides } from '@/lib/guides'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = getAllBlogPosts()
  const guides = getAllGuides()

  const blogItems = posts.map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://frankx.ai/blog/${post.slug}</link>
      <guid>https://frankx.ai/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description || '')}</description>
      <category>${escapeXml(post.category || 'Blog')}</category>
    </item>`
  )

  const guideItems = guides.map(
    (guide) => `    <item>
      <title>${escapeXml(guide.title)}</title>
      <link>https://frankx.ai/guides/${guide.slug}</link>
      <guid>https://frankx.ai/guides/${guide.slug}</guid>
      <pubDate>${new Date(guide.date).toUTCString()}</pubDate>
      <description>${escapeXml(guide.description || '')}</description>
      <category>Guide</category>
    </item>`
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FrankX — AI Architect &amp; Creator</title>
    <link>https://frankx.ai</link>
    <description>AI architecture, music production, and creator tools. Enterprise systems, Suno workflows, and practical AI for builders.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://frankx.ai/rss.xml" rel="self" type="application/rss+xml"/>
${[...blogItems, ...guideItems].join('\n')}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
