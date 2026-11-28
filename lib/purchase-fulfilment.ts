import { generateProductEmailData } from './delivery'
import { purchaseConfirmationEmail } from './email-templates'

/**
 * Delivers one paid Stripe checkout session.
 *
 * A session our checkout created carries `productSlug`. If that purchase cannot
 * be delivered, the result is a 500 so Stripe retries and shows the failure in
 * its dashboard. Acknowledging it would leave a charged buyer with nothing.
 * A session without `productSlug` was not created by this site and is acknowledged.
 */

export interface PaidSession {
  id: string
  /** Unix seconds, from Stripe. Fixes the link expiry so retries build the same email. */
  created: number
  email: string | null
  name: string
  productSlug: string | undefined
}

export type FulfilmentFailure =
  | 'no_customer_email'
  | 'unknown_product'
  | 'undeliverable_files'
  | 'email_unconfigured'
  | 'email_rejected'

export type FulfilmentResult =
  | { status: 200; delivered: boolean }
  | { status: 500; delivered: false; failure: FulfilmentFailure }

export interface FulfilmentDeps {
  resendApiKey: string | undefined
  audienceId: string
  fetch: typeof fetch
}

const fail = (failure: FulfilmentFailure): FulfilmentResult => ({ status: 500, delivered: false, failure })

export async function fulfilCheckoutSession(session: PaidSession, deps: FulfilmentDeps): Promise<FulfilmentResult> {
  if (!session.productSlug) return { status: 200, delivered: false }
  if (!session.email) return fail('no_customer_email')

  const emailData = generateProductEmailData(session.productSlug, session.name, session.email, session.created * 1000)
  if (!emailData) return fail('unknown_product')
  if (emailData.undeliverableFiles.length > 0) return fail('undeliverable_files')
  if (!deps.resendApiKey) return fail('email_unconfigured')

  const email = purchaseConfirmationEmail({
    customerName: emailData.customerName,
    productName: emailData.productName,
    downloadLinks: emailData.downloadLinks,
    receiptUrl: undefined,
  })
  const headers = { Authorization: `Bearer ${deps.resendApiKey}`, 'Content-Type': 'application/json' }
  const sent = await deps.fetch('https://api.resend.com/emails', {
    method: 'POST',
    // One email per session: Resend replays its first answer for a repeated key.
    // It answers 409 while an earlier request under the key is still in flight,
    // which proves nothing was sent yet, so a 409 is a failure Stripe retries.
    headers: { ...headers, 'Idempotency-Key': `purchase-confirmation/${session.id}` },
    body: JSON.stringify({
      from: 'FrankX <frank@mail.frankx.ai>',
      to: [session.email],
      subject: email.subject,
      html: email.html,
    }),
  })
  if (!sent.ok) return fail('email_rejected')

  // The buyer has the product. A failed audience write must not make Stripe retry.
  try {
    await deps.fetch(`https://api.resend.com/audiences/${deps.audienceId}/contacts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: session.email,
        first_name: session.name.split(' ')[0],
        last_name: session.name.split(' ').slice(1).join(' ') || undefined,
        unsubscribed: false,
      }),
    })
  } catch (error) {
    console.error('[Stripe] Audience write failed after delivery:', error instanceof Error ? error.message : error)
  }

  return { status: 200, delivered: true }
}
