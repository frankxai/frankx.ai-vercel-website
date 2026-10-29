import { NextResponse } from 'next/server'
import { verifyWebhookSignature, type LemonSqueezyWebhookEvent } from '@/lib/lemon-squeezy'
import { generateProductEmailData } from '@/lib/delivery'
import { purchaseConfirmationEmail } from '@/lib/email-templates'
import { products } from '@/lib/products'
import { productForLemonVariant, productFulfillmentConfigured, lemonExpectedTestMode } from '@/lib/product-fulfillment'

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
  if (!res.ok) throw new Error('Product email delivery failed')
  return res.json()
}

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('x-signature') || ''

  if (!verifyWebhookSignature(body, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: LemonSqueezyWebhookEvent
  try {
    event = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid event' }, { status: 400 })
  }
  const eventName = event?.meta?.event_name
  if (typeof eventName !== 'string') return NextResponse.json({ error: 'Invalid event' }, { status: 400 })

  switch (eventName) {
    case 'order_created': {
      if (!event.data?.attributes?.first_order_item || typeof event.data.attributes.user_email !== 'string' || !event.data.attributes.user_email) {
        return NextResponse.json({ error: 'Invalid order' }, { status: 400 })
      }
      const { user_email, user_name, first_order_item } = event.data.attributes
      const productName = first_order_item.product_name
      if (event.data.attributes.status !== 'paid') return NextResponse.json({ received: true })
      // Bind the authenticated provider variant to an existing canonical catalog ID.
      // Display titles and caller-supplied checkout custom_data grant no product access.
      const product = productForLemonVariant(products, first_order_item.variant_id, process.env)
      if (!product) return NextResponse.json({ error: 'Product variant is not configured' }, { status: 422 })

      const expectedTestMode = lemonExpectedTestMode(process.env)
      if (expectedTestMode === undefined) return NextResponse.json({ error: 'Payment mode is not configured' }, { status: 503 })
      if (event.data.attributes.test_mode !== expectedTestMode || first_order_item.test_mode !== expectedTestMode) {
        return NextResponse.json({ error: 'Payment mode does not match environment' }, { status: 422 })
      }
      // Sandbox callbacks validate isolation but never mint real files or send mail.
      if (expectedTestMode) return NextResponse.json({ received: true, testMode: true })
      if (!productFulfillmentConfigured(product, 'lemon', process.env)) return NextResponse.json({ error: 'Product delivery is not configured' }, { status: 503 })

      const emailData = generateProductEmailData(
        product.id,
        user_name || 'Customer',
        user_email
      )

      if (!emailData || !RESEND_API_KEY) return NextResponse.json({ error: 'Product delivery is not configured' }, { status: 503 })
      {
        const email = purchaseConfirmationEmail({
          customerName: emailData.customerName,
          productName: emailData.productName,
          downloadLinks: emailData.downloadLinks,
          receiptUrl: event.data.attributes.urls?.receipt,
        })

        try {
          await sendEmailViaResend(user_email, email.subject, email.html)
        } catch {
          return NextResponse.json({ error: 'Product email delivery failed' }, { status: 502 })
        }
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
      // A purchase or subscription is not consent to join a marketing audience.
      break
    }

    default:
      console.log('[Lemon Squeezy] Unhandled event:', eventName)
  }

  return NextResponse.json({ received: true })
}
