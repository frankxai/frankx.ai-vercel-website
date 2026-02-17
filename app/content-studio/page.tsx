import { getAllPosts, getAllAccounts, getPostStats } from '@/lib/content-studio/posts'
import { Plus, Calendar, CheckCircle2, Clock, XCircle } from 'lucide-react'
import Link from 'next/link'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Content Studio - Multi-Platform Social Media Management',
  description: 'Create, schedule, and publish content across LinkedIn, Twitter, and Instagram from one unified dashboard.',
  path: '/content-studio',
})

export default function ContentStudioPage() {
  const posts = getAllPosts()
  const accounts = getAllAccounts()
  const stats = getPostStats()

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative pt-28 pb-24">
        <div className="px-6">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight">
                Content Studio
              </h1>
              <p className="mt-4 text-lg text-white/60 max-w-3xl">
                Create, schedule, and publish content across all platforms from one unified dashboard.
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                    <Clock className="h-5 w-5 text-white/60" />
                  </div>
                  <span className="text-2xl font-bold text-white">{stats.draft}</span>
                </div>
                <span className="text-sm text-white/50">Drafts</span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                    <Calendar className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">{stats.scheduled}</span>
                </div>
                <span className="text-sm text-white/50">Scheduled</span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">{stats.published}</span>
                </div>
                <span className="text-sm text-white/50">Published</span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                    <XCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">{stats.failed}</span>
                </div>
                <span className="text-sm text-white/50">Failed</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors">
                  <Plus className="h-4 w-4" />
                  New Post
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 transition-colors">
                  <Calendar className="h-4 w-4" />
                  Calendar View
                </button>
              </div>

              <div className="text-sm text-white/50">
                {accounts.filter(a => a.active).length} active accounts
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center">
                  <p className="text-lg text-white/60">No posts yet</p>
                  <p className="mt-2 text-sm text-white/40">Create your first post to get started</p>
                </div>
              ) : (
                posts.map((post) => {
                  const account = accounts.find(a => a.id === post.accountId)

                  return (
                    <div
                      key={post.id}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                              {account?.name || 'Unknown Account'}
                            </span>
                            <span className="text-xs text-white/30">•</span>
                            <span className="text-xs text-white/50">{post.platform}</span>
                            <span className="text-xs text-white/30">•</span>
                            <span className={`text-xs font-medium ${
                              post.status === 'published' ? 'text-cyan-400' :
                              post.status === 'scheduled' ? 'text-emerald-400' :
                              post.status === 'failed' ? 'text-red-400' :
                              'text-white/50'
                            }`}>
                              {post.status}
                            </span>
                          </div>

                          <p className="text-base text-white/80 leading-relaxed line-clamp-3">
                            {post.body}
                          </p>

                          {post.hashtags && post.hashtags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {post.hashtags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-white/40">
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                          {post.schedule && (
                            <p className="mt-1 text-xs text-emerald-400">
                              {new Date(post.schedule.publishAt).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
