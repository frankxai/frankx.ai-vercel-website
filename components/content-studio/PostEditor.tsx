'use client'

import { useState, useEffect } from 'react'
import { X, Plus, Calendar as CalendarIcon, Send, Loader2 } from 'lucide-react'
import type { Post, Account, ContentType } from '@/types/content-studio'

interface PostEditorProps {
  isOpen: boolean
  onClose: () => void
  onSave: (post: Partial<Post>) => Promise<void>
  accounts: Account[]
  existingPost?: Post | null
}

export default function PostEditor({ isOpen, onClose, onSave, accounts, existingPost }: PostEditorProps) {
  const [selectedAccountId, setSelectedAccountId] = useState<string>('')
  const [contentType, setContentType] = useState<ContentType>('text')
  const [body, setBody] = useState('')
  const [hashtags, setHashtags] = useState<string[]>([])
  const [hashtagInput, setHashtagInput] = useState('')
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')
  const [autoPost, setAutoPost] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const selectedAccount = accounts.find(a => a.id === selectedAccountId)

  useEffect(() => {
    if (existingPost) {
      setSelectedAccountId(existingPost.accountId)
      setContentType(existingPost.contentType)
      setBody(existingPost.body)
      setHashtags(existingPost.hashtags || [])
      if (existingPost.schedule) {
        const date = new Date(existingPost.schedule.publishAt)
        setScheduleDate(date.toISOString().split('T')[0])
        setScheduleTime(date.toTimeString().slice(0, 5))
        setAutoPost(existingPost.schedule.autoPost)
      }
    } else {
      setSelectedAccountId(accounts.find(a => a.active)?.id || '')
      setContentType('text')
      setBody('')
      setHashtags([])
      setScheduleDate('')
      setScheduleTime('')
      setAutoPost(false)
    }
  }, [existingPost, accounts, isOpen])

  const addHashtag = () => {
    if (hashtagInput.trim()) {
      const tag = hashtagInput.trim().replace(/^#/, '')
      if (!hashtags.includes(tag)) {
        setHashtags([...hashtags, tag])
      }
      setHashtagInput('')
    }
  }

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAccountId || !body.trim()) return

    setIsSaving(true)
    try {
      const postData: Partial<Post> = {
        accountId: selectedAccountId,
        platform: selectedAccount!.platform,
        contentType,
        status: 'draft',
        body: body.trim(),
        hashtags
      }

      if (scheduleDate && scheduleTime) {
        const publishAt = new Date(`${scheduleDate}T${scheduleTime}`)
        postData.schedule = {
          publishAt: publishAt.toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          autoPost
        }
        postData.status = 'scheduled'
      }

      await onSave(postData)
      onClose()
    } catch (error) {
      console.error('[PostEditor] Save error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0f1a] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0a0f1a]/95 backdrop-blur-sm px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            {existingPost ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Account</label>
            <select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              required
            >
              <option value="">Select account...</option>
              {accounts.filter(a => a.active).map(account => (
                <option key={account.id} value={account.id}>
                  {account.name} • {account.platform}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Content Type</label>
            <div className="flex gap-2">
              {(['text', 'image', 'video', 'thread'] as ContentType[]).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setContentType(type)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    contentType === type
                      ? 'bg-emerald-500 text-white'
                      : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Content</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What do you want to share?"
              rows={8}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
              required
            />
            <div className="mt-2 flex justify-between text-xs text-white/50">
              <span>{body.length} characters</span>
              {selectedAccount?.platform === 'twitter' && body.length > 280 && (
                <span className="text-red-400">Twitter limit: 280 characters</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Hashtags</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
                placeholder="Add hashtag..."
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/40 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                type="button"
                onClick={addHashtag}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white/70 hover:bg-white/10 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {hashtags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeHashtag(tag)}
                      className="text-white/40 hover:text-white/70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-6">
            <label className="block text-sm font-medium text-white/80 mb-3">Schedule (Optional)</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            {scheduleDate && scheduleTime && (
              <label className="mt-3 flex items-center gap-2 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={autoPost}
                  onChange={(e) => setAutoPost(e.target.checked)}
                  className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                Automatically publish at scheduled time
              </label>
            )}
          </div>

          <div className="flex gap-3 border-t border-white/10 pt-6">
            <button
              type="submit"
              disabled={isSaving || !selectedAccountId || !body.trim()}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {scheduleDate && scheduleTime ? 'Schedule Post' : 'Save Draft'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
