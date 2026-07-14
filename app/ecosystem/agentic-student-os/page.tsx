import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, BookOpenCheck, Braces, FileSearch, GraduationCap, ShieldCheck } from 'lucide-react'
import BlueprintStarter from '@/components/ecosystem/BlueprintStarter'

export const metadata: Metadata = {
  title: 'Agentic Student OS | FrankX',
  description:
    'A public blueprint for controlling sources, feedback, project state, and review across technical study, evidence review, and thesis work.',
  alternates: { canonical: 'https://frankx.ai/ecosystem/agentic-student-os' },
}

const operatingLoop = [
  ['Capture', 'Collect the assignment, sources, feedback, repository state, and open questions without losing provenance.'],
  ['Structure', 'Separate evidence, interpretation, implementation, uncertainty, and the next review decision.'],
  ['Produce', 'Work in bounded slices that leave an inspectable draft, test, table, or argument behind.'],
  ['Review', 'Compare the result with the rubric, source record, and human feedback before expanding scope.'],
]

export default function AgenticStudentOSPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50">
      <section className="relative overflow-hidden border-b border-white/[0.08] pt-24 sm:pt-28">
        <div className="absolute inset-x-0 top-0 h-px bg-emerald-300/40" aria-hidden="true" />
        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <Link
            href="/ecosystem"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg text-sm text-zinc-500 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Operating systems
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-md border border-emerald-400/25 bg-emerald-400/[0.08] px-2.5 py-1 text-emerald-200">
              Public blueprint
            </span>
            <span className="text-zinc-500">Not yet packaged as a standalone application</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Agentic Student OS
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-zinc-300">
            A reviewable study system for demanding work, not an essay generator.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            It keeps the assignment, sources, repository state, feedback, uncertainty, and next decision connected so serious learning
            survives contact with real projects.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#starter" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200">
              Build a first-week plan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/ecosystem/research-intelligence-os" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/[0.14] px-4 py-2.5 text-sm font-medium text-zinc-200 hover:border-white/[0.28] hover:bg-white/[0.04]">
              Inspect the research substrate
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-medium text-emerald-300">The operating problem</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              The work is scattered before it is difficult.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-zinc-400">
            <p>
              A serious student is already operating a system: lectures in one place, papers in another, code in a repository, feedback
              in email, and the real next step held in memory. The failure is rarely access to another model. It is loss of state.
            </p>
            <p>
              Student OS makes that state explicit. The agent can retrieve, organize, compare, question, and prepare. The student still
              owns the argument, implementation, interpretation, and submission.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#0d0d0f] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-zinc-500">The loop</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Every cycle leaves evidence behind.
            </h2>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">
            {operatingLoop.map(([title, copy], index) => (
              <li key={title} className="min-h-[180px] bg-[#0d0d0f] p-6 sm:p-7">
                <span className="font-mono text-xs text-emerald-300">0{index + 1}</span>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-emerald-300">Three demanding contexts</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              The same control loop, adapted to the evidence.
            </h2>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="border-t border-emerald-400/35 pt-6">
              <Braces className="h-6 w-6 text-emerald-300" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold text-white">Technical projects</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Requirements, architecture decisions, repository state, tests, failures, and implementation evidence stay connected.
              </p>
            </div>
            <div className="border-t border-cyan-400/35 pt-6">
              <FileSearch className="h-6 w-6 text-cyan-300" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold text-white">Evidence review</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Search dates, inclusion criteria, source methods, limitations, disagreement, and uncertainty remain reproducible.
              </p>
            </div>
            <div className="border-t border-violet-400/35 pt-6">
              <GraduationCap className="h-6 w-6 text-violet-300" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold text-white">Thesis work</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Research questions, claim maps, drafts, citations, supervisor feedback, and defense questions evolve together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BlueprintStarter kind="student" />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="border-l border-emerald-400/35 pl-6">
            <BookOpenCheck className="h-6 w-6 text-emerald-300" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-semibold text-white">What counts as proof</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              A source record, test output, reviewable draft, uncertainty log, rubric comparison, or supervisor question tied to the actual work.
            </p>
          </div>
          <div className="border-l border-amber-400/35 pl-6">
            <ShieldCheck className="h-6 w-6 text-amber-300" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-semibold text-white">What stays human</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Academic integrity, authorship, clinical or legal judgment, interpretation, citation responsibility, and the final decision to submit.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
