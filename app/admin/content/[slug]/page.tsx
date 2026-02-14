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
} from 'lucide-react'

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
}

interface SocialQueueItem {
  id: string
  source: string
  createdAt: string
  status: string
  platforms: Record<string, { content: string | string[]; status: string }>
}

export default function ContentDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<ArticleDetail | null>(null)
  const [social, setSocial] = useState<SocialQueueItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

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
                        {data.content.map((tweet: string, i: number) => (
                          <div key={i} className="flex gap-3">
                            <span className="text-xs text-white/20 font-mono w-5 flex-shrink-0 pt-0.5">{i + 1}.</span>
                            <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{tweet}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{data.content}</p>
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
