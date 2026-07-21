import { ImageResponse } from 'next/og'
import { getAllGenModels, getCategories } from '@/lib/models-hub/registry'

export const runtime = 'nodejs'
export const alt = 'FrankX Generative Model Hub — every modality, one decision layer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const modelCount = getAllGenModels().length
  const catCount = getCategories().length

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #09090b 0%, #1a0c1a 45%, #2e111f 100%)',
          padding: 72,
          color: 'white',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: -180, right: -160, width: 560, height: 560, borderRadius: 999, background: 'radial-gradient(circle, rgba(236,72,153,0.22), transparent 70%)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -200, left: -180, width: 520, height: 520, borderRadius: 999, background: 'radial-gradient(circle, rgba(168,85,247,0.18), transparent 70%)', display: 'flex' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #ec4899, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: 22 }}>
            FX
          </div>
          <span>FrankX.AI · Model Hub</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 36 }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: '#ec4899', textTransform: 'uppercase', letterSpacing: 8, marginBottom: 18 }}>
            Generative Intelligence Directory
          </div>
          <div style={{ fontSize: 80, fontWeight: 900, lineHeight: 1.02, letterSpacing: -2, display: 'flex', flexDirection: 'column' }}>
            <span>Every modality.</span>
            {/* Satori doesn't support background-clip:text — solid color keeps it visible */}
            <span style={{ color: '#ec4899' }}>One decision layer.</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 22, color: 'rgba(255,255,255,0.6)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 28 }}>
          <span>Image · Video · Music · Voice · Embeddings · World</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 999, background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.3)', color: '#ec4899', fontWeight: 600 }}>
            {modelCount} models · {catCount} categories
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
