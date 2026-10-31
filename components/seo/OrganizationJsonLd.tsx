
import { siteConfig } from '@/lib/seo'
import { buildFrankPerson } from '@/lib/frank-person'
import { ldJson } from '@/lib/seo/jsonld'

export default function OrganizationJsonLd() {
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      buildFrankPerson(siteConfig.url),
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
