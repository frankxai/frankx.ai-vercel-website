import { type NextRequest, NextResponse } from 'next/server'
import registry from '@/data/products.json'
import type { ProductRecord } from '@/types/products'
import { isPublicDownloadProduct, publicDownloadUrl } from '@/lib/download-access'

/**
 * Direct File Download Handler
 *
 * Redirect for files listed as public downloads in the product registry.
 * GET /api/download/file?key={blobKey}
 */

const products = registry as ProductRecord[]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const blobKey = searchParams.get('key')

  if (!blobKey) {
    return NextResponse.json(
      { error: 'File key is required' },
      { status: 400 }
    )
  }

  for (const product of products) {
    if (!isPublicDownloadProduct(product) || product.delivery?.requiresEmail !== false) continue
    const file = product.delivery.files?.find(file => file.blobKey === blobKey)
    if (file) return NextResponse.redirect(publicDownloadUrl(file, request.url))
  }

  return NextResponse.json({ error: 'File not found' }, { status: 404 })
}
