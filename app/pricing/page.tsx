import Link from 'next/link'
import { ArrowRight, Check, Layers, Shield, Sparkles } from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Pricing — Open foundations, founding kits, cohorts, and studio',
  description:
    'Honest pricing across four layers: free open-source substrates, founding digital kits, December 2026 and 2027 cohorts, and AI Architecture Studio advisory.',
  path: '/pricing',
})

const OPEN_FOUNDATIONS = [
  {
    name: 'Agentic Creator OS (ACOS)',
    detail: '176 skills, 85 commands, and 81 agent configs on MIT license.',
    href: '/acos',
    cta: 'Inspect ACOS',
  },
  {
    name: 'Six Published Books & 54 Reviews',
    detail: 'Full web reading editions, PDFs, and structured reading notes.',
    href: '/books',
    cta: 'Read books',
  },
  {
    name: 'Starlight Intelligence Protocol',
    detail: 'Open-spec local-first memory vaults, FTS5 search, and MCP router.',
    href: 'https://starlightintelligence.org',
    cta: 'View open spec',
    external: true,
  },
]

const FOUNDING_KITS = [
  {
    name: 'Income Architecture Blueprint',
    price: '$67',
    cadence: 'One-time · Pre-stage / Polar rollout',
    detail: 'Four markdown operating kits (service, product, system, README) for solo builders.',
    href: 'https://www.agenticincome.ai',
    external: true,
  },
  {
    name: 'Stream Pack 01 — Affiliate Publication',
    price: '$47',
    cadence: 'One-time · Pre-stage / Polar rollout',
    detail: 'Source-verified comparison template, disclosure schema, and 10-20 hr/mo operating plan.',
    href: 'https://www.agenticpassiveincome.com',
    external: true,
  },
  {
    name: 'Obsidian Second Brain + ACOS Pro Bundle',
    price: '€49',
    cadence: 'Founding Wave reservation',
    detail: 'Checksummed Obsidian starter vault, curated ACOS pro workflows, and five PDF field guides.',
    href: '/downloads',
  },
  {
    name: 'Complete 6-Book + Playbook Edition',
    price: '€39',
    cadence: 'Founding Wave reservation',
    detail: 'Compiled PDF and forthcoming EPUB archive across 49 chapters plus companion notes.',
    href: '/books',
  },
  {
    name: 'Suno Creator Kit + Prompt Matrix Pro',
    price: '€39',
    cadence: 'Founding Wave reservation',
    detail: 'Structured prompts across 919 cataloged studio sessions plus 98 evaluated pattern folders.',
    href: '/music',
  },
]

const COHORTS = [
  {
    name: 'FrankX Builder Pro Membership',
    price: '€149 / year',
    note: 'Founding price lock while active (100 seats max; €19/mo or €180/yr standard)',
    detail: 'Private implementation notes, working repository diffs, MCP tooling, and monthly studio teardowns once activated.',
    href: '/cohorts',
  },
  {
    name: '1-Day Solo Founder Agent OS Immersion',
    price: '€997',
    note: 'December 2026 live run · 12 seats max',
    detail: 'Eight-hour live build session configuring local memory vaults, multi-CLI routing, and clean verification loops.',
    href: '/cohorts',
  },
  {
    name: 'AI Architect Academy — Q1 2027 Founding Cohort',
    price: '€1,450',
    note: 'Founding pre-sell (25 seats max; €2,250 standard) · Includes lifetime cohort re-join rights',
    detail: 'Six-week live systems curriculum covering trust boundaries, eval admission gates, and production agent governance.',
    href: '/cohorts',
  },
]

const ADVISORY = [
  {
    name: 'AI Architecture Assessment',
    price: '€3,000',
    detail: 'Two-week architecture, data-boundary, and ROI review. 100% credited toward an implementation sprint booked within 30 days.',
    href: '/work-with-me',
  },
  {
    name: 'Architecture Sprint',
    price: 'From €8,000',
    detail: 'One-to-two-week engagement delivering end-to-end solution architecture, technology selection, a cost model, and an implementation plan.',
    href: '/work-with-me',
  },
  {
    name: 'Agentic Business OS Foundry Install',
    price: 'Application',
    detail: 'Five-contract production web, claims-guard, and operating spine installation for founder-led businesses.',
    href: '/foundry',
  },
  {
    name: "Founder's Circle Guild",
    price: '€2,997 / quarter',
    detail: 'Four hours of direct quarterly advisory, 30-day async window after each call, and quarterly strategy brief (10 seats max).',
    href: '/founders-circle',
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.08] pb-16 pt-32 lg:pb-20 lg:pt-36">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(16,185,129,0.08),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.07),transparent_40%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-400">
            Pricing · Four clear layers
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Pay only when curated systems, live instruction, or direct judgment earn the price.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
            No fake countdown timers, no inflated anchor prices, and no hidden lock-in. The core open-source substrates remain MIT-licensed. Paid layers fund deeper engineering, live cohorts, and direct studio work.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#founding-wave"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Join founding wave
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/cohorts"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              View Dec 2026 & 2027 cohorts
            </Link>
          </div>
        </div>
      </section>

      {/* Layer 0 */}
      <section className="border-b border-white/[0.06] py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
                Layer 0 · €0
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Open foundations — inspect before spending anything
              </h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {OPEN_FOUNDATIONS.map((item) => (
              <div
                key={item.name}
                className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <div>
                  <h3 className="text-base font-semibold text-white">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.detail}</p>
                </div>
                <div className="mt-5">
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      {item.cta}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      {item.cta}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layer 1 */}
      <section className="border-b border-white/[0.06] py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400">
            Layer 1 · Packaged Digital Kits
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Curated toolkits and editions
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Self-serve Merchant-of-Record checkout (Polar.sh) is currently in final staging. Joining the founding wave below reserves launch priority—no card is charged today.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FOUNDING_KITS.map((kit) => (
              <div
                key={kit.name}
                className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-xl font-semibold text-white">{kit.price}</span>
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-medium text-cyan-300">
                      {kit.cadence}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{kit.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{kit.detail}</p>
                </div>
                <div className="mt-5">
                  {kit.external ? (
                    <a
                      href={kit.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      Inspect source hub
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href={kit.href}
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      Inspect preview assets
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layer 2 */}
      <section className="border-b border-white/[0.06] py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-400">
            Layer 2 · December 2026 & 2027 Cohorts
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Live immersions, academy cohorts, and founding memberships
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {COHORTS.map((item) => (
              <div
                key={item.name}
                className="flex flex-col justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6"
              >
                <div>
                  <span className="font-mono text-2xl font-semibold text-white">{item.price}</span>
                  <p className="mt-1 text-xs font-medium text-emerald-300">{item.note}</p>
                  <h3 className="mt-4 text-base font-semibold text-white">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.detail}</p>
                </div>
                <div className="mt-6">
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-emerald-300 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    See schedule & guarantee
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layer 3 */}
      <section className="border-b border-white/[0.06] py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
            Layer 3 · Open Today
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Studio, Foundry, and Founder Advisory
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ADVISORY.map((item) => (
              <div
                key={item.name}
                className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <span className="font-mono text-base font-semibold text-emerald-400">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.detail}</p>
                </div>
                <div className="mt-5">
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-white underline decoration-white/25 underline-offset-4 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    Open application & scope
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee & Founding Wave Signup */}
      <section id="founding-wave" className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7">
              <div className="flex items-center gap-2 text-emerald-400">
                <Shield className="h-5 w-5" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.2em]">
                  Exit & Refund Contract
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                Transparent guarantees by tier
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-300">
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>
                    30-day refund window on digital kits and cohorts starting on delivery date or cohort kickoff—never on pre-sell checkout day. Advisory &amp; Founder&apos;s Circle engagements carry a first-call fit guarantee, then pro-rate against calls used.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>
                    VAT-compliant EU Eenmanszaak invoices (details on our{' '}
                    <Link href="/legal/imprint" className="text-emerald-300 underline underline-offset-4 hover:text-emerald-200">
                      Legal Imprint
                    </Link>
                    ) for corporate L&amp;D reimbursement.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>
                    Full markdown, JSON, and repository portability—zero vendor lock-in if you leave.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.03] p-7">
              <div className="flex items-center gap-2 text-cyan-300">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.2em]">
                  Founding Wave Priority
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                Reserve Founding Wave access
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                Receive direct notice when Polar.sh self-serve checkout opens for December kits and Q1 2027 cohorts. No card charged today, and you can also see our <Link href="/build" className="text-emerald-300 underline underline-offset-4 hover:text-emerald-200">Six Primitives overview</Link>.
              </p>
              <div className="mt-6">
                <EmailSignup
                  listType="premium-packs"
                  source="pricing-founding-wave"
                  intent="founding-wave-pricing"
                  intentLabel="Founding Wave Kits & Cohorts"
                  buttonText="Join founding wave"
                  placeholder="Founder or work email"
                  compact
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-2 text-xs text-zinc-500">
            <Layers className="h-4 w-4" aria-hidden="true" />
            <span>
              Looking for multi-agent enterprise engagements? Visit{' '}
              <Link href="/work-with-me" className="text-zinc-300 underline underline-offset-4 hover:text-white">
                AI Architecture Studio
              </Link>
              .
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
