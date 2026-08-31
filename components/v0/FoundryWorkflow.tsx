'use client'

import { useState } from 'react'
import { Blocks, BookOpen, ChartNoAxesCombined, Rocket, ScanSearch, ShieldCheck } from 'lucide-react'

const workflow = [
  {
    title: 'Write the brief',
    note: 'Name the audience and the decision the product must make easier.',
    decision: 'Who is this for, and what do they need to decide today?',
    artifact: 'A typed product manifest with audience, promise, proof, and primary action.',
    gate: 'The proposition survives the name-swap and concrete-anchor tests.',
    modules: ['Audience', 'Offer', 'Proof'],
    icon: BookOpen,
  },
  {
    title: 'Compose the kernel',
    note: 'Select only the shared modules this business actually needs.',
    decision: 'Which capabilities belong in the common kernel, and which stay vertical?',
    artifact: 'Identity, content, capture, commerce, delivery, and analytics modules.',
    gate: 'No unused integration or generic dashboard surface enters the build.',
    modules: ['Identity', 'Content', 'Commerce'],
    icon: Blocks,
  },
  {
    title: 'Prototype the interface',
    note: 'Use v0 where visual iteration compounds, then keep the source reviewable.',
    decision: 'Which workflow deserves a live interface before we write the full product?',
    artifact: 'A repo-backed visual study with explicit provenance and ownership.',
    gate: 'The interface demonstrates a real task instead of decorating a category.',
    modules: ['v0', 'Next.js', 'Design tokens'],
    icon: ScanSearch,
  },
  {
    title: 'Prove the release',
    note: 'Make every maturity label answerable with evidence.',
    decision: 'What would fail for a real user, and how do we observe it?',
    artifact: 'States, tests, security checks, visual proof, and a rollback target.',
    gate: 'A verifier who did not make the surface can reproduce the result.',
    modules: ['States', 'Tests', 'Review'],
    icon: ShieldCheck,
  },
  {
    title: 'Release the product',
    note: 'Ship through Git, preview, approval, and one controlled production promotion.',
    decision: 'Is this a study, remixable source, or a deployable product?',
    artifact: 'A public repository, Vercel deployment, setup guide, and release receipt.',
    gate: 'The production commit, URL, checks, and exact rollback all agree.',
    modules: ['GitHub', 'Vercel', 'Receipt'],
    icon: Rocket,
  },
  {
    title: 'Learn from use',
    note: 'Measure activation and completion—not vanity interaction.',
    decision: 'Where does a real person stop, succeed, return, or ask for help?',
    artifact: 'A small event model tied to the product’s decisive workflow.',
    gate: 'The next iteration follows observed friction, not another aesthetic trend.',
    modules: ['Events', 'Activation', 'Retention'],
    icon: ChartNoAxesCombined,
  },
] as const

export function FoundryWorkflow() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = workflow[activeIndex]
  const ActiveIcon = active.icon

  return (
    <section id="workflow" className="border-b border-white/10 bg-[#0c0f0d] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[11px] tracking-[0.12em] text-lime-300/75">The build workflow</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
              One kernel. Six decisions.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/50">
              The system does not start with a theme. It starts with the decision, composes the
              smallest useful product, and refuses a release claim without proof.
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#111411]">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="border-b border-white/10 p-3 lg:border-b-0 lg:border-r lg:p-4">
                <div className="flex gap-2 overflow-x-auto lg:block" role="tablist" aria-label="Product build workflow">
                  {workflow.map((step, index) => {
                    const Icon = step.icon
                    const selected = activeIndex === index
                    return (
                      <button
                        key={step.title}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActiveIndex(index)}
                        className={`min-w-[210px] rounded-[1.1rem] p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 lg:mb-1 lg:min-w-0 lg:w-full ${selected ? 'bg-white/[0.07] text-white' : 'text-white/42 hover:bg-white/[0.035] hover:text-white/72'}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`grid h-8 w-8 place-items-center rounded-full border ${selected ? 'border-lime-300/40 text-lime-300' : 'border-white/10 text-white/35'}`}>
                            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          <span>
                            <span className="block font-mono text-[9px] text-white/30">Step {index + 1}</span>
                            <span className="mt-1 block text-sm font-semibold">{step.title}</span>
                          </span>
                        </span>
                        <span className="mt-3 block text-xs leading-5 text-white/38">{step.note}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10" role="tabpanel">
                <div className="flex items-center justify-between gap-5">
                  <div className="grid h-11 w-11 place-items-center rounded-full border border-lime-300/30 bg-lime-300/[0.07] text-lime-300">
                    <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] text-white/30">{activeIndex + 1} / {workflow.length}</span>
                </div>
                <h3 className="mt-8 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{active.title}</h3>
                <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  <div className="py-5">
                    <dt className="font-mono text-[10px] text-cyan-300/65">Decision</dt>
                    <dd className="mt-3 text-base leading-7 text-white/72">{active.decision}</dd>
                  </div>
                  <div className="py-5">
                    <dt className="font-mono text-[10px] text-cyan-300/65">Working artifact</dt>
                    <dd className="mt-3 text-sm leading-6 text-white/55">{active.artifact}</dd>
                  </div>
                  <div className="py-5">
                    <dt className="font-mono text-[10px] text-cyan-300/65">Release gate</dt>
                    <dd className="mt-3 text-sm leading-6 text-white/55">{active.gate}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.modules.map((module) => (
                    <span key={module} className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/48">
                      {module}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
