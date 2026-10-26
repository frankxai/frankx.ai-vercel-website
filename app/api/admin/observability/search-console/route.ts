import { getSearchPerformance } from '@/lib/observability/google-search-console'
import { boundedInteger, measurementHttpStatus } from '@/lib/observability/measurement-result'

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const entry = await getSearchPerformance({ days: boundedInteger(params.get('days'), 28, 365), rowLimit: boundedInteger(params.get('limit'), 50, 25000) })
  return Response.json({ success: entry.status === 'ok', status: entry.status, data: entry }, { status: measurementHttpStatus(entry.status), headers: { 'Cache-Control': 'no-store' } })
}
