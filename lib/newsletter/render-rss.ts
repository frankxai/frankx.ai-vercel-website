import { renderIssueEmail, streamMeta } from '@/lib/email-templates-2026'
import type { CompiledIssue } from './types'

const SITE = 'https://frankx.ai'

export function renderRssItem(issue: CompiledIssue): string {
  const fm = issue.frontmatter
  const { html } = renderIssueEmail({ issue, utmCampaign: `rss-${fm.slug}` })
  const url = `${SITE}/newsletters/${fm.stream}/${fm.slug}`
  const pubDate = new Date(`${fm.date}T14:00:00Z`).toUTCString()

  return `
    <item>
      <title>${escapeXml(fm.subject)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(fm.preheader)}</description>
      <content:encoded><![CDATA[${html}]]></content:encoded>
    </item>`.trim()
}

export function renderRssFeed(streamId: string, issues: CompiledIssue[]): string {
  const meta = streamMeta(streamId)
  const items = issues
    .filter((i) => i.frontmatter.status === 'published')
    .map(renderRssItem)
    .join('\n')

  const lastBuild = new Date().toUTCString()

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(meta.name)}</title>
    <link>${SITE}/newsletters/${streamId}</link>
    <atom:link href="${SITE}/newsletters/${streamId}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(meta.tagline)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    ${items}
  </channel>
</rss>`
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
