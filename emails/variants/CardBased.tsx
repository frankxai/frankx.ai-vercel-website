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
import { EmailHeader } from '../components/EmailHeader';
import { EmailFooter } from '../components/EmailFooter';
import { EmailButton } from '../components/EmailButton';

interface CardBasedProps {
  firstName?: string;
  sourceContext?: string;
  downloadLink?: string;
  unsubscribeUrl?: string;
}

export const CardBased = ({
  firstName = 'there',
  sourceContext = 'to stay updated',
  downloadLink = 'https://frankx.ai/download',
  unsubscribeUrl = 'https://frankx.ai/unsubscribe',
}: CardBasedProps) => {
  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '16px',
  };

  return (
    <Html>
      <Head />
      <Preview>Here's the resource you requested, plus what you can expect from me</Preview>
      <Body style={{
        backgroundColor: '#F5F5F5',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        margin: 0,
        padding: '20px 0',
      }}>
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          <EmailHeader variant="light" />

          {/* Welcome Card */}
          <Section style={{
            ...cardStyle,
            marginTop: '24px',
          }}>
            <Text style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#1a1a1a',
              marginBottom: '16px',
            }}>
              Hey {firstName}, welcome. I'm Frank.
            </Text>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#1a1a1a',
            }}>
              You just signed up {sourceContext}. Here's what you requested:
            </Text>
          </Section>

          {/* Download Card */}
          <Section style={{
            ...cardStyle,
            backgroundColor: '#10B981',
            border: '1px solid #059669',
            textAlign: 'center',
          }}>
            <Text style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '12px',
            }}>
              Your Free Resource
            </Text>
            <Text style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '20px',
            }}>
              Download it now and start building
            </Text>
            <Link
              href={downloadLink}
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                backgroundColor: '#ffffff',
                color: '#10B981',
                fontWeight: '600',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Download Now
            </Link>
          </Section>

          {/* What You'll Get Card */}
          <Section style={cardStyle}>
            <Text style={{
              fontSize: '18px',
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
              marginBottom: '12px',
            }}>
              Every week, I send practical AI architecture insights:
            </Text>

            <Section style={{
              backgroundColor: '#F0FDF4',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
            }}>
              <Text style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#1a1a1a',
                margin: '6px 0',
              }}>
                ✓ Enterprise AI system design patterns
              </Text>
              <Text style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#1a1a1a',
                margin: '6px 0',
              }}>
                ✓ Production deployment strategies
              </Text>
              <Text style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#1a1a1a',
                margin: '6px 0',
              }}>
                ✓ Real implementations (not theory)
              </Text>
            </Section>
          </Section>

          {/* About Card */}
          <Section style={cardStyle}>
            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#1a1a1a',
              marginBottom: '16px',
            }}>
              I'm an AI Architect building enterprise systems for Oracle. Before that, I shipped AI products, created 500+ AI songs, and built multi-agent orchestration systems.
            </Text>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#1a1a1a',
              fontWeight: '500',
            }}>
              No fluff. Just what works.
            </Text>
          </Section>

          {/* Question Card */}
          <Section style={{
            ...cardStyle,
            backgroundColor: '#FFFBEB',
            border: '1px solid #FCD34D',
          }}>
            <Text style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '8px',
            }}>
              Quick question for you
            </Text>
            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#1a1a1a',
            }}>
              What's your biggest AI challenge right now? Hit reply and let me know. I read every response.
            </Text>
          </Section>

          {/* Signature Card */}
          <Section style={cardStyle}>
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

            <Hr style={{
              borderColor: '#E5E7EB',
              margin: '24px 0',
            }} />

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

export default CardBased;
