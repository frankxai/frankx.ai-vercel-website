import { products } from '@/lib/products'
import { glassPublicManifest } from '@/lib/commerce/glass-edition'

export function GET() {
  const manifest = glassPublicManifest(products)
  if (!manifest) return Response.json({ error: 'edition_unavailable' }, { status: 404 })
  return Response.json(manifest, { headers: { 'Cache-Control': 'public, max-age=300', 'X-Content-Type-Options': 'nosniff', Link: '</api/products/aurora-ui-kit/essential/manifest/schema>; rel="describedby"' } })
}
