'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Play, 
  Filter, 
  X, 
  Cpu, 
  Bot, 
  Sparkles, 
  TrendingUp, 
  Laugh, 
  Activity,
  ArrowRight
} from 'lucide-react'
import { UniversalEmbed } from '@/components/embeds/UniversalEmbed'
import videoData from '@/data/video-vault-100.json'

// ============================================================================
// DATA TYPES
// ============================================================================

interface VideoEntry {
  id: string
  title: string
  channel?: string // compatibility with old field names
  author?: string
  url: string
  duration: string
  topic?: string
  category?: string
  tags: string[]
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function WatchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeVideo, setActiveVideo] = useState<VideoEntry | null>(null)

  // Normalize data (handle both 'channel' and 'author' keys)
  const videos = useMemo(() => {
    return (videoData as any[]).map(v => ({
      ...v,
      author: v.author || v.channel,
      category: v.category || v.topic
    })) as VideoEntry[]
  }, [])

  const categories = useMemo(() => {
    return Array.from(new Set(videos.map(v => v.category).filter(Boolean))) as string[]
  }, [videos])

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesQuery = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = !selectedCategory || video.category === selectedCategory
      
      return matchesQuery && matchesCategory
    })
  }, [videos, searchQuery, selectedCategory])

  const categoryIcons: Record<string, any> = {
    'AI Fundamentals': Cpu,
    'AI Engineering': Cpu,
    'AI Agents': Bot,
    'Creative AI': Sparkles,
    'Strategy': TrendingUp,
    'Creator Economy': TrendingUp,
    'AI Memes': Laugh,
    'Mindset': Activity,
    'Learning': Activity,
    'Rituals': Activity,
  }

  return (
    <main className="min-h-screen bg-void text-white grain-overlay">
      {/* Hero / Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <Play className="w-4 h-4 text-emerald-400 fill-current" />
              <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest">Video Vault</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              The Intelligence <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">Registry.</span>
            </h1>
            
            <p className="text-xl text-white/50 max-w-2xl font-light leading-relaxed">
              Curated high-signal content for the Agentic Era. 100+ videos indexed for deep learning, 
              strategic ROI, and creative mastery.
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input 
                type="text" 
                placeholder="Search by title, author, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors backdrop-blur-sm"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-4 rounded-2xl border transition-all whitespace-nowrap ${
                  !selectedCategory 
                    ? 'bg-white text-black border-white' 
                    : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/5'
                }`}
              >
                All Videos
              </button>
              {categories.map((cat) => {
                const Icon = categoryIcons[cat] || Filter
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-2 px-6 py-4 rounded-2xl border transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-emerald-500 text-black border-emerald-500' 
                        : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video, i) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="group card-premium rounded-3xl p-6 cursor-pointer flex flex-col hover:-translate-y-1 transition-all"
                onClick={() => setActiveVideo(video)}
              >
                {/* Thumbnail Placeholder / Icon */}
                <div className="aspect-video rounded-2xl bg-black/40 border border-white/5 mb-6 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Play className="w-12 h-12 text-white/20 group-hover:text-emerald-400 transition-all group-hover:scale-110" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-lg bg-black/60 border border-white/10 text-[10px] uppercase font-bold tracking-widest text-white/60">
                    {video.category}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-4 text-sm text-white/40">
                  <span className="font-medium text-white/60">{video.author}</span>
                  <span>•</span>
                  <span>{video.duration}</span>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  {video.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/5 text-white/30">
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-32">
            <p className="text-white/30 text-xl">No videos match your search.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory(null);}}
              className="mt-4 text-emerald-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Lightbox / Player Overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/95 backdrop-blur-2xl p-6"
          >
            <div className="w-full max-w-6xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{activeVideo.title}</h2>
                  <p className="text-white/50">{activeVideo.author} • {activeVideo.category}</p>
                </div>
                <button 
                  onClick={() => setActiveVideo(null)}
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <UniversalEmbed 
                  type="youtube" 
                  id={activeVideo.id}
                  autoplay={true}
                />
              </div>

              <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-wrap gap-3">
                  {activeVideo.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  href="/start"
                  className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold transition-all hover:bg-white/90"
                >
                  Build Agent System
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
