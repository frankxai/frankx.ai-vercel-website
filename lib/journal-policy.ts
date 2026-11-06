/** Shared by the file loader, capture tooling and tests. No CMS or draft bypass. */
export const JOURNAL_HUBS = {
  'human-layer': { title: 'The human layer', href: '/human-layer' },
  'ai-architecture': { title: 'AI architecture', href: '/ai-architecture' },
  'founder-stack': { title: 'The founder stack', href: '/founder-stack' },
  music: { title: 'Music and creative practice', href: '/music' },
} as const

export type JournalHub = keyof typeof JOURNAL_HUBS

export function journalDay(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Amsterdam', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now)
}

export function isJournalDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(value)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
}

export function isPublicJournalData(data: Record<string, unknown>, today = journalDay()): boolean {
  return data.published === true && data.visibility === 'public' &&
    isJournalDate(data.date) && data.date <= today
}

export function journalHubs(value: unknown): JournalHub[] {
  return Array.isArray(value)
    ? [...new Set(value.filter((key): key is JournalHub =>
      typeof key === 'string' && Object.hasOwn(JOURNAL_HUBS, key)))]
    : []
}

export function journalArticleSlugs(value: unknown): string[] {
  return Array.isArray(value)
    ? [...new Set(value.filter((slug): slug is string =>
      typeof slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)))]
    : []
}
