import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  Cloud,
  Download,
  FileCheck2,
  GitBranch,
  LockKeyhole,
  Scale,
  ShieldCheck,
  PanelsTopLeft,
  UsersRound,
} from 'lucide-react'
import FamilyPrivacyPlanner from '@/components/family-intelligence/FamilyPrivacyPlanner'

export const metadata: Metadata = {
  title: 'Family Intelligence System',
  description: 'Open, privacy-first infrastructure for family memory, evidence, consent, coordination, and continuity.',
  alternates: {
    canonical: '/family-intelligence-system',
    languages: { en: '/family-intelligence-system', de: '/familien-intelligenz-system' },
  },
  robots: { index: true, follow: true },
}

const trustChain = [
  ['01', 'Claim', 'What someone says'],
  ['02', 'Evidence', 'What supports it'],
  ['03', 'Consent', 'Who permits each use'],
  ['04', 'Steward', 'Who decides'],
  ['05', 'Scope', 'Who may see it'],
] as const

const surfaces = [
  ['Personal Hub', 'Private memories, documents, preferences, and instructions controlled by one person.', LockKeyhole],
  ['Family Vault', 'Shared, accepted knowledge with sources, scopes, responsibilities, and export.', BookOpenText],
  ['Steward Console', 'Claims, conflicts, consent, redaction, access requests, and human decisions.', FileCheck2],
  ['Public Archive', 'Only deliberately published stories and evidence—never an automatic mirror.', UsersRound],
  ['Continuity', 'Separate protocols for emergency, incapacity, and death with guardian quorum.', ShieldCheck],
] as const

const invariants = [
  'No living person is public by default.',
  'No child data enters the public archive.',
  'AI never accepts lineage, contacts people, verifies death, or releases access.',
  'Every important answer cites its original source artifact.',
  'Every family can leave with a complete, encrypted export.',
  'Inactivity alone never triggers succession.',
] as const

export default function FamilyIntelligenceSystemPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080b0d] text-[#f4efe5]">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_16%,rgba(74,142,115,0.16),transparent_32%),linear-gradient(to_bottom,transparent,rgba(0,0,0,.18))]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-10 lg:pb-32 lg:pt-40">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/[0.06] px-3 py-1.5 text-xs font-semibold text-amber-100">
                <GitBranch className="h-3.5 w-3.5" aria-hidden /> Public foundation · early build
              </div>
              <h1 className="mt-7 max-w-5xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white sm:text-7xl lg:text-[5.8rem]">Your family needs more than a tree.</h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">Family Intelligence Infrastructure helps a family remember what matters, know what is supported, coordinate what must happen, and preserve access across generations.</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="#privacy-planner" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-[#0a1210] transition hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Plan a privacy scope <ArrowDown className="h-4 w-4" aria-hidden /></Link>
                <Link href="/family-intelligence-system/download" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-stone-200 transition hover:border-white/35 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">Download starter kit <Download className="h-4 w-4" aria-hidden /></Link>
              </div>
            </div>
            <aside className="rounded-[1.75rem] border border-white/10 bg-[#101719]/95 p-6 sm:p-8" aria-label="Trust chain">
              <p className="text-sm font-semibold text-stone-300">The governed knowledge chain</p>
              <div className="mt-6 space-y-1">
                {trustChain.map(([number, label, description]) => (
                  <div key={label} className="grid grid-cols-[2rem_1fr] gap-3 rounded-xl px-3 py-3 transition hover:bg-white/[0.035]">
                    <span className="font-mono text-xs text-emerald-300">{number}</span>
                    <div className="flex items-baseline justify-between gap-4"><strong className="text-sm text-white">{label}</strong><span className="text-right text-xs text-stone-500">{description}</span></div>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-stone-500">A family tree stores conclusions. This chain preserves how a conclusion became trustworthy and who may use it.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="text-sm font-semibold text-amber-300">The product surface</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">One system. Five deliberately separate rooms.</h2>
            <p className="mt-5 leading-7 text-stone-400">Private memory, shared family knowledge, public storytelling, and succession are related—but they are not the same permission boundary.</p>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {surfaces.map(([title, description, Icon], index) => (
              <article key={title} className="grid gap-5 py-6 sm:grid-cols-[3rem_12rem_1fr] sm:items-start">
                <span className="font-mono text-xs text-stone-600">0{index + 1}</span>
                <h3 className="flex items-center gap-3 text-lg font-semibold text-white"><Icon className="h-5 w-5 text-emerald-300" aria-hidden />{title}</h3>
                <p className="text-sm leading-6 text-stone-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="privacy-planner" className="border-y border-white/10 bg-[#0a0f11]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold text-emerald-300">Useful before signup</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-6xl">Find the smallest safe family circle.</h2>
            <p className="mt-5 text-lg leading-8 text-stone-400">Choose a content type and protection signals. The planner runs locally in your browser and returns a conservative next step.</p>
          </div>
          <FamilyPrivacyPlanner locale="en" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold text-rose-200">Non-negotiable</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Trust before convenience.</h2>
            <p className="mt-5 leading-7 text-stone-400">The system is valuable only if a vulnerable family member can safely say no, contest a claim, withdraw consent, and leave with their data.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {invariants.map((invariant) => (
              <div key={invariant} className="flex min-h-28 items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden />
                <p className="text-sm leading-6 text-stone-300">{invariant}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#111719]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-24 lg:grid-cols-3 lg:px-10 lg:py-28">
          <article className="lg:col-span-2">
            <p className="text-sm font-semibold text-amber-300">Reviewable protocols, private family data</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Adopt the method. Keep ownership of the archive.</h2>
            <p className="mt-5 max-w-2xl leading-7 text-stone-400">The doctrine and runtime are separate public repositories. Protocols, schemas, skills, reference agents, and deployment templates can be reviewed today. Real family records stay in the family’s private deployment. Reuse and redistribution terms remain subject to an explicit repository license decision.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://github.com/frankxai/family-intelligence-systems" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5">Systems repository <ArrowRight className="h-4 w-4" aria-hidden /></a>
              <a href="https://github.com/frankxai/family-intelligence-os" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5">Runtime repository <ArrowRight className="h-4 w-4" aria-hidden /></a>
              <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffrankxai%2Ffamily-intelligence-os&project-name=family-intelligence-portal&repository-name=family-intelligence-portal" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-300/25 px-5 py-3 text-sm font-semibold text-emerald-100 hover:bg-emerald-300/[0.06]"><Cloud className="h-4 w-4" aria-hidden />Deploy locked Vercel template</a>
              <a href="https://github.com/frankxai/family-intelligence-os/blob/main/templates/v0-family-portal/PROMPT.md" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-amber-200/20 px-5 py-3 text-sm font-semibold text-amber-100 hover:bg-amber-100/[0.05]"><PanelsTopLeft className="h-4 w-4" aria-hidden />Open v0 build prompt</a>
            </div>
          </article>
          <aside className="rounded-3xl border border-amber-200/20 bg-amber-100/[0.04] p-7">
            <Scale className="h-7 w-7 text-amber-200" aria-hidden />
            <h3 className="mt-7 text-2xl font-semibold text-white">Current maturity</h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">Foundation build: protocols, schemas, policy kernel, German portal shell, Vercel blueprint, v0 prompt, and starter kit. Hosted multi-family production is not yet open.</p>
            <Link href="/family" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-amber-100 hover:text-white">See the founding archive <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </aside>
        </div>
      </section>
    </main>
  )
}
