import { renderIssueEmail } from '@/lib/email-templates-2026'
import type { CompiledIssue } from './types'

/**
 * Convert a compiled issue into a Beehiiv API v2 post payload.
 * Beehiiv accepts `body_content` as HTML. We tag posts by stream id so a single
 * publication can mirror the Resend topic model.
 */
export function renderBeehiivPost(issue: CompiledIssue, utmCampaign: string) {
  const fm = issue.frontmatter
  const { html } = renderIssueEmail({ issue, utmCampaign })

  return {
    title: fm.subject,
    subtitle: fm.preheader,
    slug: fm.slug,
    body_content: html,
    content_tags: [fm.stream],
    status: fm.status === 'published' ? 'confirmed' : 'draft',
    thumbnail_url: undefined as string | undefined,
  }
}

export async function publishToBeehiiv(
  issue: CompiledIssue,
  utmCampaign: string,
  options: { apiKey: string; publicationId: string; dryRun: boolean },
): Promise<{ ok: boolean; id?: string; error?: string }> {
  if (options.dryRun) return { ok: true, id: 'dry-run' }

  const payload = renderBeehiivPost(issue, utmCampaign)

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${options.publicationId}/posts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${options.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    )

    if (!res.ok) {
      const text = await res.text()
      return { ok: false, error: `Beehiiv ${res.status}: ${text.slice(0, 200)}` }
    }
    const data = (await res.json()) as { data?: { id?: string } }
    return { ok: true, id: data.data?.id }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) }
  }
}
