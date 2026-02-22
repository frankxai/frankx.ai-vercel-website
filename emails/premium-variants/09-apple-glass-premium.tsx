import { Html, Head, Body, Container, Section, Heading, Text, Link } from '@react-email/components'

/**
 * APPLE GLASS PREMIUM - Iridescent Glass Showcase
 *
 * Apple-quality polish meets iridescent shimmer.
 * Precision spacing, premium materials, depth layering.
 * The state-of-the-art email experience.
 */

interface AppleGlassPremiumEmailProps {
  firstName?: string
}

export default function AppleGlassPremiumEmail({
  firstName = 'there'
}: AppleGlassPremiumEmailProps) {
  return (
    <Html>
      <Head>
        <title>FrankX — Premium Glass Experience</title>
      </Head>
      <Body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#060d1a',
        color: '#ffffff',
      }}>
        {/* Outer container with subtle iridescent gradient */}
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '0',
        }}>
          {/* IRIDESCENT HERO - Apple Vision Pro inspired */}
          <Section style={{
            background: 'linear-gradient(135deg, rgba(171, 71, 199, 0.12) 0%, rgba(67, 191, 227, 0.08) 25%, rgba(16, 185, 129, 0.06) 50%, rgba(245, 158, 11, 0.08) 75%, rgba(171, 71, 199, 0.1) 100%)',
            borderBottom: '1px solid',
            borderImage: 'linear-gradient(90deg, rgba(171, 71, 199, 0.4), rgba(67, 191, 227, 0.4), rgba(16, 185, 129, 0.4)) 1',
            padding: '60px 40px 48px',
            textAlign: 'center',
            position: 'relative',
          }}>
            {/* Shimmer bar at top - Apple-style */}
            <div style={{
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, rgba(171, 71, 199, 0) 0%, rgba(171, 71, 199, 0.8) 15%, rgba(67, 191, 227, 1) 35%, rgba(255, 255, 255, 1) 50%, rgba(16, 185, 129, 1) 65%, rgba(245, 158, 11, 0.8) 85%, rgba(245, 158, 11, 0) 100%)',
              marginBottom: '48px',
              borderRadius: '1px',
            }} />

            <Heading style={{
              fontSize: '52px',
              fontWeight: '700',
              lineHeight: '1.05',
              margin: '0 0 20px 0',
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}>
              FrankX
            </Heading>

            <Text style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0 0 8px 0',
              fontWeight: '300',
              letterSpacing: '-0.01em',
            }}>
              Build what matters.
            </Text>

            <Text style={{
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.4)',
              margin: '0',
              fontStyle: 'italic',
            }}>
              AI Architect & Elite Creator
            </Text>
          </Section>

          {/* Main Content Card */}
          <Section style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%)',
            padding: '40px 40px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}>
            <Heading style={{
              fontSize: '26px',
              fontWeight: '600',
              lineHeight: '1.3',
              letterSpacing: '-0.02em',
              margin: '0 0 20px 0',
              color: '#ffffff',
            }}>
              Welcome, {firstName}.
            </Heading>

            <Text style={{
              fontSize: '17px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.75)',
              margin: '0 0 20px 0',
              letterSpacing: '-0.01em',
            }}>
              You've joined a platform built for people who take AI seriously. Not as a novelty — as infrastructure.
            </Text>

            <Text style={{
              fontSize: '17px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.75)',
              margin: '0 0 32px 0',
              letterSpacing: '-0.01em',
            }}>
              What you'll find here: <strong style={{ color: '#ffffff' }}>12,000+ AI songs, enterprise agent systems, Oracle AI architectures</strong>, and a creator who ships.
            </Text>

            {/* Iridescent divider */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(171, 71, 199, 0.4) 20%, rgba(67, 191, 227, 0.6) 50%, rgba(16, 185, 129, 0.4) 80%, transparent 100%)',
              margin: '32px 0',
            }} />

            {/* 3 value props - Apple HIG style */}
            <table style={{ width: '100%', borderSpacing: '0 12px' }}>
              <tbody>
                <tr>
                  <td style={{
                    padding: '14px 18px',
                    background: 'rgba(171, 71, 199, 0.06)',
                    border: '1px solid rgba(171, 71, 199, 0.18)',
                    borderRadius: '10px',
                    fontSize: '15px',
                    lineHeight: '1.5',
                    color: 'rgba(255, 255, 255, 0.8)',
                    verticalAlign: 'top',
                  }}>
                    <strong style={{ color: '#AB47C7', display: 'block', marginBottom: '4px' }}>
                      🤖 Enterprise AI Architecture
                    </strong>
                    Oracle-grade multi-agent systems. Production patterns that scale.
                  </td>
                </tr>
                <tr>
                  <td style={{
                    padding: '14px 18px',
                    background: 'rgba(67, 191, 227, 0.05)',
                    border: '1px solid rgba(67, 191, 227, 0.15)',
                    borderRadius: '10px',
                    fontSize: '15px',
                    lineHeight: '1.5',
                    color: 'rgba(255, 255, 255, 0.8)',
                    verticalAlign: 'top',
                  }}>
                    <strong style={{ color: '#43BFE3', display: 'block', marginBottom: '4px' }}>
                      🎵 Generative Music
                    </strong>
                    500+ AI-generated songs. Every genre. Real distribution.
                  </td>
                </tr>
                <tr>
                  <td style={{
                    padding: '14px 18px',
                    background: 'rgba(16, 185, 129, 0.04)',
                    border: '1px solid rgba(16, 185, 129, 0.12)',
                    borderRadius: '10px',
                    fontSize: '15px',
                    lineHeight: '1.5',
                    color: 'rgba(255, 255, 255, 0.8)',
                    verticalAlign: 'top',
                  }}>
                    <strong style={{ color: '#10B981', display: 'block', marginBottom: '4px' }}>
                      🌿 Nature-Tech Design
                    </strong>
                    The Digital Garden. Interfaces that breathe. Organic meets computational.
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* CTA Section */}
          <Section style={{
            padding: '36px 40px',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.02)',
          }}>
            {/* Primary CTA - Apple-style */}
            <Link
              href="https://frankx.ai"
              style={{
                display: 'inline-block',
                padding: '16px 40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                fontSize: '17px',
                fontWeight: '500',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                marginBottom: '16px',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              Explore FrankX →
            </Link>

            {/* Secondary CTA */}
            <Link
              href="https://frankx.ai/design-lab/nature"
              style={{
                display: 'inline-block',
                padding: '14px 40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(171, 71, 199, 0.15) 0%, rgba(67, 191, 227, 0.12) 100%)',
                border: '1px solid rgba(171, 71, 199, 0.25)',
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '15px',
                fontWeight: '500',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                boxShadow: '0 0 20px rgba(171, 71, 199, 0.15)',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              ✨ Explore the Digital Garden
            </Link>
          </Section>

          {/* Footer - Apple-style minimal */}
          <Section style={{
            padding: '24px 40px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            textAlign: 'center',
          }}>
            {/* Bottom shimmer */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
              marginBottom: '20px',
            }} />

            <Text style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.3)',
              margin: '0 0 4px 0',
              letterSpacing: '0.02em',
            }}>
              Frank — AI Architect & Elite Creator
            </Text>
            <Text style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.2)',
              margin: '0',
            }}>
              frankx.ai — Build what matters.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
