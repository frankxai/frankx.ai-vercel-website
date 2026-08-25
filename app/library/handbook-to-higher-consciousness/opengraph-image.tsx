import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Handbook to Higher Consciousness — complete system map';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const ratingMarkers = [true, true, true, true, false] as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#070708',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 620,
            height: 620,
            left: -180,
            top: -250,
            borderRadius: 999,
            background: 'rgba(251, 191, 36, 0.13)',
            filter: 'blur(90px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            right: -160,
            bottom: -240,
            borderRadius: 999,
            background: 'rgba(139, 92, 246, 0.10)',
            filter: 'blur(90px)',
          }}
        />

        <div
          style={{
            margin: 52,
            padding: 48,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 30,
            background: 'rgba(255,255,255,0.025)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                padding: '9px 15px',
                borderRadius: 99,
                border: '1px solid rgba(252, 211, 77, 0.25)',
                background: 'rgba(252, 211, 77, 0.07)',
                color: '#fde68a',
                fontSize: 16,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              FrankX Library · Field Manual
            </div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 18 }}>1975 · 22 min</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                maxWidth: 880,
                fontSize: 67,
                lineHeight: 0.98,
                letterSpacing: '-0.05em',
                fontWeight: 700,
              }}
            >
              Handbook to Higher Consciousness
            </div>
            <div style={{ marginTop: 20, fontSize: 27, color: 'rgba(255,255,255,0.55)' }}>
              Ken Keyes Jr.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 28 }}>
              {[
                ['07', 'Centers'],
                ['12', 'Pathways'],
                ['05+', 'Methods'],
                ['05', 'Stages'],
              ].map(([value, label]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
                  <span style={{ color: '#fde68a', fontSize: 27, fontWeight: 700 }}>{value}</span>
                  <span
                    style={{
                      color: 'rgba(255,255,255,0.38)',
                      fontSize: 13,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div
              role="img"
              aria-label="4 out of 5 stars"
              style={{ display: 'flex', gap: 8 }}
            >
              {ratingMarkers.map((filled, index) => (
                <span
                  key={index}
                  style={{
                    width: 17,
                    height: 17,
                    borderRadius: 999,
                    border: '2px solid #fcd34d',
                    background: filled ? '#fcd34d' : 'transparent',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
