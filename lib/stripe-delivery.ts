import {
  generateProductEmailData,
  isProductDeliveryReady,
  type ProductEmailData,
} from './delivery'

export type DeliveryFailureReason =
  | 'payment_not_confirmed'
  | 'customer_email_missing'
  | 'product_metadata_missing'
  | 'product_delivery_not_configured'
  | 'delivery_provider_not_configured'
  | 'delivery_provider_failed'

export type DeliveryReceipt = {
  schemaVersion: 'starlight.delivery_receipt.v1'
  receiptId: string
  eventId: string
  sessionId: string
  productId?: string
  provider: 'resend'
  status: 'delivered' | 'failed'
  retryable: boolean
  reason?: DeliveryFailureReason
  providerMessageId?: string
  occurredAt: string
}

export type CheckoutSessionDeliveryInput = {
  eventId: string
  sessionId: string
  paymentStatus?: string | null
  productId?: string | null
  customerEmail?: string | null
  customerName?: string | null
}

export type DeliveryEmailSender = (
  emailData: ProductEmailData,
  idempotencyKey: string
) => Promise<{ providerMessageId: string }>

type DeliveryProcessorOptions = {
  sendEmail?: DeliveryEmailSender
  now?: () => Date
}

function receiptBase(
  input: CheckoutSessionDeliveryInput,
  now: () => Date
): Omit<DeliveryReceipt, 'status' | 'retryable' | 'reason' | 'providerMessageId'> {
  return {
    schemaVersion: 'starlight.delivery_receipt.v1',
    receiptId: `stripe:${input.eventId}:product-email`,
    eventId: input.eventId,
    sessionId: input.sessionId,
    productId: input.productId || undefined,
    provider: 'resend',
    occurredAt: now().toISOString(),
  }
}

function failedReceipt(
  input: CheckoutSessionDeliveryInput,
  reason: DeliveryFailureReason,
  retryable: boolean,
  now: () => Date
): DeliveryReceipt {
  return {
    ...receiptBase(input, now),
    status: 'failed',
    retryable,
    reason,
  }
}

export async function processCheckoutSessionDelivery(
  input: CheckoutSessionDeliveryInput,
  options: DeliveryProcessorOptions = {}
): Promise<DeliveryReceipt> {
  const now = options.now || (() => new Date())

  if (input.paymentStatus !== 'paid') {
    return failedReceipt(input, 'payment_not_confirmed', false, now)
  }

  if (!input.customerEmail) {
    return failedReceipt(input, 'customer_email_missing', false, now)
  }

  if (!input.productId) {
    return failedReceipt(input, 'product_metadata_missing', true, now)
  }

  if (!isProductDeliveryReady(input.productId)) {
    return failedReceipt(input, 'product_delivery_not_configured', true, now)
  }

  const emailData = generateProductEmailData(
    input.productId,
    input.customerName || 'Customer',
    input.customerEmail
  )

  if (!emailData) {
    return failedReceipt(input, 'product_delivery_not_configured', true, now)
  }

  if (!options.sendEmail) {
    return failedReceipt(input, 'delivery_provider_not_configured', true, now)
  }

  try {
    const result = await options.sendEmail(emailData, `stripe-checkout/${input.eventId}`)
    return {
      ...receiptBase(input, now),
      status: 'delivered',
      retryable: false,
      providerMessageId: result.providerMessageId,
    }
  } catch {
    return failedReceipt(input, 'delivery_provider_failed', true, now)
  }
}
