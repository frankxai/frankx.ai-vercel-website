import type { NewsletterIssue } from '@/lib/newsletter-issues'

export interface BeehiivDraftPayload {
  title: string
  subtitle: string
  slug: string
  content_tags: string[]
  body_content: string
  status: 'draft'
}

export function renderBeehiivDraft(issue: NewsletterIssue): BeehiivDraftPayload {
  return {
    title: issue.subject,
    subtitle: issue.preview,
    slug: issue.slug,
    content_tags: [issue.theme, ...(issue.connectsTo || [])].filter(Boolean),
    body_content: issue.content,
    status: 'draft',
  }
}

export async function createBeehiivDraft(issue: NewsletterIssue, allowNetwork = false) {
  const apiKey = process.env.BEEHIIV_API_KEY
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID
  const payload = renderBeehiivDraft(issue)

  if (!allowNetwork || !apiKey || !publicationId) {
    return {
      ok: false,
      dryRun: true,
      reason: !allowNetwork ? 'network-disabled' : 'missing-beehiiv-config',
      payload,
    }
  }

  const response = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/posts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return {
    ok: response.ok,
    dryRun: false,
    reason: response.ok ? 'draft-created' : await response.text(),
    payload,
  }
}
