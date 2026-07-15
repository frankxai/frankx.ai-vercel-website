import HardwareHubShell from '@/components/ai-hardware/HardwareHubShell'
import { HARDWARE_FAQ, HARDWARE_PLATFORMS, HARDWARE_REVIEWED_AT, SETUP_PROFILES } from '@/data/hardware-intelligence'
import { ldJson } from '@/lib/seo/jsonld'

export default function HardwareIntelligencePage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': ['CollectionPage', 'WebApplication'],
    '@id': 'https://frankx.ai/ai-hardware#hub',
    name: 'FrankX AI Hardware Intelligence',
    url: 'https://frankx.ai/ai-hardware',
    description: 'Interactive AI workstation, local model node, and fleet planning hub.',
    dateModified: HARDWARE_REVIEWED_AT,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: HARDWARE_PLATFORMS.length,
      itemListElement: HARDWARE_PLATFORMS.map((platform, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: platform.name,
        url: platform.sourceUrl,
      })),
    },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HARDWARE_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
      { '@type': 'ListItem', position: 2, name: 'AI Hardware', item: 'https://frankx.ai/ai-hardware' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbSchema) }} />
      <HardwareHubShell />
    </>
  )
}
