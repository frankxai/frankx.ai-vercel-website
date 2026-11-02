import type { ReactElement } from 'react'

// Shared visual language for the manifestation OG images: violet/fuchsia on
// near-black, matching the hub hero. Consumed by the four
// app/**/opengraph-image.tsx route files so they stay one-liners.
export const OG_SIZE = { width: 1200, height: 630 }

export function ManifestationOg({
  eyebrow,
  lines,
  footer = 'Keep the mechanisms · drop the cosmology · ship the vision',
}: {
  eyebrow: string
  lines: string[]
  footer?: string
}): ReactElement {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #0a0a0b 0%, #16091f 50%, #1a0b2e 100%)',
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
          background: 'radial-gradient(circle, rgba(167,139,250,0.22), transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(232,121,249,0.18), transparent 70%)',
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
            background: 'linear-gradient(135deg, #a78bfa, #e879f9)',
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
        <span>FrankX.AI · Manifestation</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 36 }}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#c4b5fd',
            textTransform: 'uppercase',
            letterSpacing: 8,
            marginBottom: 18,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: -2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {lines.map((line, i) => (
            <span
              key={i}
              style={
                i === lines.length - 1
                  ? {
                      background: 'linear-gradient(90deg, #a78bfa, #e879f9)',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }
                  : undefined
              }
            >
              {line}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: 22,
          color: 'rgba(255,255,255,0.6)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 28,
        }}
      >
        {footer}
      </div>
    </div>
  )
}
