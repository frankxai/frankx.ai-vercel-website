'use client'

import { Search } from 'lucide-react'

export type SortOption = 'name' | 'size' | 'date'

export function VaultFilters({
  searchQuery,
  onSearchChange,
  formatFilter,
  onFormatChange,
  sortBy,
  onSortChange,
  formats,
  resultCount,
}: {
  searchQuery: string
  onSearchChange: (q: string) => void
  formatFilter: string
  onFormatChange: (f: string) => void
  sortBy: SortOption
  onSortChange: (s: SortOption) => void
  formats: Record<string, number>
  resultCount: number
}) {
  const sortedFormats = Object.entries(formats).sort((a, b) => b[1] - a[1])

  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search assets by name, tag, or filename..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-cyan-500/40 focus:outline-none transition-colors text-sm"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Format filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFormatChange('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              formatFilter === 'all'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
            }`}
          >
            All
          </button>
          {sortedFormats.map(([fmt, count]) => (
            <button
              key={fmt}
              onClick={() => onFormatChange(fmt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                formatFilter === fmt
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
              }`}
            >
              {fmt.toUpperCase()} ({count})
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-white/30 text-xs">Sort:</span>
          {(['name', 'size', 'date'] as SortOption[]).map(opt => (
            <button
              key={opt}
              onClick={() => onSortChange(opt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                sortBy === opt
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Result count */}
        <span className="text-white/30 text-xs">{resultCount} results</span>
      </div>
    </div>
  )
}
