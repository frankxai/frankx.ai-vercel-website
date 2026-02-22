import { Html, Head, Body, Container, Section, Heading, Text, Link } from '@react-email/components'

/**
 * LIQUID INTELLIGENCE - Natural Flow
 *
 * Data flows like water — finding the path of least resistance.
 * Holographic streams between obsidian with embedded circuits.
 */

interface LiquidIntelligenceEmailProps {
  firstName?: string
}

export default function LiquidIntelligenceEmail({
  firstName = 'there'
}: LiquidIntelligenceEmailProps) {
  return (
    <Html>
      <Head>
        <title>Liquid Intelligence Flow</title>
      </Head>
      <Body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#0a0f1a',
        color: '#ffffff',
      }}>
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '40px 20px',
        }}>
          {/* Flowing Header */}
          <Section style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{
              fontSize: '42px',
              marginBottom: '16px',
            }}>
              🌊
            </div>

            <Heading style={{
              fontSize: '40px',
              fontWeight: '700',
              lineHeight: '1.1',
              margin: '0 0 16px 0',
              background: 'linear-gradient(90deg, #43BFE3 0%, #10B981 50%, #43BFE3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Liquid Intelligence
            </Heading>

            <Text style={{
              fontSize: '16px',
              color: 'rgba(67, 191, 227, 0.6)',
              margin: '0',
            }}>
              Data flows like water • Path of least resistance
            </Text>
          </Section>

          {/* Stream Section 1 - Source */}
          <Section style={{
            background: 'linear-gradient(135deg, rgba(67, 191, 227, 0.08) 0%, rgba(67, 191, 227, 0.02) 100%)',
            border: '1px solid rgba(67, 191, 227, 0.2)',
            borderRadius: '20px 20px 8px 8px',
            padding: '28px',
            marginBottom: '4px',
            position: 'relative',
          }}>
            <Heading style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#43BFE3',
              margin: '0 0 14px 0',
            }}>
              Source • The Spring
            </Heading>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0',
            }}>
              Hey {firstName}, information starts here — a <strong>pure source</strong>. Like water emerging from rock, data begins its journey through the system.
            </Text>

            {/* Flowing connector */}
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              height: '4px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(67, 191, 227, 0.4) 50%, transparent 100%)',
            }} />
          </Section>

          {/* Stream Section 2 - Flow */}
          <Section style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(16, 185, 129, 0.02) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.18)',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '4px',
            position: 'relative',
          }}>
            <Heading style={{
              fontSize: '17px',
              fontWeight: '600',
              color: '#10B981',
              margin: '0 0 12px 0',
            }}>
              Flow • The Stream
            </Heading>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.75)',
              margin: '0',
            }}>
              Data finds its natural path. No forcing, no friction. Liquid intelligence moves where it's needed, <strong>adapts to obstacles</strong>, fills every space.
            </Text>

            <div style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '4px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.4) 50%, transparent 100%)',
            }} />
          </Section>

          {/* Stream Section 3 - Delta */}
          <Section style={{
            background: 'linear-gradient(135deg, rgba(171, 71, 199, 0.06) 0%, rgba(171, 71, 199, 0.02) 100%)',
            border: '1px solid rgba(171, 71, 199, 0.15)',
            borderRadius: '8px 8px 20px 20px',
            padding: '24px',
            marginBottom: '32px',
          }}>
            <Heading style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#AB47C7',
              margin: '0 0 10px 0',
            }}>
              Delta • The Ocean
            </Heading>

            <Text style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0',
            }}>
              All streams merge into a vast ocean of intelligence. Individual flows become collective knowledge. <strong>Liquid thinking at scale</strong>.
            </Text>
          </Section>

          {/* Ripple Divider */}
          <Section style={{ margin: '32px 0' }}>
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(67, 191, 227, 0.3) 20%, rgba(67, 191, 227, 0.5) 50%, rgba(67, 191, 227, 0.3) 80%, transparent 100%)',
            }} />
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(67, 191, 227, 0.2) 30%, rgba(67, 191, 227, 0.3) 50%, rgba(67, 191, 227, 0.2) 70%, transparent 100%)',
              marginTop: '4px',
            }} />
          </Section>

          {/* CTA */}
          <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Link
              href="https://frankx.ai/design-lab/nature"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #43BFE3 0%, #10B981 100%)',
                color: '#000000',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(67, 191, 227, 0.3)',
              }}
            >
              🌊 Dive Into the Flow
            </Link>
          </Section>

          {/* Footer */}
          <Section style={{
            borderTop: '1px solid rgba(67, 191, 227, 0.1)',
            paddingTop: '24px',
            textAlign: 'center',
          }}>
            <Text style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.35)',
              margin: '0',
            }}>
              FrankX — Data that flows like water
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
