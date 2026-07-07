import { get } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getDataRoomDocument, getDispositionMode } from '@/lib/data-room/registry'

export const dynamic = 'force-dynamic'

type RouteContext = {
  params: Promise<{ documentId: string }>
}

function cleanFilename(filename: string): string {
  return filename.replace(/["\r\n]/g, '')
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { documentId } = await params
  const document = getDataRoomDocument(documentId)
  if (!document) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    return NextResponse.json(
      {
        error: 'Private Blob token is not configured.',
        nextAction: 'Set BLOB_READ_WRITE_TOKEN and upload this document with npm run data-room:upload.',
      },
      { status: 503 }
    )
  }

  try {
    const blob = await get(document.blobPath, {
      access: 'private',
      token,
      useCache: false,
    })

    if (!blob || blob.statusCode !== 200 || !blob.stream) {
      return NextResponse.json(
        {
          error: 'Private document object is not available.',
          nextAction: 'Run npm run data-room:dry-run, then DATA_ROOM_ENABLE_PRIVATE_BLOB_UPLOAD=true npm run data-room:upload.',
        },
        { status: 404 }
      )
    }

    const forceDownload = request.nextUrl.searchParams.get('download') === '1'
    const disposition = getDispositionMode(document, forceDownload)
    const filename = cleanFilename(document.filename)

    return new Response(blob.stream, {
      status: 200,
      headers: {
        'Cache-Control': 'private, no-store',
        'Content-Disposition': `${disposition}; filename="${filename}"`,
        'Content-Length': String(blob.blob.size),
        'Content-Type': blob.blob.contentType || document.contentType,
        'X-Content-Type-Options': 'nosniff',
        'X-Robots-Tag': 'noindex, noarchive, nofollow',
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown storage error'
    const missing = message.toLowerCase().includes('not found')
    return NextResponse.json(
      {
        error: missing ? 'Private document object is not uploaded yet.' : 'Unable to read private document object.',
        nextAction: missing
          ? 'Run DATA_ROOM_ENABLE_PRIVATE_BLOB_UPLOAD=true npm run data-room:upload.'
          : 'Check BLOB_READ_WRITE_TOKEN and Vercel Blob store permissions.',
      },
      { status: missing ? 404 : 502 }
    )
  }
}
