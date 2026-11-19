import { claim, evidence, rounds } from '../case'

export const dynamic = 'force-static'

export function GET() {
  return Response.json({
    schema_version: 1,
    case_id: 'source-check',
    instructions: 'Judge the memo using only the supplied source packet. Return a decision (publish, revise or request), supported wording and the source IDs for that wording.',
    cases: rounds.map((round, index) => ({
      run: index + 1,
      input: { memo: claim, sources: evidence.filter(source => round.sources.includes(source.id)) },
      reference: { decision: round.expected, supported_wording: round.finding, cited_sources: round.citations },
    })),
  }, { headers: { 'Content-Disposition': 'attachment; filename="frankx-source-check-evals.json"' } })
}
