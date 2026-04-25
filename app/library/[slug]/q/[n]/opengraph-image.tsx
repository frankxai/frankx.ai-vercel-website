import { ImageResponse } from 'next/og';
import { getReviewBySlug } from '@/data/book-reviews';

export const runtime = 'edge';
export const alt = 'Quote from the FrankX Library';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Renders a 1200x630 PNG card per quote.
 * Picked up automatically by Next.js for the route's OpenGraph image.
 *
 * Design: dark background matching site, rose accent, Inter-ish system font.
 * Text scales based on quote length so long quotes don't overflow.
 */
export default async function Image({
  params,
}: {
  params: { slug: string; n: string };
}) {
  const review = getReviewBySlug(params.slug);
  const idx = parseInt(params.n, 10) - 1;
  const quote = review?.quotes?.[idx];

  // Fallback for unknown slug/index — minimal card so social previews don't 500
  if (!review || !quote) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0b',
            color: 'white',
            fontSize: 48,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          The FrankX Library
        </div>
      ),
      { ...size }
    );
  }

  const text = quote.text;
  // Scale the type to fit. Aim for ~12-18 visual lines of body text.
  const len = text.length;
  let fontSize = 56;
  if (len > 90) fontSize = 48;
  if (len > 160) fontSize = 40;
  if (len > 240) fontSize = 34;
  if (len > 340) fontSize = 28;

  const accent = '#fb7185'; // rose-400 (matches site)
  const subtle = 'rgba(255,255,255,0.55)';
  const muted = 'rgba(255,255,255,0.30)';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0a0a0b',
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(251,113,133,0.10), transparent 50%), radial-gradient(circle at 80% 80%, rgba(217,119,6,0.08), transparent 50%)',
          color: 'white',
          padding: '72px 88px',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
          position: 'relative',
        }}
      >
        {/* Top eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 18,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: accent,
            opacity: 0.85,
          }}
        >
          <span style={{ fontWeight: 600 }}>FrankX Library</span>
          <span style={{ color: muted }}>·</span>
          <span style={{ color: subtle, letterSpacing: 4 }}>The Quote Vault</span>
        </div>

        {/* Big opening quote mark */}
        <div
          style={{
            display: 'flex',
            color: accent,
            opacity: 0.45,
            fontSize: 200,
            lineHeight: 0.6,
            fontFamily: 'Georgia, serif',
            marginTop: 28,
            marginBottom: -40,
          }}
        >
          “
        </div>

        {/* Quote */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize,
              lineHeight: 1.25,
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.95)',
              maxWidth: '100%',
              letterSpacing: -0.2,
            }}
          >
            {text}
          </div>
        </div>

        {/* Attribution */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginTop: 32,
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
              {review.author}
            </div>
            <div style={{ fontSize: 18, color: subtle }}>{review.title}</div>
            {quote.chapter && (
              <div
                style={{
                  fontSize: 14,
                  color: muted,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  marginTop: 4,
                }}
              >
                {quote.chapter}
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 16,
              color: muted,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            frankx.ai/library
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
