import { tokens as T } from '@/lib/email-design-system'

/**
 * Sends a notification email to Frank on every form submission.
 * Uses Resend — already configured in the project.
 * Always call as fire-and-forget: notifyAdmin(...).catch(console.error)
 */
export async function notifyAdmin(params: {
  formType: string // 'newsletter' | 'coaching' | 'cohort' | 'pdf-lead' | 'feedback' | 'purchase'
  email: string // submitter's email
  name?: string
  details?: Record<string, string> // extra fields to show
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const { formType, email, name, details } = params
  const toEmail = process.env.RESEND_FROM_EMAIL || 'frank@mail.frankx.ai'

  // Build detail rows
  const detailRows = Object.entries(details || {})
    .map(
      ([key, value]) => `
      <tr>
        <td style="padding: 8px 12px; color: ${T.textMuted}; font-size: 13px; border-bottom: 1px solid ${T.borderGlass}; white-space: nowrap; vertical-align: top;">${key}</td>
        <td style="padding: 8px 12px; color: ${T.textPrimary}; font-size: 13px; border-bottom: 1px solid ${T.borderGlass};">${value}</td>
      </tr>`
    )
    .join('')

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 24px; background: ${T.bgDeep}; font-family: ${T.fontStack};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; margin: 0 auto;">
    <tr>
      <td style="background: ${T.bgCard}; border: 1px solid ${T.borderGlass}; border-radius: ${T.radiusSmall}; padding: 24px;">
        <p style="margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: ${T.textDim};">Admin Notification</p>
        <h1 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: ${T.textPrimary};">New ${formType}</h1>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid ${T.borderGlass}; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 8px 12px; color: ${T.textMuted}; font-size: 13px; border-bottom: 1px solid ${T.borderGlass}; white-space: nowrap; vertical-align: top;">Email</td>
            <td style="padding: 8px 12px; font-size: 13px; border-bottom: 1px solid ${T.borderGlass};"><a href="mailto:${email}" style="color: ${T.accentCyan}; text-decoration: none;">${email}</a></td>
          </tr>
          ${name ? `<tr>
            <td style="padding: 8px 12px; color: ${T.textMuted}; font-size: 13px; border-bottom: 1px solid ${T.borderGlass}; white-space: nowrap; vertical-align: top;">Name</td>
            <td style="padding: 8px 12px; color: ${T.textPrimary}; font-size: 13px; border-bottom: 1px solid ${T.borderGlass};">${name}</td>
          </tr>` : ''}
          ${detailRows}
        </table>

        <p style="margin: 16px 0 0; font-size: 11px; color: ${T.textFaint};">${new Date().toISOString()}</p>
      </td>
    </tr>
  </table>
</body>
</html>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Frank <frank@mail.frankx.ai>',
      to: toEmail,
      subject: `[FrankX] New ${formType}: ${email}`,
      html,
      reply_to: email,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    console.error('[notifyAdmin] Resend error:', err)
  }
}
