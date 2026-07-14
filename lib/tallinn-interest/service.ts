import {
  buildTallinnInterestReceipt,
  buildTallinnOperatorNotification,
} from '@/lib/email-templates-tallinn'
import { INTENT_LABEL } from '@/lib/intake-types'
import type { TallinnInterestPayload } from '@/lib/tallinn-interest/schema'

export interface TallinnCaptureEnvironment {
  notionToken: string
  notionDatabaseId: string
  resendApiKey?: string
  operatorEmail: string
}
export interface TallinnCaptureDependencies {
  fetchImpl?: typeof fetch
  now?: () => Date
}

export interface TallinnCaptureResult {
  stored: boolean
  duplicate: boolean
  receiptSent: boolean
  operatorNotified: boolean
  recordId?: string
  error?: 'notion-query-failed' | 'notion-write-failed'
}

const NOTION_VERSION = '2022-06-28'
const FROM_NOTIFY = 'FrankX Tallinn <notify@mail.frankx.ai>'
const FROM_FRANK = 'Frank <frank@mail.frankx.ai>'

function sourceKey(payload: TallinnInterestPayload) {
  return `tallinn-2026|${payload.experienceSlug}|${payload.variantId}|${payload.submissionId}`
}

function structuredMessage(payload: TallinnInterestPayload, capturedAt: string) {
  return [
    'Tallinn Experience Foundry — independent 90-minute session interest',
    `Experience: ${payload.experienceSlug}`,
    `Variant: ${payload.variantId}`,
    `Role lens: ${payload.roleLens}`,
    `Attendance intent: ${payload.attendanceIntent}`,
    `Slot IDs: ${payload.slotIds.join(', ')}`,
    `Aftercare consent: ${payload.aftercareConsent ? 'yes' : 'no'}`,
    `Contact consent: yes (${capturedAt})`,
    `Privacy version: tallinn-interest-v1-2026-07-14`,
    `Note: ${payload.note || '(none)'}`,
  ].join('\n')
}

async function fetchWithTimeout(
  fetchImpl: typeof fetch,
  input: string,
  init: RequestInit,
  timeoutMs = 5_000,
) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetchImpl(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

async function findExistingRecord(
  key: string,
  env: TallinnCaptureEnvironment,
  fetchImpl: typeof fetch,
) {
  const response = await fetchWithTimeout(
    fetchImpl,
    `https://api.notion.com/v1/databases/${env.notionDatabaseId}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.notionToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_VERSION,
      },
      body: JSON.stringify({
        page_size: 1,
        filter: {
          property: 'Source',
          rich_text: { equals: key },
        },
      }),
    },
  )

  if (!response.ok) return { ok: false as const }
  const body = (await response.json()) as { results?: Array<{ id?: string }> }
  return {
    ok: true as const,
    recordId: body.results?.[0]?.id,
  }
}

async function createRecord(
  payload: TallinnInterestPayload,
  key: string,
  capturedAt: string,
  env: TallinnCaptureEnvironment,
  fetchImpl: typeof fetch,
) {
  const response = await fetchWithTimeout(fetchImpl, 'https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.notionToken}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION,
    },
    body: JSON.stringify({
      parent: { database_id: env.notionDatabaseId },
      properties: {
        Name: { title: [{ text: { content: payload.fullName } }] },
        Email: { email: payload.email },
        Intent: { select: { name: INTENT_LABEL.general } },
        Stage: { select: { name: 'New' } },
        Company: payload.companyOrProject
          ? { rich_text: [{ text: { content: payload.companyOrProject } }] }
          : { rich_text: [] },
        Source: { rich_text: [{ text: { content: key } }] },
        Message: {
          rich_text: [
            {
              text: {
                content: structuredMessage(payload, capturedAt).slice(0, 1_900),
              },
            },
          ],
        },
      },
    }),
  })

  if (!response.ok) return { ok: false as const }
  const body = (await response.json()) as { id?: string }
  return { ok: true as const, recordId: body.id }
}

async function sendEmail(
  fetchImpl: typeof fetch,
  apiKey: string | undefined,
  input: {
    from: string
    to: string
    replyTo: string
    subject: string
    text: string
    html: string
  },
) {
  if (!apiKey) return false
  try {
    const response = await fetchWithTimeout(fetchImpl, 'https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: input.from,
        to: input.to,
        reply_to: input.replyTo,
        subject: input.subject,
        text: input.text,
        html: input.html,
      }),
    })
    return response.ok
  } catch {
    return false
  }
}

export async function captureTallinnInterest(
  payload: TallinnInterestPayload,
  env: TallinnCaptureEnvironment,
  dependencies: TallinnCaptureDependencies = {},
): Promise<TallinnCaptureResult> {
  const fetchImpl = dependencies.fetchImpl ?? fetch
  const capturedAt = (dependencies.now?.() ?? new Date()).toISOString()
  const key = sourceKey(payload)

  let existing: Awaited<ReturnType<typeof findExistingRecord>>
  try {
    existing = await findExistingRecord(key, env, fetchImpl)
  } catch {
    return {
      stored: false,
      duplicate: false,
      receiptSent: false,
      operatorNotified: false,
      error: 'notion-query-failed',
    }
  }
  if (!existing.ok) {
    return {
      stored: false,
      duplicate: false,
      receiptSent: false,
      operatorNotified: false,
      error: 'notion-query-failed',
    }
  }
  if (existing.recordId) {
    return {
      stored: true,
      duplicate: true,
      receiptSent: false,
      operatorNotified: false,
      recordId: existing.recordId,
    }
  }

  let created: Awaited<ReturnType<typeof createRecord>>
  try {
    created = await createRecord(payload, key, capturedAt, env, fetchImpl)
  } catch {
    return {
      stored: false,
      duplicate: false,
      receiptSent: false,
      operatorNotified: false,
      error: 'notion-write-failed',
    }
  }
  if (!created.ok) {
    return {
      stored: false,
      duplicate: false,
      receiptSent: false,
      operatorNotified: false,
      error: 'notion-write-failed',
    }
  }

  const receipt = buildTallinnInterestReceipt(payload)
  const notification = buildTallinnOperatorNotification(payload)
  const [receiptSent, operatorNotified] = await Promise.all([
    sendEmail(fetchImpl, env.resendApiKey, {
      from: FROM_FRANK,
      to: payload.email,
      replyTo: env.operatorEmail,
      ...receipt,
    }),
    sendEmail(fetchImpl, env.resendApiKey, {
      from: FROM_NOTIFY,
      to: env.operatorEmail,
      replyTo: payload.email,
      ...notification,
    }),
  ])

  return {
    stored: true,
    duplicate: false,
    receiptSent,
    operatorNotified,
    recordId: created.recordId,
  }
}
