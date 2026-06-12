// Daily dare rotation — deterministic, sequential, same for everyone per UTC day.
//
// Unlike /api/quote/today (hash-based, random feel), the quest is an ordered
// 30-day arc: day N follows day N-1, and two friends starting on the same
// calendar date walk the same path. After day 30 the cycle wraps to day 1.
//
// Pure isomorphic module: no 'use client' / server directives, usable from
// client pages, the API route, and scratch node checks alike.

import { dailyDares, questChapters, type DailyDare, type QuestChapter } from '@/data/daily-dares'
import { getPromptById, type Prompt } from '@/lib/prompts'

// UTC anchor — day 1 of the first cycle (the Monday the quest opens).
export const QUEST_EPOCH = '2026-06-15'

export const QUEST_LENGTH = dailyDares.length // 30

// YYYY-MM-DD for a given date/timezone (en-CA locale formats exactly that way).
export function dateKey(date: Date = new Date(), timeZone = 'UTC'): string {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return fmt.format(date)
}

// 1..QUEST_LENGTH for a date key; safe for dates before the epoch.
export function questDayNumber(key: string = dateKey()): number {
  const epochDays = Math.floor((Date.parse(key) - Date.parse(QUEST_EPOCH)) / 86_400_000)
  return ((epochDays % QUEST_LENGTH) + QUEST_LENGTH) % QUEST_LENGTH + 1
}

export function getDareForDay(day: number): DailyDare {
  return dailyDares.find((d) => d.day === day) ?? dailyDares[0]
}

export function getChapterForDay(day: number): QuestChapter {
  return (
    questChapters.find((c) => day >= c.days[0] && day <= c.days[1]) ?? questChapters[0]
  )
}

export function getTodaysDare(key: string = dateKey()): {
  dare: DailyDare
  chapter: QuestChapter
  day: number
  date: string
} {
  const day = questDayNumber(key)
  return { dare: getDareForDay(day), chapter: getChapterForDay(day), day, date: key }
}

// Defensive: a bad promptId renders the framing without the prompt body
// instead of crashing the page.
export function resolvePrompt(dare: DailyDare): Prompt | undefined {
  const prompt = getPromptById(dare.prompt.promptId)
  if (!prompt && process.env.NODE_ENV !== 'production') {
    console.warn(`[daily-dare] Unknown promptId "${dare.prompt.promptId}" on day ${dare.day}`)
  }
  return prompt
}
