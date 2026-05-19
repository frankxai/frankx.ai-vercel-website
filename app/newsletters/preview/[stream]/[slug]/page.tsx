import fs from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import { readIssueFile } from '@/lib/newsletter/compile-mdx'
import { renderEmail } from '@/lib/newsletter/render-email'

/**
 * Dev/admin preview of a rendered newsletter issue.
 * Production builds 404 this route to avoid exposing draft content.
 */
export const dynamic = 'force-dynamic'

export default async function NewsletterPreviewPage({
  params,
}: {
  params: Promise<{ stream: string; slug: string }>
}) {
  if (process.env.NODE_ENV === 'production' && process.env.NEWSLETTER_PREVIEW !== 'enabled') {
    notFound()
  }

  const { stream, slug } = await params
  const dir = path.join(process.cwd(), 'content', 'newsletters', stream)
  if (!fs.existsSync(dir)) notFound()

  const file = fs.readdirSync(dir).find((f) => f.includes(slug))
  if (!file) notFound()

  const issue = readIssueFile(path.join(dir, file))
  const { subject, html } = renderEmail(issue, `preview-${slug}`)

  return (
    <html lang="en">
      <head>
        <title>Preview · {subject}</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0a0a0f' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px' }}>
          <div
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 12,
              color: '#94a3b8',
              padding: '12px 16px',
              backgroundColor: '#141420',
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            <strong style={{ color: '#22d3ee' }}>PREVIEW</strong> · {stream} · {issue.frontmatter.status} ·{' '}
            <span style={{ color: '#fbbf24' }}>Subject:</span> {subject}
          </div>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </body>
    </html>
  )
}
