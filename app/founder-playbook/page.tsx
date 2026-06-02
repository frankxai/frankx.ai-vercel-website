import FounderPlaybookShell from '@/components/founder-playbook/FounderPlaybookShell'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HowTo',
      '@id': 'https://frankx.ai/founder-playbook#howto',
      name: 'Ship AI Value Without the Hype — A 90-Day Founder Playbook',
      description:
        'A practical 90-day framework for founders who want to implement AI that actually moves the needle. No buzzwords. No FOMO. Just results.',
      url: 'https://frankx.ai/founder-playbook',
      totalTime: 'P90D',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Map Your Advantage',
          text: 'Identify where AI creates the most value for your specific business. Audit your Skills × Data × Distribution matrix, identify 3 revenue-linked workflows, select your highest-leverage opportunity, and define success metrics.',
          url: 'https://frankx.ai/founder-playbook#phase-1',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Build the COE',
          text: 'Establish your Center of Excellence and implement your first AI workflow. Assemble your team, choose your stack, build and test, document everything for scaling.',
          url: 'https://frankx.ai/founder-playbook#phase-2',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Scale with Governance',
          text: 'Evaluate results, add governance, and expand to additional use cases. Measure against metrics, implement evaluation frameworks, add guardrails, plan next initiatives.',
          url: 'https://frankx.ai/founder-playbook#phase-3',
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Founder Playbook', item: 'https://frankx.ai/founder-playbook' },
      ],
    },
  ],
}

export default function FounderPlaybookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FounderPlaybookShell />
    </>
  )
}
