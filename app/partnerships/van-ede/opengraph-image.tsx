import { ImageResponse } from 'next/og'

// Branded OG for the private proposal — the link gets shared by email/WhatsApp,
// so it still needs a real image even though the page is noindex.
export const runtime = 'nodejs'
export const alt = 'FrankX × Van Ede & Partners — Partnership Proposal'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #09090b 0%, #0b1513 50%, #0a0a0b 100%)',
          padding: 72,
          color: 'white',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -180,
            left: -160,
            width: 540,
            height: 540,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(16,185,129,0.20), transparent 70%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            fontSize: 26,
            fontWeight: 700,
            color: '#10b981',
            textTransform: 'uppercase',
            letterSpacing: 8,
          }}
        >
          Partnership Proposal
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 'auto',
            marginBottom: 28,
          }}
        >
          <div style={{ display: 'flex', fontSize: 88, fontWeight: 900, letterSpacing: -2 }}>
            FrankX
            <span style={{ color: 'rgba(255,255,255,0.45)', margin: '0 24px' }}>×</span>
            Van Ede
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 38,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.7)',
              marginTop: 18,
            }}
          >
            Human guidance, amplified by intelligence.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            color: 'rgba(255,255,255,0.55)',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 28,
          }}
        >
          <span>Prepared exclusively for Van Ede &amp; Partners</span>
          <span style={{ color: '#10b981', fontWeight: 600 }}>frankx.ai</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
