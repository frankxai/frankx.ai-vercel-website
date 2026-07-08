'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { useState } from 'react'
import {
  ArrowRight,
  Brain,
  Music2,
  Zap,
  ImageIcon,
  Sparkles,
  Clock,
  BookOpen,
  Play,
  ExternalLink,
  CheckCircle,
  Target,
  Layers,
  Rocket,
  RefreshCw,
  AlertTriangle,
  FlaskConical,
  Users,
  HelpCircle,
} from 'lucide-react'
import { learningPaths, type VideoResource, type PortalAnnouncement } from '@/data/learning-paths'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'

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

const defaultColors = colorMap.emerald

const playButtonBgMap: Record<string, string> = {
  emerald: 'bg-emerald-500/80 group-hover:bg-emerald-500',
  cyan: 'bg-cyan-500/80 group-hover:bg-cyan-500',
  amber: 'bg-amber-500/80 group-hover:bg-amber-500',
  violet: 'bg-violet-500/80 group-hover:bg-violet-500',
  sky: 'bg-sky-500/80 group-hover:bg-sky-500',
}

const announcementTagStyles: Record<PortalAnnouncement['tag'], { bg: string; text: string; icon: React.ComponentType<{className?: string}> }> = {
  Launch: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: Rocket },
  Update: { bg: 'bg-sky-500/10', text: 'text-sky-400', icon: RefreshCw },
  Deprecation: { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: AlertTriangle },
  Research: { bg: 'bg-violet-500/10', text: 'text-violet-400', icon: FlaskConical },
}

// Lightweight FAQ answer renderer — converts [label](href) into anchor tags and
// escapes everything else. Kept tiny on purpose: FAQPageJsonLd gets the raw
// text, so this is purely the visual rendering.
function renderFaqAnswer(answer: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: string[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = linkRe.exec(answer)) !== null) {
    parts.push(escape(answer.slice(lastIndex, match.index)))
    const label = escape(match[1])
    const href = match[2].replace(/"/g, '&quot;')
    parts.push(`<a href="${href}" class="text-sky-400 hover:underline">${label}</a>`)
    lastIndex = match.index + match[0].length
  }
  parts.push(escape(answer.slice(lastIndex)))
  return parts.join('')
}

function VideoPlayer({ video, color }: { video: VideoResource; color: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const colors = colorMap[color] || defaultColors
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
        <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
        <p className="text-white/60 mb-4">{video.description}</p>
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

  // Unknown slug → real 404 (matches the /learn/[slug] hardening in #219),
  // not an inline error page.
  if (!path) {
    notFound()
  }

  const Icon = iconMap[path.icon] || BookOpen
  // Fallback color guards against a portal declaring a color not in colorMap —
  // otherwise `colors.gradientFrom` throws (the 500 #219 fixed).
  const colors = colorMap[path.color] || defaultColors

  // Recency signal for AI answer engines: parse the "Updated <Month DD, YYYY>"
  // heroEyebrow into an ISO date. This is the strongest freshness cue we have.
  const eyebrowDate = path.heroEyebrow?.match(/([A-Z][a-z]+ \d{1,2}, \d{4})/)?.[1]
  const dateModified = eyebrowDate ? new Date(eyebrowDate).toISOString() : undefined
  const heroThumb = path.videos[0]
    ? `https://img.youtube.com/vi/${path.videos[0].youtubeId}/maxresdefault.jpg`
    : undefined
  // Entity coverage — the tools this portal actually teaches, as named Things.
  const aboutEntities = (path.ecosystem ?? []).slice(0, 8).map((t) => ({ '@type': 'Thing', name: t.name }))

  const courseSchema = {
    name: path.title,
    description: path.description,
    provider: { '@type': 'Organization', name: 'FrankX.AI', url: 'https://frankx.ai' },
    url: `https://frankx.ai/learn/${path.slug}`,
    ...(heroThumb ? { image: heroThumb } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(aboutEntities.length > 0 ? { about: aboutEntities } : {}),
    educationalLevel:
      path.difficulty === 'beginner' ? 'Beginner' : path.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced',
    learningResourceType: 'Course',
    timeRequired: `PT${path.estimatedHours}H`,
    inLanguage: 'en',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: `PT${path.estimatedHours}H` },
  }

  const videoListSchema = {
    name: `${path.title} — Curated Videos`,
    numberOfItems: path.videos.length,
    itemListElement: path.videos.map((video, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      // uploadDate intentionally omitted — we don't know each video's real
      // publish date, and a fabricated one is worse SEO than its absence
      // (Google tolerates a missing recommended field, not a wrong one).
      item: {
        '@type': 'VideoObject',
        name: video.title,
        description: video.description,
        thumbnailUrl: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
        contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
        embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
      },
    })),
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <JsonLd type="Course" data={courseSchema} id={`json-ld-course-${path.slug}`} />
      <JsonLd type="ItemList" data={videoListSchema} id={`json-ld-videos-${path.slug}`} />
      {path.faqs && path.faqs.length > 0 && path.emitFaqSchema !== false && (
        <FAQPageJsonLd faqs={path.faqs} id={`json-ld-faq-${path.slug}`} />
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-[1fr,300px] gap-12"
          >
            {/* Main content */}
            <div>
              {path.heroEyebrow && (
                <p className={`text-xs font-semibold uppercase tracking-wider ${colors.text} mb-3`}>
                  {path.heroEyebrow}
                </p>
              )}

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.border} border bg-white/5 ${colors.text} text-sm font-medium mb-6`}>
                <Icon className="w-4 h-4" />
                {path.difficulty} path
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{path.title}</h1>

              <p className="text-xl text-white/60 mb-8">{path.description}</p>

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

      {/* Long intro */}
      {path.longIntro && (
        <section className="max-w-4xl mx-auto px-6 pb-12">
          <div className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed">
            {path.longIntro.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Videos */}
      <section id="videos" className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-white mb-8">Course Videos</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {path.videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i, 4) * 0.1 }}
            >
              <VideoPlayer video={video} color={path.color} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ecosystem grid */}
      {path.ecosystem && path.ecosystem.length > 0 && (
        <section id="ecosystem" className="max-w-6xl mx-auto px-6 pb-16">
          <div className="flex items-center gap-3 mb-8">
            <Layers className={`w-6 h-6 ${colors.text}`} />
            <h2 className="text-2xl font-bold text-white">The Ecosystem</h2>
          </div>
          <p className="text-white/50 mb-8 max-w-2xl">
            Every tool you need to ship — each linked to its official product page.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {path.ecosystem.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${colors.text} bg-white/5`}>
                    {tool.category}
                  </span>
                  {tool.status && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-white/60">
                      {tool.status}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  {tool.name}
                  <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 transition-colors" />
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">{tool.description}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Announcements timeline */}
      {path.announcements && path.announcements.length > 0 && (
        <section id="announcements" className="max-w-4xl mx-auto px-6 pb-16">
          <div className="flex items-center gap-3 mb-8">
            <Rocket className={`w-6 h-6 ${colors.text}`} />
            <h2 className="text-2xl font-bold text-white">What just shipped</h2>
          </div>
          <ol className="relative border-l border-white/10 pl-6 space-y-6">
            {path.announcements.map((item, i) => {
              const tagStyle = announcementTagStyles[item.tag]
              const TagIcon = tagStyle.icon
              return (
                <li key={i} className="relative">
                  <span className={`absolute -left-[31px] top-1 w-3 h-3 rounded-full ${colors.bg}`} />
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-white/40">{item.date}</span>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${tagStyle.bg} ${tagStyle.text}`}>
                      <TagIcon className="w-3 h-3" />
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-white/60 mb-2 leading-relaxed">{item.summary}</p>
                  <a
                    href={item.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-xs ${colors.text} hover:underline`}
                  >
                    Read the source
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              )
            })}
          </ol>
        </section>
      )}

      {/* Experts */}
      {path.experts && path.experts.length > 0 && (
        <section id="experts" className="max-w-6xl mx-auto px-6 pb-16">
          <div className="flex items-center gap-3 mb-8">
            <Users className={`w-6 h-6 ${colors.text}`} />
            <h2 className="text-2xl font-bold text-white">Who to follow</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {path.experts.map((expert) => (
              <a
                key={expert.name}
                href={expert.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-white">{expert.name}</h3>
                  {expert.isOfficial && (
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${colors.text} bg-white/5`}>
                      Official
                    </span>
                  )}
                </div>
                <p className={`text-xs font-medium ${colors.text} mb-2`}>{expert.role}</p>
                <p className="text-sm text-white/60 leading-relaxed mb-3">{expert.why}</p>
                <span className="inline-flex items-center gap-1 text-xs text-white/40 group-hover:text-white/70 transition-colors">
                  Visit channel
                  <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {path.faqs && path.faqs.length > 0 && (
        <section id="faq" className="max-w-4xl mx-auto px-6 pb-16">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className={`w-6 h-6 ${colors.text}`} />
            <h2 className="text-2xl font-bold text-white">FAQ</h2>
          </div>
          <div className="space-y-3">
            {path.faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] open:bg-white/[0.04] transition-colors"
              >
                <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4">
                  <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                  <span
                    className={`flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-white/5 ${colors.text} flex items-center justify-center text-lg leading-none group-open:rotate-45 transition-transform`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div
                  className="px-5 pb-5 text-sm text-white/70 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderFaqAnswer(faq.answer) }}
                />
              </details>
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
                    {guide.includes('blog') ? 'Related Article' : guide.includes('learn') ? 'Learning Portal' : guide.includes('product') ? 'Product' : 'Guide'}
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
            {path.ctaTitle || 'Ready for Hands-On Practice?'}
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            {path.ctaBody || 'These free videos give you the foundation. Our guides take you deeper with practical exercises.'}
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
