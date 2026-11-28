import { after, type NextRequest, NextResponse } from 'next/server'
import registry from '@/data/products.json'
import type { ProductRecord } from '@/types/products'
import { isPublicDownloadProduct, publicDownloadUrl } from '@/lib/download-access'
import { describeStoreFailure } from '@/lib/store-failure'
import { TRACKED_GUIDES, trackDirectDownloadOnce } from '@/lib/pdf-analytics'
import { bookDownloadRatelimit, getClientIdentifier } from '@/lib/ratelimit'

const products = registry as ProductRecord[]

/**
 * Product Download API
 *
 * Resolves catalogued downloads from the app bundle or Vercel Blob.
 * Provides direct free downloads; legacy POST validates email without enrollment.
 *
 * GET /api/download?product={slug}&file={filename}
 * POST /api/download (with email for gated content)
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const productSlug = searchParams.get('product')
  const fileName = searchParams.get('file')

  if (!productSlug) {
    return NextResponse.json(
      { error: 'Product slug is required' },
      { status: 400 }
    )
  }

  const product = products.find(p => p.slug === productSlug)

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  }

  if (!isPublicDownloadProduct(product)) {
    return NextResponse.json(
      { error: 'Download unavailable' },
      { status: 404 }
    )
  }

  // Check if product has delivery configuration
  if (!product.delivery?.files?.length) {
    return NextResponse.json(
      { error: 'No downloadable files available for this product' },
      { status: 404 }
    )
  }

  // Check if gated and requires email
  if (product.delivery.requiresEmail) {
    return NextResponse.json(
      { error: 'This product requires email registration. Use POST with email.' },
      { status: 403 }
    )
  }

  // Find the requested file or return first available
  const file = fileName
    ? product.delivery.files.find(f => f.name === fileName)
    : product.delivery.files[0]

  if (!file) {
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    )
  }

  // Count a production redirect once per rendered link. The attempt token is
  // short-lived and never enters the stored event or the public Blob URL.
  const attemptId = searchParams.get('attempt')
  if (request.method === 'GET' && process.env.VERCEL_ENV === 'production' && attemptId && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(attemptId) && TRACKED_GUIDES.has(product.slug) && request.headers.get('dnt') !== '1' && request.headers.get('sec-gpc') !== '1') {
    try {
      after(async () => {
        try {
          const { success } = await bookDownloadRatelimit.limit(getClientIdentifier(request))
          if (!success) return
          await trackDirectDownloadOnce({
            guideSlug: product.slug,
            guideTitle: product.name || (product as ProductRecord & { title?: string }).title || product.slug,
            downloadMethod: 'direct',
          }, attemptId)
        } catch (error) {
          console.error('Book download analytics failed:', describeStoreFailure(error, 'store'))
        }
      })
    } catch (error) {
      console.error('Book download analytics scheduling failed:', describeStoreFailure(error, 'store'))
    }
  }

  return NextResponse.redirect(publicDownloadUrl(file, request.url))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productSlug, email, fileName } = body

    if (!productSlug) {
      return NextResponse.json(
        { error: 'Product slug is required' },
        { status: 400 }
      )
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required for gated content' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const product = products.find(p => p.slug === productSlug)

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (!isPublicDownloadProduct(product)) {
      return NextResponse.json(
        { error: 'Download unavailable' },
        { status: 404 }
      )
    }

    if (!product.delivery?.files?.length) {
      return NextResponse.json(
        { error: 'No downloadable files available' },
        { status: 404 }
      )
    }

    // Find requested file or first available
    const file = fileName
      ? product.delivery.files.find(f => f.name === fileName)
      : product.delivery.files[0]

    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug
      },
      file: {
        name: file.name,
        format: file.format,
        url: publicDownloadUrl(file, request.url)
      },
      message: 'Your download is ready.'
    })
  } catch (error) {
    console.error('Download POST error:', error)
    return NextResponse.json(
      { error: 'Failed to process download request' },
      { status: 500 }
    )
  }
}
