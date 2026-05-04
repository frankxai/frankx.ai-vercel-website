import { ImageResponse } from 'next/og'

// next/og's ImageResponse requires edge runtime in Next 14+ — nodejs runtime
// throws 500 in production (silent server-side error, no logs surfaced).
// Edge runtime ships built-in font fallback so Inter/system fonts work.
export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'FrankX'
  const subtitle = searchParams.get('subtitle')
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // Single solid bg + a single radial accent. next/og's CSS parser
          // reliably handles solid colors and one gradient. The previous
          // 3-stacked-radial-gradient + comma-separated background was logging
          // "Error: Invalid background image" in production runtime logs —
          // the response was 200 with empty body. Simpler bg = guaranteed render.
          backgroundColor: '#0b0d10',
          backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(34,211,238,0.18), transparent 65%)',
          color: '#e8eef5',
          fontSize: 64,
          fontFamily: 'Inter, Arial, sans-serif',
          padding: '80px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 22, color: '#9bb0c6', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
          frankx.ai
        </div>
        <div style={{ marginTop: 28, lineHeight: 1.15, fontWeight: 600 }}>{title}</div>
        {subtitle && (
          <div style={{ marginTop: 24, fontSize: 28, color: '#b9c4d1', maxWidth: 900 }}>
            {subtitle}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

