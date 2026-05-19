import fs from 'node:fs'
import path from 'node:path'
import { readIssueFile } from './compile-mdx'
import { renderEmail } from './render-email'
import { publishToBeehiiv } from './render-beehiiv'
import { renderRssFeed } from './render-rss'
import { listIssuesForStream } from './compile-mdx'
import type { CompiledIssue, PublishResult } from './types'

const RESEND_API = 'https://api.resend.com'
const RESEND_AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'
const TOPIC_NEWSLETTER = 'b613f6ff-9c56-4b4c-86df-9217843c5d78'
const TOPIC_MUSIC = '018a5159-10c8-4595-8ecc-63d7a2c6b442'
const TOPIC_PRODUCT = '811064ed-7444-45db-9a2a-fd8c83a21053'

const STREAM_TOPICS: Record<string, string[]> = {
  'creation-chronicles': [TOPIC_NEWSLETTER],
  'ai-architect': [TOPIC_NEWSLETTER],
  'music-lab': [TOPIC_MUSIC, TOPIC_NEWSLETTER],
  arcanea: [TOPIC_NEWSLETTER],
  investor: [TOPIC_NEWSLETTER],
  'inner-circle': [TOPIC_NEWSLETTER, TOPIC_PRODUCT],
}

export interface PublishOptions {
  issuePath: string
  dryRun?: boolean
  targets?: { resend?: boolean; beehiiv?: boolean; rss?: boolean }
  to?: string // override recipient for dry-runs / test sends
}

export async function publishIssue(options: PublishOptions): Promise<PublishResult> {
  const issue = readIssueFile(options.issuePath)
  const fm = issue.frontmatter
  const dryRun = options.dryRun ?? false
  const targets = options.targets ?? { resend: true, beehiiv: true, rss: true }
  const issueId = `${fm.stream}/${fm.slug}`
  const utmCampaign = `${fm.stream}-${fm.date}`
  const subjectVariant = (fm.subjectVariants && fm.subjectVariants[0]) || 'A'

  const result: PublishResult = {
    issueId,
    sentAt: new Date().toISOString(),
    platforms: {},
    subjectVariant,
    utmCampaign,
    dryRun,
  }

  if (targets.resend) {
    result.platforms.resend = await sendViaResend(issue, utmCampaign, dryRun, options.to)
  }

  if (targets.beehiiv) {
    const apiKey = process.env.BEEHIIV_API_KEY
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID
    if (!apiKey || !publicationId) {
      result.platforms.beehiiv = {
        ok: false,
        error: 'BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID not configured',
      }
    } else {
      result.platforms.beehiiv = await publishToBeehiiv(issue, utmCampaign, {
        apiKey,
        publicationId,
        dryRun,
      })
    }
  }

  if (targets.rss) {
    result.platforms.rss = writeRssLedger(issue, dryRun)
  }

  if (!dryRun) appendExperimentLedger(result)
  return result
}

async function sendViaResend(
  issue: CompiledIssue,
  utmCampaign: string,
  dryRun: boolean,
  toOverride?: string,
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, error: 'RESEND_API_KEY not configured' }

  const fm = issue.frontmatter
  const topics = STREAM_TOPICS[fm.stream] || [TOPIC_NEWSLETTER]
  const { subject, html, text } = renderEmail(issue, utmCampaign)
  const from = 'Frank <frank@mail.frankx.ai>'

  if (dryRun) {
    const to = toOverride || 'frank@frankx.ai'
    const res = await fetch(`${RESEND_API}/emails`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject: `[DRY] ${subject}`, html, text }),
    })
    if (!res.ok) return { ok: false, error: `Resend dry-run ${res.status}` }
    const data = (await res.json()) as { id?: string }
    return { ok: true, id: data.id }
  }

  // Production send via broadcast targeting the stream topic(s)
  const res = await fetch(`${RESEND_API}/broadcasts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      audience_id: RESEND_AUDIENCE_ID,
      from,
      subject,
      html,
      text,
      topic_ids: topics,
    }),
  })
  if (!res.ok) {
    const errText = await res.text()
    return { ok: false, error: `Resend broadcast ${res.status}: ${errText.slice(0, 200)}` }
  }
  const data = (await res.json()) as { id?: string }

  // Trigger send immediately
  if (data.id) {
    await fetch(`${RESEND_API}/broadcasts/${data.id}/send`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
    })
  }
  return { ok: true, id: data.id }
}

function writeRssLedger(
  issue: CompiledIssue,
  dryRun: boolean,
): { ok: boolean; url?: string; error?: string } {
  const fm = issue.frontmatter
  const url = `https://frankx.ai/newsletters/${fm.stream}/rss.xml`
  if (dryRun) return { ok: true, url: `${url} (dry-run)` }
  // RSS is generated on-demand from filesystem; nothing to write here other than
  // confirming the issue is marked `status: published` (Publisher's job during the flow).
  if (fm.status !== 'published') {
    return { ok: false, error: `Issue status is "${fm.status}" — flip to "published" to surface in RSS` }
  }
  return { ok: true, url }
}

function appendExperimentLedger(result: PublishResult): void {
  const ledger = path.join(process.cwd(), 'data', 'newsletter-experiments.json')
  let entries: PublishResult[] = []
  if (fs.existsSync(ledger)) {
    try {
      entries = JSON.parse(fs.readFileSync(ledger, 'utf8')) as PublishResult[]
    } catch {
      entries = []
    }
  }
  entries.push(result)
  fs.writeFileSync(ledger, JSON.stringify(entries, null, 2) + '\n')
}

export { listIssuesForStream, renderRssFeed }
