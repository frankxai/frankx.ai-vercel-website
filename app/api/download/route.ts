import { type NextRequest, NextResponse } from 'next/server'
import { head } from '@vercel/blob'
import registry from '@/data/products.json'
import type { ProductRecord } from '@/types/products'

const products = registry as ProductRecord[]

/**
 * Product Download API
 *
 * Handles secure file downloads from Vercel Blob storage.
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

  try {
    // Get blob metadata and signed URL
    const blobUrl = process.env.BLOB_READ_WRITE_TOKEN
      ? `${process.env.VERCEL_BLOB_STORE_ID}/${file.blobKey}`
      : null

    if (!blobUrl) {
      // For development/preview, return product info
      return NextResponse.json({
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug
        },
        file: {
          name: file.name,
          format: file.format,
          description: file.description
        },
        message: 'Vercel Blob not configured. Set BLOB_READ_WRITE_TOKEN in environment.'
      })
    }

    const blob = await head(blobUrl)

    // Redirect to blob download URL
    return NextResponse.redirect(blob.url)
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve file' },
      { status: 500 }
    )
  }
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

    // Generate download response
    const downloadUrl = `/api/download/file?key=${encodeURIComponent(file.blobKey)}&token=${generateDownloadToken(email, file.blobKey)}`

    return NextResponse.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug
      },
      file: {
        name: file.name,
        format: file.format
      },
      downloadUrl,
      message: `Download link sent! Check your email at ${email}`
    })
  } catch (error) {
    console.error('Download POST error:', error)
    return NextResponse.json(
      { error: 'Failed to process download request' },
      { status: 500 }
    )
  }
}

/**
 * Generate a simple download token
 * In production, use JWT or similar for secure time-limited tokens
 */
function generateDownloadToken(email: string, blobKey: string): string {
  const timestamp = Date.now()
  const data = `${email}:${blobKey}:${timestamp}`
  return Buffer.from(data).toString('base64')
}
