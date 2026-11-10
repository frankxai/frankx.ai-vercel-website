import { GIFTS, type Gift } from './gift-config.ts'
import { claimOnce, hasMarker, releaseOnce } from './store.ts'

export { GIFTS, giftCopy, type Gift } from './gift-config.ts'

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function giftEmail(gift: Gift, _to: { email: string }) {
  const subject = `Your first practice: ${gift.title}`
  const lines = [
    'Thanks for joining the operator lab list.',
    '',
    `Here is a first practice while you wait. It takes about ${gift.minutes} minutes, runs in your browser, and needs no account.`,
    '',
    gift.what,
    '',
    `Start here: ${gift.url}`,
    '',
    'It is the same judgment the lab trains: telling a fluent report from a finished job. If you try it, reply and tell me where you hesitated. I read every reply.',
    '',
    'Frank',
    '',
    '--',
    'You get this one email because you joined the Starlight operator lab waitlist. The next one comes when seats open. Reply "remove" and I will delete your address and answers.',
  ]
  const text = lines.join('\n')
  const html = `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;color:#14161a;max-width:560px;margin:0 auto;padding:24px">
<p>Thanks for joining the operator lab list.</p>
<p>Here is a first practice while you wait. It takes about ${gift.minutes} minutes, runs in your browser, and needs no account.</p>
<p>${escape(gift.what)}</p>
<p><a href="${escape(gift.url)}" style="display:inline-block;padding:12px 18px;border-radius:8px;background:#14161a;color:#ffffff;text-decoration:none">Start the practice</a></p>
<p style="font-size:14px;color:#555">Or paste this link: ${escape(gift.url)}</p>
<p>It is the same judgment the lab trains: telling a fluent report from a finished job. If you try it, reply and tell me where you hesitated. I read every reply.</p>
<p>Frank</p>
<hr style="border:none;border-top:1px solid #ddd;margin:24px 0">
<p style="font-size:13px;color:#666">You get this one email because you joined the Starlight operator lab waitlist. The next one comes when seats open. Reply "remove" and I will delete your address and answers.</p>
</body></html>`
  return { subject, text, html }
}

export type GiftResult = 'off' | 'sent' | 'already-sent' | 'failed' | 'not-due'

/**
 * Sends the gift once per address, on a first join. The SET NX guard is taken before the send so
 * two parallel joins cannot both send. A failed send releases it and leaves a pending marker,
 * so retryGift can try again on a later join.
 * Never throws: the signup is already stored, and an email problem must not undo that.
 */
export async function sendGift(productId: string, email: string): Promise<GiftResult> {
  const gift = GIFTS[productId]
  const key = process.env.RESEND_API_KEY
  if (!gift?.live || !key) return 'off'
  try {
    if (!(await claimOnce(productId, `gift:${email}`))) return 'already-sent'
  } catch {
    return 'failed'
  }
  const mail = giftEmail(gift, { email })
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        // Resend drops a repeat of the same key for 24 hours, a second guard behind the marker.
        'Idempotency-Key': `gift/${productId}/${email}`,
      },
      body: JSON.stringify({ from: gift.from, to: [email], reply_to: gift.replyTo, ...mail }),
      signal: AbortSignal.timeout(5_000),
    })
    if (!res.ok) throw new Error(`Resend ${res.status}`)
    return 'sent'
  } catch {
    await releaseOnce(productId, `gift:${email}`).catch(() => undefined)
    await claimOnce(productId, `gift-pending:${email}`).catch(() => undefined)
    return 'failed'
  }
}

/**
 * For a repeat join. Anyone can type an address that is already on the list, so this sends
 * only when that address's own first-join gift failed and is still pending. An address that
 * joined while the gift was off, or already got it, gets no mail. Never throws.
 */
export async function retryGift(productId: string, email: string): Promise<GiftResult> {
  const gift = GIFTS[productId]
  if (!gift?.live || !process.env.RESEND_API_KEY) return 'off'
  try {
    if (!(await hasMarker(productId, `gift-pending:${email}`))) return 'not-due'
  } catch {
    return 'failed'
  }
  const result = await sendGift(productId, email)
  if (result === 'sent' || result === 'already-sent') {
    await releaseOnce(productId, `gift-pending:${email}`).catch(() => undefined)
  }
  return result
}
