import { Html, Head, Body, Container, Section, Heading, Text, Link } from '@react-email/components'

/**
 * BIOLUMINESCENT FLOW - Bioluminescent Hierarchy
 *
 * Light guides attention. Important elements glow brighter.
 * Purple for intelligence, cyan for technology, emerald for growth, gold for creation.
 */

interface BioluminescentFlowEmailProps {
  firstName?: string
}

export default function BioluminescentFlowEmail({
  firstName = 'there'
}: BioluminescentFlowEmailProps) {
  return (
    <Html>
      <Head>
        <title>Bioluminescent Design System</title>
      </Head>
      <Body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#0a0f1a', // Darker navy for more glow contrast
        color: '#ffffff',
      }}>
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '40px 20px',
        }}>
          {/* Glowing Header */}
          <Section style={{
            textAlign: 'center',
            marginBottom: '40px',
          }}>
            <Heading style={{
              fontSize: '42px',
              fontWeight: '700',
              lineHeight: '1.1',
              margin: '0 0 20px 0',
              color: '#ffffff',
              textShadow: '0 0 40px rgba(171, 71, 199, 0.6)', // Purple glow
            }}>
              Bioluminescent
              <span style={{
                display: 'block',
                background: 'linear-gradient(90deg, #AB47C7 0%, #43BFE3 50%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
              }}>
                Hierarchy
              </span>
            </Heading>

            <Text style={{
              fontSize: '17px',
              color: 'rgba(255, 255, 255, 0.5)',
              margin: '0',
            }}>
              Light guides attention. No borders needed.
            </Text>
          </Section>

          {/* Intelligence Card - Purple Glow */}
          <Section style={{
            background: 'linear-gradient(135deg, rgba(171, 71, 199, 0.08) 0%, rgba(171, 71, 199, 0.02) 100%)',
            border: '1px solid rgba(171, 71, 199, 0.25)',
            borderRadius: '16px',
            padding: '28px',
            marginBottom: '16px',
            boxShadow: '0 0 60px rgba(171, 71, 199, 0.15)', // Purple glow
          }}>
            <div style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#AB47C7',
              marginBottom: '12px',
            }}>
              ⚡ Intelligence
            </div>

            <Heading style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#ffffff',
              margin: '0 0 12px 0',
            }}>
              Hey {firstName},
            </Heading>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0',
            }}>
              Purple glows brightest for intelligence and insight. This card has the strongest presence because it contains your personal message.
            </Text>
          </Section>

          {/* Technology Card - Cyan Glow */}
          <Section style={{
            background: 'linear-gradient(135deg, rgba(67, 191, 227, 0.06) 0%, rgba(67, 191, 227, 0.02) 100%)',
            border: '1px solid rgba(67, 191, 227, 0.2)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '16px',
            boxShadow: '0 0 40px rgba(67, 191, 227, 0.1)', // Cyan glow
          }}>
            <div style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#43BFE3',
              marginBottom: '10px',
            }}>
              🔷 Technology
            </div>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.75)',
              margin: '0',
            }}>
              Cyan illuminates technical elements. Moderate glow for supporting content that explains the system.
            </Text>
          </Section>

          {/* Growth Card - Emerald Glow */}
          <Section style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.01) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.15)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '32px',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.08)', // Emerald glow
          }}>
            <div style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#10B981',
              marginBottom: '8px',
            }}>
              🌱 Growth
            </div>

            <Text style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.65)',
              margin: '0',
            }}>
              Emerald for organic growth. Subtle glow for tertiary content. Your eye naturally finds the hierarchy.
            </Text>
          </Section>

          {/* CTA - Gold Creation Glow */}
          <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Link
              href="https://frankx.ai/design-lab/nature"
              style={{
                display: 'inline-block',
                padding: '16px 36px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #F59E0B 100%)',
                color: '#000000',
                fontSize: '16px',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)', // Gold glow
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              ✨ See the Light System
            </Link>

            <Text style={{
              fontSize: '13px',
              color: 'rgba(245, 158, 11, 0.7)',
              margin: '12px 0 0 0',
            }}>
              Gold shines for creation and action
            </Text>
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
              FrankX — Where light reveals hierarchy
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
