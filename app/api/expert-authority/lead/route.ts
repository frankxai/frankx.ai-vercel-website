import { NextRequest, NextResponse } from 'next/server'
import {
  deriveExpertAuthorityResult,
  expertAuthorityEngineKeys,
  isExpertAuthorityAnswers,
} from '@/lib/expert-authority-intelligence'
import { emailRatelimit, getClientIdentifier } from '@/lib/ratelimit'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = 'Frank <frank@mail.frankx.ai>'
const NOTIFY_EMAIL = process.env.OPERATOR_EMAIL || 'frank@frankx.ai'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SUBMISSION_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

async function resend(
  path: string,
  body: Record<string, unknown>,
  idempotencyKey?: string,
) {
  const response = await fetch(`https://api.resend.com${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Resend request failed (${response.status}): ${errorBody}`)
  }

  return response
}

export async function POST(request: NextRequest) {
  try {
    // This endpoint sends email. If the limiter cannot make a decision, fail
    // closed rather than turning a KV outage into an unbounded send surface.
    try {
      const { success } = await emailRatelimit.limit(getClientIdentifier(request))
      if (!success) {
        return NextResponse.json(
          { error: 'Too many submissions. Please try again later.' },
          { status: 429 }
        )
      }
    } catch (error) {
      console.error('Expert authority rate-limit check failed:', error)
      return NextResponse.json(
        { error: 'Email delivery is temporarily unavailable. Please try again shortly.' },
        { status: 503 },
      )
    }

    const payload = await request.json()
    const {
      name,
      email,
      researchInvitationOptIn = false,
      answers,
      submissionId,
      website = '',
    } = payload

    // Honeypot: legitimate clients leave this field empty. Return a neutral
    // success to bots so the endpoint does not teach them how detection works.
    if (typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json({ success: true })
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 200) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 })
    }
    if (
      !email ||
      typeof email !== 'string' ||
      email.trim().length > 254 ||
      !EMAIL_PATTERN.test(email.trim())
    ) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (!isExpertAuthorityAnswers(answers)) {
      return NextResponse.json({ error: 'The engine scores are invalid.' }, { status: 400 })
    }
    if (typeof researchInvitationOptIn !== 'boolean') {
      return NextResponse.json({ error: 'The research preference is invalid.' }, { status: 400 })
    }
    if (typeof submissionId !== 'string' || !SUBMISSION_ID_PATTERN.test(submissionId)) {
      return NextResponse.json({ error: 'The submission identifier is invalid.' }, { status: 400 })
    }
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email delivery is temporarily unavailable. Download the resources directly below.' },
        { status: 503 }
      )
    }

    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    const firstName = cleanName.split(/\s+/)[0]
    const { score, stage, weakestEngine } = deriveExpertAuthorityResult(answers)
    const source = 'mvu-expert-authority'
    const safeName = escapeHtml(cleanName)
    const safeEmail = escapeHtml(cleanEmail)
    const safeStage = escapeHtml(stage)
    const safeWeakest = escapeHtml(weakestEngine)
    const safeSource = escapeHtml(source)
    const engineRows = expertAuthorityEngineKeys
      .map(
        (key) =>
          `<tr><td style="padding:6px 0;color:#94a3b8;text-transform:capitalize;">${key}</td><td style="padding:6px 0;color:#ffffff;text-align:right;">${answers[key]}/4</td></tr>`
      )
      .join('')

    const operatorHtml = `
<!doctype html>
<html>
<body style="margin:0;background:#09090b;color:#e4e4e7;font-family:Arial,sans-serif;padding:32px 16px;">
  <div style="max-width:620px;margin:0 auto;background:#18181b;border:1px solid #27272a;border-radius:20px;padding:28px;">
    <p style="margin:0 0 8px;color:#67e8f9;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">Expert Authority Diagnostic</p>
    <h1 style="margin:0;color:#ffffff;font-size:26px;">${safeName} is a ${safeStage}</h1>
    <p style="margin:12px 0 24px;color:#a1a1aa;line-height:1.6;">Primary constraint: <strong style="color:#ffffff;">${safeWeakest}</strong>. Score: <strong style="color:#ffffff;">${score}/20</strong>.</p>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #27272a;border-bottom:1px solid #27272a;padding:12px 0;">${engineRows}</table>
    <div style="margin-top:22px;color:#a1a1aa;line-height:1.7;">
      <div><strong style="color:#ffffff;">Email:</strong> <a href="mailto:${safeEmail}" style="color:#67e8f9;">${safeEmail}</a></div>
      <div><strong style="color:#ffffff;">Research invitation:</strong> Opted in</div>
      <div><strong style="color:#ffffff;">Source:</strong> ${safeSource}</div>
      <div><strong style="color:#ffffff;">Captured:</strong> ${new Date().toISOString()}</div>
    </div>
    <a href="mailto:${safeEmail}?subject=Your Expert Authority Intelligence System" style="display:inline-block;margin-top:24px;background:#a5f3fc;color:#09090b;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:999px;">Reply to ${escapeHtml(firstName)}</a>
  </div>
</body>
</html>`

    const participantHtml = `
<!doctype html>
<html>
<body style="margin:0;background:#09090b;color:#e4e4e7;font-family:Arial,sans-serif;padding:32px 16px;">
  <div style="max-width:620px;margin:0 auto;background:#18181b;border:1px solid #27272a;border-radius:20px;padding:28px;">
    <p style="margin:0 0 8px;color:#67e8f9;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">Your Authority Map</p>
    <h1 style="margin:0;color:#ffffff;font-size:28px;">${escapeHtml(firstName)}, your current stage is ${safeStage}.</h1>
    <p style="margin:16px 0;color:#a1a1aa;line-height:1.7;">Your primary system constraint is <strong style="color:#ffffff;">${safeWeakest}</strong>. Resolve that engine before adding more content, products, or automation.</p>
    <div style="margin:22px 0;padding:18px;background:#0f172a;border:1px solid #164e63;border-radius:14px;">
      <div style="color:#67e8f9;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.3px;">System score</div>
      <div style="margin-top:6px;color:#ffffff;font-size:34px;font-weight:700;">${score}/20</div>
    </div>
    <p style="margin:0 0 14px;color:#ffffff;font-weight:700;">Your free build resources</p>
    <div style="display:grid;gap:10px;">
      <a href="https://frankx.ai/skills/expert-authority/SKILL.md" style="display:block;background:#a5f3fc;color:#09090b;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px;">Download the Expert Authority Skill</a>
      <a href="https://frankx.ai/skills/expert-authority/PROMPT-PACK.md" style="display:block;border:1px solid #3f3f46;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px;">Download the Prompt Pack</a>
      <a href="https://frankx.ai/images/expert-authority/system-map.svg" style="display:block;border:1px solid #3f3f46;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px;">Open the System Map</a>
    </div>
    <p style="margin:24px 0 0;color:#71717a;font-size:13px;line-height:1.6;">FrankX.ai presents the Expert Authority Intelligence System. Powered by Starlight Labs.</p>
  </div>
</body>
</html>`

    const deliveries = await Promise.allSettled([
      resend('/emails', {
        from: FROM_EMAIL,
        to: cleanEmail,
        subject: `Your Expert Authority Map: ${stage}`,
        html: participantHtml,
      }, `expert-authority-result/${submissionId}`),
      researchInvitationOptIn
        ? resend('/emails', {
            from: FROM_EMAIL,
            to: NOTIFY_EMAIL,
            reply_to: cleanEmail,
            subject: `Research opt-in: ${stage} — ${cleanName}`,
            html: operatorHtml,
          }, `expert-authority-research/${submissionId}`)
        : Promise.resolve(null),
    ])

    if (deliveries[0].status === 'rejected') {
      throw deliveries[0].reason
    }
    if (deliveries[1].status === 'rejected') {
      console.error('Expert authority research notification failed:', deliveries[1].reason)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Expert authority lead capture failed', error)
    return NextResponse.json(
      { error: 'Your result could not be emailed. The direct downloads remain available.' },
      { status: 500 }
    )
  }
}
