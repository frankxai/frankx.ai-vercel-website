import YouTubeStrategyShell from '@/components/youtube-strategy/YouTubeStrategyShell'

const PAGE_URL = 'https://frankx.ai/youtube-strategy'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      url: PAGE_URL,
      headline: 'Build a YouTube Channel with AI-Powered Tools',
      description:
        'A 6-step framework for creators who want to build a sustainable YouTube channel using AI tools at every stage of production. From research to distribution.',
      author: {
        '@type': 'Person',
        name: 'Frank Riemer',
        url: 'https://frankx.ai',
        jobTitle: 'AI Architect',
      },
      publisher: {
        '@type': 'Organization',
        name: 'FrankX',
        url: 'https://frankx.ai',
      },
      mainEntityOfPage: PAGE_URL,
      about: [
        { '@type': 'Thing', name: 'YouTube Strategy' },
        { '@type': 'Thing', name: 'AI Video Production' },
        { '@type': 'Thing', name: 'Creator Workflow' },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': `${PAGE_URL}#howto`,
      name: 'AI-Powered YouTube Channel Framework',
      description:
        '6-step playbook for building a YouTube channel using AI tools across research, scripting, production, editing, distribution, and analytics.',
      totalTime: 'P1M',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Define Pillars', text: 'Establish 3-5 content pillars aligned with audience needs.' },
        { '@type': 'HowToStep', position: 2, name: 'Plan the Calendar', text: 'Build an AI-assisted editorial calendar with topic clusters.' },
        { '@type': 'HowToStep', position: 3, name: 'Script with Claude Code', text: 'Use Claude Code to script videos with structure and hooks.' },
        { '@type': 'HowToStep', position: 4, name: 'Produce & Edit', text: 'Record, then clip with Opus Clip and edit in CapCut.' },
        { '@type': 'HowToStep', position: 5, name: 'Distribute Everywhere', text: 'Cross-post shorts, threads, and long-form to platform-specific audiences.' },
        { '@type': 'HowToStep', position: 6, name: 'Analyze & Iterate', text: 'Track performance and refine pillars based on what resonates.' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'YouTube Strategy', item: PAGE_URL },
      ],
    },
  ],
}

export default function YouTubeStrategyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <YouTubeStrategyShell />
    </>
  )
}
