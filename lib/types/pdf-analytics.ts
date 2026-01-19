// PDF Analytics & Lead Tracking Types

export interface PDFView {
  id: string
  guideSlug: string
  guideTitle: string
  timestamp: string
  sessionId: string
  userAgent: string
  referrer: string
  completionRate: number // 0-100
  pagesViewed: number[]
  timeSpent: number // seconds
}

export interface PDFDownload {
  id: string
  guideSlug: string
  guideTitle: string
  timestamp: string
  sessionId: string
  downloadMethod: 'direct' | 'email' | 'combo'
  userAgent: string
}

export interface PDFLead {
  id: string
  email: string
  name: string
  guideSlug: string
  guideTitle: string
  timestamp: string
  // Optional fields
  company?: string
  role?: string
  primaryInterest?: string
  referralSource?: string
  // Metadata
  userAgent: string
  referrer: string
  sessionId: string
}

export interface PDFEmailRequest {
  id: string
  leadId: string
  guideSlug: string
  timestamp: string
  status: 'pending' | 'sent' | 'failed'
  emailId?: string // Resend email ID
  error?: string
}

export interface AnalyticsSummary {
  totalViews: number
  totalDownloads: number
  totalLeads: number
  totalEmails: number
  averageCompletionRate: number
  averageTimeSpent: number
  topGuides: Array<{
    slug: string
    title: string
    views: number
    downloads: number
    leads: number
    conversionRate: number
  }>
  recentActivity: Array<{
    type: 'view' | 'download' | 'lead'
    guideTitle: string
    timestamp: string
    details: string
  }>
  leadsByInterest: Record<string, number>
  leadsBySource: Record<string, number>
}

export interface WeeklyStats {
  weekStarting: string
  views: number
  downloads: number
  leads: number
}
