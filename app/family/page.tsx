import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpenText,
  FileSearch,
  HeartHandshake,
  LockKeyhole,
  MessageCircleQuestion,
  ShieldCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Riemer–Gorte Living Archive',
  description:
    'A privacy-first founding case for preserving family stories, evidence, questions, and continuity across generations.',
  alternates: { canonical: '/family' },
  robots: { index: true, follow: true },
}

const archivePrinciples = [
  {
    title: 'Claims, not family lore presented as fact',
    description: 'Every relationship, date, and event keeps its source, uncertainty, reviewer, and dispute history.',
    icon: FileSearch,
  },
  {
    title: 'Living people stay private by default',
    description: 'A public family story is a separate, consented publication—not a mirror of the private archive.',
    icon: LockKeyhole,
  },
  {
    title: 'Human stewards retain authority',
    description: 'AI may transcribe and compare. It cannot accept lineage, contact relatives, publish, or release access.',
    icon: ShieldCheck,
  },
]

const contributions = [
  ['One elder', 'Record a conversation about a place, tradition, turning point, or lesson before it disappears.'],
  ['One document', 'Identify a letter, photograph, certificate, recipe, or recording and preserve its provenance.'],
  ['One open question', 'Name a relationship, location, spelling, or date that the family has never resolved.'],
] as const

export default function FamilyArchivePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080b0d] text-[#f4efe5]">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(79,146,117,0.18),transparent_34%),radial-gradient(circle_at_18%_86%,rgba(198,151,78,0.12),transparent_28%)]" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-32 lg:grid-cols-[1.12fr_.88fr] lg:items-end lg:px-10 lg:pb-32 lg:pt-40">
          <div>
            <p className="mb-6 text-sm font-semibold text-emerald-300">A founding archive, built in public with private boundaries</p>
            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              The Riemer–Gorte Living Archive
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
              A long-term effort to preserve family stories, documents, knowledge, and unresolved connections—without turning living relatives into public content.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#contribute" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#e7d7b2] px-5 py-3 text-sm font-semibold text-[#111617] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                See how to contribute <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/family-intelligence-system" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-stone-200 transition hover:border-white/35 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                Explore the reusable system
              </Link>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-emerald-300/20 bg-[#101719]/90 p-6 shadow-2xl shadow-black/30 sm:p-8" aria-label="Public archive boundary">
            <div className="flex items-center gap-3 text-emerald-300">
              <ShieldCheck className="h-6 w-6" aria-hidden />
              <span className="font-semibold">Public boundary</span>
            </div>
            <p className="mt-6 text-2xl font-semibold tracking-tight text-white">No private family tree lives on this page.</p>
            <p className="mt-3 leading-7 text-stone-400">
              Names of living relatives, children, contact details, private records, and unreviewed allegations remain outside the public archive. Search indexing is not access control; the private portal uses authentication.
            </p>
            <div className="mt-7 border-t border-white/10 pt-5 text-sm leading-6 text-stone-500">
              Secure evidence intake will open only after malware scanning, consent receipts, deletion, and steward review are operational.
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="text-sm font-semibold text-amber-300">The method</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Preserve what matters without pretending certainty.</h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-3">
            {archivePrinciples.map((principle) => (
              <article key={principle.title} className="bg-[#0d1214] p-7">
                <principle.icon className="h-6 w-6 text-emerald-300" aria-hidden />
                <h3 className="mt-8 text-xl font-semibold tracking-tight text-white">{principle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-400">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contribute" className="border-y border-white/10 bg-[#0b1012]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-emerald-300">The invitation</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-6xl">Bring one elder, one document, or one unresolved connection.</h2>
            <p className="mt-6 text-lg leading-8 text-stone-400">Start with context, not sensitive attachments. The archive steward will explain a safe next step after the secure intake is ready.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {contributions.map(([title, description], index) => (
              <article key={title} className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
                <span className="font-mono text-xs text-stone-600">0{index + 1}</span>
                <h3 className="mt-8 text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-3 leading-7 text-stone-400">{description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-[#0a1210] transition hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Share non-sensitive context <MessageCircleQuestion className="h-4 w-4" aria-hidden />
            </Link>
            <p className="max-w-xl text-sm leading-6 text-stone-500">Do not send passports, DNA files, health information, passwords, precise addresses, or unredacted civil records through the contact form.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
        <article className="rounded-[1.75rem] border border-white/10 bg-[#111719] p-8 sm:p-10">
          <BookOpenText className="h-7 w-7 text-amber-300" aria-hidden />
          <h2 className="mt-8 text-3xl font-semibold tracking-tight text-white">A public method for every family</h2>
          <p className="mt-4 leading-7 text-stone-400">Protocols, schemas, skills, and reference code are being developed openly. Customer and family data never belongs in the public repositories.</p>
          <Link href="/family-intelligence-system/download" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-amber-200 hover:text-white">
            Download the starter kit <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </article>
        <article className="rounded-[1.75rem] border border-white/10 bg-[#111719] p-8 sm:p-10">
          <HeartHandshake className="h-7 w-7 text-emerald-300" aria-hidden />
          <h2 className="mt-8 text-3xl font-semibold tracking-tight text-white">A private portal for the actual family</h2>
          <p className="mt-4 leading-7 text-stone-400">The German family portal is a separate authenticated surface. It organizes consent, family circles, claims, memories, and continuity without exposing them here.</p>
          <Link href="/familie" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 hover:text-white">
            Zum privaten Familienportal <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </article>
      </section>
    </main>
  )
}
