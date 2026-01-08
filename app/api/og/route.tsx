import { ImageResponse } from 'next/og'

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
          background: 'radial-gradient(circle at top, rgba(16,185,129,0.25), transparent 60%), radial-gradient(circle at 20% 70%, rgba(34,211,238,0.2), transparent 60%), radial-gradient(circle at 80% 80%, rgba(245,158,11,0.18), transparent 60%), #0b0d10',
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

