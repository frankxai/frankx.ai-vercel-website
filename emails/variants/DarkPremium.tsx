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

interface DarkPremiumProps {
  firstName?: string;
  sourceContext?: string;
  downloadLink?: string;
  unsubscribeUrl?: string;
}

export const DarkPremium = ({
  firstName = 'there',
  sourceContext = 'to stay updated',
  downloadLink = 'https://frankx.ai/download',
  unsubscribeUrl = 'https://frankx.ai/unsubscribe',
}: DarkPremiumProps) => {
  // Note: Some email clients don't support dark backgrounds well
  // This version includes fallbacks
  return (
    <Html>
      <Head>
        <style>{`
          @media (prefers-color-scheme: dark) {
            .dark-fallback { background-color: #0F172A !important; }
            .text-fallback { color: rgba(255,255,255,0.9) !important; }
          }
          @media (prefers-color-scheme: light) {
            .dark-fallback { background-color: #ffffff !important; }
            .text-fallback { color: #1a1a1a !important; }
          }
        `}</style>
      </Head>
      <Preview>Here's the resource you requested, plus what you can expect from me</Preview>
      <Body className="dark-fallback" style={{
        backgroundColor: '#0F172A',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        margin: 0,
        padding: 0,
      }}>
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#0F172A',
        }}>
          <EmailHeader variant="dark" />

          <Section style={{ padding: '40px 32px' }}>
            <Text style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '24px',
            }}>
              Hey {firstName},
            </Text>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '24px',
            }}>
              Welcome. I'm Frank.
            </Text>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '24px',
            }}>
              You just signed up {sourceContext}. Here's what you requested:
            </Text>

            <Section style={{ margin: '32px 0', textAlign: 'center' }}>
              <EmailButton href={downloadLink}>
                Download Your Resource
              </EmailButton>
            </Section>

            {/* Glassmorphic Card */}
            <Section style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '24px',
              marginTop: '32px',
              marginBottom: '32px',
              backdropFilter: 'blur(10px)',
            }}>
              <Text style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '16px',
              }}>
                What you'll get from me:
              </Text>

              <Text style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '12px',
              }}>
                Every week, I send practical AI architecture insights:
              </Text>

              <ul style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: 'rgba(255,255,255,0.9)',
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
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '24px',
            }}>
              I'm an AI Architect building enterprise systems for Oracle. Before that, I shipped AI products, created 500+ AI songs, and built multi-agent orchestration systems.
            </Text>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '32px',
            }}>
              No fluff. Just what works.
            </Text>

            {/* Question Card with Emerald Glow */}
            <Section style={{
              backgroundColor: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '32px',
            }}>
              <Text style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#10B981',
                marginBottom: '8px',
              }}>
                Quick question:
              </Text>
              <Text style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'rgba(255,255,255,0.9)',
              }}>
                What's your biggest AI challenge right now? Hit reply and let me know. I read every response.
              </Text>
            </Section>

            <Text style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'rgba(255,255,255,0.9)',
            }}>
              — Frank<br />
              <Link href="https://frankx.ai" style={{ color: '#10B981', textDecoration: 'none' }}>
                frankx.ai
              </Link>
            </Text>

            <Hr style={{
              borderColor: 'rgba(255,255,255,0.1)',
              margin: '32px 0',
            }} />

            <Text style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'rgba(255,255,255,0.7)',
            }}>
              <strong>P.S.</strong> If you're ready to go deeper, check out the{' '}
              <Link href="https://frankx.ai/soulbook" style={{ color: '#34D399', textDecoration: 'none' }}>
                Soulbook Framework
              </Link>
              {' '}(free) or my{' '}
              <Link href="https://frankx.ai/ai-architect" style={{ color: '#34D399', textDecoration: 'none' }}>
                AI Architecture guides
              </Link>.
            </Text>
          </Section>

          <EmailFooter variant="dark" unsubscribeUrl={unsubscribeUrl} />
        </Container>
      </Body>
    </Html>
  );
};

export default DarkPremium;
