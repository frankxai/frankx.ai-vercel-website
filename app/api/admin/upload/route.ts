import { type NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

/**
 * Admin Upload API
 *
 * POST /api/admin/upload
 * Body: FormData with:
 *   - file: the file to upload
 *   - path: blob storage path (e.g., "products/soulbook/soulbook-7-pillars.pdf")
 *
 * Protected by ADMIN_SECRET header check.
 * Only works in production (needs BLOB_READ_WRITE_TOKEN).
 */

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'frankx-admin-2026'

export async function POST(request: NextRequest) {
  // Simple auth check
  const authHeader = request.headers.get('x-admin-secret')
  if (authHeader !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const path = formData.get('path') as string | null

  if (!file || !path) {
    return NextResponse.json(
      { error: 'file and path are required' },
      { status: 400 }
    )
  }

  const blob = await put(path, file, {
    access: 'public',
    addRandomSuffix: false,
  })

  return NextResponse.json({
    success: true,
    url: blob.url,
    pathname: blob.pathname,
    size: file.size,
    contentType: file.type,
  })
}
