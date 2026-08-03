'use client'

import { useState, useMemo } from 'react'
import type { Space } from '@/data/ecosystems'

interface SpacesTableProps {
  spaces: Space[]
}

const DISTRICTS = [
  'All Districts',
  'City Centre',
  'Oost',
  'West',
  'Zuid',
  'Noord',
  'Zuidoost',
  'Nieuw-West',
  'Westpoort',
  'Multi-location operators',
]

const MODELS = ['All Models', 'Free', 'Hourly', 'Member', 'Club']

export default function SpacesTable({ spaces }: SpacesTableProps) {
  const [search, setSearch] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts')
  const [selectedModel, setSelectedModel] = useState('All Models')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      // Search term match
      const query = search.toLowerCase()
      const matchesSearch =
        space.name.toLowerCase().includes(query) ||
        space.notes.toLowerCase().includes(query) ||
        space.address.toLowerCase().includes(query) ||
        space.district.toLowerCase().includes(query)

      // District match
      const matchesDistrict =
        selectedDistrict === 'All Districts' || space.district === selectedDistrict

      // Model match
      const matchesModel =
        selectedModel === 'All Models' ||
        (selectedModel === 'Free' && space.model.toLowerCase().includes('free')) ||
        (selectedModel === 'Hourly' &&
          (space.model.toLowerCase().includes('hourly') ||
            space.model.toLowerCase().includes('pass') ||
            space.model.toLowerCase().includes('pay-per-use') ||
            space.model.toLowerCase().includes('mixed'))) ||
        (selectedModel === 'Member' && space.model.toLowerCase() === 'member') ||
        (selectedModel === 'Club' && space.model.toLowerCase() === 'club')

      return matchesSearch && matchesDistrict && matchesModel
    })
  }, [spaces, search, selectedDistrict, selectedModel])

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [search, selectedDistrict, selectedModel])

  const totalPages = Math.ceil(filteredSpaces.length / itemsPerPage)
  
  const paginatedSpaces = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredSpaces.slice(start, start + itemsPerPage)
  }, [filteredSpaces, currentPage])

  // Get color tokens for model badges
  const getBadgeStyle = (model: string) => {
    const m = model.toLowerCase()
    if (m.includes('free')) {
      return 'border-emerald-500/20 bg-emerald-500/[0.04] text-emerald-400'
    }
    if (m.includes('hourly') || m.includes('pass') || m.includes('pay-per-use') || m.includes('mixed')) {
      return 'border-amber-500/20 bg-amber-500/[0.04] text-amber-400'
    }
    if (m === 'member') {
      return 'border-cyan-500/20 bg-cyan-500/[0.04] text-cyan-400'
    }
    if (m === 'club') {
      return 'border-fuchsia-500/20 bg-fuchsia-500/[0.04] text-fuchsia-400'
    }
    return 'border-zinc-500/20 bg-zinc-500/[0.04] text-zinc-400'
  }

  return (
    <div className="space-y-6">
      {/* Directory Header */}
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Plate IX</span>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white mt-1">Full Directory</h2>
        <p className="text-zinc-400 mt-2 text-sm leading-relaxed max-w-xl">
          Everything on the StartupAmsterdam register + the free baseline circuit. Explore all {spaces.length} spaces.
        </p>
      </div>

      {/* Filter Surface */}
      <div className="bg-[#101012] border border-white/[0.08] rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="w-full md:flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, street, or notes..."
            className="w-full bg-[#0a0a0b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

        {/* District select */}
        <div className="w-full md:w-56">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full bg-[#0a0a0b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-emerald-500/50 transition-colors"
          >
            {DISTRICTS.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Model select */}
        <div className="w-full md:w-44">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full bg-[#0a0a0b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-emerald-500/50 transition-colors"
          >
            {MODELS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Grid */}
      {paginatedSpaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedSpaces.map((space) => (
            <article
              key={space.name}
              className="bg-[#101012] border border-white/[0.08] rounded-xl p-5 hover:border-zinc-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                    {space.district}
                  </span>
                  <span className={`text-[9px] uppercase tracking-wider font-bold border px-2 py-0.5 rounded-full ${getBadgeStyle(space.model)}`}>
                    {space.model}
                  </span>
                </div>
                <h3 className="text-md font-semibold text-white mt-2 leading-snug">{space.name}</h3>
                <p className="text-zinc-400 mt-2 text-xs leading-relaxed line-clamp-3">{space.notes}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs">
                <span className="text-zinc-500 max-w-[12rem] truncate">{space.address || 'Address on request'}</span>
                <span className="font-mono text-emerald-400 font-semibold">{space.price}</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-white/[0.08] rounded-xl text-zinc-500 font-mono text-sm">
          No spaces match the selected query.
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-4 text-xs font-mono text-zinc-500">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredSpaces.length)} of {filteredSpaces.length} spaces
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded border border-white/[0.08] hover:border-white/20 disabled:opacity-30 disabled:hover:border-white/[0.08] transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded border border-white/[0.08] hover:border-white/20 disabled:opacity-30 disabled:hover:border-white/[0.08] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
