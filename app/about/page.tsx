import AboutShell from '@/components/about/AboutShell'

const PAGE_URL = 'https://frankx.ai/about'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${PAGE_URL}#frank`,
      name: 'Frank Riemer',
      url: PAGE_URL,
      jobTitle: 'AI Architect',
      worksFor: {
        '@type': 'Organization',
        name: 'Oracle EMEA AI Center of Excellence',
      },
      sameAs: [
        'https://www.linkedin.com/in/frankriemer/',
        'https://github.com/frankxai',
        'https://suno.com/@frankx',
      ],
      description:
        'Enterprise AI Architect, creator of 12,000+ AI songs, and builder of the Agentic Creator OS. Based in Amsterdam.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Amsterdam',
        addressCountry: 'NL',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'About', item: PAGE_URL },
      ],
    },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutShell />
    </>
  )
}
