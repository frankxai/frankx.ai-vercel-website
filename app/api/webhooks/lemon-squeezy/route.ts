import { NextResponse } from 'next/server'
import { verifyWebhookSignature, type LemonSqueezyWebhookEvent } from '@/lib/lemon-squeezy'
import { generateProductEmailData } from '@/lib/delivery'
import { purchaseConfirmationEmail } from '@/lib/email-templates'
import { getClientOrDefault } from '@/lib/clients'

const RESEND_API_KEY = process.env.RESEND_API_KEY

async function sendEmailViaResend(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'FrankX <frank@mail.frankx.ai>',
      to: [to],
      subject,
      html,
    }),
  })
  return res.json()
}

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('x-signature') || ''

  if (!verifyWebhookSignature(body, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event: LemonSqueezyWebhookEvent = JSON.parse(body)
  const eventName = event.meta.event_name

  switch (eventName) {
    case 'order_created': {
      const { user_email, user_name, first_order_item } = event.data.attributes
      const productName = first_order_item.product_name
      const productSlug = productName.toLowerCase().replace(/\s+/g, '-')

      // Extract client context from custom_data (set during checkout)
      const clientId = event.meta.custom_data?.clientId || 'frankx'
      const client = getClientOrDefault(clientId)

      const emailData = generateProductEmailData(
        productSlug,
        user_name || 'Customer',
        user_email
      )

      if (emailData && RESEND_API_KEY) {
        const email = purchaseConfirmationEmail({
          customerName: emailData.customerName,
          productName: emailData.productName,
          downloadLinks: emailData.downloadLinks,
          receiptUrl: event.data.attributes.urls?.receipt,
        })

        await sendEmailViaResend(user_email, email.subject, email.html)
      }

      console.log('[Lemon Squeezy] Order fulfilled:', {
        orderId: event.data.id,
        clientId: client.id,
        artist: client.artistName,
        product: productName,
        total: event.data.attributes.total_formatted,
        emailSent: Boolean(RESEND_API_KEY),
      })

      break
    }

    default:
      console.log('[Lemon Squeezy] Unhandled event:', eventName)
  }

  return NextResponse.json({ received: true })
}
