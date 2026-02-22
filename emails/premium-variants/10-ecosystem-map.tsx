import { Html, Head, Body, Container, Section, Heading, Text, Link } from '@react-email/components'

/**
 * ECOSYSTEM MAP - Ecosystem Thinking (White Background Variant)
 *
 * The whole is greater than its parts. Island biomes connected by neural paths.
 * Premium white background for maximum readability + glassmorphic color accent cards.
 *
 * This is the "production ready" variant — white background (89% industry standard)
 * with glassmorphic accent cards for brand color immersion.
 */

interface EcosystemMapEmailProps {
  firstName?: string
}

export default function EcosystemMapEmail({
  firstName = 'there'
}: EcosystemMapEmailProps) {
  return (
    <Html>
      <Head>
        <title>FrankX Ecosystem Map</title>
      </Head>
      <Body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#f5f5f7', // Apple's off-white
        color: '#1d1d1f',
      }}>
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '40px 20px',
        }}>
          {/* Dark Premium Header Card */}
          <Section style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1a2540 100%)',
            borderRadius: '20px',
            padding: '40px 36px',
            marginBottom: '24px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Iridescent shimmer overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, rgba(171, 71, 199, 0) 0%, rgba(171, 71, 199, 0.8) 15%, rgba(67, 191, 227, 1) 35%, rgba(255, 255, 255, 1) 50%, rgba(16, 185, 129, 1) 65%, rgba(245, 158, 11, 0.8) 85%, rgba(245, 158, 11, 0) 100%)',
            }} />

            <div style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(67, 191, 227, 0.1)',
              border: '1px solid rgba(67, 191, 227, 0.25)',
              fontSize: '12px',
              fontWeight: '600',
              color: '#43BFE3',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              🗺 ECOSYSTEM MAP
            </div>

            <Heading style={{
              fontSize: '38px',
              fontWeight: '700',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              margin: '0 0 16px 0',
              color: '#ffffff',
            }}>
              Hey {firstName},
              <span style={{
                display: 'block',
                fontSize: '20px',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                marginTop: '6px',
                letterSpacing: '-0.01em',
              }}>
                welcome to the FrankX ecosystem.
              </span>
            </Heading>
          </Section>

          {/* White card - main content */}
          <Section style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '20px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          }}>
            <Text style={{
              fontSize: '17px',
              lineHeight: '1.7',
              color: '#1d1d1f',
              margin: '0 0 16px 0',
            }}>
              You're on an island with distinct tech biomes — each one a different dimension of intelligence.
            </Text>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#6e6e73',
              margin: '0',
            }}>
              Neural pathways connect everything. The whole is greater than its parts.
            </Text>
          </Section>

          {/* Biome Cards - 2 columns */}
          <Section style={{ marginBottom: '20px' }}>
            <table style={{ width: '100%', borderSpacing: '0', borderCollapse: 'separate' }}>
              <tbody>
                <tr>
                  <td style={{ width: '50%', paddingRight: '8px', paddingBottom: '16px', verticalAlign: 'top' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(171, 71, 199, 0.06) 0%, rgba(171, 71, 199, 0.02) 100%)',
                      border: '1px solid rgba(171, 71, 199, 0.2)',
                      borderRadius: '14px',
                      padding: '20px',
                      backgroundColor: '#ffffff',
                    }}>
                      <div style={{ fontSize: '20px', marginBottom: '8px' }}>🤖</div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#AB47C7', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>AI Peak</div>
                      <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#3a3a3c' }}>Crystalline AI architectures. Oracle-grade agents.</div>
                    </div>
                  </td>
                  <td style={{ width: '50%', paddingLeft: '8px', paddingBottom: '16px', verticalAlign: 'top' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(67, 191, 227, 0.06) 0%, rgba(67, 191, 227, 0.02) 100%)',
                      border: '1px solid rgba(67, 191, 227, 0.2)',
                      borderRadius: '14px',
                      padding: '20px',
                      backgroundColor: '#ffffff',
                    }}>
                      <div style={{ fontSize: '20px', marginBottom: '8px' }}>📚</div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#43BFE3', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Content Forest</div>
                      <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#3a3a3c' }}>Bioluminescent content. SEO-optimized blog.</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '50%', paddingRight: '8px', verticalAlign: 'top' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.01) 100%)',
                      border: '1px solid rgba(16, 185, 129, 0.18)',
                      borderRadius: '14px',
                      padding: '20px',
                      backgroundColor: '#ffffff',
                    }}>
                      <div style={{ fontSize: '20px', marginBottom: '8px' }}>🌊</div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#10B981', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Data Delta</div>
                      <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#3a3a3c' }}>Liquid data flows. Product systems.</div>
                    </div>
                  </td>
                  <td style={{ width: '50%', paddingLeft: '8px', verticalAlign: 'top' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.06) 0%, rgba(245, 158, 11, 0.02) 100%)',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      borderRadius: '14px',
                      padding: '20px',
                      backgroundColor: '#ffffff',
                    }}>
                      <div style={{ fontSize: '20px', marginBottom: '8px' }}>🎵</div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#F59E0B', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Music Coast</div>
                      <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#3a3a3c' }}>12,000+ AI songs. Golden sonic landscape.</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* White CTA Card */}
          <Section style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '28px 32px',
            textAlign: 'center',
            marginBottom: '20px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
          }}>
            <Text style={{
              fontSize: '16px',
              color: '#6e6e73',
              margin: '0 0 20px 0',
              lineHeight: '1.5',
            }}>
              Every biome is connected. Neural pathways bridge each island.
            </Text>

            <Link
              href="https://frankx.ai"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #AB47C7 0%, #43BFE3 100%)',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(171, 71, 199, 0.3)',
              }}
            >
              Explore the Ecosystem →
            </Link>
          </Section>

          {/* Minimal Footer */}
          <Section style={{ textAlign: 'center', paddingTop: '8px' }}>
            <Text style={{
              fontSize: '13px',
              color: '#86868b',
              margin: '0',
            }}>
              FrankX — frankx.ai — Build what matters.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
