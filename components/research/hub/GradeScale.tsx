import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const grades = [
  {
    letter: 'A',
    label: 'peer reviewed',
    note: 'Journal or conference, checkable',
    rule: 'bg-emerald-300',
  },
  {
    letter: 'B',
    label: 'clinical or industry',
    note: 'Trials, filings, first-party data',
    rule: 'bg-cyan-400',
  },
  {
    letter: 'C',
    label: 'mixed evidence',
    note: 'Promising, contested or thin',
    rule: 'bg-white/40',
  },
  {
    letter: 'D',
    label: 'traditional or editorial',
    note: 'Lineage and practice',
    rule: 'bg-white/25',
  },
]

/**
 * The A to D scale used on The Light Within. Rendered as text and rules rather
 * than an image so it reflows and stays selectable.
 */
export default function GradeScale() {
  return (
    <section
      id="grades"
      aria-labelledby="grades-title"
      className="scroll-mt-24 border-b border-white/[0.08] py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <p className="font-mono text-[10.5px] tracking-[0.1em] text-white/45">02 / Grades</p>
            <h2
              id="grades-title"
              className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-white md:text-3xl"
            >
              What a grade means here
            </h2>
            <p className="mt-4 max-w-[44ch] text-sm leading-6 text-white/65">
              A grade describes where a claim came from. It follows the claim into the
              page, so you can see where the evidence stops and the interpretation starts.
            </p>
            <Link
              href="/research/methodology"
              className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Read the grading rules
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-emerald-300" />
            </Link>
          </div>

          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
            {grades.map((grade) => (
              <div key={grade.letter} className="bg-[#0b0b0c] p-5">
                <span aria-hidden="true" className={`block h-[3px] w-10 rounded-full ${grade.rule}`} />
                <dt className="mt-4 flex items-baseline gap-3">
                  <span className="font-display text-2xl font-semibold leading-none text-white">
                    {grade.letter}
                  </span>
                  <span className="text-[13.5px] text-white/80">{grade.label}</span>
                </dt>
                <dd className="mt-2 font-mono text-[10.5px] leading-5 text-white/45">
                  {grade.note}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-6 font-mono text-[10.5px] tracking-[0.04em] text-white/40">
          Grade labels from /research/the-light-within. Applied per claim.
        </p>
      </div>
    </section>
  )
}
