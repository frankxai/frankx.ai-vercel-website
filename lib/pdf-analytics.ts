// PDF Analytics & Lead Tracking System
import { promises as fs } from 'fs'
import path from 'path'
import type {
  PDFView,
  PDFDownload,
  PDFLead,
  PDFEmailRequest,
  AnalyticsSummary,
  WeeklyStats
} from './types/pdf-analytics'

const DATA_DIR = path.join(process.cwd(), 'data')
const VIEWS_FILE = path.join(DATA_DIR, 'pdf-views.json')
const DOWNLOADS_FILE = path.join(DATA_DIR, 'pdf-downloads.json')
const LEADS_FILE = path.join(DATA_DIR, 'pdf-leads.json')
const EMAILS_FILE = path.join(DATA_DIR, 'pdf-emails.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Read JSON file with fallback
async function readJsonFile<T>(filePath: string): Promise<T[]> {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch {
    return []
  }
}

// Write JSON file
async function writeJsonFile<T>(filePath: string, data: T[]): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

// Track PDF view
export async function trackPDFView(data: Omit<PDFView, 'id' | 'timestamp'>): Promise<PDFView> {
  const views = await readJsonFile<PDFView>(VIEWS_FILE)
  const view: PDFView = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    ...data
  }
  views.push(view)
  await writeJsonFile(VIEWS_FILE, views)
  return view
}

// Track PDF download
export async function trackPDFDownload(data: Omit<PDFDownload, 'id' | 'timestamp'>): Promise<PDFDownload> {
  const downloads = await readJsonFile<PDFDownload>(DOWNLOADS_FILE)
  const download: PDFDownload = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    ...data
  }
  downloads.push(download)
  await writeJsonFile(DOWNLOADS_FILE, downloads)
  return download
}

// Create PDF lead
export async function createPDFLead(data: Omit<PDFLead, 'id' | 'timestamp'>): Promise<PDFLead> {
  const leads = await readJsonFile<PDFLead>(LEADS_FILE)
  const lead: PDFLead = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    ...data
  }
  leads.push(lead)
  await writeJsonFile(LEADS_FILE, leads)
  return lead
}

// Track email request
export async function trackEmailRequest(data: Omit<PDFEmailRequest, 'id' | 'timestamp'>): Promise<PDFEmailRequest> {
  const emails = await readJsonFile<PDFEmailRequest>(EMAILS_FILE)
  const email: PDFEmailRequest = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    ...data
  }
  emails.push(email)
  await writeJsonFile(EMAILS_FILE, emails)
  return email
}

// Update email request status
export async function updateEmailStatus(
  id: string,
  status: PDFEmailRequest['status'],
  emailId?: string,
  error?: string
): Promise<void> {
  const emails = await readJsonFile<PDFEmailRequest>(EMAILS_FILE)
  const emailIndex = emails.findIndex(e => e.id === id)
  if (emailIndex !== -1) {
    emails[emailIndex].status = status
    if (emailId) emails[emailIndex].emailId = emailId
    if (error) emails[emailIndex].error = error
    await writeJsonFile(EMAILS_FILE, emails)
  }
}

// Get analytics summary
export async function getAnalyticsSummary(days: number = 30): Promise<AnalyticsSummary> {
  const views = await readJsonFile<PDFView>(VIEWS_FILE)
  const downloads = await readJsonFile<PDFDownload>(DOWNLOADS_FILE)
  const leads = await readJsonFile<PDFLead>(LEADS_FILE)
  const emails = await readJsonFile<PDFEmailRequest>(EMAILS_FILE)

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
  const views = await readJsonFile<PDFView>(VIEWS_FILE)
  const downloads = await readJsonFile<PDFDownload>(DOWNLOADS_FILE)
  const leads = await readJsonFile<PDFLead>(LEADS_FILE)

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
  return readJsonFile<PDFLead>(LEADS_FILE)
}

// Get leads by guide
export async function getLeadsByGuide(guideSlug: string): Promise<PDFLead[]> {
  const leads = await readJsonFile<PDFLead>(LEADS_FILE)
  return leads.filter(l => l.guideSlug === guideSlug)
}

// Get download count for a guide (last 7 days)
export async function getRecentDownloadCount(guideSlug: string): Promise<number> {
  const downloads = await readJsonFile<PDFDownload>(DOWNLOADS_FILE)
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - 7)

  return downloads.filter(
    d => d.guideSlug === guideSlug && new Date(d.timestamp) > cutoffDate
  ).length
}
