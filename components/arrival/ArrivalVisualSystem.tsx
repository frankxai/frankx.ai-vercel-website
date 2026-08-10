/**
 * Arrival visual system — mechanism diagrams + composed sections.
 * Deterministic design (exact type). Atmosphere stills are separate assets.
 */
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export const arrivalLoop = [
  { n: '01', label: 'Aim', detail: 'One present-tense sentence. Specific. Difficult enough to matter.' },
  { n: '02', label: 'Obstacle', detail: 'Name the real block. Classify the Gate.' },
  { n: '03', label: 'Plan', detail: 'when-then tied to triggers in your actual day.' },
  { n: '04', label: 'Keystone', detail: '14-day experiment: prediction, evidence, accept, reset.' },
  { n: '05', label: 'Evidence', detail: 'Score facts. Keep, revise, or abandon — not vibes.' },
] as const

export function ArrivalLoopDiagram() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111113]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(240,198,116,0.12), transparent 55%)',
        }}
      />
      <div className="relative grid gap-0 md:grid-cols-5">
        {arrivalLoop.map((step, i) => (
          <div
            key={step.n}
            className={`relative border-white/10 p-5 md:border-r md:last:border-r-0 ${
              i < arrivalLoop.length - 1 ? 'border-b md:border-b-0' : ''
            }`}
          >
            <div className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-amber-200/70">
              {step.n}
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-white">
              {step.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">{step.detail}</p>
            {i < arrivalLoop.length - 1 && (
              <div className="pointer-events-none absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 md:block">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-400/30 bg-[#0a0a0b] text-amber-200/80">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="relative border-t border-white/10 px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/35">
        Mechanism · not magic · one loop
      </div>
    </div>
  )
}

export function ActionPrimeStrip() {
  const steps = [
    'Target behavior',
    'Likely obstacle',
    'when-then',
    'Rehearse first step',
    'Calendar-block',
  ]
  return (
    <ol className="grid gap-3 sm:grid-cols-5">
      {steps.map((label, idx) => (
        <li
          key={label}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 font-mono text-xs font-bold text-amber-100">
            {idx + 1}
          </div>
          <p className="mt-3 text-sm font-medium leading-snug text-white/80">{label}</p>
        </li>
      ))}
    </ol>
  )
}

export function KeystoneContractCard() {
  const fields = [
    ['Act', 'The irreversible / binary shipped thing'],
    ['Deadline', '≤ 14 days from Day 7'],
    ['Prediction', 'What should be true if this works'],
    ['Evidence', 'Leading facts you will collect'],
    ['Acceptance', 'Pass / fail test a stranger could score'],
    ['Reset / abandon', 'Rules if failing mid-run or at deadline'],
  ] as const
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-amber-400/25 bg-gradient-to-br from-amber-400/[0.07] to-transparent">
      <div className="border-b border-white/10 px-6 py-4">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-amber-200/70">
          Keystone · 14-day experiment contract
        </p>
        <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">
          Not a vibe. A scored act.
        </h3>
      </div>
      <dl className="divide-y divide-white/10">
        {fields.map(([k, v]) => (
          <div key={k} className="grid gap-1 px-6 py-4 sm:grid-cols-[9rem_1fr] sm:items-baseline">
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-amber-200/60">{k}</dt>
            <dd className="text-sm text-white/65">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function GateClassifierVisual({
  items,
}: {
  items: { name: string; move: string }[]
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
      <div className="relative min-h-[240px] overflow-hidden rounded-[1.75rem] border border-white/10">
        <Image
          src="/images/arrival/gates-agy.png"
          alt="Architectural corridor with sequential light apertures — Gate classifier metaphor"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/30 to-transparent" />
        <p className="absolute bottom-4 left-4 right-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/70">
          Five apertures · one class · one next move
        </p>
      </div>
      <div className="space-y-2">
        {items.map((g, i) => (
          <div
            key={g.name}
            className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 font-mono text-xs text-amber-200/80">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{g.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/50">{g.move}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function KeystoneSplit({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-center">
      <div>{children}</div>
      <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111113]">
        <Image
          src="/images/arrival/keystone-agy.png"
          alt="Precision-machined brass keystone locking dark architectural blocks"
          fill
          className="object-cover p-6"
          sizes="(max-width: 1024px) 90vw, 360px"
        />
      </div>
    </div>
  )
}

export function FamilyLadder({
  cards,
}: {
  cards: {
    title: string
    status: string
    body: string
    href: string
    external?: boolean
  }[]
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const className =
          'group flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 transition hover:border-amber-400/25 hover:bg-white/[0.05]'
        const inner = (
          <>
            <div className="mb-3 font-mono text-[0.65rem] font-medium uppercase tracking-[0.2em] text-amber-200/55">
              {card.status}
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-amber-50">{card.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">{card.body}</p>
            <div className="mt-4 text-xs font-medium text-white/35 transition group-hover:text-amber-200/80">
              Open →
            </div>
          </>
        )
        if (card.external) {
          return (
            <a key={card.title} href={card.href} target="_blank" rel="noreferrer" className={className}>
              {inner}
            </a>
          )
        }
        if (card.href.startsWith('#')) {
          return (
            <a key={card.title} href={card.href} className={className}>
              {inner}
            </a>
          )
        }
        return (
          <Link key={card.title} href={card.href} className={className}>
            {inner}
          </Link>
        )
      })}
    </div>
  )
}

export function ForNotFor({
  yes,
  no,
}: {
  yes: string[]
  no: string[]
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/[0.04] p-7">
        <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-emerald-300/70">For</p>
        <h2 className="font-display text-2xl font-bold tracking-tight">Who this is for</h2>
        <ul className="mt-5 space-y-3">
          {yes.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/65">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7">
        <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/40">Not for</p>
        <h2 className="font-display text-2xl font-bold tracking-tight">Clear exclusions</h2>
        <ul className="mt-5 space-y-3">
          {no.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/50">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
