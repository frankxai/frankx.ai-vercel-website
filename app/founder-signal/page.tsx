import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Database,
  GitBranch,
  Layers3,
} from 'lucide-react'

import { ApplyForm } from '@/components/founder-signal/ApplyForm'
import { SignalScan } from '@/components/founder-signal/SignalScan'
import { DIMENSIONS } from '@/lib/founder-signal'
import { createMetadata, siteConfig } from '@/lib/seo'

const PATH = '/founder-signal'
const PAGE_URL = `${siteConfig.url}${PATH}`

export const metadata: Metadata = createMetadata({
  title: 'Founder Signal OS — Keep Your Voice While AI Scales Your Output',
  description:
    'A creator-owned intelligence layer that records what makes a founder irreplaceable and holds that line across every AI campaign. Run the free Founder Signal Scan, then apply for the pilot.',
  path: PATH,
  keywords: [
    'founder brand ai',
    'founder led marketing ai',
    'ai voice drift',
    'creator owned ai',
    'founder authority system',
    'personal brand ai infrastructure',
  ],
})

// Sentence-case, not all-caps chrome: matches the register the rest of the site
// moved to in #423.
const EYEBROW = 'text-sm font-medium text-tech-light'

const LAYER_ICONS = {
  origin: Database,
  judgment: BrainCircuit,
  voice: Layers3,
  compounding: GitBranch,
} as const

const SIGNAL_RECORD = `# signal/beliefs/pricing-refusal.yaml

claim: "I do not price by deliverable."
origin: 2019-retainer-collapse
evidence:
  - call/2026-03-11#t=00:14:22
  - post/why-i-stopped-quoting-hours
holds_when:   buyer asks for a rate card
breaks_when:  procurement requires line items

voice:
  phrasing: "You are not buying hours. You are
             buying the call I make at hour three."
  never:    "flexible pricing options"

approval: human`

const PILOT = [
  {
    title: 'Listen',
    detail:
      'Two sessions and an archive sweep. Your talks, calls, drafts, and dead ends become a sourced record instead of a personality summary. Nothing synthetic enters at this stage.',
  },
  {
    title: 'Model',
    detail:
      'That record becomes an authority graph: beliefs, mechanisms, refusals, proof, and the contradictions you have earned the right to hold. Averaging is the failure mode, so nothing gets smoothed.',
  },
  {
    title: 'Activate',
    detail:
      'One real campaign runs on top of it. Thesis, sequence, and distribution brief all generate from the same governed source, and every publish still passes through you.',
  },
  {
    title: 'Compound',
    detail:
      'Replies, objections, and conversions feed back into the graph. Month six is sharper than month one because the system learned, not because you worked more hours.',
  },
] as const

const PROOF_STACK = [
  {
    name: 'Creator Intelligence System',
    description:
      'The six-layer substrate for research, strategy, production, distribution, and learning. The creator holds the audience model, the voice record, and the performance history.',
    href: 'https://github.com/frankxai/creator-intelligence-system',
  },
  {
    name: 'Agentic Creator OS',
    description:
      'The execution layer: skills, workflows, specialist agents, and safety hooks that run inside Claude Code, Codex, Cursor, and Gemini rather than a closed product.',
    href: 'https://github.com/frankxai/agentic-creator-os',
  },
  {
    name: 'Starlight Intelligence System',
    description:
      'Sovereign memory and governance across the agent fleet, so decisions and source material outlive any single tool or session.',
    href: 'https://github.com/frankxai/Starlight-Intelligence-System',
  },
  {
    name: 'Agentic Operating System Standard',
    description:
      'The public specification the architecture answers to: portable modules, explicit approval gates, evidence trails, and creator-owned state.',
    href: 'https://github.com/frankxai/agentic-operating-system-standard',
  },
] as const

const HUMAN_ONLY = [
  'Deciding what you actually believe',
  'Choosing which clients to refuse',
  'Saying the thing that costs you something',
  'Approving anything published in your name',
] as const

function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': PAGE_URL,
        name: 'Founder Signal OS',
        url: PAGE_URL,
        description:
          'A creator-owned intelligence layer that records what makes a founder irreplaceable and holds that line across AI campaigns.',
        isPartOf: { '@type': 'WebSite', name: 'FrankX', url: siteConfig.url },
        author: { '@type': 'Person', name: 'Frank Riemer', url: siteConfig.url },
      },
      {
        '@type': 'Service',
        name: 'Founder Signal OS pilot',
        serviceType: 'Founder authority intelligence architecture',
        provider: { '@type': 'Person', name: 'Frank Riemer', url: siteConfig.url },
        areaServed: 'Worldwide',
        url: PAGE_URL,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function FounderSignalPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-void text-white">
      <JsonLd />

      <section className="relative border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech-light/70 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-tech-primary/10 blur-[140px]"
        />

        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <p className={`${EYEBROW} mb-6`}>Founder Signal OS</p>
            <h1 className="font-display text-4xl font-bold leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
              Your voice is the moat.
              <br />
              Most AI stacks average it away.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
              A creator-owned intelligence layer that records what makes you
              irreplaceable and holds that line across every campaign your agents
              touch.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#apply"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-tech-light px-6 py-3.5 text-sm font-semibold text-void transition hover:bg-white active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                Apply for the pilot
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#pilot"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                See how it runs
              </Link>
            </div>
          </div>

          <div id="scan" className="scroll-mt-24">
            <SignalScan applyHref="#apply" />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <p className={`${EYEBROW} mb-5`}>The problem</p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            A tone-of-voice document is a description of you. The model needs the
            evidence.
          </h2>
          <p className="mt-7 text-lg leading-8 text-white/65">
            Ask any competent model to write as a founder and it reaches for the
            category. It has read ten thousand people in your position and it
            returns the median of all of them, in your font. That is why AI output
            feels close enough to ship and never sounds like the person who built
            the thing.
          </p>
          <p className="mt-5 text-lg leading-8 text-white/65">
            Sabrina Stocker&apos;s Impossibly Human thesis names the problem
            correctly: the founder is the brand, and the least copyable thing is
            the human. This is the infrastructure question underneath it. What has
            to be written down, and who has to own it, for that to survive contact
            with an agent fleet?
          </p>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
            <div className="bg-void p-7 sm:p-8">
              <p className="text-sm font-semibold text-white/50">
                What a brand guide captures
              </p>
              <p className="mt-4 text-[15px] leading-7 text-white/60">
                Adjectives. Three tone words. A list of phrases to avoid. Enough
                for a freelancer to sound plausible for one campaign.
              </p>
            </div>
            <div className="bg-void p-7 sm:p-8">
              <p className="text-sm font-semibold text-tech-light">
                What a signal record captures
              </p>
              <p className="mt-4 text-[15px] leading-7 text-white/75">
                The argument you lost that changed your mind. The client you fired
                and why. The sentence you keep repeating because it keeps working.
                Retrievable, attributable, yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-24 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <p className={`${EYEBROW} mb-5`}>What gets recorded</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              One belief, written so a machine can honor it.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/60">
              Not a summary of your personality. A specific claim, where it came
              from, the evidence behind it, the conditions under which it holds,
              your actual phrasing, and what an agent is never allowed to say
              instead.
            </p>
            <p className="mt-5 text-base leading-7 text-white/60">
              A few hundred records like this is the difference between a model
              impersonating you and a model working for you.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-space">
            <div className="border-b border-white/10 px-5 py-3">
              <p className="font-mono text-xs text-white/55">authority-graph</p>
            </div>
            <pre className="overflow-x-auto px-5 py-6 font-mono text-[12.5px] leading-6 text-white/75 sm:px-7 sm:text-[13px]">
              <code>{SIGNAL_RECORD}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <p className={`${EYEBROW} mb-5`}>The four layers</p>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Four layers, because there are four ways a founder gets flattened.
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-6">
            {DIMENSIONS.map((dimension, index) => {
              const Icon = LAYER_ICONS[dimension.id]
              // First and last cells run wide so the grid has rhythm rather than
              // four identical tiles.
              const wide = index === 0 || index === DIMENSIONS.length - 1
              return (
                <article
                  key={dimension.id}
                  className={[
                    'h-full rounded-3xl border border-white/10 p-7 sm:p-8',
                    wide
                      ? 'bg-gradient-to-br from-space to-void lg:col-span-4'
                      : 'bg-space lg:col-span-2',
                  ].join(' ')}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-void text-tech-light">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-7 font-display text-xl font-bold tracking-tight text-white">
                    {dimension.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-white/70">
                    {dimension.premise}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-white/60">
                    {dimension.failure}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="pilot" className="scroll-mt-24 border-b border-white/10 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <p className={`${EYEBROW} mb-5`}>The pilot</p>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            One founder. One live campaign. Six weeks.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/60">
            The pilot runs underneath something already scheduled, because a
            system that only works on a sample never survives a real deadline.
          </p>

          <ol className="mt-14 space-y-px overflow-hidden rounded-3xl border border-white/10 bg-white/10">
            {PILOT.map((step) => (
              <li
                key={step.title}
                className="grid gap-4 bg-void px-7 py-8 sm:grid-cols-[13rem_1fr] sm:gap-8 sm:px-9 sm:py-9"
              >
                <h3 className="font-display text-lg font-bold tracking-tight text-tech-light">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-7 text-white/65">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-white/10 py-24 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8">
          <div>
            <p className={`${EYEBROW} mb-5`}>The boundary</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The line the system will not cross.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/60">
              Delegation without a boundary is just slower replacement. These stay
              with you, and the architecture is built to make that enforceable
              rather than aspirational.
            </p>
          </div>

          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {HUMAN_ONLY.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-space px-6 py-7 text-[15px] font-medium leading-6 text-white/85"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-white/60">
              Everything else is research, recall, drafting, sequencing, and
              distribution. That is the part worth automating, and it is most of
              the hours.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <p className={`${EYEBROW} mb-5`}>Open proof</p>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The stack is already public. Read it before you talk to me.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/60">
            These are repositories, not slides. Fork them, run them, or decide
            from the source that this is not for you.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {PROOF_STACK.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-space p-7 transition hover:-translate-y-0.5 hover:border-tech-light/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light sm:p-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <h3 className="font-display text-xl font-bold tracking-tight text-white">
                    {item.name}
                  </h3>
                  <ArrowUpRight
                    className="mt-1 h-5 w-5 shrink-0 text-white/55 transition group-hover:text-tech-light"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 text-[15px] leading-7 text-white/60">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <p className={`${EYEBROW} mb-5`}>Apply</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Put your work forward.
          </h2>
          <p className="mt-6 text-base leading-7 text-white/60">
            I am selecting one founder whose body of work is substantial and
            scattered, with a real campaign on the calendar. No price is listed
            because the first one is a proving run, and I would rather agree the
            terms with the person than publish a number at a stranger.
          </p>

          <div className="mt-12">
            <ApplyForm />
          </div>

          <div className="mt-16 border-t border-white/10 pt-8">
            <p className="text-sm leading-7 text-white/60">
              Started at Mindvalley University 2026 in Tallinn and shipped as an
              entry to the Social Media Mastery 7 Days Launch Challenge run by
              Sabrina Stocker and Vishen Lakhiani. The scan, the scoring model, and
              the underlying stack are open. This is an independent FrankX project
              and is not organized, sponsored, or endorsed by Mindvalley.
            </p>
            <Link
              href="/mvu"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-tech-light transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
            >
              Read the Tallinn field journal
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
