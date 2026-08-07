"use client"

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  Eye,
  FileCheck2,
  Gauge,
  LockKeyhole,
  ReceiptEuro,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from 'lucide-react'

type ChallengeLedger = {
  id: string
  title: string
  status: string
  startedAt: string
  deadlineAt: string
  lastUpdatedAt: string
  product: {
    id: string
    name: string
    priceEur: number
    currency: string
  }
  completionProof: {
    status: string
    requiredBy: string
    requiredEvidence: string[]
  }
  target: {
    grossEur: number
    customers: number
    qualifiedInvitations: number
    maxHumanHours: number
    maxIncrementalSpendEur: number
  }
  actual: {
    grossEur: number
    customers: number
    qualifiedInvitations: number
    humanHours: number
    incrementalSpendEur: number
    refunds: number
  }
  updates: Array<{
    at: string
    label: string
    detail: string
  }>
}

type CheckoutState = 'idle' | 'loading' | 'error'

const agentTeam = [
  {
    name: 'Archivist',
    role: 'Asset selection',
    detail: 'Rejects new ideas and surfaces only what is already complete enough to sell.',
    Icon: FileCheck2,
  },
  {
    name: 'Offer Architect',
    role: 'Commercial compression',
    detail: 'Turns the existing asset into one buyer, one outcome, one price and one decision.',
    Icon: Target,
  },
  {
    name: 'Publisher',
    role: 'Conversion surface',
    detail: 'Owns the page, checkout, fulfillment path and factual product description.',
    Icon: Sparkles,
  },
  {
    name: 'Revenue Operator',
    role: 'Qualified contact',
    detail: 'Builds the demonstration and routes the offer to relevant founders and creators.',
    Icon: UsersRound,
  },
  {
    name: 'Auditor',
    role: 'Evidence control',
    detail: 'Counts only independent customers, verified payments, real spend and elapsed human time.',
    Icon: ShieldCheck,
  },
  {
    name: 'Frank',
    role: 'Accountable human',
    detail: 'Owns every claim, commercial decision, buyer relationship and final verdict.',
    Icon: Eye,
  },
]

const protocol = [
  {
    day: 'THU 16',
    label: 'Freeze',
    accent: 'text-violet-300',
    detail: 'Select the existing asset. Freeze buyer, promise, price, rules and evidence standard. Package; do not invent.',
  },
  {
    day: 'FRI 17',
    label: 'Launch',
    accent: 'text-cyan-300',
    detail: 'Test checkout and delivery. Publish one raw demonstration. Make 20 qualified personal invitations.',
  },
  {
    day: 'SAT 18',
    label: 'Prove',
    accent: 'text-emerald-300',
    detail: 'Publish the strongest before/after. Make 15 further invitations. Repair clarity, never add features.',
  },
  {
    day: 'SUN 19',
    label: 'Close',
    accent: 'text-amber-300',
    detail: 'Automated updates only. No manual outreach or redesign. Freeze the ledger at 23:59 Amsterdam time.',
  },
]

const rules = [
  'One existing product. No new product invention.',
  'Only independent customers count—no self-purchases, family favors or reciprocal buying.',
  'No paid ads. Incremental spend stays at or below €25.',
  'Maximum six human operating hours before Sunday.',
  'Refunds are deducted and shown. Gross, fees, VAT, spend and net remain distinct.',
  'The evidence and postmortem stay public whether the target is hit or missed.',
]

function clamp(value: number) {
  return Math.max(0, Math.min(100, value))
}

function formatCountdown(milliseconds: number | null) {
  if (milliseconds === null) return 'Calculating…'
  if (milliseconds <= 0) return 'Challenge closed'

  const totalSeconds = Math.floor(milliseconds / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [days + 'd', hours + 'h', minutes + 'm', seconds + 's'].join(' ')
}

function MetricCard({
  label,
  value,
  target,
  suffix,
  detail,
}: {
  label: string
  value: number
  target: number
  suffix?: string
  detail: string
}) {
  const progress = clamp((value / target) * 100)

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
        <span>{label}</span>
        <span className="font-mono text-white/30">{Math.round(progress)}%</span>
      </div>
      <div className="mt-5 flex items-end gap-2 font-nums">
        <span className="text-4xl font-semibold tracking-tight text-white">{value}</span>
        <span className="pb-1 text-sm text-white/40">/ {target}{suffix}</span>
      </div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 transition-[width] duration-700"
          style={{ width: progress + '%' }}
        />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-white/40">{detail}</p>
    </div>
  )
}

export default function ChallengeExperience({ ledger }: { ledger: ChallengeLedger }) {
  const [remaining, setRemaining] = useState<number | null>(null)
  const [checkoutState, setCheckoutState] = useState<CheckoutState>('idle')
  const [checkoutError, setCheckoutError] = useState('')

  const deadline = useMemo(() => new Date(ledger.deadlineAt).getTime(), [ledger.deadlineAt])
  const isClosed = remaining !== null && remaining <= 0
  const checkoutUnavailable = isClosed || checkoutState === 'loading'

  useEffect(() => {
    const update = () => setRemaining(deadline - Date.now())
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [deadline])

  async function startCheckout() {
    if (isClosed) {
      setCheckoutState('error')
      setCheckoutError('The weekend offer is closed. Completion proof is pending.')
      return
    }

    setCheckoutState('loading')
    setCheckoutError('')

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: ledger.product.id }),
      })
      const payload: { error?: string; url?: unknown } = await response.json().catch(() => ({}))

      if (!response.ok || typeof payload.url !== 'string') {
        throw new Error(payload.error || 'Secure checkout could not be opened.')
      }

      window.location.assign(payload.url)
    } catch (error) {
      setCheckoutState('error')
      setCheckoutError(error instanceof Error ? error.message : 'Secure checkout could not be opened.')
    }
  }

  const grossProgress = clamp((ledger.actual.grossEur / ledger.target.grossEur) * 100)
  const hasMetTarget =
    ledger.actual.grossEur >= ledger.target.grossEur && ledger.actual.customers >= ledger.target.customers
  const verdict = isClosed
    ? ledger.completionProof.status === 'published'
      ? 'COMPLETION PROOF PUBLISHED'
      : 'CHALLENGE CLOSED — PROOF REQUIRED'
    : hasMetTarget
      ? 'TARGET MET — FINAL PROOF PENDING'
      : 'EXPERIMENT LIVE'

  return (
    <div className="min-h-screen overflow-hidden bg-[#07080b] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/[0.08] px-6 pb-24 pt-32 sm:pt-40">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.22),transparent_33%),radial-gradient(circle_at_82%_28%,rgba(34,211,238,0.16),transparent_34%),linear-gradient(180deg,#08090d_0%,#07080b_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:52px_52px]" />

        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-100">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              </span>
              Public revenue experiment · 16–19 July 2026
            </div>

            <h1 className="mt-8 max-w-5xl font-display text-[clamp(3.5rem,9vw,8.75rem)] font-bold leading-[0.84] tracking-[-0.065em]">
              The First
              <span className="block bg-gradient-to-r from-white via-cyan-100 to-emerald-200 bg-clip-text text-transparent">
                €100 Weekend
              </span>
            </h1>

            <p className="mt-9 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
              We have built enough. I gave our agentic team one weekend to turn one existing
              digital product into verified customer revenue.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 text-sm text-white/50">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">1 existing offer</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">3 independent buyers</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">€100 gross target</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">0 paid ads</span>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={startCheckout}
                disabled={checkoutUnavailable}
                aria-describedby="checkout-status"
                aria-busy={checkoutState === 'loading'}
                className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-white px-7 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:-translate-y-0.5 hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                <CreditCard className="h-4 w-4" />
                {checkoutState === 'loading' ? 'Opening checkout…' : 'Get the Creator Kit — €99'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#ledger"
                className="inline-flex min-h-12 items-center justify-center gap-3 px-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:text-white"
              >
                See the evidence
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>

            <div id="checkout-status" role="status" className="mt-4 min-h-6 text-sm text-rose-300" aria-live="polite">
              {checkoutState === 'error'
                ? checkoutError
                : isClosed
                  ? 'The weekend offer is closed. Completion proof is required before results are final.'
                  : ''}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 -z-10 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-black/30 p-1 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
              <div className="rounded-[1.7rem] border border-white/[0.06] bg-white/[0.035] p-7 sm:p-9">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/40">Live signal</span>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200">
                    {verdict}
                  </span>
                </div>

                <div className="mt-10">
                  <div className="font-nums text-[clamp(4rem,11vw,7rem)] font-semibold leading-none tracking-[-0.07em]">
                    €{ledger.actual.grossEur}
                  </div>
                  <div className="mt-3 text-sm text-white/40">verified gross / €{ledger.target.grossEur} target</div>
                  <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/[0.07]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400"
                      style={{ width: grossProgress + '%' }}
                    />
                  </div>
                </div>

                <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
                  <div className="bg-[#0b0d12] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Customers</div>
                    <div className="mt-2 font-nums text-2xl font-semibold">{ledger.actual.customers} / {ledger.target.customers}</div>
                  </div>
                  <div className="bg-[#0b0d12] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Time left</div>
                    <div className="mt-2 font-mono text-sm font-semibold text-cyan-100">{formatCountdown(remaining)}</div>
                  </div>
                </div>

                <p className="mt-6 flex gap-3 text-xs leading-relaxed text-white/40">
                  <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300/70" />
                  Numbers move only against verified payments. Buyer identity stays private.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.08] bg-white/[0.018] px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet-300">The thesis</p>
          <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            The constraint is not creation.
            <span className="block text-white/30">It is commercial contact.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-white/50">
            The estate already contains products, systems and sites. This weekend tests whether
            one existing asset creates enough value for someone to pay now. Building another asset
            would invalidate the experiment.
          </p>
        </div>
      </section>

      <section id="ledger" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">Public scoreboard</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Evidence before adjectives.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/40">
              Last ledger update: {new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Europe/Amsterdam',
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(new Date(ledger.lastUpdatedAt))} Amsterdam
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Gross revenue"
              value={ledger.actual.grossEur}
              target={ledger.target.grossEur}
              suffix=" EUR"
              detail={'Verified customer payments. The €99 checkout is recorded in EUR when received.'}
            />
            <MetricCard
              label="Customers"
              value={ledger.actual.customers}
              target={ledger.target.customers}
              detail="Independent, relevant buyers only. No favor purchases count."
            />
            <MetricCard
              label="Invitations"
              value={ledger.actual.qualifiedInvitations}
              target={ledger.target.qualifiedInvitations}
              detail="Personal contact with founders and creators who plausibly need the system."
            />
            <MetricCard
              label="Human hours"
              value={ledger.actual.humanHours}
              target={ledger.target.maxHumanHours}
              detail="A hard ceiling, not a utilization target. Agent work is disclosed separately."
            />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {[
              ['Checkout price', '€' + ledger.product.priceEur, ReceiptEuro],
              ['Incremental spend', '€' + ledger.actual.incrementalSpendEur + ' / €' + ledger.target.maxIncrementalSpendEur, Gauge],
              ['Refunds', String(ledger.actual.refunds), CheckCircle2],
            ].map(([label, value, Icon]) => {
              const MetricIcon = Icon as typeof ReceiptEuro
              return (
                <div key={String(label)} className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <MetricIcon className="h-5 w-5 text-white/50" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-white/30">{String(label)}</div>
                    <div className="mt-1 font-nums text-xl font-semibold">{String(value)}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="offer" className="scroll-mt-24 border-y border-white/[0.08] bg-[linear-gradient(135deg,rgba(124,58,237,0.08),rgba(34,211,238,0.04),rgba(16,185,129,0.06))] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-300">The existing offer</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
              ACOS
              <span className="block text-white/30">Creator Kit</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-white/50">
              The Agentic Creator OS code remains MIT-licensed and free. The €99 product sells
              compression: the fastest path from repository to a working, customized agent system.
            </p>
            <button
              type="button"
              onClick={startCheckout}
              disabled={checkoutUnavailable}
              aria-describedby="checkout-status"
              aria-busy={checkoutState === 'loading'}
              className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-emerald-300 px-7 text-sm font-bold uppercase tracking-[0.15em] text-[#06120e] transition hover:-translate-y-0.5 hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {checkoutState === 'loading' ? 'Opening checkout…' : 'Get the kit — €99'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ['01', 'ACOS Quickstart Guide', 'Install the system, find the correct entry points and reach a useful first run without mapping the repository alone.'],
              ['02', 'ACOS Complete Reference', 'The compact operating reference for agents, skills, commands, routing and the underlying production model.'],
              ['03', 'ACOS Custom Agent Guide', 'Design and configure specialized agents around a real creator or founder workflow.'],
              ['04', 'The commercial test', 'Your purchase becomes part of a transparent launch case study. Your identity is never published without permission.'],
            ].map(([number, title, detail]) => (
              <article key={number} className="group rounded-3xl border border-white/10 bg-[#090b10]/80 p-7 transition hover:-translate-y-1 hover:border-cyan-300/25">
                <div className="font-mono text-xs text-cyan-300/50">{number}</div>
                <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/40">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet-300">Operating protocol</p>
          <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              Four days. One irreversible learning loop.
            </h2>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
              <Clock3 className="h-4 w-4" />
              Amsterdam time
            </div>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.08] lg:grid-cols-4">
            {protocol.map((item) => (
              <article key={item.day} className="min-h-80 bg-[#090a0e] p-7">
                <div className="font-mono text-xs tracking-[0.22em] text-white/30">{item.day}</div>
                <div className={'mt-14 text-sm font-semibold uppercase tracking-[0.24em] ' + item.accent}>{item.label}</div>
                <p className="mt-5 text-sm leading-7 text-white/50">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-white/[0.018] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">Agentic team</p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Agents execute.
                <span className="block text-white/30">Frank remains accountable.</span>
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {agentTeam.map(({ name, role, detail, Icon }) => (
                <article key={name} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{name}</h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/50">{role}</p>
                    </div>
                    <Icon className="h-5 w-5 text-white/30" />
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-white/40">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-rose-300">Rules of evidence</p>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">The dare is designed to resist self-deception.</h2>
            <div className="mt-9 space-y-4">
              {rules.map((rule) => (
                <div key={rule} className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.022] p-5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <p className="text-sm leading-relaxed text-white/50">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-300">Proof ledger</p>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Every material event gets a timestamp.</h2>
            <div className="mt-7 rounded-2xl border border-amber-300/20 bg-amber-300/[0.05] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-200">Completion proof required</p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                By {new Intl.DateTimeFormat('en-GB', {
                  timeZone: 'Europe/Amsterdam',
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(ledger.completionProof.requiredBy))} Amsterdam, the ledger must include:
                {' '}{ledger.completionProof.requiredEvidence.join(', ')}.
              </p>
            </div>
            <div className="relative mt-10 space-y-8 before:absolute before:bottom-3 before:left-[7px] before:top-3 before:w-px before:bg-white/10">
              {ledger.updates.map((update) => (
                <article key={update.at + update.label} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border border-cyan-300/40 bg-[#07080b] shadow-[0_0_20px_rgba(34,211,238,0.25)]" />
                  <time className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    {new Intl.DateTimeFormat('en-GB', {
                      timeZone: 'Europe/Amsterdam',
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    }).format(new Date(update.at))}
                  </time>
                  <h3 className="mt-2 text-lg font-semibold">{update.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/40">{update.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.08] px-6 py-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/12 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.2),transparent_44%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.16),transparent_40%),#0a0c11] p-8 text-center shadow-[0_40px_120px_rgba(0,0,0,0.4)] sm:p-14">
          <Bot className="mx-auto h-8 w-8 text-cyan-200" />
          <p className="mt-7 font-mono text-xs uppercase tracking-[0.3em] text-cyan-200/60">Run the dare yourself</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            Stop building. Put one transformation in front of twenty people.
          </h2>
          <div className="mx-auto mt-9 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
            {[
              'Choose one existing asset.',
              'Define one paid transformation.',
              'Attach one price and working checkout.',
              'Make twenty qualified invitations.',
              'Publish the evidence—including failure.',
              'Decide Monday: scale, reposition or kill.',
            ].map((step, index) => (
              <div key={step} className="flex gap-3 rounded-xl border border-white/[0.08] bg-black/20 p-4 text-sm text-white/50">
                <span className="font-mono text-cyan-200/40">{String(index + 1).padStart(2, '0')}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={startCheckout}
            disabled={checkoutUnavailable}
            aria-describedby="checkout-status"
            aria-busy={checkoutState === 'loading'}
            className="mt-10 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-white px-8 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:-translate-y-0.5 hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {checkoutState === 'loading' ? 'Opening checkout…' : 'Start with ACOS — €99'}
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-5 text-xs text-white/30">
            Secure Stripe checkout · One-time purchase · Delivery by email
          </p>
        </div>
      </section>
    </div>
  )
}
