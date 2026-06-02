import ProductsShell from '@/components/products/ProductsShell'
import { productsListItemData, productsFaq } from '@/components/products/products-data'

const PRODUCTS_URL = 'https://frankx.ai/products'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${PRODUCTS_URL}#page`,
      url: PRODUCTS_URL,
      name: 'Products | FrankX',
      description:
        'The FrankX product suite: Vibe OS, Creator\'s Soulbook, Suno Prompt Bundles, Creative AI Toolkit, Creation Chronicles, Generative Creator OS, and Agentic Creator OS.',
      isPartOf: { '@id': 'https://frankx.ai/#website' },
    },
    {
      '@type': 'ItemList',
      '@id': `${PRODUCTS_URL}#products`,
      name: 'FrankX Products',
      numberOfItems: productsListItemData.length,
      itemListElement: productsListItemData.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.name,
        url: product.href.startsWith('http') ? product.href : `https://frankx.ai${product.href}`,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${PRODUCTS_URL}#faq`,
      mainEntity: productsFaq.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Products', item: PRODUCTS_URL },
      ],
    },
  ],
}

export default function ProductsPage() {
  return (
    <main id="main" className="relative min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductsShell />
    </main>
  )
}
