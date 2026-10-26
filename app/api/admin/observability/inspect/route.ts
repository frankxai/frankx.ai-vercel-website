import { inspectUrlIndexStatus } from '@/lib/observability/google-search-console'
import { measurementHttpStatus } from '@/lib/observability/measurement-result'

export async function POST(request: Request) {
  let body: unknown
  try { body = await request.json() } catch { return Response.json({ success: false, error: 'Expected a JSON body.' }, { status: 400 }) }
  if (!body || typeof body !== 'object' || !('url' in body) || typeof body.url !== 'string') return Response.json({ success: false, error: 'Target URL is required.' }, { status: 400 })
  const entry = await inspectUrlIndexStatus(body.url)
  return Response.json({ success: entry.status === 'ok', status: entry.status, data: entry }, { status: measurementHttpStatus(entry.status), headers: { 'Cache-Control': 'no-store' } })
}
