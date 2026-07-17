import type { NewsletterIssue } from '@/lib/newsletter-issues'
import type { NewsletterStream } from '@/lib/newsletter'

export type NewsletterProvider = 'resend' | 'beehiiv' | 'substack' | 'repo'
export type NewsletterEditionStatus = 'planned' | 'draft' | 'simulated' | 'approved' | 'scheduled' | 'sent'
export type NewsletterVariantMode = 'friend' | 'framework' | 'commercial'
export type NewsletterApprovalState = 'needs-review' | 'approved-for-test' | 'approved-for-live' | 'blocked'

export interface NewsletterOffer {
  id: string
  name: string
  stage: 'free' | 'education' | 'membership' | 'product' | 'enterprise'
  primaryCta: string
  promise: string
  guardrail: string
}

export interface NewsletterSimulationPanel {
  id: string
  label: string
  weight: number
  objections: string[]
  successSignals: string[]
}

export interface NewsletterVariant {
  id: string
  label: string
  mode: NewsletterVariantMode
  subject: string
  preview: string
  targetReader: string
  hypothesis: string
  file: string
}

export interface NewsletterSimulationScore {
  variantId: string
  clarity: number
  trust: number
  utility: number
  conversionFit: number
  retentionFit: number
  objections: string[]
  recommendedEdits: string[]
}

export interface NewsletterExperiment {
  id: string
  editionSlug: string
  status: 'designed' | 'simulated' | 'approved' | 'sent'
  hypothesis: string
  variants: NewsletterVariant[]
  scores: NewsletterSimulationScore[]
  decision: {
    winningVariantId: string
    finalApproach: string
    approvalState: NewsletterApprovalState
    approvedChannels: NewsletterProvider[]
    blockedChannels: NewsletterProvider[]
  }
  packetFiles: string[]
}

export interface NewsletterEdition {
  issue: number
  slug: string
  pillar: 'strategy' | 'talent' | 'technology' | 'data' | 'ethics' | 'case-study' | 'education'
  title: string
  streamId: string
  status: NewsletterEditionStatus
  plannedDate: string
  offerId: string
  experimentId?: string
  contentRefs: string[]
}

export interface NewsletterCalendarItem {
  issue: number
  slug: string
  title: string
  date: string
  status: NewsletterEditionStatus | NewsletterIssue['status']
  pillar: NewsletterEdition['pillar']
  streamId: string
  offerId: string
  source: 'issue' | 'plan'
  userRole: string
  primaryCta: string
  connectsTo: string[]
}

export interface NewsletterProviderStatus {
  provider: NewsletterProvider
  configured: boolean
  role: string
  liveActionAllowed: boolean
}

export interface NewsletterInventory {
  generatedAt: string
  issues: NewsletterIssue[]
  streams: NewsletterStream[]
  editions: NewsletterEdition[]
  calendarItems: NewsletterCalendarItem[]
  experiments: NewsletterExperiment[]
  offers: NewsletterOffer[]
  panels: NewsletterSimulationPanel[]
  providerStatus: NewsletterProviderStatus[]
  stats: {
    totalIssues: number
    publishedIssues: number
    draftIssues: number
    plannedEditions: number
    trackedEditions: number
    activeExperiments: number
    approvalBlockedChannels: NewsletterProvider[]
  }
}
