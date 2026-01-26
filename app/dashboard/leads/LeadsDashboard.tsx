'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Download, Mail, Filter, Calendar, Building, Briefcase } from 'lucide-react'
import type { PDFLead } from '@/lib/types/pdf-analytics'

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<PDFLead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<PDFLead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterGuide, setFilterGuide] = useState<string>('all')
  const [filterInterest, setFilterInterest] = useState<string>('all')

  useEffect(() => {
    fetchLeads()
  }, [])

  const filterLeadsData = useCallback(() => {
    let filtered = [...leads]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        lead =>
          lead.name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.company?.toLowerCase().includes(query)
      )
    }

    // Guide filter
    if (filterGuide !== 'all') {
      filtered = filtered.filter(lead => lead.guideSlug === filterGuide)
    }

    // Interest filter
    if (filterInterest !== 'all') {
      filtered = filtered.filter(lead => lead.primaryInterest === filterInterest)
    }

    setFilteredLeads(filtered)
  }, [leads, searchQuery, filterGuide, filterInterest])

  useEffect(() => {
    filterLeadsData()
  }, [filterLeadsData])

  async function fetchLeads() {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/dashboard/leads')

      if (!response.ok) {
        throw new Error('Failed to fetch leads')
      }

      const data = await response.json()
      setLeads(data.leads)
      setFilteredLeads(data.leads)
    } catch (err) {
      setError('Failed to load leads. Please try again.')
      console.error('Leads fetch error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  function exportToCSV() {
    const headers = [
      'Name',
      'Email',
      'Company',
      'Role',
      'Guide',
      'Primary Interest',
      'Referral Source',
      'Date'
    ]

    const rows = filteredLeads.map(lead => [
      lead.name,
      lead.email,
      lead.company || '',
      lead.role || '',
      lead.guideTitle,
      lead.primaryInterest || '',
      lead.referralSource || '',
      new Date(lead.timestamp).toLocaleDateString()
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `frankx-leads-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  // Get unique guides and interests for filters
  const uniqueGuides = Array.from(new Set(leads.map(l => l.guideSlug)))
  const uniqueInterests = Array.from(new Set(leads.map(l => l.primaryInterest).filter(Boolean)))

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading leads...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => fetchLeads()}
          className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-medium transition-all"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6">
          <div className="text-3xl font-bold text-white mb-1">{leads.length}</div>
          <div className="text-sm text-gray-400">Total Leads</div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6">
          <div className="text-3xl font-bold text-white mb-1">
            {leads.filter(l => {
              const date = new Date(l.timestamp)
              const weekAgo = new Date()
              weekAgo.setDate(weekAgo.getDate() - 7)
              return date > weekAgo
            }).length}
          </div>
          <div className="text-sm text-gray-400">This Week</div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6">
          <div className="text-3xl font-bold text-white mb-1">
            {Math.round((leads.filter(l => l.company).length / leads.length) * 100) || 0}%
          </div>
          <div className="text-sm text-gray-400">With Company Info</div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          {/* Guide filter */}
          <select
            value={filterGuide}
            onChange={(e) => setFilterGuide(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          >
            <option value="all">All Guides</option>
            {uniqueGuides.map(slug => (
              <option key={slug} value={slug}>
                {leads.find(l => l.guideSlug === slug)?.guideTitle || slug}
              </option>
            ))}
          </select>

          {/* Interest filter */}
          <select
            value={filterInterest}
            onChange={(e) => setFilterInterest(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          >
            <option value="all">All Interests</option>
            {uniqueInterests.map(interest => (
              <option key={interest} value={interest}>
                {interest?.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>

          <button
            onClick={exportToCSV}
            disabled={filteredLeads.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Leads table */}
      <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Company & Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Guide
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Interest
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {lead.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-white truncate">{lead.name}</div>
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-sm text-cyan-400 hover:text-cyan-300 truncate block"
                        >
                          {lead.email}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {lead.company && (
                        <div className="flex items-center gap-1 text-white mb-1">
                          <Building size={14} className="text-gray-500" />
                          <span>{lead.company}</span>
                        </div>
                      )}
                      {lead.role && (
                        <div className="flex items-center gap-1 text-gray-400">
                          <Briefcase size={14} className="text-gray-500" />
                          <span className="capitalize">{lead.role}</span>
                        </div>
                      )}
                      {!lead.company && !lead.role && (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white max-w-xs truncate">
                      {lead.guideTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {lead.primaryInterest ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-medium capitalize">
                        {lead.primaryInterest.replace('-', ' ')}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-sm">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {lead.referralSource ? (
                      <span className="text-sm text-gray-400 capitalize">
                        {lead.referralSource}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-sm">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Calendar size={14} />
                      <span>{new Date(lead.timestamp).toLocaleDateString()}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLeads.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              {searchQuery || filterGuide !== 'all' || filterInterest !== 'all'
                ? 'No leads match your filters'
                : 'No leads yet. Start sharing your guides!'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
