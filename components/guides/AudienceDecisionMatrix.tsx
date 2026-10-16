export interface AudienceDecision {
  audience: string
  call: 'adopt' | 'wait' | 'skip'
  because: string
  source: string
}

const CALL_LABEL = {
  adopt: 'Adopt',
  wait: 'Wait',
  skip: 'Skip',
} as const

/**
 * Presentational decision table. The guide loader supplies every row.
 * This component does not fetch.
 */
export default function AudienceDecisionMatrix({ decisions }: { decisions: AudienceDecision[] }) {
  if (decisions.length === 0) return null

  return (
    <section id="decision-matrix" aria-labelledby="decision-matrix-heading" className="mt-16 scroll-mt-24 border-t border-white/[0.08] pt-12">
      <h2 id="decision-matrix-heading" className="text-3xl font-bold tracking-tight text-white">
        Audience decisions
      </h2>
      <p className="mt-3 max-w-3xl text-[17px] leading-8 text-white/75">
        One call per audience. The source on the row is the page the call has to survive.
      </p>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm text-white/80">
          <caption className="sr-only">Adopt, wait, or skip by audience</caption>
          <thead>
            <tr className="border-b border-white/15 text-white">
              <th scope="col" className="py-3 pr-4 font-semibold">Audience</th>
              <th scope="col" className="py-3 pr-4 font-semibold">Call</th>
              <th scope="col" className="py-3 pr-4 font-semibold">Why</th>
              <th scope="col" className="py-3 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody>
            {decisions.map((row) => (
              <tr key={row.audience} className="border-b border-white/[0.08] align-top">
                <th scope="row" className="py-4 pr-4 font-medium text-white">
                  {row.audience}
                </th>
                <td className="py-4 pr-4 font-semibold text-white">{CALL_LABEL[row.call]}</td>
                <td className="py-4 pr-4 leading-6">{row.because}</td>
                <td className="py-4">
                  <a
                    href={row.source}
                    className="text-cyan-300 underline decoration-cyan-300/40 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                  >
                    {row.source.replace(/^https:\/\//, '')}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
