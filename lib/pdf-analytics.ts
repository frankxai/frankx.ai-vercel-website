import { kv } from '@vercel/kv'
import type {
  PDFView,
  PDFDownload,
  PDFLead,
  PDFEmailRequest,
  AnalyticsSummary,
  WeeklyStats
} from './types/pdf-analytics'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

async function getList<T>(key: string): Promise<T[]> {
  return await kv.get<T[]>(key) || []
}

async function appendToList<T>(key: string, item: T): Promise<void> {
  const existing = await getList<T>(key)
  existing.push(item)
  await kv.set(key, existing)
}

export async function trackPDFView(data: Omit<PDFView, 'id' | 'timestamp'>): Promise<PDFView> {
  const view: PDFView = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    ...data
  }
  await appendToList('pdf_views', view)
  return view
}

export async function trackPDFDownload(data: Omit<PDFDownload, 'id' | 'timestamp'>): Promise<PDFDownload> {
  const download: PDFDownload = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    ...data
  }
  await appendToList('pdf_downloads', download)
  return download
}

export async function createPDFLead(data: Omit<PDFLead, 'id' | 'timestamp'>): Promise<PDFLead> {
  const lead: PDFLead = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    ...data
  }
  await appendToList('pdf_leads', lead)
  return lead
}

export async function trackEmailRequest(data: Omit<PDFEmailRequest, 'id' | 'timestamp'>): Promise<PDFEmailRequest> {
  const email: PDFEmailRequest = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    ...data
  }
  await appendToList('pdf_emails', email)
  return email
}

export async function updateEmailStatus(
  id: string,
  status: PDFEmailRequest['status'],
  emailId?: string,
  error?: string
): Promise<void> {
  const emails = await getList<PDFEmailRequest>('pdf_emails')
  const emailIndex = emails.findIndex(e => e.id === id)
  if (emailIndex !== -1) {
    emails[emailIndex].status = status
    if (emailId) emails[emailIndex].emailId = emailId
    if (error) emails[emailIndex].error = error
    await kv.set('pdf_emails', emails)
  }
}

export async function getAnalyticsSummary(days: number = 30): Promise<AnalyticsSummary> {
  const views = await getList<PDFView>('pdf_views')
  const downloads = await getList<PDFDownload>('pdf_downloads')
  const leads = await getList<PDFLead>('pdf_leads')
  const emails = await getList<PDFEmailRequest>('pdf_emails')

  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  const recentViews = views.filter(v => new Date(v.timestamp) > cutoffDate)
  const recentDownloads = downloads.filter(d => new Date(d.timestamp) > cutoffDate)
  const recentLeads = leads.filter(l => new Date(l.timestamp) > cutoffDate)
  const recentEmails = emails.filter(e => new Date(e.timestamp) > cutoffDate)

  const avgCompletion = recentViews.length > 0
    ? recentViews.reduce((sum, v) => sum + v.completionRate, 0) / recentViews.length
    : 0
  const avgTime = recentViews.length > 0
    ? recentViews.reduce((sum, v) => sum + v.timeSpent, 0) / recentViews.length
    : 0

  const guideStats = new Map<string, {
    title: string
    views: number
    downloads: number
    leads: number
  }>()

  recentViews.forEach(v => {
    const stats = guideStats.get(v.guideSlug) || {
      title: v.guideTitle,
      views: 0,
      downloads: 0,
      leads: 0
    }
    stats.views++
    guideStats.set(v.guideSlug, stats)
  })

  recentDownloads.forEach(d => {
    const stats = guideStats.get(d.guideSlug)
    if (stats) stats.downloads++
  })

  recentLeads.forEach(l => {
    const stats = guideStats.get(l.guideSlug)
    if (stats) stats.leads++
  })

  const topGuides = Array.from(guideStats.entries())
    .map(([slug, stats]) => ({
      slug,
      title: stats.title,
      views: stats.views,
      downloads: stats.downloads,
      leads: stats.leads,
      conversionRate: stats.views > 0 ? (stats.leads / stats.views) * 100 : 0
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)

  const recentActivity = [
    ...recentViews.map(v => ({
      type: 'view' as const,
      guideTitle: v.guideTitle,
      timestamp: v.timestamp,
      details: `${Math.round(v.completionRate)}% completion, ${Math.round(v.timeSpent / 60)}m`
    })),
    ...recentDownloads.map(d => ({
      type: 'download' as const,
      guideTitle: d.guideTitle,
      timestamp: d.timestamp,
      details: `via ${d.downloadMethod}`
    })),
    ...recentLeads.map(l => ({
      type: 'lead' as const,
      guideTitle: l.guideTitle,
      timestamp: l.timestamp,
      details: `${l.name} (${l.email})`
    }))
  ]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 20)

  const leadsByInterest: Record<string, number> = {}
  const leadsBySource: Record<string, number> = {}

  recentLeads.forEach(l => {
    if (l.primaryInterest) {
      leadsByInterest[l.primaryInterest] = (leadsByInterest[l.primaryInterest] || 0) + 1
    }
    if (l.referralSource) {
      leadsBySource[l.referralSource] = (leadsBySource[l.referralSource] || 0) + 1
    }
  })

  return {
    totalViews: recentViews.length,
    totalDownloads: recentDownloads.length,
    totalLeads: recentLeads.length,
    totalEmails: recentEmails.filter(e => e.status === 'sent').length,
    averageCompletionRate: avgCompletion,
    averageTimeSpent: avgTime,
    topGuides,
    recentActivity,
    leadsByInterest,
    leadsBySource
  }
}

export async function getWeeklyStats(weeks: number = 12): Promise<WeeklyStats[]> {
  const views = await getList<PDFView>('pdf_views')
  const downloads = await getList<PDFDownload>('pdf_downloads')
  const leads = await getList<PDFLead>('pdf_leads')

  const weekStats: Map<string, WeeklyStats> = new Map()

  const getWeekStart = (date: Date): string => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day
    d.setDate(diff)
    return d.toISOString().split('T')[0]
  }

  for (let i = 0; i < weeks; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (i * 7))
    const weekStart = getWeekStart(date)
    weekStats.set(weekStart, {
      weekStarting: weekStart,
      views: 0,
      downloads: 0,
      leads: 0
    })
  }

  views.forEach(v => {
    const weekStart = getWeekStart(new Date(v.timestamp))
    const stats = weekStats.get(weekStart)
    if (stats) stats.views++
  })

  downloads.forEach(d => {
    const weekStart = getWeekStart(new Date(d.timestamp))
    const stats = weekStats.get(weekStart)
    if (stats) stats.downloads++
  })

  leads.forEach(l => {
    const weekStart = getWeekStart(new Date(l.timestamp))
    const stats = weekStats.get(weekStart)
    if (stats) stats.leads++
  })

  return Array.from(weekStats.values()).reverse()
}

export async function getAllLeads(): Promise<PDFLead[]> {
  return getList<PDFLead>('pdf_leads')
}

export async function getLeadsByGuide(guideSlug: string): Promise<PDFLead[]> {
  const leads = await getList<PDFLead>('pdf_leads')
  return leads.filter(l => l.guideSlug === guideSlug)
}

export async function getRecentDownloadCount(guideSlug: string): Promise<number> {
  const downloads = await getList<PDFDownload>('pdf_downloads')
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - 7)

  return downloads.filter(
    d => d.guideSlug === guideSlug && new Date(d.timestamp) > cutoffDate
  ).length
}
