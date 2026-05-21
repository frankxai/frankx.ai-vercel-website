import { kv } from '@vercel/kv'

/**
 * Vercel KV Client
 *
 * Redis-compatible key-value store for persistent data storage.
 * Replaces file-based JSON storage to prevent data loss on Vercel deployments.
 *
 * Storage Structure:
 * - pdf_views:{guideId} → Array<PDFView>
 * - pdf_downloads:{guideId} → Array<PDFDownload>
 * - leads → Array<Lead>
 * - analytics_summary:{timeRange} → AnalyticsSummary (cached)
 */

export interface PDFView {
  id: string
  guideId: string
  sessionId: string
  timestamp: string
  pagesViewed: number[]
  timeSpent: number
  completionRate: number
  metadata?: Record<string, any>
}

export interface PDFDownload {
  id: string
  guideId: string
  sessionId: string
  timestamp: string
  metadata?: Record<string, any>
}

export interface Lead {
  id: string
  email: string
  name: string
  company?: string
  role?: string
  primaryInterest?: string
  referralSource?: string
  guideId: string
  timestamp: string
}

/**
 * Track PDF view in Vercel KV
 */
export async function trackPDFView(
  guideId: string,
  sessionId: string,
  metadata?: Record<string, any>
): Promise<void> {
  const view: PDFView = {
    id: `view_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    guideId,
    sessionId,
    timestamp: new Date().toISOString(),
    pagesViewed: [],
    timeSpent: 0,
    completionRate: 0,
    metadata
  }

  const key = `pdf_views:${guideId}`
  const existing = await kv.get<PDFView[]>(key) || []
  existing.push(view)

  await kv.set(key, existing)

  // Also update global views list
  const allViews = await kv.get<PDFView[]>('pdf_views:all') || []
  allViews.push(view)
  await kv.set('pdf_views:all', allViews)
}

/**
 * Track PDF download in Vercel KV
 */
export async function trackPDFDownload(
  guideId: string,
  sessionId: string,
  metadata?: Record<string, any>
): Promise<void> {
  const download: PDFDownload = {
    id: `download_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    guideId,
    sessionId,
    timestamp: new Date().toISOString(),
    metadata
  }

  const key = `pdf_downloads:${guideId}`
  const existing = await kv.get<PDFDownload[]>(key) || []
  existing.push(download)

  await kv.set(key, existing)

  // Also update global downloads list
  const allDownloads = await kv.get<PDFDownload[]>('pdf_downloads:all') || []
  allDownloads.push(download)
  await kv.set('pdf_downloads:all', allDownloads)
}

/**
 * Store lead in Vercel KV
 */
export async function storeLead(lead: Omit<Lead, 'id' | 'timestamp'>): Promise<void> {
  const fullLead: Lead = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString()
  }

  const existing = await kv.get<Lead[]>('leads') || []
  existing.push(fullLead)

  await kv.set('leads', existing)
}

/**
 * Get all PDF views
 */
export async function getAllPDFViews(): Promise<PDFView[]> {
  return await kv.get<PDFView[]>('pdf_views:all') || []
}

/**
 * Get all PDF downloads
 */
export async function getAllPDFDownloads(): Promise<PDFDownload[]> {
  return await kv.get<PDFDownload[]>('pdf_downloads:all') || []
}

/**
 * Get all leads
 */
export async function getAllLeads(): Promise<Lead[]> {
  return await kv.get<Lead[]>('leads') || []
}

/**
 * Get views for specific guide
 */
export async function getGuideViews(guideId: string): Promise<PDFView[]> {
  return await kv.get<PDFView[]>(`pdf_views:${guideId}`) || []
}

/**
 * Get downloads for specific guide
 */
export async function getGuideDownloads(guideId: string): Promise<PDFDownload[]> {
  return await kv.get<PDFDownload[]>(`pdf_downloads:${guideId}`) || []
}

/**
 * Clear all analytics data (use with caution)
 */
export async function clearAllAnalytics(): Promise<void> {
  await kv.del('pdf_views:all')
  await kv.del('pdf_downloads:all')
  await kv.del('leads')

  // Clear guide-specific keys (you may need to track guide IDs)
  const guides = ['vibe-os', 'soulbook']
  for (const guideId of guides) {
    await kv.del(`pdf_views:${guideId}`)
    await kv.del(`pdf_downloads:${guideId}`)
  }
}
