import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CircleDot,
  FileSearch,
  Hammer,
  HeartPulse,
  Network,
  ShieldCheck,
} from 'lucide-react'

import { EmailSignup } from '@/components/email-signup'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { founderLayers } from '@/lib/founder-stack'

type LatestPost = {
  slug: string
  title: string
  description: string
  category: string
  readingTime: string
  date: string
}

type FAQItem = {
  question: string
  answer: string
}

type FounderHomeProps = {
  latestPosts?: LatestPost[]
  faqs?: FAQItem[]
}

const moves = [
  {
    number: '01',
    eyebrow: 'Diagnose',
    title: 'Map the constraint',
    description:
      'Ten private questions identify the layer most likely to make progress elsewhere expensive right now.',
    href: '/founder-stack',
    action: 'Map my Founder Stack',
    Icon: CircleDot,
  },
  {
    number: '02',
    eyebrow: 'Install',
    title: 'Build the operating system',
    description:
      'The Foundry installs the site, agent harness, quality controls, and business memory around a real company workflow.',
    href: '/foundry',
    action: 'Explore the Foundry',
    Icon: Hammer,
  },
  {
    number: '03',
    eyebrow: 'Compound',
    title: 'Improve the quality of the bets',
    description:
      "Founder's Circle is the bounded strategic route for founders making consequential AI, product, and architecture decisions.",
    href: '/founders-circle',
    action: "Explore Founder's Circle",
    Icon: Network,
  },
] as const

const proofRoutes = [
  {
    eyebrow: 'Inspect the method',
    title: 'Foundry operating guide',
    description:
      'Read what is installed, how it runs, and where the founder remains in control.',
    href: '/foundry/guide',
    action: 'Read the guide',
    Icon: FileSearch,
  },
  {
    eyebrow: 'Protect the founder signal',
    title: 'Founder Signal OS',
    description:
      'A second, specialist scan for the voice, judgment, and earned beliefs AI should not average away.',
    href: '/founder-signal',
    action: 'Run the signal scan',
    Icon: ShieldCheck,
  },
  {
    eyebrow: 'Study the public work',
    title: 'AI architecture library',
    description:
      'Reference architectures, research, and field notes you can inspect before deciding to work with Frank.',
    href: '/ai-architecture',
    action: 'Inspect the architecture',
    Icon: BookOpen,
  },
] as const

export default function FounderHome({
  latestPosts = [],
  faqs = [],
}: FounderHomeProps) {
  return (
    <main tabIndex={-1} className="relative overflow-hidden bg-[#0a0a0b] text-white">
      <section className="relative border-b border-white/[0.07]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_10%,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_12%_0%,rgba(6,182,212,0.055),transparent_28%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid min-h-[88svh] max-w-7xl items-center gap-12 px-5 pb-16 pt-24 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16 lg:px-10 lg:pb-20 lg:pt-24">
          <div className="min-w-0 max-w-3xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-300/80">
              FrankX · Founder operating systems
            </p>
            <h1 className="mt-6 font-display text-[2.75rem] font-bold leading-[0.96] tracking-[-0.048em] text-white sm:text-6xl lg:text-7xl">
              Your company is not one problem.
              <span className="block font-serif font-normal italic text-emerald-100/78">
                It is a stack.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
              FrankX helps founders find the constraint across State, Signal,
              Systems, Scale, and Stewardship—then build the next useful move
              with AI without flattening the human who carries the judgment.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/55">
              If you carry the risk and make the decisions, founder is the word
              used here. That includes the entrepreneur, solopreneur, coach, and
              creator-led company.
            </p>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href="/founder-stack"
                eventName="founder_entry_click"
                eventProperties={{
                  surface: 'homepage_hero',
                  destination: 'founder_stack',
                }}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
              >
                Map my Founder Stack
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </TrackedLink>
              <Link
                href="/newsletter"
                className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-white/72 underline decoration-white/25 underline-offset-8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Read the Signal Loop
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <p className="mt-9 max-w-xl text-[11px] leading-5 text-white/52">
              Independent project by former Oracle AI architect Frank Riemer.
              Not affiliated with, endorsed by, or sponsored by Oracle.
            </p>
          </div>

          <aside
            className="relative min-w-0 lg:justify-self-end"
            aria-label="The five Founder Stack layers"
          >
            <div
              className="absolute -inset-10 bg-emerald-400/[0.07] blur-[110px]"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1111] p-5 shadow-[0_36px_120px_rgba(0,0,0,0.42)] sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/75">
                    Founder Stack
                  </p>
                  <p className="mt-2 text-sm text-white/55">
                    Five layers · one constraint
                  </p>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.055] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-200">
                  Map v1
                </span>
              </div>
              <ol className="relative mt-2">
                <div
                  className="absolute bottom-6 left-[18px] top-6 w-px bg-gradient-to-b from-emerald-300/45 via-cyan-300/25 to-white/10"
                  aria-hidden="true"
                />
                {founderLayers.map((layer) => (
                  <li
                    key={layer.key}
                    className="relative grid grid-cols-[38px_1fr] gap-4 border-b border-white/[0.06] py-4 last:border-0"
                  >
                    <span className="relative z-10 mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-[#0d1111] font-mono text-[9px] text-emerald-200">
                      {layer.number}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {layer.name}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-white/52">
                        {layer.short}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <section
        className="border-b border-white/[0.07] bg-[#0c0e0e] py-20 lg:py-24"
        aria-labelledby="moves-title"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-300/70">
                One studio · three moves
              </p>
              <h2
                id="moves-title"
                className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
              >
                Diagnose. Install. Compound.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-white/65">
                Start at the pressure you feel now. The wider studio remains
                available after the founder path is clear.
              </p>
            </div>
            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {moves.map(({ Icon, ...move }) => (
                <article
                  key={move.number}
                  className="group grid gap-5 py-7 sm:grid-cols-[48px_1fr_auto] sm:items-start"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.05] text-emerald-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/52">
                      {move.number} · {move.eyebrow}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {move.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/64">
                      {move.description}
                    </p>
                  </div>
                  <Link
                    href={move.href}
                    className="inline-flex min-h-11 items-center gap-2 self-center text-sm font-medium text-emerald-300 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    {move.action}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-28" aria-labelledby="proof-title">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-300/70">
              Receipts before pitch
            </p>
            <h2
              id="proof-title"
              className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
            >
              Inspect the work before you trust the offer.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/65">
              The architecture, operating guide, and specialist founder scan are
              public. Decide from the source, not from adjectives.
            </p>
          </div>
          <div className="mt-14 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {proofRoutes.map(({ Icon, ...route }) => (
              <article
                key={route.title}
                className="grid gap-5 py-7 sm:grid-cols-[48px_1fr_auto] sm:items-start"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.045] text-cyan-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200/65">
                    {route.eyebrow}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {route.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/64">
                    {route.description}
                  </p>
                </div>
                <Link
                  href={route.href}
                  className="inline-flex min-h-11 items-center gap-2 self-center text-sm font-medium text-cyan-200/80 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  {route.action}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-y border-white/[0.07] bg-[#0c0e0e] py-24"
        aria-labelledby="human-layer-title"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber-300/75">
              Founder Statecraft
            </p>
            <h2
              id="human-layer-title"
              className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
            >
              The system still has a human layer.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/65">
              Attention, physiology, meaning, and relationships shape founder
              judgment. The Human Layer studies those inputs without certainty
              theatre.
            </p>
            <Link
              href="/human-layer"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/[0.055] px-6 py-3 text-sm font-semibold text-amber-100 hover:border-amber-300/40 hover:bg-amber-300/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
            >
              Explore the Human Layer
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <HeartPulse
                className="mt-1 h-5 w-5 shrink-0 text-amber-200"
                aria-hidden="true"
              />
              <div>
                <p className="text-lg font-semibold text-white">
                  Four lenses keep the language honest.
                </p>
                <p className="mt-3 text-sm leading-6 text-white/64">
                  Established. Emerging. Experiential. Symbolic. Every
                  meditation, breathwork, sound, neurotechnology, manifestation,
                  dream-practice, or plant-medicine discussion states which kind
                  of claim it is making.
                </p>
              </div>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3 text-center text-[10px] font-mono uppercase tracking-[0.15em] text-white/60 sm:grid-cols-4">
              {['Established', 'Emerging', 'Experiential', 'Symbolic'].map(
                (lens) => (
                  <span
                    key={lens}
                    className="rounded-full border border-white/10 px-3 py-2"
                  >
                    {lens}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="py-24 lg:py-28" aria-labelledby="notes-title">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex flex-col gap-5 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-300/70">
                  Founder Field Notes
                </p>
                <h2
                  id="notes-title"
                  className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
                >
                  What the work is teaching now.
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex min-h-10 items-center gap-2 text-sm text-white/72 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Browse all field notes{' '}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="divide-y divide-white/[0.08]">
              {latestPosts.slice(0, 3).map((post) => (
                <article
                  key={post.slug}
                  className="grid gap-4 py-7 sm:grid-cols-[0.3fr_1fr_auto] sm:items-center"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/52">
                    {post.category} · {post.readingTime}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-white/64">
                      {post.description}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read ${post.title}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/70 hover:border-emerald-300/30 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="border-t border-white/[0.07] bg-[#0c0e0e] py-24"
        aria-labelledby="signal-loop-title"
      >
        <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-300/70">
              The Signal Loop
            </p>
            <h2
              id="signal-loop-title"
              className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
            >
              One useful founder note at a time.
            </h2>
            <p className="mt-5 text-sm leading-6 text-white/64">
              The Signal Loop is the umbrella field-note stream. The newsletter
              hub also keeps AI architecture, the Human Layer, music, and studio
              releases visible as distinct editorial lanes.
            </p>
          </div>
          <EmailSignup
            listType="founder-stack"
            source="homepage-founder-loop"
            buttonText="Join the Founder Field Notes"
            placeholder="Founder email"
            compact
          />
        </div>
      </section>

      {faqs.length > 0 && (
        <section
          className="border-t border-white/[0.07] py-24"
          aria-labelledby="faq-title"
        >
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/52">
              Questions
            </p>
            <h2
              id="faq-title"
              className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
            >
              Before you choose a route.
            </h2>
            <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                    {faq.question}
                    <span
                      className="text-white/45 group-open:rotate-45 motion-reduce:transition-none"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-2 pt-4 text-sm leading-7 text-white/64">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
