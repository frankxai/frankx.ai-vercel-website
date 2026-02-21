'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

interface WatchHeroProps {
  stats: {
    totalVideos: number
    totalCategories: number
    featuredCount: number
    uniqueAuthors: number
  }
}

export function WatchHero({ stats }: WatchHeroProps) {
  return (
    <section className="pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <Play className="w-4 h-4 text-emerald-400 fill-current" />
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest">
              Curated Collection
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            What to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">
              Watch.
            </span>
          </h1>

          <p className="text-xl text-white/50 max-w-2xl font-light leading-relaxed mb-8">
            High-signal videos for builders, creators, and architects.
            {' '}{stats.totalVideos}+ videos curated across {stats.totalCategories} categories.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { label: 'Videos', value: `${stats.totalVideos}+` },
              { label: 'Categories', value: stats.totalCategories },
              { label: "Editor's Picks", value: stats.featuredCount },
              { label: 'Creators', value: stats.uniqueAuthors },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
