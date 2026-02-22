import { Html, Head, Body, Container, Section, Heading, Text, Link, Img } from '@react-email/components'

/**
 * DIGITAL GARDEN - Organic Architecture
 *
 * Neural tree with glassmorphic code panels. Structures grow rather than being built.
 * Branches instead of boxes. Nature meets computation.
 */

interface DigitalGardenEmailProps {
  firstName?: string
  previewText?: string
}

export default function DigitalGardenEmail({
  firstName = 'there',
  previewText = 'Welcome to the Digital Garden — where organic intelligence meets premium technology'
}: DigitalGardenEmailProps) {
  return (
    <Html>
      <Head>
        <title>Welcome to the Digital Garden</title>
      </Head>
      <Body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: '#0F172A', // Navy background
        color: '#ffffff',
      }}>
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '40px 20px',
        }}>
          {/* Ambient Glow Header */}
          <Section style={{
            textAlign: 'center',
            marginBottom: '32px',
            position: 'relative',
          }}>
            <div style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              fontSize: '13px',
              fontWeight: '500',
              color: '#10B981',
              marginBottom: '24px',
            }}>
              🌿 Design Lab — Nature × Technology
            </div>

            <Heading style={{
              fontSize: '36px',
              fontWeight: '700',
              lineHeight: '1.2',
              margin: '0 0 16px 0',
              background: 'linear-gradient(135deg, #10B981 0%, #43BFE3 50%, #AB47C7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              The Digital Garden
            </Heading>

            <Text style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: '0',
            }}>
              Where organic intelligence meets premium technology
            </Text>
          </Section>

          {/* Glassmorphic Card - Neural Tree */}
          <Section style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '24px',
          }}>
            <Heading style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#ffffff',
              margin: '0 0 16px 0',
            }}>
              Hey {firstName} 👋
            </Heading>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.85)',
              margin: '0 0 16px 0',
            }}>
              Welcome to FrankX's Digital Garden — a design system where interfaces feel <em>alive</em>.
            </Text>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.85)',
              margin: '0 0 24px 0',
            }}>
              This is <strong>Organic Architecture</strong> — structures that grow rather than being built.
              Branches instead of boxes. Roots instead of foundations. Every layout emerges naturally from the content.
            </Text>

            {/* Branch divider - organic line */}
            <div style={{
              height: '2px',
              background: 'linear-gradient(90deg, rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0.4) 50%, rgba(16, 185, 129, 0) 100%)',
              margin: '24px 0',
            }} />

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0',
            }}>
              <strong style={{ color: '#10B981' }}>What you'll discover:</strong>
            </Text>

            <ul style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: 'rgba(255, 255, 255, 0.75)',
              paddingLeft: '20px',
              margin: '12px 0 0 0',
            }}>
              <li style={{ marginBottom: '8px' }}>Bioluminescent hierarchy — light guides attention</li>
              <li style={{ marginBottom: '8px' }}>Glassmorphic ecology — transparent interfaces (max 8% opacity)</li>
              <li style={{ marginBottom: '8px' }}>Neural connectivity — everything connects</li>
            </ul>
          </Section>

          {/* CTA - Iridescent Shimmer */}
          <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Link
              href="https://frankx.ai/design-lab/nature"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10B981 0%, #43BFE3 100%)',
                color: '#000000',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              }}
            >
              Explore 10 Nature Concepts →
            </Link>
          </Section>

          {/* Footer - Crystalline */}
          <Section style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '24px',
            textAlign: 'center',
          }}>
            <Text style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.4)',
              margin: '0 0 8px 0',
            }}>
              Frank | AI Architect & Elite Creator
            </Text>
            <Text style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.3)',
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
