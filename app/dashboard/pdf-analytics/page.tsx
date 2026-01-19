import { Metadata } from 'next'
import PDFAnalyticsDashboard from './PDFAnalyticsDashboard'

export const metadata: Metadata = {
  title: 'PDF Analytics Dashboard | FrankX.AI',
  description: 'Track PDF guide views, downloads, and engagement metrics',
  robots: 'noindex, nofollow' // Keep dashboard private
}

export default function PDFAnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#030712] pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">PDF Analytics</h1>
          <p className="text-gray-400">
            Track guide performance, downloads, and user engagement
          </p>
        </div>

        <PDFAnalyticsDashboard />
      </div>
    </div>
  )
}
