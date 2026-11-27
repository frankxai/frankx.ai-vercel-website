import Link from 'next/link'
import { ArrowRight, Calendar, Check, FileText, Shield } from 'lucide-react'
import { CopyLdEmailButton } from '@/components/cohorts/CopyLdEmailButton'
import { EmailSignup } from '@/components/email-signup'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Cohorts and Founding Members — December 2026 and 2027',
  description:
    'Live immersions, AI Architect Academy Q1 2027 founding cohort, GenCreator Studio 2027 roadmap, L&D invoice templates, and honest pre-financing terms.',
  path: '/cohorts',
})

const SCHEDULE = [
  {
    window: 'December 2026',
    title: '1-Day Solo Founder Agent OS Immersion',
    price: '€997 founding live seat',
    cap: '12 seats maximum',
    status: 'Founding Wave reservation open',
    summary:
      'Eight-hour live workshop configuring local memory vaults, multi-CLI agent routing, and verifiable testing loops. Recorded live with full starter templates.',
    bullets: [
      'Live configuration of ACOS + Starlight Memory across your own repository',
      'Prompt-cache boundary and model-routing cost optimization walkthrough',
      'Lifetime access to recording, repository diffs, and updated runbooks',
    ],
  },
  {
    window: 'Q1 2027 (Feb – Mar)',
    title: 'AI Architect Academy — Founding Cohort',
    price: '€1,450 founding pre-sell (€2,250 standard)',
    cap: '25 seats maximum',
    status: 'Pre-sell reservation · L&D eligible',
    summary:
      'Six-week live engineering cohort built on the open AI Architect Academy curriculum: trust boundaries, eval admission gates, multi-agent governance, and production deployments.',
    bullets: [
      'Weekly live architecture reviews and hands-on coding labs',
      'Lifetime re-join rights to all future cohorts so your curriculum never goes stale',
      'VAT-compliant EU Eenmanszaak invoice and employer L&D approval packet included',
    ],
  },
  {
    window: 'Q2 2027',
    title: 'GenCreator Studio — Deterministic Production Cohort',
    price: '€249 – €349 founding bundle target',
    cap: 'Founding Wave pricing',
    status: 'Roadmap · Syllabus in progress',
    summary:
      'End-to-end deterministic creative production: uniting Claude Code, ElevenLabs, Suno, and Next.js/Vercel without losing human taste or brand voice.',
    bullets: [
      'Audio, visual, and editorial pipelines backed by automated slop & link gates',
      'Portable skill packs and local asset manifests you control',
      'Optional community feedback rooms for shipped creator artifacts',
    ],
  },
]

export default function CohortsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.08] pb-16 pt-32 lg:pb-20 lg:pt-36">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_0%,rgba(6,182,212,0.08),transparent_42%),radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.07),transparent_40%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400">
            Cohorts & Founding Members · 2026 – 2027
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Build sovereign AI systems live—with open code before you pay.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
            Founding cohorts pair existing open-source repositories with live architectural review. You can inspect our code on GitHub today, reserve a capped founding seat, and expense tuition through corporate L&D budgets.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#reserve-cohort"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Reserve founding seat
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/pricing"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Compare all pricing layers
            </Link>
          </div>
        </div>
      </section>

      {/* Cohort Roadmap */}
      <section className="border-b border-white/[0.06] py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            December 2026 & 2027 Cohort Calendar
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Seat caps reflect direct live review bandwidth. Dates and final Polar.sh checkout links go out to the Founding Wave list first.
          </p>

          <div className="mt-10 space-y-6">
            {SCHEDULE.map((cohort) => (
              <div
                key={cohort.title}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    {cohort.window}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-300">
                    {cohort.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">{cohort.title}</h3>
                  <span className="font-mono text-base font-semibold text-cyan-300">
                    {cohort.price}
                  </span>
                </div>

                <p className="mt-1 text-xs font-medium text-zinc-400">{cohort.cap}</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">{cohort.summary}</p>

                <ul className="mt-5 space-y-2.5 text-sm text-zinc-300">
                  {cohort.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <Check
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400"
                        aria-hidden="true"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Members & Pre-Financing Contract */}
      <section className="border-b border-white/[0.06] py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7">
              <div className="flex items-center gap-2 text-emerald-400">
                <Shield className="h-5 w-5" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.2em]">
                  Founding Pre-Financing Rules
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                How pre-sell and Founding Member price locks work
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-300">
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>
                    <strong className="text-white">30-day guarantee from kickoff:</strong> Your refund clock starts on cohort Day 1 or v1.0 delivery, not on pre-sell payment day.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>
                    <strong className="text-white">First-100 Builder Pro Lock (€149/yr):</strong> Locked for as long as your annual subscription stays uninterrupted once Builder Pro launches (standard €19/mo or €180/yr).
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>
                    <strong className="text-white">Independent funding:</strong> Pre-financing keeps our engineering roadmap customer-funded rather than investor-driven.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7">
              <div className="flex items-center gap-2 text-cyan-300">
                <FileText className="h-5 w-5" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.2em]">
                  Corporate L&D Expense Pack
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                Need manager sign-off for Q4 or Q1 training budget?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Every cohort includes a VAT-compliant EU Eenmanszaak invoice (entity details on{' '}
                <Link href="/legal/imprint" className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
                  FrankX Legal Imprint
                </Link>
                ) and syllabus PDF. Share or copy the manager email below:
              </p>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-white/[0.08] bg-black/50 p-4 font-mono text-xs leading-relaxed text-zinc-300">
{`Program: AI Architect Academy — Q1 2027 Cohort
Tuition: €1,450 Founding Rate (L&D reimbursable)
Outcomes: Trust-boundary firewalls, eval admission gates,
  multi-agent cost routing & internal team teardown.
Open Syllabus: https://aiarchitectacademy.com`}
              </pre>
              <CopyLdEmailButton />
            </div>
          </div>
        </div>
      </section>

      {/* Reserve CTA */}
      <section id="reserve-cohort" className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-cyan-500/25 bg-cyan-500/[0.03] p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-300">
              No card charged today
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Reserve your Dec 2026 / 2027 Founding Seat
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              You will receive exact cohort dates, full syllabus links, and first-access Polar.sh checkout links before any public announcement. Want 1:1 executive access sooner? See{' '}
              <Link href="/founders-circle/apply" className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
                Founder&apos;s Circle
              </Link>{' '}
              or{' '}
              <Link href="/work-with-me" className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
                Work With Me
              </Link>
              .
            </p>
            <div className="mt-6">
              <EmailSignup
                listType="courses-waitlist"
                source="cohorts-2026-2027-founding"
                intent="cohorts-2026-2027-founding"
                intentLabel="December 2026 & 2027 Cohorts"
                buttonText="Reserve founding seat"
                placeholder="Work or founder email"
                compact
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
