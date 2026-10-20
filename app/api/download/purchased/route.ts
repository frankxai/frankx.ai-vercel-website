import registry from '@/data/products.json'
import type { ProductRecord } from '@/types/products'
import { purchasedDownload } from '@/lib/product-fulfillment'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export function GET(request: Request) {
  return purchasedDownload(request, {
    products: registry as ProductRecord[],
    secret: process.env.PRODUCT_DOWNLOAD_SECRET,
  })
}
