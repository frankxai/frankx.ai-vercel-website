import { promises as fs } from 'node:fs'
import Link from 'next/link'
import { ArrowLeft, Mail, Clock, Building2 } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import {
  INTENT_LABEL,
  resolvePrivatePath,
  type Intent,
} from '@/lib/contact-intake'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = createMetadata({
  title: 'Inquiry Inbox | Admin | FrankX',
  description: 'Operator dashboard for all inbound inquiries.',
  path: '/admin/intake',
  noindex: true,
})

/** Unified display row — both the new /api/intake log and the legacy
 *  workshop-intake log are mapped into this shape. */
interface Row {
  ts: string
  intent: Intent
  name: string
  email: string
  company?: string
  message: string
  source?: string
  notify: string
}

const INTENT_COLOR: Record<Intent, string> = {
  workshop: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  sprint: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  partnership: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
  press: 'text-violet-300 bg-violet-500/10 border-violet-500/20',
  advisory: 'text-sky-300 bg-sky-500/10 border-sky-500/20',
  // Executive intent: warm-neutral on cream — matches the
  // /engagements/strategic-advisor register.
  executive: 'text-[#e8dfc8] bg-[#a89c7d]/10 border-[#a89c7d]/30',
  general: 'text-slate-300 bg-white/5 border-white/15',
}

// Path resolution lives in lib/contact-intake.ts → resolvePrivatePath, kept
// in one place so the API route writer and the dashboard reader stay aligned.

async function readJsonl<T>(file: string): Promise<T[]> {
  try {
    const content = await fs.readFile(file, 'utf8')
    return content
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as T
        } catch {
          return null
        }
      })
      .filter((e): e is T => e !== null)
  } catch {
    return []
  }
}

async function loadRows(): Promise<Row[]> {
  // New unified intake log
  const unified = await readJsonl<{
    ts: string
    intent: Intent
    name: string
    email: string
    company?: string
    message: string
    source?: string
    notify: string
  }>(resolvePrivatePath('intake.jsonl'))

  // Legacy workshop-intake log — map into the unified shape
  const legacy = await readJsonl<{
    ts: string
    fullName: string
    email: string
    company: string
    notes?: string
    referrer?: string
    notificationStatus: string
  }>(resolvePrivatePath('workshop-intake.jsonl'))

  const rows: Row[] = [
    ...unified.map((e) => ({
      ts: e.ts,
      intent: e.intent,
      name: e.name,
      email: e.email,
      company: e.company,
      message: e.message,
      source: e.source,
      notify: e.notify,
    })),
    ...legacy.map((e) => ({
      ts: e.ts,
      intent: 'workshop' as Intent,
      name: e.fullName,
      email: e.email,
      company: e.company,
      message: e.notes || '(no notes)',
      source: e.referrer,
      notify: e.notificationStatus,
    })),
  ]

  return rows.sort((a, b) => b.ts.localeCompare(a.ts)).slice(0, 300)
}

function relativeTime(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default async function InquiryInboxPage() {
  const rows = await loadRows()

  const total = rows.length
  const last24h = rows.filter((r) => Date.now() - new Date(r.ts).getTime() < 24 * 3600 * 1000).length
  const last7d = rows.filter((r) => Date.now() - new Date(r.ts).getTime() < 7 * 24 * 3600 * 1000).length
  const byIntent = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.intent] = (acc[r.intent] || 0) + 1
    return acc
  }, {})

  return (
    <main className="relative min-h-screen bg-[#0a0a0b]">
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
            Inquiry Inbox
          </h1>
          <p className="text-white/55 max-w-2xl">
            Every submission to <code className="text-emerald-400/80">/api/intake</code> (and legacy{' '}
            <code className="text-emerald-400/80">/api/workshop-intake</code>). Notifications fire to{' '}
            <code className="text-emerald-400/80">{process.env.OPERATOR_EMAIL || 'frank@frankx.ai'}</code>;
            the durable record is the Notion CRM. This view is the live local mirror.
          </p>
        </div>
      </section>

      <section className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1.5">Total</p>
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
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1.5">By intent</p>
            <div className="space-y-1 text-xs text-white/60">
              {Object.entries(byIntent)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="truncate">{INTENT_LABEL[k as Intent] || k}</span>
                    <span className="text-white/40">{v}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-6 py-10">
          {rows.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
              <Mail className="w-10 h-10 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 mb-2">No inquiries yet.</p>
              <p className="text-sm text-white/40 max-w-md mx-auto">
                When someone submits the form at <code>/contact</code>, it lands here, fires to{' '}
                {process.env.OPERATOR_EMAIL || 'frank@frankx.ai'}, and (if configured) writes to the
                Notion CRM.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {rows.map((row, idx) => (
                <article
                  key={`${row.ts}-${idx}`}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] p-5 transition-colors"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] font-medium rounded border ${INTENT_COLOR[row.intent]}`}
                        >
                          {INTENT_LABEL[row.intent]}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-white/40">
                          <Clock className="w-3 h-3" />
                          {relativeTime(row.ts)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">{row.name}</h3>
                      {row.company && (
                        <p className="text-sm text-white/60 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-white/30" />
                          {row.company}
                        </p>
                      )}
                    </div>
                    <span
                      className={
                        row.notify === 'sent'
                          ? 'text-emerald-400 text-xs'
                          : row.notify === 'failed'
                          ? 'text-rose-400 text-xs'
                          : 'text-white/30 text-xs'
                      }
                    >
                      Email: {row.notify}
                    </span>
                  </div>

                  <a
                    href={`mailto:${row.email}`}
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-emerald-300 transition-colors mb-3"
                  >
                    <Mail className="w-3.5 h-3.5 text-white/40" />
                    {row.email}
                  </a>

                  <div className="rounded-lg border border-white/[0.04] bg-black/20 p-3">
                    <p className="text-sm text-white/75 leading-relaxed whitespace-pre-wrap">{row.message}</p>
                  </div>

                  {row.source && (
                    <p className="mt-2 text-xs text-white/40 truncate">
                      From: {row.source.replace('https://www.frankx.ai', '').replace('https://frankx.ai', '')}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-xs text-white/30 space-y-1">
          <p>
            Notifications fire to{' '}
            <code className="text-white/50">{process.env.OPERATOR_EMAIL || 'frank@frankx.ai'}</code>. Durable
            record: Notion CRM (<code className="text-white/50">NOTION_TOKEN</code> +{' '}
            <code className="text-white/50">NOTION_INQUIRIES_DB_ID</code>).
          </p>
          <p>
            Local JSONL is ephemeral on Vercel Fluid Compute — Notion is the source of truth once wired.
          </p>
        </div>
      </section>
    </main>
  )
}
