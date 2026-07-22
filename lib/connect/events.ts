export type ConnectEventAccent = 'cyan' | 'amber' | 'emerald' | 'violet'

export interface ConnectEvent {
  id: string
  label: string
  shortLabel: string
  start: string
  end: string
  accent: ConnectEventAccent
  location?: string
}

export const CONNECT_EVENTS: ConnectEvent[] = [
  {
    id: 'google-ai-live',
    label: 'Google AI Live',
    shortLabel: 'Google AI Live',
    start: '2026-05-26',
    end: '2026-05-30',
    accent: 'cyan',
    location: 'Madrid',
  },
  {
    id: 'south-summit',
    label: 'South Summit',
    shortLabel: 'South Summit',
    start: '2026-06-02',
    end: '2026-06-06',
    accent: 'amber',
    location: 'Madrid',
  },
  // Frank attends as a participant. Anything he hosts in Tallinn is an
  // independent session — see the `attendee` framing in the /connect JSON-LD.
  {
    id: 'mindvalley-u-2026',
    label: 'Mindvalley University',
    shortLabel: 'Mindvalley U',
    start: '2026-07-20',
    end: '2026-08-02',
    accent: 'violet',
    location: 'Tallinn',
  },
]

function inWindow(now: Date, startISO: string, endISO: string): boolean {
  const start = new Date(`${startISO}T00:00:00Z`).getTime()
  const end = new Date(`${endISO}T23:59:59Z`).getTime()
  const t = now.getTime()
  return t >= start && t <= end
}

export function getActiveEvent(now: Date = new Date()): ConnectEvent | null {
  return CONNECT_EVENTS.find((event) => inWindow(now, event.start, event.end)) ?? null
}

export function getUpcomingEvent(now: Date = new Date()): ConnectEvent | null {
  const t = now.getTime()
  const future = CONNECT_EVENTS
    .filter((event) => new Date(`${event.start}T00:00:00Z`).getTime() > t)
    .sort((a, b) => a.start.localeCompare(b.start))
  return future[0] ?? null
}
