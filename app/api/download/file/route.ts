import { type NextRequest, NextResponse } from 'next/server'
import { head, list } from '@vercel/blob'

/**
 * File Download Handler
 *
 * Retrieves files from Vercel Blob storage with token validation.
 * Tokens are time-limited (24 hours by default).
 *
 * GET /api/download/file?key={blobKey}&token={downloadToken}
 */

const TOKEN_VALIDITY_MS = 24 * 60 * 60 * 1000 // 24 hours

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const blobKey = searchParams.get('key')
  const token = searchParams.get('token')

  if (!blobKey) {
    return NextResponse.json(
      { error: 'File key is required' },
      { status: 400 }
    )
  }

  // Validate token if provided
  if (token) {
    const validation = validateDownloadToken(token, blobKey)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error || 'Invalid or expired download token' },
        { status: 403 }
      )
    }
  }

  // Check for Vercel Blob configuration
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({
      error: 'Vercel Blob not configured',
      message: 'Set BLOB_READ_WRITE_TOKEN in environment variables',
      debug: {
        key: blobKey,
        hasToken: !!token
      }
    }, { status: 503 })
  }

  try {
    // List blobs to find the file
    const { blobs } = await list({
      prefix: blobKey,
      limit: 1
    })

    if (!blobs.length) {
      return NextResponse.json(
        { error: 'File not found in storage' },
        { status: 404 }
      )
    }

    const blob = blobs[0]

    // Redirect to the blob URL for download
    return NextResponse.redirect(blob.url)
  } catch (error) {
    console.error('File download error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve file from storage' },
      { status: 500 }
    )
  }
}

/**
 * Validate download token
 */
function validateDownloadToken(token: string, expectedBlobKey: string): { valid: boolean; error?: string } {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const parts = decoded.split(':')

    if (parts.length !== 3) {
      return { valid: false, error: 'Invalid token format' }
    }

    const [_email, blobKey, timestampStr] = parts
    const timestamp = parseInt(timestampStr, 10)

    // Check blob key matches
    if (blobKey !== expectedBlobKey) {
      return { valid: false, error: 'Token does not match requested file' }
    }

    // Check token hasn't expired
    const now = Date.now()
    if (now - timestamp > TOKEN_VALIDITY_MS) {
      return { valid: false, error: 'Download token has expired' }
    }

    return { valid: true }
  } catch {
    return { valid: false, error: 'Failed to validate token' }
  }
}
