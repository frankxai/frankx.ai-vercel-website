import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Cpu,
  Globe2,
  Repeat2,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react'
import {
  operatingLoop,
  portfolioBrands,
  portfolioPrograms,
  recurringValueTests,
  revenueEvents,
  type PortfolioAccent,
  type PortfolioBrand,
} from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Business Architecture — From Expertise to Recurring Value',
  description:
    'The FrankX public operating model: verified customer-facing brands, explicit recurring-value experiments, and a measurable path from natural advantage to scalable impact.',
  alternates: { canonical: 'https://frankx.ai/business-plan' },
  openGraph: {
    title: 'The FrankX Business Architecture',
    description:
      'How the portfolio turns distinct advantage into owned assets, repeat customer value, and measurable impact.',
    type: 'website',
  },
}

const accentStyles: Record<
  PortfolioAccent,
  { text: string; border: string; background: string }
> = {
  emerald: {
    text: 'text-emerald-300',
    border: 'border-emerald-500/20',
    background: 'bg-emerald-500/[0.04]',
  },
  cyan: {
    text: 'text-cyan-300',
    border: 'border-cyan-500/20',
    background: 'bg-cyan-500/[0.04]',
  },
  sky: {
    text: 'text-sky-300',
    border: 'border-sky-500/20',
    background: 'bg-sky-500/[0.04]',
  },
  violet: {
    text: 'text-violet-300',
    border: 'border-violet-500/20',
    background: 'bg-violet-500/[0.04]',
  },
  amber: {
    text: 'text-amber-300',
    border: 'border-amber-500/20',
    background: 'bg-amber-500/[0.04]',
  },
}

const brandIcons: Record<PortfolioBrand['id'], typeof Sparkles> = {
  frankx: Sparkles,
  gencreator: Boxes,
  'agentic-income': Repeat2,
  starlight: Cpu,
  arcanea: BookOpen,
}

const decisionStyles = {
  'Keep distinct': 'border-sky-500/20 bg-sky-500/[0.06] text-sky-300',
  Embed: 'border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300',
  Incubate: 'border-amber-500/20 bg-amber-500/[0.06] text-amber-300',
} as const

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-white/60">
      <span className="h-px w-6 bg-emerald-400/60" aria-hidden="true" />
      {children}
    </div>
  )
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/55">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-white/70">{children}</dd>
    </div>
  )
}

function BusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'The FrankX Business Architecture',
    description:
      'The public operating model for FrankX, GenCreator, Agentic Income, Starlight Intelligence System, and Arcanea.',
    url: 'https://frankx.ai/business-plan',
    author: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: 'https://frankx.ai',
      jobTitle: 'AI Architect',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function BusinessPlanPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <BusinessSchema />

      <section className="relative overflow-hidden border-b border-white/[0.05]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(16,185,129,0.08),transparent_32%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 lg:pb-32 lg:pt-36">
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white/80"
          >
            FrankX
            <span aria-hidden="true">/</span>
            Business architecture
          </Link>

          <Eyebrow>Public operating model · July 2026</Eyebrow>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Build assets that keep creating value.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65 sm:text-xl">
            Natural ability creates an edge. A consequential problem creates demand. A repeatable
            system turns both into wealth and measurable impact. This page separates what exists now
            from what must earn the right to become recurring.
          </p>

          <div className="mt-12 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.035] p-6 sm:p-8">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300/80">
              The operating equation
            </div>
            <p className="sr-only">
              Wealth equals distinct advantage multiplied by problem value, people helped, recurring
              value, retention, and value captured.
            </p>
            <div
              className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xl font-medium text-white/90 sm:text-2xl"
              aria-hidden="true"
            >
              <span>Distinct advantage</span>
              <span className="text-emerald-400">×</span>
              <span>problem value</span>
              <span className="text-emerald-400">×</span>
              <span>people helped</span>
              <span className="text-emerald-400">×</span>
              <span>recurring value</span>
              <span className="text-emerald-400">×</span>
              <span>retention</span>
              <span className="text-emerald-400">×</span>
              <span>value captured</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="https://gencreator.ai/products/diagnostic?utm_source=frankx&utm_medium=business-plan&utm_campaign=portfolio-operating-model"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Run the GenCreator diagnostic
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="https://agenticincome.ai/?utm_source=frankx&utm_medium=business-plan&utm_campaign=portfolio-operating-model"
              className="text-sm text-white/65 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white/85 hover:decoration-white/60"
            >
              Explore Agentic Income
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.05] py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow>Five core operating engines</Eyebrow>
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Each brand needs a buyer, a costly repeat problem, and proof.
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-white/65">
                “Current value” describes the canonical live surface. “Recurring experiment” states
                whether an offer is active, service-led, or pre-launch. Nothing on this page creates a
                new plan beyond what the operating brand already publishes.
              </p>
            </div>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {portfolioBrands.map((brand) => {
                const Icon = brandIcons[brand.id]
                const styles = accentStyles[brand.accent]

                return (
                  <article key={brand.id} className="py-9 first:pt-0 last:pb-0">
                    <div className="grid gap-6 sm:grid-cols-[190px_1fr]">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className={`rounded-lg border p-2 ${styles.border} ${styles.background}`}>
                            <Icon className={`h-4 w-4 ${styles.text}`} aria-hidden="true" />
                          </span>
                          <div>
                            <h3 className="font-semibold text-white">{brand.name}</h3>
                            <p className={`mt-0.5 font-mono text-[11px] ${styles.text}`}>
                              {brand.domain}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                          {brand.role}
                        </p>
                        <Link
                          href={brand.href}
                          className={`mt-5 inline-flex items-center gap-1.5 text-xs font-medium underline decoration-white/20 underline-offset-4 hover:decoration-white/60 ${styles.text}`}
                        >
                          {brand.ctaLabel}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </div>

                      <dl className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Detail label="Buyer">{brand.buyer}</Detail>
                          <Detail label="Recurring problem">{brand.recurringProblem}</Detail>
                        </div>
                        <div className="grid gap-5 border-t border-white/[0.06] pt-5 sm:grid-cols-2">
                          <Detail label="Acquisition path">{brand.acquisitionPath}</Detail>
                          <Detail label="Activation">{brand.activation}</Detail>
                        </div>
                        <div className="grid gap-5 border-t border-white/[0.06] pt-5 sm:grid-cols-2">
                          <Detail label="Current value">{brand.currentValue}</Detail>
                          <Detail label="Recurring experiment">{brand.recurringExperiment}</Detail>
                        </div>
                        <div className="grid gap-5 border-t border-white/[0.06] pt-5 sm:grid-cols-2">
                          <Detail label="Fulfillment system">{brand.fulfillmentSystem}</Detail>
                          <Detail label="Proof metric">{brand.proofMetric}</Detail>
                        </div>
                      </dl>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.05] bg-white/[0.012] py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow>Portfolio discipline</Eyebrow>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              A name can be a program without becoming another company.
            </h2>
            <p className="mt-5 leading-relaxed text-white/65">
              A dedicated business requires a distinct buyer, repeat job, distribution advantage,
              and accountable economics. Inactive, defensive, legal, partner, and client domains stay
              in the private registry; publishing them would not help a customer decide what to do.
            </p>
          </div>

          <div className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {portfolioPrograms.map((program) => (
              <div
                key={program.name}
                className="grid gap-4 py-6 md:grid-cols-[220px_1fr_180px] md:items-start"
              >
                <div>
                  <h3 className="font-medium text-white/90">{program.name}</h3>
                  {program.domain && program.href ? (
                    <Link
                      href={program.href}
                      className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] text-sky-300 underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
                    >
                      {program.domain}
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  ) : null}
                  <span
                    className={`block w-fit rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${program.domain ? 'mt-3' : 'mt-2'} ${decisionStyles[program.decision]}`}
                  >
                    {program.decision}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">{program.rule}</p>
                <p className="text-xs leading-relaxed text-white/60 md:text-right">
                  Operating home
                  <br />
                  <span className="text-white/75">{program.parent}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.05] py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow>Marketing → sales → systemization</Eyebrow>
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <div>
              <Workflow className="h-7 w-7 text-emerald-300" aria-hidden="true" />
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                One loop governs every business.
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-white/65">
                Marketing earns the next diagnostic action. Sales converts a verified problem into a
                bounded outcome. Systemization makes that outcome repeatable and measurable.
              </p>
            </div>

            <ol className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {operatingLoop.map(([stage, description], index) => (
                <li key={stage} className="grid gap-3 py-5 sm:grid-cols-[44px_110px_1fr] sm:items-start">
                  <span className="font-mono text-xs text-emerald-300">0{index + 1}</span>
                  <h3 className="text-sm font-medium text-white/90">{stage}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.05] bg-white/[0.012] py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow>Revenue architecture</Eyebrow>
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <div>
              <Target className="h-7 w-7 text-emerald-300" aria-hidden="true" />
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Charge for the value event that actually exists.
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-white/65">
                A finished transformation belongs in a one-time product. ARR starts when a specific
                repeat job continues to produce a customer outcome—not when static content receives a
                monthly payment schedule.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
              {revenueEvents.map((item, index) => (
                <div
                  key={item.model}
                  className="grid gap-3 border-b border-white/[0.07] p-5 last:border-b-0 sm:grid-cols-[34px_1fr_1fr] sm:gap-5"
                >
                  <span className="font-mono text-xs text-emerald-300">0{index + 1}</span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-white/55">{item.event}</p>
                    <h3 className="mt-2 text-sm font-medium text-white/90">{item.model}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/70">{item.standard}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-white/[0.08] pt-12">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-semibold">The recurring-value test</h3>
              <p className="mt-3 leading-relaxed text-white/65">
                One primary recurring job with repeat use and willingness to pay is mandatory. The
                other mechanisms strengthen retention; they are not a feature checklist for an MVP.
              </p>
            </div>
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-5">
              {recurringValueTests.map(([title, description], index) => (
                <div key={title} className="bg-[#0a0a0b] p-5">
                  <p className="font-mono text-[10px] text-emerald-300">0{index + 1}</p>
                  <h4 className="mt-3 text-sm font-medium text-white/90">{title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-white/65">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.05] py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow>One million lives</Eyebrow>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Globe2 className="h-7 w-7 text-emerald-300" aria-hidden="true" />
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Impact scales through people who can teach and build without you.
              </h2>
              <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.035] p-6 font-mono text-lg text-white/85 sm:text-xl">
                10,000 builders × 100 people enabled = 1,000,000 lives
              </div>
              <p className="mt-6 max-w-2xl leading-relaxed text-white/65">
                Reach is not impact. A life counts when someone ships an asset, earns from owned work,
                deploys a useful system, teaches another person, or produces a verified social outcome.
              </p>
            </div>

            <div className="border-l border-white/[0.08] pl-6 sm:pl-8">
              <h3 className="text-lg font-semibold">The next-generation curriculum</h3>
              <ol className="mt-6 space-y-5">
                {[
                  ['Creator', 'Discover asymmetric strengths and create with judgment.'],
                  ['Builder', 'Choose consequential problems and ship useful artifacts.'],
                  ['Owner', 'Turn work into systems, IP, distribution, and recurring economics.'],
                  ['Steward', 'Govern agents, incentives, rights, and impact.'],
                  ['Teacher', 'Transfer the system so capability multiplies beyond the founder.'],
                ].map(([stage, description], index) => (
                  <li key={stage} className="grid grid-cols-[28px_1fr] gap-3">
                    <span className="font-mono text-xs text-emerald-300">0{index + 1}</span>
                    <div>
                      <h4 className="text-sm font-medium text-white/85">{stage}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-white/65">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Eyebrow>Validation order</Eyebrow>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Instrument first. Prove repetition second. Monetize recurrence last.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] text-left md:grid-cols-3">
            {[
              [
                'Now',
                'Reconcile FrankX with the live GenCreator, Arcanea, and Agentic Income surfaces. Baseline diagnostic, purchase, activation, and week-four behavior for every published door.',
              ],
              [
                'Next',
                'Strengthen the existing diagnostic with advantage and problem validation. Track packets as one-time revenue, Circle as recurring, Studio as service, and Arcanea as pre-launch.',
              ],
              [
                'Later',
                'Scale recurring offers only when cohorts prove repeat value. Add licenses, marketplaces, or new memberships one verified customer job at a time.',
              ],
            ].map(([phase, action]) => (
              <div key={phase} className="bg-[#0a0a0b] p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300">
                  {phase}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/70">{action}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="https://gencreator.ai/products/diagnostic?utm_source=frankx&utm_medium=business-plan&utm_campaign=portfolio-operating-model"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Run the GenCreator diagnostic
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/ecosystem"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Inspect the system map
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
