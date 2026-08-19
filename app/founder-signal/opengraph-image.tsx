import { ImageResponse } from 'next/og'

export const alt =
  'Founder Signal OS. Your voice is the moat. Most AI stacks average it away.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const LAYERS = ['Origin', 'Judgment', 'Voice', 'Compounding'] as const

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
          padding: '58px 64px',
          color: 'white',
          background:
            'radial-gradient(circle at 14% 6%, rgba(16,185,129,.22), transparent 34%), radial-gradient(circle at 92% 96%, rgba(6,182,212,.14), transparent 32%), linear-gradient(140deg, #08130f 0%, #0a0a0b 52%, #0a1416 100%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              color: '#34d399',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 4,
            }}
          >
            {'FRANKX.AI'}
          </div>
          <div
            style={{
              marginTop: 26,
              display: 'flex',
              flexDirection: 'column',
              fontSize: 62,
              lineHeight: 1.03,
              fontWeight: 760,
              letterSpacing: -3,
            }}
          >
            <div style={{ display: 'flex' }}>{'Your voice is the moat.'}</div>
            <div style={{ display: 'flex', color: '#a1a1aa' }}>
              {'Most AI stacks average it away.'}
            </div>
          </div>
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              color: '#a1a1aa',
              fontSize: 23,
            }}
          >
            {'Founder Signal OS. A creator-owned intelligence layer, plus a free signal scan.'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          {LAYERS.map((layer) => (
            <div
              key={layer}
              style={{
                width: 254,
                height: 104,
                display: 'flex',
                alignItems: 'flex-end',
                padding: '18px 22px',
                border: '1px solid rgba(255,255,255,.14)',
                borderRadius: 22,
                background: 'rgba(255,255,255,.045)',
                fontSize: 27,
                fontWeight: 700,
              }}
            >
              {layer}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
