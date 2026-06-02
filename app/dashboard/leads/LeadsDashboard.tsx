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

  const fetchLeads = useCallback(async () => {
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
    fetchLeads()
  }, [fetchLeads])

  useEffect(() => {
    filterLeadsData()
  }, [filterLeadsData])

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
      <div className="text-center py-20" role="alert">
        <p className="text-red-300 mb-4">{error}</p>
        <button
          onClick={() => fetchLeads()}
          className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
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
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
          <div className="text-3xl font-bold text-white mb-1 tabular-nums">{leads.length}</div>
          <div className="text-sm text-gray-400">Total leads</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
          <div className="text-3xl font-bold text-white mb-1 tabular-nums">
            {leads.filter(l => {
              const date = new Date(l.timestamp)
              const weekAgo = new Date()
              weekAgo.setDate(weekAgo.getDate() - 7)
              return date > weekAgo
            }).length}
          </div>
          <div className="text-sm text-gray-400">This week</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
          <div className="text-3xl font-bold text-white mb-1 tabular-nums">
            {Math.round((leads.filter(l => l.company).length / leads.length) * 100) || 0}%
          </div>
          <div className="text-sm text-gray-400">With company info</div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <label htmlFor="leads-search" className="sr-only">Search leads</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" aria-hidden="true" />
            <input
              id="leads-search"
              type="search"
              placeholder="Search by name, email, or company…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/60 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] focus-visible:border-cyan-400/40 transition-all"
            />
          </div>

          {/* Guide filter */}
          <div>
            <label htmlFor="leads-guide-filter" className="sr-only">Filter by guide</label>
            <select
              id="leads-guide-filter"
              value={filterGuide}
              onChange={(e) => setFilterGuide(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-white/10 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] focus-visible:border-cyan-400/40 transition-all"
            >
              <option value="all">All guides</option>
              {uniqueGuides.map(slug => (
                <option key={slug} value={slug}>
                  {leads.find(l => l.guideSlug === slug)?.guideTitle || slug}
                </option>
              ))}
            </select>
          </div>

          {/* Interest filter */}
          <div>
            <label htmlFor="leads-interest-filter" className="sr-only">Filter by interest</label>
            <select
              id="leads-interest-filter"
              value={filterInterest}
              onChange={(e) => setFilterInterest(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-white/10 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] focus-visible:border-cyan-400/40 transition-all"
            >
              <option value="all">All interests</option>
              {uniqueInterests.map(interest => (
                <option key={interest} value={interest}>
                  {interest?.replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between" aria-live="polite">
          <div className="text-sm text-gray-400">
            Showing <span className="tabular-nums text-gray-200">{filteredLeads.length}</span> of <span className="tabular-nums text-gray-200">{leads.length}</span> leads
          </div>

          <button
            onClick={exportToCSV}
            disabled={filteredLeads.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
          >
            <Download size={16} aria-hidden="true" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Leads table */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" aria-label="Leads">
            <caption className="sr-only">Leads captured from PDF guide downloads</caption>
            <thead className="bg-white/[0.02]">
              <tr className="border-b border-white/10">
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Company &amp; role
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Guide
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Interest
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Source
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0"
                        aria-hidden="true"
                      >
                        {lead.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-white truncate">{lead.name}</div>
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-sm text-cyan-400 hover:text-cyan-300 truncate block rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
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
                    <div className="flex items-center gap-1.5 text-sm text-gray-400">
                      <Calendar size={14} aria-hidden="true" />
                      <time dateTime={new Date(lead.timestamp).toISOString()} className="tabular-nums">
                        {new Date(lead.timestamp).toLocaleDateString()}
                      </time>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLeads.length === 0 && (
            <div className="text-center py-12 text-gray-500" role="status">
              {searchQuery || filterGuide !== 'all' || filterInterest !== 'all'
                ? 'No leads match your filters'
                : 'No leads yet. Start sharing your guides.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
