/**
 * FrankX Newsletter System
 * Powered by Resend Audiences
 *
 * This module provides:
 * - Contact management (add, update, remove subscribers)
 * - Segment management (creation-chronicles, golden-age, creator-intelligence)
 * - Broadcast sending (newsletters to segments)
 * - Analytics and tracking
 */

import { Resend } from 'resend'

// Lazy-initialize Resend client to avoid build-time errors
let resendClient: Resend | null = null

function getResend(): Resend {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set')
    }
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  return resendClient
}

// Newsletter segments (audiences in Resend)
export const NEWSLETTER_SEGMENTS = {
  CREATION_CHRONICLES: 'creation-chronicles',      // Blog readers
  GOLDEN_AGE: 'golden-age-readers',               // Book waitlist
  CREATOR_INTELLIGENCE: 'creator-intelligence',    // AI creator community
  INNER_CIRCLE: 'inner-circle',                   // Premium/VIP
  ALL_SUBSCRIBERS: 'all-subscribers',             // Everyone
} as const

export type NewsletterSegment = typeof NEWSLETTER_SEGMENTS[keyof typeof NEWSLETTER_SEGMENTS]

// Contact interface
export interface NewsletterContact {
  email: string
  firstName?: string
  lastName?: string
  segments?: NewsletterSegment[]
  unsubscribed?: boolean
  createdAt?: string
}

// Broadcast interface
export interface NewsletterBroadcast {
  id?: string
  subject: string
  from: string
  replyTo?: string
  html: string
  text?: string
  segmentId: string
  scheduledFor?: Date
}

// ============================================
// CONTACT MANAGEMENT
// ============================================

/**
 * Add a new contact to the newsletter
 */
export async function addContact(contact: {
  email: string
  firstName?: string
  lastName?: string
  segment?: NewsletterSegment
}): Promise<{ success: boolean; contactId?: string; error?: string }> {
  try {
    // First, create the contact
    const result = await getResend().contacts.create({
      email: contact.email,
      firstName: contact.firstName || '',
      lastName: contact.lastName || '',
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID!, // Main audience
    })

    if (result.error) {
      // If contact exists, try to update instead
      if (result.error.message?.includes('already exists')) {
        return { success: true, contactId: 'existing' }
      }
      return { success: false, error: result.error.message }
    }

    return { success: true, contactId: result.data?.id }
  } catch (error) {
    console.error('Failed to add contact:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Update an existing contact
 */
export async function updateContact(
  email: string,
  updates: {
    firstName?: string
    lastName?: string
    unsubscribed?: boolean
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await getResend().contacts.update({
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      email,
      ...updates,
    })

    if (result.error) {
      return { success: false, error: result.error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Failed to update contact:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Remove a contact (unsubscribe)
 */
export async function removeContact(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await getResend().contacts.update({
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      email,
      unsubscribed: true,
    })

    if (result.error) {
      return { success: false, error: result.error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Failed to remove contact:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Get all contacts
 */
export async function getContacts(): Promise<{
  success: boolean
  contacts?: NewsletterContact[]
  error?: string
}> {
  try {
    const result = await getResend().contacts.list({
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    })

    if (result.error) {
      return { success: false, error: result.error.message }
    }

    const contacts: NewsletterContact[] = (result.data?.data || []).map((c) => ({
      email: c.email,
      firstName: c.first_name || undefined,
      lastName: c.last_name || undefined,
      unsubscribed: c.unsubscribed,
      createdAt: c.created_at,
    }))

    return { success: true, contacts }
  } catch (error) {
    console.error('Failed to get contacts:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Get contact count
 */
export async function getContactCount(): Promise<{
  success: boolean
  count?: number
  error?: string
}> {
  const result = await getContacts()
  if (!result.success) {
    return { success: false, error: result.error }
  }
  const activeContacts = result.contacts?.filter((c) => !c.unsubscribed) || []
  return { success: true, count: activeContacts.length }
}

// ============================================
// BROADCAST MANAGEMENT
// ============================================

/**
 * Send a broadcast (newsletter) to all subscribers
 */
export async function sendBroadcast(broadcast: {
  subject: string
  html: string
  text?: string
  from?: string
  replyTo?: string
}): Promise<{ success: boolean; broadcastId?: string; error?: string }> {
  try {
    const result = await getResend().broadcasts.create({
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      from: broadcast.from || process.env.RESEND_FROM_EMAIL || 'Frank <frank@frankx.ai>',
      subject: broadcast.subject,
      html: broadcast.html,
      text: broadcast.text,
      replyTo: broadcast.replyTo || 'frank@frankx.ai',
    })

    if (result.error) {
      return { success: false, error: result.error.message }
    }

    return { success: true, broadcastId: result.data?.id }
  } catch (error) {
    console.error('Failed to send broadcast:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Send a broadcast and immediately trigger it
 */
export async function sendAndTriggerBroadcast(broadcast: {
  subject: string
  html: string
  text?: string
  from?: string
  replyTo?: string
}): Promise<{ success: boolean; broadcastId?: string; error?: string }> {
  const createResult = await sendBroadcast(broadcast)

  if (!createResult.success || !createResult.broadcastId) {
    return createResult
  }

  try {
    // Trigger the broadcast to send immediately
    const sendResult = await getResend().broadcasts.send(createResult.broadcastId)

    if (sendResult.error) {
      return { success: false, error: sendResult.error.message }
    }

    return { success: true, broadcastId: createResult.broadcastId }
  } catch (error) {
    console.error('Failed to trigger broadcast:', error)
    return { success: false, error: String(error) }
  }
}

// ============================================
// NEWSLETTER TEMPLATES
// ============================================

/**
 * Generate a newsletter HTML from content blocks
 */
export function generateNewsletterHTML(options: {
  title: string
  preheader: string
  greeting?: string
  sections: Array<{
    heading?: string
    content: string
    cta?: { text: string; url: string }
  }>
  footer?: string
}): string {
  const { title, preheader, greeting = 'Hey there!', sections, footer } = options

  const sectionsHTML = sections
    .map(
      (section) => `
      <div style="margin-bottom: 32px;">
        ${section.heading ? `<h2 style="font-size: 20px; font-weight: 600; color: white; margin: 0 0 16px 0;">${section.heading}</h2>` : ''}
        <div style="font-size: 16px; color: #94a3b8; line-height: 1.7;">
          ${section.content}
        </div>
        ${
          section.cta
            ? `
          <div style="margin-top: 20px;">
            <a href="${section.cta.url}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #06b6d4 0%, #9333ea 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
              ${section.cta.text} →
            </a>
          </div>
        `
            : ''
        }
      </div>
    `
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${preheader}">
  <!--[if !mso]><!-->
  <style>
    @media only screen and (max-width: 600px) {
      .container { padding: 20px 16px !important; }
      .content { padding: 24px !important; }
    }
  </style>
  <!--<![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #030712; color: #f1f5f9;">
  <!-- Preheader text (hidden) -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    ${preheader}
  </div>

  <div class="container" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <a href="https://frankx.ai" style="text-decoration: none;">
        <div style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #06b6d4 0%, #9333ea 100%); border-radius: 12px;">
          <span style="font-size: 24px; font-weight: 700; color: white; letter-spacing: -0.02em;">FrankX.AI</span>
        </div>
      </a>
    </div>

    <!-- Main Content -->
    <div class="content" style="background: linear-gradient(to bottom, #111827, #0a0f1e); border: 1.5px solid rgba(6, 182, 212, 0.2); border-radius: 16px; padding: 32px; margin-bottom: 32px;">
      <h1 style="font-size: 28px; font-weight: 700; color: white; margin: 0 0 8px 0; line-height: 1.2;">
        ${title}
      </h1>

      <p style="font-size: 18px; color: #22d3ee; margin: 0 0 24px 0;">
        ${greeting}
      </p>

      ${sectionsHTML}
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
      ${footer || `
        <p style="font-size: 12px; color: #64748b; margin: 0 0 16px 0;">
          <strong style="color: #94a3b8;">Frank Guzman</strong><br>
          Musician turned AI Architect at Oracle<br>
          500+ AI songs | Enterprise AI Systems
        </p>
      `}

      <div style="margin: 16px 0;">
        <a href="https://frankx.ai" style="color: #22d3ee; text-decoration: none; font-size: 14px; margin: 0 12px;">frankx.ai</a>
        <span style="color: #64748b;">|</span>
        <a href="https://twitter.com/frankxai" style="color: #22d3ee; text-decoration: none; font-size: 14px; margin: 0 12px;">Twitter</a>
        <span style="color: #64748b;">|</span>
        <a href="https://linkedin.com/in/frankguzmanai" style="color: #22d3ee; text-decoration: none; font-size: 14px; margin: 0 12px;">LinkedIn</a>
      </div>

      <p style="font-size: 11px; color: #64748b; margin: 24px 0 0 0;">
        You're receiving this because you subscribed to the FrankX newsletter.<br>
        <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #64748b;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
  `
}

// ============================================
// ANALYTICS
// ============================================

export interface NewsletterStats {
  totalContacts: number
  activeContacts: number
  unsubscribed: number
  recentSignups: number // Last 7 days
}

export async function getNewsletterStats(): Promise<{
  success: boolean
  stats?: NewsletterStats
  error?: string
}> {
  const result = await getContacts()
  if (!result.success || !result.contacts) {
    return { success: false, error: result.error }
  }

  const contacts = result.contacts
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const stats: NewsletterStats = {
    totalContacts: contacts.length,
    activeContacts: contacts.filter((c) => !c.unsubscribed).length,
    unsubscribed: contacts.filter((c) => c.unsubscribed).length,
    recentSignups: contacts.filter(
      (c) => c.createdAt && new Date(c.createdAt) > weekAgo && !c.unsubscribed
    ).length,
  }

  return { success: true, stats }
}
