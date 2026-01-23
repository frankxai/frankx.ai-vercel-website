'use client'

import { useState, useEffect } from 'react'
import {
  Mail,
  Users,
  Send,
  TrendingUp,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

interface NewsletterStats {
  totalContacts: number
  activeContacts: number
  unsubscribed: number
  recentSignups: number
}

interface Contact {
  email: string
  firstName?: string
  lastName?: string
  unsubscribed?: boolean
  createdAt?: string
}

export default function NewsletterDashboard() {
  const [stats, setStats] = useState<NewsletterStats | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Broadcast form state
  const [broadcastSubject, setBroadcastSubject] = useState('')
  const [broadcastContent, setBroadcastContent] = useState('')
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null)

  const fetchData = async () => {
    if (!apiKey) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/newsletter/stats', {
        headers: { 'x-api-key': apiKey },
      })

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      const data = await res.json()
      setStats(data.stats)
      setContacts(data.contacts || [])
      setIsAuthenticated(true)
    } catch (err) {
      setError(String(err))
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const sendBroadcast = async () => {
    if (!broadcastSubject || !broadcastContent) {
      setSendResult({ success: false, message: 'Subject and content are required' })
      return
    }

    setSending(true)
    setSendResult(null)

    try {
      const res = await fetch('/api/newsletter/broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          subject: broadcastSubject,
          title: broadcastSubject,
          preheader: broadcastContent.substring(0, 100),
          sections: [
            {
              content: broadcastContent.replace(/\n/g, '<br>'),
            },
          ],
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setSendResult({ success: true, message: 'Newsletter sent successfully!' })
        setBroadcastSubject('')
        setBroadcastContent('')
      } else {
        setSendResult({ success: false, message: data.error || 'Failed to send' })
      }
    } catch (err) {
      setSendResult({ success: false, message: String(err) })
    } finally {
      setSending(false)
    }
  }

  const exportContacts = () => {
    const csv = [
      ['Email', 'First Name', 'Last Name', 'Status', 'Joined'].join(','),
      ...contacts.map((c) =>
        [
          c.email,
          c.firstName || '',
          c.lastName || '',
          c.unsubscribed ? 'Unsubscribed' : 'Active',
          c.createdAt || '',
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-contacts-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030712] text-white p-8">
        <div className="max-w-md mx-auto mt-20">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <Mail className="h-12 w-12 text-emerald-400 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-center mb-6">Newsletter Dashboard</h1>
            <p className="text-white/60 text-center mb-6">
              Enter your API key to access the newsletter dashboard.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API Key"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-emerald-500/50 mb-4"
            />
            <button
              onClick={fetchData}
              disabled={!apiKey || loading}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold text-white disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Access Dashboard'}
            </button>
            {error && (
              <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Newsletter Dashboard</h1>
            <p className="text-white/60">Manage your Resend Audiences subscribers</p>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Grid */}
        {stats && (
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                  <Users className="h-5 w-5 text-emerald-400" />
                </div>
                <span className="text-sm text-white/60">Active Subscribers</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats.activeContacts}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10">
                  <TrendingUp className="h-5 w-5 text-cyan-400" />
                </div>
                <span className="text-sm text-white/60">This Week</span>
              </div>
              <p className="text-3xl font-bold text-white">+{stats.recentSignups}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                  <Mail className="h-5 w-5 text-amber-400" />
                </div>
                <span className="text-sm text-white/60">Total Contacts</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats.totalContacts}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <span className="text-sm text-white/60">Unsubscribed</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats.unsubscribed}</p>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Send Newsletter */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-center gap-3 mb-6">
              <Send className="h-5 w-5 text-emerald-400" />
              <h2 className="text-lg font-semibold">Send Newsletter</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Subject</label>
                <input
                  type="text"
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                  placeholder="Weekly AI Insights from FrankX"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-emerald-500/50"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Content</label>
                <textarea
                  value={broadcastContent}
                  onChange={(e) => setBroadcastContent(e.target.value)}
                  placeholder="Write your newsletter content here..."
                  rows={8}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-emerald-500/50 resize-none"
                />
              </div>

              <button
                onClick={sendBroadcast}
                disabled={sending || !broadcastSubject || !broadcastContent}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send to {stats?.activeContacts || 0} subscribers
                  </>
                )}
              </button>

              {sendResult && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg ${
                    sendResult.success
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  {sendResult.success ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {sendResult.message}
                </div>
              )}
            </div>
          </div>

          {/* Subscribers List */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-cyan-400" />
                <h2 className="text-lg font-semibold">Subscribers</h2>
              </div>
              <button
                onClick={exportContacts}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {contacts.filter((c) => !c.unsubscribed).map((contact) => (
                <div
                  key={contact.email}
                  className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02]"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{contact.email}</p>
                    {(contact.firstName || contact.lastName) && (
                      <p className="text-xs text-white/50">
                        {[contact.firstName, contact.lastName].filter(Boolean).join(' ')}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-white/40">
                    {contact.createdAt
                      ? new Date(contact.createdAt).toLocaleDateString()
                      : 'Unknown'}
                  </span>
                </div>
              ))}

              {contacts.filter((c) => !c.unsubscribed).length === 0 && (
                <p className="text-center text-white/40 py-8">No subscribers yet</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
