import { type NextRequest, NextResponse } from 'next/server'
import registry from '@/data/products.json'
import type { ProductRecord } from '@/types/products'

const products = registry as ProductRecord[]

/**
 * Your existing Vercel Blob storage base URL
 * Files are publicly accessible at this URL
 */
const BLOB_BASE_URL = 'https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com'

/**
 * Product Download API
 *
 * Handles file downloads from your existing Vercel Blob storage.
 * Supports gated downloads (email required) and direct downloads.
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

  // Construct the public blob URL
  const blobUrl = `${BLOB_BASE_URL}/${file.blobKey}`

  // Redirect to the public blob URL for download
  return NextResponse.redirect(blobUrl)
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

    // TODO: Store email for newsletter/follow-up
    // This would integrate with ConvertKit, Resend, or similar
    console.log(`Download request from ${email} for ${product.name}`)

    // Generate direct download URL from your blob storage
    const downloadUrl = `${BLOB_BASE_URL}/${file.blobKey}`

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
        url: downloadUrl
      },
      message: `Thanks ${email}! Your download is ready.`
    })
  } catch (error) {
    console.error('Download POST error:', error)
    return NextResponse.json(
      { error: 'Failed to process download request' },
      { status: 500 }
    )
  }
}

