import {
  TALLINN_EVENT,
  TALLINN_TIME_WINDOWS,
  TALLINN_VALIDATION_GATE,
  getTallinnExperience,
} from '@/data/tallinn-experiences'
import type { TallinnInterestPayload } from '@/lib/tallinn-interest/schema'

type TallinnSlotLabel = (typeof TALLINN_TIME_WINDOWS)[number]['label']

const HTML_AMPERSAND_RE = /&/g
const HTML_LESS_THAN_RE = /</g
const HTML_GREATER_THAN_RE = />/g
const HTML_DOUBLE_QUOTE_RE = /"/g
const HTML_SINGLE_QUOTE_RE = /'/g
const WHITESPACE_RE = /\s+/

export interface TallinnEmailContent {
  subject: string
  text: string
  html: string
}
function escapeHtml(value: string) {
  return value
    .replace(HTML_AMPERSAND_RE, '&amp;')
    .replace(HTML_LESS_THAN_RE, '&lt;')
    .replace(HTML_GREATER_THAN_RE, '&gt;')
    .replace(HTML_DOUBLE_QUOTE_RE, '&quot;')
    .replace(HTML_SINGLE_QUOTE_RE, '&#39;')
}

function slotLabels(payload: TallinnInterestPayload) {
  return payload.slotIds
    .map((id) => TALLINN_TIME_WINDOWS.find((slot) => slot.id === id)?.label)
    .filter((label): label is TallinnSlotLabel => label !== undefined)
}

export function buildTallinnInterestReceipt(
  payload: TallinnInterestPayload,
): TallinnEmailContent {
  const experience = getTallinnExperience(payload.experienceSlug)
  const firstName = payload.fullName.split(WHITESPACE_RE)[0] || payload.fullName
  const slots = slotLabels(payload)
  const title = experience?.title ?? 'Tallinn working session'
  const subject = `We received your interest — ${title}`
  const nextStep = `We will contact you only if at least ${TALLINN_VALIDATION_GATE.minimumConfirmed} people confirm the same time. Until then, nothing is booked. This message is not a ticket or venue confirmation.`

  const text = [
    `Hi ${firstName},`,
    '',
    `Thank you — we received your interest in “${title}”.`,
    '',
    'Possible times:',
    ...slots.map((slot) => `- ${slot}`),
    '',
    nextStep,
    '',
    TALLINN_EVENT.independenceNotice,
    '',
    payload.aftercareConsent
      ? 'If the session runs, you asked to receive the completed materials and one session-related check-in seven days later.'
      : 'You did not opt into aftercare. Only coordination about this request will be sent.',
    '',
    '— Frank',
    'frank@frankx.ai · frankx.ai',
  ].join('\n')

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;color:#172033;line-height:1.65">
  <p>Hi ${escapeHtml(firstName)},</p>
  <p>Thank you — we received your interest in <strong>${escapeHtml(title)}</strong>.</p>
  <div style="margin:20px 0;padding:16px 18px;border-radius:14px;background:#f1f5f9;color:#334155">
    <strong>Possible times</strong>
    <ul>${slots.map((slot) => `<li>${escapeHtml(slot)}</li>`).join('')}</ul>
  </div>
  <p>${escapeHtml(nextStep)}</p>
  <p style="font-size:13px;color:#64748b">${escapeHtml(TALLINN_EVENT.independenceNotice)}</p>
  <p style="font-size:13px;color:#64748b">${
    payload.aftercareConsent
      ? 'If the session runs, you asked to receive the completed materials and one session-related check-in seven days later.'
      : 'You did not opt into aftercare. Only coordination about this request will be sent.'
  }</p>
  <p style="margin-top:26px;color:#64748b">— Frank<br/>frank@frankx.ai · frankx.ai</p>
</div>`.trim()

  return { subject, text, html }
}

export function buildTallinnOperatorNotification(
  payload: TallinnInterestPayload,
): TallinnEmailContent {
  const experience = getTallinnExperience(payload.experienceSlug)
  const slots = slotLabels(payload)
  const title = experience?.title ?? payload.experienceSlug
  const subject = `Tallinn interest · ${title} · ${payload.fullName}`
  const lines = [
    'New Tallinn session interest.',
    '',
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Offer: ${title} (${payload.experienceSlug})`,
    `Variant: ${payload.variantId}`,
    `Role lens: ${payload.roleLens}`,
    `Attendance intent: ${payload.attendanceIntent}`,
    `Possible times: ${slots.join(' | ')}`,
    `Company / project: ${payload.companyOrProject || '(not provided)'}`,
    `Aftercare: ${payload.aftercareConsent ? 'requested' : 'not requested'}`,
    `Note: ${payload.note || '(not provided)'}`,
    `Submission ID: ${payload.submissionId}`,
    '',
    'Venue gate remains human-approved. Do not book from this message alone.',
  ]

  const text = lines.join('\n')
  const html = `<pre style="white-space:pre-wrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;line-height:1.6;color:#172033">${escapeHtml(text)}</pre>`
  return { subject, text, html }
}
