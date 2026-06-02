import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Templates | AI Architecture & Creator Starter Kits | FrankX',
  description: 'Production-ready templates for AI projects. Architecture blueprints, prompt libraries, workflow automations, and creator system starter kits.',
  path: '/templates',
})

const templatesLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://frankx.ai/templates#webpage',
      url: 'https://frankx.ai/templates',
      name: 'Templates & Frameworks',
      description:
        'Production-ready templates for AI projects. Architecture blueprints, prompt libraries, workflow automations, and creator system starter kits.',
      isPartOf: {
        '@type': 'WebSite',
        name: 'FrankX',
        url: 'https://frankx.ai',
      },
      about: {
        '@type': 'Thing',
        name: 'AI Templates & Frameworks',
      },
    },
    {
      '@type': 'ItemList',
      '@id': 'https://frankx.ai/templates#itemlist',
      name: 'FrankX Templates Catalog',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'COE Checklist',
          url: 'https://frankx.ai/templates/coe-checklist.html',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Evaluation Rubric',
          url: 'https://frankx.ai/templates/evaluation-rubric.html',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Risk Register',
          url: 'https://frankx.ai/templates/risk-register.html',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Governance Overview',
          url: 'https://frankx.ai/templates/governance-overview.html',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Vibe OS Guide',
          url: 'https://frankx.ai/pdf-templates/vibe-os-guide.html',
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: '5 Suno Prompts',
          url: 'https://frankx.ai/pdf-templates/5-suno-prompts.html',
        },
        {
          '@type': 'ListItem',
          position: 7,
          name: 'Template Marketplace',
          url: 'https://frankx.ai/shop/templates',
        },
        {
          '@type': 'ListItem',
          position: 8,
          name: 'AI Architecture Templates',
          url: 'https://frankx.ai/ai-architecture/templates',
        },
        {
          '@type': 'ListItem',
          position: 9,
          name: 'Vibe OS',
          url: 'https://frankx.ai/products/vibe-os',
        },
        {
          '@type': 'ListItem',
          position: 10,
          name: 'Suno Prompt Library',
          url: 'https://frankx.ai/products/suno-prompt-library',
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://frankx.ai',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Templates',
          item: 'https://frankx.ai/templates',
        },
      ],
    },
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        // Static JSON-LD structured data — no user input, safe for inline rendering
        dangerouslySetInnerHTML={{ __html: templatesLd }}
      />
      {children}
    </>
  )
}
