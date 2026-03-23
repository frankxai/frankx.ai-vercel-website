/**
 * Weekly Digest Newsletter Template
 * The main weekly newsletter for FrankX subscribers
 */

import * as React from 'react'
import { Section, Text, Link, Hr } from '@react-email/components'
import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailCallout,
  colors,
} from '../components/Layout'

interface BlogPost {
  title: string
  excerpt: string
  url: string
  category: string
}

interface WeeklyDigestProps {
  issueNumber: number
  date: string
  greeting?: string
  intro: string
  featuredPosts: BlogPost[]
  quickTip?: {
    title: string
    content: string
  }
  personalNote?: string
  cta?: {
    text: string
    url: string
  }
}

export default function WeeklyDigest({
  issueNumber = 1,
  date = 'January 2026',
  greeting = 'Hey there!',
  intro = "Here's what's been happening in the world of AI creativity this week.",
  featuredPosts = [],
  quickTip,
  personalNote,
  cta,
}: WeeklyDigestProps) {
  return (
    <EmailLayout preview={`FrankX Letter #${issueNumber} - ${date}`}>
      {/* Header Badge */}
      <Section style={styles.badge}>
        <Text style={styles.badgeText}>
          The FrankX Letter #{issueNumber}
        </Text>
      </Section>

      {/* Greeting */}
      <EmailHeading>{greeting}</EmailHeading>
      <EmailText>{intro}</EmailText>

      <Hr style={styles.divider} />

      {/* Featured Posts */}
      <EmailHeading as="h2">This Week's Insights</EmailHeading>

      {featuredPosts.map((post, index) => (
        <EmailCard key={index} accent={index === 0 ? 'emerald' : 'cyan'}>
          <Text style={styles.category}>{post.category}</Text>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postExcerpt}>{post.excerpt}</Text>
          <Link href={post.url} style={styles.readMore}>
            Read more →
          </Link>
        </EmailCard>
      ))}

      {/* Quick Tip */}
      {quickTip && (
        <>
          <Hr style={styles.divider} />
          <EmailCallout emoji="💡" title="Quick Tip">
            <strong>{quickTip.title}</strong>
            <br />
            {quickTip.content}
          </EmailCallout>
        </>
      )}

      {/* Personal Note */}
      {personalNote && (
        <>
          <Hr style={styles.divider} />
          <EmailHeading as="h2">From My Studio</EmailHeading>
          <EmailText>{personalNote}</EmailText>
        </>
      )}

      {/* CTA */}
      {cta && (
        <Section style={styles.ctaSection}>
          <EmailButton href={cta.url}>{cta.text}</EmailButton>
        </Section>
      )}

      {/* Sign off */}
      <Hr style={styles.divider} />
      <EmailText muted>
        Keep creating,
        <br />
        <strong style={{ color: colors.textPrimary }}>Frank</strong>
      </EmailText>
    </EmailLayout>
  )
}

const styles = {
  badge: {
    textAlign: 'center' as const,
    marginBottom: '24px',
  },
  badgeText: {
    display: 'inline-block',
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    border: `1px solid ${colors.border}`,
    borderRadius: '9999px',
    color: colors.cyan,
    fontSize: '12px',
    fontWeight: '600',
    padding: '8px 16px',
    margin: '0',
  },
  divider: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    margin: '24px 0',
  },
  category: {
    color: colors.emerald,
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    margin: '0 0 8px 0',
  },
  postTitle: {
    color: colors.textPrimary,
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '1.3',
    margin: '0 0 8px 0',
  },
  postExcerpt: {
    color: colors.textSecondary,
    fontSize: '14px',
    lineHeight: '1.6',
    margin: '0 0 12px 0',
  },
  readMore: {
    color: colors.cyan,
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
  },
  ctaSection: {
    textAlign: 'center' as const,
    margin: '32px 0',
  },
}

// Export preview data for development
export const previewProps: WeeklyDigestProps = {
  issueNumber: 42,
  date: 'January 23, 2026',
  greeting: 'Hey Creator! 👋',
  intro: "This week I've been deep in the trenches building agentic workflows, and I've got some gems to share with you.",
  featuredPosts: [
    {
      title: 'Build Your Own Jarvis with Claude Code',
      excerpt: 'How I built a personal AI assistant that knows my projects, preferences, and can execute complex multi-step tasks.',
      url: 'https://frankx.ai/blog/build-your-own-jarvis-claude-code',
      category: 'Tutorial',
    },
    {
      title: 'The Soul Frequency Framework',
      excerpt: 'Why AI creativity works best when aligned with your authentic voice, not replacing it.',
      url: 'https://frankx.ai/blog/the-soul-frequency-framework',
      category: 'Philosophy',
    },
  ],
  quickTip: {
    title: 'Suno Prompt Hack',
    content: 'Add "lo-fi bedroom production" to any Suno prompt for that cozy, intimate sound. Works especially well with acoustic and indie genres.',
  },
  personalNote: "I've been working on something big - a complete course on building creator AI systems. More details coming soon. In the meantime, hit reply and tell me: what's the biggest AI challenge you're facing right now?",
  cta: {
    text: 'Explore the Blog',
    url: 'https://frankx.ai/blog',
  },
}
