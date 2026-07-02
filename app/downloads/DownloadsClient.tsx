'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Download, ExternalLink, BookOpen, Terminal, Cpu } from 'lucide-react'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import { downloadsList, type DownloadCategory } from '@/data/downloads'

type Category = DownloadCategory

const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'systems', label: 'Systems & Software' },
  { id: 'books', label: 'Books & Lore' },
  { id: 'dev', label: 'Developer Packs' },
]

export default function DownloadsClient() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')

  const filteredDownloads = useMemo(() => {
    return downloadsList.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.features.some((f) => f.toLowerCase().includes(search.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [search, selectedCategory])

  const categoryCounts = useMemo(() => {
    const counts = { all: downloadsList.length, systems: 0, books: 0, dev: 0 }
    downloadsList.forEach((item) => {
      counts[item.category]++
    })
    return counts
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search and Tabs Control Panel */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
            <Search className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Search guides, books, templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 backdrop-blur-md transition-all text-sm"
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center bg-slate-950/40 p-1.5 border border-white/5 rounded-2xl backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as Category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label} ({categoryCounts[cat.id as Category]})
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filteredDownloads.length > 0 ? (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDownloads.map((item) => (
              <GlassmorphicCard
                key={item.id}
                hover
                border="subtle"
                gradient={item.variant === 'purple' ? 'purple' : 'aurora'}
                className="flex flex-col h-full rounded-3xl border border-white/10 overflow-hidden bg-slate-950/40"
              >
                {/* 16:9 Premium Image Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-white/5 group">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={item.id === 'agentic-creator-os' || item.id === 'soulbook-guide'}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Pill Overlay */}
                  <span className="absolute top-4 right-4 z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-white/90 border border-white/10 rounded-full backdrop-blur-md">
                    {item.category === 'systems'
                      ? 'Systems & Software'
                      : item.category === 'books'
                      ? 'Books & Manuals'
                      : 'Developer Pack'}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="p-2.5 rounded-xl bg-white/5 text-emerald-400 border border-white/5">
                      {item.icon === 'cpu' && <Cpu className="h-5 w-5" />}
                      {item.icon === 'book' && <BookOpen className="h-5 w-5" />}
                      {item.icon === 'terminal' && <Terminal className="h-5 w-5" />}
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
                        {item.title}
                      </h2>
                      <p className="text-xs text-white/50">{item.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-white/70 mb-6 leading-relaxed flex-grow">
                    {item.description}
                  </p>

                  {/* Features / Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {item.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2.5 py-1 text-[10px] font-medium text-white/80 bg-white/5 border border-white/5 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto">
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-semibold rounded-xl transition-all duration-300 shadow-md shadow-white/5"
                      >
                        {item.cta ?? 'Download Now'}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link
                        href={item.previewUrl ?? '#'}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-xl transition-all duration-300 shadow-md shadow-emerald-500/10"
                      >
                        {item.cta ?? 'Preview & Download'}
                        <Download className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </GlassmorphicCard>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-slate-950/20 border border-white/5 rounded-3xl backdrop-blur-md"
          >
            <Cpu className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-1">No resources found</h3>
            <p className="text-white/40 max-w-xs mx-auto text-sm">
              Try adjusting your filters or search keywords to locate your file.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
