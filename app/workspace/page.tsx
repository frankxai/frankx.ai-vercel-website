import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileSearch,
  GitBranch,
  Scale,
  ShieldCheck,
  UserRoundCheck,
} from 'lucide-react'

import JsonLd, { HowToJsonLd } from '@/components/seo/JsonLd'
import { featuredWorkspaceCase } from '@/data/featured-workspace-case'
import { sitePositioning } from '@/data/site-positioning'
import { createMetadata, siteConfig } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'The Agentic Workspace',
  description:
    'See how Frank Riemer directs specialist AI agents to turn source material into reviewed research, book intelligence, architectures, guides, products, and partnership systems.',
  path: '/workspace',
  keywords: [
    'FrankX agentic workspace',
    'human-led multi-agent system',
    'agent research workflow',
    'AI content provenance',
    'agentic publishing workflow',
    'human AI collaboration',
  ],
  image: '/images/portraits/frank-presenting-oracle-2025.jpg',
})

const workspacePrinciples = [
  {
    title: 'The question has an owner',
    detail:
      'I set the problem, context, standards, and consequence before an agent begins. The system does not invent its own mandate.',
    Icon: UserRoundCheck,
  },
  {
    title: 'Agent roles stay bounded',
    detail:
      'Research, contradiction, architecture, implementation, editorial review, and verification are separate passes with different failure conditions.',
    Icon: Bot,
  },
  {
    title: 'Sources survive the synthesis',
    detail:
      'A strong page lets you distinguish source material, inference, my interpretation, and the decision I made from it.',
    Icon: FileSearch,
  },
  {
    title: 'Review can stop publication',
    detail:
      'Broken evidence, generic language, privacy risk, false partnership claims, or weak production proof can stop an otherwise polished release.',
    Icon: ShieldCheck,
  },
] as const

const reviewGates = [
  'Is the source real, current, and represented fairly?',
  'Which claims are facts, which are synthesis, and which are Frank’s judgment?',
  'Can a specific person use the result to decide, make, or build something?',
  'Does the language sound like Frank speaking to that person?',
  'Can the page, workflow, or product be inspected and rolled back?',
] as const

const workspaceSchema = {
  '@id': `${siteConfig.url}/workspace#page`,
  name: 'The FrankX Agentic Workspace',
  description:
    'A human-directed multi-agent workflow for turning source material into reviewed public work.',
  url: `${siteConfig.url}/workspace`,
  isPartOf: {
    '@id': `${siteConfig.url}/#website`,
  },
  about: {
    '@id': `${siteConfig.url}/#frank-riemer`,
  },
}

const howToData = {
  name: 'How the FrankX agentic workspace turns source material into public work',
  description:
    'Frank sets the direction, specialist agents run bounded research and production passes, and human review decides what is published.',
  steps: sitePositioning.workflow.map((step) => ({
    name: step.title,
    text: step.detail,
    url: `${siteConfig.url}/workspace#step-${step.number}`,
  })),
}

export default function WorkspacePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <JsonLd type="CollectionPage" data={workspaceSchema} id="workspace-page-schema" />
      <HowToJsonLd data={howToData} id="workspace-howto-schema" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(16,185,129,0.12),transparent_32%),radial-gradient(circle_at_12%_0%,rgba(6,182,212,0.07),transparent_28%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid min-h-[86svh] max-w-7xl items-center gap-14 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.03fr_0.97fr] lg:px-10">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-300/80">
              Inside the FrankX workspace
            </p>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              A question becomes useful
              <span className="block text-white/55">by surviving the passes.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              This worked example uses one published essay to show the source set, the specialist
              review, the disagreement that mattered, and the decision I made.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href={featuredWorkspaceCase.href}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
              >
                Open the published result
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#workflow"
                className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-white/72 underline decoration-white/25 underline-offset-8 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                See the four-stage method
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-5 max-w-2xl text-[11px] leading-5 text-white/50">
              {featuredWorkspaceCase.provenanceNote}
            </p>
          </div>

          <div className="relative w-full lg:justify-self-end">
            <div className="absolute -inset-8 bg-cyan-400/[0.07] blur-[90px]" aria-hidden="true" />
            <div className="relative rounded-[2rem] border border-cyan-300/15 bg-[#0d1111] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.4)] sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/75">
                {featuredWorkspaceCase.label}
              </p>
              <h2 className="mt-5 text-2xl font-semibold leading-snug">
                {featuredWorkspaceCase.title}
              </h2>
              <div className="mt-6 border-y border-white/[0.09]">
                <div className="py-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">
                    Source set
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    DeepMind’s delegation framework, WORKBank, Ulloa et al., a QJE field study,
                    and NIST’s active work on agent identity and authorization.
                  </p>
                </div>
                {featuredWorkspaceCase.passes.map((pass) => (
                  <div key={pass.role} className="border-t border-white/[0.08] py-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-300/75">
                      {pass.role}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/68">{pass.decision}</p>
                  </div>
                ))}
                <div className="border-t border-white/[0.08] py-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-300/80">
                    Frank’s decision
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/78">
                    {featuredWorkspaceCase.frankDecision}
                  </p>
                </div>
              </div>
              <Link
                href={featuredWorkspaceCase.href}
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-cyan-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {featuredWorkspaceCase.outputLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="scroll-mt-20 border-b border-white/[0.07] bg-white/[0.018] py-24 lg:py-32"
        aria-labelledby="workflow-title"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-300/70">
              Source to publication
            </p>
            <h2 id="workflow-title" className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Four stages. One accountable chain.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/65">
              The sequence is deliberately legible. A visitor should be able to see where the
              source ended, where an agent inferred, and where I made the decision.
            </p>
          </div>

          <ol className="mt-14 grid gap-4 lg:grid-cols-4">
            {sitePositioning.workflow.map((step) => (
              <li
                key={step.number}
                id={`step-${step.number}`}
                className="relative rounded-[1.5rem] border border-white/[0.1] bg-white/[0.025] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-cyan-300/80">{step.number}</span>
                  <GitBranch className="h-4 w-4 text-white/45" aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-24 lg:py-32" aria-labelledby="principles-title">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-300/70">
                Operating principles
              </p>
              <h2 id="principles-title" className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Scale the passes. Keep the judgment human.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-white/65">
                The point is not to hide automation behind a personal brand. It is to make the
                division of labor clear enough that the output can earn trust.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {workspacePrinciples.map(({ Icon, ...principle }) => (
                <article
                  key={principle.title}
                  className="rounded-[1.5rem] border border-white/[0.1] bg-white/[0.025] p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-300/[0.055] text-emerald-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">{principle.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0c0e0e] py-24" aria-labelledby="review-title">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div>
            <Scale className="h-6 w-6 text-cyan-300" aria-hidden="true" />
            <h2 id="review-title" className="mt-6 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              What the human review asks.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/65">
              Quality is not a final grammar pass. Review can change the thesis, reject the
              evidence, narrow the claim, or stop the release.
            </p>
          </div>
          <ul className="divide-y divide-white/[0.09] border-y border-white/[0.09]">
            {reviewGates.map((gate) => (
              <li key={gate} className="flex gap-4 py-5 text-base leading-7 text-white/72">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                {gate}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 lg:py-32" aria-labelledby="outputs-title">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-5 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-300/70">
                Public outputs
              </p>
              <h2 id="outputs-title" className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Follow the work that matches your question.
              </h2>
            </div>
            <Link
              href="/start"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white/72 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Choose a starting point
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="divide-y divide-white/[0.08]">
            {sitePositioning.currentWork.map((artifact) => (
              <article
                key={artifact.title}
                className="grid gap-4 py-7 sm:grid-cols-[0.28fr_1fr_auto] sm:items-center"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                  {artifact.type}
                </p>
                <div>
                  <h3 className="text-lg font-semibold">{artifact.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
                    {artifact.description}
                  </p>
                </div>
                <Link
                  href={artifact.href}
                  className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-emerald-300 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  {artifact.action}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
