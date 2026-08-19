import QRCode from 'qrcode'

export const dynamic = 'force-static'

export async function GET() {
  const image = await QRCode.toBuffer('https://frankx.ai/mvu/expert-authority', {
    type: 'png',
    width: 440,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#09090B',
      light: '#FFFFFF',
    },
  })

  return new Response(new Uint8Array(image), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Disposition': 'inline; filename="expert-authority-qr.png"',
    },
  })
}
