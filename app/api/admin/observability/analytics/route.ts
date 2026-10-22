import { getGA4Overview, getGA4TopPages, getGA4TrafficSources, getGA4Realtime, getGA4PropertyId } from '@/lib/observability/google-analytics'
import { boundedInteger, combinedStatus, measurementHttpStatus } from '@/lib/observability/measurement-result'

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const days = boundedInteger(params.get('days'), 30, 365)
  const view = params.get('view') || 'all'
  if (!['all', 'overview', 'pages', 'sources', 'realtime'].includes(view)) return Response.json({ success: false, error: 'Unknown analytics view.' }, { status: 400 })
  const readers = { overview: () => getGA4Overview(days), pages: () => getGA4TopPages(days, 25), sources: () => getGA4TrafficSources(days), realtime: () => getGA4Realtime() }
  if (view !== 'all') {
    const entry = await readers[view as keyof typeof readers]()
    return Response.json({ success: entry.status === 'ok', status: entry.status, data: entry }, { status: measurementHttpStatus(entry.status), headers: { 'Cache-Control': 'no-store' } })
  }
  const [overview, topPages, sources, realtime] = await Promise.all([readers.overview(), readers.pages(), readers.sources(), readers.realtime()])
  const status = combinedStatus([overview, topPages, sources, realtime])
  return Response.json({ success: status === 'ok', status, propertyId: getGA4PropertyId(), data: { overview, topPages, sources, realtime } }, { status: measurementHttpStatus(status), headers: { 'Cache-Control': 'no-store' } })
}
