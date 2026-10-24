import { getObservabilitySummary, formatObservabilityMarkdownBrief } from '@/lib/observability/observability-summary'
import { boundedInteger, measurementHttpStatus } from '@/lib/observability/measurement-result'

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const summary = await getObservabilitySummary(boundedInteger(params.get('days'), 30, 365))
  const status = measurementHttpStatus(summary.status)
  if (params.get('format') === 'markdown') return new Response(formatObservabilityMarkdownBrief(summary), { status, headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'no-store' } })
  return Response.json({ success: summary.status === 'ok', status: summary.status, data: summary }, { status, headers: { 'Cache-Control': 'no-store' } })
}
