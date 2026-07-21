import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'

export const runtime = 'nodejs'

const SITE = 'https://frankx.ai'
const DEFAULT_SIZE = 1024
const MAX_SIZE = 4096

const BRAND_FOREGROUND = '#10b981'
const BRAND_BACKGROUND = '#0a0a0b'

// Allow-list of QR destinations. One endpoint serves every FrankX QR so the
// print pipeline (and the /connect/qr display page) stay in one place. `ref=qr`
// is appended for landing attribution — the destinations already track it.
const DESTINATIONS = {
  connect: { path: '/connect', label: 'frankx.ai/connect' },
  mvu: { path: '/mvu', label: 'frankx.ai/mvu' },
  lab: { path: '/mvu/lab', label: 'frankx.ai/mvu/lab' },
} as const

type DestinationKey = keyof typeof DESTINATIONS

function resolveDestination(value: string | null): (typeof DESTINATIONS)[DestinationKey] {
  return value && value in DESTINATIONS
    ? DESTINATIONS[value as DestinationKey]
    : DESTINATIONS.connect
}

/**
 * Wrap a bare QR SVG in a branded card with a readable caption beneath it, so a
 * scanner-shy human can still read the URL and it looks intentional in print.
 * Nested <svg> preserves the inner QR's own viewBox untouched.
 */
function brandedSvg(innerQrSvg: string, size: number, caption: string, transparent: boolean): string {
  const captionBand = Math.round(size * 0.16)
  const total = size + captionBand
  const fontSize = Math.round(size * 0.045)
  const bg = transparent ? 'none' : BRAND_BACKGROUND
  const inner = innerQrSvg.replace(/^<\?xml[^>]*>\s*/i, '')

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${total}" viewBox="0 0 ${size} ${total}" role="img" aria-label="QR code for ${caption}">`,
    `<rect width="${size}" height="${total}" rx="${Math.round(size * 0.04)}" fill="${bg}"/>`,
    `<svg x="0" y="0" width="${size}" height="${size}">${inner}</svg>`,
    `<text x="${size / 2}" y="${size + captionBand / 2}" fill="${BRAND_FOREGROUND}" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="${fontSize}" font-weight="600" text-anchor="middle" dominant-baseline="middle" letter-spacing="0.5">${caption}</text>`,
    `</svg>`,
  ].join('')
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const fmt = (searchParams.get('fmt') ?? 'svg').toLowerCase()
  const sizeParam = Number.parseInt(searchParams.get('size') ?? `${DEFAULT_SIZE}`, 10)
  const size = Number.isFinite(sizeParam) ? Math.min(Math.max(sizeParam, 256), MAX_SIZE) : DEFAULT_SIZE
  const transparent = searchParams.get('bg') === 'transparent'
  const caption = searchParams.get('caption') === '1'

  const dest = resolveDestination(searchParams.get('to'))
  const targetUrl = `${SITE}${dest.path}?ref=qr`
  const fileBase = dest.path.replace(/\//g, '-').replace(/^-/, '') || 'connect'

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
    // PNG: raster, no caption (compositing text needs a canvas dep we avoid).
    // Best for stickers/print where the URL is set alongside in the layout.
    if (fmt === 'png') {
      const buffer = await QRCode.toBuffer(targetUrl, { ...options, type: 'png' })
      const body = new Uint8Array(buffer)
      return new NextResponse(body, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable',
          'Content-Disposition': `inline; filename="frankx-${fileBase}-qr-${size}.png"`,
        },
      })
    }

    // SVG: vector, optional branded caption card (?caption=1).
    const qrSvg = await QRCode.toString(targetUrl, { ...options, type: 'svg' })
    const svg = caption ? brandedSvg(qrSvg, size, dest.label, transparent) : qrSvg

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable',
        'Content-Disposition': `inline; filename="frankx-${fileBase}-qr${caption ? '-card' : ''}.svg"`,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to render QR code', detail: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
