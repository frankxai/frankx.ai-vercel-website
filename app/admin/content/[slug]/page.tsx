'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  FileText,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Clock,
  CheckCircle2,
  Tag,
  Sparkles,
  Calendar,
  BookOpen,
  Send,
  ImageIcon,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X,
} from 'lucide-react'

interface MediaAsset {
  type: 'hero' | 'infographic' | 'social' | 'thumbnail' | 'other'
  path: string
  filename: string
  hasThumbnail: boolean
}

interface ArticleDetail {
  slug: string
  title: string
  description: string
  date: string
  lastModified?: string
  author: string
  category: string
  tags: string[]
  keywords?: string[]
  featured: boolean
  image?: string
  readingTime?: string
  wordCount: number
  media: MediaAsset[]
  mediaCount: number
  hasHeroImage: boolean
  hasThumbnail: boolean
}

interface SocialQueueItem {
  id: string
  source: string
  createdAt: string
  status: string
  platforms: Record<string, { content: string | string[]; status: string }>
}

// ─── SEO Score ────────────────────────────────────────────────

interface SeoResult {
  score: number
  checks: { label: string; status: 'pass' | 'warn' | 'fail'; detail: string }[]
}

function calculateSeo(article: ArticleDetail, hasSocial: boolean): SeoResult {
  const checks: SeoResult['checks'] = []

  // Title
  if (!article.title) {
    checks.push({ label: 'Title', status: 'fail', detail: 'Missing title' })
  } else if (article.title.length >= 30 && article.title.length <= 70) {
    checks.push({ label: 'Title', status: 'pass', detail: `${article.title.length} chars (30-70 optimal)` })
  } else {
    checks.push({ label: 'Title', status: 'warn', detail: `${article.title.length} chars (aim for 30-70)` })
  }

  // Description
  if (!article.description) {
    checks.push({ label: 'Description', status: 'fail', detail: 'Missing meta description' })
  } else if (article.description.length >= 120 && article.description.length <= 160) {
    checks.push({ label: 'Description', status: 'pass', detail: `${article.description.length} chars (120-160 optimal)` })
  } else {
    checks.push({ label: 'Description', status: 'warn', detail: `${article.description.length} chars (aim for 120-160)` })
  }

  // Hero image
  if (article.hasHeroImage) {
    checks.push({ label: 'Hero image', status: 'pass', detail: 'Present' })
  } else {
    checks.push({ label: 'Hero image', status: 'fail', detail: 'Missing — hurts CTR and social sharing' })
  }

  // Word count
  if (article.wordCount >= 2000) {
    checks.push({ label: 'Content depth', status: 'pass', detail: `${article.wordCount.toLocaleString()} words (deep)` })
  } else if (article.wordCount >= 1000) {
    checks.push({ label: 'Content depth', status: 'pass', detail: `${article.wordCount.toLocaleString()} words` })
  } else {
    checks.push({ label: 'Content depth', status: 'warn', detail: `${article.wordCount.toLocaleString()} words (aim for 1000+)` })
  }

  // Tags
  if (article.tags.length >= 3) {
    checks.push({ label: 'Tags', status: 'pass', detail: `${article.tags.length} tags` })
  } else if (article.tags.length > 0) {
    checks.push({ label: 'Tags', status: 'warn', detail: `${article.tags.length} tag(s) — aim for 3+` })
  } else {
    checks.push({ label: 'Tags', status: 'fail', detail: 'No tags set' })
  }

  // Keywords
  if (article.keywords && article.keywords.length > 0) {
    checks.push({ label: 'Keywords', status: 'pass', detail: `${article.keywords.length} keywords` })
  } else {
    checks.push({ label: 'Keywords', status: 'warn', detail: 'No explicit keywords set' })
  }

  // Social coverage
  if (hasSocial) {
    checks.push({ label: 'Social content', status: 'pass', detail: 'Generated' })
  } else {
    checks.push({ label: 'Social content', status: 'warn', detail: 'Not yet generated' })
  }

  // Date
  if (article.date) {
    checks.push({ label: 'Publish date', status: 'pass', detail: article.date })
  } else {
    checks.push({ label: 'Publish date', status: 'fail', detail: 'Missing date' })
  }

  const score = Math.round(
    (checks.filter(c => c.status === 'pass').length / checks.length) * 100
  )

  return { score, checks }
}

function SeoScoreCard({ article, hasSocial }: { article: ArticleDetail; hasSocial: boolean }) {
  const seo = calculateSeo(article, hasSocial)

  const scoreColor = seo.score >= 80 ? 'text-emerald-400'
    : seo.score >= 60 ? 'text-cyan-400'
    : seo.score >= 40 ? 'text-amber-400'
    : 'text-red-400'

  const ringColor = seo.score >= 80 ? 'border-emerald-500/30'
    : seo.score >= 60 ? 'border-cyan-500/30'
    : seo.score >= 40 ? 'border-amber-500/30'
    : 'border-red-500/30'

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]">
        <TrendingUp className="w-4 h-4 text-cyan-400" />
        <span className="text-sm font-medium">SEO Score</span>
      </div>
      <div className="p-5">
        <div className="flex items-start gap-6">
          {/* Score ring */}
          <div className={`w-20 h-20 rounded-full border-4 ${ringColor} flex items-center justify-center flex-shrink-0`}>
            <span className={`text-2xl font-bold ${scoreColor}`}>{seo.score}</span>
          </div>

          {/* Checks */}
          <div className="flex-1 space-y-2">
            {seo.checks.map(check => (
              <div key={check.label} className="flex items-center gap-2 text-xs">
                {check.status === 'pass' ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                ) : check.status === 'warn' ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                )}
                <span className="text-white/60 w-24 flex-shrink-0">{check.label}</span>
                <span className="text-white/40">{check.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContentDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<ArticleDetail | null>(null)
  const [social, setSocial] = useState<SocialQueueItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    loadDetail()
  }, [slug])

  const loadDetail = async () => {
    setLoading(true)
    try {
      // Load from inventory API and find by slug
      const res = await fetch('/api/admin/content/inventory')
      if (res.ok) {
        const data = await res.json()
        const item = data.content?.find((c: { slug: string }) => c.slug === slug)
        if (item) {
          setArticle(item)
        }
      }
      // Load social queue to find matching entry
      const socialRes = await fetch('/api/admin/content/social')
      if (socialRes.ok) {
        const socialData = await socialRes.json()
        const match = socialData.queue?.find((q: SocialQueueItem) => q.source === slug)
        if (match) setSocial(match)
      }
    } catch (err) {
      console.error('Failed to load content detail:', err)
    } finally {
      setLoading(false)
    }
  }

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(label)
      setTimeout(() => setCopied(null), 2000)
    } catch {}
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/50">
          <div className="w-5 h-5 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
          Loading...
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex flex-col items-center justify-center gap-4">
        <p className="text-white/50">Article not found: {slug}</p>
        <Link href="/admin/content" className="text-cyan-400 hover:text-cyan-300 text-sm">
          Back to Command Center
        </Link>
      </div>
    )
  }

  const platformConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; name: string }> = {
    twitter: { icon: Twitter, color: 'text-sky-400', name: 'X / Twitter' },
    linkedin: { icon: Linkedin, color: 'text-blue-400', name: 'LinkedIn' },
    newsletter: { icon: Mail, color: 'text-emerald-400', name: 'Newsletter' },
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0e1a]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/content" className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold truncate">{article.title}</h1>
              <p className="text-xs text-white/40">{article.slug}</p>
            </div>
            <Link
              href={`/blog/${slug}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-sm text-white/60 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Live
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-6 space-y-8">
        {/* Article Metadata */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="flex items-start gap-6">
            {article.image && (
              <div className="w-40 h-24 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                <img src={article.image} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm text-white/60 leading-relaxed">{article.description}</p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-white/40">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date || 'No date'}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  {article.readingTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  {article.wordCount.toLocaleString()} words
                </span>
                {article.featured && (
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured
                  </span>
                )}
              </div>
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {article.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.05] text-xs text-white/40">
                      <Tag className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ACOS Quick Action */}
        <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/[0.03] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Send className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white/70">Generate social content for this article</span>
            </div>
            <button
              onClick={() => copyText(`/generate-social ${slug}`, 'command')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 hover:bg-cyan-500/20 transition-colors"
            >
              <code>/generate-social {slug}</code>
              {copied === 'command' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* SEO Score Card */}
        <SeoScoreCard article={article} hasSocial={!!social} />

        {/* Media Gallery */}
        {article.media && article.media.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-purple-400" />
              Media Assets
              <span className="text-xs text-white/30 font-normal">{article.mediaCount} file{article.mediaCount > 1 ? 's' : ''}</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {article.media.map((asset) => (
                <button
                  key={asset.filename}
                  onClick={() => setLightbox(asset.path)}
                  className="group relative rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-purple-500/30 transition-colors aspect-video"
                >
                  <img
                    src={asset.path}
                    alt={asset.filename}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white truncate">{asset.filename}</p>
                    <span className={`inline-block mt-0.5 text-[10px] rounded-full px-1.5 py-0.5 ${
                      asset.type === 'hero' ? 'bg-cyan-500/30 text-cyan-300' :
                      asset.type === 'infographic' ? 'bg-purple-500/30 text-purple-300' :
                      asset.type === 'social' ? 'bg-sky-500/30 text-sky-300' :
                      'bg-white/10 text-white/50'
                    }`}>
                      {asset.type}
                    </span>
                    {asset.hasThumbnail && (
                      <span className="inline-block mt-0.5 ml-1 text-[10px] rounded-full px-1.5 py-0.5 bg-emerald-500/30 text-emerald-300">thumb</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
            <ImageIcon className="w-8 h-8 text-white/15 mx-auto mb-3" />
            <p className="text-sm text-white/40 mb-2">No media assets found</p>
            <p className="text-xs text-white/25">
              Run <code className="text-purple-400/60">/infogenius {slug}</code> to generate images
            </p>
          </div>
        )}

        {/* Lightbox */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 p-2 rounded-lg bg-white/10 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightbox}
              alt=""
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Social Content */}
        {social ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Send className="w-4 h-4 text-purple-400" />
              Social Content
              <span className="text-xs text-white/30 font-normal">Generated {new Date(social.createdAt).toLocaleDateString()}</span>
            </h2>

            {Object.entries(social.platforms).map(([platform, data]) => {
              const config = platformConfig[platform] || { icon: Send, color: 'text-white/50', name: platform }
              const Icon = config.icon
              const contentText = Array.isArray(data.content)
                ? data.content.join('\n\n---\n\n')
                : data.content

              return (
                <div key={platform} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${config.color}`} />
                      <span className="text-sm font-medium">{config.name}</span>
                      {data.status === 'published' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span className="text-xs text-white/30">{data.status}</span>
                    </div>
                    <button
                      onClick={() => copyText(typeof data.content === 'string' ? data.content : data.content.join('\n\n'), platform)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] text-xs text-white/50 hover:text-white transition-colors"
                    >
                      {copied === platform ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copy
                    </button>
                  </div>
                  <div className="px-5 py-4">
                    {Array.isArray(data.content) ? (
                      <div className="space-y-3">
                        {data.content.map((tweet: string, i: number) => {
                          const charCount = tweet.length
                          const isOverLimit = platform === 'twitter' && charCount > 280
                          const isNearLimit = platform === 'twitter' && charCount > 250
                          return (
                            <div key={i} className={`flex gap-3 p-2 rounded-lg ${isOverLimit ? 'bg-red-500/5 border border-red-500/10' : ''}`}>
                              <span className="text-xs text-white/20 font-mono w-5 flex-shrink-0 pt-0.5">{i + 1}.</span>
                              <div className="flex-1">
                                <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{tweet}</p>
                                <div className="flex items-center justify-between mt-1.5">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); copyText(tweet, `${platform}-${i}`) }}
                                    className="text-[10px] text-white/25 hover:text-white/50 transition-colors"
                                  >
                                    {copied === `${platform}-${i}` ? 'Copied' : 'Copy tweet'}
                                  </button>
                                  <span className={`text-[10px] font-mono ${
                                    isOverLimit ? 'text-red-400' : isNearLimit ? 'text-amber-400' : 'text-white/25'
                                  }`}>
                                    {charCount}{platform === 'twitter' ? '/280' : ''} chars
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{data.content}</p>
                        <div className="flex items-center justify-end mt-2">
                          <span className={`text-[10px] font-mono ${
                            platform === 'linkedin' && (data.content as string).length > 3000 ? 'text-red-400' : 'text-white/25'
                          }`}>
                            {(data.content as string).length}{platform === 'linkedin' ? '/3000' : ''} chars
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
            <Send className="w-8 h-8 text-white/15 mx-auto mb-3" />
            <p className="text-sm text-white/40 mb-2">No social content generated yet</p>
            <p className="text-xs text-white/25">
              Run <code className="text-cyan-400/60">/generate-social {slug}</code> in Claude Code
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
