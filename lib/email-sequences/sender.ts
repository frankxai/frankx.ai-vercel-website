import type { Subscriber, EmailTemplate, EmailStep } from '@/types/email-sequences'

interface SendEmailParams {
  subscriber: Subscriber
  template: EmailTemplate
  step: EmailStep
  sequenceId: string
}

interface SendEmailResult {
  success: boolean
  providerId?: string
  error?: {
    code: string
    message: string
  }
}

/**
 * Renders email template with subscriber-specific variables
 */
export function renderTemplate(
  template: EmailTemplate,
  subscriber: Subscriber,
  step: EmailStep
): { subject: string; bodyHtml: string; bodyText?: string } {
  const variables: Record<string, string> = {
    firstName: subscriber.firstName || 'there',
    email: subscriber.email,
    source_context: getSourceContext(subscriber.source),
    download_link: '', // TODO: Generate based on source
    unsubscribe_url: `https://frankx.ai/unsubscribe/${subscriber.id}`
  }
  
  // Add custom fields
  if (subscriber.customFields) {
    Object.entries(subscriber.customFields).forEach(([key, value]) => {
      variables[key] = String(value)
    })
  }
  
  // Replace variables in subject
  let subject = step.subject || template.subject
  Object.entries(variables).forEach(([key, value]) => {
    subject = subject.replace(new RegExp(`{{${key}}}`, 'g'), value)
  })
  
  // Replace variables in body
  let bodyHtml = template.bodyHtml
  Object.entries(variables).forEach(([key, value]) => {
    bodyHtml = bodyHtml.replace(new RegExp(`{{${key}}}`, 'g'), value)
  })
  
  let bodyText = template.bodyText
  if (bodyText) {
    Object.entries(variables).forEach(([key, value]) => {
      bodyText = bodyText!.replace(new RegExp(`{{${key}}}`, 'g'), value)
    })
  }
  
  return {
    subject,
    bodyHtml,
    bodyText
  }
}

/**
 * Get human-readable source context for email copy
 */
function getSourceContext(source: string): string {
  switch (source) {
    case 'blog':
      return 'after reading one of my articles'
    case 'soulbook':
      return 'to get the Soulbook Framework'
    case 'product':
      return 'after checking out one of my products'
    case 'social':
      return 'from social media'
    case 'direct':
    default:
      return 'to stay updated'
  }
}

/**
 * Send email via Resend MCP
 *
 * Uses mcp__resend__send-email tool to deliver emails.
 * Requires RESEND_API_KEY configured in MCP settings.
 *
 * @param params - Email send parameters
 * @returns Result with provider ID or error
 */
export async function sendEmail({
  subscriber,
  template,
  step,
  sequenceId
}: SendEmailParams): Promise<SendEmailResult> {
  try {
    const { subject, bodyHtml, bodyText } = renderTemplate(template, subscriber, step)

    // Ensure we have plain text fallback
    const plainText = bodyText || bodyHtml.replace(/<[^>]*>/g, '')

    console.log('[Email Sender] Sending email via Resend:', {
      to: subscriber.email,
      subject,
      sequenceId,
      stepId: step.id,
      bodyLength: bodyHtml.length,
      hasText: !!bodyText
    })

    // NOTE: This will fail if Resend MCP is not properly configured
    // The function mcp__resend__send-email must be available
    // User must provide sender email when calling this
    throw new Error('CONFIGURATION_REQUIRED: This function requires manual integration with Resend MCP. See sendEmailWithResend() for implementation.')

  } catch (error) {
    console.error('[Email Sender] Error:', error)

    return {
      success: false,
      error: {
        code: 'SEND_FAILED',
        message: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

/**
 * Send email directly using Resend MCP (for testing/manual sends)
 *
 * @param params - Direct send parameters
 * @returns Result with Resend email ID
 */
export async function sendEmailWithResend(params: {
  to: string
  from: string
  subject: string
  html: string
  text: string
}): Promise<SendEmailResult> {
  try {
    console.log('[Resend] Sending email:', {
      to: params.to,
      from: params.from,
      subject: params.subject,
      htmlLength: params.html.length,
      textLength: params.text.length
    })

    // This will be called via MCP in the test script
    // Cannot be called directly from TypeScript - requires Claude Code environment
    throw new Error('DIRECT_CALL_NOT_SUPPORTED: Use mcp__resend__send-email tool via Claude Code')

  } catch (error) {
    console.error('[Resend] Error:', error)

    return {
      success: false,
      error: {
        code: error instanceof Error && error.message.includes('DIRECT_CALL') ? 'DIRECT_CALL_NOT_SUPPORTED' : 'SEND_FAILED',
        message: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

/**
 * Test email rendering without sending
 */
export function previewEmail({
  subscriber,
  template,
  step
}: Omit<SendEmailParams, 'sequenceId'>): {
  subject: string
  bodyHtml: string
  bodyText?: string
} {
  return renderTemplate(template, subscriber, step)
}
