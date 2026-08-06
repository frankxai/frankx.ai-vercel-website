import { ImageResponse } from 'next/og'

export const alt = 'What stayed after Tallinn — independent MVU 2026 field notes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const states = [
  ['19', 'captured'],
  ['5', 'public'],
  ['14', 'held'],
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
          padding: '64px 70px',
          color: 'white',
          background: '#05080c',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', fontSize: 22, color: '#67e8f9' }}>
            Mindvalley University · Tallinn 2026
          </div>
          <div style={{ display: 'flex', fontSize: 22, fontWeight: 700 }}>FrankX.AI</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              maxWidth: 920,
              fontSize: 76,
              lineHeight: 0.98,
              fontWeight: 760,
              letterSpacing: -4.2,
            }}
          >
            What stayed after Tallinn.
          </div>
          <div
            style={{
              display: 'flex',
              maxWidth: 900,
              marginTop: 24,
              fontSize: 25,
              lineHeight: 1.35,
              color: '#a7b0ba',
            }}
          >
            Five edited field notes on what held up after the room emptied — and the systems the experience made me build.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'stretch', gap: 14 }}>
          {states.map(([value, label]) => (
            <div
              key={label}
              style={{
                width: 170,
                display: 'flex',
                alignItems: 'baseline',
                gap: 10,
                padding: '14px 18px',
                border: '1px solid rgba(255,255,255,.13)',
                borderRadius: 18,
                background: 'rgba(255,255,255,.035)',
              }}
            >
              <span style={{ display: 'flex', fontSize: 30, fontWeight: 760 }}>{value}</span>
              <span style={{ display: 'flex', fontSize: 17, color: '#8b949e' }}>{label}</span>
            </div>
          ))}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              color: '#8b949e',
              fontSize: 18,
            }}
          >
            Independent participant field record
          </div>
        </div>
      </div>
    ),
    size,
  )
}
