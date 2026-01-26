'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Music2,
  Zap,
  ImageIcon,
  Clock,
  BookOpen,
  Play,
  ExternalLink,
  CheckCircle,
  Target,
} from 'lucide-react'
import { learningPaths, type VideoResource } from '@/data/learning-paths'

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  music: Music2,
  zap: Zap,
  image: ImageIcon,
}

const colorMap: Record<string, { bg: string; text: string; border: string; gradientFrom: string }> = {
  emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/20', gradientFrom: 'from-emerald-500/10' },
  cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500/20', gradientFrom: 'from-cyan-500/10' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/20', gradientFrom: 'from-amber-500/10' },
  violet: { bg: 'bg-violet-500', text: 'text-violet-400', border: 'border-violet-500/20', gradientFrom: 'from-violet-500/10' },
}

const playButtonBgMap: Record<string, string> = {
  emerald: 'bg-emerald-500/80 group-hover:bg-emerald-500',
  cyan: 'bg-cyan-500/80 group-hover:bg-cyan-500',
  amber: 'bg-amber-500/80 group-hover:bg-amber-500',
  violet: 'bg-violet-500/80 group-hover:bg-violet-500',
}

function VideoPlayer({ video, color }: { video: VideoResource; color: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const colors = colorMap[color]
  const playBtnClasses = playButtonBgMap[color] || playButtonBgMap.emerald

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
      {/* Video */}
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
              aria-label={`Play ${video.title}`}
            >
              <div className={`p-5 rounded-full transition-colors ${playBtnClasses}`}>
                <Play className="w-10 h-10 text-white fill-white" />
              </div>
            </button>
            <div className="absolute top-4 left-4">
              <span className={`text-xs px-3 py-1 rounded-full bg-black/70 ${colors.text} font-medium capitalize`}>
                {video.level}
              </span>
            </div>
            <div className="absolute bottom-4 right-4 px-2 py-1 rounded bg-black/70 text-white text-sm">
              {video.duration}
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">
          {video.title}
        </h3>
        <p className="text-white/60 mb-4">
          {video.description}
        </p>
        <div className="flex items-center justify-between">
          <a
            href={video.creatorChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            by {video.creator}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <div className="flex gap-2">
            {video.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 text-white/55">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LearningPathPage() {
  const params = useParams()
  const slug = params?.slug as string

  const path = learningPaths.find((p) => p.slug === slug)

  if (!path) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Path not found</h1>
          <Link href="/learn" className="text-emerald-400 hover:text-emerald-300">
            Back to Learning Paths
          </Link>
        </div>
      </div>
    )
  }

  const Icon = iconMap[path.icon] || BookOpen
  const colors = colorMap[path.color]

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradientFrom} via-transparent to-transparent`} />

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Learning Paths
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-[1fr,300px] gap-12"
          >
            {/* Main content */}
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.border} border bg-white/5 ${colors.text} text-sm font-medium mb-6`}>
                <Icon className="w-4 h-4" />
                {path.difficulty} path
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {path.title}
              </h1>

              <p className="text-xl text-white/60 mb-8">
                {path.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 text-white/50">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {path.estimatedHours} hours
                </div>
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  {path.videos.length} videos
                </div>
              </div>
            </div>

            {/* Sidebar - Outcomes */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className={`w-5 h-5 ${colors.text}`} />
                <h3 className="font-semibold text-white">What You'll Learn</h3>
              </div>
              <ul className="space-y-3">
                {path.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-sm text-white/70">
                    <CheckCircle className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Videos */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-white mb-8">Course Videos</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {path.videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <VideoPlayer video={video} color={path.color} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Related Resources */}
      {path.relatedGuides.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Related Resources</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {path.relatedGuides.map((guide) => (
              <Link
                key={guide}
                href={guide}
                className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className={`w-5 h-5 ${colors.text}`} />
                  <span className="text-white font-medium">
                    {guide.includes('blog') ? 'Related Article' : guide.includes('product') ? 'Product' : 'Guide'}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className={`bg-gradient-to-br ${colors.gradientFrom} to-transparent rounded-3xl border ${colors.border} p-8 md:p-12 text-center`}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready for Hands-On Practice?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            These free videos give you the foundation.
            Our guides take you deeper with practical exercises.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/guides"
              className={`inline-flex items-center gap-2 px-6 py-3 ${colors.bg} text-white font-medium rounded-xl hover:opacity-90 transition-opacity`}
            >
              Explore Guides
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 transition-colors"
            >
              More Learning Paths
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
