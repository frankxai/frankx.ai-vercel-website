import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, Blocks, BrainCircuit, BriefcaseBusiness, LockKeyhole, ShieldCheck } from 'lucide-react'
import BlueprintStarter from '@/components/ecosystem/BlueprintStarter'

export const metadata: Metadata = {
  title: 'Agentic Life OS | FrankX',
  description:
    'The public blueprint for a private operator system connecting commitments, business, creative work, knowledge, and family-safe records.',
  alternates: { canonical: 'https://frankx.ai/ecosystem/agentic-life-os' },
}

const systemLayers = [
  {
    title: 'Core profile',
    copy: 'One typed contract defines modules, authority, verification commands, public boundaries, and the operating cadence.',
  },
  {
    title: 'Domain modules',
    copy: 'Business, creator, memory, and orchestration modules keep their own records and gates while sharing a command spine.',
  },
  {
    title: 'Private modules',
    copy: 'Health, finance, family, credentials, and personal memory remain isolated behind explicit access and human review.',
  },
  {
    title: 'Proof layer',
    copy: 'Every recurring loop names its inputs, owner, verification method, evidence path, and next review decision.',
  },
]

export default function AgenticLifeOSPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50">
      <section className="relative overflow-hidden border-b border-white/[0.08] pt-24 sm:pt-28">
        <div className="absolute inset-x-0 top-0 h-px bg-cyan-300/40" aria-hidden="true" />
        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <Link
            href="/ecosystem"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg text-sm text-zinc-500 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Operating systems
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-md border border-amber-400/25 bg-amber-400/[0.08] px-2.5 py-1 text-amber-200">
              Private operator suite
            </span>
            <span className="text-zinc-500">Public blueprint, private implementation</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Agentic Life OS
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-zinc-300">
            One private command spine for work, learning, administration, and the records worth keeping.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            The system connects bounded modules through a shared profile and review cadence. It does not put an agent in charge of your life;
            it makes commitments, evidence, authority, and the next decision visible.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#starter" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200">
              Build a first-week plan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/[0.14] px-4 py-2.5 text-sm font-medium text-zinc-200 hover:border-white/[0.28] hover:bg-white/[0.04]">
              Discuss a private implementation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-medium text-cyan-300">The operating problem</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Important state is distributed across tools and memory.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-zinc-400">
            <p>
              Calendars know the meetings but not the promise behind them. Notes remember the idea but not the decision it changed.
              Financial records show a transaction but not the question for an advisor. Family stories survive without provenance or disappear.
            </p>
            <p>
              Life OS creates a common operating contract while preserving domain boundaries. Shared context is deliberate. Private data is mounted
              only where it is needed. Every consequential action has a human gate.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#0d0d0f] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-zinc-500">System architecture</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Shared coordination without a shared data dump.
            </h2>
          </div>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">
            {systemLayers.map((layer, index) => (
              <li key={layer.title} className="min-h-[180px] bg-[#0d0d0f] p-6 sm:p-7">
                <span className="font-mono text-xs text-cyan-300">0{index + 1}</span>
                <h3 className="mt-5 text-lg font-semibold text-white">{layer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{layer.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-cyan-300">What becomes operational</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Workflows are connected by decisions, not by surveillance.
            </h2>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="border-t border-cyan-400/35 pt-6">
              <BriefcaseBusiness className="h-6 w-6 text-cyan-300" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold text-white">Operator work</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Commitments, recurring admin, business decisions, creative briefs, ownership, evidence, and weekly reviews.
              </p>
            </div>
            <div className="border-t border-violet-400/35 pt-6">
              <BrainCircuit className="h-6 w-6 text-violet-300" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold text-white">Knowledge and memory</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Source-backed notes, decisions, projects, people, questions, and durable records that remain retrievable.
              </p>
            </div>
            <div className="border-t border-amber-400/35 pt-6">
              <Blocks className="h-6 w-6 text-amber-300" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold text-white">Private domain modules</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Health, finance, family, and personal records use separate storage, authority, review, and publication rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BlueprintStarter kind="life" />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="border-l border-cyan-400/35 pl-6">
              <LockKeyhole className="h-6 w-6 text-cyan-300" aria-hidden="true" />
              <h2 className="mt-5 text-xl font-semibold text-white">Privacy is architectural</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Private memory is mounted, not embedded in public repositories. Modules receive the minimum context they need, and publication is a separate sanitized step.
              </p>
            </div>
            <div className="border-l border-amber-400/35 pl-6">
              <ShieldCheck className="h-6 w-6 text-amber-300" aria-hidden="true" />
              <h2 className="mt-5 text-xl font-semibold text-white">Authority stays human</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                No agent owns payments, bookings, health decisions, legal conclusions, family consent, customer sends, or irreversible account changes.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/[0.08] pt-8">
            <Link href="/starlight-intelligence-system" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200">
              Inspect the Starlight substrate
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/ecosystem" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 py-2.5 text-sm font-medium text-zinc-300 hover:text-white">
              Compare operating systems
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
