import { Metadata } from 'next'
import LeadsDashboard from './LeadsDashboard'

export const metadata: Metadata = {
  title: 'Leads Dashboard | FrankX.AI',
  description: 'Manage and track PDF guide leads',
  robots: 'noindex, nofollow' // Keep dashboard private
}

export default function LeadsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Leads Dashboard</h1>
          <p className="text-gray-400">
            View and manage leads from PDF guide downloads
          </p>
        </div>

        <LeadsDashboard />
      </div>
    </div>
  )
}
