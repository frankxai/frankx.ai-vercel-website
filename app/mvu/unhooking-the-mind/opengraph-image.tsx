import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Unhooking the Mind — a thought can appear without becoming an instruction'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TRACE = ['01  FACT', '02  BODY', '03  STORY', '04  IDENTITY', '05  CHOICE']

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#090907',
          color: 'white',
          padding: '68px 72px',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -80,
            top: -150,
            width: 620,
            height: 620,
            borderRadius: 999,
            display: 'flex',
            background: 'radial-gradient(circle, rgba(252,211,77,.14), transparent 68%)',
          }}
        />

        <div style={{ width: '65%', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              color: 'rgba(252,211,77,.72)',
              fontSize: 16,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            MVU Tallinn · 27 Jul · Practice Guide
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 'auto',
              marginBottom: 32,
              fontSize: 88,
              lineHeight: 1.03,
              fontWeight: 750,
              letterSpacing: -4,
            }}
          >
            <span>Unhooking</span>
            <span>the mind.</span>
          </div>
          <div
            style={{
              display: 'flex',
              color: 'rgba(255,255,255,.56)',
              fontSize: 25,
            }}
          >
            A thought can appear without becoming an instruction.
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 'auto',
              color: 'rgba(255,255,255,.32)',
              fontSize: 16,
            }}
          >
            frankx.ai/mvu/unhooking-the-mind
          </div>
        </div>

        <div
          style={{
            width: '35%',
            display: 'flex',
            flexDirection: 'column',
            borderLeft: '1px solid rgba(252,211,77,.22)',
            paddingLeft: 48,
            paddingTop: 24,
            paddingBottom: 44,
          }}
        >
          {TRACE.map((step, index) => (
            <div
              key={step}
              style={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                borderBottom:
                  index === TRACE.length - 1
                    ? '1px solid rgba(252,211,77,.65)'
                    : '1px solid rgba(255,255,255,.13)',
                color:
                  index === TRACE.length - 1
                    ? '#fcd34d'
                    : 'rgba(255,255,255,.42)',
                fontSize: 14,
                letterSpacing: 2,
              }}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
