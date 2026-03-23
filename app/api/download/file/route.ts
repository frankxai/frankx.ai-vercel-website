import { type NextRequest, NextResponse } from 'next/server'

/**
 * Direct File Download Handler
 *
 * Simple redirect to your public Vercel Blob storage.
 * GET /api/download/file?key={blobKey}
 */

const BLOB_BASE_URL = 'https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const blobKey = searchParams.get('key')

  if (!blobKey) {
    return NextResponse.json(
      { error: 'File key is required' },
      { status: 400 }
    )
  }

  // Redirect directly to your public blob storage
  const blobUrl = `${BLOB_BASE_URL}/${blobKey}`
  return NextResponse.redirect(blobUrl)
}
