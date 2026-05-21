import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import matter from 'gray-matter'
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  ExternalLink,
  MapPin,
  Plane,
  Radio,
  Sparkles,
  Target,
} from 'lucide-react'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'
import { workshops as workshopFormats } from '@/data/workshops'

export const metadata: Metadata = {
  title: 'Workshop Calendar — Travel + Delivery Schedule | FrankX',
  description:
    'Where Frank is each week, which workshops are confirmed, and which slots are open for booking. Source-of-truth for FrankX workshop operations.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Workshop Calendar | FrankX',
    description:
      'Travel-aware workshop calendar — confirmed deliveries, open slots, and trip windows.',
    type: 'website',
  },
}

// ── Types ──────────────────────────────────────────────────────────────

type EventStatus =
  | 'confirmed'
  | 'planning'
  | 'open'
  | 'delivered'
  | 'cancelled'

type EventFormat = string // workshop format slug OR "travel" OR "any-virtual"

interface CalendarEvent {
  id: string
  format: EventFormat
  status: EventStatus
  // dates
  date?: string // single-day events
  date_start?: string
  date_end?: string
  recurring?: string
  slot_start?: string
  slot_end?: string
  timezone?: string
  // place
  city?: string
  country?: string
  host_org?: string
  mode?: string
  duration?: string
  // meta
  goals?: string[]
  next_action?: string
  intake_ref?: string
  booking?: string
  // narrative body after the YAML block (markdown paragraph before the next heading)
  body?: string
  // rendered context
  heading?: string
}

interface ParseResult {
  events: CalendarEvent[]
  errors: { block: string; reason: string }[]
}

// ── Parsing ────────────────────────────────────────────────────────────

const REQUIRED_FIELDS: Array<keyof CalendarEvent> = ['id', 'format', 'status']

function parseCalendar(markdown: string): ParseResult {
  const events: CalendarEvent[] = []
  const errors: { block: string; reason: string }[] = []

  // Match each ```yaml ... ``` fenced block. We specifically look for blocks
  // whose first meaningful line begins with "event:" — this is the contract
  // in docs/workshops/CALENDAR.md.
  const fenceRe = /```yaml\s*\n([\s\S]*?)```/g
  // Split the source by H3 headings so we can attach each event to the
  // nearest preceding heading + body paragraph.
  const sections = splitByHeading(markdown)

  for (const section of sections) {
    let m: RegExpExecArray | null
    fenceRe.lastIndex = 0
    while ((m = fenceRe.exec(section.body)) !== null) {
      const block = m[1]
      if (!/^\s*event\s*:/m.test(block)) continue

      // Strip the leading "event:" key — gray-matter parses key/value YAML
      // frontmatter, not nested maps. The simplest reliable parse: wrap the
      // block's inner content as top-level keys by de-indenting.
      const raw = block
        .replace(/^\s*event\s*:\s*\n/, '')
        .replace(/^  /gm, '') // de-indent two spaces
        .replace(/^\t/gm, '')

      try {
        const parsed = matter(`---\n${raw}\n---\n`)
        const data = parsed.data as Partial<CalendarEvent>
        const missing = REQUIRED_FIELDS.filter((k) => !data[k])
        if (missing.length) {
          errors.push({
            block: String(data.id ?? section.heading ?? '(unknown)'),
            reason: `missing fields: ${missing.join(', ')}`,
          })
          continue
        }
        events.push({
          ...(data as CalendarEvent),
          heading: section.heading,
          body: extractNarrative(section.body, m.index + m[0].length),
        })
      } catch (err) {
        errors.push({
          block: section.heading ?? '(unknown)',
          reason: err instanceof Error ? err.message : String(err),
        })
      }
    }
  }

  return { events, errors }
}

function splitByHeading(
  md: string
): { heading: string | undefined; body: string }[] {
  const lines = md.split(/\r?\n/)
  const sections: { heading: string | undefined; body: string }[] = []
  let current: { heading: string | undefined; body: string } = {
    heading: undefined,
    body: '',
  }
  for (const line of lines) {
    const h = line.match(/^###\s+(.+?)\s*$/)
    if (h) {
      if (current.body.trim() || current.heading) sections.push(current)
      current = { heading: h[1], body: '' }
    } else {
      current.body += line + '\n'
    }
  }
  if (current.body.trim() || current.heading) sections.push(current)
  return sections
}

function extractNarrative(sectionBody: string, offset: number): string {
  // Grab the first paragraph after the YAML block — skip blank lines,
  // stop at the next markdown heading or fenced block.
  const after = sectionBody.slice(offset)
  const lines = after.split(/\r?\n/)
  const out: string[] = []
  let started = false
  for (const line of lines) {
    if (/^#{1,6}\s/.test(line) || /^```/.test(line)) break
    if (!line.trim()) {
      if (started) break
      continue
    }
    started = true
    out.push(line)
  }
  return out.join(' ').trim().slice(0, 280)
}

// ── Format + status helpers ────────────────────────────────────────────

const FORMAT_COLOR: Record<string, GlowColor> = {
  'sovereign-leadership': 'cyan',
  'ikigai-content-studio': 'violet',
  'ikigai-branding': 'violet',
  'personal-ai-coe': 'emerald',
  'ai-2026-graduates': 'cyan',
  'build-first-ai-agent': 'violet',
  'ai-music-masterclass': 'amber',
  travel: 'amber',
  'any-virtual': 'teal',
}

function colorForFormat(format: string): GlowColor {
  return FORMAT_COLOR[format] ?? 'teal'
}

function formatTitle(format: string): string {
  const w = workshopFormats.find((w) => w.slug === format)
  if (w) return w.title
  if (format === 'travel') return 'Travel window'
  if (format === 'any-virtual') return 'Virtual — any format'
  return format
}

const STATUS_STYLE: Record<
  EventStatus,
  { label: string; className: string }
> = {
  confirmed: {
    label: 'Confirmed',
    className: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  },
  planning: {
    label: 'Planning',
    className: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  },
  open: {
    label: 'Open slot',
    className: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/30',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
  },
}

// ── Date helpers ───────────────────────────────────────────────────────

function parseDate(s?: string): Date | null {
  if (!s) return null
  const d = new Date(s)
  return isNaN(d.getTime()) ? null : d
}

function isUpcoming(ev: CalendarEvent, now = new Date()): boolean {
  const end = parseDate(ev.date_end) ?? parseDate(ev.date)
  if (!end) return ev.status === 'open' // recurring slots are always upcoming
  // include the full day
  end.setHours(23, 59, 59, 999)
  return end.getTime() >= now.getTime()
}

function formatDate(iso?: string): string {
  const d = parseDate(iso)
  if (!d) return ''
  return d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateRange(start?: string, end?: string): string {
  const s = formatDate(start)
  const e = formatDate(end)
  if (s && e) return `${s} → ${e}`
  return s || e || ''
}

function sortByDate(a: CalendarEvent, b: CalendarEvent): number {
  const ad =
    parseDate(a.date_start) ?? parseDate(a.date) ?? new Date(8640000000000000)
  const bd =
    parseDate(b.date_start) ?? parseDate(b.date) ?? new Date(8640000000000000)
  return ad.getTime() - bd.getTime()
}

// ── Page ───────────────────────────────────────────────────────────────

export default function CalendarPage() {
  const file = path.join(process.cwd(), 'docs/workshops/CALENDAR.md')
  let raw = ''
  try {
    raw = fs.readFileSync(file, 'utf8')
  } catch {
    raw = ''
  }

  const { events, errors } = parseCalendar(raw)

  const upcoming = events
    .filter(
      (e) =>
        e.status !== 'delivered' &&
        e.status !== 'cancelled' &&
        isUpcoming(e) &&
        e.format !== 'travel' &&
        !e.recurring
    )
    .sort(sortByDate)

  const travelWindows = events
    .filter((e) => e.format === 'travel' && isUpcoming(e))
    .sort(sortByDate)

  const openSlots = events
    .filter((e) => e.status === 'open' || e.recurring)
    .sort(sortByDate)

  const archived = events
    .filter((e) => e.status === 'delivered' || e.status === 'cancelled')
    .sort(
      (a, b) =>
        (parseDate(b.date)?.getTime() ?? 0) -
        (parseDate(a.date)?.getTime() ?? 0)
    )

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100">
      {/* Header */}
      <section className="relative pt-28 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/ops"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Ops
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="w-5 h-5 text-cyan-400" />
            <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
              Workshop Operating System · Tier 4
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Workshop Calendar
          </h1>
          <p className="mt-3 text-base text-zinc-400 max-w-2xl leading-relaxed">
            Where I am each week, which workshops are confirmed, and which
            slots are open for booking. Source of truth:{' '}
            <code className="text-zinc-300 bg-white/[0.04] px-1.5 py-0.5 rounded text-xs">
              docs/workshops/CALENDAR.md
            </code>
            .
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {upcoming.length} confirmed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              {travelWindows.length} travel windows
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              {openSlots.length} open slots
            </span>
            {errors.length > 0 && (
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                {errors.length} parse issues
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-12">
        {/* Upcoming confirmed workshops */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            Upcoming workshops
          </h2>
          {upcoming.length === 0 ? (
            <EmptyState
              message="No confirmed workshops in the pipeline. Edit docs/workshops/CALENDAR.md to add one."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {upcoming.map((ev) => (
                <WorkshopCard key={ev.id} event={ev} />
              ))}
            </div>
          )}
        </section>

        {/* Travel windows */}
        {travelWindows.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Plane className="w-5 h-5 text-amber-400" />
              Travel windows
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {travelWindows.map((ev) => (
                <TravelCard key={ev.id} event={ev} />
              ))}
            </div>
          </section>
        )}

        {/* Open slots */}
        {openSlots.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Radio className="w-5 h-5 text-cyan-400" />
              Open booking slots
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {openSlots.map((ev) => (
                <OpenSlotCard key={ev.id} event={ev} />
              ))}
            </div>
          </section>
        )}

        {/* Archived */}
        {archived.length > 0 && (
          <section>
            <details className="group">
              <summary className="cursor-pointer list-none text-sm text-zinc-500 hover:text-zinc-300 flex items-center gap-2">
                <span className="inline-block w-3 text-center transition-transform group-open:rotate-90">
                  ›
                </span>
                Past / archived ({archived.length})
              </summary>
              <div className="mt-4 space-y-2">
                {archived.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <StatusBadge status={ev.status} />
                      <span className="text-zinc-300 truncate">
                        {ev.heading ?? formatTitle(ev.format)}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono shrink-0 ml-3">
                      {formatDate(ev.date)}
                    </span>
                  </div>
                ))}
              </div>
            </details>
          </section>
        )}

        {/* CTA footer */}
        <section className="pt-6 border-t border-white/[0.06]">
          <GlowCard color="cyan" className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Want Frank to run a workshop for your team?
                </h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Three delivered formats: Ikigai Content Studio, Sovereign
                  Leadership, Personal AI CoE. Virtual every Thursday CET,
                  in-person during travel windows.
                </p>
              </div>
              <Link
                href="/go/book-workshop"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-200 px-5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap"
              >
                Book a workshop
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </GlowCard>
        </section>

        {/* Parse errors (only visible when there are any) */}
        {errors.length > 0 && (
          <section className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-5">
            <p className="text-sm font-medium text-rose-300 mb-2">
              Parse warnings in CALENDAR.md
            </p>
            <ul className="text-xs text-rose-200/80 space-y-1 font-mono">
              {errors.map((e, i) => (
                <li key={i}>
                  · <span className="text-rose-300">{e.block}</span> —{' '}
                  {e.reason}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Footer */}
        <div className="pt-6 border-t border-white/[0.06]">
          <p className="text-xs text-zinc-600 text-center">
            Generated from{' '}
            <code className="text-zinc-500">docs/workshops/CALENDAR.md</code>.
            Edit the markdown; the page reflects the change on next build.
            <br />
            <Link
              href="/ops"
              className="text-zinc-500 hover:text-zinc-300"
            >
              ← Ops
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Presentational components ──────────────────────────────────────────

function StatusBadge({ status }: { status: EventStatus }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.planning
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${s.className}`}
    >
      {s.label}
    </span>
  )
}

function WorkshopCard({ event }: { event: CalendarEvent }) {
  const color = colorForFormat(event.format)
  const workshop = workshopFormats.find((w) => w.slug === event.format)
  return (
    <GlowCard color={color} className="p-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <StatusBadge status={event.status} />
        <span className="text-xs text-zinc-500 font-mono">{event.id}</span>
      </div>
      <p className="text-[11px] uppercase tracking-wider text-zinc-500 mb-1">
        {formatDate(event.date)}
      </p>
      <h3 className="text-lg font-semibold text-white leading-tight">
        {event.heading ?? formatTitle(event.format)}
      </h3>
      <dl className="mt-3 grid grid-cols-2 gap-y-1.5 text-xs text-zinc-400">
        {event.host_org && (
          <>
            <dt className="text-zinc-500">Host</dt>
            <dd className="text-zinc-200">{event.host_org}</dd>
          </>
        )}
        {(event.city || event.country) && (
          <>
            <dt className="text-zinc-500">Location</dt>
            <dd className="text-zinc-200 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {[event.city, event.country].filter(Boolean).join(', ')}
            </dd>
          </>
        )}
        {event.mode && (
          <>
            <dt className="text-zinc-500">Mode</dt>
            <dd className="text-zinc-200">{event.mode}</dd>
          </>
        )}
        {event.duration && (
          <>
            <dt className="text-zinc-500">Duration</dt>
            <dd className="text-zinc-200 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {event.duration}
            </dd>
          </>
        )}
      </dl>
      {event.next_action && (
        <p className="mt-4 text-xs text-zinc-400 border-t border-white/[0.06] pt-3">
          <span className="text-zinc-500">Next: </span>
          {event.next_action}
        </p>
      )}
      {workshop && (
        <Link
          href={`/workshops/${workshop.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition-colors"
        >
          Workshop format
          <ExternalLink className="w-3 h-3" />
        </Link>
      )}
    </GlowCard>
  )
}

function TravelCard({ event }: { event: CalendarEvent }) {
  return (
    <GlowCard color="amber" className="p-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <StatusBadge status={event.status} />
        <span className="text-xs text-amber-300/80 font-mono flex items-center gap-1">
          <Plane className="w-3 h-3" />
          Travel
        </span>
      </div>
      <p className="text-[11px] uppercase tracking-wider text-zinc-500 mb-1">
        {formatDateRange(event.date_start, event.date_end)}
      </p>
      <h3 className="text-lg font-semibold text-white leading-tight flex items-center gap-2">
        <MapPin className="w-4 h-4 text-amber-300" />
        {event.city}
        {event.country && (
          <span className="text-sm font-normal text-zinc-400">
            · {event.country}
          </span>
        )}
      </h3>
      {event.goals && event.goals.length > 0 && (
        <div className="mt-4">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
            <Target className="w-3 h-3" />
            Trip goals
          </p>
          <ul className="space-y-1.5 text-xs text-zinc-300">
            {event.goals.map((g, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400/70 mt-0.5">·</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {event.next_action && (
        <p className="mt-4 text-xs text-zinc-400 border-t border-white/[0.06] pt-3">
          <span className="text-zinc-500">Next action: </span>
          {event.next_action}
        </p>
      )}
      <div className="mt-4 pt-4 border-t border-white/[0.06]">
        <Link
          href="/go/book-workshop"
          className="inline-flex items-center gap-1.5 text-xs text-amber-200 hover:text-amber-100 transition-colors"
        >
          Book a slot in this window →
        </Link>
      </div>
    </GlowCard>
  )
}

function OpenSlotCard({ event }: { event: CalendarEvent }) {
  const timeLabel =
    event.slot_start && event.slot_end
      ? `${event.slot_start}–${event.slot_end}`
      : undefined
  return (
    <GlowCard color="cyan" className="p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <StatusBadge status="open" />
        <span className="text-xs text-cyan-300/80 font-mono">
          {event.format === 'any-virtual' ? 'Virtual' : event.format}
        </span>
      </div>
      <h3 className="text-base font-semibold text-white leading-tight">
        {event.recurring
          ? capitalize(event.recurring)
          : formatDate(event.date)}
      </h3>
      {timeLabel && (
        <p className="mt-1 text-sm text-zinc-300 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          {timeLabel} {event.timezone}
        </p>
      )}
      {(event.city || event.country) && (
        <p className="mt-1 text-xs text-zinc-400 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {[event.city, event.country].filter(Boolean).join(', ')}
        </p>
      )}
      <Link
        href={event.booking ?? '/go/book-workshop'}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-200 px-3 py-1.5 text-xs font-medium transition-colors"
      >
        Book →
      </Link>
    </GlowCard>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
      <p className="text-sm text-zinc-400">{message}</p>
    </div>
  )
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
