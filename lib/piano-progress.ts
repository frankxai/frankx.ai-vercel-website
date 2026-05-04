/**
 * Piano practice progress — browser-only persistence (localStorage).
 *
 * Privacy: all data stays in the child's browser. No server, no telemetry,
 * no PII. Safe for kids' devices (Alea, niblings, anyone).
 *
 * Stars logic (per song attempt):
 *   ≤ 2 misses → 3 stars
 *   ≤ 6 misses → 2 stars
 *   completed → 1 star
 */

const STORAGE_KEY = 'frankx-piano-progress-v1'
const VOLUME_KEY = 'frankx-piano-volume-v1'
const SESSION_KEY = 'frankx-piano-session-v1'

export interface SongProgress {
  plays: number
  lastPlayed: string // ISO date
  bestStars: 0 | 1 | 2 | 3
  lastStars: 0 | 1 | 2 | 3
  totalMisses: number
}

export type ProgressMap = Record<string, SongProgress>

export interface DailySession {
  date: string // YYYY-MM-DD
  practiceSeconds: number
  starsEarned: number
}

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function safeWrite(key: string, value: unknown): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage full / blocked — fail silently
  }
}

export function getProgress(): ProgressMap {
  return safeRead<ProgressMap>(STORAGE_KEY, {})
}

export function getSongProgress(songId: string): SongProgress | null {
  return getProgress()[songId] ?? null
}

export function calculateStars(misses: number): 0 | 1 | 2 | 3 {
  if (misses <= 2) return 3
  if (misses <= 6) return 2
  return 1
}

export function recordAttempt(songId: string, misses: number): SongProgress {
  const stars = calculateStars(misses)
  const all = getProgress()
  const prev = all[songId]
  const next: SongProgress = {
    plays: (prev?.plays ?? 0) + 1,
    lastPlayed: new Date().toISOString(),
    bestStars: Math.max(prev?.bestStars ?? 0, stars) as 0 | 1 | 2 | 3,
    lastStars: stars,
    totalMisses: (prev?.totalMisses ?? 0) + misses,
  }
  all[songId] = next
  safeWrite(STORAGE_KEY, all)
  bumpDailySession({ starsEarned: stars })
  return next
}

export function totalStars(progress: ProgressMap = getProgress()): number {
  return Object.values(progress).reduce((sum, p) => sum + p.bestStars, 0)
}

export function totalSongsPlayed(progress: ProgressMap = getProgress()): number {
  return Object.keys(progress).length
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
    window.localStorage.removeItem(SESSION_KEY)
  } catch {
    /* ok */
  }
}

// ── Volume (master gain 0.0 – 1.5) ──────────────────────────────────────────

export function getVolume(): number {
  const v = safeRead<number>(VOLUME_KEY, 1.0)
  return Math.max(0, Math.min(1.5, v))
}

export function setVolume(v: number): void {
  safeWrite(VOLUME_KEY, Math.max(0, Math.min(1.5, v)))
}

// ── Daily session (today's practice) ────────────────────────────────────────

function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function getDailySession(): DailySession {
  const session = safeRead<DailySession | null>(SESSION_KEY, null)
  const today = todayKey()
  if (!session || session.date !== today) {
    return { date: today, practiceSeconds: 0, starsEarned: 0 }
  }
  return session
}

export function bumpDailySession(delta: { practiceSeconds?: number; starsEarned?: number }): DailySession {
  const current = getDailySession()
  const next: DailySession = {
    date: current.date,
    practiceSeconds: current.practiceSeconds + (delta.practiceSeconds ?? 0),
    starsEarned: current.starsEarned + (delta.starsEarned ?? 0),
  }
  safeWrite(SESSION_KEY, next)
  return next
}

export function formatPracticeTime(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} s`
  const min = Math.floor(seconds / 60)
  return `${min} Min`
}
