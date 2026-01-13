// Client-side analytics utilities for PDF tracking

// Generate or retrieve session ID
export function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr'

  const key = 'frankx_session_id'
  let sessionId = sessionStorage.getItem(key)

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem(key, sessionId)
  }

  return sessionId
}

// Track PDF view
export async function trackPDFView(
  guideSlug: string,
  guideTitle: string,
  pagesViewed: number[],
  timeSpent: number,
  completionRate: number
): Promise<void> {
  try {
    await fetch('/api/analytics/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guideSlug,
        guideTitle,
        sessionId: getSessionId(),
        pagesViewed,
        timeSpent,
        completionRate
      })
    })
  } catch (error) {
    console.error('Failed to track PDF view:', error)
  }
}

// Track PDF download
export async function trackPDFDownload(
  guideSlug: string,
  guideTitle: string,
  downloadMethod: 'direct' | 'email' | 'combo'
): Promise<void> {
  try {
    await fetch('/api/analytics/track-download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guideSlug,
        guideTitle,
        sessionId: getSessionId(),
        downloadMethod
      })
    })
  } catch (error) {
    console.error('Failed to track PDF download:', error)
  }
}

// Get recent download count for a guide
export async function getRecentDownloadCount(guideSlug: string): Promise<number> {
  try {
    const response = await fetch(`/api/analytics/recent-downloads?guideSlug=${guideSlug}`)
    const data = await response.json()
    return data.count || 0
  } catch (error) {
    console.error('Failed to get download count:', error)
    return 0
  }
}
