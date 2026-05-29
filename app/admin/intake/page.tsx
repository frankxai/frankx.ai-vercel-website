import { promises as fs } from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import { ArrowLeft, Mail, Linkedin, MapPin, Briefcase, Clock, ExternalLink } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = createMetadata({
  title: 'Workshop Intake Radar | Admin | FrankX',
  description: 'Operator dashboard for workshop intake submissions.',
  path: '/admin/intake',
  noindex: true,
})

interface IntakeEntry {
  ts: string
  workshop: 'ikigai-content-studio' | 'sovereign-leadership' | 'personal-ai-coe' | 'custom'
  fullName: string
  email: string
  company: string
  role: string
  location: string
  format: 'in-person' | 'virtual' | 'hybrid'
  linkedin?: string
  notes?: string
  referrer?: string
  notificationStatus: 'sent' | 'failed' | 'skipped'
  audienceStatus: 'added' | 'failed' | 'skipped' | 'duplicate'
}

const WORKSHOP_LABEL: Record<IntakeEntry['workshop'], string> = {
  'ikigai-content-studio': 'Ikigai + AI Content Studio',
  'sovereign-leadership': 'Sovereign Leadership',
  'personal-ai-coe': 'Personal AI CoE',
  custom: 'Custom format',
}

const WORKSHOP_COLOR: Record<IntakeEntry['workshop'], string> = {
  'ikigai-content-studio': 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  'sovereign-leadership': 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
  'personal-ai-coe': 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  custom: 'text-violet-300 bg-violet-500/10 border-violet-500/20',
}

const FORMAT_LABEL: Record<IntakeEntry['format'], string> = {
  'in-person': 'In-person',
  virtual: 'Virtual',
  hybrid: 'Hybrid',
}

function getLogPath() {
  if (process.env.VERCEL) return '/tmp/workshop-intake.jsonl'
  return path.join(process.cwd(), 'private', 'workshop-intake.jsonl')
}

async function loadEntries(): Promise<IntakeEntry[]> {
  try {
    const content = await fs.readFile(getLogPath(), 'utf8')
    const lines = content.trim().split('\n').filter(Boolean)
    return lines
      .map((line) => {
        try {
          return JSON.parse(line) as IntakeEntry
        } catch {
          return null
        }
      })
      .filter((e): e is IntakeEntry => e !== null)
      .reverse()
      .slice(0, 200)
  } catch {
    return []
  }
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  const now = Date.now()
  const diff = (now - then) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default async function IntakeRadarPage() {
  const entries = await loadEntries()

  // Stats
  const total = entries.length
  const last24h = entries.filter(
    (e) => Date.now() - new Date(e.ts).getTime() < 24 * 3600 * 1000,
  ).length
  const last7d = entries.filter(
    (e) => Date.now() - new Date(e.ts).getTime() < 7 * 24 * 3600 * 1000,
  ).length
  const byWorkshop = entries.reduce<Record<string, number>>((acc, e) => {
    acc[e.workshop] = (acc[e.workshop] || 0) + 1
    return acc
  }, {})

  return (
    <main className="relative min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <section className="relative border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-10">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Admin
          </Link>

          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Workshop Intake Radar
          </h1>
          <p className="text-white/55 max-w-2xl">
            Every submission to <code className="text-emerald-400/80">/api/workshop-intake</code>{' '}
            from /workshops/* intake forms. Emails fire to{' '}
            <code className="text-emerald-400/80">{process.env.OPERATOR_EMAIL || 'frank@frankx.ai'}</code>{' '}
            on each submission; this view is the durable record.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1.5">Total submissions</p>
            <p className="text-3xl font-bold text-white">{total}</p>
          </div>
          <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/70 mb-1.5">Last 24h</p>
            <p className="text-3xl font-bold text-white">{last24h}</p>
          </div>
          <div className="rounded-xl border border-cyan-500/15 bg-cyan-500/[0.04] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/70 mb-1.5">Last 7 days</p>
            <p className="text-3xl font-bold text-white">{last7d}</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1.5">By workshop</p>
            <div className="space-y-1 text-xs text-white/60">
              {Object.entries(byWorkshop)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="truncate">{WORKSHOP_LABEL[k as IntakeEntry['workshop']] || k}</span>
                    <span className="text-white/40">{v}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Entries */}
      <section>
        <div className="max-w-7xl mx-auto px-6 py-10">
          {entries.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
              <Mail className="w-10 h-10 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 mb-2">No submissions yet.</p>
              <p className="text-sm text-white/40 max-w-md mx-auto">
                When someone fills out an intake form at <code>/workshops/sovereign-leadership</code>,{' '}
                <code>/workshops/ikigai-content-studio</code>, or <code>/workshops/personal-ai-coe</code>,
                their submission lands here + sends to {process.env.OPERATOR_EMAIL || 'frank@frankx.ai'}.
              </p>
              <p className="text-xs text-white/30 mt-4">
                Storage: <code>{process.env.VERCEL ? '/tmp/workshop-intake.jsonl' : 'private/workshop-intake.jsonl'}</code>.
                On Vercel this is ephemeral per Fluid Compute instance — long-term storage via Vercel KV
                is a follow-up.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, idx) => (
                <article
                  key={`${entry.ts}-${idx}`}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] p-5 transition-colors"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] font-medium rounded border ${
                            WORKSHOP_COLOR[entry.workshop]
                          }`}
                        >
                          {WORKSHOP_LABEL[entry.workshop]}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-white/40">
                          {FORMAT_LABEL[entry.format]}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-white/40">
                          <Clock className="w-3 h-3" />
                          {relativeTime(entry.ts)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {entry.fullName}{' '}
                        <span className="font-normal text-white/50">— {entry.role}</span>
                      </h3>
                      <p className="text-sm text-white/60 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-white/30" />
                        {entry.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 text-xs text-white/40">
                      <span className={
                        entry.notificationStatus === 'sent'
                          ? 'text-emerald-400'
                          : entry.notificationStatus === 'failed'
                          ? 'text-rose-400'
                          : 'text-white/30'
                      }>
                        Email: {entry.notificationStatus}
                      </span>
                      {entry.audienceStatus !== 'skipped' && (
                        <span className={
                          entry.audienceStatus === 'added' || entry.audienceStatus === 'duplicate'
                            ? 'text-emerald-400'
                            : 'text-rose-400'
                        }>
                          Audience: {entry.audienceStatus}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2.5 text-sm mb-3">
                    <a
                      href={`mailto:${entry.email}`}
                      className="inline-flex items-center gap-2 text-white/70 hover:text-emerald-300 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-white/40" />
                      {entry.email}
                    </a>
                    {entry.linkedin && (
                      <a
                        href={entry.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-cyan-300 transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-white/40" />
                        LinkedIn
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <span className="inline-flex items-center gap-2 text-white/60">
                      <MapPin className="w-3.5 h-3.5 text-white/40" />
                      {entry.location}
                    </span>
                    {entry.referrer && (
                      <span className="inline-flex items-center gap-2 text-white/40 text-xs truncate">
                        From: {entry.referrer.replace('https://www.frankx.ai', '')}
                      </span>
                    )}
                  </div>

                  {entry.notes && (
                    <div className="rounded-lg border border-white/[0.04] bg-black/20 p-3 mt-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1.5">
                        Notes
                      </p>
                      <p className="text-sm text-white/75 leading-relaxed whitespace-pre-wrap">
                        {entry.notes}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-xs text-white/30 space-y-1">
          <p>
            Email notifications fire to{' '}
            <code className="text-white/50">{process.env.OPERATOR_EMAIL || 'frank@frankx.ai'}</code> (set{' '}
            <code className="text-white/50">OPERATOR_EMAIL</code> env var to override).
          </p>
          <p>
            Audience writes require{' '}
            <code className="text-white/50">WORKSHOP_INTAKE_AUDIENCE_ID</code> set in Vercel.
          </p>
          <p>
            Storage is ephemeral on Vercel Fluid Compute. Long-term storage via Vercel KV is the
            follow-up.
          </p>
        </div>
      </section>
    </main>
  )
}
