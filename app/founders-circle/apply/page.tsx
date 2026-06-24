import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Apply — Founder\'s Circle',
  description:
    'Eight-minute application for the FrankX Founder\'s Circle. Reply within 5 business days.',
  path: '/founders-circle/apply',
})

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <section className="pt-28 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/founders-circle"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Founder's Circle
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Founder's Circle application
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed mb-8">
            Eight minutes to fill in. Frank reviews each one personally and replies within 5
            business days. Your answers are confidential — covered by NDA on our side from the
            moment you submit.
          </p>

          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] p-6 sm:p-8 mb-8">
            <h2 className="text-lg font-semibold text-rose-400 mb-3">
              Application form (placeholder)
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              The full form will live here once Q2 2026 applications open. For now, the
              fastest path is a direct email to{' '}
              <a
                href="mailto:circle@frankx.ai?subject=Founder%27s%20Circle%20application"
                className="text-rose-300 hover:text-rose-200 underline"
              >
                circle@frankx.ai
              </a>{' '}
              with the answers below — 4-8 sentences each is plenty.
            </p>
            <a
              href="mailto:circle@frankx.ai?subject=Founder%27s%20Circle%20application&body=1.%20Who%20you%20are%20and%20what%20you%20build%3A%0A%0A2.%20What%20decision%20you%27re%20facing%20this%20quarter%3A%0A%0A3.%20What%20you%27ve%20already%20tried%3A%0A%0A4.%20What%20you%27d%20use%20Frank%27s%20time%20for%20in%20call%201%3A%0A%0A5.%20Conflict%20check%20%E2%80%94%20any%20Oracle%20relationship%20on%20your%20side%3F"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email circle@frankx.ai with these answers
            </a>
          </div>

          <h2 className="text-xl font-semibold text-white mb-5 tracking-tight">
            What we ask
          </h2>
          <ol className="space-y-4 mb-8">
            <li className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-sm font-medium text-white mb-1.5">
                1. Who you are and what you build.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Role + company / fund / org. The kind of decisions you make. What "shipping" looks
                like in your context.
              </p>
            </li>
            <li className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-sm font-medium text-white mb-1.5">
                2. The specific AI decision you're facing this quarter.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Not "we're thinking about AI." Something like: "We're choosing between OpenAI
                Enterprise and Claude for Work for our 800-person org and we have to commit by
                end of Q3."
              </p>
            </li>
            <li className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-sm font-medium text-white mb-1.5">
                3. What you've already tried.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The vendors you've talked to, the consultants you've engaged, the prototypes
                you've built. Honesty here helps us judge fit — not gatekeep.
              </p>
            </li>
            <li className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-sm font-medium text-white mb-1.5">
                4. What you'd use Frank's time for in call 1.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Specific. "Pressure-test our agent rollout plan before our board meeting on
                July 15" beats "general AI strategy discussion."
              </p>
            </li>
            <li className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-sm font-medium text-white mb-1.5">
                5. What you want to build.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                What&apos;s the one thing you want to ship in the next 90 days?
                We work best with people who have a clear target.
              </p>
            </li>
          </ol>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <h3 className="text-sm font-medium text-white mb-2">Confidentiality</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Applications are confidential. Frank reads them personally. They are not stored
              in any third-party CRM or shared with anyone. If you don't get accepted, your
              application is deleted at quarter-end.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
