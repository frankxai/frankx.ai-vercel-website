import { getIssue } from '@/lib/newsletter-issues'
import { createBeehiivDraft, renderBeehiivDraft } from './render-beehiiv'

export interface NewsletterPublishOptions {
  slug: string
  provider?: 'repo' | 'beehiiv'
  dryRun?: boolean
  approvalToken?: string
}

export async function prepareNewsletterPublish(options: NewsletterPublishOptions) {
  const issue = getIssue(options.slug)

  if (!issue) {
    return { ok: false, reason: 'issue-not-found' as const }
  }

  const approvalToken = process.env.NEWSLETTER_PUBLISH_APPROVAL_TOKEN
  const approvalPassed = Boolean(
    approvalToken && options.approvalToken && approvalToken === options.approvalToken
  )

  if (options.provider === 'beehiiv') {
    const result = await createBeehiivDraft(issue, approvalPassed && options.dryRun === false)

    return {
      ok: result.ok || result.dryRun,
      reason: result.reason,
      approvalPassed,
      issue,
      result,
    }
  }

  return {
    ok: true,
    reason: 'repo-preview-ready' as const,
    approvalPassed,
    issue,
    result: renderBeehiivDraft(issue),
  }
}
