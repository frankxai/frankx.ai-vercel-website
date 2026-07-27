import { ImageResponse } from 'next/og'

// Runtime: Edge intentionally retained. next/og's ImageResponse historically
// required edge runtime — nodejs runtime threw 500 in production (silent
// server-side error, no logs surfaced). Edge runtime ships built-in font
// fallback so Inter/system fonts work.
//
// TODO: validate Fluid Compute compatibility in Next 16+. Vercel's
// vercel:knowledge-update (2026-02-27) recommends migrating off Edge to
// Fluid Compute everywhere, but this route is a documented exception
// until verified. Migration test: remove this export, deploy preview,
// curl /api/og?title=test, verify 200 + valid PNG output.
export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'FrankX'
  const subtitle = searchParams.get('subtitle')
  const variant = searchParams.get('variant')

  if (variant === 'community-platforms') {
    const ownershipRows = [
      {
        index: '01',
        title: 'Rent the engine',
        detail: 'Identity · payments · moderation · notifications',
        signal: 'CIRCLE',
        active: true,
      },
      {
        index: '02',
        title: 'Operate the intelligence',
        detail: 'Official MCP · API · workflows · approval policy',
        signal: 'AI LAYER',
      },
      {
        index: '03',
        title: 'Own critical surfaces',
        detail: 'Branded app · custom onboarding · headless journeys',
        signal: 'EVIDENCE GATE',
      },
      {
        index: '04',
        title: 'Build the behavior',
        detail: 'Matching · reputation · creation tools · new social primitive',
        signal: 'MOAT',
      },
    ]

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background:
              'radial-gradient(circle at 82% 8%, rgba(39, 211, 159, 0.10), transparent 34%), linear-gradient(112deg, #07090a 0%, #080b0d 54%, #071012 100%)',
            color: '#f5f7f6',
            fontFamily: 'Inter, Arial, sans-serif',
            padding: '52px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              color: '#3ee0aa',
              fontFamily: 'monospace',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.20em',
            }}
          >
            <div style={{ display: 'flex' }}>FRANKX / DECISION SYSTEM</div>
            <div style={{ display: 'flex' }}>60 PLATFORMS · JULY 2026</div>
          </div>

          <div
            style={{
              display: 'flex',
              flex: 1,
              width: '100%',
              marginTop: 24,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '51%',
                paddingRight: 48,
                borderRight: '1px solid rgba(255,255,255,0.16)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: 62,
                  fontWeight: 740,
                  letterSpacing: '-0.052em',
                  lineHeight: 0.98,
                }}
              >
                <div style={{ display: 'flex' }}>Circle vs Custom</div>
                <div style={{ display: 'flex' }}>Community App</div>
                <div style={{ display: 'flex', color: '#aab6b4' }}>The 2026 Guide</div>
              </div>

              <div
                style={{
                  display: 'flex',
                  marginTop: 26,
                  maxWidth: 520,
                  color: '#c4cecc',
                  fontSize: 20,
                  lineHeight: 1.45,
                }}
              >
                A source-led operating decision for creators who need premium
                community, AI leverage, and a credible path to their own app.
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  marginTop: 'auto',
                  borderTop: '1px solid rgba(255,255,255,0.18)',
                  borderBottom: '1px solid rgba(255,255,255,0.18)',
                  padding: '15px 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: 134,
                    color: '#3ee0aa',
                    fontFamily: 'monospace',
                    fontSize: 12,
                    lineHeight: 1.35,
                    letterSpacing: '0.12em',
                  }}
                >
                  PRODUCTION
                  <br />
                  RECOMMENDATION
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    color: '#eaf0ee',
                    fontSize: 15,
                    lineHeight: 1.42,
                  }}
                >
                  <div style={{ display: 'flex', fontWeight: 700 }}>
                    Circle Business for the 90-day pilot.
                  </div>
                  <div style={{ display: 'flex', color: '#aab6b4', marginTop: 2 }}>
                    Build custom only when behavior—not visual ambition—proves
                    the moat.
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                paddingLeft: 42,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: '#849492',
                  fontFamily: 'monospace',
                  fontSize: 11,
                  letterSpacing: '0.16em',
                  paddingBottom: 13,
                  borderBottom: '1px solid rgba(255,255,255,0.14)',
                }}
              >
                <div style={{ display: 'flex' }}>OWNERSHIP TOPOLOGY</div>
                <div style={{ display: 'flex' }}>MOVE WHEN EVIDENCE CLEARS THE GATE</div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                {ownershipRows.map((row) => (
                  <div
                    key={row.index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: 82,
                      borderBottom: '1px solid rgba(255,255,255,0.14)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 44,
                        height: 44,
                        marginRight: 17,
                        color: row.active ? '#06100d' : '#95a29f',
                        background: row.active ? '#38d39f' : 'transparent',
                        border: row.active
                          ? '1px solid #38d39f'
                          : '1px solid rgba(255,255,255,0.22)',
                        fontFamily: 'monospace',
                        fontSize: 12,
                      }}
                    >
                      {row.index}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          fontSize: 17,
                          fontWeight: 700,
                        }}
                      >
                        {row.title}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          marginTop: 5,
                          color: '#91a09d',
                          fontSize: 13,
                        }}
                      >
                        {row.detail}
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        color: '#3ee0aa',
                        fontFamily: 'monospace',
                        fontSize: 11,
                        letterSpacing: '0.12em',
                        marginLeft: 12,
                      }}
                    >
                      {row.signal}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 'auto',
                  color: '#bdc8c5',
                  fontSize: 13,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 22,
                    height: 22,
                    marginRight: 10,
                    color: '#3ee0aa',
                    border: '1px solid #3ee0aa',
                    borderRadius: 11,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </div>
                Human approval remains between AI reasoning and consequential writes.
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }

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
