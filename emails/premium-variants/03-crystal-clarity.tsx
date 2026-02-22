import { Html, Head, Body, Container, Section, Heading, Text, Link } from '@react-email/components'

/**
 * CRYSTAL CLARITY - Crystalline Data
 *
 * Data is precious — displayed like mineral specimens.
 * Amethyst crystals with gold circuit etchings. Structure emerging from pressure and time.
 */

interface CrystalClarityEmailProps {
  firstName?: string
}

export default function CrystalClarityEmail({
  firstName = 'there'
}: CrystalClarityEmailProps) {
  return (
    <Html>
      <Head>
        <title>Crystalline Data Architecture</title>
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
          {/* Crystal Header */}
          <Section style={{
            textAlign: 'center',
            marginBottom: '36px',
            background: 'linear-gradient(180deg, rgba(171, 71, 199, 0.03) 0%, rgba(0, 0, 0, 0) 100%)',
            padding: '32px 20px',
            borderRadius: '20px',
            border: '1px solid rgba(171, 71, 199, 0.15)',
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px',
            }}>
              💎
            </div>

            <Heading style={{
              fontSize: '38px',
              fontWeight: '700',
              lineHeight: '1.2',
              margin: '0 0 12px 0',
              background: 'linear-gradient(135deg, #C084FC 0%, #AB47C7 50%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Crystalline Data
            </Heading>

            <Text style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.5)',
              margin: '0',
              fontStyle: 'italic',
            }}>
              Structure emerging from pressure and time
            </Text>
          </Section>

          {/* Amethyst Facet 1 */}
          <Section style={{
            background: 'linear-gradient(135deg, rgba(192, 132, 252, 0.08) 0%, rgba(171, 71, 199, 0.03) 100%)',
            border: '1px solid rgba(192, 132, 252, 0.2)',
            borderLeft: '4px solid #AB47C7',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '12px',
          }}>
            <Heading style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#C084FC',
              margin: '0 0 12px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #C084FC 0%, #AB47C7 100%)',
                boxShadow: '0 0 10px rgba(192, 132, 252, 0.6)',
              }} />
              Hey {firstName}
            </Heading>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0',
            }}>
              Data deserves to be treated like precious minerals. Each insight is a crystal facet — clear, multi-dimensional, catching light from every angle.
            </Text>
          </Section>

          {/* Gold Circuit Facet 2 */}
          <Section style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.06) 0%, rgba(245, 158, 11, 0.02) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.18)',
            borderLeft: '4px solid #F59E0B',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '12px',
          }}>
            <Heading style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#F59E0B',
              margin: '0 0 10px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#F59E0B',
                boxShadow: '0 0 8px rgba(245, 158, 11, 0.5)',
              }} />
              Circuit Etching
            </Heading>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.75)',
              margin: '0',
            }}>
              Gold circuits trace through amethyst. Technology etched into natural beauty. The design patterns are <strong>intentional</strong> — formed under pressure, refined over time.
            </Text>
          </Section>

          {/* Emerald Formation Facet 3 */}
          <Section style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.01) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.15)',
            borderLeft: '4px solid #10B981',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '32px',
          }}>
            <Heading style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#10B981',
              margin: '0 0 8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#10B981',
                boxShadow: '0 0 6px rgba(16, 185, 129, 0.4)',
              }} />
              Growth Formation
            </Heading>

            <Text style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0',
            }}>
              Emerald crystals grow between formations. Every system evolves. What starts as raw stone becomes something extraordinary.
            </Text>
          </Section>

          {/* CTA - Diamond */}
          <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Link
              href="https://frankx.ai/design-lab/nature"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #C084FC 0%, #AB47C7 100%)',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '600',
                textDecoration: 'none',
                border: '1px solid rgba(192, 132, 252, 0.4)',
                boxShadow: '0 4px 16px rgba(171, 71, 199, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              💎 Explore Crystal Garden
            </Link>
          </Section>

          {/* Footer */}
          <Section style={{
            borderTop: '1px solid rgba(171, 71, 199, 0.1)',
            paddingTop: '20px',
            textAlign: 'center',
          }}>
            <Text style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.35)',
              margin: '0',
            }}>
              FrankX — Data as precious minerals
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
