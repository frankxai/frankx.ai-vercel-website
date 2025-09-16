import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'FrankX'
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
          background: '#0b0d10',
          color: '#e8eef5',
          fontSize: 64,
          fontFamily: 'Inter, Arial, sans-serif',
          padding: '60px'
        }}
      >
        <div style={{ fontSize: 24, color: '#9bb0c6', marginBottom: 16 }}>frankx.ai</div>
        <div style={{ textAlign: 'center', lineHeight: 1.2 }}>{title}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

