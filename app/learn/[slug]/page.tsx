'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
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
  Sparkles,
} from 'lucide-react'
import { learningPaths, type VideoResource } from '@/data/learning-paths'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { CourseJsonLd, FAQPageJsonLd } from '@/components/seo/JsonLd'

const iconMap: Record<string, React.ComponentType<{className?: string}>> = {
  brain: Brain,
  music: Music2,
  zap: Zap,
  image: ImageIcon,
  sparkles: Sparkles,
}

const colorMap: Record<string, { bg: string; text: string; border: string; gradientFrom: string }> = {
  emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/20', gradientFrom: 'from-emerald-500/10' },
  cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500/20', gradientFrom: 'from-cyan-500/10' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/20', gradientFrom: 'from-amber-500/10' },
  violet: { bg: 'bg-violet-500', text: 'text-violet-400', border: 'border-violet-500/20', gradientFrom: 'from-violet-500/10' },
  sky: { bg: 'bg-sky-500', text: 'text-sky-400', border: 'border-sky-500/20', gradientFrom: 'from-sky-500/10' },
}

const playButtonBgMap: Record<string, string> = {
  emerald: 'bg-emerald-500/80 group-hover:bg-emerald-500',
  cyan: 'bg-cyan-500/80 group-hover:bg-cyan-500',
  amber: 'bg-amber-500/80 group-hover:bg-amber-500',
  violet: 'bg-violet-500/80 group-hover:bg-violet-500',
  sky: 'bg-sky-500/80 group-hover:bg-sky-500',
}

function getRelatedResourceLabel(href: string) {
  if (href.includes('/learn/')) return 'Learning Path'
  if (href.includes('/resources/')) return 'Free Resource'
  if (href.includes('/community') || href.includes('/gencreator')) return 'Community'
  if (href.includes('/blog/')) return 'Article'
  if (href.includes('/product')) return 'Product'
  return 'Guide'
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
            <Image
              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
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
              <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 text-white/40">
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
  const colors = colorMap[path.color] || colorMap.emerald
  const courseData = {
    name: path.title,
    description: path.description,
    provider: 'FrankX.AI',
    url: `https://frankx.ai/learn/${path.slug}`,
    offers: { price: '0', priceCurrency: 'USD' },
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <CourseJsonLd data={courseData} id={`course-${path.slug}`} />
      {path.faqs && path.faqs.length > 0 && (
        <FAQPageJsonLd faqs={path.faqs} id={`faq-${path.slug}`} />
      )}
      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradientFrom} via-transparent to-transparent`} />

        <div className="relative max-w-6xl mx-auto px-6">
          <Breadcrumbs
            items={[
              { label: 'Learn', href: '/learn' },
              { label: path.title, href: `/learn/${path.slug}` },
            ]}
          />

          <div className="grid lg:grid-cols-[1fr,300px] gap-12">
            {/* Main content */}
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.border} border bg-white/5 ${colors.text} text-sm font-medium mb-6`}>
                <Icon className="w-4 h-4" />
                {path.heroEyebrow || `${path.difficulty} path`}
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
          </div>
        </div>
      </section>

      {/* Briefing */}
      {path.longIntro && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="grid gap-6 lg:grid-cols-[1.35fr,0.65fr]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/35 mb-4">
                Current Builder Brief
              </p>
              <div className="space-y-4 text-base leading-relaxed text-white/68">
                {path.longIntro.split('\n\n').map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            {path.ctaTitle && (
              <div className={`rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.gradientFrom} to-transparent p-6`}>
                <h2 className="text-xl font-bold text-white mb-3">{path.ctaTitle}</h2>
                <p className="text-sm leading-relaxed text-white/62 mb-6">{path.ctaBody}</p>
                <Link
                  href={path.id === 'openai-devday-agent-stack' ? '/resources/openai-agent-builder-workbook' : '/guides'}
                  className={`inline-flex items-center gap-2 rounded-xl ${colors.bg} px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90`}
                >
                  {path.id === 'openai-devday-agent-stack' ? 'Get the workbook' : 'Explore guides'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Ecosystem */}
      {path.ecosystem && path.ecosystem.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="mb-8">
            <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${colors.text}`}>
              Builder Stack
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">Choose the right surface</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {path.ecosystem.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">
                      {tool.category}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{tool.name}</h3>
                  </div>
                  {tool.status && (
                    <span className={`rounded-full border ${colors.border} bg-white/5 px-2.5 py-1 text-[11px] font-semibold ${colors.text}`}>
                      {tool.status}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-white/58">{tool.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/42 group-hover:text-white/75">
                  Source
                  <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Announcements */}
      {path.announcements && path.announcements.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="mb-8">
            <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${colors.text}`}>
              Official Timeline
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">What changed and why it matters</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {path.announcements.map((item) => (
              <a
                key={`${item.date}-${item.title}`}
                href={item.source}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/38">
                  <span>{item.date}</span>
                  <span className={`rounded-full border ${colors.border} bg-white/5 px-2 py-0.5 ${colors.text}`}>
                    {item.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/58">{item.summary}</p>
              </a>
            ))}
          </div>
        </section>
      )}

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

      {/* Expert Sources */}
      {path.experts && path.experts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Primary Sources</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {path.experts.map((expert) => (
              <a
                key={expert.name}
                href={expert.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">{expert.name}</h3>
                    <p className="text-xs text-white/40">{expert.role}</p>
                  </div>
                  {expert.isOfficial && (
                    <span className={`rounded-full border ${colors.border} bg-white/5 px-2 py-1 text-[11px] font-semibold ${colors.text}`}>
                      Official
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/58">{expert.why}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {path.faqs && path.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Questions this path answers</h2>
          <div className="space-y-4">
            {path.faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h3 className="font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Resources */}
      {path.relatedGuides.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Related Resources</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {path.relatedGuides.map((guide) => (
              <Link
                key={guide}
                href={guide}
                className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.04] hover:border-white/20 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className={`w-5 h-5 ${colors.text}`} />
                  <span className="text-white font-medium">
                    {getRelatedResourceLabel(guide)}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
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
