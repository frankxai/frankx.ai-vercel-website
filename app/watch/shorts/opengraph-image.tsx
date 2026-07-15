import { ImageResponse } from 'next/og'
import { getShorts } from '@/lib/video'

export const runtime = 'nodejs'
export const alt = 'AI Shorts — 60-second signal curated by FrankX'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const shorts = getShorts()
  const count = shorts.length

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #09090b 0%, #18181b 40%, #1e1b2e 100%)',
          padding: 72,
          color: 'white',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(244,63,94,0.25), transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            left: -200,
            width: 500,
            height: 500,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(16,185,129,0.18), transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Top row — brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 24,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              color: 'black',
              fontSize: 22,
            }}
          >
            FX
          </div>
          <span>FrankX.AI · Watch OS</span>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 'auto',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#f43f5e',
              textTransform: 'uppercase',
              letterSpacing: 8,
              marginBottom: 20,
            }}
          >
            AI Shorts
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: -2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>60 seconds.</span>
            <span
              style={{
                background: 'linear-gradient(90deg, #f43f5e, #d946ef, #10b981)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Zero filler.
            </span>
          </div>
        </div>

        {/* Bottom row — meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            color: 'rgba(255,255,255,0.6)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 28,
          }}
        >
          <div style={{ display: 'flex', gap: 12 }}>
            <span>Curated by an AI Architect</span>
            <span>·</span>
            <span>Former Oracle AI CoE</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              borderRadius: 999,
              background: 'rgba(16,185,129,0.15)',
              border: '1px solid rgba(16,185,129,0.3)',
              color: '#10b981',
              fontWeight: 600,
            }}
          >
            {count} Short{count === 1 ? '' : 's'} live
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
