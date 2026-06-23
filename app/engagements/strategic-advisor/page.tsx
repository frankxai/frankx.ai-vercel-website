import { cookies } from 'next/headers'
import Link from 'next/link'

import { createMetadata } from '@/lib/seo'
import {
  PRIVATE_ACCESS_COOKIE,
  checkPasscode,
  isPasscodeConfigured,
} from '@/lib/private-access'
import { PasscodeGate } from '@/components/strategic-advisor/PasscodeGate'
import { ContactForm } from '@/components/contact/ContactForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = createMetadata({
  title: 'Strategic Advisor — Frank',
  description:
    'Strategic Advisor engagements for organizations operating at significant scale. By introduction.',
  path: '/engagements/strategic-advisor',
  noindex: true,
})

export default async function StrategicAdvisorPage() {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(PRIVATE_ACCESS_COOKIE)?.value
  const hasAccess = isPasscodeConfigured() && checkPasscode(cookieValue)

  if (!hasAccess) {
    return <PasscodeGate />
  }

  return (
    <main
      id="main"
      className="min-h-screen bg-[#fafaf7] text-[#111] font-serif"
      style={{
        // Use the system serif; if the design system has a defined serif token,
        // swap it in via globals.css. Browser default serif renders well enough
        // and keeps this surface free of decoration.
      }}
    >
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="px-6 pt-32 pb-24 sm:pt-40">
        <div className="mx-auto max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#999] mb-12">
            Private Engagement
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-[1.25] tracking-tight text-[#111]">
            Frank operates as a fractional Chief AI Architect for two to four
            organizations at a time.
          </h1>

          <p className="mt-10 text-[17px] leading-[1.7] text-[#333] max-w-xl">
            Engagement begins with a written one-page architecture brief, produced
            within the first week, before any contract or call. Scope, success
            criteria, and price live on one page or the engagement does not start.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="px-6 pb-20 border-t border-[#e8e6df]">
        <div className="mx-auto max-w-2xl pt-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#999] mb-10">
            How
          </p>
          <ol className="space-y-10 text-[16px] leading-[1.7] text-[#333]">
            <li className="grid grid-cols-[28px_1fr] gap-6">
              <span className="text-[#bbb] tabular-nums">01</span>
              <p>
                A written one-page architecture brief on the problem you named,
                produced within seven days of your message. Yours to keep
                regardless of next steps — no pitch deck, no proposal, no
                obligation.
              </p>
            </li>
            <li className="grid grid-cols-[28px_1fr] gap-6">
              <span className="text-[#bbb] tabular-nums">02</span>
              <p>
                A 45-minute conversation to decide whether the brief is the
                right read. If it is, scope and price come next; if it isn't,
                you've still got the brief.
              </p>
            </li>
            <li className="grid grid-cols-[28px_1fr] gap-6">
              <span className="text-[#bbb] tabular-nums">03</span>
              <p>
                A written engagement letter — one page. Scope, deliverables,
                cadence, price, and the date the first artifact is in your inbox.
              </p>
            </li>
            <li className="grid grid-cols-[28px_1fr] gap-6">
              <span className="text-[#bbb] tabular-nums">04</span>
              <p>
                Weekly executive read-out, daily Loom for the build team,
                async-first. Frank is in your data room, not your calendar.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ── PROVENANCE ────────────────────────────────────────────────── */}
      <section className="px-6 pb-20 border-t border-[#e8e6df]">
        <div className="mx-auto max-w-2xl pt-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#999] mb-10">
            Provenance
          </p>
          <div className="space-y-6 text-[16px] leading-[1.7] text-[#333]">
            <p>
              Frank's prior engagements include enterprise AI architecture at
              Oracle, twelve thousand AI music tracks shipped under licence, and
              eight live agentic builds in public, documented at{' '}
              <Link
                href="/agentic-builder-lab"
                className="text-[#111] underline underline-offset-4 decoration-[#bbb] hover:decoration-[#111]"
              >
                /agentic-builder-lab
              </Link>
              .
            </p>
            <p>
              References are available on request, in writing, with the
              counterparty's permission.
            </p>
          </div>
        </div>
      </section>

      {/* ── ENGAGE ────────────────────────────────────────────────────── */}
      <section className="px-6 pb-32 border-t border-[#e8e6df]">
        <div className="mx-auto max-w-2xl pt-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#999] mb-10">
            Engage
          </p>
          <p className="mb-10 text-[16px] leading-[1.7] text-[#333]">
            Tell Frank the shape of the problem and where you sit. A reply lands
            within one working day; a written brief follows within seven.
          </p>

          <div className="bg-white border border-[#e8e6df] p-8 sm:p-10">
            {/* Inherit the unified intake pipeline. The form's intent
                taxonomy already includes 'executive'. */}
            <ContactForm defaultIntent="executive" />
          </div>

          <p className="mt-12 text-xs text-[#999] leading-[1.7]">
            Or write directly to{' '}
            <a
              href="mailto:frank@frankx.ai?subject=Private%20engagement"
              className="text-[#666] underline underline-offset-4 decoration-[#ccc] hover:text-[#111] hover:decoration-[#111]"
            >
              frank@frankx.ai
            </a>
            . Madrid time, CET/CEST.
          </p>
        </div>
      </section>
    </main>
  )
}
