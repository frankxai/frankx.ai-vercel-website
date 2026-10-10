
import { siteConfig } from '@/lib/seo'
import { SCHEMA_SAME_AS, SOCIAL_PROFILES } from '@/lib/social-links'
import { ldJson } from '@/lib/seo/jsonld'

export default function OrganizationJsonLd() {
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#frank-riemer`,
        name: 'Frank Riemer',
        alternateName: 'FrankX',
        url: siteConfig.url,
        jobTitle: 'AI Architect & Founder',
        description: 'AI architect, startup builder, author, and researcher developing human-led multi-agent systems, sovereign creator infrastructure, and the Arcanea universe.',
        image: `${siteConfig.url}/images/portraits/frankx-avatar.png`,
        sameAs: SCHEMA_SAME_AS,
        knowsAbout: [
          'Artificial Intelligence',
          'Multi-Agent Systems',
          'Agentic Architecture',
          'Generative Engine Optimization',
          'Autonomous Workflows',
          'Prompt Engineering',
          'Music Intelligence'
        ]
      },
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.shortName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/brand/logo-full.png`,
        founder: {
          '@type': 'Person',
          '@id': `${siteConfig.url}/#frank-riemer`
        },
        sameAs: SCHEMA_SAME_AS,
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'frank@frankx.ai',
          contactType: 'customer support',
          url: `${siteConfig.url}/contact`
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          '@type': 'Organization',
          '@id': `${siteConfig.url}/#organization`
        },
        inLanguage: 'en-US'
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: ldJson(schemaGraph) }}
    />
  )
}
