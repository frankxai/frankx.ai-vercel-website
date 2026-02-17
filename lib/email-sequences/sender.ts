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
 * TODO: Integrate with actual Resend MCP when available
 */
export async function sendEmail({
  subscriber,
  template,
  step,
  sequenceId
}: SendEmailParams): Promise<SendEmailResult> {
  try {
    const { subject, bodyHtml, bodyText } = renderTemplate(template, subscriber, step)
    
    // TODO: Call Resend MCP
    // For now, log the email that would be sent
    console.log('[Email Sender] Would send email:', {
      to: subscriber.email,
      subject,
      sequenceId,
      stepId: step.id,
      bodyLength: bodyHtml.length
    })
    
    // Simulate success
    const mockProviderId = `resend_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
    
    return {
      success: true,
      providerId: mockProviderId
    }
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
