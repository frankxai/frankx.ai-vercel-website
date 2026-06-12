'use client'

// localStorage streak + progress for /dare and /quest.
// Pattern follows app/rituals/[ritual]/page.tsx (yesterday-check increment,
// idempotent same-day completion, SSR guards) — kept in one storage key so
// the quest map and the daily page read the same state. No backend, no accounts.

import { useCallback, useEffect, useState } from 'react'
import { dateKey, questDayNumber } from '@/lib/daily-dare'

const STORAGE_KEY = 'frankx-dare-quest'
const PART_COUNT = 4

interface DareQuestState {
  completions: Record<string, number[]> // dateKey → completed part indexes
  completedDays: string[] // dateKeys where all parts were done
  streak: number
  bestStreak: number
  lastCompleted: string | null // dateKey
}

const emptyState: DareQuestState = {
  completions: {},
  completedDays: [],
  streak: 0,
  bestStreak: 0,
  lastCompleted: null,
}

function loadState(): DareQuestState {
  if (typeof window === 'undefined') return emptyState
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return emptyState
    return { ...emptyState, ...(JSON.parse(stored) as Partial<DareQuestState>) }
  } catch {
    return emptyState
  }
}

function saveState(state: DareQuestState) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function yesterdayKey(today: string): string {
  return dateKey(new Date(Date.parse(today) - 86_400_000))
}

export function useDareStreak() {
  const [mounted, setMounted] = useState(false)
  const [state, setState] = useState<DareQuestState>(emptyState)
  const today = dateKey()

  useEffect(() => {
    setState(loadState())
    setMounted(true)
  }, [])

  const togglePart = useCallback(
    (index: number) => {
      setState((prev) => {
        const current = prev.completions[today] ?? []
        const parts = current.includes(index)
          ? current.filter((i) => i !== index)
          : [...current, index]

        const next: DareQuestState = {
          ...prev,
          completions: { ...prev.completions, [today]: parts },
        }

        // All four parts done → mark the day complete and update the streak
        // (idempotent: a same-day re-toggle never double-increments).
        if (parts.length === PART_COUNT && prev.lastCompleted !== today) {
          next.completedDays = prev.completedDays.includes(today)
            ? prev.completedDays
            : [...prev.completedDays, today]
          next.streak = prev.lastCompleted === yesterdayKey(today) ? prev.streak + 1 : 1
          next.bestStreak = Math.max(next.streak, prev.bestStreak)
          next.lastCompleted = today
        }

        saveState(next)
        return next
      })
    },
    [today]
  )

  const partsToday = state.completions[today] ?? []
  const partsDone = Array.from({ length: PART_COUNT }, (_, i) => partsToday.includes(i))
  const dayComplete = state.completedDays.includes(today)

  // Which of the 30 quest days has the user ever completed (any cycle).
  const isDayCompleted = useCallback(
    (questDay: number) => state.completedDays.some((key) => questDayNumber(key) === questDay),
    [state.completedDays]
  )

  return {
    mounted,
    partsDone,
    togglePart,
    dayComplete,
    streak: state.streak,
    bestStreak: state.bestStreak,
    totalDaysCompleted: state.completedDays.length,
    isDayCompleted,
  }
}
