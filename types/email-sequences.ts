// Email Sequences Type Definitions
// Manages automated email campaigns, welcome series, and nurture sequences

export type EmailStatus = 'draft' | 'scheduled' | 'sent' | 'failed' | 'bounced'

export type SequenceType = 'welcome' | 'nurture' | 'onboarding' | 're-engagement' | 'upsell'

export type TriggerType = 'signup' | 'purchase' | 'abandon_cart' | 'inactivity' | 'manual'

export type SubscriberSource = 'blog' | 'soulbook' | 'product' | 'social' | 'direct'

export interface Subscriber {
  id: string
  email: string
  firstName?: string
  lastName?: string
  status: 'active' | 'unsubscribed' | 'bounced'
  
  // Segmentation
  source: SubscriberSource
  tags: string[]
  
  // Behavior tracking
  opens: number
  clicks: number
  purchases: number
  lastOpenedAt?: string
  lastClickedAt?: string
  
  // Product interest
  products?: string[] // Product IDs they've shown interest in
  purchasedProducts?: string[] // Product IDs they've bought
  
  // Sequence tracking
  sequences: {
    sequenceId: string
    status: 'active' | 'completed' | 'paused'
    currentStep: number
    startedAt: string
    completedAt?: string
  }[]
  
  // Metadata
  subscribedAt: string
  unsubscribedAt?: string
  customFields?: Record<string, unknown>
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  preheader?: string
  
  // Content
  bodyHtml: string
  bodyText?: string
  
  // Variables available in template (e.g., {{firstName}}, {{productName}})
  variables?: string[]
  
  // Personalization
  dynamicContent?: {
    condition: string // e.g., "source === 'soulbook'"
    content: string
  }[]
  
  // Tracking
  trackOpens: boolean
  trackClicks: boolean
  
  // Metadata
  createdAt: string
  updatedAt: string
}

export interface EmailStep {
  id: string
  order: number
  
  // Timing
  delay: number // Hours after previous step (0 for first step)
  sendTime?: string // Specific time like "09:00" for optimal delivery
  timezone?: string
  
  // Content
  template: EmailTemplate
  subject: string // Can override template subject with personalization
  
  // Conditions
  conditions?: {
    type: 'opened_previous' | 'clicked_previous' | 'purchased' | 'custom'
    data?: Record<string, unknown>
  }[]
  
  // Actions
  actions?: {
    type: 'tag' | 'remove_tag' | 'add_to_sequence' | 'remove_from_sequence'
    data: Record<string, unknown>
  }[]
}

export interface EmailSequence {
  id: string
  name: string
  description: string
  type: SequenceType
  
  // Activation
  active: boolean
  trigger: {
    type: TriggerType
    conditions?: Record<string, unknown>
  }
  
  // Steps
  steps: EmailStep[]
  
  // Targeting
  targetTags?: string[] // Only send to subscribers with these tags
  excludeTags?: string[] // Don't send to subscribers with these tags
  targetSource?: SubscriberSource[]
  
  // Analytics
  analytics: {
    totalSubscribers: number
    activeSubscribers: number
    completedSubscribers: number
    unsubscribeRate: number
    openRate: number
    clickRate: number
    conversionRate: number
  }
  
  // Goals
  goals?: {
    type: 'purchase' | 'click' | 'engagement'
    productId?: string
    url?: string
  }[]
  
  // Metadata
  createdAt: string
  updatedAt: string
  createdBy?: string
}

export interface EmailDelivery {
  id: string
  subscriberId: string
  sequenceId: string
  stepId: string
  templateId: string
  
  // Delivery
  status: EmailStatus
  scheduledFor: string
  sentAt?: string
  
  // Tracking
  opened: boolean
  openedAt?: string
  clicked: boolean
  clickedAt?: string
  clickedUrls?: string[]
  
  // Errors
  error?: {
    code: string
    message: string
    timestamp: string
  }
  
  // Provider (Resend)
  providerId?: string // Email ID from Resend
  
  // Metadata
  createdAt: string
}

export interface SequenceAnalytics {
  sequenceId: string
  period: 'day' | 'week' | 'month' | 'all'
  
  // Engagement
  sent: number
  delivered: number
  opened: number
  clicked: number
  bounced: number
  unsubscribed: number
  
  // Rates
  deliveryRate: number
  openRate: number
  clickRate: number
  unsubscribeRate: number
  
  // Conversions
  conversions: number
  conversionRate: number
  revenue: number
  
  // By step
  stepPerformance: {
    stepId: string
    stepOrder: number
    sent: number
    opened: number
    clicked: number
    openRate: number
    clickRate: number
  }[]
}

export interface EmailSequencesData {
  subscribers: Subscriber[]
  sequences: EmailSequence[]
  templates: EmailTemplate[]
  deliveries: EmailDelivery[]
  lastUpdated: string
}
