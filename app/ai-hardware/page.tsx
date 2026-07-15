import HardwareHubShell from '@/components/ai-hardware/HardwareHubShell'
import { HARDWARE_FAQ, HARDWARE_REVIEWED_AT } from '@/data/hardware-intelligence'
import { HARDWARE_CATEGORIES } from '@/data/hardware-taxonomy'
import { ldJson } from '@/lib/seo/jsonld'

export default function HardwareIntelligencePage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': ['CollectionPage', 'WebApplication'],
    '@id': 'https://frankx.ai/ai-hardware#hub',
    name: 'FrankX AI Hardware Intelligence',
    url: 'https://frankx.ai/ai-hardware',
    description: 'Interactive planning hub for owned local systems, physical AI infrastructure, and rented cloud compute.',
    dateModified: HARDWARE_REVIEWED_AT,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: HARDWARE_CATEGORIES.length,
      itemListElement: HARDWARE_CATEGORIES.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: category.title,
        url: `https://frankx.ai/ai-hardware/${category.slug}`,
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
