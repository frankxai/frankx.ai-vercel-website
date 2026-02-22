import { Html, Head, Body, Container, Section, Heading, Text, Link } from '@react-email/components'

/**
 * CONSTELLATION - Connected Universe
 *
 * Data constellations in the night sky. Light threads connect points.
 * Mirroring network topology. Bridging earth and sky.
 */

interface ConstellationEmailProps {
  firstName?: string
}

export default function ConstellationEmail({
  firstName = 'there'
}: ConstellationEmailProps) {
  return (
    <Html>
      <Head>
        <title>Constellation Network</title>
      </Head>
      <Body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#0a0f1a',
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(171, 71, 199, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(67, 191, 227, 0.03) 0%, transparent 50%)',
        color: '#ffffff',
      }}>
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '40px 20px',
        }}>
          {/* Star Field Header */}
          <Section style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#AB47C7',
                  boxShadow: '0 0 16px rgba(171, 71, 199, 0.8)',
                  margin: '0 auto 4px auto',
                }} />
                <div style={{ fontSize: '10px', color: 'rgba(171, 71, 199, 0.6)' }}>★</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#43BFE3',
                  boxShadow: '0 0 20px rgba(67, 191, 227, 0.9)',
                  margin: '0 auto 4px auto',
                }} />
                <div style={{ fontSize: '12px', color: 'rgba(67, 191, 227, 0.7)' }}>★</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 14px rgba(16, 185, 129, 0.7)',
                  margin: '0 auto 4px auto',
                }} />
                <div style={{ fontSize: '10px', color: 'rgba(16, 185, 129, 0.6)' }}>★</div>
              </div>
            </div>

            <Heading style={{
              fontSize: '42px',
              fontWeight: '700',
              lineHeight: '1.1',
              margin: '0 0 16px 0',
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Constellation
              <span style={{
                display: 'block',
                background: 'linear-gradient(90deg, #AB47C7 0%, #43BFE3 50%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Network
              </span>
            </Heading>

            <Text style={{
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.5)',
              margin: '0',
            }}>
              Data points connected across the universe
            </Text>
          </Section>

          {/* Star Node 1 - Purple */}
          <Section style={{
            background: 'linear-gradient(135deg, rgba(171, 71, 199, 0.06) 0%, rgba(171, 71, 199, 0.02) 100%)',
            border: '1px solid rgba(171, 71, 199, 0.2)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '16px',
            position: 'relative',
          }}>
            {/* Star indicator */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#AB47C7',
              boxShadow: '0 0 12px rgba(171, 71, 199, 0.6)',
            }} />

            <Heading style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#AB47C7',
              margin: '0 0 12px 0',
            }}>
              ★ Vega • Intelligence Star
            </Heading>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0',
            }}>
              Hey {firstName}, you're <strong>a point of light</strong> in our constellation. Each person represents a star — unique, bright, connected to all others.
            </Text>
          </Section>

          {/* Light Thread Connector */}
          <Section style={{
            textAlign: 'center',
            margin: '0 0 16px 0',
          }}>
            <div style={{
              width: '2px',
              height: '32px',
              margin: '0 auto',
              background: 'linear-gradient(180deg, rgba(171, 71, 199, 0.4) 0%, rgba(67, 191, 227, 0.4) 100%)',
            }} />
          </Section>

          {/* Star Node 2 - Cyan */}
          <Section style={{
            background: 'linear-gradient(135deg, rgba(67, 191, 227, 0.06) 0%, rgba(67, 191, 227, 0.02) 100%)',
            border: '1px solid rgba(67, 191, 227, 0.2)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '16px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#43BFE3',
              boxShadow: '0 0 12px rgba(67, 191, 227, 0.6)',
            }} />

            <Heading style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#43BFE3',
              margin: '0 0 12px 0',
            }}>
              ★ Sirius • Technology Star
            </Heading>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.75)',
              margin: '0',
            }}>
              Light threads connect you to other stars. Our <strong>network topology mirrors the cosmos</strong> — distributed, resilient, beautiful.
            </Text>
          </Section>

          {/* Light Thread Connector */}
          <Section style={{
            textAlign: 'center',
            margin: '0 0 16px 0',
          }}>
            <div style={{
              width: '2px',
              height: '32px',
              margin: '0 auto',
              background: 'linear-gradient(180deg, rgba(67, 191, 227, 0.4) 0%, rgba(16, 185, 129, 0.4) 100%)',
            }} />
          </Section>

          {/* Star Node 3 - Emerald */}
          <Section style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.01) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.15)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981',
              boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
            }} />

            <Heading style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#10B981',
              margin: '0 0 12px 0',
            }}>
              ★ Polaris • Growth Star
            </Heading>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0',
            }}>
              Golden data fireflies bridge earth and sky. We're all <strong>connected across the universe</strong> — one vast constellation of intelligence.
            </Text>
          </Section>

          {/* CTA */}
          <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Link
              href="https://frankx.ai/design-lab/nature"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #AB47C7 0%, #43BFE3 50%, #10B981 100%)',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(171, 71, 199, 0.4)',
              }}
            >
              ✨ Join the Constellation
            </Link>
          </Section>

          {/* Footer */}
          <Section style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '24px',
            textAlign: 'center',
          }}>
            <Text style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.35)',
              margin: '0',
            }}>
              FrankX — Connected across the universe ★
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
