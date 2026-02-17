'use client'

import { useState } from 'react'
import { Plus, Calendar, CheckCircle2, Clock, XCircle } from 'lucide-react'
import PostEditor from '@/components/content-studio/PostEditor'
import type { Post, Account } from '@/types/content-studio'

interface ContentStudioClientProps {
  initialPosts: Post[]
  accounts: Account[]
  stats: {
    total: number
    draft: number
    scheduled: number
    published: number
    failed: number
  }
}

export default function ContentStudioClient({ initialPosts, accounts, stats: initialStats }: ContentStudioClientProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [stats, setStats] = useState(initialStats)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const handleSavePost = async (postData: Partial<Post>) => {
    try {
      const response = await fetch('/api/content-studio/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })

      if (!response.ok) throw new Error('Failed to save post')

      const { post: newPost } = await response.json()
      setPosts([newPost, ...posts])
      
      // Update stats
      const newStats = { ...stats, total: stats.total + 1 }
      if (newPost.status === 'draft') newStats.draft++
      else if (newPost.status === 'scheduled') newStats.scheduled++
      setStats(newStats)
    } catch (error) {
      console.error('[ContentStudioClient] Failed to save post:', error)
      alert('Failed to save post. Please try again.')
    }
  }

  return (
    <>
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
          <button
            onClick={() => setIsEditorOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"
          >
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

      {/* Post Editor Modal */}
      <PostEditor
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false)
          setEditingPost(null)
        }}
        onSave={handleSavePost}
        accounts={accounts}
        existingPost={editingPost}
      />
    </>
  )
}
