'use client'

import { useState } from 'react'
import { Play, Clock, Sparkles, Filter, Bookmark, CheckCircle, Search } from 'lucide-react'
import { UniversalEmbed } from '@/components/embeds/UniversalEmbed'
import videoLibrary from '@/data/video-library.json'
import { motion } from 'framer-motion'

type Persona = 'all' | 'student' | 'creator' | 'developer' | 'investor' | 'architect'

export default function WatchHub() {
  const [activePersona, setActivePersona] = useState<Persona>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const personas: { id: Persona; label: string; icon: string }[] = [
    { id: 'all', label: 'All Intelligence', icon: '🌐' },
    { id: 'student', label: 'For Students', icon: '🎓' },
    { id: 'creator', label: 'For Creators', icon: '🎨' },
    { id: 'developer', label: 'For Developers', icon: '⚡' },
    { id: 'architect', label: 'For Architects', icon: '🏛️' },
    { id: 'investor', label: 'For Investors', icon: '📈' },
  ]

  const filteredVideos = videoLibrary.filter(video => {
    const matchesPersona = activePersona === 'all' || video.personas.includes(activePersona)
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          video.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesPersona && matchesSearch
  })

  const heroVideo = videoLibrary.find(v => v.featured && (activePersona === 'all' || v.personas.includes(activePersona))) || videoLibrary[0]

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Hero Header */}
      <section className="relative pt-32 pb-12 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Video Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                The Vault.
              </h1>
              <p className="text-white/60 max-w-xl text-lg">
                A curated intelligence network of hundreds of high-signal videos. 
                Filtered for your role. Optimized for your growth.
              </p>
            </div>
            
            {/* Persona Filters */}
            <div className="flex flex-wrap gap-2">
              {personas.map(p => (
                <button
                  key={p.id}
                  onClick={() => setActivePersona(p.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    activePersona === p.id 
                      ? 'bg-white text-black scale-105 shadow-lg shadow-white/10' 
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{p.icon}</span>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hero Video Player */}
          {heroVideo && (
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0b] aspect-video max-h-[600px] mx-auto">
               <UniversalEmbed 
                 type="youtube" 
                 id={heroVideo.id} 
                 title={heroVideo.title}
                 className="w-full h-full"
               />
               <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-8 pointer-events-none">
                 <div className="inline-block px-2 py-1 bg-emerald-500 text-black text-xs font-bold rounded mb-2">FEATURED</div>
                 <h2 className="text-2xl font-bold text-white mb-2">{heroVideo.title}</h2>
                 <p className="text-white/80 line-clamp-1">{heroVideo.description}</p>
               </div>
            </div>
          )}
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Search & Sort */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search the vault..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-all"
              />
            </div>
            <div className="text-sm text-white/40">
              Showing {filteredVideos.length} videos
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all hover:bg-white/[0.04]"
              >
                {/* Thumbnail / Embed Area */}
                <div className="aspect-video bg-black/50 relative">
                  <UniversalEmbed type="youtube" id={video.id} title={video.title} />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                      {video.category}
                    </span>
                    <button className="text-white/40 hover:text-white transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-300 transition-colors">
                    {video.title}
                  </h3>
                  
                  <p className="text-sm text-white/50 mb-4 line-clamp-2">
                    {video.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {video.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs text-white/30 px-2 py-1 rounded bg-white/5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
