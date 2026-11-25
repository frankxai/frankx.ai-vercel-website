import { z } from 'zod'
import { glassManifestSchema } from '@/lib/commerce/glass-edition'

export function GET() {
  return Response.json(z.toJSONSchema(glassManifestSchema), { headers: { 'Cache-Control': 'public, max-age=300' } })
}
