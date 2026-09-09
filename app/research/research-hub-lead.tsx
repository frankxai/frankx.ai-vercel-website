import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
  SWARM_BOARD_AS_OF,
  swarmRecommendations,
  flagshipModels,
  hubFaqs,
} from '@/lib/research/swarm-board'
import { hubProvenance } from '@/lib/research/hub-provenance'

const evidenceLabel: Record<string, string> = {
  'first-party': 'First-party',
  'vendor-claim': 'Vendor-claim',
  'independent-composite': 'Independent composite',
  'not-run': 'Not run',
}

export default function ResearchHubLead() {
  return (
    <>
      <section id="recommend" className="py-12 md:py-16 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-300/80 mb-3">
            Swarm recommendation · as of {SWARM_BOARD_AS_OF}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Architecture first. Then a model.
          </h2>
          <p className="text-white/65 max-w-3xl mb-8 leading-relaxed">
            These are routing cards for how a system should be built, not slogans about
            FrankX. Each row names the job, the architecture, a primary, an alternate,
            and the evidence kind. No SIS battle score is implied.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="sr-only">
                FrankX agent swarm model and architecture recommendations
              </caption>
              <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-white/50">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Job</th>
                  <th scope="col" className="px-4 py-3 font-medium">Architecture</th>
                  <th scope="col" className="px-4 py-3 font-medium">Primary</th>
                  <th scope="col" className="px-4 py-3 font-medium">Evidence</th>
                  <th scope="col" className="px-4 py-3 font-medium">Read</th>
                </tr>
              </thead>
              <tbody>
                {swarmRecommendations.map((row) => (
                  <tr key={row.job} className="border-t border-white/[0.06] align-top">
                    <th scope="row" className="px-4 py-4 font-semibold text-white">
                      {row.job}
                    </th>
                    <td className="px-4 py-4 text-white/70">
                      {row.architecture}
                      <p className="mt-2 text-xs text-white/45">Do not: {row.doNot}</p>
                    </td>
                    <td className="px-4 py-4 text-white">
                      {row.primary}
                      <p className="mt-1 text-xs text-white/50">Alt: {row.alternate}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-block rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-300">
                        {evidenceLabel[row.evidence]}
                      </span>
                      <p className="mt-2 text-xs text-white/55">{row.evidenceNote}</p>
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={row.href}
                        className="inline-flex items-center gap-1 text-sm text-cyan-300 hover:text-white"
                      >
                        Open
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="flagships" className="py-12 md:py-16 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Flagship models</h2>
          <p className="text-white/65 max-w-3xl mb-8">
            Architecture and job, not a crown. Evidence kind is on every card. Registry notes
            that were not re-run this week stay vendor-claim.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {flagshipModels.map((m) => (
              <Link
                key={m.id}
                href={m.href}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-[background-color,border-color]"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {m.status} · {evidenceLabel[m.evidence]}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{m.name}</h3>
                <p className="mt-1 text-sm text-cyan-200/80">{m.job}</p>
                <p className="mt-2 text-sm text-white/65">{m.architecture}</p>
                <p className="mt-3 text-xs text-white/45">{m.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="executed-tests" className="py-12 md:py-16 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Executed tests</h2>
          <p className="text-white/65 max-w-3xl mb-8">
            Only runs that produced an artifact are listed. Holds stay holds.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/blog/grok-imagine-bakeoff-2026"
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:bg-white/[0.04]"
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">First-party · 16 Aug 2026</p>
              <h3 className="mt-2 text-lg font-semibold text-white">One still-life, three native generators</h3>
              <p className="mt-2 text-sm text-white/65">
                Grok Imagine, Codex image_gen, and Antigravity generate_image. Only QA-pass frames. No FAL.
              </p>
            </Link>
            <Link
              href="/research/model-arena"
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:bg-white/[0.04]"
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">SIS receipts · Claude-native</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Model Arena</h3>
              <p className="mt-2 text-sm text-white/65">
                Receipt-gated battles only. No Grok 4.6 card until the harness can pin it.
              </p>
            </Link>
            <Link
              href="/llm-hub/grok-4-6"
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:bg-white/[0.04]"
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Vendor + AA · 12 Aug 2026</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Grok 4.6 brief</h3>
              <p className="mt-2 text-sm text-white/65">
                Same-scale post-training refresh. AA Index 61. Labeled scores. Not an arena winner.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section id="provenance" className="py-12 md:py-16 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Who did what</h2>
          <p className="text-white/65 max-w-3xl mb-8">
            Model, role, skill, and date for this wave. Human publish still sits last.
          </p>
          <ol className="space-y-4">
            {hubProvenance.map((step, i) => (
              <li key={step.actor} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {String(i + 1).padStart(2, '0')} · {step.date}
                </p>
                <h3 className="mt-1 text-base font-semibold text-white">
                  {step.actor} <span className="font-normal text-white/50">· {step.role}</span>
                </h3>
                <p className="mt-2 text-sm text-white/70">{step.did}</p>
                <p className="mt-2 text-xs text-white/45">Skills / tools: {step.skillOrTool}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="research-faq" className="py-12 md:py-16 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Questions</h2>
          <dl className="space-y-6">
            {hubFaqs.map((item) => (
              <div key={item.q}>
                <dt className="text-base font-semibold text-white">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-white/65">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
