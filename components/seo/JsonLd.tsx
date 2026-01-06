import Script from 'next/script'

type JsonLdProps = {
  type: 'Person' | 'Organization' | 'WebSite' | 'Article' | 'Product' | 'BreadcrumbList'
  data: Record<string, any>
  id?: string
}

export default function JsonLd({ type, data, id }: JsonLdProps) {
  const scriptId = id || `json-ld-${type.toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type,
          ...data,
        }),
      }}
    />
  )
}
