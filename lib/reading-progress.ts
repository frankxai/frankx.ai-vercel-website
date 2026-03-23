/**
 * Reading Progress — localStorage-based chapter completion tracking.
 * Used by ChapterEndZone (marks read) and PillarProgress (reads state).
 */

const STORAGE_PREFIX = 'read-'

/** Mark a chapter as read with timestamp */
export function markChapterRead(bookSlug: string, chapterSlug: string): void {
  if (typeof window === 'undefined') return
  const key = `${STORAGE_PREFIX}${bookSlug}-${chapterSlug}`
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, new Date().toISOString())
  }
}

/** Check if a specific chapter has been read */
export function isChapterRead(bookSlug: string, chapterSlug: string): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(`${STORAGE_PREFIX}${bookSlug}-${chapterSlug}`) !== null
}

/** Soulbook pillar-to-chapter mapping */
export const PILLAR_CHAPTERS = [
  { pillar: 'Energy', chapter: 'chapter-01-energy' },
  { pillar: 'Mind', chapter: 'chapter-02-mind' },
  { pillar: 'Soul', chapter: 'chapter-03-soul' },
  { pillar: 'Craft', chapter: 'chapter-04-craft' },
  { pillar: 'Capital', chapter: 'chapter-05-capital' },
  { pillar: 'Circle', chapter: 'chapter-06-circle' },
  { pillar: 'Legacy', chapter: 'chapter-07-legacy' },
] as const

/** Get the reading progress for all 7 Soulbook pillars */
export function getPillarProgress(): { pillar: string; read: boolean }[] {
  return PILLAR_CHAPTERS.map(({ pillar, chapter }) => ({
    pillar,
    read: isChapterRead('self-development', chapter),
  }))
}

/** Count how many of the 7 pillars have been read */
export function getPillarCount(): { read: number; total: number } {
  const progress = getPillarProgress()
  return {
    read: progress.filter((p) => p.read).length,
    total: progress.length,
  }
}
