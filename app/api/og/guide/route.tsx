import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

const CATEGORY_STYLES: Record<string, { accent: string; badge: string; gradient: string }> = {
  music: {
    accent: '#10B981',
    badge: 'MUSIC GUIDE',
    gradient: 'radial-gradient(circle at top left, rgba(16,185,129,0.35), transparent 60%), radial-gradient(circle at bottom right, rgba(245,158,11,0.2), transparent 60%)',
  },
  'visual creation': {
    accent: '#AB47C7',
    badge: 'VISUAL GUIDE',
    gradient: 'radial-gradient(circle at top left, rgba(171,71,199,0.35), transparent 60%), radial-gradient(circle at bottom right, rgba(67,191,227,0.2), transparent 60%)',
  },
  writing: {
    accent: '#43BFE3',
    badge: 'WRITING GUIDE',
    gradient: 'radial-gradient(circle at top left, rgba(67,191,227,0.35), transparent 60%), radial-gradient(circle at bottom right, rgba(16,185,129,0.2), transparent 60%)',
  },
  automation: {
    accent: '#F59E0B',
    badge: 'AUTOMATION GUIDE',
    gradient: 'radial-gradient(circle at top left, rgba(245,158,11,0.35), transparent 60%), radial-gradient(circle at bottom right, rgba(16,185,129,0.2), transparent 60%)',
  },
  'creator systems': {
    accent: '#10B981',
    badge: 'CREATOR GUIDE',
    gradient: 'radial-gradient(circle at top left, rgba(16,185,129,0.35), transparent 60%), radial-gradient(circle at bottom right, rgba(67,191,227,0.2), transparent 60%)',
  },
  development: {
    accent: '#64748B',
    badge: 'DEV GUIDE',
    gradient: 'radial-gradient(circle at top left, rgba(100,116,139,0.35), transparent 60%), radial-gradient(circle at bottom right, rgba(67,191,227,0.2), transparent 60%)',
  },
}

const DEFAULT_STYLE = {
  accent: '#43BFE3',
  badge: 'GUIDE',
  gradient: 'radial-gradient(circle at top left, rgba(67,191,227,0.3), transparent 60%), radial-gradient(circle at bottom right, rgba(16,185,129,0.2), transparent 60%)',
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'FrankX Guide'
  const subtitle = searchParams.get('subtitle')
  const category = searchParams.get('category')?.toLowerCase() || ''
  const readTime = searchParams.get('readTime')

  const style = CATEGORY_STYLES[category] || DEFAULT_STYLE

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: `${style.gradient}, #0b0d10`,
          color: '#e8eef5',
          fontFamily: 'Inter, Arial, sans-serif',
          padding: '60px 80px',
        }}
      >
        {/* Top row: badge + branding */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '9999px',
              border: `1px solid ${style.accent}40`,
              backgroundColor: `${style.accent}15`,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: style.accent,
            }}
          >
            {style.badge}
          </div>
          <div style={{ fontSize: 18, color: '#9bb0c6', letterSpacing: '0.4em', textTransform: 'uppercase' as const }}>
            frankx.ai
          </div>
        </div>

        {/* Center: title + subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, justifyContent: 'center' }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 24, color: '#b9c4d1', maxWidth: 800, lineHeight: 1.4 }}>
              {subtitle}
            </div>
          )}
        </div>

        {/* Bottom row: reading time + accent bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {readTime && (
            <div style={{ fontSize: 16, color: '#9bb0c6' }}>
              {readTime}
            </div>
          )}
          <div
            style={{
              width: '120px',
              height: '4px',
              borderRadius: '2px',
              background: `linear-gradient(90deg, ${style.accent}, ${style.accent}40)`,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
