import atlas from '@/data/economy-atlas.json'
import { economyAtlasAvailable } from '@/lib/research/economy-release'

export const dynamic = 'force-dynamic'
export function GET() {
  if (!economyAtlasAvailable(process.env)) return Response.json({ error: 'Not found' }, { status: 404, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } })
  return Response.json(atlas, { headers: {
    'Content-Disposition': 'attachment; filename="frankx-economic-atlas.json"',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'public, max-age=0, must-revalidate',
  } })
}
