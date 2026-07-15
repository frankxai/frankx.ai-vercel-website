import Link from 'next/link'
import { ArrowRight, Check, Cloud, Cpu, Database, Laptop, Network, Server, ShieldCheck, X } from 'lucide-react'
import type { HardwareCategory, HardwareCategoryCluster } from '@/lib/hardware-intelligence/types'
import { HARDWARE_REVIEWED_AT } from '@/data/hardware-intelligence'

const clusterMeta: Record<HardwareCategoryCluster, { label: string; icon: typeof Cpu; accent: string }> = {
  local: { label: 'Owned local compute', icon: Laptop, accent: 'text-emerald-300' },
  infrastructure: { label: 'Physical infrastructure', icon: Server, accent: 'text-cyan-300' },
  access: { label: 'Rented capacity', icon: Cloud, accent: 'text-blue-300' },
  edge: { label: 'Edge inference', icon: Database, accent: 'text-amber-200' },
  planning: { label: 'System planning', icon: Network, accent: 'text-violet-300' },
}

export default function HardwareCategoryPage({ category }: { category: HardwareCategory }) {
  const meta = clusterMeta[category.cluster]
  const Icon = meta.icon

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.06] px-5 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-40">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(ellipse_at_72%_10%,rgba(6,182,212,0.1),transparent_52%),radial-gradient(ellipse_at_18%_16%,rgba(16,185,129,0.07),transparent_46%)]" />
          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-white/35" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-white">FrankX</Link>
            <span>/</span>
            <Link href="/ai-hardware" className="transition-colors hover:text-white">AI Hardware</Link>
            <span>/</span>
            <span className="text-white/60">{category.shortTitle}</span>
          </nav>
          <div className="mt-12 grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className={`flex items-center gap-2 text-sm ${meta.accent}`}><Icon className="h-4 w-4" /><span>{meta.label}</span></div>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{category.title}</h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/55 sm:text-xl">{category.summary}</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 sm:p-7">
              <p className="text-xs text-white/35">Start with this decision</p>
              <p className="mt-4 text-xl leading-8 text-white/85">{category.firstDecision}</p>
              <div className="mt-7 border-t border-white/[0.07] pt-5 text-sm leading-6 text-white/45">Reviewed {HARDWARE_REVIEWED_AT}. Capability guidance is separated from volatile seller pricing.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className={`text-sm font-medium ${meta.accent}`}>{category.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white">What this category means.</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div><p className="text-xs text-white/30">Definition</p><p className="mt-3 text-base leading-7 text-white/65">{category.definition}</p></div>
            <div><p className="text-xs text-white/30">Built for</p><p className="mt-3 text-base leading-7 text-white/65">{category.audience}</p></div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.015] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.07] lg:grid-cols-2">
          <div className="bg-[#0d0d0f] p-7 sm:p-9">
            <div className="flex items-center gap-3 text-emerald-300"><Check className="h-5 w-5" /><h2 className="text-lg font-semibold text-white">Choose this when</h2></div>
            <ul className="mt-8 space-y-4">{category.chooseWhen.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/55"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300/60" />{item}</li>)}</ul>
          </div>
          <div className="bg-[#0d0d0f] p-7 sm:p-9">
            <div className="flex items-center gap-3 text-rose-300"><X className="h-5 w-5" /><h2 className="text-lg font-semibold text-white">Avoid this when</h2></div>
            <ul className="mt-8 space-y-4">{category.avoidWhen.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/55"><X className="mt-1 h-4 w-4 shrink-0 text-rose-300/55" />{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-emerald-300">Capability envelope</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">What it unlocks.</h2>
              <div className="mt-8 divide-y divide-white/[0.07] border-y border-white/[0.07]">{category.capabilities.map((item) => <div key={item} className="flex items-center gap-3 py-4 text-sm text-white/60"><Check className="h-4 w-4 text-emerald-300/60" />{item}</div>)}</div>
            </div>
            <div>
              <p className="text-sm font-medium text-amber-200">Operating boundary</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">What it does not solve.</h2>
              <div className="mt-8 divide-y divide-white/[0.07] border-y border-white/[0.07]">{category.limitations.map((item) => <div key={item} className="flex items-center gap-3 py-4 text-sm text-white/60"><ShieldCheck className="h-4 w-4 text-amber-200/60" />{item}</div>)}</div>
            </div>
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div><p className="text-sm font-medium text-cyan-300">Before you buy</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">Questions that change the architecture.</h2></div>
            <ol className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
              {category.decisionQuestions.map((question, index) => <li key={question} className="bg-[#0d0d0f] p-6"><span className="font-mono text-xs text-white/25">0{index + 1}</span><p className="mt-6 text-base leading-7 text-white/70">{question}</p></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.015] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium text-violet-300">Continue the decision</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.035em]">Move to the next layer, not another generic comparison.</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 lg:grid-cols-4">
            {category.nextRoutes.map((route) => (
              <Link key={route.href} href={route.href} className="group bg-[#0d0d0f] p-6 transition-colors hover:bg-white/[0.035]">
                <div className="flex items-center justify-between"><span className="text-base font-semibold text-white">{route.label}</span><ArrowRight className="h-4 w-4 text-white/25 transition-transform group-hover:translate-x-1 group-hover:text-white/60" /></div>
                <p className="mt-4 text-sm leading-6 text-white/40">{route.reason}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.62fr_1.38fr]">
          <div><p className="text-sm font-medium text-cyan-300">Direct answers</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">Category questions.</h2></div>
          <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">{category.faq.map((item) => <div key={item.question} className="py-6"><h3 className="text-base font-medium text-white">{item.question}</h3><p className="mt-3 text-sm leading-7 text-white/50">{item.answer}</p></div>)}</div>
        </div>
      </section>
    </main>
  )
}
