/**
 * Welcome email for the Ikigai & Branding Workshop list.
 * Sent immediately after subscribe. Delivers the Coach GPT link + workshop link
 * + a real Day-7 check-in promise (sent manually by Frank from his own inbox —
 * not an automation, so the copy says "I will email you").
 */

interface EmailTemplate {
  subject: string
  html: string
}

export function ikigaiBrandingEmail({
  recipientName,
}: {
  recipientName: string
}): EmailTemplate {
  const firstName = recipientName?.split(' ')[0] || 'Creator'

  return {
    subject: 'Your Ikigai & Branding Coach is open',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your Ikigai & Branding Coach is open</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0b;color:#e2e8f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0b;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
      <tr><td style="padding:0 0 24px 0;">
        <h1 style="margin:0 0 12px 0;font-size:28px;line-height:1.2;font-weight:700;color:#ffffff;">
          Welcome, ${firstName}.
        </h1>
        <p style="margin:0;font-size:16px;line-height:1.6;color:#94a3b8;">
          You just joined the Ikigai &amp; Branding Workshop list. Two things below — the Coach GPT (your forever thinking partner for this work) and the workshop page itself. Open whichever feels right tonight.
        </p>
      </td></tr>

      <tr><td style="padding:0 0 24px 0;">
        <div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:12px;padding:20px;">
          <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#a78bfa;font-weight:600;">
            Step 1 — Talk to the coach
          </p>
          <p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;color:#e2e8f0;">
            I built a free custom GPT that walks you through Ikigai mapping Socratically. Use it alongside the workshop page, or let it run the whole session for you.
          </p>
          <a href="https://frankx.ai/go/ikigai-coach" style="display:inline-block;padding:12px 20px;background:#8b5cf6;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
            Open the Ikigai Coach GPT →
          </a>
        </div>
      </td></tr>

      <tr><td style="padding:0 0 24px 0;">
        <div style="background:rgba(251,191,36,0.06);border:1px solid rgba(251,191,36,0.18);border-radius:12px;padding:20px;">
          <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#fbbf24;font-weight:600;">
            Step 2 — Run the workshop
          </p>
          <p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;color:#e2e8f0;">
            Seven modules with copy-paste prompts. The Coach holds the conversation; each module sharpens one of the artefacts you walk out with — purpose sentence, brand, 30-day plan, the artefact you publish today.
          </p>
          <a href="https://frankx.ai/workshops/ikigai-branding" style="display:inline-block;padding:12px 20px;background:transparent;color:#fbbf24;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;border:1px solid #fbbf24;">
            Start the workshop →
          </a>
        </div>
      </td></tr>

      <tr><td style="padding:0 0 24px 0;">
        <p style="margin:0 0 12px 0;font-size:15px;line-height:1.7;color:#cbd5e1;">
          <strong style="color:#ffffff;">What comes next:</strong> On Day 7 I will email you a short check-in — "did you ship one artifact?" If yes, I send the next layer. If not, I send the unblocker.
        </p>
      </td></tr>

      <tr><td style="padding:24px 0 0 0;border-top:1px solid rgba(255,255,255,0.08);">
        <p style="margin:0 0 8px 0;font-size:13px;color:#64748b;">
          Frank Riemer · AI Architect · <a href="https://frankx.ai" style="color:#94a3b8;text-decoration:none;">frankx.ai</a>
        </p>
        <p style="margin:0;font-size:12px;color:#475569;">
          You are receiving this because you subscribed to the Ikigai &amp; Branding Workshop list. Unsubscribe anytime from any FrankX email.
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`,
  }
}
