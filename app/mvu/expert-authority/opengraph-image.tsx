import { ImageResponse } from 'next/og'

export const alt = 'Expert Authority Intelligence System — five connected engines'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const engines = [
  ['01', 'Expert', 'Canon Engine'],
  ['02', 'Audience', 'Signal Engine'],
  ['03', 'Authority', 'Synthesis Engine'],
  ['04', 'Product', 'Offer Engine'],
  ['05', 'Funnel', 'Growth Engine'],
] as const

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '54px 62px',
          color: 'white',
          background:
            'radial-gradient(circle at 12% 8%, rgba(34,211,238,.2), transparent 30%), radial-gradient(circle at 88% 90%, rgba(217,70,239,.18), transparent 34%), linear-gradient(135deg, #07131b 0%, #09090b 50%, #150b25 100%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              color: '#67e8f9',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 4,
            }}
          >
            {'FRANKX.AI · STARLIGHT LABS'}
          </div>
          <div
            style={{
              marginTop: 24,
              display: 'flex',
              flexDirection: 'column',
              fontSize: 58,
              lineHeight: 1.02,
              fontWeight: 760,
              letterSpacing: -2.8,
            }}
          >
            <div style={{ display: 'flex' }}>{'Expert Authority'}</div>
            <div style={{ display: 'flex' }}>{'Intelligence System'}</div>
          </div>
          <div
            style={{
              marginTop: 18,
              display: 'flex',
              color: '#a1a1aa',
              fontSize: 23,
            }}
          >
            {'One persistent system. Five governed engines. One compounding learning loop.'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14 }}>
          {engines.map(([index, name, engine]) => (
            <div
              key={index}
              style={{
                width: 204,
                height: 150,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '18px 18px 16px',
                border: '1px solid rgba(255,255,255,.14)',
                borderRadius: 22,
                background: 'rgba(255,255,255,.045)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  color: '#67e8f9',
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                {index}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', fontSize: 25, fontWeight: 760 }}>{name}</div>
                <div
                  style={{
                    marginTop: 4,
                    display: 'flex',
                    color: '#c4b5fd',
                    fontSize: 16,
                  }}
                >
                  {engine}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
