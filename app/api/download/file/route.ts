import { type NextRequest, NextResponse } from 'next/server'
import registry from '@/data/products.json'
import type { ProductRecord } from '@/types/products'
import { isPublicDownloadProduct } from '@/lib/download-access'

/**
 * Direct File Download Handler
 *
 * Redirect for files listed as public downloads in the product registry.
 * GET /api/download/file?key={blobKey}
 */

const BLOB_BASE_URL = 'https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com'
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

  const publicFile = products.some(product =>
    isPublicDownloadProduct(product) &&
    product.delivery?.requiresEmail === false &&
    product.delivery?.files?.some(file => file.blobKey === blobKey)
  )
  if (!publicFile) {
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    )
  }

  // Redirect directly to your public blob storage
  const blobUrl = `${BLOB_BASE_URL}/${blobKey}`
  return NextResponse.redirect(blobUrl)
}
