import type { Metadata } from 'next'
import { getObservabilitySummary } from '@/lib/observability/observability-summary'
import { AnalyticsDashboardClient } from './AnalyticsDashboardClient'

export const metadata: Metadata = {
  title: 'Analytics & Search Console — Admin | FrankX',
  description: 'Unified intelligence across Google Analytics 4, Search Console, and Agent Swarm operations.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AnalyticsAdminPage() {
  const initialSummary = await getObservabilitySummary(30)

  return <AnalyticsDashboardClient initialSummary={initialSummary} />
}
