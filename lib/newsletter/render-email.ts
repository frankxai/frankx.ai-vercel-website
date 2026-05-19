import { renderIssueEmail } from '@/lib/email-templates-2026'
import type { CompiledIssue } from './types'

export function renderEmail(issue: CompiledIssue, utmCampaign: string) {
  return renderIssueEmail({ issue, utmCampaign })
}
