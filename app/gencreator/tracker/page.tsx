'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Script from 'next/script'
import {
  Flame,
  Plus,
  Calendar,
  Trophy,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Zap,
  Layers,
  Rocket,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'

interface ShipEntry {
  id: string
  date: string // YYYY-MM-DD
  title: string
  tier: 1 | 2 | 3
  category: string
}

const STORAGE_KEY = 'gencreator-ships'
const CATEGORIES = [
  'Content',
  'Code',
  'Design',
  'Music',
  'Product',
  'Community',
  'Learning',
  'Other',
]
const TIER_INFO = [
  { tier: 1, label: 'Full Ship', desc: '2-4 hours', icon: Rocket, color: 'emerald' },
  { tier: 2, label: 'Quick Ship', desc: '30-60 min', icon: Layers, color: 'cyan' },
  { tier: 3, label: 'Micro Ship', desc: '15-30 min', icon: Zap, color: 'amber' },
] as const

function getToday(): string {
  return new Date().toISOString().slice(0, 10)
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function calculateStreak(entries: ShipEntry[]): number {
  if (entries.length === 0) return 0
  const uniqueDates = [...new Set(entries.map((e) => e.date))].sort().reverse()
  const today = getToday()
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0

  let streak = 1
  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1])
    const curr = new Date(uniqueDates[i])
    const diff = (prev.getTime() - curr.getTime()) / 86400000
    if (Math.round(diff) === 1) {
      streak++
    } else {
      break
    }
  }
  return streak
}

function calculateLongestStreak(entries: ShipEntry[]): number {
  if (entries.length === 0) return 0
  const uniqueDates = [...new Set(entries.map((e) => e.date))].sort()
  let longest = 1
  let current = 1
  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1])
    const curr = new Date(uniqueDates[i])
    const diff = (curr.getTime() - prev.getTime()) / 86400000
    if (Math.round(diff) === 1) {
      current++
      longest = Math.max(longest, current)
    } else {
      current = 1
    }
  }
  return longest
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'GenCreator Shipping Tracker',
  description: 'Track your daily shipping habit. Log what you created, build streaks.',
  url: 'https://frankx.ai/gencreator/tracker',
  applicationCategory: 'ProductivityApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function TrackerPage() {
  const [entries, setEntries] = useState<ShipEntry[]>([])
  const [mounted, setMounted] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [tier, setTier] = useState<1 | 2 | 3>(2)
  const [category, setCategory] = useState('Content')
  const [calMonth, setCalMonth] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setEntries(JSON.parse(stored))
    } catch {
      // empty or corrupt storage
    }
    setMounted(true)
  }, [])

  const saveEntries = useCallback(
    (next: ShipEntry[]) => {
      setEntries(next)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // storage full
      }
    },
    []
  )

  const addShip = useCallback(() => {
    if (!title.trim()) return
    const entry: ShipEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: getToday(),
      title: title.trim(),
      tier,
      category,
    }
    saveEntries([entry, ...entries])
    setTitle('')
    setShowForm(false)
  }, [title, tier, category, entries, saveEntries])

  const removeShip = useCallback(
    (id: string) => {
      saveEntries(entries.filter((e) => e.id !== id))
    },
    [entries, saveEntries]
  )

  const streak = useMemo(() => calculateStreak(entries), [entries])
  const longestStreak = useMemo(() => calculateLongestStreak(entries), [entries])
  const todaysShips = useMemo(
    () => entries.filter((e) => e.date === getToday()),
    [entries]
  )
  const totalShips = entries.length
  const shippedToday = todaysShips.length > 0

  // Calendar data
  const shipDates = useMemo(() => {
    const map = new Map<string, number>()
    entries.forEach((e) => {
      map.set(e.date, (map.get(e.date) || 0) + 1)
    })
    return map
  }, [entries])

  const calendarDays = useMemo(() => {
    const { year, month } = calMonth
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const days: (null | { day: number; count: number })[] = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      days.push({ day: d, count: shipDates.get(dateStr) || 0 })
    }
    return days
  }, [calMonth, shipDates])

  const monthLabel = new Date(calMonth.year, calMonth.month).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const navigateMonth = (dir: -1 | 1) => {
    setCalMonth((prev) => {
      let month = prev.month + dir
      let year = prev.year
      if (month < 0) {
        month = 11
        year--
      }
      if (month > 11) {
        month = 0
        year++
      }
      return { year, month }
    })
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
        <GenCreatorNav />
        <div className="flex items-center justify-center py-40">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-400/30 border-t-emerald-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-[#02030b] to-amber-950/15" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-amber-200">
            <Flame className="h-4 w-4" />
            Shipping Tracker
          </div>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-white via-amber-100 to-orange-100 bg-clip-text text-transparent">
              Ship Daily. Compound Forever.
            </span>
          </h1>
          <p className="mt-4 text-base text-white/50 sm:text-lg">
            Log your daily creative output. Build streaks. Watch the compound effect unfold.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-6">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Flame className={cn('h-5 w-5', streak > 0 ? 'text-orange-400' : 'text-white/20')} />
                <span className="text-2xl font-bold text-white">{streak}</span>
              </div>
              <p className="mt-1 text-xs text-white/40">Current Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Trophy className="h-5 w-5 text-amber-400" />
                <span className="text-2xl font-bold text-white">{longestStreak}</span>
              </div>
              <p className="mt-1 text-xs text-white/40">Best Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <span className="text-2xl font-bold text-white">{totalShips}</span>
              </div>
              <p className="mt-1 text-xs text-white/40">Total Ships</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Calendar className="h-5 w-5 text-cyan-400" />
                <span className="text-2xl font-bold text-white">{todaysShips.length}</span>
              </div>
              <p className="mt-1 text-xs text-white/40">Today</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Log + History */}
          <div className="lg:col-span-3">
            {/* Quick Log */}
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className={cn(
                  'mb-8 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-6 text-sm font-medium transition-all',
                  shippedToday
                    ? 'border-emerald-400/20 text-emerald-300/60 hover:border-emerald-400/40 hover:text-emerald-300'
                    : 'border-amber-400/30 text-amber-300 hover:border-amber-400/50 hover:bg-amber-500/5'
                )}
              >
                <Plus className="h-5 w-5" />
                {shippedToday ? 'Log Another Ship' : 'Log Your First Ship Today'}
              </button>
            ) : (
              <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <h3 className="mb-4 text-sm font-semibold text-white">What did you ship?</h3>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addShip()}
                  placeholder="Wrote a blog post about..."
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/80 placeholder:text-white/25 focus:border-emerald-400/40 focus:outline-none focus:ring-1 focus:ring-emerald-400/20"
                  autoFocus
                />

                {/* Tier Selection */}
                <div className="mt-4 flex gap-2">
                  {TIER_INFO.map((t) => (
                    <button
                      key={t.tier}
                      onClick={() => setTier(t.tier as 1 | 2 | 3)}
                      className={cn(
                        'flex flex-1 items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all',
                        tier === t.tier
                          ? `border-${t.color}-400/30 bg-${t.color}-500/10 text-${t.color}-300`
                          : 'border-white/[0.08] text-white/40 hover:border-white/[0.15]'
                      )}
                    >
                      <t.icon className="h-3.5 w-3.5" />
                      <div className="text-left">
                        <div>{t.label}</div>
                        <div className="text-[10px] opacity-60">{t.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Category */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={cn(
                        'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                        category === cat
                          ? 'bg-white/10 text-white'
                          : 'text-white/30 hover:text-white/60'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={addShip}
                    disabled={!title.trim()}
                    className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 disabled:opacity-30"
                  >
                    Log Ship
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false)
                      setTitle('')
                    }}
                    className="rounded-xl px-4 py-2.5 text-sm text-white/40 hover:text-white/60"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Today's Ships */}
            {todaysShips.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  Today
                </h3>
                <div className="space-y-2">
                  {todaysShips.map((entry) => {
                    const tierInfo = TIER_INFO.find((t) => t.tier === entry.tier)!
                    return (
                      <div
                        key={entry.id}
                        className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/[0.1]"
                      >
                        <tierInfo.icon className={`h-4 w-4 text-${tierInfo.color}-400`} />
                        <span className="flex-1 text-sm text-white/80">{entry.title}</span>
                        <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] text-white/30">
                          {entry.category}
                        </span>
                        <button
                          onClick={() => removeShip(entry.id)}
                          className="text-white/10 transition-colors hover:text-red-400 group-hover:text-white/20"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Recent History */}
            {entries.length > todaysShips.length && (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-white/60">Recent</h3>
                <div className="space-y-2">
                  {entries
                    .filter((e) => e.date !== getToday())
                    .slice(0, 20)
                    .map((entry) => {
                      const tierInfo = TIER_INFO.find((t) => t.tier === entry.tier)!
                      return (
                        <div
                          key={entry.id}
                          className="group flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-2.5 transition-colors hover:border-white/[0.08]"
                        >
                          <tierInfo.icon className="h-3.5 w-3.5 text-white/20" />
                          <span className="flex-1 text-sm text-white/50">{entry.title}</span>
                          <span className="text-[10px] text-white/20">{entry.date}</span>
                          <button
                            onClick={() => removeShip(entry.id)}
                            className="text-white/5 transition-colors hover:text-red-400 group-hover:text-white/15"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      )
                    })}
                </div>
              </div>
            )}

            {entries.length === 0 && (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] py-16 text-center">
                <Flame className="mx-auto h-10 w-10 text-white/10" />
                <p className="mt-4 text-sm text-white/30">
                  Your shipping journey starts here.
                </p>
                <p className="mt-1 text-xs text-white/20">
                  Log your first ship to start building your streak.
                </p>
              </div>
            )}
          </div>

          {/* Right: Calendar */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <div className="mb-4 flex items-center justify-between">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="rounded-lg p-1 text-white/40 hover:bg-white/[0.05] hover:text-white/70"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <h3 className="text-sm font-semibold text-white/70">{monthLabel}</h3>
                <button
                  onClick={() => navigateMonth(1)}
                  className="rounded-lg p-1 text-white/40 hover:bg-white/[0.05] hover:text-white/70"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Day headers */}
              <div className="mb-2 grid grid-cols-7 gap-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <div key={`${d}-${i}`} className="text-center text-[10px] text-white/25">
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, idx) =>
                  day === null ? (
                    <div key={`empty-${idx}`} />
                  ) : (
                    <div
                      key={`day-${day.day}`}
                      className={cn(
                        'flex aspect-square items-center justify-center rounded-lg text-xs transition-colors',
                        day.count > 0
                          ? day.count >= 3
                            ? 'bg-emerald-500/30 text-emerald-200 font-bold'
                            : day.count >= 2
                              ? 'bg-emerald-500/20 text-emerald-300/80 font-semibold'
                              : 'bg-emerald-500/10 text-emerald-400/70'
                          : 'text-white/20'
                      )}
                      title={day.count > 0 ? `${day.count} ship${day.count > 1 ? 's' : ''}` : undefined}
                    >
                      {day.day}
                    </div>
                  )
                )}
              </div>

              {/* Legend */}
              <div className="mt-4 flex items-center justify-center gap-3 text-[10px] text-white/25">
                <span className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded bg-white/5" /> 0
                </span>
                <span className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded bg-emerald-500/10" /> 1
                </span>
                <span className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded bg-emerald-500/20" /> 2
                </span>
                <span className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded bg-emerald-500/30" /> 3+
                </span>
              </div>
            </div>

            {/* 3-Tier System Reference */}
            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                3-Tier System
              </h3>
              <div className="space-y-3">
                {TIER_INFO.map((t) => (
                  <div key={t.tier} className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${t.color}-500/10`}>
                      <t.icon className={`h-4 w-4 text-${t.color}-400`} />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white/70">{t.label}</div>
                      <div className="text-[10px] text-white/30">{t.desc} of focused work</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[10px] leading-relaxed text-white/25">
                The rule: at least a Tier 3 every day. Energy determines the tier.
                Consistency determines the outcome.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Script id="tracker-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
