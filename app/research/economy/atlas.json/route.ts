import atlas from '@/data/economy-atlas.json'

export const dynamic = 'force-static'
export function GET() {
  return Response.json(atlas, { headers: {
    'Content-Disposition': 'attachment; filename="frankx-economic-atlas.json"',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'public, max-age=0, must-revalidate',
  } })
}
