import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt =
  'AI Architecture Review — agents, models, MCP connectors, and Graph OS'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const layers = [
  ['01', 'Owned graph', 'Canonical state'],
  ['02', 'Harness router', 'Bounded agents'],
  ['03', 'Model policy', 'Role-based routes'],
  ['04', 'Evidence ledger', 'Release receipts'],
] as const

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '56px 62px',
        color: '#f4f4f5',
        background:
          'radial-gradient(circle at 82% 8%, rgba(52,211,153,.16), transparent 30%), linear-gradient(135deg, #030605 0%, #07100c 52%, #040809 100%)',
        fontFamily: 'system-ui',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            color: '#a7f3d0',
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: 3.5,
          }}
        >
          FRANKX · EVIDENCE CONSOLE
        </div>
        <div
          style={{
            display: 'flex',
            padding: '8px 13px',
            border: '1px solid rgba(167,243,208,.28)',
            borderRadius: 999,
            color: '#a7f3d0',
            fontSize: 14,
          }}
        >
          24–31 AUG 2026
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 68,
            lineHeight: 0.98,
            fontWeight: 780,
            letterSpacing: -3.5,
          }}
        >
          AI Architecture Review
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 18,
            maxWidth: 950,
            color: '#a1a1aa',
            fontSize: 24,
          }}
        >
          Agents, models, MCP connectors, and the graph-owned operating system.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        {layers.map(([index, name, control]) => (
          <div
            key={index}
            style={{
              width: 260,
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 17px',
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 17,
              background: 'rgba(255,255,255,.03)',
            }}
          >
            <div
              style={{
                display: 'flex',
                color: '#6ee7b7',
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              {index}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 12,
                fontSize: 20,
                fontWeight: 720,
              }}
            >
              {name}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 4,
                color: '#71717a',
                fontSize: 14,
              }}
            >
              {control}
            </div>
          </div>
        ))}
      </div>
    </div>,
    size,
  )
}
