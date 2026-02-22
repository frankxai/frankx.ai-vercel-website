import { Html, Head, Body, Container, Section, Heading, Text, Link } from '@react-email/components'

/**
 * NEURAL NETWORK - Neural Connectivity
 *
 * Everything connects. Lines between elements suggest neural pathways.
 * Hover states reveal hidden connections. The site breathes as one living system.
 */

interface NeuralNetworkEmailProps {
  firstName?: string
}

export default function NeuralNetworkEmail({
  firstName = 'there'
}: NeuralNetworkEmailProps) {
  return (
    <Html>
      <Head>
        <title>Neural Connectivity System</title>
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
          {/* Network Header */}
          <Section style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Heading style={{
              fontSize: '40px',
              fontWeight: '700',
              lineHeight: '1.1',
              margin: '0 0 16px 0',
              color: '#ffffff',
            }}>
              Neural
              <span style={{
                display: 'block',
                background: 'linear-gradient(90deg, #43BFE3 0%, #AB47C7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Connectivity
              </span>
            </Heading>

            <Text style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.5)',
              margin: '0 0 24px 0',
            }}>
              Everything connects • The system breathes as one
            </Text>

            {/* Connection visualization */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              margin: '0 auto',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#43BFE3',
                boxShadow: '0 0 12px rgba(67, 191, 227, 0.6)',
              }} />
              <div style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(67, 191, 227, 0.6) 0%, rgba(171, 71, 199, 0.6) 100%)',
              }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#AB47C7',
                boxShadow: '0 0 12px rgba(171, 71, 199, 0.6)',
              }} />
              <div style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(171, 71, 199, 0.6) 0%, rgba(16, 185, 129, 0.6) 100%)',
              }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10B981',
                boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
              }} />
            </div>
          </Section>

          {/* Node 1 - Cyan */}
          <Section style={{
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(67, 191, 227, 0.06) 0%, rgba(67, 191, 227, 0.02) 100%)',
            border: '1px solid rgba(67, 191, 227, 0.2)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '12px',
          }}>
            {/* Connection indicator */}
            <div style={{
              position: 'absolute',
              top: '-6px',
              left: '24px',
              width: '2px',
              height: '12px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(67, 191, 227, 0.6) 100%)',
            }} />

            <Heading style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#43BFE3',
              margin: '0 0 12px 0',
            }}>
              Node 1 • Technology
            </Heading>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0',
            }}>
              Hey {firstName}, you're entering a connected system. This node represents <strong>technology infrastructure</strong> — the foundation that links everything together.
            </Text>

            {/* Connection line to next node */}
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              left: '24px',
              width: '2px',
              height: '12px',
              background: 'linear-gradient(180deg, rgba(67, 191, 227, 0.6) 0%, rgba(171, 71, 199, 0.6) 100%)',
            }} />
          </Section>

          {/* Node 2 - Purple */}
          <Section style={{
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(171, 71, 199, 0.06) 0%, rgba(171, 71, 199, 0.02) 100%)',
            border: '1px solid rgba(171, 71, 199, 0.2)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '12px',
          }}>
            <Heading style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#AB47C7',
              margin: '0 0 12px 0',
            }}>
              Node 2 • Intelligence
            </Heading>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.75)',
              margin: '0',
            }}>
              Signals flow from tech to intelligence. Every connection carries data. Purple glows where <strong>AI and creativity merge</strong>.
            </Text>

            <div style={{
              position: 'absolute',
              bottom: '-6px',
              left: '24px',
              width: '2px',
              height: '12px',
              background: 'linear-gradient(180deg, rgba(171, 71, 199, 0.6) 0%, rgba(16, 185, 129, 0.6) 100%)',
            }} />
          </Section>

          {/* Node 3 - Emerald */}
          <Section style={{
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.01) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.15)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px',
          }}>
            <Heading style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#10B981',
              margin: '0 0 12px 0',
            }}>
              Node 3 • Growth
            </Heading>

            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0',
            }}>
              Intelligence feeds growth. The network expands organically. <strong>One living system</strong> — breathing, evolving, connecting.
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
                background: 'linear-gradient(135deg, #43BFE3 0%, #AB47C7 50%, #10B981 100%)',
                color: '#000000',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(67, 191, 227, 0.3)',
              }}
            >
              🧠 Join the Network →
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
              FrankX — Neural connectivity across all systems
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
