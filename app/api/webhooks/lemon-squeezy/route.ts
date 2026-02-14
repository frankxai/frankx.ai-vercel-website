import { NextResponse } from 'next/server'
import { verifyWebhookSignature, type LemonSqueezyWebhookEvent } from '@/lib/lemon-squeezy'
import { generateProductEmailData } from '@/lib/delivery'
import { purchaseConfirmationEmail } from '@/lib/email-templates'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || '4d2e913e-6903-4dd4-8749-c02cdb844331'

async function sendEmailViaResend(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'FrankX <frank@updates.frankx.ai>',
      to: [to],
      subject,
      html,
    }),
  })
  return res.json()
}

async function addToResendAudience(email: string, name: string, topics: string[]) {
  await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      first_name: name.split(' ')[0],
      last_name: name.split(' ').slice(1).join(' ') || undefined,
      unsubscribed: false,
    }),
  })
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

      // Add customer to Resend audience
      if (RESEND_API_KEY) {
        await addToResendAudience(user_email, user_name || 'Customer', ['product-updates'])
      }

      console.log('[Lemon Squeezy] Order fulfilled:', {
        orderId: event.data.id,
        product: productName,
        email: user_email,
        total: event.data.attributes.total_formatted,
        emailSent: Boolean(RESEND_API_KEY),
      })

      break
    }

    case 'subscription_created': {
      const { user_email, user_name } = event.data.attributes

      if (RESEND_API_KEY) {
        await addToResendAudience(user_email, user_name || 'Subscriber', ['product-updates'])
      }

      console.log('[Lemon Squeezy] Subscription created:', {
        id: event.data.id,
        email: user_email,
      })
      break
    }

    default:
      console.log('[Lemon Squeezy] Unhandled event:', eventName)
  }

  return NextResponse.json({ received: true })
}
