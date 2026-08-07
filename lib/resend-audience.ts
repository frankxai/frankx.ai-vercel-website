/**
 * Resend is the system of record for subscribers. Anything that captures an
 * email must land a contact here — an in-process store does not survive a
 * serverless invocation.
 *
 * The audience id is duplicated in app/api/subscribe/route.ts; that route
 * should be moved onto this module rather than the constant being copied again.
 */
export const RESEND_AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'
export const RESEND_FROM = 'Frank <frank@mail.frankx.ai>'

type AddContactResult = { ok: true; id: string | null } | { ok: false; status: number; error: unknown }

export async function addAudienceContact(email: string, firstName?: string): Promise<AddContactResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, status: 500, error: 'RESEND_API_KEY not configured' }

  const response = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, first_name: firstName || undefined, unsubscribed: false }),
  })

  // 409 means the contact already exists, which is a success for lead capture:
  // an existing subscriber requesting a second magnet still gets their download.
  if (response.status === 409) return { ok: true, id: null }
  if (!response.ok) return { ok: false, status: response.status, error: await response.json().catch(() => null) }

  const data = await response.json().catch(() => ({}))
  return { ok: true, id: data?.id ?? null }
}

export async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: RESEND_FROM, to, subject, html }),
  })
}
