'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  Brain,
  Music2,
  Zap,
  ImageIcon,
  Clock,
  BookOpen,
  Play,
  ExternalLink,
  GraduationCap,
} from 'lucide-react'
import { learningPaths, featuredCreators, type LearningPath, type VideoResource } from '@/data/learning-paths'

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  music: Music2,
  zap: Zap,
  image: ImageIcon,
}

const colorMap: Record<string, string> = {
  emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400',
  cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-400',
  amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400',
  violet: 'from-violet-500/20 to-violet-500/5 border-violet-500/20 text-violet-400',
}

function PathCard({ path }: { path: LearningPath }) {
  const Icon = iconMap[path.icon] || BookOpen
  const colors = colorMap[path.color]

  return (
    <Link
      href={`/learn/${path.slug}`}
      className={`group relative block p-6 rounded-2xl border bg-gradient-to-br ${colors} hover:border-white/20 transition-all hover:-translate-y-1`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-white/5`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-white/60 capitalize">
          {path.difficulty}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90">
        {path.title}
      </h3>
      <p className="text-sm text-white/50 mb-4 line-clamp-2">
        {path.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-white/40">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {path.estimatedHours} hours
        </div>
        <div className="flex items-center gap-1.5">
          <Play className="w-3.5 h-3.5" />
          {path.videos.length} videos
        </div>
      </div>

      <ArrowRight className="absolute bottom-6 right-6 w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
    </Link>
  )
}

function VideoCard({ video, pathColor }: { video: VideoResource; pathColor: string }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
      {/* Video Thumbnail / Player */}
      <div className="relative aspect-video bg-black/50">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group"
            >
              <div className={`p-4 rounded-full bg-${pathColor}-500/80 group-hover:bg-${pathColor}-500 transition-colors`}>
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </button>
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs">
              {video.duration}
            </div>
          </>
        )}
      </div>

      {/* Video Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs px-2 py-0.5 rounded-full bg-white/10 capitalize text-white/60`}>
            {video.level}
          </span>
        </div>
        <h4 className="font-semibold text-white mb-1 line-clamp-2">
          {video.title}
        </h4>
        <p className="text-sm text-white/50 mb-3 line-clamp-2">
          {video.description}
        </p>
        <a
          href={video.creatorChannel}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          {video.creator}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-violet-500/10" />

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Curated Learning Paths
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Learn AI the{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Right Way
              </span>
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Free resources from the best creators on the internet.
              Curated paths that actually get you results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {learningPaths.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <PathCard path={path} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Creators */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Featured Creators</h2>
          <p className="text-white/50">Learn from the best in the AI education space</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {featuredCreators.map((creator) => (
            <a
              key={creator.name}
              href={creator.channel}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all text-center"
            >
              <h3 className="font-semibold text-white mb-1">{creator.name}</h3>
              <p className="text-xs text-white/50 mb-2">{creator.specialty}</p>
              <p className="text-xs text-emerald-400">{creator.subscribers} subscribers</p>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-br from-emerald-500/10 to-violet-500/10 rounded-3xl border border-white/10 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want Structured Guidance?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Free resources are great for exploration.
            For a structured path with hands-on projects, check out our guides.
          </p>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-colors"
          >
            Explore Guides
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
