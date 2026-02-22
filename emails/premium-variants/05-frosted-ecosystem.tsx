import { Html, Head, Body, Container, Section, Heading, Text, Link } from '@react-email/components'

/**
 * FROSTED ECOSYSTEM - Glassmorphic Ecology
 *
 * Maximum glassmorphic — interfaces are transparent organisms in the environment.
 * You see through them into the system beneath. Maximum opacity 0.08.
 */

interface FrostedEcosystemEmailProps {
  firstName?: string
}

export default function FrostedEcosystemEmail({
  firstName = 'there'
}: FrostedEcosystemEmailProps) {
  return (
    <Html>
      <Head>
        <title>Glassmorphic Ecology</title>
      </Head>
      <Body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#0F172A',
        backgroundImage: 'linear-gradient(135deg, rgba(67, 191, 227, 0.03) 0%, rgba(171, 71, 199, 0.03) 50%, rgba(16, 185, 129, 0.03) 100%)',
        color: '#ffffff',
      }}>
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '40px 20px',
        }}>
          {/* Ultra-Frosted Header */}
          <Section style={{
            textAlign: 'center',
            marginBottom: '32px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            padding: '40px 24px',
          }}>
            <div style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '12px',
              fontWeight: '500',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '20px',
            }}>
              MAX GLASSMORPHIC • 8% OPACITY
            </div>

            <Heading style={{
              fontSize: '38px',
              fontWeight: '700',
              lineHeight: '1.2',
              margin: '0 0 12px 0',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Frosted Glass
              <span style={{ display: 'block' }}>Ecosystem</span>
            </Heading>

            <Text style={{
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.5)',
              margin: '0',
            }}>
              Transparent organisms • See through to the system beneath
            </Text>
          </Section>

          {/* Layer 1 - Highest Opacity (0.08) */}
          <Section style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '18px',
            padding: '28px',
            marginBottom: '16px',
          }}>
            <Heading style={{
              fontSize: '19px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.95)',
              margin: '0 0 14px 0',
            }}>
              Layer 1 • 8% Opacity
            </Heading>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.85)',
              margin: '0 0 14px 0',
            }}>
              Hey {firstName}, this is the foreground glass. Maximum opacity (0.08) for primary content. You can still see the gradient environment behind.
            </Text>

            <Text style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.65)',
              fontStyle: 'italic',
              margin: '0',
            }}>
              "Interfaces are not opaque barriers — they're windows into the system."
            </Text>
          </Section>

          {/* Layer 2 - Mid Opacity (0.05) */}
          <Section style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '16px',
          }}>
            <Heading style={{
              fontSize: '17px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.85)',
              margin: '0 0 12px 0',
            }}>
              Layer 2 • 5% Opacity
            </Heading>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.75)',
              margin: '0',
            }}>
              Mid-layer glass for supporting content. More transparent. The colored gradients show through more strongly. <strong>Depth through transparency</strong>.
            </Text>
          </Section>

          {/* Layer 3 - Low Opacity (0.02) */}
          <Section style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '14px',
            padding: '20px',
            marginBottom: '32px',
          }}>
            <Heading style={{
              fontSize: '15px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.75)',
              margin: '0 0 10px 0',
            }}>
              Layer 3 • 2% Opacity
            </Heading>

            <Text style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: '0',
            }}>
              Background glass. Nearly invisible. You see almost entirely through to the environment. This is the ecology — living interfaces in their natural habitat.
            </Text>
          </Section>

          {/* CTA - Iridescent Glass */}
          <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Link
              href="https://frankx.ai/design-lab/nature"
              style={{
                display: 'inline-block',
                padding: '16px 36px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              }}
            >
              🪟 See Through the Glass
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
              FrankX — Glassmorphic ecology • Max 8% opacity
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
