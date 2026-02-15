'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { VaultAsset } from '@/lib/vault-types'
import { VaultCard } from './VaultCard'
import { VaultLightbox } from './VaultLightbox'
import { VaultFilters, type SortOption } from './VaultFilters'

const BATCH_SIZE = 24

export function VaultGrid({
  assets,
  showFilters = true,
}: {
  assets: VaultAsset[]
  showFilters?: boolean
}) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [formatFilter, setFormatFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('name')

  const filteredAssets = useMemo(() => {
    let result = assets

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.filename.toLowerCase().includes(q) ||
          a.tags.some(t => t.includes(q))
      )
    }

    if (formatFilter !== 'all') {
      result = result.filter(a => a.format === formatFilter)
    }

    const sorted = [...result]
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'size':
        sorted.sort((a, b) => b.fileSize - a.fileSize)
        break
      case 'date':
        sorted.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
        break
    }

    return sorted
  }, [assets, searchQuery, formatFilter, sortBy])

  const visibleAssets = filteredAssets.slice(0, visibleCount)
  const hasMore = visibleCount < filteredAssets.length

  const formats = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const a of assets) {
      counts[a.format] = (counts[a.format] || 0) + 1
    }
    return counts
  }, [assets])

  return (
    <div>
      {showFilters && (
        <VaultFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          formatFilter={formatFilter}
          onFormatChange={setFormatFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          formats={formats}
          resultCount={filteredAssets.length}
        />
      )}

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
        <AnimatePresence mode="popLayout">
          {visibleAssets.map((asset, i) => (
            <VaultCard
              key={asset.id}
              asset={asset}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount(prev => prev + BATCH_SIZE)}
            className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm font-medium"
          >
            Load More ({filteredAssets.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Empty state */}
      {filteredAssets.length === 0 && (
        <div className="text-center py-20">
          <p className="text-white/40 text-lg">No assets match your filters</p>
          <button
            onClick={() => { setSearchQuery(''); setFormatFilter('all') }}
            className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && visibleAssets[lightboxIndex] && (
          <VaultLightbox
            asset={visibleAssets[lightboxIndex]}
            assets={visibleAssets}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={dir => {
              if (dir === 'prev' && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1)
              if (dir === 'next' && lightboxIndex < visibleAssets.length - 1) setLightboxIndex(lightboxIndex + 1)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
