// PDF Analytics & Lead Tracking System
import { createClient } from '@vercel/kv'
import type {
  PDFView,
  PDFDownload,
  PDFLead,
  PDFEmailRequest,
  AnalyticsSummary,
  WeeklyStats
} from './types/pdf-analytics'
import { redisRestConfig } from './redis-env'

// Vercel's filesystem is read-only, so the JSON files this module used to write
// were never persisted and every view, download and lead was lost. Each
// collection is now an append-only Redis list, capped to its newest entries.
const kv = createClient(redisRestConfig())
const VIEWS = 'pdf-analytics:views'
const DOWNLOADS = 'pdf-analytics:downloads'
const LEADS = 'pdf-analytics:leads'
const EMAILS = 'pdf-analytics:emails'
const MAX_ENTRIES = 50_000

// Only these guides are tracked; anything else is rejected before it is stored.
export const TRACKED_GUIDES = new Set(['soulbook', 'vibe-os'])

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

async function readAll<T>(key: string): Promise<T[]> {
  try {
    return (await kv.lrange<T>(key, 0, -1)) ?? []
  } catch (error) {
    console.error(`PDF analytics read failed for ${key}:`, error)
    return []
  }
}

async function append<T>(key: string, item: T): Promise<T> {
  await kv.rpush(key, item)
  await kv.ltrim(key, -MAX_ENTRIES, -1)
  return item
}

// Track PDF view
export async function trackPDFView(data: Omit<PDFView, 'id' | 'timestamp'>): Promise<PDFView> {
  return append(VIEWS, { id: generateId(), timestamp: new Date().toISOString(), ...data })
}

// Track PDF download
export async function trackPDFDownload(data: Omit<PDFDownload, 'id' | 'timestamp'>): Promise<PDFDownload> {
  return append(DOWNLOADS, { id: generateId(), timestamp: new Date().toISOString(), ...data })
}

// Create PDF lead
export async function createPDFLead(data: Omit<PDFLead, 'id' | 'timestamp'>): Promise<PDFLead> {
  return append(LEADS, { id: generateId(), timestamp: new Date().toISOString(), ...data })
}

// Track email request
export async function trackEmailRequest(data: Omit<PDFEmailRequest, 'id' | 'timestamp'>): Promise<PDFEmailRequest> {
  return append(EMAILS, { id: generateId(), timestamp: new Date().toISOString(), ...data })
}

// Update email request status
export async function updateEmailStatus(
  id: string,
  status: PDFEmailRequest['status'],
  emailId?: string,
  error?: string
): Promise<void> {
  const emails = await readAll<PDFEmailRequest>(EMAILS)
  const emailIndex = emails.findIndex(e => e.id === id)
  if (emailIndex !== -1) {
    const updated = { ...emails[emailIndex], status }
    if (emailId) updated.emailId = emailId
    if (error) updated.error = error
    await kv.lset(EMAILS, emailIndex, updated)
  }
}

// Get analytics summary
export async function getAnalyticsSummary(days: number = 30): Promise<AnalyticsSummary> {
  const views = await readAll<PDFView>(VIEWS)
  const downloads = await readAll<PDFDownload>(DOWNLOADS)
  const leads = await readAll<PDFLead>(LEADS)
  const emails = await readAll<PDFEmailRequest>(EMAILS)

  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  // Filter by date range
  const recentViews = views.filter(v => new Date(v.timestamp) > cutoffDate)
  const recentDownloads = downloads.filter(d => new Date(d.timestamp) > cutoffDate)
  const recentLeads = leads.filter(l => new Date(l.timestamp) > cutoffDate)
  const recentEmails = emails.filter(e => new Date(e.timestamp) > cutoffDate)

  // Calculate average completion and time
  const avgCompletion = recentViews.length > 0
    ? recentViews.reduce((sum, v) => sum + v.completionRate, 0) / recentViews.length
    : 0
  const avgTime = recentViews.length > 0
    ? recentViews.reduce((sum, v) => sum + v.timeSpent, 0) / recentViews.length
    : 0

  // Calculate top guides
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

  // Recent activity
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

  // Group leads by interest and source
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

// Get weekly stats for charting
export async function getWeeklyStats(weeks: number = 12): Promise<WeeklyStats[]> {
  const views = await readAll<PDFView>(VIEWS)
  const downloads = await readAll<PDFDownload>(DOWNLOADS)
  const leads = await readAll<PDFLead>(LEADS)

  const weekStats: Map<string, WeeklyStats> = new Map()

  // Helper to get week start date
  const getWeekStart = (date: Date): string => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day
    d.setDate(diff)
    return d.toISOString().split('T')[0]
  }

  // Initialize weeks
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

  // Aggregate data
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

// Get all leads
export async function getAllLeads(): Promise<PDFLead[]> {
  return readAll<PDFLead>(LEADS)
}

// Get leads by guide
export async function getLeadsByGuide(guideSlug: string): Promise<PDFLead[]> {
  const leads = await readAll<PDFLead>(LEADS)
  return leads.filter(l => l.guideSlug === guideSlug)
}

// Get download count for a guide (last 7 days)
export async function getRecentDownloadCount(guideSlug: string): Promise<number> {
  const downloads = await readAll<PDFDownload>(DOWNLOADS)
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - 7)

  return downloads.filter(
    d => d.guideSlug === guideSlug && new Date(d.timestamp) > cutoffDate
  ).length
}
