import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

// ── JSON-LD Schema ──────────────────────────────────────────────────────────
// All data below is static — no user input used. XSS risk is zero.
// Same @graph pattern as newsletter/layout.tsx and shop/templates/layout.tsx.

const playbookItems = [
  {
    '@type': 'DigitalDocument',
    name: 'Suno AI Prompt Playbook',
    description:
      'Battle-tested prompt frameworks for generating professional-quality music with Suno AI — genres, moods, structures, and advanced techniques.',
    url: 'https://frankx.ai/free-playbook#suno-prompt-playbook',
  },
  {
    '@type': 'DigitalDocument',
    name: 'Top 50 AI Prompts',
    description:
      'The 50 highest-leverage AI prompts for creators, builders, and entrepreneurs — covering writing, code, strategy, and creative work.',
    url: 'https://frankx.ai/free-playbook#top-50-ai-prompts',
  },
  {
    '@type': 'DigitalDocument',
    name: 'Claude Code Quick Start',
    description:
      'A practical quick-start guide to Claude Code: setup, key commands, agentic workflows, and patterns that save hours every week.',
    url: 'https://frankx.ai/free-playbook#claude-code-quick-start',
  },
]

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Free AI Creator Toolkit — 3 Playbooks Worth $111',
      description:
        'Download three battle-tested AI playbooks: Suno AI Prompt Playbook, Top 50 AI Prompts, and Claude Code Quick Start. Free instant access.',
      url: 'https://frankx.ai/free-playbook',
      numberOfItems: 3,
      hasPart: playbookItems,
      publisher: {
        '@type': 'Person',
        name: 'Frank',
        url: 'https://frankx.ai',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is included in the free AI creator toolkit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The toolkit includes three playbooks: the Suno AI Prompt Playbook for music generation, the Top 50 AI Prompts for creators and builders, and the Claude Code Quick Start guide. Combined retail value is $111.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the AI creator toolkit really free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All three playbooks are completely free with instant download access. No credit card required.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Suno AI Prompt Playbook?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Suno AI Prompt Playbook contains battle-tested prompt frameworks for generating professional-quality music with Suno AI, covering genres, moods, song structures, and advanced techniques.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Claude Code Quick Start guide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Claude Code Quick Start is a practical guide covering setup, key commands, agentic workflows, and real-world patterns that help developers save hours every week using Claude Code.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who created these AI playbooks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The playbooks were created by Frank, an AI architect and creator who builds enterprise-grade AI systems and has produced 12,000+ AI songs. The content is drawn from real production workflows.',
          },
        },
      ],
    },
  ],
}

const jsonLdString = JSON.stringify(jsonLdGraph)

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = createMetadata({
  title: 'Free AI Creator Toolkit — 3 Playbooks Worth $111 | FrankX',
  description:
    'Download three battle-tested AI playbooks: Suno AI Prompt Playbook, Top 50 AI Prompts, and Claude Code Quick Start. Free instant access.',
  path: '/free-playbook',
  keywords: [
    'free AI tools',
    'AI prompt playbook',
    'suno prompts',
    'claude code guide',
    'AI creator toolkit',
    'free AI resources',
    'suno AI music prompts',
    'claude code quick start',
    'top AI prompts',
    'free AI playbook download',
  ],
})

// ── Layout ────────────────────────────────────────────────────────────────────

export default function FreePlaybookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />
      {children}
    </>
  )
}
