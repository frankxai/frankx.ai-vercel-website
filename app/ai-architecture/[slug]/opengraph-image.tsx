import { ImageResponse } from 'next/og'
import prototypesData from '@/data/ai-architecture/prototypes.json'
import { CATEGORY_META, DIFFICULTY_META } from '@/types/ai-architecture'
import type { ArchitecturePrototype } from '@/types/ai-architecture'

const blueprints = prototypesData as ArchitecturePrototype[]

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'AI Architecture Blueprint — FrankX'

export function generateStaticParams() {
  return blueprints.map((b) => ({ slug: b.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const b = blueprints.find((x) => x.slug === slug)
  const title = b?.title ?? 'AI Architecture Blueprint'
  const category = b ? CATEGORY_META[b.category]?.name : 'AI Architecture'
  const difficulty = b ? DIFFICULTY_META[b.difficulty]?.name : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0b',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 600,
            height: 600,
            background: 'radial-gradient(circle at 70% 30%, rgba(16,185,129,0.18), transparent 60%)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: '#34d399',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            AI Architecture · Blueprint
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 800, color: '#fafafa', lineHeight: 1.05, maxWidth: 980 }}>
            {title}
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            <span
              style={{
                fontSize: 24,
                color: '#a7f3d0',
                border: '1px solid rgba(16,185,129,0.35)',
                borderRadius: 999,
                padding: '6px 20px',
              }}
            >
              {category}
            </span>
            {difficulty ? (
              <span
                style={{
                  fontSize: 24,
                  color: '#94a3b8',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 999,
                  padding: '6px 20px',
                }}
              >
                {difficulty}
              </span>
            ) : null}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 26, color: '#cbd5e1', fontWeight: 600 }}>frankx.ai/ai-architecture</div>
          <div style={{ fontSize: 22, color: '#64748b' }}>Use when · skip when · run it yourself</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
