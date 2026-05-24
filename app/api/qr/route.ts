import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'

export const runtime = 'nodejs'

const TARGET_URL = 'https://frankx.ai/connect'
const DEFAULT_SIZE = 1024
const MAX_SIZE = 4096

const BRAND_FOREGROUND = '#10b981'
const BRAND_BACKGROUND = '#0a0a0b'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const fmt = (searchParams.get('fmt') ?? 'svg').toLowerCase()
  const sizeParam = Number.parseInt(searchParams.get('size') ?? `${DEFAULT_SIZE}`, 10)
  const size = Number.isFinite(sizeParam) ? Math.min(Math.max(sizeParam, 256), MAX_SIZE) : DEFAULT_SIZE
  const transparent = searchParams.get('bg') === 'transparent'

  const options: QRCode.QRCodeToStringOptions & QRCode.QRCodeToBufferOptions = {
    errorCorrectionLevel: 'H',
    margin: 2,
    width: size,
    color: {
      dark: BRAND_FOREGROUND,
      light: transparent ? '#00000000' : BRAND_BACKGROUND,
    },
  }

  try {
    if (fmt === 'png') {
      const buffer = await QRCode.toBuffer(TARGET_URL, { ...options, type: 'png' })
      const body = new Uint8Array(buffer)
      return new NextResponse(body, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable',
          'Content-Disposition': `inline; filename="frankx-connect-qr-${size}.png"`,
        },
      })
    }

    const svg = await QRCode.toString(TARGET_URL, { ...options, type: 'svg' })
    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable',
        'Content-Disposition': `inline; filename="frankx-connect-qr.svg"`,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to render QR code', detail: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
