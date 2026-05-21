import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import { INNER_CIRCLE_FAQS } from '@/lib/inner-circle-faqs'

export const metadata = createMetadata({
  title: 'Inner Circle | FrankX',
  description:
    'Frank&apos;s premium community for builders shipping with AI. The vault, live labs, prompt packs, and direct access. Waitlist open — June 1 2026 launch.',
  path: '/inner-circle',
})

const organizationSchema = {
  '@type': 'Organization',
  '@id': 'https://frankx.ai/inner-circle#org',
  name: 'FrankX Inner Circle',
  url: 'https://frankx.ai/inner-circle',
  description:
    'Premium community for AI architects, creators, and builders. Personal AI Center of Excellence framework, live labs, and direct mentorship.',
  founder: {
    '@type': 'Person',
    name: 'Frank Riemer',
    jobTitle: 'AI Architect',
    url: 'https://frankx.ai',
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'FrankX',
    url: 'https://frankx.ai',
  },
}

const serviceSchema = {
  '@type': 'Service',
  '@id': 'https://frankx.ai/inner-circle#service',
  name: 'FrankX Inner Circle Membership',
  description:
    'Private community access including weekly labs, content vault, prompt packs, dedicated agent builds, and direct support.',
  provider: { '@id': 'https://frankx.ai/inner-circle#org' },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Inner Circle Tiers',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Signal (Free)',
        description: 'Weekly newsletter dispatch and public archive access.',
        price: '0',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        name: 'Circle',
        description: 'Vault access, live labs, templates, prompt packs, agent collective.',
        availability: 'https://schema.org/PreOrder',
      },
      {
        '@type': 'Offer',
        name: 'Alliance (Enterprise)',
        description: 'Custom strategy, dedicated agent builds, executive briefings, bespoke governance frameworks.',
        availability: 'https://schema.org/PreOrder',
      },
    ],
  },
}

const faqSchema = {
  '@type': 'FAQPage',
  '@id': 'https://frankx.ai/inner-circle#faq',
  mainEntity: INNER_CIRCLE_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

const breadcrumbSchema = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
    { '@type': 'ListItem', position: 2, name: 'Inner Circle', item: 'https://frankx.ai/inner-circle' },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  )
}
