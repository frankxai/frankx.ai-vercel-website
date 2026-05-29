import { ImageResponse } from 'next/og'
import { getAllModels } from '@/lib/llm-hub/registry'
import { getAllPlatforms } from '@/lib/llm-hub/registry'

export const runtime = 'nodejs'
export const alt = 'FrankX LLM Provider Hub — every frontier model and agentic platform'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const modelCount = getAllModels().length
  const platformCount = getAllPlatforms().length

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #09090b 0%, #0c1a1a 45%, #111b2e 100%)',
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
            width: 560,
            height: 560,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(16,185,129,0.22), transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            right: -180,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(6,182,212,0.18), transparent 70%)',
            display: 'flex',
          }}
        />

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
          <span>FrankX.AI · LLM Hub</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 36 }}>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: '#10b981',
              textTransform: 'uppercase',
              letterSpacing: 8,
              marginBottom: 18,
            }}
          >
            Frontier Intelligence Directory
          </div>
          <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 1.02, letterSpacing: -2, display: 'flex', flexDirection: 'column' }}>
            <span>Every frontier model.</span>
            <span
              style={{
                background: 'linear-gradient(90deg, #10b981, #06b6d4, #6366f1)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              One decision layer.
            </span>
          </div>
        </div>

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
          <span>Models · agentic platforms · benchmarks · verdicts</span>
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
            {modelCount} models · {platformCount} platforms
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
