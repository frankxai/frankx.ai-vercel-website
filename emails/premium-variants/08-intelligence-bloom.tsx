import { Html, Head, Body, Container, Section, Heading, Text, Link } from '@react-email/components'

/**
 * INTELLIGENCE BLOOM - Full Expression
 *
 * Technology in full bloom. Each petal is a UI component.
 * The center radiates purple-to-cyan light. Data pollen carries symbols.
 */

interface IntelligenceBloomEmailProps {
  firstName?: string
}

export default function IntelligenceBloomEmail({
  firstName = 'there'
}: IntelligenceBloomEmailProps) {
  return (
    <Html>
      <Head>
        <title>Intelligence in Full Bloom</title>
      </Head>
      <Body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#0F172A',
        color: '#ffffff',
      }}>
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '40px 20px',
        }}>
          {/* Bloom Header - Radial gradient center */}
          <Section style={{
            textAlign: 'center',
            marginBottom: '36px',
            background: 'radial-gradient(ellipse at center, rgba(171, 71, 199, 0.1) 0%, rgba(67, 191, 227, 0.05) 50%, transparent 100%)',
            padding: '48px 24px',
            borderRadius: '50% 50% 12px 12px / 20% 20% 12px 12px',
            border: '1px solid rgba(171, 71, 199, 0.15)',
            position: 'relative',
          }}>
            <div style={{
              fontSize: '52px',
              marginBottom: '16px',
              display: 'block',
            }}>
              🌸
            </div>

            <Heading style={{
              fontSize: '36px',
              fontWeight: '700',
              lineHeight: '1.2',
              margin: '0 0 12px 0',
              background: 'radial-gradient(ellipse at center, #C084FC 0%, #AB47C7 40%, #43BFE3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Intelligence Bloom
            </Heading>

            <Text style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.5)',
              margin: '0',
            }}>
              Technology in full expression
            </Text>
          </Section>

          {/* Petal 1 - Dashboard Component */}
          <Section style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '16px',
          }}>
            {/* Purple petal */}
            <Section style={{
              flex: '1',
              background: 'linear-gradient(135deg, rgba(171, 71, 199, 0.1) 0%, rgba(171, 71, 199, 0.03) 100%)',
              border: '1px solid rgba(171, 71, 199, 0.25)',
              borderRadius: '16px 4px 16px 4px', // Petal shape
              padding: '20px',
            }}>
              <Text style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#AB47C7',
                margin: '0 0 8px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                Dashboard Petal
              </Text>
              <Heading style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#ffffff',
                margin: '0 0 4px 0',
              }}>
                93%
              </Heading>
              <Text style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.5)',
                margin: '0',
              }}>
                Intelligence Score
              </Text>
            </Section>

            {/* Cyan petal */}
            <Section style={{
              flex: '1',
              background: 'linear-gradient(135deg, rgba(67, 191, 227, 0.08) 0%, rgba(67, 191, 227, 0.02) 100%)',
              border: '1px solid rgba(67, 191, 227, 0.2)',
              borderRadius: '4px 16px 4px 16px', // Opposite petal shape
              padding: '20px',
            }}>
              <Text style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#43BFE3',
                margin: '0 0 8px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                Code Petal
              </Text>
              <Heading style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#ffffff',
                margin: '0 0 4px 0',
              }}>
                500+
              </Heading>
              <Text style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.5)',
                margin: '0',
              }}>
                AI Songs Created
              </Text>
            </Section>
          </Section>

          {/* Center of the flower - Main message */}
          <Section style={{
            background: 'radial-gradient(ellipse at center, rgba(171, 71, 199, 0.08) 0%, rgba(67, 191, 227, 0.06) 60%, transparent 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            padding: '36px',
            textAlign: 'center',
            marginBottom: '16px',
          }}>
            <Heading style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#ffffff',
              margin: '0 0 14px 0',
            }}>
              Hey {firstName} 🌸
            </Heading>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0',
            }}>
              Intelligence blooms at the intersection of <strong style={{ color: '#AB47C7' }}>creativity</strong> and <strong style={{ color: '#43BFE3' }}>technology</strong>. Each petal is a facet of what we build together.
            </Text>
          </Section>

          {/* Bottom petals */}
          <Section style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '32px',
          }}>
            <Section style={{
              flex: '1',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.07) 0%, rgba(16, 185, 129, 0.02) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.18)',
              borderRadius: '4px 16px 4px 16px',
              padding: '18px',
            }}>
              <Text style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#10B981',
                margin: '0 0 8px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                Growth Petal
              </Text>
              <Text style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.65)',
                margin: '0',
              }}>
                22 Skills Active
              </Text>
            </Section>

            <Section style={{
              flex: '1',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.07) 0%, rgba(245, 158, 11, 0.02) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.18)',
              borderRadius: '16px 4px 16px 4px',
              padding: '18px',
            }}>
              <Text style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#F59E0B',
                margin: '0 0 8px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                Creation Petal
              </Text>
              <Text style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.65)',
                margin: '0',
              }}>
                8 Agents Ready
              </Text>
            </Section>
          </Section>

          {/* CTA */}
          <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Link
              href="https://frankx.ai/design-lab/nature"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                borderRadius: '24px',
                background: 'radial-gradient(ellipse at center, #C084FC 0%, #AB47C7 100%)',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(171, 71, 199, 0.4)',
                border: '1px solid rgba(192, 132, 252, 0.3)',
              }}
            >
              🌸 See Technology in Bloom
            </Link>
          </Section>

          {/* Footer */}
          <Section style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '24px',
            textAlign: 'center',
          }}>
            <Text style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.35)',
              margin: '0',
            }}>
              FrankX — Intelligence in full bloom
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
