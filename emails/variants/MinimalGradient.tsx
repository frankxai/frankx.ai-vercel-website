import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Preview,
} from '@react-email/components';
import * as React from 'react';
import { EmailFooter } from '../components/EmailFooter';
import { EmailButton } from '../components/EmailButton';

interface MinimalGradientProps {
  firstName?: string;
  sourceContext?: string;
  downloadLink?: string;
  unsubscribeUrl?: string;
}

export const MinimalGradient = ({
  firstName = 'there',
  sourceContext = 'to stay updated',
  downloadLink = 'https://frankx.ai/download',
  unsubscribeUrl = 'https://frankx.ai/unsubscribe',
}: MinimalGradientProps) => {
  return (
    <Html>
      <Head />
      <Preview>Here's the resource you requested, plus what you can expect from me</Preview>
      <Body style={{
        backgroundColor: '#F5F5F5',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        margin: 0,
        padding: 0,
      }}>
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
        }}>
          {/* Gradient Header */}
          <Section style={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            padding: '48px 32px',
            textAlign: 'center',
          }}>
            <Text style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#ffffff',
              margin: '0 0 8px 0',
            }}>
              Welcome to FrankX
            </Text>
            <Text style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.9)',
              margin: 0,
            }}>
              AI Architecture. Music. Digital Products.
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={{ padding: '40px 32px' }}>
            <Text style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#1a1a1a',
              marginBottom: '24px',
            }}>
              Hey {firstName},
            </Text>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#1a1a1a',
              marginBottom: '24px',
            }}>
              You just signed up {sourceContext}. Here's what you requested:
            </Text>

            <Section style={{ margin: '32px 0', textAlign: 'center' }}>
              <EmailButton href={downloadLink}>
                Download Your Resource
              </EmailButton>
            </Section>

            <Hr style={{
              borderColor: '#E5E7EB',
              margin: '40px 0',
            }} />

            <Text style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '16px',
            }}>
              What you'll get from me
            </Text>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#1a1a1a',
              marginBottom: '16px',
            }}>
              Every week, I send practical AI architecture insights:
            </Text>

            <Section style={{
              borderLeft: '3px solid #10B981',
              paddingLeft: '20px',
              marginBottom: '24px',
            }}>
              <Text style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#1a1a1a',
                margin: '8px 0',
              }}>
                ▸ Enterprise AI system design patterns
              </Text>
              <Text style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#1a1a1a',
                margin: '8px 0',
              }}>
                ▸ Production deployment strategies
              </Text>
              <Text style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#1a1a1a',
                margin: '8px 0',
              }}>
                ▸ Real implementations (not theory)
              </Text>
            </Section>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#1a1a1a',
              marginBottom: '24px',
            }}>
              I'm an AI Architect building enterprise systems for Oracle. Before that, I shipped AI products, created 500+ AI songs, and built multi-agent orchestration systems.
            </Text>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#1a1a1a',
              marginBottom: '32px',
              fontWeight: '500',
            }}>
              No fluff. Just what works.
            </Text>

            {/* Question Callout */}
            <Section style={{
              backgroundColor: '#F0FDF4',
              border: '1px solid #10B981',
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '32px',
            }}>
              <Text style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#059669',
                marginBottom: '8px',
              }}>
                Quick question:
              </Text>
              <Text style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#1a1a1a',
              }}>
                What's your biggest AI challenge right now? Hit reply and let me know. I read every response.
              </Text>
            </Section>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#1a1a1a',
            }}>
              — Frank<br />
              <Link href="https://frankx.ai" style={{ color: '#10B981', textDecoration: 'none', fontWeight: '500' }}>
                frankx.ai
              </Link>
            </Text>

            <Hr style={{ borderColor: '#E5E7EB', margin: '32px 0' }} />

            <Text style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#6B7280',
            }}>
              <strong>P.S.</strong> If you're ready to go deeper, check out the{' '}
              <Link href="https://frankx.ai/soulbook" style={{ color: '#10B981', textDecoration: 'none' }}>
                Soulbook Framework
              </Link>
              {' '}(free) or my{' '}
              <Link href="https://frankx.ai/ai-architect" style={{ color: '#10B981', textDecoration: 'none' }}>
                AI Architecture guides
              </Link>.
            </Text>
          </Section>

          <EmailFooter variant="light" unsubscribeUrl={unsubscribeUrl} />
        </Container>
      </Body>
    </Html>
  );
};

export default MinimalGradient;
