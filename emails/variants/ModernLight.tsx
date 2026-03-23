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

interface ModernLightProps {
  firstName?: string;
  sourceContext?: string;
  downloadLink?: string;
  unsubscribeUrl?: string;
}

export const ModernLight = ({
  firstName = 'there',
  sourceContext = 'to stay updated',
  downloadLink = 'https://frankx.ai/download',
  unsubscribeUrl = 'https://frankx.ai/unsubscribe',
}: ModernLightProps) => {
  return (
    <Html>
      <Head />
      <Preview>Here's the resource you requested, plus what you can expect from me</Preview>
      <Body style={{
        backgroundColor: '#F8F9FA',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        margin: 0,
        padding: '40px 20px',
      }}>
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          <EmailHeader variant="light" />

          {/* Main Content Card */}
          <Section style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            padding: '40px 32px',
            marginTop: '24px',
          }}>
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
              Welcome. I'm Frank.
            </Text>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#1a1a1a',
              marginBottom: '32px',
            }}>
              You just signed up {sourceContext}. Here's what you requested:
            </Text>

            {/* Download Card */}
            <Section style={{
              backgroundColor: '#F8F9FA',
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '32px',
              textAlign: 'center',
            }}>
              <Text style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1a1a1a',
                marginBottom: '16px',
              }}>
                Your Free Resource
              </Text>
              <EmailButton href={downloadLink}>
                Download Now
              </EmailButton>
            </Section>

            {/* What You'll Get Card */}
            <Section style={{
              backgroundColor: '#F0FDF4',
              borderLeft: '4px solid #10B981',
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '32px',
            }}>
              <Text style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1a1a1a',
                marginBottom: '12px',
              }}>
                What you'll get from me:
              </Text>

              <Text style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#1a1a1a',
                marginBottom: '12px',
              }}>
                Every week, I send practical AI architecture insights:
              </Text>

              <ul style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#1a1a1a',
                marginLeft: '20px',
                marginBottom: '0',
              }}>
                <li>Enterprise AI system design patterns</li>
                <li>Production deployment strategies</li>
                <li>Real implementations (not theory)</li>
              </ul>
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
            }}>
              No fluff. Just what works.
            </Text>

            {/* Question Card */}
            <Section style={{
              backgroundColor: '#FFFBEB',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '32px',
            }}>
              <Text style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1a1a1a',
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
              <Link href="https://frankx.ai" style={{ color: '#10B981', textDecoration: 'none' }}>
                frankx.ai
              </Link>
            </Text>
          </Section>

          {/* P.S. Card */}
          <Section style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            padding: '24px',
            marginTop: '16px',
          }}>
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

export default ModernLight;
