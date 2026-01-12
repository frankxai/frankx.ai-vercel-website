
import { siteConfig } from '@/lib/seo'

export default function OrganizationJsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        url: siteConfig.url,
        name: siteConfig.name,
        logo: `${siteConfig.url}/logo.png`,
        sameAs: [
            'https://twitter.com/frankxai',
            'https://linkedin.com/in/frank',
            'https://github.com/frank',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'hello@frankx.ai',
            contactType: 'customer support',
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
